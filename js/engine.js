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
    if(o.requires && !optionAvailable(o)) return;   // conditional option not unlocked
    if(optGodBlocked(e,u,o)) return;                // option barred for this model's god — no cost
    if(optMountBlocked(e,u,o)) return;              // mount-upgrade not unlocked by the chosen mount — no cost
    if(optChoiceBlocked(e,u,o)) return;             // barred by a sibling choice (e.g. sub-species) — no cost
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
    if(o.requires && !optionAvailable(o)) return;
    if(optChoiceBlocked(e,u,o)) return;
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
  const o=(u.options||[]).find(o=>o.id==="align");
  if(o){ const i=e.opts.align; if(i!=null && o.choices[i]) return o.choices[i].god||null; }
  return null;
}
function godOK(it,god){ return !it.god || it.god===god; }
function unitHasTag(u,t){ return Array.isArray(u.tags) && u.tags.includes(t); }
// An option may be barred for certain gods (e.g. Khornate Daemons can't take a
// Wizard upgrade): `noGod:["Khorne"]`. True ⇒ the option is unavailable/ignored.
function optGodBlocked(e,u,o){ return !!(o && o.noGod && o.noGod.includes(entryGod(e,u))); }
// The model's chosen mount (a `mount` option's selected choice), or null.
function mountOptionOf(u){ return (u.options||[]).find(o=>o.type==="mount")||null; }
function selectedMount(e,u){ const o=mountOptionOf(u); if(!o) return null; const i=e.opts.mount; return (i!=null && o.choices[i])?o.choices[i]:null; }
/* ---------- conditional choices (e.g. High Elf Elven Honours) ----------
   A `choice`/`mustChoose` option with id "honour" exposes the chosen label; a
   honour choice may carry `cond:{mounts:[keys…]}` (with "__foot__" = on foot) so
   the picker shows every honour but disables the ones the current mount forbids,
   and a `mount` choice may carry `requiresHonour` so it only unlocks for its
   honour. Generic: `honourCondOK` returns {ok:true} for any choice without cond. */
function honourOption(u){ return (u.options||[]).find(o=>o.id==="honour" && (o.type==="choice"||o.type==="mustChoose"))||null; }
function selectedHonour(e,u){ const o=honourOption(u); if(!o) return null; const i=e.opts[o.id]; return (i!=null && o.choices[i])?o.choices[i].label:null; }
// a mount choice gated by an Honour (`requiresHonour:"Name"|[…]`). True ⇒ not unlocked.
function mountChoiceBlocked(e,u,c){ if(!c||!c.requiresHonour) return false; const want=Array.isArray(c.requiresHonour)?c.requiresHonour:[c.requiresHonour]; return !want.includes(selectedHonour(e,u)); }
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
// a model's Bloodline (VC): a fixed field on the unit entry.
function entryBlood(e,u){ return u.bloodline || null; }
/* ---- equipment access (magic weapon / armour gating) ----
   A magic item that IS a mundane weapon or armour type (e.g. a magic heavy
   armour, a magic great weapon) may only be taken by a model that can use that
   type — i.e. it has it in base equipment or can buy it. Each such item carries
   `requiresAccess:"heavy armour"` (or an array = any-of); each character declares
   the union of types it has/can buy in `access:[…]` (unit-level, optionally
   extended per variant). Items with no `requiresAccess` (a generic magic sword,
   a talisman) are unrestricted. Tokens are matched after normalising through a
   small alias map so "heavy lance"≡"lance", "polearm"≡"halberd", etc. */
const ACCESS_ALIASES={
  "two hand weapons":"additional hand weapon","paired weapons":"additional hand weapon","additional weapon":"additional hand weapon",
  "double-handed weapon":"great weapon","great sword":"great weapon",
  "polearm":"halberd",
  "heavy lance":"lance","light lance":"lance","cavalry spear":"lance",
  "full plate armour":"heavy armour","gromril armour":"heavy armour",
  "gut-plate":"light armour","gut plate":"light armour"   // Ogre Kingdoms base armour ≈ light armour tier
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
// Shields, barding and weapons are matched exactly.
const ARMOUR_RANK={"light armour":1,"medium armour":2,"heavy armour":3};
function hasAccess(e,u,req){
  const acc=modelAccess(e,u);
  let maxArmour=0; acc.forEach(a=>{ if(ARMOUR_RANK[a]>maxArmour) maxArmour=ARMOUR_RANK[a]; });
  return (Array.isArray(req)?req:[req]).map(normAccess).some(r=>
    ARMOUR_RANK[r] ? maxArmour>=ARMOUR_RANK[r] : acc.has(r));
}
// unified magic-item eligibility for a model: variant/keyword restriction (`only`),
// Bloodline list (`blood:[...]`), vampire-only (`vampireOnly`), god (`god`), and
// equipment access (`requiresAccess` — magic weapon/armour must match a usable type).
function itemAllowed(it,e,u){
  if(it.only && !restrictOK(e,u,it.only)) return false;
  if(it.blood && !it.blood.includes(entryBlood(e,u))) return false;
  if(it.vampireOnly && !unitHasTag(u,"Vampire")) return false;
  if(it.god && !godOK(it,entryGod(e,u))) return false;
  if(it.requiresAccess && !hasAccess(e,u,it.requiresAccess)) return false;
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
  // a chosen conditional choice (Elven Honour) whose mount requirement is unmet
  const ho=honourOption(u);
  if(ho && e.opts[ho.id]!=null){ const c=ho.choices[e.opts[ho.id]]; const ce=honourCondOK(e,u,c);
    if(!ce.ok){ const who=u.isCharacter?u.variants[e.variant].name:u.name; errs.push(`${who}: ${c.label} — ${ce.reason}.`); } }
  return errs;
}

function dupCap(limit){
  for(const r of D.duplicateCaps){ if(limit<=r.upTo) return r; }
  return D.duplicateCaps[D.duplicateCaps.length-1];
}

function describe(e,u){
  const d=[];
  (u.options||[]).forEach(o=>{
    if(o.requires && !optionAvailable(o)) return;
    if(optChoiceBlocked(e,u,o)) return;
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
