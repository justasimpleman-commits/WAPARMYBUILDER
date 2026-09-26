/* modals.js — modal windows, the shared item picker, rune picker, unit/mount detail popups. */
/* ---------- modal helpers ---------- */
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function openModal(title, html){ document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalBody").innerHTML=html; document.getElementById("modalBg").classList.add("open"); }
function closeModal(){ document.getElementById("modalBg").classList.remove("open"); if(_promptCb) finishPrompt(false); }
/* second, stacked window — used for a single rule's definition so it opens on
   top of the unit-detail window rather than replacing it */
function openModal2(title, html){ document.getElementById("modal2Title").textContent=title;
  document.getElementById("modal2Body").innerHTML=html; document.getElementById("modal2Bg").classList.add("open"); }
function closeModal2(){ document.getElementById("modal2Bg").classList.remove("open"); }
function modalOpen(){ return ["modalBg","modal2Bg"].some(id=>document.getElementById(id).classList.contains("open")); }

/* In-app text prompt (styled to match the app; window.prompt() is unreliable in WebViews).
   Reuses the shared modal; resolves to the trimmed value, or null if cancelled. */
let _promptCb=null;
function finishPrompt(ok){
  if(!_promptCb) return;
  const cb=_promptCb; _promptCb=null;
  const inp=document.getElementById("promptInput");
  const val=inp?inp.value.trim():"";
  document.getElementById("modalBg").classList.remove("open");
  cb(ok ? (val||null) : null);
}
function modalPrompt(title, def, okLabel){
  return new Promise(res=>{
    _promptCb=res;
    document.getElementById("modalTitle").textContent=title;
    document.getElementById("modalBody").innerHTML=
      '<div style="display:flex;flex-direction:column;gap:12px">'+
      '<input id="promptInput" type="text" value="'+esc(def||"").replace(/"/g,"&quot;")+'" '+
      'style="padding:8px 10px;font-size:15px;background:#241a14;color:#f3e9dd;border:1px solid #5a463a;border-radius:6px">'+
      '<div style="display:flex;gap:8px;justify-content:flex-end">'+
      '<button class="btn" onclick="finishPrompt(false)">Cancel</button>'+
      '<button class="btn primary" onclick="finishPrompt(true)">'+esc(okLabel||"OK")+'</button>'+
      '</div></div>';
    document.getElementById("modalBg").classList.add("open");
    const inp=document.getElementById("promptInput");
    if(inp){ inp.focus(); inp.select(); inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); finishPrompt(true); } }; }
  });
}

/* ---------- generic item picker modal ----------
   Replaces the magic-item dropdowns. Opens the full list for ONE category
   (already filtered to legal items by the caller), the user selects, then
   confirms with OK.
   opts: { title, multi, groups:[{label,items:[{name,cost,common,only,desc?}]}],
           selected:[names], remaining(sel)->pts|Infinity, onConfirm(sel) }
   Single-pick: once one item is selected the rest lock until it is deselected.
   Multi-pick: items costing more than the remaining budget lock until you free
   up points by deselecting. */
let _pk=null;
function openItemPicker(opts){
  _pk={ multi:!!opts.multi, groups:opts.groups||[], remaining:opts.remaining,
        maxPicks:opts.maxPicks||0, radio:!!opts.radio, requireOne:!!opts.requireOne,
        onConfirm:opts.onConfirm, title:opts.title||"Choose", sel:(opts.selected||[]).slice() };
  document.getElementById("modalTitle").textContent=_pk.title;
  _pkRender();
  document.getElementById("modalBg").classList.add("open");
}
function _pkRemaining(){ return _pk.remaining ? _pk.remaining(_pk.sel) : Infinity; }
function _pkRender(){
  const body=document.getElementById("modalBody"); body.innerHTML="";
  const rem=_pkRemaining(); const lim=isFinite(rem);
  const note=document.createElement("div"); note.className="rule"; note.style.color="var(--muted)";
  const capNote = _pk.maxPicks ? ` Choose up to ${_pk.maxPicks}.` : "";
  note.innerHTML = _pk.multi
    ? `Tap items to add or remove them.${capNote}${lim?` Items costing more than the points left are disabled.`:(_pk.maxPicks?"":" No points limit.")}`
    : _pk.radio
      ? `Tap an option to choose it.${_pk.requireOne?"":" Tap the chosen one again to clear it."}`
      : (_pk.sel.length ? `Tap the selected item to deselect it, then choose another.`
                        : `Tap an item to select it.${lim?` Items over budget are disabled.`:""}`);
  body.appendChild(note);
  let shown=0;
  (_pk.groups||[]).forEach(g=>{
    const its=g.items||[]; if(!its.length) return;
    if(g.label){ const h=document.createElement("div"); h.className="lbl"; h.textContent=g.label; body.appendChild(h); }
    its.forEach(it=>{
      shown++;
      // `it.locked` → display-only row: shown as already-chosen (✓, full opacity)
      // but non-interactive and NOT part of _pk.sel, so it never affects the pick
      // count or budget. Used for always-known spells (lore attribute + signatures).
      if(it.locked){
        const row=document.createElement("div");
        row.className="mirow pick sel"; row.style.cursor="default";
        const mark=document.createElement("span"); mark.className="pkmark"; mark.textContent="✓";
        const txt=document.createElement("div"); txt.style.flex="1";
        const descHTML=(it.html!=null)?it.html:`<div class="d">${esc((it.desc!=null&&it.desc!=="")?it.desc:(itemDescOf(it.name)||"(no description)"))}</div>`;
        txt.innerHTML=`<div><span class="nm">${esc(it.name)}</span>${it.reason?` <span style="color:var(--muted)">· ${esc(it.reason)}</span>`:""}</div>${descHTML}`;
        row.appendChild(mark); row.appendChild(txt);
        body.appendChild(row);
        return;
      }
      const isSel=_pk.sel.includes(it.name);
      let disabled=false;
      if(it.disabled && !isSel){ disabled=true; }              // forced (e.g. honour blocked by mount)
      else if(!isSel){
        if(_pk.multi){ if(lim && it.cost>rem) disabled=true; if(_pk.maxPicks && _pk.sel.length>=_pk.maxPicks) disabled=true; }
        else if(_pk.radio){ if(lim && it.cost>rem) disabled=true; }   // radio: never lock the alternatives — tapping one swaps the pick
        else { if(_pk.sel.length>=1) disabled=true; else if(lim && it.cost>rem) disabled=true; }
      }
      const row=document.createElement("div");
      row.className="mirow pick"+(isSel?" sel":"")+(disabled?" disabled":"");
      const mark=document.createElement("span"); mark.className="pkmark"; mark.textContent=isSel?"✓":"";
      const txt=document.createElement("div"); txt.style.flex="1";
      // `it.html` (raw) renders rich descriptions (e.g. a mount's profile +
      // clickable rules); otherwise the plain text desc is escaped.
      const descHTML = (it.html!=null) ? it.html
        : `<div class="d">${esc((it.desc!=null && it.desc!=="") ? it.desc : (itemDescOf(it.name)||"(no description)"))}</div>`;
      const costHTML = (it.cost!=null) ? ` — <span class="cost">${it.cost} pts</span>` : "";
      const et=itemEquipType(it);
      const typeHTML = et ? ` <span class="etype">${esc(et)}</span>` : "";
      txt.innerHTML=`<div><span class="nm">${esc(it.name)}${it.common?" *":""}</span>${typeHTML}${costHTML}${it.only?` <span style="color:var(--muted)">(${esc(it.only)} only)</span>`:""}${(it.disabled&&it.reason&&!isSel)?` <span style="color:var(--fire2)">· ${esc(it.reason)}</span>`:""}</div>${descHTML}`;
      row.appendChild(mark); row.appendChild(txt);
      if(!disabled) row.onclick=()=>{
        if(_pk.multi){ _pk.sel = isSel ? _pk.sel.filter(n=>n!==it.name) : [..._pk.sel,it.name]; }
        else if(_pk.radio){ _pk.sel = (isSel && !_pk.requireOne) ? [] : [it.name]; }   // swap, or clear if optional
        else { _pk.sel = isSel ? [] : [it.name]; }
        _pkRender();
      };
      body.appendChild(row);
    });
  });
  if(!shown){ const n=document.createElement("div"); n.className="rule"; n.style.color="var(--muted)"; n.textContent="No items available for this character."; body.appendChild(n); }
  const foot=document.createElement("div"); foot.className="pkfoot";
  const remEl=document.createElement("div"); remEl.className="rem"+(lim&&rem<0?" over":"");
  remEl.innerHTML = lim ? `<b>${Math.max(0,rem)}</b> pts left`
    : (_pk.maxPicks ? `<b>${_pk.sel.length}</b> / ${_pk.maxPicks} selected`
       : _pk.radio ? (_pk.sel.length?`Chosen: ${esc(_pk.sel[0])}`:"Nothing chosen")
       : `${_pk.sel.length} selected`);
  const btns=document.createElement("div"); btns.style.display="flex"; btns.style.gap="8px";
  const cancel=document.createElement("button"); cancel.className="btn"; cancel.textContent="Cancel";
  cancel.onclick=()=>{ _pk=null; closeModal(); };
  const okb=document.createElement("button"); okb.className="btn primary"; okb.textContent="OK";
  okb.onclick=()=>{ const cb=_pk.onConfirm, sel=_pk.sel.slice(); _pk=null;
    document.getElementById("modalBg").classList.remove("open"); if(cb)cb(sel); };
  btns.appendChild(cancel); btns.appendChild(okb);
  foot.appendChild(remEl); foot.appendChild(btns);
  body.appendChild(foot);
}
/* Build the picker's grouped, legal item list for a magic-item category.
   Mirrors the old dropdown grouping (by God for godSections books, else one
   army group), and the Common (rulebook) group. `extra` is an extra filter. */
function pickerGroups(sourceCat, e, u, extra){
  const groups=[];
  // Items barred only by equipment access stay listed but disabled, with the
  // mundane type the model lacks as the reason.
  const ok=(it)=>(!extra||extra(it)) && itemAllowedIgnoringAccess(it,e,u);
  const mark=(it)=>(it.requiresAccess && !hasAccess(e,u,it.requiresAccess))
    ? Object.assign({},it,{disabled:true, reason:`needs ${itemEquipType(it)}`}) : it;
  const army=(D.magicItems[sourceCat]||[]).filter(ok).map(mark);
  if(D.godSections){
    ["Undivided","Khorne","Nurgle","Slaanesh","Tzeentch"].forEach(sec=>{
      const its=army.filter(it=>(it.god||"Undivided")===sec); if(its.length) groups.push({label:sec, items:its}); });
  } else if(army.length){ groups.push({label:D.name, items:army}); }
  if(D.commonMagicItems && D.commonMagicItems[sourceCat]){
    const c=D.commonMagicItems[sourceCat].filter(ok).map(mark); if(c.length) groups.push({label:"Common (rulebook)", items:c}); }
  return groups;
}
/* info popup that shows ONLY the chosen item(s): rows of {name,cost,desc} */
function openChosenInfoRows(title, rows){
  rows=(rows||[]).filter(Boolean);
  if(!rows.length){ openModal(title, `<div class="rule" style="color:var(--muted)">Nothing selected yet — tap “Choose…” to pick from the list.</div>`); return; }
  let html="";
  rows.forEach(r=>{ const et=r.type||itemEquipType(findItem(r.name));
    html+=`<div class="mirow"><div><span class="nm">${esc(r.name)}</span>${et?` <span class="etype">${esc(et)}</span>`:""} — <span class="cost">${r.cost} pts</span></div><div class="d">${esc(r.desc||"(no description)")}</div></div>`; });
  openModal(title, html);
}
/* entry-side "open the picker" button (shows the current pick, or "Choose…") */
function pickBtn(text, empty, onClick){
  const b=document.createElement("button"); b.className="pickbtn"+(empty?" empty":""); b.textContent=text; b.onclick=onClick; return b;
}
function pickInfoBtn(title, onClick){
  const b=document.createElement("button"); b.className="info"; b.textContent="i"; b.title=title; b.onclick=onClick; return b;
}

/* The rune picker modal. Enforces the Rules of the Runes live (3-rune cap, one
   master/item, master once/army, `solo`, cumulative tiers, budget). Cross-item
   "unique combination" is enforced in validation. */
let _rp=null;
function openRunePicker(opts){
  _rp={ cat:opts.cat, e:opts.e, u:opts.u, budget:(opts.budget==null?Infinity:opts.budget),
        sel:(opts.current||[]).slice(), onConfirm:opts.onConfirm, title:opts.title||opts.cat };
  document.getElementById("modalTitle").textContent=_rp.title;
  _rpRender();
  document.getElementById("modalBg").classList.add("open");
}
function _rpRender(){
  const {cat,e,u,sel}=_rp;
  const body=document.getElementById("modalBody"); body.innerHTML="";
  const total=sel.length;
  const cost=runeCatCost(cat,sel);
  const lim=isFinite(_rp.budget);
  const rem=_rp.budget-cost;
  const usedMasters=usedMasterRunes(e.uid,cat);
  const selHasMaster=sel.some(n=>runeIsMaster(cat,n));
  const selHasSolo=sel.some(n=>{ const r=runeDef(cat,n); return r&&r.solo; });
  const note=document.createElement("div"); note.className="rule"; note.style.color="var(--muted)";
  note.innerHTML=`Inscribe up to <b>3</b> runes on this item. ${lim?`Budget <b>${_rp.budget}</b> pts.`:`No points limit.`} One master rune per item, once per army. Cumulative runes (cost shown a/b/c) may be repeated — the listed numbers are the total cost for 1/2/3 copies.`;
  body.appendChild(note);
  runeList(cat).filter(r=>runeAllowed(r,e,u,cat)).forEach(r=>{
    const k=sel.filter(n=>n===r.name).length;
    const maxC=runeMaxCopies(r);
    const nextCost=runeCopyCost(r,k+1)-runeCopyCost(r,k);   // incremental cost of the NEXT copy
    let canAdd=true, why="";
    if(total>=3){ canAdd=false; if(k<maxC) why="3-rune limit"; }
    else if(k>=maxC){ canAdd=false; }
    else if(r.master && k===0 && selHasMaster){ canAdd=false; why="one master rune per item"; }
    else if(r.master && usedMasters.has(r.name)){ canAdd=false; why="already used in the army"; }
    else if(r.solo && total>0){ canAdd=false; why="cannot combine with other runes"; }
    else if(selHasSolo && k===0){ canAdd=false; why="blocked by a solo rune"; }
    else if(lim && nextCost>rem){ canAdd=false; why="over budget"; }
    const row=document.createElement("div"); row.className="rrow"+(k>0?" sel":"");
    const txt=document.createElement("div"); txt.className="rtxt";
    const costLabel = Array.isArray(r.cost) ? r.cost.join("/") : (""+r.cost);
    // running total for this rune (cumulative tiers summed): "×2 = 40 pts"
    const accum = k>0 ? ` <b class="cost">×${k} = ${runeCopyCost(r,k)} pts</b>` : "";
    const reason = (why && k===0) ? ` <span style="color:var(--muted)">· ${esc(why)}</span>` : "";
    txt.innerHTML=`<div><span class="nm">${esc(r.name)}${r.master?' ★':''}</span> <span class="cost">${costLabel} pts</span>${accum}${reason}</div><div class="d">${esc(r.desc||'')}</div>`;
    const ctrl=document.createElement("div"); ctrl.className="rctrl";
    if(maxC>1){
      const box=document.createElement("div"); box.className="stepper";
      const m=document.createElement("button"); m.textContent="–"; m.disabled=k<=0;
      m.onclick=()=>{ const i=sel.lastIndexOf(r.name); if(i>=0) sel.splice(i,1); _rpRender(); };
      const cnt=document.createElement("input"); cnt.type="text"; cnt.value=k; cnt.readOnly=true;
      const p=document.createElement("button"); p.textContent="+"; p.disabled=!canAdd; p.title=canAdd?`Add another (+${nextCost} pts)`:(why||"");
      p.onclick=()=>{ sel.push(r.name); _rpRender(); };
      box.append(m,cnt,p); ctrl.appendChild(box);
    } else {
      const b=document.createElement("button"); b.className="rbtn"+(k>0?" on":""); b.textContent=k>0?"Remove":"Add"; b.disabled=(k>0)?false:!canAdd;
      if(!canAdd && k===0 && why) b.title=why;
      b.onclick=()=>{ if(k>0){ const i=sel.lastIndexOf(r.name); if(i>=0) sel.splice(i,1);} else sel.push(r.name); _rpRender(); };
      ctrl.appendChild(b);
    }
    row.appendChild(txt); row.appendChild(ctrl);
    body.appendChild(row);
  });
  const foot=document.createElement("div"); foot.className="pkfoot";
  const remEl=document.createElement("div"); remEl.className="rem"+((lim&&rem<0)?" over":"");
  remEl.innerHTML = `<b>${total}</b>/3 runes · ${lim?`<b>${Math.max(0,rem)}</b> pts left`:`${cost} pts`}`;
  const btns=document.createElement("div"); btns.style.display="flex"; btns.style.gap="8px";
  const cancel=document.createElement("button"); cancel.className="btn"; cancel.textContent="Cancel"; cancel.onclick=()=>{ _rp=null; closeModal(); };
  const ok=document.createElement("button"); ok.className="btn primary"; ok.textContent="OK";
  ok.onclick=()=>{ const cb=_rp.onConfirm, s=_rp.sel.slice(); _rp=null; document.getElementById("modalBg").classList.remove("open"); if(cb)cb(s); };
  btns.append(cancel,ok); foot.append(remEl,btns); body.appendChild(foot);
}

/* ---------- unit detail (stats + special rules) ---------- */
const STAT_HEAD=["M","WS","BS","S","T","W","I","A","Ld"];

/* Render a purchased-loadout list as a clickable comma-line.
   kind "equip" → resolve via ruleDef/openRuleInfo; kind "item" → itemDescOf/openItemInfo.
   A leading "N× ", "Mount: "/"Power: "/etc. prefix and a trailing (parenthetical)
   are stripped for the lookup but kept in the display. */
function loadoutHTML(items, kind){
  window.__rw = window.__rw || []; window.__iw = window.__iw || [];
  return (items||[]).map(disp=>{
    const base = String(disp)
      .replace(/^\d+×\s*/,"").replace(/^(Mount|Power|Virtue|Standard):\s*/,"")
      .replace(/\s+×\d+$/,"").replace(/\s*\([^)]*\)\s*$/,"").trim();
    if(kind==="equip"){
      const def=ruleDef(base);
      if(def){ const i=window.__rw.push(def.name)-1;
        return `<span class="ruleword" onclick="event.stopPropagation();openRuleInfo(__rw[${i}])">${esc(disp)}</span>`; }
    } else {
      if(itemDescOf(base)){ const i=window.__iw.push(base)-1;
        return `<span class="ruleword" onclick="event.stopPropagation();openLoadoutItemInfo(__iw[${i}])">${esc(disp)}</span>`; }
    }
    return esc(disp);
  }).join(", ");
}
function openLoadoutItemInfo(name){ openModal2(name, `<div class="rule">${esc(itemDescOf(name)||"(no description)")}</div>`); }
/* open the dynamic detail popup for a roster entry (from the summary or elsewhere) */
function openEntryInfo(uid){ const e=state.find(x=>x.uid===uid); if(e) openUnitDetail(e.cat,e.id,e.variant,e); }

function openUnitDetail(cat,id,variant,e){
  const u=findUnit(cat,id); const inf=D.unitInfo[id];
  window.__rw=[]; window.__iw=[];
  let html="";
  if(inf && inf.profile){
    const showPts = u.isCharacter;
    html+=`<div class="profwrap"><table class="prof"><tr><th>Profile</th>${STAT_HEAD.map(s=>`<th>${s}</th>`).join("")}${showPts?"<th>Pts</th>":""}</tr>`;
    inf.profile.forEach((row,i)=>{
      let pts=""; if(showPts && u.variants[i]) pts=u.variants[i].points;
      html+=`<tr><td class="nm">${esc(row[0])}</td>${row.slice(1).map(v=>`<td>${esc(v)}</td>`).join("")}${showPts?`<td><b>${pts}</b></td>`:""}</tr>`;
    });
    html+=`</table></div>`;
  }
  const meta=[];
  if(u.unitSize) meta.push(`Unit size: ${u.unitSize[0]}${u.unitSize[1]==null?"+":"–"+u.unitSize[1]}`);
  if(!u.isCharacter && u.perModel) meta.push(`${u.basePoints} pts/model`);
  if(u.isSpecialChar) meta.push("Unique special character");
  const v=u.isCharacter?u:null;
  if(v && v.variants.some(x=>x.magicBudget)) meta.push("Magic items: "+v.variants.map(x=>`${x.name} ${x.magicBudget}`).join(" / ")+" pts");
  if(meta.length) html+=`<div class="rule" style="color:var(--muted)">${esc(meta.join("  •  "))}</div>`;
  if(inf && (inf.eq || inf.rules)) window.__rw=[];
  if(inf && inf.eq) html+=`<div class="lbl">Equipment <span style="color:var(--muted);font-weight:400">— click an item to open it</span></div><div class="rule">${eqToHTML(inf.eq)}</div>`;
  if(inf && inf.rules){
    html+=`<div class="lbl">Special rules <span style="color:var(--muted);font-weight:400">— click a rule to open it</span></div><div class="rule">${rulesToHTML(inf.rules)}</div>`;
  }
  if(u.notes) html+=`<div class="lbl">Note</div><div class="rule" style="color:var(--muted)">${esc(u.notes)}</div>`;
  // ---- dynamic: what THIS roster entry has actually purchased ----
  if(e){
    const lo=entryLoadout(e,u);
    const hasEq = lo.equip.length || lo.lore || lo.spells.length;
    if(hasEq){
      html+=`<div class="lbl loadout">Equipment &amp; upgrades <span style="color:var(--muted);font-weight:400">— on this unit</span></div>`;
      const eqLine=[];
      if(lo.equip.length) eqLine.push(loadoutHTML(lo.equip,"equip"));
      html+=`<div class="rule">${eqLine.join(", ")||'<span style="color:var(--muted)">Base equipment only.</span>'}</div>`;
      if(lo.lore) html+=`<div class="rule"><b>Lore:</b> ${esc(lo.lore)}</div>`;
      if(lo.spells.length) html+=`<div class="rule"><b>Spells:</b> ${esc(lo.spells.join(", "))}</div>`;
    }
    if(lo.magic.length){
      html+=`<div class="lbl loadout">Magic items <span style="color:var(--muted);font-weight:400">— click to read</span></div>`;
      html+=`<div class="rule">${loadoutHTML(lo.magic,"item")}</div>`;
    }
    if(!hasEq && !lo.magic.length)
      html+=`<div class="lbl loadout">Loadout</div><div class="rule" style="color:var(--muted)">No upgrades or items purchased yet.</div>`;
  }
  const title = u.isCharacter && u.variants.length>1 ? u.name : (inf&&inf.profile?inf.profile[0][0]:u.name);
  openModal(title, html);
}

function openSpellInfo(loreName){
  const lore=loreData(loreName); if(!lore){ openModal(loreName,"No data."); return; }
  let html=`<div class="lbl">Lore Attribute — ${esc(lore.attribute.name)}</div><div class="rule">${esc(lore.attribute.text)}</div>`;
  lore.spells.forEach(sp=>{
    const tag=sp.lvl===0?"Signature":"Level "+sp.lvl;
    html+=`<div class="mirow"><div><span class="nm">${esc(sp.name)}</span> <span class="cost">${sp.cast}+</span> <span style="color:var(--muted)">${esc(tag)} · ${esc(sp.type)} · ${esc(sp.range)}</span></div><div class="d">${esc(sp.effect)}</div></div>`;
  });
  openModal("Lore of "+loreName, html);
}

/* ---------- magic item info popup ---------- */
function openItemInfo(category, selected){
  const list=itemsIn(category);
  let html=`<div class="rule" style="color:var(--muted)">* = common item (may be taken in multiples).</div>`;
  list.forEach(it=>{
    const d = itemDescOf(it.name) || "(no description)";
    const sel = it.name===selected ? " sel":"";
    html+=`<div class="mirow${sel}"><div><span class="nm">${esc(it.name)}${it.common?" *":""}</span> — <span class="cost">${it.cost} pts</span>${it.only?` <span style="color:var(--muted)">(${esc(it.only)} only)</span>`:""}</div><div class="d">${esc(d)}</div></div>`;
  });
  openModal(category, html);
}

function openRuleInfo(label){
  const r=ruleDef(label);
  if(!r){ openModal2(label||"Rule", `<div class="rule" style="color:var(--muted)">No rule reference available for this option.</div>`); return; }
  openModal2(r.name, ruleTextHTML(r.text));
}
function mkRuleInfoBtn(label){
  const b=document.createElement("button"); b.className="info"; b.textContent="i"; b.title="Rule reference";
  b.onclick=(ev)=>{ ev.preventDefault(); ev.stopPropagation(); openRuleInfo(label); };
  return b;
}
/* One mount rendered as a compact unit entity: profile table + clickable
   equipment line + clickable special-rules line (same layout as a unit's info
   page, NOT expanded — tap a rule/weapon to open it in the stacked window).
   `statlineOnly` returns just the "M6 WS5 …" strip for the entry card. */
function mountEntityHTML(c){
  const d=mountChoiceData(c);
  if(!d || !d.rows || !d.rows.length) return `<div class="rule" style="color:var(--muted)">No profile recorded for this mount yet.</div>`;
  let h=`<table class="prof"><tr><th>Profile</th>${STAT_HEAD.map(s=>`<th>${s}</th>`).join("")}</tr>`;
  h+=d.rows.map(row=>`<tr><td class="nm">${esc(row[0])}</td>${row.slice(1).map(v=>`<td>${esc(v)}</td>`).join("")}</tr>`).join("");
  h+=`</table>`;
  if(d.eq && d.eq!=="—") h+=`<div class="lbl">Equipment</div><div class="rule">${eqToHTML(d.eq)}</div>`;
  if(d.rules) h+=`<div class="lbl">Special rules</div><div class="rule">${rulesToHTML(d.rules)}</div>`;
  return h;
}
/* Mount selection reuses the SAME magic-item picker (`openItemPicker`): a tick on
   each mount, others lock once one is ticked (single-select), OK confirms, Cancel
   closes, nothing ticked ⇒ no mount. Each mount's description is the compact unit
   entity (profile + clickable equipment + clickable special rules) — passed as raw
   `html` so the picker renders it instead of escaped text. */
function openMountPicker(e,u,o){
  window.__rw=[];                                            // rule indices for the entity HTML below
  const items=o.choices.map((c,i)=>({c,i}))
    .filter(({c})=>(!c.only||variantMatch(e,u,c.only)) && !mountChoiceBlocked(e,u,c))   // honour-gated mounts hidden until their honour is taken
    .sort((a,b)=>a.c.cost-b.c.cost)
    .map(({c})=>({ name:c.label, cost:c.cost, html:mountEntityHTML(c) }));
  const cur=(e.opts.mount!=null && o.choices[e.opts.mount]) ? o.choices[e.opts.mount].label : null;
  openItemPicker({
    title:o.label||"Mount", multi:false, groups:[{label:"", items}],
    selected:cur?[cur]:[], remaining:()=>Infinity,
    onConfirm:(sel)=>update(()=>{ const nm=sel[0]||null;
      const idx = nm==null ? null : o.choices.findIndex(c=>c.label===nm);
      e.opts.mount = (idx==null||idx<0) ? null : idx; })
  });
}

function openPowerInfo(bl){
  const lines=(D.vampiricPowers||[]).filter(p=>!bl||!p.blood||p.blood.includes(bl))
    .map(p=>`<b>${p.name}</b> (${p.cost})${p.blood?` <span class="note">[${p.blood.join("/")}]</span>`:""}<br>${p.desc||""}`);
  openModal("Vampiric Powers", lines.join("<br><br>")||"No powers.");
}
function openVirtueInfo(){
  const lines=(D.virtues||[]).map(v=>`<b>${v.name}</b> (${v.cost})<br>${v.desc||""}`);
  openModal("Virtues of the Knight", lines.join("<br><br>")||"No virtues.");
}
/* brief status message; with `action` ({label, fn}) it carries a button (e.g.
   "Removed Lord — Undo") and stays up longer */
function toast(msg, action){
  let t=document.getElementById("toast");
  if(!t){ t=document.createElement("div"); t.id="toast"; t.className="toast"; document.body.appendChild(t); }
  t.textContent=msg;
  if(action){
    const b=document.createElement("button"); b.className="tbtn"; b.textContent=action.label;
    b.onclick=()=>{ t.classList.remove("show"); action.fn(); };
    t.appendChild(b);
  }
  t.classList.add("show");
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("show"), action?5000:1800);
}
/* open the shared modal without going through a unit-specific builder */
function openModalRaw(){ document.getElementById("modalBg").classList.add("open"); }

