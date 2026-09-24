/* app.js — army switching and page start-up. Loaded last. */
/* ---------- army switching ---------- */
function switchArmy(id, keepState){
  if(!ARMY_BOOKS[id]) return;
  if(!keepState && state.length && !confirm("Switching armies will clear the current roster. Continue?")){
    const sel=document.getElementById("armySel"); if(sel) sel.value=CURRENT_ARMY; return;
  }
  CURRENT_ARMY=id; D=ARMY_BOOKS[id];
  if(!keepState){ state=[]; generalUid=null; currentSaveName=null; currentSaveFile=null; }
  collapsedCats={}; collapsedCatalog={};
  const sub=document.getElementById("titleSub"); if(sub) sub.textContent="WARHAMMER — "+D.name.toUpperCase();
  const sel=document.getElementById("armySel"); if(sel) sel.value=id;
  render(); updateSaveStatus();
}
function renderArmySelect(){
  const s=document.getElementById("armySel"); if(!s) return; s.innerHTML="";
  BOOK_IDS.forEach(id=>{ const o=document.createElement("option"); o.value=id; o.textContent=ARMY_BOOKS[id].name; if(id===CURRENT_ARMY)o.selected=true; s.appendChild(o); });
  s.onchange=()=>switchArmy(s.value,false);
}

document.getElementById("limit").addEventListener("input",render);
document.getElementById("modalBg").addEventListener("click",e=>{ if(e.target.id==="modalBg") closeModal(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });

renderArmySelect();
{ const _v=document.getElementById("appVersion"); if(_v) _v.textContent="v"+APP_VERSION; }
document.getElementById("titleSub").textContent="WARHAMMER — "+D.name.toUpperCase();
render();
updateSaveStatus();

/* restore any unsaved work, then keep the draft current as the user edits */
restoreDraft();
if(document.addEventListener) document.addEventListener("visibilitychange",()=>{ if(document.hidden) saveDraft(); });
if(window.addEventListener){
  window.addEventListener("pagehide",saveDraft);
  window.addEventListener("beforeunload",saveDraft);
}
