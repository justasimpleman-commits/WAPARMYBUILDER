/* game.js — Game mode: a read-only, compact reference of the current army for use
   at the table. One card per roster entry, in roster order: the entry's statline
   (plus its mount), equipment, special rules, magic items and spells, every
   recognised word clickable (it opens in the stacked window over the view). No
   editing, no tracking — Exit (or Esc) returns to the builder.

   Click targets are kept in their own global arrays (__gw rules, __giw items,
   __gsp spells) so a popup that resets the builder's __rw/__iw can't break them. */
let gameOpen=false;

function openGameMode(){
  if(!D) return;
  if(window.__mobileUI) window.__mobileUI.closeAll();
  gameOpen=true; renderGame();
  document.getElementById("gameView").classList.add("open");
  document.body.classList.add("gaming");
}
function closeGameMode(){
  gameOpen=false;
  document.getElementById("gameView").classList.remove("open");
  document.body.classList.remove("gaming");
}

/* the profile rows that belong to THIS entry: for a character, the rows of the
   other profiles it could have been (Overlord vs Overseer) are dropped, so the
   chosen profile plus any mount/crew rows remain */
function gameProfileRows(e,u){
  const inf=D.unitInfo[u.id]; const rows=(inf&&inf.profile)||[];
  if(!u.isCharacter) return rows;
  const mine=u.variants[e.variant].name;
  const others=new Set(u.variants.map(v=>v.name).filter(n=>n!==mine));
  const kept=rows.filter(r=>!others.has(r[0]));
  return kept.length ? kept : rows;
}
/* a known spell's data by name: the wizard's own lore, else the eight Winds'
   signatures (Arcane Familiar picks) */
function gameSpell(e,name){
  const lore=e.lore?loreData(e.lore):null;
  const sp=lore && lore.spells.find(s=>s.name===name);
  if(sp) return {lore:e.lore, sp};
  const w=windSignatures().find(x=>x.name===name);
  return w ? {lore:w.lore, sp:w.sp} : null;
}
function openGameSpell(i){
  const s=window.__gsp[i]; if(!s) return;
  const sp=s.sp, tag=sp.lvl===0?"Signature":"Level "+sp.lvl;
  openModal2(sp.name, `<div class="rule"><b>${esc(String(sp.cast))}+</b> <span style="color:var(--muted)">Lore of ${esc(s.lore)} · ${esc(tag)} · ${esc(sp.type)} · ${esc(sp.range)}</span></div><div class="rule">${esc(sp.effect)}</div>`);
}
function openGameAttr(i){
  const s=window.__gsp[i]; if(!s) return;
  openModal2(s.name, `<div class="rule" style="color:var(--muted)">Lore attribute — Lore of ${esc(s.lore)}</div><div class="rule">${esc(s.text)}</div>`);
}

function gameTable(rows){
  if(!rows.length) return "";
  return `<div class="profwrap"><table class="prof gprof"><tr><th></th>${STAT_HEAD.map(s=>`<th>${s}</th>`).join("")}</tr>`
    + rows.map(r=>`<tr><td class="nm">${esc(r[0])}</td>${r.slice(1).map(v=>`<td>${esc(v)}</td>`).join("")}</tr>`).join("")
    + `</table></div>`;
}
function gameLine(label, html){ return html ? `<div class="gline"><span class="gl">${label}</span> ${html}</div>` : ""; }

function gameCardHTML(e){
  const u=findUnit(e.cat,e.id); const inf=D.unitInfo[u.id]||{};
  const nm=entryName(e);
  const tags=[];
  if(e.uid===generalUid) tags.push(`<span class="gtag gen" title="Army General">★ General</span>`);
  if(isBSB(e,u)) tags.push(`<span class="gtag">BSB</span>`);
  const lvl=wizardLevel(e,u); if(lvl>0) tags.push(`<span class="gtag">Wizard L${lvl}</span>`);
  const ct = isLone(u) ? "" : ` <span class="gct">×${e.count}</span>`;
  const pts = Math.round(entryPoints(e)*10)/10;

  const mount=selectedMount(e,u), md=mount?mountChoiceData(mount):null;
  const rows=gameProfileRows(e,u).slice();
  if(md) md.rows.forEach(r=>{ if(!rows.some(x=>x[0]===r[0])) rows.push(r); });

  const lo=entryLoadout(e,u);
  const bought=lo.equip.filter(s=>!/^Mount: /.test(s));
  let h=`<div class="ghead"><span class="gnm">${esc(nm)}${ct}</span>${tags.join("")}<span class="gpts">${pts}</span></div>`;
  h+=gameTable(rows);
  h+=gameLine("Equipment", [inf.eq && inf.eq!=="—" ? eqToHTML(inf.eq,"__gw") : "", bought.length ? loadoutHTML(bought,"equip","__gw","__giw") : ""].filter(Boolean).join(", "));
  h+=gameLine("Rules", rulesToHTML(inf.rules,"__gw"));
  if(mount){
    const mr=md && md.rules && md.rules!==inf.rules ? rulesToHTML(md.rules,"__gw") : "";
    h+=gameLine("Mount", `<b>${esc(mount.label)}</b>${mr?` — ${mr}`:""}`);
  }
  if(lo.magic.length) h+=gameLine("Magic", loadoutHTML(lo.magic,"item","__gw","__giw"));
  if(lo.lore){
    const lore=loreData(lo.lore), sp=[];
    if(lore && lore.attribute){ const i=window.__gsp.push({name:lore.attribute.name, text:lore.attribute.text, lore:lo.lore})-1;
      sp.push(`<span class="ruleword" onclick="openGameAttr(${i})">${esc(lore.attribute.name)}</span> <span class="note">(attribute)</span>`); }
    lo.spells.forEach(n=>{ const s=gameSpell(e,n);
      if(!s){ sp.push(esc(n)); return; }
      const i=window.__gsp.push(s)-1;
      sp.push(`<span class="ruleword" onclick="openGameSpell(${i})">${esc(n)}</span> <span class="gcast">${esc(String(s.sp.cast))}+</span>`); });
    h+=gameLine(`Lore of ${esc(lo.lore)}`, sp.join(", "));
  }
  return `<div class="gcard" id="game-${e.uid}">${h}</div>`;
}

function renderGame(){
  const el=document.getElementById("gameView");
  window.__gw=[]; window.__giw=[]; window.__gsp=[];
  const limit=currentLimit(), tot=Math.round(grandTotal()*10)/10;
  const named=currentSaveName||saveNameHint;
  const title=named||D.name, sub=(named?D.name+" · ":"")+`${tot} / ${limit} pts`;
  let jump="", cards="";
  CATS.forEach(([cat,label])=>{
    const items=state.filter(e=>e.cat===cat); if(!items.length) return;
    jump+=`<span class="gjcat">${label}</span>`+items.map(e=>{
      const u=findUnit(e.cat,e.id);
      return `<button class="gjump" onclick="gameJump(${e.uid})">${esc(entryName(e))}${isLone(u)?"":" ×"+e.count}${e.uid===generalUid?" ★":""}</button>`; }).join("");
    cards+=`<h2 class="sec gsec">${label} <span class="cpts">${Math.round(catTotal(cat))} pts</span></h2><div class="ggrid">${items.map(gameCardHTML).join("")}</div>`;
  });
  el.innerHTML=`<div class="gbar"><div class="gtitle"><b>${esc(title)}</b><span>${esc(sub)}</span></div>`
    + `<button class="btn primary" onclick="closeGameMode()">Exit game mode</button></div>`
    + (state.length ? `<div class="gjumps">${jump}</div><div class="gcards">${cards}</div>`
                    : `<div class="empty">No units yet — add some in the builder first.</div>`);
}
function gameJump(uid){
  const n=document.getElementById("game-"+uid); if(!n) return;
  const bar=document.querySelector("#gameView .gbar"), off=bar?bar.offsetHeight+8:8;
  const view=document.getElementById("gameView");
  view.scrollTo({top:n.offsetTop-off, behavior:"smooth"});
  n.classList.add("flash"); setTimeout(()=>n.classList.remove("flash"),1000);
}
