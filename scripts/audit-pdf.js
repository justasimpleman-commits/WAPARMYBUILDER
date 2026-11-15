/* Audit a book's data file against its source PDF.

     node scripts/audit-pdf.js <book-id>     e.g. dark-elves
     node scripts/audit-pdf.js rulebook      common magic items + the 8 common lores
     node scripts/audit-pdf.js all           every book that has a PDF, then the rulebook

   It runs `pdftotext` (poppler-utils) on the PDF in reference/, parses the unit
   entries, magic items and spells out of the text, and prints every place where
   data/<book-id>.js says something else:

     ✗  a value that differs from the PDF (statline, points, unit size, troop type,
        magic-item allowance, banner allowance, an option cost the data lacks, an
        item's cost or "common" star, a spell's level or casting value, …)
     ?  something to look at by eye (a data-only option cost, an entry the parser
        could not find in the PDF, a special rule the data line lacks, …)

   A clean book prints only `?` lines you can explain (cross-unit upgrades such as
   "The Ironsworn (Drazhoath)", free options the PDF lists as "free", notes added to
   a rules line). It reads the PDF as text, so it cannot see everything — it checks
   numbers and names, not the wording of rule text. See docs/DATA-MAPPING.md. */
const fs=require("fs"), path=require("path"), os=require("os"), {execFileSync}=require("child_process");
const ROOT=path.join(__dirname,"..");
global.window=global;
["data/lores-common.js","data/rules-common.js","data/special-rules-common.js","data/troop-types-common.js","data/common-items.js","data/books.js"]
  .forEach(f=>(0,eval)(fs.readFileSync(path.join(ROOT,f),"utf8")));
window.BOOK_INDEX.forEach(b=>(0,eval)(fs.readFileSync(path.join(ROOT,b.file),"utf8")));

/* ---------- PDF → text ---------- */
const TMP=fs.mkdtempSync(path.join(os.tmpdir(),"audit-pdf-"));
function pdfText(pdf,mode){              // mode: "-layout" (columns kept) | "-raw" (content-stream order)
  const out=path.join(TMP,path.basename(pdf).replace(/\W+/g,"_")+mode+".txt");
  if(!fs.existsSync(out)){
    try{ execFileSync("pdftotext",[mode,pdf,out]); }
    catch(e){ console.error("Could not run pdftotext (install poppler-utils): "+e.message); process.exit(2); }
  }
  return fs.readFileSync(out,"utf8").split(/\r?\n/);
}
function findPdf(dir,needle){
  const d=path.join(ROOT,"reference",dir); if(!fs.existsSync(d)) return null;
  // "Warhammer - <Book name> 3.1.pdf": the whole name must match ("Dwarfs" is not "Chaos Dwarfs")
  const want=needle && needle.toLowerCase().replace(/&/g,"and");
  const f=fs.readdirSync(d).find(n=>/\.pdf$/i.test(n) && (!needle ||
    n.toLowerCase().replace(/&/g,"and").replace(/^warhammer\s*-\s*/,"").replace(/\s*[\d.]*\.pdf$/,"").trim()===want));
  return f?path.join(d,f):null;
}

/* ---------- normalising ---------- */
const lc=s=>String(s).toLowerCase().replace(/[’‘`]/g,"'").replace(/[–—]/g,"-").replace(/\s+/g," ").trim();
const UP=s=>String(s).toUpperCase().replace(/[’‘`]/g,"'").replace(/[^A-Z0-9' ]/g," ").replace(/\s+/g," ").trim();
const stat=v=>String(v).replace(/[–—]/g,"-");
const sing=s=>lc(s).replace(/s$/,"");
function tokens(s){                      // split a rules/equipment line on , ; . outside parentheses
  const out=[]; let depth=0, cur="";
  for(const ch of String(s||"")){ if(ch==="(") depth++; if(ch===")") depth=Math.max(0,depth-1);
    if((ch===","||ch===";"||ch===".") && depth===0){ out.push(cur); cur=""; } else cur+=ch; }
  out.push(cur);
  return out.map(x=>lc(x).replace(/\s*\(see [^)]*\)/,"")).filter(Boolean);
}

/* ---------- unit entries (from the -layout text) ----------
   An entry is a heading, a "Profile  M WS BS …  Points" line, the profile rows, then
   labelled sections (UNIT SIZE / TROOP TYPE / EQUIPMENT / SPECIAL RULES / OPTIONS). */
const STAT="(?:\\d+|-|–|\\*|D\\d+(?:\\+\\d+)?|\\d+D\\d+|\\d+\\+)";
const ROW=new RegExp("^\\s*(\\S.*?)\\s{2,}("+STAT+"(?:\\s+"+STAT+"){8})(?:\\s+(\\d+(?:\\.\\d+)?|-|–))?\\s*$");
const PROFILE=/^\s*Profile\s+M\s+WS\s+BS\s+S\s+T\s+W\s+I\s+A\s+Ld/;
function parseUnits(L){
  const units=[];
  for(let i=0;i<L.length;i++){
    if(!PROFILE.test(L[i])) continue;
    let h=i-1; while(h>=0 && !L[h].trim()) h--;
    const titles=[(L[h]||"").trim()]; if(h>0 && L[h-1].trim()) titles.push(L[h-1].trim());   // special characters: name above a subtitle
    const u={titles,line:i+1,rows:[],size:null,troop:"",eq:"",rules:"",opts:[],budget:[],banner:[]};
    let j=i+1;
    for(;j<L.length;j++){ const m=L[j].match(ROW);
      if(!m){ if(!L[j].trim() && !u.rows.length) continue; break; }
      u.rows.push({name:m[1].trim(), stats:m[2].trim().split(/\s+/).map(stat), pts:(m[3]!=null && /\d/.test(m[3]))?+m[3]:null}); }
    let end=L.length;
    for(let k=j;k<L.length;k++){ if(PROFILE.test(L[k])){ let hh=k-1; while(hh>j && !L[hh].trim()) hh--; end=hh; break; } }
    const blk=L.slice(j,end);
    const sec=key=>{ const re=new RegExp("^\\s*"+key+":\\s*(.*)$"); const at=blk.findIndex(l=>re.test(l)); if(at<0) return "";
      let s=blk[at].match(re)[1];
      for(let k=at+1;k<blk.length;k++){ const l=blk[k]; if(!l.trim() || /^\s*•/.test(l) || /^\s*[A-Z][A-Z ]+:/.test(l)) break; s+=" "+l.trim(); }
      return s.replace(/\s+/g," ").trim(); };
    u.size=sec("UNIT SIZE")||null; u.troop=sec("TROOP TYPE").replace(/\.$/,""); u.eq=sec("EQUIPMENT"); u.rules=sec("SPECIAL RULES");
    const oi=blk.findIndex(l=>/^\s*OPTIONS:/.test(l));
    if(oi>=0){ let carry="";
      for(let k=oi+1;k<blk.length;k++){ const l=blk[k]; if(/^\s*(NOTES|MAGIC|SPECIAL RULES|UPGRADES)\s*:/.test(l)) break;
        const m=l.match(/^\s*(?:•|-)?\s*(.*?)\s+\+?(\d+(?:\.\d+)?)\s+points?(\/\w+)?\s*$/);
        if(!m){ carry=l.replace(/^[\s•\-]+/,"").trim(); continue; }
        const label=(m[1].replace(/^[•\-\s]+/,"").trim()||carry), o={label,cost:+m[2],perModel:/model/i.test(m[3]||""),per:m[3]||""};
        if(/magic standard/i.test(label+" "+carry)) u.banner.push(o);
        else if(/up to a total of|worth up to|up to a total/i.test(label)) u.budget.push(o);
        else u.opts.push(o);
        carry=""; } }
    units.push(u);
  }
  return units;
}

/* ---------- magic items and spells (from the -raw text) ----------
   "NAME* 35 points" (the * marks a common item) followed by the description;
   "NAME" / "Level 2 Cast on 9+" (or "Signature Spell Cast on 5+") for spells. */
const CAPS=/^[A-Z][A-Z0-9'’‘\-,.!&: ]+$/;
const SECTION=/^(MAGIC WEAPONS|MAGIC ARMOUR|TALISMANS|ARCANE ITEMS|ENCHANTED ITEMS|MAGIC STANDARDS|MAGIC ITEMS|COMMON MAGIC ITEMS)$/;
function parseItems(L){
  const HEAD=/^([A-Z][A-Z0-9'’‘\-,.!&: ]*?[A-Z0-9!'’])(\*)?\s+(\d+)\s+points?\s*$/, items=[];
  for(let i=0;i<L.length;i++){ const m=L[i].match(HEAD); if(!m) continue;
    let name=m[1].trim();
    for(let k=i-1; k>=0 && i-k<=2; k--){ const t=L[k].trim(); if(t.length>2 && CAPS.test(t) && !SECTION.test(t) && !HEAD.test(t)) name=t+" "+name; else break; }   // a name wrapped over two lines
    const d=[]; for(let j=i+1; j<L.length && j<i+40; j++){ const t=L[j].trim(); if(HEAD.test(L[j]) || (t.length>3 && CAPS.test(t))) break; if(/^\d+$/.test(t)) continue; d.push(t); }
    items.push({name:name.replace(/\s+/g," "), star:!!m[2], cost:+m[3], desc:d.join(" ").replace(/\s+/g," ").trim(), line:i+1}); }
  return items;
}
function parseSpells(L){
  const sp=[];
  for(let i=0;i<L.length;i++){ const m=L[i].match(/^(Signature Spell|Level (\d))\s+Cast on (\d+)\+/); if(!m) continue;
    let k=i-1; while(k>=0 && !L[k].trim()) k--;
    sp.push({name:L[k].trim(), lvl:m[2]?+m[2]:0, cast:+m[3], line:i+1}); }
  return sp;
}

/* ---------- report ---------- */
let bad=0, look=0;
const X=m=>{ bad++; console.log("  ✗ "+m); }, Q=m=>{ look++; console.log("  ? "+m); };
const TYPE=/^(?:[A-Z][A-Za-z' \-,]+ only\. )*((?:Light|Medium|Heavy) armour(?: and shield)?|Shield|Great weapon|Polearm|Halberd|Spear|Light lance\/spear|Light lance|Heavy lance|Lance|Additional hand weapon|Two hand weapons|Paired weapons|Flail|Morning star|Whip|Longbow|Bow|Elven longbow|Elven shortbow|Shortbow|Crossbow|Repeater crossbow|Pistol|Brace of pistols|Handgun|Blunderbuss|Javelins?|Throwing weapons?|Sling|Blowpipe|Pike|Gut-plate|Ironfist|Greatbow|Fireglaive|Celestial blade|Sea Dragon Cloak|Deathrain crossbow)\./i;

function matchItems(label,list,P,descOf,opt){
  opt=opt||{}; const used=new Set();
  list.forEach(it=>{ const n=UP(it.name).replace(/^THE /,"");
    let c=P.filter(p=>UP(p.name).replace(/^THE /,"")===n);
    if(!c.length) c=P.filter(p=>{ const pn=UP(p.name); return pn.length>=5 && (n.endsWith(" "+pn) || pn.endsWith(" "+n)); });
    if(!c.length){ Q(`${label} "${it.name}" (${it.cat}, ${it.cost} pts): not found in the PDF text — check by hand`); return; }
    c.forEach(x=>used.add(x)); const p=c.find(x=>x.cost===it.cost)||c[0];
    if(p.cost!==it.cost) X(`${label} "${it.name}": cost ${it.cost} in data, ${c.map(x=>x.cost).join(" / ")} in the PDF (line ${p.line})`);
    if(!opt.noStar && p.star!==!!it.common) X(`${label} "${it.name}": common:${!!it.common} in data, the PDF ${p.star?"marks it *":"has no *"}`);
    if(it.cat==="Magic Weapons"||it.cat==="Magic Armour"){ const ty=(p.desc.match(TYPE)||[])[1], self=/despite not normally/i.test(p.desc);
      if(ty && !it.requiresAccess && !self) Q(`${label} "${it.name}": the PDF says "${ty}." but the item has no requiresAccess`);
      if(!ty && it.requiresAccess) Q(`${label} "${it.name}": requiresAccess ${JSON.stringify(it.requiresAccess)}, but the PDF text starts "${p.desc.slice(0,50)}…"`); }
    if(it.cat==="Arcane Items"){ const d=descOf(it.name)||"", want=(p.desc.match(/\b(Relic|Charm|Staff)\b/)||[])[1], have=(d.match(/^(Relic|Charm|Staff)\b/)||[])[1];
      if(want && have && want!==have) X(`${label} "${it.name}": description opens "${have}", the PDF says ${want}`);
      if(want && !have) Q(`${label} "${it.name}": the PDF says ${want} but the description does not open with it (sub-slot falls back)`); }
  });
  return used;
}
function matchSpells(lores,P,extra){
  const used=new Set(); let n=0;
  const one=(where,s)=>{ n++; const c=P.filter(p=>UP(p.name)===UP(s.name));
    if(!c.length){ Q(`${where} "${s.name}": not found in the PDF text`); return; }
    c.forEach(x=>used.add(x)); const p=c.find(x=>x.lvl===s.lvl && x.cast===s.cast)||c[0];
    if(p.lvl!==s.lvl) X(`${where} "${s.name}": level ${s.lvl} in data, ${p.lvl} in the PDF`);
    if(p.cast!==s.cast) X(`${where} "${s.name}": cast ${s.cast}+ in data, ${p.cast}+ in the PDF`); };
  for(const ln in lores) lores[ln].spells.forEach(s=>one("lore "+ln,s));
  (extra||[]).forEach(([who,s])=>one("personal spell of "+who,s));
  P.filter(p=>!used.has(p)).forEach(p=>Q(`PDF spell "${p.name}" (L${p.lvl}, ${p.cast}+, line ${p.line}) is not in the data (or is spelled differently)`));
  return n;
}

function auditBook(id){
  const B=window.ARMY_BOOKS[id]; if(!B){ console.log(`unknown book "${id}"`); return; }
  const pdf=findPdf("Army books",B.name);
  console.log(`\n=== ${B.name} ===`);
  if(!pdf){ console.log(`  (no PDF for it in reference/Army books/ — nothing to audit against. No PDF, no data.)`); return; }
  console.log(`  ${path.relative(ROOT,pdf)}`);
  const P=parseUnits(pdfText(pdf,"-layout")), raw=pdfText(pdf,"-raw");
  const byRow={}; P.forEach(u=>u.rows.forEach(r=>(byRow[lc(r.name)]=byRow[lc(r.name)]||[]).push(u)));
  const used=new Set(), unitIds=new Set();
  // every priced option anywhere in the book — a mount's own upgrades (barding, a
  // Great Taurus' Flaming Breath) are priced in the MOUNT's entry, not the rider's
  const anyOpt=P.flatMap(u=>u.opts), key=t=>lc(t).replace(/^(may |must )?(take|be upgraded to|have|be given|replace)\s+(an? |the )?/,"").replace(/\s*\([^)]*\)\s*$/,"");
  const pricedElsewhere=d=>anyOpt.some(o=>o.cost===d.cost && (key(o.label).includes(key(d.label)) || key(d.label).includes(key(o.label))));
  const cmpRows=(U,rows,blk)=>{
    rows.forEach(r=>{ const pr=blk.rows.find(x=>lc(x.name)===lc(r[0]));
      if(!pr){ Q(`${U}: profile row "${r[0]}" is not in the PDF entry [${blk.rows.map(x=>x.name).join(" | ")}]`); return; }
      const d=r.slice(1).map(stat).join(" "), p=pr.stats.join(" "); if(d!==p) X(`${U}: "${r[0]}" statline ${d} in data, ${p} in the PDF`); });
    blk.rows.forEach(pr=>{ if(!rows.some(r=>lc(r[0])===lc(pr.name))) Q(`${U}: PDF profile row "${pr.name}" (${pr.stats.join(" ")}) is not in the data profile`); });
  };
  for(const cat of ["characters","core","special","rare"]) for(const u of B.units[cat]){
    unitIds.add(u.id);
    const inf=(B.unitInfo||{})[u.id]||{}, rows=inf.profile||[], U=`${cat}/${u.id}`, pts=u.isCharacter?u.variants[0].points:u.basePoints;
    // by heading (a unit and a mount can share one — "Plague Toads" / "Plague Toad": the priced one is the unit) …
    const named=P.filter(p=>p.titles.some(t=>sing(t)===sing(u.name)));
    let blk=named.find(p=>p.rows.some(r=>r.pts===pts))||named[0];
    // … else by its first profile row, else by a profile name
    if(!blk && rows.length){ const c=byRow[lc(rows[0][0])]||[]; blk=c.find(x=>x.rows.some(r=>r.pts===pts))||(c.length===1?c[0]:null); }
    if(!blk && u.isCharacter) for(const v of u.variants){ const c=byRow[lc(v.name)]; if(c){ blk=c[0]; break; } }
    if(!blk){ Q(`${U} (${u.name}): no entry found in the PDF text — check by hand`); continue; }
    used.add(blk);
    cmpRows(U,rows,blk);
    if(u.isCharacter) u.variants.forEach(v=>{ let pr=blk.rows.find(x=>lc(x.name)===lc(v.name)); if(!pr && u.variants.length===1){ const priced=blk.rows.filter(x=>x.pts!=null); pr=priced.length?{pts:priced.reduce((s,x)=>s+x.pts,0)}:null; }
        if(!pr) Q(`${U}: profile "${v.name}" is not a row of the PDF entry`); else if(pr.pts!==v.points) X(`${U}: ${v.name} costs ${v.points} in data, ${pr.pts} in the PDF`); });
    else { const pr=blk.rows.find(x=>x.pts!=null); if(!pr) Q(`${U}: no points value read from the PDF entry`); else if(pr.pts!==u.basePoints) X(`${U}: ${u.basePoints} pts in data, ${pr.pts} in the PDF`); }
    if(!u.isCharacter){ const d=u.unitSize?(u.unitSize[1]==null?u.unitSize[0]+"+":(u.unitSize[0]===u.unitSize[1]?""+u.unitSize[0]:u.unitSize[0]+"-"+u.unitSize[1])):"none", p=blk.size?blk.size.replace(/[–—]/g,"-").replace(/\s+/g,""):"none";
      if(d!==p){ if(p==="none"){ if(d!=="1") Q(`${U}: unit size ${d} in data; the PDF entry has no UNIT SIZE line (look for a NOTES bullet such as "1-2 … as a single choice")`); }
        else X(`${U}: unit size ${d} in data, ${blk.size} in the PDF`); }
      if(u.unitSize && u.unitSize[1]!==1 && !u.perModel) X(`${U}: unit size ${d} but perModel is false — the model count cannot be changed`); }
    if(lc(inf.troop||"")!==lc(blk.troop)) X(`${U}: troop "${inf.troop||""}" in data, "${blk.troop}" in the PDF`);
    // magic allowances
    if(u.isCharacter){ const d=[...new Set(u.variants.map(v=>v.magicBudget||0))].sort((a,b)=>a-b).join("/"), p=[...new Set(blk.budget.map(o=>o.cost))].sort((a,b)=>a-b).join("/")||"0";
      if(d!==p) (u.isSpecialChar&&d==="0"?Q:X)(`${U}: magic allowance ${d} in data, ${p} in the PDF`); }
    else { const co=(u.options||[]).find(o=>o.type==="command"), d=(co&&co.magicStandard)||0, p=blk.banner.length?blk.banner[0].cost:0;
      if(d!==p) X(`${U}: magic standard allowance ${d} in data, ${p} in the PDF`); }
    // option costs: every priced PDF option must exist in the data with the same per-model flag
    const data=[]; (u.options||[]).forEach(o=>{ if(o.type==="command") (o.roles||["leader","musician","standard"]).forEach(r=>data.push({label:r,cost:{leader:5,musician:5,standard:10}[r],perModel:false,cmd:true}));
      else if(o.type==="toggle"||o.type==="perN") data.push({label:o.label,cost:o.cost,perModel:o.per==="model"});
      else (o.choices||[]).forEach(c=>data.push({label:c.label,cost:c.cost,perModel:c.per==="model"})); });
    const left=data.slice();
    blk.opts.forEach(po=>{ let k=left.findIndex(d=>d.cost===po.cost && d.perModel===po.perModel); if(k<0) k=left.findIndex(d=>d.cost===po.cost);
      if(k<0){ (po.per && !po.perModel ? Q : X)(`${U}: PDF option "${po.label}" +${po.cost}${po.per} has no option with that cost in the data`); return; }
      const d=left.splice(k,1)[0];
      if(d.perModel!==po.perModel && !d.cmd && !u.isCharacter && u.perModel) Q(`${U}: "${d.label}" +${d.cost} is per ${d.perModel?"model":"unit (flat)"} in data; the PDF says "${po.label} +${po.cost}${po.per||" points"}"`); });
    left.filter(d=>d.cost>0 && !d.cmd && !pricedElsewhere(d)).forEach(d=>Q(`${U}: option "${d.label}" +${d.cost}${d.perModel?"/model":""} is not priced in this PDF entry (a mount's own upgrade, or one unlocked by another unit?)`));
    // rule / equipment names the PDF lists and the data line lacks
    const dr=tokens(inf.rules), de=tokens(inf.eq==="—"?"":inf.eq), base=t=>t.replace(/\s*\([^)]*\)\s*$/,"");
    tokens(blk.rules).forEach(t=>{ if(dr.includes(t)) return; const alt=dr.find(d=>base(d)===base(t));
      Q(alt?`${U}: rule "${alt}" in data, "${t}" in the PDF`:`${U}: PDF special rule "${t}" is not on the data rules line`); });
    tokens(blk.eq).forEach(t=>{ if(!de.some(d=>d===t || base(d)===base(t))) Q(`${U}: PDF equipment "${t}" is not on the data eq line ("${inf.eq||""}")`); });
  }
  // mounts and other unitInfo entries that are not units
  for(const k in (B.unitInfo||{})){ if(unitIds.has(k)) continue; const inf=B.unitInfo[k], first=inf.profile&&inf.profile[0]; if(!first) continue;
    const c=byRow[lc(first[0])]||[], blk=c.find(x=>lc(x.rows[0].name)===lc(first[0]))||c[0];
    if(!blk){ Q(`unitInfo/${k}: no PDF entry with a "${first[0]}" row — check by hand`); continue; }
    const own=lc(blk.rows[0].name)===lc(first[0]); if(own) used.add(blk);     // the mount's own entry, not a row inside a rider's
    inf.profile.forEach(r=>{ const pr=blk.rows.find(x=>lc(x.name)===lc(r[0])); if(pr && r.slice(1).map(stat).join(" ")!==pr.stats.join(" ")) X(`unitInfo/${k}: "${r[0]}" statline ${r.slice(1).map(stat).join(" ")} in data, ${pr.stats.join(" ")} in the PDF`); });
    if(own && inf.troop && blk.troop && lc(inf.troop)!==lc(blk.troop)) X(`unitInfo/${k}: troop "${inf.troop}" in data, "${blk.troop}" in the PDF`); }
  P.filter(p=>!used.has(p)).forEach(p=>Q(`PDF entry "${p.titles[0]}" (line ${p.line}; rows ${p.rows.map(r=>r.name+(r.pts!=null?" "+r.pts:"")).join(" | ")}) is not matched to any unit or mount in the data`));
  // magic items, gifts, powers
  const items=parseItems(raw), own=[]; for(const cat in B.magicItems) B.magicItems[cat].forEach(it=>own.push(Object.assign({cat},it)));
  const u1=matchItems("item",own,items,n=>(B.itemDesc||{})[n]);
  const pw=(B.vampiricPowers||[]).map(p=>Object.assign({cat:"Vampiric Powers"},p)), u2=matchItems("power",pw,items,()=>"",{noStar:true});
  const vt=(B.virtues||[]).map(p=>Object.assign({cat:"Virtues"},p)), u3=matchItems("virtue",vt,items,()=>"",{noStar:true});
  items.filter(p=>!u1.has(p)&&!u2.has(p)&&!u3.has(p)).forEach(p=>Q(`PDF item "${p.name}"${p.star?"*":""} ${p.cost} pts (line ${p.line}) is not in the data (or is spelled differently)`));
  // spells
  const personal=[]; for(const cat in B.units) B.units[cat].forEach(u=>(u.fixedSpells||[]).forEach(s=>personal.push([u.name,s])));
  const spells=parseSpells(raw), n=matchSpells(B.spellLores||{},spells,personal);
  console.log(`  checked ${used.size} unit/mount entries, ${own.length+pw.length+vt.length} items, ${n} spells`);
}
function auditRulebook(){
  const pdf=findPdf("Rulebook",""); console.log(`\n=== Rulebook: common magic items and the eight Lores of Magic ===`);
  if(!pdf){ console.log("  (no PDF in reference/Rulebook/)"); return; }
  console.log(`  ${path.relative(ROOT,pdf)}`);
  const raw=pdfText(pdf,"-raw"), items=parseItems(raw);
  // every book repeats the common items: they must agree with each other and with the rulebook
  const seen={}; let ref=null;
  window.BOOK_INDEX.forEach(b=>{ const C=window.ARMY_BOOKS[b.id].commonMagicItems; if(!C) return; if(!ref) ref=C;
    for(const cat in C) C[cat].forEach(it=>{ const k=cat+"/"+it.name, v=JSON.stringify(it); (seen[k]=seen[k]||{}); (seen[k][v]=seen[k][v]||[]).push(b.id); }); });
  for(const k in seen){ const vs=Object.keys(seen[k]); if(vs.length>1) X(`common item ${k} differs between books: ${vs.map(v=>v+" ["+seen[k][v].join(",")+"]").join("  vs  ")}`); }
  const list=[]; for(const cat in (ref||{})) ref[cat].forEach(it=>list.push(Object.assign({cat},it)));
  const used=matchItems("common item",list,items,n=>(window.COMMON_ITEM_DESC||{})[n]);
  items.filter(p=>!used.has(p)).forEach(p=>Q(`rulebook item "${p.name}"${p.star?"*":""} ${p.cost} pts (line ${p.line}) is not a common item in the data`));
  const n=matchSpells(window.COMMON_LORES||{},parseSpells(raw));
  console.log(`  checked ${list.length} common items, ${n} spells`);
}

const arg=process.argv[2];
if(!arg){ console.log("usage: node scripts/audit-pdf.js <book-id> | rulebook | all\n  books: "+window.BOOK_INDEX.map(b=>b.id).join(", ")); process.exit(1); }
if(arg==="all"){ window.BOOK_INDEX.forEach(b=>{ if(findPdf("Army books",b.name)) auditBook(b.id); else console.log(`\n=== ${b.name} === (no PDF in reference/Army books/ — not audited)`); }); auditRulebook(); }
else if(arg==="rulebook") auditRulebook();
else auditBook(arg);
console.log(`\n${bad} mismatch${bad===1?"":"es"} (✗), ${look} to look at (?).`);
try{ fs.rmSync(TMP,{recursive:true,force:true}); }catch(_){}
process.exit(bad?1:0);
