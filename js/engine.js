/* engine.js — pure rules: points, budgets, wizard levels, items, runes, option gating,
   entry reconciliation, validation helpers, loadout description. No DOM. */
function wizardLevel(e,u){
  let lvl = u.isCharacter ? (u.variants[e.variant].wizardLevel||0) : (u.wizardLevel||0);
  // a choice option may grant an absolute wizard level (e.g. Daemon Prince "Wizard")
  (u.options||[]).forEach(o=>{
    if(optGodBlocked(e,u,o)) return;            // Khornate Daemons can't become Wizards
    if(o.type==="choice"||o.type==="mustChoose"){ const i=e.opts[o.id];
      if(i!=null && o.choices[i] && o.choices[i].wizLevel!=null) lvl=Math.max(lvl, o.choices[i].wizLevel); }
  });
  if(lvl===0 && u.wizardIfUpgraded && e.opts.wiz) lvl=1;   // Daemonsmith upgraded to Wizard
  if(lvl>0 && e.opts.wlvl) lvl+=1;                          // "Additional Wizard Level"
  return lvl;
}
/* extra CHOSEN-spell slots granted by magic items (e.g. Spell Familiar):
   any item def flagged `extraSpells:N` that the model actually carries adds N
   more spell picks from its normally-allowed spells. Data-driven — see SCHEMA. */
function bonusSpells(e){
  let n=0;
  const add=nm=>{ if(!nm) return; const it=findItem(nm); if(it && it.extraSpells) n+=it.extraSpells; };
  if(e.magic) Object.values(e.magic).forEach(add);
  (e.gifts||[]).forEach(add);
  add(e.magicStd);
  return n;
}
/* extra SIGNATURE-spell slots granted by items (e.g. the Arcane Familiar): each
   `extraSignatures:N` item lets the wizard also know N signature spells picked
   from ANY of the eight Winds of Magic — a separate pool from its own lore.
   Picks live in `entry.sigSpells`; see renderSpells / knownSpells. */
function bonusSignatures(e){
  let n=0;
  const add=nm=>{ if(!nm) return; const it=findItem(nm); if(it && it.extraSignatures) n+=it.extraSignatures; };
  if(e.magic) Object.values(e.magic).forEach(add);
  (e.gifts||[]).forEach(add);
  add(e.magicStd);
  return n;
}
/* the signature (lvl-0) spells of the eight standard Winds of Magic, flattened
   to {lore, name, sp} — the pool an Arcane Familiar draws from. */
function windSignatures(){
  const out=[]; const W=window.COMMON_LORES||{};
  Object.keys(W).forEach(ln=>{ (W[ln].spells||[]).filter(sp=>sp.lvl===0).forEach(sp=>out.push({lore:ln,name:sp.name,sp})); });
  return out;
}

/* ---------- points for one entry ---------- */
function entryPoints(e){
  const u = findUnit(e.cat,e.id);
  let pts;
  if(u.isCharacter){ pts = u.variants[e.variant].points; }
  else { pts = u.perModel ? u.basePoints*e.count : u.basePoints; }
  // attached models required at a fixed ratio (e.g. Squig Herd: one Herder per five
  // Cave Squigs) — auto-costed on top of the base per-model points.
  if(u.attachedPerN) pts += attachedCount(e,u) * u.attachedPerN.cost;
  (u.options||[]).forEach(o=>{
    if(!optionActive(e,u,o)) return;                // hidden options cost nothing
    if(o.type==="choice"){ const i=e.opts[o.id]; if(i!=null){ const c=o.choices[i]; pts+=optCost(c,e.count); } }
    else if(o.type==="mustChoose"){ const c=o.choices[e.opts[o.id]]; if(c) pts+=optCost(c,e.count); }
    else if(o.type==="toggle"){ if(e.opts[o.id]) pts+=optCost(o,e.count); }
    else if(o.type==="perN"){ pts += perNCount(e,o)*o.cost; }   // one upgrade per o.n models
    else if(o.type==="multi"){
      if(o.repeatable){ pts += (e.opts[o.id]||0)*o.choices[0].cost; }
      else { (e.opts[o.id]||[]).forEach(i=>pts+=optCost(o.choices[i],e.count)); }
    }
    else if(o.type==="command"){ const c=e.opts.cmd;
      if(c.leader)pts+=CMD_COST.leader; if(c.musician)pts+=CMD_COST.musician; if(c.standard)pts+=CMD_COST.standard; }
    else if(o.type==="mount"){ const i=e.opts.mount; if(i!=null && !mountChoiceBlocked(e,u,o.choices[i])) pts+=o.choices[i].cost; }
  });
  // magic items
  Object.values(e.magic).forEach(nm=>{ if(nm) pts+=itemCost(nm); });
  if(e.magicStd) pts+=itemCost(e.magicStd);
  // multi-pick items (e.g. Daemonic Gifts) — share the magic-item budget
  (e.gifts||[]).forEach(nm=>{ if(nm) pts+=itemCost(nm); });
  // Vampiric Powers (VC) — share the magic-item budget, separate catalog
  pts += powersCost(e);
  // Virtues (Bretonnia) — one per model; duplicate copies across the army cost ×rank
  pts += virtueCost(e);
  // Runic Items (Dwarfs) — weapon/armour/talismanic/tattoo runes (in the magic
  // budget), plus BSB/unit banner runes and war-machine engineering runes.
  pts += runesCost(e);
  return pts;
}
function optCost(c,count){ return (c.per==="model") ? c.cost*count : c.cost; }
/* ---- perN upgrades: "one <thing> for every N models in the unit" ----
   max allowed = floor(current model count / o.n); the stored counter is clamped to
   that (and to 0 when the option is blocked by a sibling choice/god/mount). */
// required attached models at a fixed ratio (`u.attachedPerN={every,cost,name}`):
// how many are auto-included for the current model count (one per `every` models).
function attachedCount(e,u){ const ap=u&&u.attachedPerN; if(!ap||!ap.every) return 0; return Math.floor((e.count||0)/ap.every); }
function perNMax(e,o){ if(!o||!o.n) return 0; return Math.floor((e.count||0)/o.n); }
function perNCount(e,o){ const v=Math.floor(e.opts[o.id]||0); return Math.max(0, Math.min(perNMax(e,o), v)); }
/* ---- gate an option on a sibling choice's value (`requiresChoice`) ----
   {id:"subspecies", is:"Night Goblin"} → only when that choice is Night Goblin;
   is:null means "none selected" (e.g. Common Goblin); is may be an array. Used to
   hard-restrict the Goblin Gitz Fanatic/Netter/Nasty-Skulker upgrades by sub-species. */
function selectedChoiceLabel(e,u,id){
  const o=(u.options||[]).find(x=>x.id===id && (x.type==="choice"||x.type==="mustChoose"));
  if(!o) return undefined; const i=e.opts[id];
  return (i!=null && o.choices[i]) ? o.choices[i].label : null;
}
/* Does the model's sibling choice `rc.id` currently sit on one of `rc.is`?
   `is` may be a single label, null ("none selected"), or an array of either.
   Shared by option gating (requiresChoice) and conditional lores. */
function choiceMatches(e,u,rc){
  if(!rc) return true;
  const cur=selectedChoiceLabel(e,u,rc.id);
  let want=Array.isArray(rc.is)?rc.is:[rc.is];
  return want.some(w => w===cur);   // w may be null ("none selected"); cur is null when unset
}
function optChoiceBlocked(e,u,o){
  if(!o || !o.requiresChoice) return false;
  return !choiceMatches(e,u,o.requiresChoice);
}
function allPools(){ return D.commonMagicItems ? [D.magicItems, D.commonMagicItems] : [D.magicItems]; }
function itemsIn(cat){ return allPools().reduce((a,p)=>a.concat(p[cat]||[]), []); }
function findItem(name){ for(const p of allPools()){ for(const cat in p){ const it=p[cat].find(x=>x.name===name); if(it) return it; } } return null; }
function itemCost(name){ const it=findItem(name); return it?it.cost:0; }
function itemCommon(name){ const it=findItem(name); return it?!!it.common:false; }

/* ======================= RUNIC ITEMS (Dwarfs) =======================
   A data-driven "build your own magic item" system. D.runes maps a slot
   category ("Weapon Runes", "Armour Runes", "Talismanic Runes", "Banner
   Runes", "Engineering Runes", "Runic Tattoos") to a list of runes. A model's
   picks live in e.runes[cat] as a FLAT list of rune names (repeats allowed for
   cumulative runes). Rules of the Runes are enforced in the picker + validation:
   max 3 runes/item; one master rune/item and once per army; a `solo` rune can't
   combine; non-master runes repeat only up to their cumulative tiers; no two
   items may share the exact same combination. Costs: Weapon/Armour/Talismanic/
   Tattoo runes eat the character's magic-item budget; Banner runes use the BSB's
   unlimited allowance or a unit standard's banner budget; Engineering runes use
   a war machine's own budget. */
function hasRunes(){ return !!(D.runes); }
function runeList(cat){ return (D.runes && D.runes[cat]) || []; }
function runeDef(cat,name){ return runeList(cat).find(r=>r.name===name) || null; }
function runeIsMaster(cat,name){ const r=runeDef(cat,name); return !!(r&&r.master); }
function runeMaxCopies(r){ return Array.isArray(r&&r.cost) ? r.cost.length : 1; }
/* cost of k copies of a rune. For a cumulative rune the cost array holds the
   TOTAL cost for 1/2/3 copies (per Rules of the Runes rule 4: "5/10/20 … the
   higher numbers are the cost for the second and/or third cumulative rune"), so
   k copies cost c[k-1] outright — NOT the sum. Single-cost runes are ×1 only. */
function runeCopyCost(r,k){ if(!r||k<=0) return 0; const c=r.cost;
  if(Array.isArray(c)){ return c[Math.min(k,c.length)-1]; }
  return c*k; }
function runeGroup(list){ const g={}; (list||[]).forEach(n=>g[n]=(g[n]||0)+1); return g; }
/* cost of one item (one category's flat list of rune names) */
function runeCatCost(cat,list){ const g=runeGroup(list); let s=0;
  for(const n in g) s+=runeCopyCost(runeDef(cat,n), g[n]); return s; }
/* total rune cost over some/all of an entry's categories */
function runesCost(e,cats){ const R=e&&e.runes; if(!R) return 0; let s=0;
  for(const cat in R){ if(cats && !cats.includes(cat)) continue; s+=runeCatCost(cat,R[cat]); } return s; }
const MAGIC_BUDGET_RUNE_CATS=["Weapon Runes","Armour Runes","Talismanic Runes","Runic Tattoos"];
/* rune spend that eats a character's magic-item budget (not banner/engineering) */
function magicRunesCost(e){ return runesCost(e, MAGIC_BUDGET_RUNE_CATS); }
/* master runes in use elsewhere in the army (enforces once-per-army in the picker) */
function usedMasterRunes(exceptUid,exceptCat){ const s=new Set();
  state.forEach(x=>{ const R=x.runes; if(!R) return;
    for(const cat in R){ if(x.uid===exceptUid && cat===exceptCat) continue;
      (R[cat]||[]).forEach(n=>{ if(runeIsMaster(cat,n)) s.add(n); }); } });
  return s; }
function selectedMountKey(e,u){ const o=(u.options||[]).find(x=>x.type==="mount");
  if(!o||e.opts.mount==null) return null; const c=o.choices[e.opts.mount]; return c?c.key:null; }
function charHasArmourAccess(u){ return (u.access||[]).some(a=>/armour/.test(a)); }
/* is a rune legal on this model/machine (character-type or machine-type gate)? */
function runeAllowed(r,e,u,cat){
  if(!r.only) return true;
  const only=r.only;
  if(cat==="Engineering Runes"){ const arr=Array.isArray(only)?only:[only]; return arr.includes(u.machineType); }
  if(only==="great-weapon") return true;              // enabling rune — always shown
  if(only==="runesmith") return !!u.runesmith;
  if(only==="king") return !!(u.isCharacter && u.variants[e.variant] && u.variants[e.variant].name==="King");
  if(only==="bsb") return isBSB(e,u);
  if(only==="slayer-banner") return !!u.slayerTattoos;
  if(only==="no-oath"){ const mk=selectedMountKey(e,u); return mk!=="oath" && mk!=="shieldbearers"; }
  return true;
}
/* which rune categories a character shows (budget/eligibility driven) */
function runeCatsForChar(e,u){
  if(!u.isCharacter || !hasRunes()) return [];
  const cats=[]; const b=magicBudget(e,u);
  if(b>0){
    if(runeList("Weapon Runes").length) cats.push("Weapon Runes");
    if(charHasArmourAccess(u) && runeList("Armour Runes").length) cats.push("Armour Runes");
    if(runeList("Talismanic Runes").length) cats.push("Talismanic Runes");
    if(u.slayerTattoos && runeList("Runic Tattoos").length) cats.push("Runic Tattoos");
  }
  return cats;
}

/* ---------- Vampiric Powers (VC) & Virtues (Bretonnia) ----------
   Both are bought from the SAME points pool as a character's magic items.
   Powers: a separate catalog (D.vampiricPowers), multi-pick, no duplicates per
   model, not army-wide unique, filtered by the model's Bloodline.
   Virtues: one per model (D.virtues); the Nth model in the army carrying the
   same Virtue pays cost×N (duplicate-cost escalation). */
function powerDef(nm){ return (D.vampiricPowers||[]).find(p=>p.name===nm)||null; }
function powerCost(nm){ const p=powerDef(nm); return p?p.cost:0; }
function powersCost(e){ return (e.powers||[]).reduce((s,nm)=>s+powerCost(nm),0); }
function virtueDef(nm){ return (D.virtues||[]).find(v=>v.name===nm)||null; }
function virtueBase(e){ const v=e.virtue&&virtueDef(e.virtue); return v?v.cost:0; }
function virtueRank(e){ if(!e.virtue) return 0; let r=0; for(const x of state){ if(x.virtue===e.virtue){ r++; if(x.uid===e.uid) return r; } } return r; }
function virtueCost(e){ return virtueBase(e)*virtueRank(e); }
/* points a model has committed from its magic-item budget: items + standard-in-budget
   + gifts + powers + the Virtue's *base* cost (the duplicate surcharge is added to the
   army total via virtueCost, but does not eat the model's own item budget). */
function spentMagic(e){ return Object.values(e.magic).reduce((s,nm)=>s+(nm?itemCost(nm):0),0)+giftsCost(e)+powersCost(e)+virtueBase(e)+magicRunesCost(e); }

/* ---------- Arcane Item sub-types (Relic / Charm / Staff) ----------
   In the source books every arcane item's description opens with its type
   (e.g. "Staff. …", "Charm, one use. …"). A character may carry one of each
   type, so up to three arcane items total. The type is derived from the item
   description's first word; the rulebook "common" arcane items (not always
   described in every book file) fall back to this fixed map. Untyped arcane
   items default to "Relic". */
const ARCANE_SUBCATS=["Relic","Charm","Staff"];
const ARCANE_TYPE_FALLBACK={
  "Wand of the Winds":"Staff","Destroy Magic Scroll":"Charm","Feedback Scroll":"Charm",
  "Dispel Scroll":"Charm","Scroll of Leaching":"Charm","Power Familiar":"Relic",
  "Wand of Jade":"Staff","Wand of Jet":"Staff","Channelling Staff":"Staff",
  "Forbidden Rod":"Staff","Wand of Onyx":"Staff","Sceptre of Stability":"Staff",
  "Arcane Familiar":"Relic","Earthing Rod":"Staff","Power Scroll":"Charm",
  "Luckstone":"Charm","Power Stone":"Charm","Scroll of Shielding":"Charm","Spell Familiar":"Relic"
};
/* an item's effect text: the active book's own itemDesc wins, then the shared
   common-rulebook descriptions (common-items.js) */
function itemDescOf(name){
  return (D.itemDesc && D.itemDesc[name]) || (window.COMMON_ITEM_DESC && window.COMMON_ITEM_DESC[name]) || "";
}
function arcaneType(name){
  const d=itemDescOf(name);
  const m=d.match(/^(Relic|Charm|Staff)\b/);
  if(m) return m[1];
  if(ARCANE_TYPE_FALLBACK[name]) return ARCANE_TYPE_FALLBACK[name];
  return "Relic";
}

/* ---------- category totals ---------- */
function catTotal(cat){ return state.filter(e=>e.cat===cat).reduce((s,e)=>s+entryPoints(e),0); }
function grandTotal(){ return state.reduce((s,e)=>s+entryPoints(e),0); }

/* ---------- army summary ("bracket") ---------- */
function isLone(u){ return u.isCharacter || !u.perModel; }   // characters & single-model entries have no troop count
/* Purchased loadout of ONE roster entry, split for the detail popup:
   - equip: weapon/armour/command/mount/plain upgrades (clickable via ruleDef)
   - magic: magic items / gifts / powers / virtue / magic standard / runes (clickable via item desc)
   Mirrors describe() so the popup matches export exactly. */
function entryLoadout(e,u){
  const equip=[], magic=[];
  (u.options||[]).forEach(o=>{
    if(!optionActive(e,u,o)) return;
    if(o.type==="choice" && e.opts[o.id]!=null && o.choices[e.opts[o.id]]) equip.push(o.choices[e.opts[o.id]].label);
    else if(o.type==="mustChoose" && o.choices[e.opts[o.id]]) equip.push(o.choices[e.opts[o.id]].label);
    else if(o.type==="toggle" && e.opts[o.id]) equip.push(o.label);
    else if(o.type==="perN"){ const c=perNCount(e,o); if(c) equip.push(`${c}× ${o.label}`); }
    else if(o.type==="mount" && e.opts.mount!=null && o.choices[e.opts.mount]) equip.push("Mount: "+o.choices[e.opts.mount].label);
    else if(o.type==="command"){ const c=e.opts.cmd||{}; if(c.leader)equip.push("Leader"); if(c.musician)equip.push("Musician"); if(c.standard)equip.push("Standard Bearer"); }
    else if(o.type==="multi"){ if(o.repeatable){ if(e.opts[o.id])equip.push(`${e.opts[o.id]}× ${o.choices[0].label}`); } else (e.opts[o.id]||[]).forEach(i=>{ if(o.choices[i]) equip.push(o.choices[i].label); }); }
  });
  if(u.attachedPerN){ const n=attachedCount(e,u); if(n) equip.push(`${n}× ${u.attachedPerN.name}`); }
  Object.entries(e.magic||{}).forEach(([cat,nm])=>{ if(nm) magic.push(nm); });
  (e.gifts||[]).forEach(nm=>magic.push(nm));
  (e.powers||[]).forEach(nm=>magic.push("Power: "+nm));
  if(e.virtue) magic.push("Virtue: "+e.virtue);
  if(e.magicStd) magic.push("Standard: "+e.magicStd);
  if(e.runes){ for(const cat in e.runes){ const list=e.runes[cat]; if(list && list.length){
    const g=runeGroup(list); Object.keys(g).forEach(n=>magic.push(g[n]>1?`${n} ×${g[n]}`:n)); } } }
  const spells = e.lore ? knownSpells(e) : [];
  return {equip, magic, spells, lore:e.lore};
}
/* ---------- mount profile lookup ----------
   A mount's characteristics come from the book's unitInfo: many mounts are also
   units (Lammasu, Great Eagle, chariots…), so we match the mount's name (the
   label, or its parenthetical creature) exactly against any unitInfo profile
   row. Mounts that aren't units carry their own `prof`/`rules` on the choice.
   Rendering of all mounts lives in openMountChoices(). */
function mountNorm(s){ return String(s).toLowerCase().replace(/\s*\([^)]*\)\s*/g," ").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim(); }
function mountProfile(label){
  const wanted=[mountNorm(label)]; const m=String(label).match(/\(([^)]+)\)/); if(m) wanted.push(mountNorm(m[1]));
  // Pass 1: prefer an entry whose FIRST row is the wanted entity — i.e. the standalone
  // mount / unit (its `rules` describe the mount itself), not a rider-combined profile
  // (e.g. Walach, Melkhior, Zacharias) where the mount is only a later sub-row and the
  // entry's `rules` belong to the rider.
  for(const k in (D.unitInfo||{})){ const inf=D.unitInfo[k]; const first=(inf.profile||[])[0];
    if(first && wanted.includes(mountNorm(first[0]))) return {row:first, rules:inf.rules, eq:inf.eq};
  }
  // Pass 2: fall back to any-row match (mount only exists inside a combined profile).
  for(const k in (D.unitInfo||{})){ const inf=D.unitInfo[k];
    for(const row of (inf.profile||[])){ if(wanted.includes(mountNorm(row[0]))) return {row, rules:inf.rules, eq:inf.eq}; }
  }
  return null;
}

/* all spells a wizard knows = signature(s) of its lore + chosen spells
   (+ any extra signatures from an Arcane Familiar, trimmed to the item bonus) */
function knownSpells(e){
  const extraSig=(e.sigSpells||[]).slice(0,bonusSignatures(e));
  const lore=e.lore?loreData(e.lore):null; if(!lore) return [...(e.spells||[]), ...extraSig];
  const sigs=lore.spells.filter(sp=>sp.lvl===0).map(sp=>sp.name);
  return [...sigs, ...(e.spells||[]), ...extraSig];
}
/* resolve a lore's spell data: book-specific lores win, then the shared 8 rulebook lores */
function loreData(name){ return (D.spellLores && D.spellLores[name]) || (window.COMMON_LORES && window.COMMON_LORES[name]) || null; }
/* ---- conditional lores ----
   A unit's `lores` entries may be a plain string (always offered) or an object
   { name, requiresChoice:{id,is} } / { name, requiresVariant:"A"|[…] } that is
   only offered when the gating condition holds (e.g. Goblin Shaman: "Bad Moon"
   only once the Night-Goblin sub-species is chosen). `availableLores` returns the
   names currently selectable; the lore picker & the Undead requireWizardLore
   validator both use it. */
function loreEntries(u){ return (u.lores||[]).map(l=> (typeof l==="string") ? {name:l} : l); }
function loreNames(u){ return loreEntries(u).map(l=>l.name); }
function loreEntryAvailable(e,u,le){
  if(le.requiresChoice && !choiceMatches(e,u,le.requiresChoice)) return false;
  if(le.requiresToggle){ const ids=Array.isArray(le.requiresToggle)?le.requiresToggle:[le.requiresToggle];
    if(!ids.every(id=>!!(e.opts&&e.opts[id]))) return false; }   // e.g. Orc Shaman: Savage Waaagh! needs the Savage Orc upgrade
  if(le.requiresVariant){ const names=Array.isArray(le.requiresVariant)?le.requiresVariant:[le.requiresVariant];
    return u.isCharacter && u.variants[e.variant] && names.includes(u.variants[e.variant].name); }
  return true;
}
function availableLores(e,u){ return loreEntries(u).filter(le=>loreEntryAvailable(e,u,le)).map(le=>le.name); }
/* mount profile/rules for one mount choice: its own prof/rules/eq, else matched
   from unitInfo by name (same resolution as openMountInfo). */
function mountChoiceData(c){
  // `prof` may be a single stat row [name,M,…] or an array of such rows (a monster
  // + its crew, e.g. the Arachnarok Spider). Normalise to `rows` (array of rows).
  if(c.prof){ const rows=Array.isArray(c.prof[0])?c.prof:[c.prof]; return {rows, rules:c.rules||"", eq:c.eq||""}; }
  const hit=mountProfile(c.label); if(hit) return {rows:[hit.row], rules:hit.rules||"", eq:hit.eq||""};
  return null;
}
/* ---------- helpers for variant/wizard/magic ---------- */
function variantMatch(e,u,only){ if(!u.isCharacter) return true; return u.variants[e.variant].name===only; }
function wizardActive(e,u){ return wizardLevel(e,u)>0; }
function magicBudget(e,u){ if(!u.isCharacter) return 0; let b=u.variants[e.variant].magicBudget||0; return b; }
function isBSB(e,u){ return u.isCharacter && (u.options||[]).some(o=>o.bsb) && e.opts.bsb; }

/* ---------- daemon god alignment & conditional (cross-unit) options ---------- */
// A model's god: a fixed `god` on the unit, or derived from a chosen "align" option.
function entryGod(e,u){
  if(u.god) return u.god;
  const o=alignOption(u);
  if(o){ const i=e.opts.align; if(i!=null && o.choices[i]) return o.choices[i].god||null; }
  return null;
}
// the alignment option: the choice whose choices carry a `god` (Daemonic Alignment)
function alignOption(u){ return (u.options||[]).find(o=>(o.type==="choice"||o.type==="mustChoose") && o.choices.some(c=>c.god))||null; }
function godOK(it,god){ return !it.god || it.god===god; }
function unitHasTag(u,t){ return Array.isArray(u.tags) && u.tags.includes(t); }
// An option may be barred for certain gods (e.g. Khornate Daemons can't take a
// Wizard upgrade): `noGod:["Khorne"]`. True ⇒ the option is unavailable/ignored.
function optGodBlocked(e,u,o){ return !!(o && o.noGod && o.noGod.includes(entryGod(e,u))); }
// The model's chosen mount (a `mount` option's selected choice), or null.
function mountOptionOf(u){ return (u.options||[]).find(o=>o.type==="mount")||null; }
function selectedMount(e,u){ const o=mountOptionOf(u); if(!o) return null; const i=e.opts.mount; return (i!=null && o.choices[i])?o.choices[i]:null; }
/* ---------- conditional choices & choice-gated mounts ----------
   Any `choice`/`mustChoose` choice may carry `cond:{mounts:[keys…]}` (with
   "__foot__" = on foot): the picker shows it but disables it while the current
   mount isn't listed, and validation flags it if it is the pick (High Elf Elven
   Honours). The reverse link is a `mount` choice carrying the same generic
   `requiresChoice:{id,is}` as options: it stays hidden/uncharged until that
   sibling choice is picked (the Flamespyre Phoenix under Anointed of Asuryan). */
// a mount choice gated by a sibling choice (`requiresChoice`). True ⇒ not unlocked.
function mountChoiceBlocked(e,u,c){ return !!(c && c.requiresChoice && !choiceMatches(e,u,c.requiresChoice)); }
// the model's current mount key, or "__foot__" if none / blocked
function currentMountKey(e,u){ const m=selectedMount(e,u); if(!m||mountChoiceBlocked(e,u,m)) return "__foot__"; return m.key||"__mounted__"; }
// honour eligibility vs the chosen mount → {ok, reason}; ok=false ⇒ shown disabled
function honourCondOK(e,u,c){
  if(!c||!c.cond||!c.cond.mounts) return {ok:true};
  if(c.cond.mounts.includes(currentMountKey(e,u))) return {ok:true};
  const mo=mountOptionOf(u);
  const label=(k)=> k==="__foot__"?"on foot":(((mo&&mo.choices.find(x=>x.key===k))||{}).label||k);
  return {ok:false, reason:"Requires: "+c.cond.mounts.map(label).join(" or ")};
}
// drop a mount whose unlocking Honour is no longer selected (keeps state legal)
function reconcileEntry(e){ const u=findUnit(e.cat,e.id); if(!u) return;
  const mo=mountOptionOf(u);
  if(mo && e.opts.mount!=null){ const c=mo.choices[e.opts.mount];
    // drop the chosen mount if it became illegal: honour-gated and its honour is
    // gone, or restricted to a variant the model no longer is (e.g. Royal
    // Hippogryph is Baron-only — switching off Baron deselects it)
    if(!c || mountChoiceBlocked(e,u,c) || (c.only && !variantMatch(e,u,c.only))) e.opts.mount=null;
  }
  // clear any mount-gated upgrade toggles whose mount is no longer the chosen one,
  // so a switched-away mount's upgrades (e.g. Royal Hippogryph Bloodrage) don't
  // linger in state and silently reappear if that mount is picked again
  (u.options||[]).forEach(o=>{ if(o.requiresMount && e.opts[o.id] && optMountBlocked(e,u,o)) e.opts[o.id]=false; });
  // reset options barred by a sibling choice (e.g. sub-species) so a switched-away
  // upgrade doesn't linger; clamp perN counters to the unit's current model count
  (u.options||[]).forEach(o=>{
    if(optChoiceBlocked(e,u,o)){ if(o.type==="perN") e.opts[o.id]=0; else if(o.type==="toggle") e.opts[o.id]=false; }
    else if(o.type==="perN"){ e.opts[o.id]=perNCount(e,o); }
  });
  reconcileMagic(e,u);
  reconcileSpells(e,u);
}
/* drop magic picks that are no longer legal for this model — god changed (Daemons),
   equipment access lost, variant switched, bloodline mismatch — so neither a later
   edit nor a loaded save can keep (or pay for) an illegal item */
function reconcileMagic(e,u){
  const god=entryGod(e,u);
  const legal=nm=>{ const it=findItem(nm); if(!it) return true;
    if(D.godSections && it.god && it.god!==god) return false;
    return itemAllowed(it,e,u); };
  for(const cat in e.magic){ const nm=e.magic[cat]; if(nm && !legal(nm)) e.magic[cat]=""; }
  e.gifts=(e.gifts||[]).filter(nm=>{ const it=findItem(nm); return it && legal(nm); });
  if(D.vampiricPowers && unitHasTag(u,"Vampire")){ const bl=entryBlood(e,u);
    e.powers=(e.powers||[]).filter(nm=>{ const pw=powerDef(nm); return pw && (!pw.blood || pw.blood.includes(bl)); }); }
}
/* keep a wizard's lore/spells legal: a lore no longer offered is cleared; chosen
   spells above the wizard's level or beyond its pick cap are dropped; extra
   signature picks are trimmed to what the carried items grant. A model that is no
   longer a wizard (e.g. a Daemon aligned to Khorne) keeps no lore at all. */
function reconcileSpells(e,u){
  if(!u.lores) return;
  if(!wizardActive(e,u)){ if(e.lore){ e.lore=""; e.spells=[]; e.sigSpells=[]; } return; }
  if(e.lore && !availableLores(e,u).includes(e.lore)){ e.lore=""; e.spells=[]; }
  const lore=e.lore?loreData(e.lore):null; if(!lore) return;
  const lvl=wizardLevel(e,u), cap=lvl+bonusSpells(e);
  e.spells=(e.spells||[]).filter(nm=>lore.spells.some(sp=>sp.name===nm && sp.lvl!==0 && sp.lvl<=lvl)).slice(0,cap);
  const winds=windSignatures();
  e.sigSpells=(e.sigSpells||[]).filter(nm=>winds.some(w=>w.name===nm)).slice(0,bonusSignatures(e));
}
// An option may require a specific mount to be chosen first (`requiresMount:"key"`
// or `["keyA","keyB"]`, matched against the mount choice's `key`). Used so a
// mount's own upgrades (e.g. Royal Hippogryph talons, Great Taurus Flaming Breath)
// only appear/charge once that mount is selected. True ⇒ option unavailable/ignored.
function optMountBlocked(e,u,o){
  if(!o || !o.requiresMount) return false;
  const want=Array.isArray(o.requiresMount)?o.requiresMount:[o.requiresMount];
  const m=selectedMount(e,u);
  return !(m && want.includes(m.key));
}
/* Is an option live for this model right now? Hidden options (locked by a missing
   unit, the model's god, its mount, a sibling choice, or a variant-only toggle)
   are neither shown, charged, nor exported. The one gate shared by entryPoints,
   the entry card, describe() and the loadout popup. */
function optionActive(e,u,o){
  if(o.requires && !optionAvailable(o)) return false;
  if(optGodBlocked(e,u,o)) return false;
  if(optMountBlocked(e,u,o)) return false;
  if(optChoiceBlocked(e,u,o)) return false;
  if(o.type==="toggle" && o.only && !variantMatch(e,u,o.only)) return false;
  return true;
}
// display name of an entry (the character's profile name, else the unit name)
function entryName(e){ const u=findUnit(e.cat,e.id); return u.isCharacter?u.variants[e.variant].name:u.name; }
// a model's Bloodline (VC): a fixed field on the unit entry.
function entryBlood(e,u){ return u.bloodline || null; }
/* ---- equipment access (magic weapon / armour gating) ----
   A magic item that IS a mundane weapon or armour type (e.g. a magic heavy
   armour, a magic great weapon) may only be taken by a model that can use that
   type — i.e. it has it in base equipment or can buy it. Each such item carries
   `requiresAccess:"heavy armour"` (or an array = any-of; `{all:[…]}` = all-of,
   e.g. an item that is both heavy armour and a shield); each character declares
   the union of types it has/can buy in `access:[…]` (unit-level, optionally
   extended per variant). Items with no `requiresAccess` (a generic magic sword,
   a talisman) are unrestricted. Tokens are matched after normalising through a
   small alias map so "polearm"≡"halberd", "elven longbow"≡"longbow", etc.
   Heavy and light lances are different weapons and don't satisfy each other. */
const ACCESS_ALIASES={
  "two hand weapons":"additional hand weapon","paired weapons":"additional hand weapon","additional weapon":"additional hand weapon",
  "additional hand weapons":"additional hand weapon",
  "double-handed weapon":"great weapon","great sword":"great weapon",
  "polearm":"halberd",
  "lance":"heavy lance","cavalry spear":"spear",
  "full plate armour":"heavy armour","gromril armour":"heavy armour",
  "gut plate":"gut-plate",
  "bow":"longbow","elven longbow":"longbow","elven shortbow":"shortbow","short bow":"shortbow",
  "javelins":"javelin","throwing weapons":"throwing weapon","brace of ogre pistols":"ogre pistol"
};
function normAccess(s){
  const t=String(s||"").toLowerCase().replace(/\s*\([^)]*\)\s*/g," ").replace(/[^a-z0-9 +'-]/g," ").replace(/\s+/g," ").trim();
  return ACCESS_ALIASES[t]||t;
}
function modelAccess(e,u){
  const set=new Set();
  (u.access||[]).forEach(a=>set.add(normAccess(a)));
  if(u.isCharacter && u.variants && u.variants[e.variant] && u.variants[e.variant].access)
    u.variants[e.variant].access.forEach(a=>set.add(normAccess(a)));
  return set;
}
// light/medium/heavy armour form a tier: a model that may wear a heavier armour
// may also take a lighter magic armour (a magic armour replaces the mundane one).
// Everything else (shields, lances, bows, …) is matched exactly.
const ARMOUR_RANK={"light armour":1,"medium armour":2,"heavy armour":3};
function hasAccess(e,u,req){
  const acc=modelAccess(e,u);
  let maxArmour=0; acc.forEach(a=>{ if(ARMOUR_RANK[a]>maxArmour) maxArmour=ARMOUR_RANK[a]; });
  const one=r=>{ if(r && typeof r==="object" && !Array.isArray(r)) return (r.all||[]).every(one);
    r=normAccess(r); return ARMOUR_RANK[r] ? maxArmour>=ARMOUR_RANK[r] : acc.has(r); };
  return (Array.isArray(req)?req:[req]).some(one);
}
/* The mundane equipment type a magic weapon/armour item IS, for display in the
   picker and on the chosen slot: an explicit `equipType` label wins, else it's
   built from `requiresAccess` ("Light lance / Spear", "Heavy armour + Shield").
   Null when the item has no mundane type (e.g. a plain magic sword). */
const EQUIP_TYPE_LABEL={"halberd":"polearm (halberd)"};
function itemEquipType(it){
  if(!it) return null;
  if(it.equipType) return it.equipType;
  const r=it.requiresAccess; if(!r) return null;
  const cap=s=>{ s=normAccess(s); s=EQUIP_TYPE_LABEL[s]||s; return s.charAt(0).toUpperCase()+s.slice(1); };
  const one=x=>(x && typeof x==="object" && !Array.isArray(x)) ? (x.all||[]).map(cap).join(" + ") : cap(x);
  return (Array.isArray(r)?r:[r]).map(one).join(" / ");
}
// unified magic-item eligibility for a model: variant/keyword restriction (`only`),
// Bloodline list (`blood:[...]`), vampire-only (`vampireOnly`), god (`god`), and
// equipment access (`requiresAccess` — magic weapon/armour must match a usable type).
function itemAllowed(it,e,u){
  if(!itemAllowedIgnoringAccess(it,e,u)) return false;
  if(!itemAccessOK(it,e,u)) return false;
  return true;
}
// equipment-access half of itemAllowed. `accessWaivedFor:[…]` names models (variant
// or unit names) the item's own text lets take it regardless of equipment
// (Armour of Bone: "May be taken by Necromancers").
function itemAccessOK(it,e,u){
  if(!it.requiresAccess) return true;
  if(it.accessWaivedFor){ const nm=u.isCharacter&&u.variants&&u.variants[e.variant]?u.variants[e.variant].name:u.name;
    if([].concat(it.accessWaivedFor).some(w=>w===nm||w===u.name)) return true; }
  return hasAccess(e,u,it.requiresAccess);
}
// every restriction except equipment access — the picker uses it to show an item
// the model is barred from only by its equipment as disabled ("needs Shield")
// rather than hiding it, so the rule is visible.
function itemAllowedIgnoringAccess(it,e,u){
  if(it.only && !restrictOK(e,u,it.only)) return false;
  if(it.blood && !it.blood.includes(entryBlood(e,u))) return false;
  if(it.vampireOnly && !unitHasTag(u,"Vampire")) return false;
  if(it.god && !godOK(it,entryGod(e,u))) return false;
  return true;
}
// requires:{unit:"id"|["id",...]} — option only available if such a unit is in the army.
function armyHas(idOrArr){ const ids=Array.isArray(idOrArr)?idOrArr:[idOrArr]; return state.some(x=>ids.includes(x.id)); }
function optionAvailable(o){ if(!o||!o.requires) return true; if(o.requires.unit) return armyHas(o.requires.unit); return true; }
function giftsCost(e){ return (e.gifts||[]).reduce((s,nm)=>s+(nm?itemCost(nm):0),0); }
function restrictOK(e,u,only){
  if(only==="Daemonsmith") return u.id==="daemonsmith";
  if(only==="Hobgoblins") return u.keyword==="hobgoblin"; // Hobgoblin units only (as a magic standard); characters can't take it in their item budget
  // Variant-gated restriction: if `only` names one (or "A or B") of THIS unit's own
  // variants, enforce it (e.g. "Level 3 Wizard — Count only", "Baron or Paladin").
  // Otherwise we don't model the keyword, so don't hide it.
  if(u.isCharacter && Array.isArray(u.variants)){
    const names=u.variants.map(v=>v.name);
    const wanted=String(only).split(/\s+or\s+/).map(s=>s.trim());
    if(wanted.some(w=>names.includes(w))) return wanted.includes(u.variants[e.variant].name);
  }
  return true;
}

/* =========================== VALIDATION =========================== */
function entryErrors(e,u){
  const errs=[];
  if(u.perModel && u.unitSize){ const[mn,mx]=u.unitSize;
    if(e.count<mn) errs.push(`${u.name}: below minimum size (${mn}).`);
    if(mx!=null && e.count>mx) errs.push(`${u.name}: above maximum size (${mx}).`); }
  const b=magicBudget(e,u);
  if(b>0){ const used=spentMagic(e);
    if(used>b) errs.push(`${u.variants[e.variant].name}: magic items/powers exceed ${b} pt budget.`); }
  // a chosen conditional choice (e.g. an Elven Honour) whose mount requirement is unmet
  (u.options||[]).forEach(o=>{
    if((o.type!=="choice"&&o.type!=="mustChoose") || e.opts[o.id]==null || !optionActive(e,u,o)) return;
    const c=o.choices[e.opts[o.id]]; const ce=honourCondOK(e,u,c);
    if(!ce.ok) errs.push(`${entryName(e)}: ${c.label} — ${ce.reason}.`);
  });
  return errs;
}

/* Every army-building rule check, as data: {errs:[{msg,uid}], warns:[…]}. `uid`
   names the roster entry an issue is about (null for army-wide issues), so the
   validation panel can link to it. No DOM. */
function collectIssues(){
  const limit=currentLimit();
  const errs=[], warns=[];
  const at=(msg,uid)=>({msg,uid});        // an issue about one roster entry
  const lastUid={};                       // key → uid of the last entry that hit it
  const hit=(key,e)=>{ lastUid[key]=e.uid; };
  const tot=grandTotal();
  if(tot>limit) errs.push(`Army is ${Math.round((tot-limit)*10)/10} pts over the ${limit} pt limit.`);

  // category caps
  if(catTotal("characters")>limit*D.composition.charactersMax+0.001)
    errs.push(`Characters exceed ${Math.round(D.composition.charactersMax*100)}% (${Math.round(catTotal("characters"))}/${Math.round(limit*D.composition.charactersMax)}).`);
  if(catTotal("special")>limit*D.composition.specialMax+0.001)
    errs.push(`Special exceeds ${Math.round(D.composition.specialMax*100)}%.`);
  if(catTotal("rare")>limit*D.composition.rareMax+0.001)
    errs.push(`Rare exceeds ${Math.round(D.composition.rareMax*100)}%.`);
  if(state.length && catTotal("core")<limit*D.composition.coreMin-0.001)
    warns.push(`Core is below the ${Math.round(D.composition.coreMin*100)}% minimum (${Math.round(catTotal("core"))}/${Math.round(limit*D.composition.coreMin)}).`);

  // single unit/character 25% cost limit
  state.forEach(e=>{ const u=findUnit(e.cat,e.id); const p=entryPoints(e);
    if(limit && p>limit*D.composition.singleUnitMax+0.001)
      errs.push(at(`${u.isCharacter?u.variants[e.variant].name:u.name} costs ${Math.round(p)} pts — over the 25% single-unit cap.`,e.uid)); });

  // duplicate special/rare caps
  const cap=dupCap(limit);
  ["special","rare"].forEach(c=>{
    const counts={};
    state.filter(e=>e.cat===c).forEach(e=>{ counts[e.id]=(counts[e.id]||0)+1; hit("u:"+e.id,e); });
    for(const id in counts){ if(counts[id]>cap[c]){ const u=findUnit(c,id);
      errs.push(at(`Too many ${u.name} (${counts[id]}). Limit is ${cap[c]} duplicate ${c} choice(s) at ${limit} pts.`,lastUid["u:"+id])); } }
  });

  // special character uniqueness
  const scCount={};
  state.forEach(e=>{ const u=findUnit(e.cat,e.id); if(u.isSpecialChar){ scCount[e.id]=(scCount[e.id]||0)+1; hit("u:"+e.id,e); } });
  for(const id in scCount){ if(scCount[id]>1){ const u=findUnit("characters",id); errs.push(at(`${u.name} is a special character — may be taken only once.`,lastUid["u:"+id])); } }

  // expendable core requires a non-expendable core
  const coreEntries=state.filter(e=>e.cat==="core");
  const hasExp=coreEntries.some(e=>findUnit("core",e.id).expendable);
  const hasNonExp=coreEntries.some(e=>!findUnit("core",e.id).expendable);
  if(hasExp && !hasNonExp) errs.push(`Expendable Core units require at least one non-Expendable Core unit.`);

  // slaves <= hobgoblin units
  const slaveUnits=coreEntries.filter(e=>["orcslaves","goblinslaves"].includes(e.id)).length;
  const hobUnits=coreEntries.filter(e=>["cutthroats","archers"].includes(e.id)).length;
  if(slaveUnits>hobUnits) errs.push(`Slave units (${slaveUnits}) exceed Hobgoblin Cutthroat/Archer units (${hobUnits}).`);

  // army-wide magic item uniqueness (incl. standards)
  const itemNames=[];
  state.forEach(e=>{ Object.values(e.magic).forEach(nm=>{ if(nm){ itemNames.push(nm); hit("i:"+nm,e); } }); if(e.magicStd){ itemNames.push(e.magicStd); hit("i:"+e.magicStd,e); } });
  const seen={};
  itemNames.forEach(nm=>{ seen[nm]=(seen[nm]||0)+1; });
  for(const nm in seen){ if(seen[nm]>1 && !itemCommon(nm)) errs.push(at(`Magic item "${nm}" taken ${seen[nm]}× — unique items may be taken only once.`,lastUid["i:"+nm])); }

  // an item flagged `exclusive:true` (e.g. Talisman of Obsidian) forbids any other magic item on the model
  state.forEach(e=>{
    const held=[...Object.values(e.magic||{}),...(e.gifts||[]),e.magicStd].filter(Boolean);
    const ex=held.find(nm=>{ const it=findItem(nm); return it && it.exclusive; });
    if(ex && held.length>1){ const u=findUnit(e.cat,e.id); const who=u.isCharacter?u.variants[e.variant].name:u.name;
      errs.push(at(`${who}: ${ex} — the bearer may take no other magic items.`,e.uid)); }
  });

  // ---- Runic Items: Rules of the Runes ----
  if(hasRunes()){
    const masterUse={}, combos={};
    state.forEach(e=>{ const u=findUnit(e.cat,e.id); const R=e.runes||{};
      const who=u.isCharacter?u.variants[e.variant].name:u.name;
      for(const cat in R){ const list=R[cat]||[]; if(!list.length) continue;
        if(list.length>3) errs.push(at(`${who}: a runic item has ${list.length} runes — max 3 per item.`,e.uid));
        const masters=list.filter(n=>runeIsMaster(cat,n));
        if(masters.length>1) errs.push(at(`${who}: a runic item has ${masters.length} master runes — only one per item.`,e.uid));
        masters.forEach(n=>{ masterUse[n]=(masterUse[n]||0)+1; hit("m:"+n,e); });
        const solo=list.find(n=>{ const r=runeDef(cat,n); return r&&r.solo; });
        if(solo && list.length>1) errs.push(at(`${who}: ${solo} cannot be combined with other runes.`,e.uid));
        const g=runeGroup(list);
        for(const n in g){ const r=runeDef(cat,n); if(r && g[n]>runeMaxCopies(r)) errs.push(at(`${who}: ${n} inscribed ×${g[n]} — max ${runeMaxCopies(r)}.`,e.uid)); }
        const sig=cat+"|"+Object.keys(g).sort().map(n=>n+"*"+g[n]).join("+");
        combos[sig]=(combos[sig]||0)+1; hit("c:"+sig,e);
      }
    });
    for(const n in masterUse){ if(masterUse[n]>1) errs.push(at(`Master rune "${n}" is used ${masterUse[n]}× — a master rune may be used only once per army.`,lastUid["m:"+n])); }
    for(const sig in combos){ if(combos[sig]>1){ const nm=sig.split("|")[1].replace(/\*/g,"×").replace(/\+/g,", "); errs.push(at(`Two runic items share the same rune combination (${nm}) — each combination must be unique.`,lastUid["c:"+sig])); } }
    // per-slot budgets + fixed-item mutual exclusion
    state.forEach(e=>{ const u=findUnit(e.cat,e.id); const R=e.runes||{};
      const who=u.isCharacter?u.variants[e.variant].name:u.name;
      if(u.engineeringRunes){ const c=runeCatCost("Engineering Runes",R["Engineering Runes"]||[]);
        if(c>u.engineeringRunes) errs.push(at(`${u.name}: engineering runes cost ${c} — over the ${u.engineeringRunes} pt limit.`,e.uid)); }
      if(!u.isCharacter){ const bopt=(u.options||[]).find(o=>o.type==="command" && o.magicStandard);
        if(bopt){ const bc=runeCatCost("Banner Runes",R["Banner Runes"]||[]);
          if(bc>bopt.magicStandard) errs.push(at(`${u.name}: banner runes cost ${bc} — over the ${bopt.magicStandard} pt banner budget.`,e.uid));
          if(bc>0 && e.magicStd) errs.push(at(`${u.name}: a unit may carry either a Magic Standard or Banner Runes, not both.`,e.uid)); } }
      if(u.isCharacter){
        [["Weapon Runes","Magic Weapons","Magic Weapon"],["Armour Runes","Magic Armour","Magic Armour"],["Talismanic Runes","Talismans","Talisman"],["Banner Runes","Magic Standards","Magic Standard"]].forEach(([rc,mc,lbl])=>{
          const hasRune=(R[rc]||[]).length>0;
          const hasItem = (mc==="Magic Standards") ? !!e.magicStd : !!(e.magic && e.magic[mc]);
          if(hasRune && hasItem) errs.push(at(`${who}: cannot carry both a ${lbl} and ${rc}.`,e.uid));
        });
      }
    });
  }

  // per-entry size/budget
  state.forEach(e=>{ entryErrors(e,findUnit(e.cat,e.id)).forEach(m=>errs.push(at(m,e.uid))); });

  // capped upgrades: oncePerArmy (=1) or limitByUnit (= number of source units, e.g. one per Despot)
  const optTaken={}, optMax={};
  state.forEach(e=>{ const u=findUnit(e.cat,e.id); (u.options||[]).forEach(o=>{
    if(o.type==="toggle" && e.opts[o.id] && optionAvailable(o) && (o.oncePerArmy || o.limitByUnit)){
      optTaken[o.label]=(optTaken[o.label]||0)+1; hit("o:"+o.label,e);
      optMax[o.label]= o.limitByUnit ? state.filter(x=>o.limitByUnit.includes(x.id)).length : 1;
    }
  }); });
  for(const k in optTaken){ const mx=optMax[k];
    if(optTaken[k]>mx) errs.push(at(`"${k}" may be taken on ${mx===1?"only one unit":("only "+mx+" units")} (taken ${optTaken[k]}×).`,lastUid["o:"+k])); }

  // Undead: army must include at least one Wizard using the required lore
  // (VC Lore of Necromancy; TK Lore of Nehekhara — its highest-level wizard is the Hierophant).
  if(D.requireWizardLore && state.length){
    const lore=D.requireWizardLore;
    const ok=state.some(e=>{ const u=findUnit(e.cat,e.id); if(!wizardActive(e,u)) return false;
      const av=availableLores(e,u);
      return e.lore===lore || (av.length===1 && av[0]===lore); });   // explicit pick, or the model's only legal lore
    if(!ok) errs.push(D.requireWizardLoreMsg || `Your army must include at least one Wizard using the Lore of ${lore}.`);
  }

  // forced / forbidden General (special characters etc.)
  state.forEach(e=>{ const u=findUnit(e.cat,e.id);
    if(u.mustBeGeneral && e.uid!==generalUid)
      errs.push(at(`${u.isCharacter?u.variants[e.variant].name:u.name} must be nominated as the Army General.`,e.uid));
  });

  // Army General: exactly one character must be nominated
  const chars=state.filter(e=>e.cat==="characters");
  if(chars.length && !chars.some(e=>e.uid===generalUid))
    errs.push(at(`You must nominate one of your characters as the Army General.`,chars[0].uid));

  const norm=it=>(typeof it==="string")?{msg:it,uid:null}:it;
  return { errs:errs.map(norm), warns:warns.map(norm) };
}
function dupCap(limit){
  for(const r of D.duplicateCaps){ if(limit<=r.upTo) return r; }
  return D.duplicateCaps[D.duplicateCaps.length-1];
}

function describe(e,u){
  const d=[];
  (u.options||[]).forEach(o=>{
    if(!optionActive(e,u,o)) return;
    if((o.type==="choice")&&e.opts[o.id]!=null) d.push(o.choices[e.opts[o.id]].label);
    else if(o.type==="mustChoose") d.push(o.choices[e.opts[o.id]].label);
    else if(o.type==="toggle"&&e.opts[o.id]) d.push(o.label);
    else if(o.type==="perN"){ const c=perNCount(e,o); if(c) d.push(`${c}× ${o.label}`); }
    else if(o.type==="mount"&&e.opts.mount!=null) d.push("Mount: "+o.choices[e.opts.mount].label);
    else if(o.type==="command"){ const c=e.opts.cmd; const cc=[]; if(c.leader)cc.push("Leader"); if(c.musician)cc.push("Musician"); if(c.standard)cc.push("Standard"); if(cc.length)d.push(cc.join(", ")); }
    else if(o.type==="multi"){ if(o.repeatable){ if(e.opts[o.id])d.push(`${e.opts[o.id]}× ${o.choices[0].label}`); } else (e.opts[o.id]||[]).forEach(i=>d.push(o.choices[i].label)); }
  });
  if(u.attachedPerN){ const n=attachedCount(e,u); if(n) d.push(`${n}× ${u.attachedPerN.name} (required)`); }
  if(e.lore){ d.push("Lore: "+e.lore);
    const lore=loreData(e.lore); if(lore && lore.attribute) d.push("Lore Attribute: "+lore.attribute.name); }
  { const ks=knownSpells(e); if(ks.length) d.push("Spells: "+ks.join(", ")); }
  Object.entries(e.magic).forEach(([cat,nm])=>{ if(nm)d.push(nm); });
  (e.gifts||[]).forEach(nm=>d.push(nm));
  (e.powers||[]).forEach(nm=>d.push("Power: "+nm));
  if(e.virtue) d.push("Virtue: "+e.virtue);
  if(e.magicStd) d.push("Standard: "+e.magicStd);
  if(e.runes){ for(const cat in e.runes){ const list=e.runes[cat]; if(list && list.length){
    const g=runeGroup(list); const parts=Object.keys(g).map(n=>g[n]>1?`${n} ×${g[n]}`:n);
    d.push(`${cat}: ${parts.join(", ")}`); } } }
  return d;
}

/* migrate a roster entry saved before a format change:
   - the single "Arcane Items" pick became three slots (Relic/Charm/Staff). */
function migrateEntry(e){
  if(!e) return;
  if(e.gifts==null) e.gifts=[];
  if(e.powers==null) e.powers=[];
  if(e.sigSpells==null) e.sigSpells=[];
  if(e.virtue==null) e.virtue="";
  if(e.runes==null) e.runes={};
  if(e.magic && e.magic["Arcane Items"]){
    const nm=e.magic["Arcane Items"];
    if(nm) e.magic["Arcane Items:"+arcaneType(nm)]=nm;
    delete e.magic["Arcane Items"];
  }
}
