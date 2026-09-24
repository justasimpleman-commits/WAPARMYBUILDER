/* core.js — global state, army-book registry handles, roster-entry creation. */
const APP_VERSION = "1.5.0";   // kept in sync with package.json by scripts/set-version.js
const ARMY_BOOKS = window.ARMY_BOOKS || {};
const BOOK_IDS = Object.keys(ARMY_BOOKS);
if(!BOOK_IDS.length){ document.body.innerHTML='<p style="color:#fff;padding:20px">Could not load army data files — keep the *.js data files in the same folder as index.html.</p>'; throw new Error("no data"); }
let CURRENT_ARMY = BOOK_IDS.includes("chaos-dwarfs") ? "chaos-dwarfs" : BOOK_IDS[0];
let D = ARMY_BOOKS[CURRENT_ARMY];
const CMD_COST = {leader:5, musician:5, standard:10};   // fixed rulebook command costs
let state = [];           // roster entries
let uidc = 1;
let generalUid = null;    // uid of the character nominated as Army General
let collapsedCats = {};   // category collapse state (roster)
let collapsedCatalog = {};// category collapse state (left catalog)
const CATS = [["characters","Characters"],["core","Core"],["special","Special"],["rare","Rare"]];

/* ---------- find a unit definition ---------- */
function findUnit(cat, id){ return D.units[cat].find(u=>u.id===id); }

/* ---------- create a roster entry with defaults ---------- */
function addUnit(cat, id){
  const u = findUnit(cat,id);
  const e = { uid: uidc++, cat, id, variant:0, count: defaultCount(u), opts:{}, magic:{}, magicStd:"", gifts:[], powers:[], virtue:"", spells:[], sigSpells:[], runes:{}, collapsed:false };
  (u.options||[]).forEach(o=>{
    if(o.type==="choice") e.opts[o.id]=null;
    else if(o.type==="mustChoose") e.opts[o.id]=0;          // default first
    else if(o.type==="toggle") e.opts[o.id]=false;
    else if(o.type==="multi") e.opts[o.id]= o.repeatable?0:[];
    else if(o.type==="perN") e.opts[o.id]=0;                 // unit-size-based upgrade counter
    else if(o.type==="command") e.opts.cmd={leader:false,musician:false,standard:false};
    else if(o.type==="mount") e.opts.mount=null;
  });
  state.push(e); render();
}
function defaultCount(u){ if(u.isCharacter) return 1; if(!u.perModel) return 1; return u.unitSize? u.unitSize[0]:1; }
function duplicateEntry(uid){
  const i=state.findIndex(x=>x.uid===uid); if(i<0) return;
  const copy=JSON.parse(JSON.stringify(state[i])); copy.uid=uidc++; copy.collapsed=false;
  state.splice(i+1,0,copy); render();
}
