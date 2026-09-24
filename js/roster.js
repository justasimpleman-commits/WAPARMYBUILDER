/* roster.js — the main UI: catalogue, bars, roster entry cards, summary, validation panel. */
/* =========================== RENDER ===========================
   render() is cheap to call after any change: entries are reconciled (kept
   legal), the catalogue only refreshes its badges, and the roster re-draws just
   the entry cards whose content changed (see renderRoster). */
function render(){
  if(!D) return;
  state.forEach(reconcileEntry);
  renderCatalog(); renderRoster(); renderBars(); renderSummary(); renderValidation();
  updateSaveStatus(); scheduleDraft();
}

/* ---------- Runic-item builder ----------
   An entry-side row (pickBtn "Inscribe…") that opens the rune picker for ONE
   slot category and stores the chosen flat rune list in e.runes[cat].
   `budgetAvail` = the most this single item may cost (Infinity for the BSB). */
function runeSlotRow(e,u,cat,budgetAvail,label){
  const list=(e.runes&&e.runes[cat])||[];
  const r=mkRow(label||cat);
  const cost=runeCatCost(cat,list);
  const g=runeGroup(list);
  const summ=Object.keys(g).map(n=>g[n]>1?`${n} ×${g[n]}`:n).join(", ");
  const open=()=>openRunePicker({ title:cat, cat, e, u, current:list.slice(),
    budget:budgetAvail, onConfirm:(nl)=>update(()=>{ (e.runes=e.runes||{})[cat]=nl; }) });
  r.appendChild(pickBtn(list.length?`${summ} (${cost})`:"Inscribe…", !list.length, open));
  r.appendChild(pickInfoBtn("Inscribed runes", ()=>openChosenInfoRows(cat,
    Object.keys(g).map(n=>{ const rd=runeDef(cat,n); return { name:g[n]>1?`${n} ×${g[n]}`:n, cost:runeCopyCost(rd,g[n]), desc:rd?rd.desc:"" }; }))));
  return r;
}
function renderSummary(){
  const el=document.getElementById("summary");
  if(!state.length){ el.innerHTML='<div class="empty note">Empty — add units to see your roster outline here.</div>'; return; }
  let html="";
  CATS.forEach(([cat,label])=>{
    const items=state.filter(e=>e.cat===cat); if(!items.length) return;
    html+=`<div class="scat"><span>${label}</span><b>${Math.round(catTotal(cat))}</b></div>`;
    items.forEach(e=>{ const u=findUnit(cat,e.id);
      const nm = u.isCharacter ? u.variants[e.variant].name : u.name;
      const ct = isLone(u) ? "" : `<span class="ct">×${e.count}</span>`;
      const genTag = (cat==="characters" && e.uid===generalUid) ? ' <span style="color:var(--fire2)" title="Army General">★</span>' : '';
      const price = Math.round(entryPoints(e)*10)/10;
      html+=`<div class="srow" onclick="scrollToEntry(${e.uid})">`
        +`<button class="info sinfo" title="Details & loadout" onclick="event.stopPropagation();openEntryInfo(${e.uid})">i</button>`
        +`<span class="snm">${esc(nm)}${genTag}</span>${ct}`
        +`<span class="spts">${price}</span></div>`;
    });
  });
  html+=`<div class="grand"><span>Total</span><span>${Math.round(grandTotal()*10)/10}</span></div>`;
  el.innerHTML=html;
}
/* jump to a roster entry (from the summary or a validation message), unfolding
   its card and category first if they are collapsed */
function scrollToEntry(uid){
  const e=state.find(x=>x.uid===uid);
  if(e && (e.collapsed || collapsedCats[e.cat])){ e.collapsed=false; collapsedCats[e.cat]=false; render(); }
  const n=document.getElementById("entry-"+uid);
  if(n){ n.scrollIntoView({behavior:"smooth",block:"center"}); n.style.outline="2px solid var(--fire)";
    setTimeout(()=>n.style.outline="",1200); } }

/* ---------- spell selection (per wizard level) ---------- */
/* Spell selection uses the SAME modal multi-pick picker as magic items / gifts:
   a "Choose…" button opens openItemPicker listing every choosable spell with its
   full effect inline; signature spell(s) and the lore attribute are always known
   and shown read-only above the button (not in the picker, not counted). */
function renderSpells(e,u){
  const box=document.createElement("div"); box.className="magic";
  const lvl=wizardLevel(e,u);
  const bonus=bonusSpells(e);               // +1 per carried Spell-Familiar-type item
  const cap=lvl+bonus;                       // signature & lore attribute are free; choose wizard-level spells (+ item bonuses)
  const head=document.createElement("div"); head.className="mt";
  head.innerHTML=`Spells <span style="color:var(--muted)">— signature &amp; lore attribute known automatically; choose ${cap} more (wizard level ${lvl}${bonus?` + ${bonus} from items`:``}), max spell level ${lvl}</span>`;
  box.appendChild(head);
  if(!e.lore){ const n=document.createElement("div"); n.className="note"; n.textContent="Choose a Lore of Magic above to pick spells."; box.appendChild(n); return box; }
  const lore=loreData(e.lore);
  if(!lore){ const n=document.createElement("div"); n.className="note"; n.textContent="No spell data for this lore."; box.appendChild(n); return box; }
  // e.spells holds only the chosen NON-signature spells (kept legal by reconcileSpells);
  // signatures are implicit & always known.
  // always-known: lore attribute + signature spell(s), shown read-only
  const free=[];
  if(lore.attribute) free.push(lore.attribute.name+" (lore attribute)");
  lore.spells.filter(sp=>sp.lvl===0).forEach(sp=>free.push(sp.name+" (signature)"));
  if(free.length){ const f=document.createElement("div"); f.className="note"; f.innerHTML="Always known: "+esc(free.join(", ")); box.appendChild(f); }
  const cnt=document.createElement("div"); cnt.className="budget"+(e.spells.length>cap?" over":"");
  cnt.innerHTML=`Chosen <b>${e.spells.length}</b> / ${cap}`;
  box.appendChild(cnt);
  // Always-known group: lore attribute + signature spell(s), shown in the picker
  // as already-chosen (locked) rows with their full effect — informational only.
  const freeItems=[];
  if(lore.attribute) freeItems.push({ name:lore.attribute.name, locked:true, reason:"lore attribute",
    html:`<div class="d">${esc(lore.attribute.text)}</div>` });
  lore.spells.filter(sp=>sp.lvl===0).forEach(sp=>freeItems.push({ name:sp.name, locked:true, reason:"signature",
    html:`<div class="d"><span class="slvl">L${sp.lvl}</span> <span class="scast">${esc(String(sp.cast))}+</span> <span class="note">${esc(sp.type)} · ${esc(sp.range)}</span><br>${esc(sp.effect)}</div>` }));
  const open=()=>openItemPicker({
    title:`Spells — Lore of ${e.lore}`,
    multi:true, maxPicks:cap, selected:e.spells.slice(),
    groups:[
     ...(freeItems.length?[{ label:"Always known (free)", items:freeItems }]:[]),
     { label:`Lore of ${e.lore}`, items: lore.spells.filter(sp=>sp.lvl!==0).map(sp=>{
      const tooHigh = sp.lvl>lvl;                                  // beyond the wizard's level
      return { name:sp.name,                                       // cost omitted → no "pts" shown
        disabled:tooHigh, reason: tooHigh?`requires a level ${sp.lvl} wizard`:"",
        html:`<div class="d"><span class="slvl">L${sp.lvl}</span> <span class="scast">${esc(String(sp.cast))}+</span> <span class="note">${esc(sp.type)} · ${esc(sp.range)}</span><br>${esc(sp.effect)}</div>` };
    }) }],
    onConfirm:(sel)=>update(()=>{ e.spells=sel.filter(nm=>lore.spells.some(sp=>sp.name===nm && sp.lvl!==0 && sp.lvl<=lvl)).slice(0,cap); })
  });
  box.appendChild(pickBtn(e.spells.length?e.spells.join(", "):"Choose…", !e.spells.length, open));

  // Arcane Familiar &c.: additional signature spell(s) from any of the 8 Winds —
  // a SEPARATE pool/picker, not counted against the wizard-level cap above.
  const sigCap=bonusSignatures(e);
  const winds=windSignatures();
  const ownSigs=new Set(lore.spells.filter(sp=>sp.lvl===0).map(sp=>sp.name));   // already known free
  if(sigCap>0){
    const sh=document.createElement("div"); sh.className="mt";
    sh.innerHTML=`Additional signature spell${sigCap>1?"s":""} <span style="color:var(--muted)">— from any of the eight Winds of Magic (granted by an item); choose ${sigCap}</span>`;
    box.appendChild(sh);
    const sc=document.createElement("div"); sc.className="budget"+(e.sigSpells.length>sigCap?" over":"");
    sc.innerHTML=`Chosen <b>${e.sigSpells.length}</b> / ${sigCap}`; box.appendChild(sc);
    const sigItems=winds.map(w=>{
      const dup=ownSigs.has(w.name);   // already a signature of the wizard's own lore
      return { name:w.name, disabled:dup, reason:dup?"already known":"",
        html:`<div class="d"><span class="note">Lore of ${esc(w.lore)}</span> · <span class="slvl">Signature</span> <span class="scast">${esc(String(w.sp.cast))}+</span> <span class="note">${esc(w.sp.type)} · ${esc(w.sp.range)}</span><br>${esc(w.sp.effect)}</div>` };
    });
    const openSig=()=>openItemPicker({
      title:`Additional signature spell — the eight Winds of Magic`,
      multi:true, maxPicks:sigCap, selected:e.sigSpells.slice(),
      groups:[{ label:"Signature spells (8 Winds)", items:sigItems }],
      onConfirm:(sel)=>update(()=>{ e.sigSpells=sel.filter(nm=>winds.some(w=>w.name===nm)).slice(0,sigCap); })
    });
    box.appendChild(pickBtn(e.sigSpells.length?e.sigSpells.join(", "):"Choose…", !e.sigSpells.length, openSig));
  }
  return box;
}
/* ---------- catalogue (left column) ----------
   Built once per book / search / collapse state; every render() then only
   refreshes each row's badge: how many are in the army, the Special/Rare
   duplicate count against its cap, and special characters already taken. */
let catalogQuery="";
let _catalogKey=null, _catalogRows=[];
function renderCatalog(){
  const key=[CURRENT_ARMY, catalogQuery, JSON.stringify(collapsedCatalog)].join("|");
  if(key!==_catalogKey){ buildCatalog(); _catalogKey=key; }
  refreshCatalog();
}
function catalogMatches(u,q){
  if(!q) return true; const s=q.toLowerCase();
  return u.name.toLowerCase().includes(s) || (u.isCharacter && u.variants.some(v=>v.name.toLowerCase().includes(s)));
}
function buildCatalog(){
  const el=document.getElementById("catalogList"); el.innerHTML=""; _catalogRows=[];
  const q=catalogQuery.trim(); let shown=0;
  CATS.forEach(([cat,label])=>{
    const units=D.units[cat].filter(u=>catalogMatches(u,q));
    if(q && !units.length) return;
    const collapsed=!q && !!collapsedCatalog[cat];          // a search always shows its matches
    const h=document.createElement("h2"); h.className="sec cathead";
    h.innerHTML=`<span class="cv">${collapsed?'▸':'▾'}</span><span>${label}</span><span class="cpts">${units.length}</span>`;
    h.onclick=()=>{ collapsedCatalog[cat]=!collapsedCatalog[cat]; renderCatalog(); };
    el.appendChild(h);
    if(collapsed) return;
    units.forEach(u=>{
      shown++;
      const base = u.isCharacter ? Math.min(...u.variants.map(v=>v.points)) : u.basePoints;
      const ptlab = u.isCharacter ? base+"+ pts" : (u.perModel? base+" pts/model" : base+" pts");
      const d=document.createElement("div"); d.className="catitem";
      d.innerHTML=`<span class="cname">${esc(u.name)}<br><span class="pts">${ptlab}${u.isSpecialChar?' · unique':''}</span></span>`;
      const badge=document.createElement("span"); badge.className="cbadge"; d.appendChild(badge);
      const info=document.createElement("button"); info.className="info"; info.textContent="i"; info.title="Stats & special rules";
      info.onclick=(ev)=>{ ev.stopPropagation(); openUnitDetail(cat,u.id,0); }; d.appendChild(info);
      const add=document.createElement("button"); add.className="add"; add.textContent="+"; add.title="Add to army";
      add.onclick=()=>addUnit(cat,u.id); d.appendChild(add); el.appendChild(d);
      _catalogRows.push({cat,u,row:d,badge,add});
    });
  });
  if(q && !shown){ const n=document.createElement("div"); n.className="empty note"; n.textContent=`No units match “${q}”.`; el.appendChild(n); }
}
function refreshCatalog(){
  const limit=currentLimit(), cap=dupCap(limit), counts={};
  state.forEach(e=>{ const k=e.cat+":"+e.id; counts[k]=(counts[k]||0)+1; });
  _catalogRows.forEach(({cat,u,row,badge,add})=>{
    const n=counts[cat+":"+u.id]||0;
    const taken=!!(u.isSpecialChar && n>0);
    let txt="", cls="cbadge", tip="";
    if(taken){ txt="taken"; tip="Special characters are unique — already in your army"; }
    else if(n && (cat==="special"||cat==="rare")){ const mx=cap[cat];
      txt=`${n}/${mx}`; tip=`${n} in your army — up to ${mx} of the same ${cat} choice at ${limit} pts`;
      if(n>mx) cls+=" over"; else if(n===mx) cls+=" full"; }
    else if(n){ txt="×"+n; tip=`${n} in your army`; }
    badge.textContent=txt; badge.className=cls; badge.title=tip;
    if(taken) row.classList.add("taken"); else row.classList.remove("taken");
    add.disabled=taken; add.title=taken?tip:"Add to army";
  });
}

function renderBars(){
  const limit = currentLimit();
  syncLimitPreset();
  const tot=grandTotal();
  const tEl=document.getElementById("totalPts"); tEl.textContent=Math.round(tot*10)/10;
  tEl.className="big"+(tot>limit?" over":"");
  document.getElementById("totalNote").textContent="of "+limit;
  const defs=[
    ["Characters","characters",D.composition.charactersMax,"max"],
    ["Core","core",D.composition.coreMin,"min"],
    ["Special","special",D.composition.specialMax,"max"],
    ["Rare","rare",D.composition.rareMax,"max"]
  ];
  document.getElementById("bars").innerHTML = defs.map(([lab,cat,frac,kind])=>{
    const cap=limit*frac, used=catTotal(cat);
    const pct=cap>0?Math.min(100,used/cap*100):0;
    let cls="fill", flag="";
    if(kind==="max" && used>cap+0.001){cls+=" bad"; flag=" ⚠";}
    if(kind==="min"){ cls+= used>=cap-0.001?" good":""; flag = used<cap-0.001?" ⚠":""; }
    return `<div class="bar"><div class="lab"><span>${lab} <span style="color:var(--muted)">(${kind} ${Math.round(frac*100)}%)</span></span>
      <b>${Math.round(used)} / ${Math.round(cap)}${flag}</b></div>
      <div class="track"><div class="${cls}" style="width:${pct}%"></div></div></div>`;
  }).join("");
}

/* ---------- roster (centre column) ----------
   Entry cards are cached per entry object with a signature of everything they
   show; render() rebuilds only the cards whose signature changed and leaves the
   rest of the DOM (and focus / scroll) untouched. A change to the army's make-up
   (units added/removed/reordered) drops the cache, because an entry's options can
   depend on other units being present (`requires.unit`). */
let _entryCache=new WeakMap(), _rosterCtx=null, _catHeads={};
function entryNode(e){
  const sig=JSON.stringify(e)+"|"+(generalUid===e.uid)+"|"+entryPoints(e);
  const c=_entryCache.get(e);
  if(c && c.sig===sig) return c.node;
  const node=renderEntry(e); _entryCache.set(e,{sig,node}); return node;
}
function catHeadNode(cat,label,items){
  const collapsed=!!collapsedCats[cat];
  const html=`<span class="cv">${collapsed?'▸':'▾'}</span><span>${label}</span><span class="cpts">${Math.round(catTotal(cat))} pts · ${items.length}</span>`;
  const c=_catHeads[cat]; if(c && c.html===html) return c.node;
  const h=document.createElement("h2"); h.className="sec cathead"; h.innerHTML=html;
  h.onclick=()=>{ collapsedCats[cat]=!collapsedCats[cat]; render(); };
  _catHeads[cat]={html,node:h}; return h;
}
// make el's children exactly `nodes`, moving/adding/removing as little as possible
function patchChildren(el,nodes){
  if(typeof el.insertBefore!=="function"){ el.innerHTML=""; nodes.forEach(n=>el.appendChild(n)); return; }  // DOM stub (tests)
  let ref=el.firstChild;
  for(const n of nodes){ if(n===ref){ ref=ref.nextSibling; continue; } el.insertBefore(n,ref); }
  while(ref){ const nx=ref.nextSibling; el.removeChild(ref); ref=nx; }
}
function renderRoster(){
  const el=document.getElementById("roster");
  if(state.length===0){ el.innerHTML='<div class="empty">No units yet. Add units from the catalogue on the left.</div>'; _catHeads={}; return; }
  const ctx=CURRENT_ARMY+"|"+state.map(x=>x.uid+":"+x.id).join(",");
  if(ctx!==_rosterCtx){ _rosterCtx=ctx; _entryCache=new WeakMap(); }
  const nodes=[];
  CATS.forEach(([cat,label])=>{
    const items=state.filter(e=>e.cat===cat); if(!items.length) return;
    nodes.push(catHeadNode(cat,label,items));
    if(!collapsedCats[cat]) items.forEach(e=>nodes.push(entryNode(e)));
  });
  patchChildren(el,nodes);
}

function renderEntry(e){
  const u=findUnit(e.cat,e.id);
  const wrap=document.createElement("div"); wrap.className="entry"; wrap.id="entry-"+e.uid;
  const pts=entryPoints(e);
  // head
  const head=document.createElement("div"); head.className="ehead";
  let nm = u.isCharacter ? u.variants[e.variant].name : u.name;
  const cv=document.createElement("button"); cv.className="cvbtn"; cv.textContent=e.collapsed?"▸":"▾"; cv.title=e.collapsed?"Expand":"Collapse";
  cv.onclick=()=>{ e.collapsed=!e.collapsed; render(); }; head.appendChild(cv);
  const info=document.createElement("button"); info.className="info"; info.textContent="i"; info.title="Stats, rules & this unit's loadout";
  info.onclick=()=>openUnitDetail(e.cat,e.id,e.variant,e);
  head.appendChild(info);
  const t=document.createElement("span"); t.className="htitle";
  const cntTag = (!u.isCharacter && u.perModel) ? ` <span class="cnt">×${e.count}</span>` : "";
  t.innerHTML=`<span class="nm">${esc(nm)}</span>${cntTag} <span class="cat">${e.cat}</span>`;
  t.style.cursor="pointer"; t.onclick=()=>{ e.collapsed=!e.collapsed; render(); }; head.appendChild(t);
  const ept=document.createElement("span"); ept.className="ept"; ept.textContent=Math.round(pts*10)/10; head.appendChild(ept);
  const dup=document.createElement("button"); dup.className="del dup"; dup.textContent="⧉"; dup.title="Duplicate";
  dup.onclick=()=>duplicateEntry(e.uid); head.appendChild(dup);
  const del=document.createElement("button"); del.className="del"; del.textContent="✕"; del.title="Remove";
  del.onclick=()=>removeEntry(e.uid);
  head.appendChild(del); wrap.appendChild(head);

  if(e.collapsed){ if(entryErrors(e,u).length) wrap.classList.add("invalid"); return wrap; }

  const body=document.createElement("div"); body.className="ebody";

  // Army General nomination (any eligible character may be the General; only one in the army)
  if(u.isCharacter && !u.cannotBeGeneral){
    const r=mkRow("General");
    const lab=document.createElement("label"); lab.className="chk";
    const c=document.createElement("input"); c.type="radio"; c.name="armyGeneral"; c.checked=generalUid===e.uid;
    c.onchange=()=>update(()=>{ generalUid=e.uid; });
    lab.append(c,document.createTextNode("Army General"));
    r.appendChild(lab); body.appendChild(r);
  }

  // variant selector (characters with >1)
  if(u.isCharacter && u.variants.length>1){
    const r=mkRow("Profile");
    const s=document.createElement("select");
    u.variants.forEach((v,i)=>{ const o=document.createElement("option"); o.value=i; o.textContent=`${v.name} (${v.points})`; if(i===e.variant)o.selected=true; s.appendChild(o); });
    s.onchange=()=>update(()=>{ e.variant=+s.value; e.magic={}; e.runes={}; }); r.appendChild(s); body.appendChild(r);
  }

  // unit size — clamp to the unit's allowed min/max (open-ended max stays unbounded)
  if(u.perModel){
    const mn = u.unitSize ? u.unitSize[0] : 1;
    const mx = u.unitSize && u.unitSize[1]!=null ? u.unitSize[1] : Infinity;
    const clamp=(n)=>Math.max(mn,Math.min(mx,Math.floor(n)));
    const r=mkRow("Models");
    const st=document.createElement("div"); st.className="stepper";
    const minus=document.createElement("button"); minus.textContent="–";
    const inp=document.createElement("input"); inp.type="number"; inp.value=e.count;
    inp.min=mn; if(mx!==Infinity) inp.max=mx;
    const plus=document.createElement("button"); plus.textContent="+";
    minus.disabled = e.count<=mn; plus.disabled = e.count>=mx;
    minus.onclick=()=>update(()=>{ e.count=clamp(e.count-1); });
    plus.onclick=()=>update(()=>{ e.count=clamp(e.count+1); });
    inp.onchange=()=>update(()=>{ e.count=clamp(+inp.value||mn); });
    st.append(minus,inp,plus); r.appendChild(st);
    if(u.unitSize){ const sw=document.createElement("span");
      const bad=e.count<mn||(mx!==Infinity&&e.count>mx);
      sw.className=bad?"size-warn":"note"; sw.textContent=`(${mn}${mx===Infinity?'+':'–'+mx})`; r.appendChild(sw); }
    body.appendChild(r);
  }

  // required attached models at a fixed ratio (e.g. Squig Herd Herders) — shown and
  // auto-costed, so the player sees how many are included and their points.
  if(u.attachedPerN){ const ap=u.attachedPerN, n=attachedCount(e,u);
    const r=mkRow(ap.name+"s"); const sp=document.createElement("span"); sp.className="note";
    sp.textContent=`${n} × ${ap.name} auto-included (+${n*ap.cost} pts) — one per ${ap.every} models`;
    r.appendChild(sp); body.appendChild(r); }

  // options (a run of 3+ plain add-on toggles collapses into one Upgrades picker)
  renderOptions(e,u,body);

  // lore selector + spell picker for wizards
  if(u.lores && wizardActive(e,u)){
    const avail=availableLores(e,u);
    const r=mkRow("Lore of Magic"); const s=document.createElement("select");
    s.innerHTML='<option value="">— choose —</option>'+avail.map(l=>`<option ${e.lore===l?'selected':''}>${esc(l)}</option>`).join("");
    s.onchange=()=>update(()=>{ e.lore=s.value; e.spells=[]; }); r.appendChild(s); body.appendChild(r);
    body.appendChild(renderSpells(e,u));
  }

  // magic items (characters with a budget, or BSB)
  const budget = magicBudget(e,u);
  if(budget>0 || isBSB(e,u)){
    body.appendChild(renderMagic(e,u,budget));
  }

  // war-machine engineering runes (non-character units with a rune budget)
  if(hasRunes() && !u.isCharacter && u.engineeringRunes){
    const list=(e.runes&&e.runes["Engineering Runes"])||[];
    const used=runeCatCost("Engineering Runes",list);
    const box=document.createElement("div"); box.className="magic";
    box.innerHTML=`<div class="mt">Engineering Runes</div>`;
    const bd=document.createElement("div"); bd.className="budget"+(used>u.engineeringRunes?" over":"");
    bd.innerHTML=`Spent <b>${used}</b> / ${u.engineeringRunes} pts <span class="note">· ${Math.max(0,u.engineeringRunes-used)} left</span>`;
    box.appendChild(bd);
    box.appendChild(runeSlotRow(e,u,"Engineering Runes",u.engineeringRunes,"Runes"));
    body.appendChild(box);
  }

  if(u.notes){ const n=document.createElement("div"); n.className="note"; n.textContent="ⓘ "+u.notes; body.appendChild(n); }
  wrap.appendChild(body);
  // mark invalid
  if(entryErrors(e,u).length) wrap.classList.add("invalid");
  return wrap;
}

function mkRow(label){ const r=document.createElement("div"); r.className="row";
  if(label){ const l=document.createElement("label"); l.className="t"; l.textContent=label; r.appendChild(l);} return r; }

/* A "plain" add-on toggle: a simple yes/no upgrade with no conditional show/hide
   or army-wide validation (those read clearer as inline checkboxes). Only these
   are eligible for auto-grouping. */
function isPlainToggle(o){
  return o && o.type==="toggle" && !o.only && !o.bsb && !o.requires &&
         !o.requiresMount && !o.noGod && !o.oncePerArmy && !o.limitByUnit && !o.requiresChoice;
}
/* Render a unit's options, collapsing any contiguous run of 3+ plain toggles
   (typically the book's "UPGRADES:" block) into a single multi-select picker so
   the player reads/ticks them on one screen instead of chasing many i-buttons. */
function renderOptions(e,u,body){
  const opts=u.options||[]; let i=0;
  while(i<opts.length){
    if(isPlainToggle(opts[i])){
      let j=i; while(j<opts.length && isPlainToggle(opts[j])) j++;
      const run=opts.slice(i,j);
      if(run.length>=3){ body.appendChild(renderToggleGroup(e,u,run)); i=j; continue; }
    }
    body.appendChild(renderOption(e,opts[i],u)); i++;
  }
}
/* The grouped-upgrades picker: multi-select, no cap (tick any the rules allow),
   each upgrade's rule shown inline; the i button shows only what's ticked. Each
   toggle keeps its own boolean in e.opts, so points/validation/save are unchanged. */
function renderToggleGroup(e,u,run){
  const r=mkRow("Upgrades");
  const chosen=()=>run.filter(o=>e.opts[o.id]);
  const open=()=>{
    const items=run.map(o=>{ const def=ruleDef(o.label);
      const body=def?ruleTextHTML(def.text):`<span style="color:var(--muted)">No separate rule text.</span>`;
      return { name:o.label, cost:o.cost||0, html:`<div class="d">${body}</div>` }; });
    openItemPicker({
      title:"Upgrades", multi:true,
      groups:[{label:"Tick any that apply", items}],
      selected: chosen().map(o=>o.label),
      onConfirm:(names)=>update(()=>{ run.forEach(o=>{ e.opts[o.id]=names.includes(o.label); }); })
    });
  };
  const labels=chosen().map(o=>o.label);
  r.appendChild(pickBtn(labels.length?labels.join(", "):"Choose…", !labels.length, open));
  r.appendChild(pickInfoBtn("Selected upgrades", ()=>openChosenInfoRows("Upgrades",
    chosen().map(o=>{ const def=ruleDef(o.label); return {name:o.label, cost:o.cost||0, desc:def?def.text:"(no separate rule text)"}; }))));
  return r;
}
function renderOption(e,o,u){
  if(o.requires && !optionAvailable(o)) return document.createComment("");   // locked until its prerequisite unit is present
  if(optGodBlocked(e,u,o)) return document.createComment("");                 // barred for this model's god (e.g. Khorne Wizard)
  if(optMountBlocked(e,u,o)) return document.createComment("");               // mount-upgrade: hidden until that mount is chosen
  if(optChoiceBlocked(e,u,o)) return document.createComment("");              // barred by a sibling choice (e.g. sub-species)
  if(o.type==="choice"||o.type==="mustChoose"){
    // Single-select slot → the same modal picker as magic items (radio mode): the
    // list shows every option with its rule text inline, so there's no separate
    // "all options" window; the i button shows only the chosen option.
    const req = o.type==="mustChoose";
    const r=mkRow(o.label);
    const cur = (e.opts[o.id]!=null && o.choices[e.opts[o.id]]) ? o.choices[e.opts[o.id]] : null;
    const open=()=>{
      const items=o.choices
        .filter(c=>!c.only || restrictOK(e,u,c.only))           // variant-gated choices hidden
        .map(c=>{ const def=ruleDef(c.label);
          const body=def?ruleTextHTML(def.text):`<span style="color:var(--muted)">No separate rule text.</span>`;
          const it={ name:c.label, cost:c.cost||0, html:`<div class="d">${body}</div>` };
          // conditional choices (e.g. Elven Honours) stay visible but disabled when
          // the current mount forbids them — unless this is the current pick
          const ce=honourCondOK(e,u,c);
          if(!ce.ok && !(cur && cur.label===c.label)){ it.disabled=true; it.reason=ce.reason; }
          return it; });
      openItemPicker({
        title:o.label, radio:true, requireOne:req,
        groups:[{label:o.label, items}],
        selected: cur?[cur.label]:[],
        onConfirm:(names)=>update(()=>{
          if(!names.length){ if(!req) e.opts[o.id]=null; }      // mustChoose keeps its current pick
          else e.opts[o.id]=o.choices.findIndex(c=>c.label===names[0]); })
      });
    };
    const btnText = cur ? `${cur.label}${cur.cost?` (+${cur.cost}${cur.per==='model'?'/model':''})`:''}` : (req?"Choose…":"— none —");
    r.appendChild(pickBtn(btnText, !cur, open));
    r.appendChild(pickInfoBtn("Selected option", ()=>openChosenInfoRows(o.label,
      cur?[{name:cur.label, cost:cur.cost||0, desc:(ruleDef(cur.label)?ruleDef(cur.label).text:"(no separate rule text)")}]:[])));
    return r;
  }
  if(o.type==="toggle"){
    if(o.only && !variantMatch(e,u,o.only)) return document.createComment("");
    const r=mkRow(""); const lab=document.createElement("label"); lab.className="chk";
    const c=document.createElement("input"); c.type="checkbox"; c.checked=!!e.opts[o.id];
    c.onchange=()=>update(()=>{ e.opts[o.id]=c.checked; });
    lab.append(c,document.createTextNode(o.label+(o.cost?` (+${o.cost}${o.per==='model'?'/model':''})`:""))); r.appendChild(lab);
    if(hasRuleDef(o.label)) r.appendChild(mkRuleInfoBtn(o.label));
    return r;
  }
  if(o.type==="command"){
    const ROLE_RULE={leader:"Leader", musician:"Musician", standard:"Standard Bearer"};
    const r=mkRow("Command"); (o.roles||["leader","musician","standard"]).forEach(role=>{
      const lab=document.createElement("label"); lab.className="chk";
      const c=document.createElement("input"); c.type="checkbox"; c.checked=e.opts.cmd[role];
      c.onchange=()=>update(()=>{ e.opts.cmd[role]=c.checked; if(role==="standard"&&!c.checked)e.magicStd=""; });
      const txt=role[0].toUpperCase()+role.slice(1)+` (+${CMD_COST[role]})`;
      lab.append(c,document.createTextNode(txt)); r.appendChild(lab);
      r.appendChild(mkRuleInfoBtn(ROLE_RULE[role]));
    });
    // magic standard picker, shown when Standard Bearer is taken
    if(o.magicStandard && e.opts.cmd.standard){
      const wrap=document.createElement("div"); wrap.style.flexBasis="100%";
      const r2=mkRow("Magic Standard");
      const cur=e.magicStd||"";
      const isHob = findUnit(e.cat,e.id).keyword==="hobgoblin";
      const banner=o.magicStandard;                              // this unit's banner budget
      // legal standards within the banner budget, respecting Hobgoblin/blood/god limits
      const groups=pickerGroups("Magic Standards",e,u,(it)=>it.cost<=banner && !(it.only==="Hobgoblins"&&!isHob));
      const open=()=>openItemPicker({
        title:"Magic Standard", multi:false, groups,
        selected:cur?[cur]:[], remaining:()=>banner,            // a single standard ≤ banner budget
        onConfirm:(sel)=>update(()=>{ e.magicStd=sel[0]||""; })
      });
      r2.appendChild(pickBtn(cur?`${cur} (${itemCost(cur)})`:"Choose…", !cur, open));
      r2.appendChild(pickInfoBtn("Selected standard", ()=>openChosenInfoRows("Magic Standard", cur?[{name:cur,cost:itemCost(cur),desc:itemDescOf(cur)}]:[])));
      const bd=document.createElement("span"); bd.className="note"; bd.textContent=`up to ${banner} pts`;
      r2.appendChild(bd); wrap.appendChild(r2);
      // Banner Runes: a runic standard within the same banner budget (mutually
      // exclusive with a fixed Magic Standard — enforced in validation).
      if(hasRunes() && D.runes["Banner Runes"]) wrap.appendChild(runeSlotRow(e,u,"Banner Runes",banner,"Banner Runes"));
      r.appendChild(wrap);
    }
    return r;
  }
  if(o.type==="mount"){
    const r=mkRow(o.label);
    const cur = (e.opts.mount!=null && o.choices[e.opts.mount]) ? o.choices[e.opts.mount] : null;
    // a "Choose…" button (like magic items) opens the rich mount picker
    r.appendChild(pickBtn(cur?`${cur.label} (+${cur.cost})`:"Choose…", !cur, ()=>openMountPicker(e,u,o)));
    return r;
  }
  if(o.type==="multi"){
    const r=mkRow(o.label);
    if(o.repeatable){
      const st=document.createElement("div"); st.className="stepper";
      const m=document.createElement("button"); m.textContent="–"; const inp=document.createElement("input"); inp.type="number"; inp.value=e.opts[o.id]||0;
      const p=document.createElement("button"); p.textContent="+";
      m.onclick=()=>update(()=>{ e.opts[o.id]=Math.max(0,(e.opts[o.id]||0)-1); });
      p.onclick=()=>update(()=>{ e.opts[o.id]=Math.min(o.max,(e.opts[o.id]||0)+1); });
      inp.onchange=()=>update(()=>{ e.opts[o.id]=Math.max(0,Math.min(o.max,Math.floor(+inp.value||0))); });
      st.append(m,inp,p); r.appendChild(st);
      const n=document.createElement("span"); n.className="note"; n.textContent=`× ${o.choices[0].cost} pts each (max ${o.max})`; r.appendChild(n);
    } else {
      // multi-select upgrades use the same modal picker as magic items/mounts, so
      // each upgrade shows its rule text inline and the cap is enforced (max picks).
      const sel=(e.opts[o.id]||[]).filter(i=>o.choices[i]);
      const labels=sel.map(i=>o.choices[i].label);
      const open=()=>{
        const items=o.choices.map(c=>{
          const def=ruleDef(c.label);
          const body=def?ruleTextHTML(def.text):`<span style="color:var(--muted)">No separate rule text.</span>`;
          return { name:c.label, cost:c.cost, html:`<div class="d">${body}</div>` };
        });
        openItemPicker({
          title:o.label, multi:true, maxPicks:o.max,
          groups:[{label:`Choose up to ${o.max}`, items}],
          selected:labels,
          onConfirm:(names)=>update(()=>{ e.opts[o.id]=names.map(n=>o.choices.findIndex(c=>c.label===n)).filter(i=>i>=0); })
        });
      };
      r.appendChild(pickBtn(labels.length?labels.join(", "):"Choose…", !labels.length, open));
      r.appendChild(pickInfoBtn("Selected upgrades", ()=>openChosenInfoRows(o.label,
        sel.map(i=>{ const c=o.choices[i], def=ruleDef(c.label);
          return { name:c.label, cost:c.cost, desc:def?def.text:"(no separate rule text)" }; }))));
      const n=document.createElement("span"); n.className="note"; n.textContent=`(up to ${o.max})`; r.appendChild(n);
    }
    return r;
  }
  if(o.type==="perN"){
    // "one X for every N models" — a stepper whose max tracks the unit's size.
    const r=mkRow(o.label);
    const max=perNMax(e,o), cur=perNCount(e,o);
    const st=document.createElement("div"); st.className="stepper";
    const m=document.createElement("button"); m.textContent="–";
    const inp=document.createElement("input"); inp.type="number"; inp.value=cur;
    const p=document.createElement("button"); p.textContent="+";
    m.onclick=()=>update(()=>{ e.opts[o.id]=Math.max(0,cur-1); });
    p.onclick=()=>update(()=>{ e.opts[o.id]=Math.min(max,cur+1); });
    inp.onchange=()=>update(()=>{ e.opts[o.id]=Math.max(0,Math.min(max,Math.floor(+inp.value||0))); });
    if(max<=0){ m.disabled=p.disabled=inp.disabled=true; }
    st.append(m,inp,p); r.appendChild(st);
    const n=document.createElement("span"); n.className="note";
    n.textContent=`+${o.cost} pts each · one per ${o.n} models (max ${max})`; r.appendChild(n);
    if(hasRuleDef(o.label)) r.appendChild(mkRuleInfoBtn(o.label));
    return r;
  }
  return document.createComment("");
}

/* A "multi-pick" magic category (e.g. Daemonic Gifts): take several, each once,
   all drawn from the same magic-item budget — alongside the per-category items. */
function renderMultiItemCat(e,u,cat,budget){
  const wrap=document.createElement("div"); wrap.style.borderTop="1px dashed var(--line)"; wrap.style.paddingTop="6px"; wrap.style.marginTop="4px";
  const r=mkRow(cat);
  // budget already spent on everything EXCEPT the gifts in this category
  const base = (budget>0) ? budget - (spentMagic(e) - giftsCost(e)) : Infinity;
  const open=()=>openItemPicker({
    title:cat, multi:true, groups:pickerGroups(cat,e,u,null),
    selected:e.gifts.slice(),
    remaining:(sel)=> isFinite(base) ? base - sel.reduce((s,n)=>s+itemCost(n),0) : Infinity,
    onConfirm:(sel)=>update(()=>{ e.gifts=sel; })
  });
  r.appendChild(pickBtn(e.gifts.length?`Edit (${e.gifts.length})…`:"Choose…", !e.gifts.length, open));
  r.appendChild(pickInfoBtn("Selected "+cat, ()=>openChosenInfoRows(cat, e.gifts.map(nm=>({name:nm,cost:itemCost(nm),desc:itemDescOf(nm)})))));
  wrap.appendChild(r);
  e.gifts.forEach(nm=>{
    const row=mkRow("");
    const chip=document.createElement("span"); chip.className="pickchip"; chip.title="Edit selection";
    chip.textContent=`${nm} (${itemCost(nm)})`; chip.onclick=open;
    const x=document.createElement("button"); x.className="del"; x.textContent="✕"; x.title="Remove"; x.style.marginLeft="6px";
    x.onclick=()=>update(()=>{ e.gifts=e.gifts.filter(g=>g!==nm); });
    row.appendChild(chip); row.appendChild(x); wrap.appendChild(row);
  });
  return wrap;
}
/* Vampiric Powers picker (VC): multi-pick from D.vampiricPowers, filtered by the
   model's Bloodline, drawing from the same budget as magic items. */
function renderPowers(e,u,budget){
  const bl=entryBlood(e,u);
  const wrap=document.createElement("div"); wrap.style.borderTop="1px dashed var(--line)"; wrap.style.paddingTop="6px"; wrap.style.marginTop="4px";
  const base = (budget>0) ? budget - (spentMagic(e) - powersCost(e)) : Infinity;
  const legal=(D.vampiricPowers||[]).filter(p=>!p.blood || p.blood.includes(bl))
    .map(p=>({name:p.name, cost:p.cost, desc:p.desc||""}));
  const r=mkRow("Vampiric Powers");
  const open=()=>openItemPicker({
    title:"Vampiric Powers", multi:true, groups:[{label:"Vampiric Powers", items:legal}],
    selected:e.powers.slice(),
    remaining:(sel)=> isFinite(base) ? base - sel.reduce((s,n)=>s+powerCost(n),0) : Infinity,
    onConfirm:(sel)=>update(()=>{ e.powers=sel; })
  });
  r.appendChild(pickBtn(e.powers.length?`Edit (${e.powers.length})…`:"Choose…", !e.powers.length, open));
  r.appendChild(pickInfoBtn("Selected powers", ()=>openChosenInfoRows("Vampiric Powers", e.powers.map(nm=>{ const p=powerDef(nm); return {name:nm, cost:p?p.cost:0, desc:p?p.desc:""}; }))));
  wrap.appendChild(r);
  e.powers.forEach(nm=>{ const row=mkRow("");
    const chip=document.createElement("span"); chip.className="pickchip"; chip.title="Edit selection";
    chip.textContent=`${nm} (${powerCost(nm)})`; chip.onclick=open;
    const x=document.createElement("button"); x.className="del"; x.textContent="✕"; x.title="Remove"; x.style.marginLeft="6px";
    x.onclick=()=>update(()=>{ e.powers=e.powers.filter(p=>p!==nm); });
    row.appendChild(chip); row.appendChild(x); wrap.appendChild(row); });
  return wrap;
}
/* Virtue picker (Bretonnia): one per model from D.virtues; shows the duplicate
   surcharge (cost ×N for the Nth model in the army carrying the same Virtue). */
function renderVirtue(e,u,budget){
  const wrap=document.createElement("div"); wrap.style.borderTop="1px dashed var(--line)"; wrap.style.paddingTop="6px"; wrap.style.marginTop="4px";
  const cur=e.virtue||"";
  const base = (budget>0) ? budget-(spentMagic(e)-virtueBase(e)) : Infinity;   // base cost must fit the budget
  const legal=(D.virtues||[]).map(v=>({name:v.name, cost:v.cost, desc:v.desc||""}));
  const r=mkRow("Virtue");
  const open=()=>openItemPicker({
    title:"Virtue of the Knight", multi:false, groups:[{label:"Virtues of the Knight", items:legal}],
    selected:cur?[cur]:[],
    remaining:(sel)=> isFinite(base) ? base - sel.reduce((s,n)=>{ const v=virtueDef(n); return s+(v?v.cost:0); },0) : Infinity,
    onConfirm:(sel)=>update(()=>{ e.virtue=sel[0]||""; })
  });
  r.appendChild(pickBtn(cur?`${cur} (${virtueBase(e)})`:"Choose…", !cur, open));
  r.appendChild(pickInfoBtn("Selected virtue", ()=>{ const v=virtueDef(cur); openChosenInfoRows("Virtue", v?[{name:v.name,cost:v.cost,desc:v.desc}]:[]); }));
  const rank=virtueRank(e);
  if(cur && rank>1){ const n=document.createElement("span"); n.className="size-warn"; n.textContent=`duplicate ×${rank} → ${virtueCost(e)} pts`; r.appendChild(n); }
  wrap.appendChild(r);
  return wrap;
}
/* points still available for one magic-item slot (current pick in that slot is refundable) */
function magicSlotRemaining(e,budget,slotKey){
  const cur=e.magic[slotKey]?itemCost(e.magic[slotKey]):0;
  return budget - spentMagic(e) + cur;
}
/* one magic-item slot. Opens the picker for `sourceCat` (single-pick). Items over
   the remaining budget are disabled in the list; the chosen item is shown on the
   button and re-opens the picker when tapped. */
function addMagicSlot(box,e,u,label,slotKey,sourceCat,budget,extra){
  const cur=e.magic[slotKey]||"";
  const base = budget>0 ? budget - spentMagic(e) + (cur?itemCost(cur):0) : Infinity;
  const r=mkRow(label);
  const open=()=>openItemPicker({
    title:label, multi:false, groups:pickerGroups(sourceCat,e,u,extra),
    selected: cur?[cur]:[],
    remaining:(sel)=> isFinite(base) ? base - sel.reduce((s,n)=>s+itemCost(n),0) : Infinity,
    onConfirm:(sel)=>update(()=>{ e.magic[slotKey]=sel[0]||""; })
  });
  r.appendChild(pickBtn(cur?`${cur} (${itemCost(cur)})`:"Choose…", !cur, open));
  r.appendChild(pickInfoBtn("Selected item", ()=>openChosenInfoRows(label, cur?[{name:cur,cost:itemCost(cur),desc:itemDescOf(cur)}]:[])));
  box.appendChild(r);
}
function renderMagic(e,u,budget){
  const box=document.createElement("div"); box.className="magic";
  const used=spentMagic(e);
  const over=used>budget;
  box.innerHTML=`<div class="mt">Magic Items</div>`;
  const bd=document.createElement("div"); bd.className="budget"+(over?" over":"");
  bd.innerHTML=`Spent <b>${used}</b> / ${budget} pts <span class="note">· ${Math.max(0,budget-used)} left</span>`; box.appendChild(bd);
  const wizard = wizardActive(e,u);
  const multiCats = D.multiPickCategories||[];
  for(const cat in D.magicItems){
    if(cat==="Magic Standards") continue;            // standards handled separately (BSB only, no limit)
    if(u.magicCatsOnly && !u.magicCatsOnly.includes(cat)) continue; // e.g. Wood Elf tree-characters: Spites only
    if(cat==="Arcane Items"){
      if(!wizard) continue;                           // only Wizards carry Arcane Items
      ARCANE_SUBCATS.forEach(sub=>addMagicSlot(box,e,u,"Arcane — "+sub,"Arcane Items:"+sub,"Arcane Items",budget,(it)=>arcaneType(it.name)===sub));
      continue;
    }
    if(multiCats.includes(cat)){ box.appendChild(renderMultiItemCat(e,u,cat,budget)); continue; }
    addMagicSlot(box,e,u,cat,cat,cat,budget,null);
  }
  // Runic Items (Dwarfs) — weapon/armour/talismanic/tattoo runes share the
  // character's magic-item budget (banner runes for a BSB are added below).
  if(hasRunes()){
    runeCatsForChar(e,u).forEach(cat=>{
      const list=(e.runes&&e.runes[cat])||[];
      const avail = budget>0 ? budget - spentMagic(e) + runeCatCost(cat,list) : Infinity;
      box.appendChild(runeSlotRow(e,u,cat,avail));
    });
  }
  // Vampiric Powers (VC) — vampire characters only, share the budget
  if(D.vampiricPowers && unitHasTag(u,"Vampire")) box.appendChild(renderPowers(e,u,budget));
  // Virtue of the Knight (Bretonnia) — one per eligible character, shares the budget
  if(D.virtues && u.virtueEligible) box.appendChild(renderVirtue(e,u,budget));
  // Battle Standard Bearer: a Magic Standard with no points limit, in addition to other items
  if(isBSB(e,u)){
    const r=mkRow("Magic Standard");
    const cur=e.magicStd||"";
    const open=()=>openItemPicker({
      title:"Magic Standard (BSB)", multi:false,
      groups:pickerGroups("Magic Standards",e,u,null),   // BSB: no points limit
      selected:cur?[cur]:[], remaining:()=>Infinity,
      onConfirm:(sel)=>update(()=>{ e.magicStd=sel[0]||""; })
    });
    r.appendChild(pickBtn(cur?`${cur} (${itemCost(cur)})`:"Choose…", !cur, open));
    r.appendChild(pickInfoBtn("Selected standard", ()=>openChosenInfoRows("Magic Standard", cur?[{name:cur,cost:itemCost(cur),desc:itemDescOf(cur)}]:[])));
    const n=document.createElement("span"); n.className="note"; n.textContent="no points limit (BSB)";
    r.appendChild(n); box.appendChild(r);
    // Banner Runes for the BSB — a runic magic standard (no points limit)
    if(hasRunes() && D.runes["Banner Runes"]) box.appendChild(runeSlotRow(e,u,"Banner Runes",Infinity,"Banner Runes"));
  }
  return box;
}
function renderValidation(){
  const el=document.getElementById("validation");
  if(!state.length){ el.innerHTML='<div class="vmsg ok">Add units to begin.</div>'; return; }
  const {errs,warns}=collectIssues();
  // an issue tied to a roster entry is a link: tap it to jump to that entry
  const row=(cls,icon,it)=>it.uid!=null
    ? `<div class="vmsg ${cls} link" onclick="scrollToEntry(${it.uid})" title="Show this unit">${icon} ${esc(it.msg)}</div>`
    : `<div class="vmsg ${cls}">${icon} ${esc(it.msg)}</div>`;
  let html="";
  if(!errs.length) html+=`<div class="vmsg ok">✔ Legal so far (${Math.round(grandTotal())} / ${currentLimit()} pts).</div>`;
  html+=errs.map(it=>row("err","✕",it)).join("")+warns.map(it=>row("warn","⚠",it)).join("");
  el.innerHTML=html;
}

