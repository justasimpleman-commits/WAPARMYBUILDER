/* app.js — army switching, header controls and page start-up. Loaded last. */

/* ---------- army switching ----------
   Loads the book's data file on first use. Resolves to true once the book is
   active (synchronously when it is already loaded). A switch from the Army menu
   is an undo step (no confirm — undo brings the old army back). `silent` skips
   the history step — used by loaders that replace the roster straight away and
   record their own step (files, library, draft, shared links). */
function activateBook(id){
  CURRENT_ARMY=id; D=ARMY_BOOKS[id];
  collapsedCats={}; collapsedCatalog={}; catalogQuery="";
  const q=document.getElementById("catSearch"); if(q) q.value="";
  const sub=document.getElementById("titleSub"); if(sub) sub.textContent="WARHAMMER — "+D.name.toUpperCase();
  const sel=document.getElementById("armySel"); if(sel) sel.value=id;
}
function switchArmy(id, silent){
  const sel=document.getElementById("armySel");
  const back=()=>{ if(sel) sel.value=CURRENT_ARMY||""; return false; };
  if(!bookMeta(id)) return Promise.resolve(back());
  if(id===CURRENT_ARMY && D) return Promise.resolve(true);
  const go=()=>{
    const reset=()=>{ activateBook(id); state=[]; generalUid=null; currentSaveName=null; currentSaveFile=null; saveNameHint=null; };
    const had=state.length;
    if(silent || !D){ reset(); render(); }
    else update(reset, {meta:true});
    markSaved(); updateSaveStatus();
    if(!silent && had) toast("Switched to "+D.name, {label:"Undo", fn:undo});
    return true;
  };
  if(ARMY_BOOKS[id]) return Promise.resolve(go());
  const sub=document.getElementById("titleSub"); if(sub) sub.textContent="LOADING "+bookName(id).toUpperCase()+"…";
  return loadBook(id).then(go, ()=>{
    if(sub) sub.textContent=D?"WARHAMMER — "+D.name.toUpperCase():"";
    toast("Could not load "+bookName(id)+" — check your connection and try again");
    return back();
  });
}
function renderArmySelect(){
  const s=document.getElementById("armySel"); if(!s) return; s.innerHTML="";
  BOOK_INDEX.forEach(b=>{ const o=document.createElement("option"); o.value=b.id; o.textContent=b.name; s.appendChild(o); });
  s.onchange=()=>switchArmy(s.value,false);
}

/* ---------- points limit + presets ---------- */
const LIMIT_PRESETS=[1000,1500,2000,2500,3000,4000];
function syncLimitPreset(){
  const p=document.getElementById("limitPreset"); if(!p) return;
  const v=currentLimit(); p.value=LIMIT_PRESETS.includes(v)?String(v):"";
}
function wireLimit(){
  const inp=document.getElementById("limit"), p=document.getElementById("limitPreset");
  inp.addEventListener("input",()=>{ syncLimitPreset(); render(); });
  if(p){
    p.innerHTML='<option value="">Custom</option>'+LIMIT_PRESETS.map(v=>`<option value="${v}">${v}</option>`).join("");
    p.onchange=()=>{ if(p.value){ inp.value=p.value; render(); } };
    syncLimitPreset();
  }
}

/* ---------- page wiring ---------- */
function wirePage(){
  wireLimit();
  const q=document.getElementById("catSearch");
  if(q) q.addEventListener("input",()=>{ catalogQuery=q.value; renderCatalog(); });
  document.getElementById("modalBg").addEventListener("click",e=>{ if(e.target.id==="modalBg") closeModal(); });
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){ if(document.getElementById("modal2Bg").classList.contains("open")) closeModal2(); else if(modalOpen()) closeModal(); else if(gameOpen) closeGameMode(); return; }
    // Ctrl/⌘+Z undo, Ctrl/⌘+Shift+Z or Ctrl+Y redo — not while typing or in a modal
    if(!(e.ctrlKey||e.metaKey) || e.altKey || modalOpen() || gameOpen) return;
    const tag=(e.target&&e.target.tagName)||"";
    if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT") return;
    const k=e.key.toLowerCase();
    if(k==="z" && !e.shiftKey){ e.preventDefault(); undo(); }
    else if((k==="z" && e.shiftKey) || k==="y"){ e.preventDefault(); redo(); }
  });
  // keep the autosave draft current, and warn before closing with unsaved changes
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) saveDraft(); });
  window.addEventListener("pagehide",saveDraft);
  window.addEventListener("beforeunload",e=>{ saveDraft(); if(isDirty()){ e.preventDefault(); e.returnValue=""; } });
  // a share link pasted into an already-open tab
  window.addEventListener("hashchange",()=>{ const c=sharedCodeInUrl(); if(c) openSharedArmy(c); });
}

/* ---------- start-up: shared link > restored draft > default army ---------- */
async function start(){
  renderArmySelect();
  { const v=document.getElementById("appVersion"); if(v) v.textContent="v"+APP_VERSION; }
  wirePage();
  updateHistoryUI();
  const code=sharedCodeInUrl(), draft=readDraft();
  let ready=false;
  // a shared link opens over a restored draft as an undo step (undo returns to the draft)
  if(draft) ready=await restoreDraft(!code);
  if(code) ready=(await openSharedArmy(code)) || ready;
  if(!D) await switchArmy(DEFAULT_ARMY, true);
}
start();
