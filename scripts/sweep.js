/* Gap sweep: for a given book id, report option/choice labels and unit `rules`
   tokens that don't resolve to any rule text (glossary / COMMON_SPECIAL_RULES /
   COMMON_RULES). Run: node scripts/sweep.js <book-id>  (cwd = project root) */
const fs=require("fs");
global.window=global;
["data/lores-common.js","data/rules-common.js","data/special-rules-common.js","data/common-items.js",
 "data/chaos-dwarfs.js","data/tomb-kings.js","data/vampire-counts.js","data/bretonnia.js","data/wood-elves.js",
 "data/dwarfs.js","data/lizardmen.js","data/estalia.js"].forEach(f=>eval(fs.readFileSync(f,"utf8")));

const COMMON_SR=window.COMMON_SPECIAL_RULES||{}, COMMON_R=window.COMMON_RULES||{};
function baseName(t){ return t.replace(/\s*\([^)]*\)\s*$/,"").trim(); }
function resolves(book,tok){
  const n=baseName(tok); if(!n) return true;
  if(book.glossary && book.glossary[n]) return true;
  // COMMON maps: keyed by name; also some have keyword matching — do exact + case-insensitive
  const inMap=(m)=>Object.keys(m).some(k=>k.toLowerCase()===n.toLowerCase());
  if(inMap(COMMON_SR)||inMap(COMMON_R)) return true;
  return false;
}
function isItem(book,n){ return book.itemDesc && book.itemDesc[baseName(n)]; }

const id=process.argv[2];
const book=window.ARMY_BOOKS[id];
if(!book){ console.log("no book",id); process.exit(1); }

// 1) option/choice labels with no rule text and not a magic item
const optGaps=new Set();
for(const cat of ["characters","core","special","rare"]) (book.units[cat]||[]).forEach(u=>{
  (u.options||[]).forEach(o=>{
    const consider=(label)=>{ if(!label) return;
      // command/mount labels & generic "Mount"/"Combat weapon" headers are not rules
      if(/^(Mount|Combat weapon|Armour|Weapon|Bow|Command|Battle Standard)/i.test(label)) return;
      if(!resolves(book,label) && !isItem(book,label)) optGaps.add(label); };
    consider(o.label);
    (o.choices||[]).forEach(c=>consider(c.label));
  });
});

// 2) unit rules-line tokens that don't resolve
const ruleGaps=new Set();
for(const k in (book.unitInfo||{})){ const ri=book.unitInfo[k]; if(!ri||!ri.rules) continue;
  ri.rules.split(/[,;.]/).forEach(t=>{ t=t.trim(); if(!t) return;
    if(/^[0-9]/.test(t)||/Unit Strength|Troop Type|pts|points/i.test(t)) return;
    if(t.length<3) return;
    if(!resolves(book,t) && !isItem(book,t)) ruleGaps.add(t);
  });
}
console.log("=== "+book.name+" ===");
console.log("\n-- option/choice labels lacking rule text ("+optGaps.size+") --");
[...optGaps].sort().forEach(s=>console.log("  • "+s));
console.log("\n-- rules-line tokens unresolved ("+ruleGaps.size+") --");
[...ruleGaps].sort().forEach(s=>console.log("  • "+s));
