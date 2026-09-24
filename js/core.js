/* core.js — global state, the army-book registry + lazy loader, roster-entry
   creation, and the single mutation path (update → undo/redo history). */
const APP_VERSION = "1.5.0";   // kept in sync with package.json by scripts/set-version.js

/* ---------- army books ----------
   data/books.js lists every book (id, name, file). Data files register themselves
   into window.ARMY_BOOKS when their <script> runs; loadBook() injects that script
   on first use, so only the chosen book is downloaded. */
const BOOK_INDEX = window.BOOK_INDEX || [];
const ARMY_BOOKS = (window.ARMY_BOOKS = window.ARMY_BOOKS || {});
const BOOK_IDS = BOOK_INDEX.map(b=>b.id);
const DEFAULT_ARMY = "chaos-dwarfs";
if(!BOOK_IDS.length){ document.body.innerHTML='<p style="color:#fff;padding:20px">Could not load the army list (data/books.js) — keep the data/ folder next to index.html.</p>'; throw new Error("no data"); }
function bookMeta(id){ return BOOK_INDEX.find(b=>b.id===id)||null; }
function bookName(id){ const b=bookMeta(id); return b?b.name:id; }
const _bookLoads={};
function loadBook(id){
  if(ARMY_BOOKS[id]) return Promise.resolve(ARMY_BOOKS[id]);
  const meta=bookMeta(id); if(!meta) return Promise.reject(new Error("unknown army "+id));
  if(!_bookLoads[id]) _bookLoads[id]=new Promise((res,rej)=>{
    const s=document.createElement("script"); s.src=meta.file;
    s.onload=()=>{ if(ARMY_BOOKS[id]) res(ARMY_BOOKS[id]); else { delete _bookLoads[id]; rej(new Error(meta.file+" did not register "+id)); } };
    s.onerror=()=>{ delete _bookLoads[id]; s.remove(); rej(new Error("could not load "+meta.file)); };
    document.head.appendChild(s);
  });
  return _bookLoads[id];
}
let CURRENT_ARMY = null;   // set by switchArmy() once the book has loaded
let D = null;              // the active book's data

const CMD_COST = {leader:5, musician:5, standard:10};   // fixed rulebook command costs
let state = [];           // roster entries
let uidc = 1;
let generalUid = null;    // uid of the character nominated as Army General
let collapsedCats = {};   // category collapse state (roster)
let collapsedCatalog = {};// category collapse state (left catalog)
const CATS = [["characters","Characters"],["core","Core"],["special","Special"],["rare","Rare"]];

/* ---------- find a unit definition ---------- */
function findUnit(cat, id){ return D.units[cat].find(u=>u.id===id); }

/* ---------- roster entries ---------- */
// a fresh entry for a unit with every option at its default (no uid)
function blankEntry(cat, id){
  const u = findUnit(cat,id);
  const e = { cat, id, variant:0, count: defaultCount(u), opts:{}, magic:{}, magicStd:"", gifts:[], powers:[], virtue:"", spells:[], sigSpells:[], runes:{}, collapsed:false };
  (u.options||[]).forEach(o=>{
    if(o.type==="choice") e.opts[o.id]=null;
    else if(o.type==="mustChoose") e.opts[o.id]=0;          // default first
    else if(o.type==="toggle") e.opts[o.id]=false;
    else if(o.type==="multi") e.opts[o.id]= o.repeatable?0:[];
    else if(o.type==="perN") e.opts[o.id]=0;                 // unit-size-based upgrade counter
    else if(o.type==="command") e.opts.cmd={leader:false,musician:false,standard:false};
    else if(o.type==="mount") e.opts.mount=null;
  });
  return e;
}
function addUnit(cat, id){
  update(()=>{ state.push(Object.assign({uid:uidc++}, blankEntry(cat,id))); });
}
function defaultCount(u){ if(u.isCharacter) return 1; if(!u.perModel) return 1; return u.unitSize? u.unitSize[0]:1; }
function duplicateEntry(uid){
  const i=state.findIndex(x=>x.uid===uid); if(i<0) return;
  update(()=>{ const copy=JSON.parse(JSON.stringify(state[i])); copy.uid=uidc++; copy.collapsed=false; state.splice(i+1,0,copy); });
}
function removeEntry(uid){
  const e=state.find(x=>x.uid===uid); if(!e) return;
  const nm=entryName(e);
  update(()=>{ state=state.filter(x=>x.uid!==uid); if(generalUid===uid) generalUid=null; });
  toast(`Removed ${nm}`, {label:"Undo", fn:undo});
}
function clearArmy(){
  if(!state.length) return;
  update(()=>{ state=[]; generalUid=null; });
  currentSaveName=null; currentSaveFile=null;
  toast("Army cleared", {label:"Undo", fn:undo});
}

/* ---------- the mutation path: update() + undo/redo ----------
   Every roster change goes through update(fn): it snapshots the roster, runs the
   change, re-renders (render reconciles entries) and, if the roster actually
   changed, pushes the old snapshot onto the undo stack. Pure view state
   (collapse carets) passes {history:false}. Snapshots leave out `collapsed`, and
   undo keeps each entry's current collapse state, so undo never re-folds cards. */
const HISTORY_MAX=100;
let _undo=[], _redo=[];
function snapshot(){
  return JSON.stringify({ uidc, generalUid, state: state.map(e=>{ const c=Object.assign({},e); delete c.collapsed; return c; }) });
}
function restoreSnapshot(s){
  const o=JSON.parse(s), folded={};
  state.forEach(e=>{ folded[e.uid]=!!e.collapsed; });
  state=o.state.map(e=>Object.assign(e,{collapsed:!!folded[e.uid]}));
  uidc=o.uidc; generalUid=o.generalUid;
}
function update(fn, opts){
  const before=snapshot();
  fn();
  render();
  if(opts && opts.history===false) return;
  if(snapshot()!==before){ _undo.push(before); if(_undo.length>HISTORY_MAX) _undo.shift(); _redo=[]; }
  updateHistoryUI();
}
function undo(){ if(!_undo.length) return; _redo.push(snapshot()); restoreSnapshot(_undo.pop()); render(); updateHistoryUI(); }
function redo(){ if(!_redo.length) return; _undo.push(snapshot()); restoreSnapshot(_redo.pop()); render(); updateHistoryUI(); }
function resetHistory(){ _undo=[]; _redo=[]; updateHistoryUI(); }
function updateHistoryUI(){
  const u=document.getElementById("undoBtn"), r=document.getElementById("redoBtn");
  if(u) u.disabled=!_undo.length; if(r) r.disabled=!_redo.length;
}

/* ---------- unsaved-changes tracking ----------
   The roster + limit as last saved/loaded; anything else is "unsaved". */
let _savedSig=null;
function armySig(){ return (D?D.id:"")+"|"+currentLimit()+"|"+snapshot(); }
function markSaved(){ _savedSig=armySig(); }
function isDirty(){ return state.length>0 && armySig()!==_savedSig; }
function currentLimit(){ return +document.getElementById("limit").value||0; }
