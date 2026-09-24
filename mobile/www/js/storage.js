/* storage.js — save/load: library (IndexedDB + localStorage fallback), .json files, autosave draft, export. */
/* =========================== EXPORT =========================== */
function exportList(){
  const limit=+document.getElementById("limit").value||0;
  let out=`${D.name} — ${grandTotal().toFixed(0)} / ${limit} pts\n${"=".repeat(40)}\n`;
  CATS.forEach(([cat,label])=>{
    const items=state.filter(e=>e.cat===cat); if(!items.length) return;
    out+=`\n${label.toUpperCase()} — ${Math.round(catTotal(cat))} pts\n`;
    items.forEach(e=>{ const u=findUnit(cat,e.id);
      let nm=u.isCharacter?u.variants[e.variant].name:`${u.perModel?e.count+'× ':''}${u.name}`;
      if(e.uid===generalUid) nm+=" [General]";
      out+=`  • ${nm} … ${Math.round(entryPoints(e)*10)/10} pts\n`;
      out+=describe(e,u).map(s=>`      - ${s}`).join("\n"); if(describe(e,u).length)out+="\n";
    });
  });
  const fname=(currentSaveName||"army-list").replace(/[^a-z0-9\-_ ]/gi,"_")+".txt";
  downloadFile(fname, out, "text/plain");
  navigator.clipboard && navigator.clipboard.writeText(out);
}
/* =========================== SAVE / LOAD =========================== */
/* Web app: the library lives in the browser (IndexedDB, localStorage fallback);
   .json files are downloaded / picked with a file input. The storage keys keep
   their original "cd-" / "chaos-dwarfs-" names so existing saves keep loading. */
const SAVE_APP="chaos-dwarfs-army-builder", SAVE_VER=1;
const LS_LIB="cd-army-library";          // browser-fallback library store
let currentSaveName=null;                // display name of the current army
let currentSaveFile=null;                // library filename it maps to (if any)

function updateSaveStatus(){
  const el=document.getElementById("saveStatus");
  if(!el) return;
  el.textContent = currentSaveName ? ("Current army: "+currentSaveName) : "Unsaved army";
}
function downloadFile(fname, text, type){
  const blob=new Blob([text],{type});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=fname; a.click();
}
function fileSafe(name){ return (String(name||"untitled").replace(/[^a-z0-9\-_ ]/gi,"_").trim().slice(0,80)||"untitled"); }

/* ---- temporary autosave draft ----
   Mobile browsers freeze/kill backgrounded tabs and lose unsaved work. We mirror
   the current roster to localStorage on every change (debounced) and on the
   page being hidden/closed, then silently restore it on the next launch. This is
   separate from the named library/file saves; it is the "you didn't lose your
   work" safety net, not a save slot. */
const LS_DRAFT="cd-army-draft";
let _draftT=null;
function saveDraft(){
  try{
    if(!state.length){ localStorage.removeItem(LS_DRAFT); return; }
    const snap=serializeArmy(currentSaveName);
    snap.draft=true; snap.savedName=currentSaveName||null;   // keep "unsaved" state across reload
    localStorage.setItem(LS_DRAFT, JSON.stringify(snap));
  }catch(_){ /* private mode / quota — best effort */ }
}
function scheduleDraft(){ clearTimeout(_draftT); _draftT=setTimeout(saveDraft,400); }
function clearDraft(){ clearTimeout(_draftT); try{ localStorage.removeItem(LS_DRAFT); }catch(_){} }
function restoreDraft(){
  let snap=null;
  try{ snap=JSON.parse(localStorage.getItem(LS_DRAFT)||"null"); }catch(_){ snap=null; }
  if(!snap || !Array.isArray(snap.state) || !snap.state.length) return false;
  if(!applyArmy(snap)) return false;                 // applyArmy switches army, loads state, renders
  currentSaveName = snap.savedName || null;          // restore "unsaved" status, not the draft's placeholder name
  currentSaveFile = null;
  updateSaveStatus();
  showRestoreNotice();
  return true;
}
function showRestoreNotice(){
  let n=document.getElementById("restoreNote");
  if(!n){ n=document.createElement("div"); n.id="restoreNote"; n.className="restore-note"; document.body.appendChild(n); }
  n.innerHTML='<span>Restored your unsaved work from last time.</span>'
    +'<button class="btn" onclick="discardDraft()">Discard</button>'
    +'<button class="btn" onclick="dismissRestore()">Dismiss</button>';
  requestAnimationFrame(()=>n.classList.add("show"));
}
function dismissRestore(){ const n=document.getElementById("restoreNote"); if(n) n.classList.remove("show"); }
function discardDraft(){
  clearDraft();
  state=[]; generalUid=null; currentSaveName=null; currentSaveFile=null;
  render(); updateSaveStatus(); dismissRestore(); toast("Unsaved work discarded");
}

/* ---- (de)serialize the whole roster ---- */
function serializeArmy(name){
  return {
    app:SAVE_APP, version:SAVE_VER, army:D.id,
    name: name||currentSaveName||"Untitled",
    savedAt: new Date().toISOString(),
    limit: +document.getElementById("limit").value||0,
    points: Math.round(grandTotal()),
    uidc, generalUid,
    state: JSON.parse(JSON.stringify(state))
  };
}
function applyArmy(data){
  if(!data || !Array.isArray(data.state)){ alert("That file is not a valid army."); return false; }
  if(data.app && data.app!==SAVE_APP){
    if(!confirm("This file was not created by this app. Try to load it anyway?")) return false;
  }
  if(data.army && data.army!==D.id){
    if(ARMY_BOOKS[data.army]){ switchArmy(data.army, true); }
    else if(!confirm(`This army ("${data.army}") isn't loaded. Load it under ${D.name} anyway?`)) return false;
  }
  state = JSON.parse(JSON.stringify(data.state));
  state.forEach(migrateEntry);                       // upgrade older save formats
  uidc = data.uidc || (state.reduce((m,e)=>Math.max(m,e.uid||0),0)+1);
  generalUid = data.generalUid || null;
  if(data.limit) document.getElementById("limit").value=data.limit;
  currentSaveName = data.name||null;
  currentSaveFile = null;            // set by library load when applicable
  render(); updateSaveStatus();
  return true;
}

/* ---- browser-fallback library store ----
   Primary store is IndexedDB (persists on file:// across Chrome/Firefox/Safari,
   unlike localStorage which Safari blocks on file://). localStorage is used as a
   fallback when IndexedDB is unavailable, and legacy localStorage entries are
   read so older saves still appear. */
function lsLibRead(){ try{ return JSON.parse(localStorage.getItem(LS_LIB)||"{}"); }catch(_){ return {}; } }
function lsLibWrite(o){ try{ localStorage.setItem(LS_LIB, JSON.stringify(o)); return true; }catch(_){ return false; } }

const IDB_NAME="cd-army-builder", IDB_STORE="armies";
let _idbPromise=null;
function idbOpen(){
  if(_idbPromise) return _idbPromise;
  _idbPromise=new Promise((res,rej)=>{
    if(!window.indexedDB){ rej(new Error("no-indexeddb")); return; }
    const req=indexedDB.open(IDB_NAME,1);
    req.onupgradeneeded=()=>{ const db=req.result; if(!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE,{keyPath:"file"}); };
    req.onsuccess=()=>res(req.result);
    req.onerror=()=>rej(req.error||new Error("indexeddb-open-failed"));
  });
  return _idbPromise;
}
function idbTx(mode,fn){ return idbOpen().then(db=>new Promise((res,rej)=>{
  const tx=db.transaction(IDB_STORE,mode); const st=tx.objectStore(IDB_STORE); let out;
  out=fn(st); tx.oncomplete=()=>res(out&&out.result!==undefined?out.result:out); tx.onerror=()=>rej(tx.error); tx.onabort=()=>rej(tx.error);
})); }
function idbAll(){ return idbTx("readonly",st=>st.getAll()).then(r=>r||[]); }
function idbPut(rec){ return idbTx("readwrite",st=>st.put(rec)); }
function idbGet(file){ return idbTx("readonly",st=>st.get(file)); }
function idbDel(file){ return idbTx("readwrite",st=>st.delete(file)); }

/* unified browser-store ops (IndexedDB first, localStorage fallback) */
async function libSave(file,data){
  try{ await idbPut({file,data}); return true; }
  catch(_){ const lib=lsLibRead(); lib[file]=data; return lsLibWrite(lib); }
}
async function libAll(){
  let recs=[];
  try{ recs=(await idbAll()).map(r=>({file:r.file,data:r.data})); }catch(_){}
  try{ const lib=lsLibRead(); for(const f in lib){ if(!recs.some(r=>r.file===f)) recs.push({file:f,data:lib[f]}); } }catch(_){}
  return recs;
}
async function libGet(file){
  try{ const r=await idbGet(file); if(r&&r.data) return r.data; }catch(_){}
  try{ return lsLibRead()[file]||null; }catch(_){ return null; }
}
async function libDelete(file){
  try{ await idbDel(file); }catch(_){}
  try{ const lib=lsLibRead(); delete lib[file]; lsLibWrite(lib); }catch(_){}
}

/* ---- LIBRARY: quick save ---- */
async function saveArmy(){
  if(!state.length){ toast("Nothing to save"); return; }
  let name=currentSaveName;
  if(!name){
    name=await modalPrompt("Save army as", "My "+D.name, "Save");
    if(!name) return;
  }
  const data=serializeArmy(name);
  const file=fileSafe(name)+".json";
  const ok=await libSave(file,data);
  if(!ok){ toast("Could not save — browser storage unavailable"); return; }
  currentSaveFile=file;
  currentSaveName=name; updateSaveStatus(); clearDraft(); toast('Saved "'+name+'"');
}

/* ---- FILE: save a .json anywhere ---- */
async function saveArmyToFile(){
  if(!state.length){ toast("Nothing to save"); return; }
  const name=currentSaveName||(fileSafe(D.name)+"-army");
  const data=serializeArmy(name);
  downloadFile(fileSafe(name)+".json", JSON.stringify(data,null,2), "application/json");
}

/* ---- FILE: open a .json from disk ---- */
async function openArmyFromFile(){
  const inp=document.createElement("input"); inp.type="file"; inp.accept=".json,application/json";
  inp.onchange=()=>{ const f=inp.files[0]; if(!f) return;
    const rd=new FileReader(); rd.onload=()=>{ try{ if(applyArmy(JSON.parse(rd.result))) toast("Loaded"); }catch(_){ alert("Could not read that file."); } };
    rd.readAsText(f);
  };
  inp.click();
}

/* ---- LIBRARY: manager modal ---- */
async function listLibrary(){
  const recs=await libAll();
  return recs.map(({file,data})=>({ file, name:(data&&data.name)||file, army:(data&&data.army)||null, savedAt:(data&&data.savedAt)||null, points:(data&&data.points)??null, limit:(data&&data.limit)??null }))
    .filter(it=>!it.army || it.army===D.id)
    .sort((a,b)=>String(b.savedAt).localeCompare(String(a.savedAt)));
}
async function libraryLoad(file){
  const data=await libGet(file);
  if(applyArmy(data)){ currentSaveFile=file; closeModal(); toast("Loaded"); }
}
async function libraryDelete(file,name){
  if(!confirm('Delete "'+name+'" from the library?')) return;
  await libDelete(file);
  if(currentSaveFile===file){ currentSaveFile=null; }
  openLibrary();
}
async function openLibrary(){
  const items=await listLibrary();
  document.getElementById("modalTitle").textContent="Army library";
  const body=document.getElementById("modalBody");
  if(!items.length){
    body.innerHTML='<p style="opacity:.7">No saved armies yet. Build a list and press <b>Save</b>.</p>';
  } else {
    body.innerHTML='<div class="liblist">'+items.map(it=>{
      const when=it.savedAt? new Date(it.savedAt).toLocaleString():"";
      const pts=(it.points!=null)?(it.points+(it.limit?(" / "+it.limit):"")+" pts"):"";
      const fa=encodeURIComponent(it.file), na=(it.name||"").replace(/"/g,"&quot;");
      return '<div class="librow"><div class="libmeta"><div class="libname">'+na+'</div>'+
             '<div class="libsub">'+[pts,when].filter(Boolean).join(" · ")+'</div></div>'+
             '<div class="libacts"><button class="btn primary" onclick="libraryLoad(decodeURIComponent(\''+fa+'\'))">Load</button>'+
             '<button class="btn" onclick="libraryDelete(decodeURIComponent(\''+fa+'\'),\''+na+'\')">Delete</button></div></div>';
    }).join("")+'</div>';
  }
  openModalRaw();
}
