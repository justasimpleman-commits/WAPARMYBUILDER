/* storage.js — save/load: library (IndexedDB + localStorage fallback), .json files, autosave draft, export. */
/* =========================== EXPORT =========================== */
function exportList(){
  const limit=currentLimit();
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
let saveNameHint=null;                   // suggested name for the first Save (e.g. a shared army's name)

/* "Current army: X ● unsaved changes" — also marks the tab title */
function updateSaveStatus(){
  const el=document.getElementById("saveStatus");
  const dirty=isDirty();
  if(el) el.innerHTML = (currentSaveName ? "Current army: "+esc(currentSaveName) : (state.length?"Unsaved army":"New army"))
    + (dirty && currentSaveName ? ' <span class="dirty" title="Changes since your last save">● unsaved changes</span>' : "");
  if(D) document.title=(dirty?"● ":"")+"Army Builder — "+D.name;
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
    snap.dirty=isDirty();
    localStorage.setItem(LS_DRAFT, JSON.stringify(snap));
  }catch(_){ /* private mode / quota — best effort */ }
}
function scheduleDraft(){ clearTimeout(_draftT); _draftT=setTimeout(saveDraft,400); }
function clearDraft(){ clearTimeout(_draftT); try{ localStorage.removeItem(LS_DRAFT); }catch(_){} }
function readDraft(){
  let snap=null;
  try{ snap=JSON.parse(localStorage.getItem(LS_DRAFT)||"null"); }catch(_){ snap=null; }
  return (snap && Array.isArray(snap.state) && snap.state.length) ? snap : null;
}
async function restoreDraft(notice){
  const snap=readDraft(); if(!snap) return false;
  if(!(await applyArmy(snap))) return false;         // applyArmy loads the book, the roster, renders
  currentSaveName = snap.savedName || null;          // restore "unsaved" status, not the draft's placeholder name
  currentSaveFile = null;
  if(snap.dirty!==false) _savedSig=null;             // it was unsaved when the page closed
  updateSaveStatus();
  if(notice!==false) showRestoreNotice();
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
  update(()=>{ state=[]; generalUid=null; });
  currentSaveName=null; currentSaveFile=null;
  updateSaveStatus(); dismissRestore(); toast("Unsaved work discarded", {label:"Undo", fn:undo});
}

/* ---- (de)serialize the whole roster ---- */
function serializeArmy(name){
  return {
    app:SAVE_APP, version:SAVE_VER, army:D.id,
    name: name||currentSaveName||"Untitled",
    savedAt: new Date().toISOString(),
    limit: currentLimit(),
    points: Math.round(grandTotal()),
    uidc, generalUid,
    state: JSON.parse(JSON.stringify(state))
  };
}
/* load a saved army (library, file, draft or shared link): fetches its book if
   needed and replaces the roster as one undo step (no confirm — undo brings the
   previous army back). At start-up (no army yet) there is nothing to undo to.
   `hist` = {s,m} snapshot + meta taken by a caller that changed things first. */
async function applyArmy(data, hist){
  hist = hist || (D ? {s:snapshot(), m:saveMeta()} : null);
  if(!data || !Array.isArray(data.state)){ alert("That file is not a valid army."); return false; }
  if(data.app && data.app!==SAVE_APP){
    if(!confirm("This file was not created by this app. Try to load it anyway?")) return false;
  }
  if(data.army && data.army!==(D&&D.id)){
    if(bookMeta(data.army)){ if(!(await switchArmy(data.army, true))) return false; }
    else if(!D || !confirm(`This army ("${data.army}") isn't one of the bundled books. Load it under ${D.name} anyway?`)) return false;
  }
  if(!D && !(await switchArmy(DEFAULT_ARMY, true))) return false;
  state = JSON.parse(JSON.stringify(data.state));
  state.forEach(migrateEntry);                       // upgrade older save formats
  uidc = data.uidc || (state.reduce((m,e)=>Math.max(m,e.uid||0),0)+1);
  generalUid = data.generalUid || null;
  if(data.limit) document.getElementById("limit").value=data.limit;
  currentSaveName = data.name||null;
  currentSaveFile = null;            // set by library load when applicable
  saveNameHint = null;
  render();
  if(hist && hist.s!==snapshot()) pushHistory(hist.s, hist.m);
  markSaved(); updateSaveStatus();
  return true;
}
/* "Loaded" toast, with Undo when the load replaced an army */
function loadedToast(msg, undoable){ toast(msg, undoable ? {label:"Undo", fn:undo} : null); }

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
    name=await modalPrompt("Save army as", saveNameHint||("My "+D.name), "Save");
    if(!name) return;
  }
  const data=serializeArmy(name);
  const file=fileSafe(name)+".json";
  const ok=await libSave(file,data);
  if(!ok){ toast("Could not save — browser storage unavailable"); return; }
  currentSaveFile=file;
  currentSaveName=name; saveNameHint=null; markSaved(); updateSaveStatus(); clearDraft(); toast('Saved "'+name+'"');
}

/* ---- FILE: save a .json anywhere ---- */
async function saveArmyToFile(){
  if(!state.length){ toast("Nothing to save"); return; }
  const name=currentSaveName||(fileSafe(D.name)+"-army");
  const data=serializeArmy(name);
  downloadFile(fileSafe(name)+".json", JSON.stringify(data,null,2), "application/json");
  markSaved(); updateSaveStatus();
}

/* ---- FILE: open a .json from disk ---- */
async function openArmyFromFile(){
  const inp=document.createElement("input"); inp.type="file"; inp.accept=".json,application/json";
  inp.onchange=()=>{ const f=inp.files[0]; if(!f) return;
    const rd=new FileReader(); rd.onload=async()=>{
      let data; try{ data=JSON.parse(rd.result); }catch(_){ alert("Could not read that file."); return; }
      const had=!!state.length;
      if(await applyArmy(data)) loadedToast("Loaded", had); };
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
  const data=await libGet(file), had=!!state.length;
  if(await applyArmy(data)){ currentSaveFile=file; closeModal(); loadedToast("Loaded", had); }
}
async function libraryDelete(file,name){
  const data=await libGet(file), wasCurrent=currentSaveFile===file;
  await libDelete(file);
  if(wasCurrent){ currentSaveFile=null; }
  openLibrary();
  // no confirm: the toast's Undo puts the saved army back
  if(data) toast('Deleted "'+name+'"', {label:"Undo", fn:async()=>{
    await libSave(file,data); if(wasCurrent) currentSaveFile=file;
    if(document.getElementById("modalBg").classList.contains("open") && document.getElementById("modalTitle").textContent==="Army library") openLibrary();
  }});
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

/* ---- SHARE: the whole army in a link ----
   The army is packed into the URL fragment (#army=…) so a list can be sent as a
   link and opened by anyone with the app. Nothing is uploaded — the fragment never
   leaves the browser. Each entry is stored as its differences from a fresh entry
   of that unit, the JSON is deflate-compressed (CompressionStream) and base64url
   encoded ("z" prefix); browsers without CompressionStream write plain JSON
   ("j" prefix). */
const SHARE_KEY="army=";
function packEntry(e){
  const b=blankEntry(e.cat,e.id), o={c:e.cat, i:e.id};
  for(const k in e){
    if(k==="uid"||k==="cat"||k==="id"||k==="collapsed") continue;
    if(k==="opts"){ const d={};
      for(const ok in e.opts){ if(JSON.stringify(e.opts[ok])!==JSON.stringify(b.opts[ok])) d[ok]=e.opts[ok]; }
      if(Object.keys(d).length) o.opts=d; continue; }
    if(JSON.stringify(e[k])!==JSON.stringify(b[k])) o[k]=e[k];
  }
  return o;
}
function unpackEntry(o,uid){
  const e=Object.assign({uid}, blankEntry(o.c,o.i));
  for(const k in o){ if(k==="c"||k==="i") continue; if(k==="opts") Object.assign(e.opts,o.opts); else e[k]=o[k]; }
  return e;
}
function b64url(u8){ let s=""; for(let i=0;i<u8.length;i+=0x8000) s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));
  return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); }
function unb64url(s){ s=s.replace(/-/g,"+").replace(/_/g,"/"); while(s.length%4) s+="=";
  const b=atob(s), u=new Uint8Array(b.length); for(let i=0;i<b.length;i++) u[i]=b.charCodeAt(i); return u; }
async function pipeBytes(bytes,stream){ return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer()); }
async function encodeShare(){
  const json=JSON.stringify({ v:1, a:D.id, l:currentLimit(), n:currentSaveName||"",
    g:state.findIndex(e=>e.uid===generalUid), s:state.map(packEntry) });
  const bytes=new TextEncoder().encode(json);
  if(window.CompressionStream) return "z"+b64url(await pipeBytes(bytes,new CompressionStream("deflate-raw")));
  return "j"+b64url(bytes);
}
async function decodeShare(code){
  const bytes=unb64url(code.slice(1));
  let raw;
  if(code[0]==="z"){ if(!window.DecompressionStream) throw new Error("this browser cannot open compressed links");
    raw=await pipeBytes(bytes,new DecompressionStream("deflate-raw")); }
  else if(code[0]==="j") raw=bytes;
  else throw new Error("unknown link format");
  return JSON.parse(new TextDecoder().decode(raw));
}
async function shareArmy(){
  if(!state.length){ toast("Nothing to share"); return; }
  const url=location.href.split("#")[0]+"#"+SHARE_KEY+await encodeShare();
  let copied=false; try{ await navigator.clipboard.writeText(url); copied=true; }catch(_){}
  const local=location.protocol==="file:";
  openModal("Share this army",
    `<div class="rule">${copied?"Link copied to the clipboard.":"Copy this link."} Whoever opens it gets this army loaded in the builder — nothing is uploaded; the whole list travels inside the link.</div>`
    +`<input id="shareUrl" class="shareurl" readonly value="${esc(url).replace(/"/g,"&quot;")}">`
    +`<div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="btn primary" onclick="copyShareUrl()">Copy link</button></div>`
    +(local?`<div class="note" style="margin-top:8px">You are running the app from a local file, so this link only opens on this computer. Share from the hosted (GitHub Pages) version to send it to someone else.</div>`:""));
  const inp=document.getElementById("shareUrl"); if(inp){ inp.focus(); inp.select(); }
}
function copyShareUrl(){
  const inp=document.getElementById("shareUrl"); if(!inp) return; inp.select();
  const fallback=()=>{ try{ document.execCommand("copy"); toast("Link copied"); }catch(_){ toast("Select the link and copy it"); } };
  if(navigator.clipboard) navigator.clipboard.writeText(inp.value).then(()=>toast("Link copied"),fallback); else fallback();
}
function sharedCodeInUrl(){ const h=location.hash||""; return h.startsWith("#"+SHARE_KEY) ? h.slice(1+SHARE_KEY.length) : null; }
function clearShareHash(){ try{ history.replaceState(null,"",location.pathname+location.search); }catch(_){ location.hash=""; } }
/* open an army from a share code, as one undo step over the current army */
async function openSharedArmy(code){
  clearShareHash();
  let p; try{ p=await decodeShare(code); }catch(err){ toast("Could not open that link ("+err.message+")"); return false; }
  if(!p || !p.a || !Array.isArray(p.s)){ toast("That link doesn't contain an army"); return false; }
  if(!bookMeta(p.a)){ alert(`That link is for an army this app doesn't have ("${p.a}").`); return false; }
  const hist = D ? {s:snapshot(), m:saveMeta()} : null, had=!!state.length;
  if(!(await switchArmy(p.a,true))) return false;
  let skipped=0; const st=[];
  p.s.forEach((o,i)=>{ if(!findUnit(o.c,o.i)){ skipped++; return; } const e=unpackEntry(o,i+1); migrateEntry(e); st.push(e); });
  const ok=await applyArmy({ app:SAVE_APP, army:p.a, name:null, limit:p.l, uidc:p.s.length+1,
    generalUid:(p.g>=0?p.g+1:null), state:st }, hist);
  if(!ok) return false;
  saveNameHint=p.n||null; _savedSig=null; updateSaveStatus();
  toast(`Opened a shared ${D.name} army${p.n?` “${p.n}”`:""}${skipped?` (${skipped} unknown unit${skipped>1?"s":""} skipped)`:""} — Save to keep it`, had ? {label:"Undo", fn:undo} : null);
  return true;
}
