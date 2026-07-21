/* DOM-stub harness: loads the data files + the inline engine from index.html
   under a minimal DOM stub, then exercises the three new books and the new
   mechanics (Vampiric Powers, Virtues, Undead validators). Run with `node`. */
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "..");   // project root (this script lives in scripts/)

/* ---------- minimal DOM stub ---------- */
class El {
  constructor(tag){ this.tag=tag; this.children=[]; this._text=""; this._html="";
    this.style={}; this.classList={ _s:new Set(), add(){ [...arguments].forEach(a=>this._s.add(a)); },
      remove(){ [...arguments].forEach(a=>this._s.delete(a)); }, contains(a){return this._s.has(a);},
      toggle(a){ this._s.has(a)?this._s.delete(a):this._s.add(a); } };
    this.value=""; this.checked=false; this.selected=false; this.disabled=false; }
  appendChild(c){ this.children.push(c); return c; }
  append(){ [...arguments].forEach(c=>this.children.push(typeof c==="string"?new El("#t"):c)); }
  addEventListener(){}
  removeChild(c){ this.children=this.children.filter(x=>x!==c); }
  setAttribute(){} getAttribute(){return null;}
  querySelector(){return null;} querySelectorAll(){return [];}
  get innerHTML(){ return this._html; } set innerHTML(v){ this._html=v; this.children=[]; }
  get textContent(){ return this._text; } set textContent(v){ this._text=v; }
  get firstChild(){ return this.children[0]||null; }
}
const _byId={};
global.document = {
  getElementById(id){ return _byId[id]||(_byId[id]=new El("#"+id)); },
  createElement(t){ return new El(t); },
  createTextNode(t){ const e=new El("#text"); e._text=t; return e; },
  createComment(){ return new El("#comment"); },
  addEventListener(){}, body:new El("body")
};
global.window = global;
global.alert=(m)=>{ throw new Error("alert: "+m); };
global.confirm=()=>true;
global.navigator={};
global.URL={createObjectURL(){return "";}};
global.Blob=function(){};
global.setTimeout=(f)=>0; global.clearTimeout=()=>{};
document.getElementById("limit").value="2000";

/* ---------- load data, then the engine ---------- */
function load(f){ return fs.readFileSync(path.join(DIR,f),"utf8"); }
[ "data/lores-common.js","data/rules-common.js","data/special-rules-common.js","data/common-items.js",
  "data/chaos-dwarfs.js","data/grand-cathay.js","data/daemons-of-chaos.js","data/beastmen.js",
  "data/ogre-kingdoms.js","data/orcs-and-goblins.js","data/skaven.js","data/high-elves.js","data/dark-elves.js",
  "data/tomb-kings.js","data/vampire-counts.js","data/bretonnia.js" ].forEach(f=>{ (0,eval)(load(f)); });

const html=load("index.html");
const scripts=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const engine=scripts.sort((a,b)=>b.length-a.length)[0];   // the big inline engine
(0,eval)(engine + `
;Object.assign(globalThis,{
  __render:render, __entryPoints:entryPoints, __grand:grandTotal, __cat:catTotal,
  __addUnit:addUnit, __findUnit:findUnit, __spent:spentMagic, __powersCost:powersCost,
  __virtueCost:virtueCost, __virtueRank:virtueRank, __validate:renderValidation,
  __switch:switchArmy, __knownSpells:knownSpells, __wlevel:wizardLevel, __renderSpells:renderSpells,
  __bonusSpells:bonusSpells, __bonusSignatures:bonusSignatures, __windSignatures:windSignatures,
  __getState:()=>state, __setState:(s)=>{state=s;}, __setGen:(u)=>{generalUid=u;},
  __getGen:()=>generalUid, __D:()=>D,
  __rulesToHTML:rulesToHTML, __ruleExact:ruleExact, __ruleDef:ruleDef,
  __openRuleInfo:openRuleInfo, __eqToHTML:eqToHTML, __equipDef:equipDef,
  __openOptionRules:openOptionRules, __mountEntityHTML:mountEntityHTML,
  __openMountPicker:openMountPicker,
  __mkAllInfoBtn:mkAllInfoBtn, __mkRuleInfoBtn:mkRuleInfoBtn, __pk:()=>_pk,
  __honourCondOK:honourCondOK, __selectedHonour:selectedHonour,
  __mountChoiceBlocked:mountChoiceBlocked, __renderOption:renderOption,
  __perNCount:perNCount, __perNMax:perNMax, __optChoiceBlocked:optChoiceBlocked,
  __availableLores:availableLores, __loreNames:loreNames, __itemAllowed:itemAllowed,
  __modelAccess:modelAccess, __hasAccess:hasAccess, __findItem:findItem, __pickerGroups:pickerGroups
});`);

/* ---------- helpers ---------- */
let fails=0, checks=0;
function ok(cond,msg){ checks++; if(!cond){ fails++; console.log("  ✗ "+msg); } }
function approx(a,b){ return Math.abs(a-b)<0.001; }
function validationErrors(){
  __validate();
  const el=document.getElementById("validation");
  return (el.innerHTML.match(/✕[^<]*/g)||[]).map(s=>s.replace(/^✕\s*/,""));
}

/* =================== smoke test: render every book =================== */
console.log("Smoke: render() once per book, add one unit of every type…");
const books=Object.keys(ARMY_BOOKS);
books.forEach(id=>{
  try{
    __setState([]); __setGen(null); __switch(id,false);
    const D=__D(); let added=0;
    ["characters","core","special","rare"].forEach(cat=>{
      (D.units[cat]||[]).forEach(u=>{ __addUnit(cat,u.id); added++; });
    });
    __render(); __validate();
    // every entry must produce a finite point value
    const bad=__getState().filter(e=>!isFinite(__entryPoints(e)));
    ok(bad.length===0, `${id}: ${bad.length} entr(y/ies) with non-finite points`);
    ok(added>0, `${id}: has units`);
  }catch(err){ fails++; console.log(`  ✗ ${id} threw: ${err.message}\n${err.stack.split("\n").slice(0,3).join("\n")}`); }
});

/* =================== Tomb Kings: Hierophant requirement =================== */
console.log("Tomb Kings: Lore-of-Nehekhara (Hierophant) requirement…");
__setState([]); __setGen(null); __switch("tomb-kings",false);
{
  const lp=__D().units.characters.find(u=>/liche priest/i.test(u.name));
  __addUnit("characters", lp.id);
  let e=__getState()[0]; __setGen(e.uid);
  let errs=validationErrors();
  ok(errs.some(m=>/Nehekhara/i.test(m)), "TK: missing-Hierophant error before lore chosen");
  e.lore="Nehekhara"; e.variant=0;
  errs=validationErrors();
  ok(!errs.some(m=>/Nehekhara/i.test(m)), "TK: requirement satisfied once a Nehekhara wizard is present");
}

/* =================== Vampire Counts: powers share budget =================== */
console.log("Vampire Counts: Vampiric Powers share the magic-item budget…");
__setState([]); __setGen(null); __switch("vampire-counts",false);
{
  const D=__D();
  ok(Array.isArray(D.vampiricPowers)&&D.vampiricPowers.length>0,"VC: vampiricPowers catalog present");
  const vc=D.units.characters.find(u=>u.tags&&u.tags.includes("Vampire")&&u.bloodline);
  __addUnit("characters", vc.id);
  let e=__getState()[0]; __setGen(e.uid);
  const base=__entryPoints(e);
  // pick a power legal for this bloodline
  const pw=D.vampiricPowers.find(p=>!p.blood||p.blood.includes(vc.bloodline));
  e.powers=[pw.name];
  ok(approx(__entryPoints(e), base+pw.cost), `VC: power adds its cost to entry points (+${pw.cost})`);
  ok(approx(__spent(e), pw.cost), "VC: power counted in spentMagic (budget)");
  // requireWizardLore: a bloodline vampire that is not a necromancy wizard => error
  let errs=validationErrors();
  ok(errs.some(m=>/Necromancy/i.test(m)), "VC: missing-Necromancy-wizard error when no caster");
}

/* =================== Bretonnia: virtue duplicate escalation =================== */
console.log("Bretonnia: Virtue duplicate-cost escalation (×N)…");
__setState([]); __setGen(null); __switch("bretonnia",false);
{
  const D=__D();
  ok(Array.isArray(D.virtues)&&D.virtues.length>0,"BRET: virtues catalog present");
  const lord=D.units.characters.find(u=>u.virtueEligible);
  __addUnit("characters", lord.id);
  __addUnit("characters", lord.id);
  const st=__getState(); __setGen(st[0].uid);
  const v=D.virtues[0];
  st[0].virtue=v.name; st[1].virtue=v.name;
  ok(__virtueRank(st[0])===1 && __virtueRank(st[1])===2, "BRET: duplicate ranks are 1 then 2");
  ok(approx(__virtueCost(st[0]), v.cost) && approx(__virtueCost(st[1]), v.cost*2),
     `BRET: 1st virtue ${v.cost}, 2nd ${v.cost*2} (×2)`);
  // a single virtue counts toward the model's budget at base cost
  const before=__entryPoints(st[0]);
  ok(before>=v.cost, "BRET: first virtue cost applied");
}

/* =================== points sanity vs known data =================== */
console.log("Points: per-model maths sanity…");
[["tomb-kings"],["vampire-counts"],["bretonnia"]].forEach(([id])=>{
  __setState([]); __setGen(null); __switch(id,false);
  const D=__D();
  const u=(D.units.core||[]).find(x=>x.perModel && x.unitSize);
  if(u){ __addUnit("core",u.id); const e=__getState()[0];
    ok(approx(__entryPoints(e), u.basePoints*e.count), `${id}: ${u.name} base ${u.basePoints}×${e.count}`);
  }
});

/* =================== clickable special rules =================== */
console.log("Special rules: core rulebook rules resolve and render clickable…");
{
  ok(window.COMMON_SPECIAL_RULES && typeof window.COMMON_SPECIAL_RULES==="object",
     "COMMON_SPECIAL_RULES loaded");
  // a representative set of universal special rules must have definitions
  ["Frenzy","Hatred","Stubborn","Fear","Terror","Unbreakable","Fast Cavalry",
   "Vanguard","Skirmishers","Fly","Magic Resistance","Impact Hits"].forEach(n=>{
    ok(!!__ruleExact(n), `defined: ${n}`);
  });
  __setState([]); __setGen(null); __switch("chaos-dwarfs",false);
  // Zealots: "Contempt, Frenzy, Hatred, Relentless, Resolute, Vanguard"
  const h=__rulesToHTML("Contempt, Frenzy, Hatred, Relentless, Resolute, Vanguard");
  ok(/class="ruleword"[^>]*>Frenzy</.test(h), "rulesToHTML: Frenzy is clickable");
  ok(/class="ruleword"[^>]*>Vanguard</.test(h), "rulesToHTML: Vanguard is clickable");
  // parenthetical value stripped for lookup, kept in display
  const h2=__rulesToHTML("Fly (8), Natural Armour (6+)");
  ok(/class="ruleword"[^>]*>Fly \(8\)</.test(h2), "rulesToHTML: 'Fly (8)' clickable, value kept");
  ok(/class="ruleword"[^>]*>Natural Armour \(6\+\)</.test(h2), "rulesToHTML: 'Natural Armour (6+)' clickable");
  // free text stays plain (not wrapped)
  const h3=__rulesToHTML("May buy Flaming Breath / Bloodrage");
  ok(!/ruleword/.test(h3), "rulesToHTML: non-rule free text stays plain");
  // clicking a rule opens the SECOND (stacked) window, leaving the main one intact
  document.getElementById("modalBg").classList.add("open");          // main detail open
  __openRuleInfo("Frenzy");
  ok(document.getElementById("modal2Bg").classList.contains("open"), "rule opens the second window");
  ok(document.getElementById("modalBg").classList.contains("open"), "main detail window stays open underneath");
  ok(/\+1 Attack/.test(document.getElementById("modal2Body").innerHTML), "second window shows the rule text");
}

/* =================== equipment: verbatim values + clickable =================== */
console.log("Equipment: verbatim rulebook values resolve and render clickable…");
{
  const R=window.COMMON_RULES;
  ok(R && typeof R==="object", "COMMON_RULES loaded");
  // verbatim spot-checks against the rulebook (pp.79-81)
  ok(/12\/24"/.test(R["Handgun"]) && /Strength:\*\* 5/.test(R["Handgun"]), "Handgun: 12/24\", S5 (verbatim)");
  ok(/15\/30"/.test(R["Sling"]) && /Armour Piercing \(1\)/.test(R["Sling"]), "Sling: 15/30\", Armour Piercing (1)");
  ok(/6\/12"/.test(R["Pistol"]) && /Strength:\*\* 5/.test(R["Pistol"]), "Pistol: 6/12\", S5");
  ok(/28\/42"/.test(R["Greatbow"]), "Greatbow defined: 28/42\"");
  ok(/Multiple Shots \(3\), Poisoned Attacks/.test(R["Blowpipe"]), "Blowpipe defined");
  ok(/\+2\/5\+/.test(R["Medium Armour"]), "Medium Armour: +2/5+");
  ok(/\+1 to its combat result/.test(R["Standard Bearer"]), "Standard Bearer verbatim");
  // resolution: free-form labels normalise onto the canonical keys
  ok(__equipDef("medium armour").name==="Medium Armour", "equipDef: 'medium armour' -> Medium Armour");
  ok(__equipDef("Two hand weapons").name==="Additional Hand Weapons", "equipDef: 'Two hand weapons'");
  ok(__equipDef("shortbow").name==="Shortbow", "equipDef: 'shortbow'");
  ok(__equipDef("heavy lance").name==="Heavy Lance", "equipDef: 'heavy lance' -> Heavy Lance");
  // Equipment line renders clickable, value kept, free text stays plain
  const e=__eqToHTML("Hand weapon, medium armour; one weapon team");
  ok(/class="ruleword"[^>]*>Hand weapon</.test(e), "eqToHTML: 'Hand weapon' clickable");
  ok(/class="ruleword"[^>]*>medium armour</.test(e), "eqToHTML: 'medium armour' clickable");
  ok(!/ruleword[^>]*>one weapon team/.test(e), "eqToHTML: 'one weapon team' stays plain");
  const e2=__eqToHTML("light armour (Handlers)");
  ok(/class="ruleword"[^>]*>light armour \(Handlers\)</.test(e2), "eqToHTML: parenthetical kept in display");
  // 'Fixed items: ...' free text must not be falsely wrapped
  const e3=__eqToHTML("Fixed items: Black Hammer of Hashut, Stone Mantle");
  ok(!/ruleword/.test(e3), "eqToHTML: magic-item free text stays plain");
  // NAMED magic items embedded in eq must NOT be mis-linked to a generic weapon/armour
  ok(__equipDef("Bow of Avelorn")===null, "equipDef: 'Bow of Avelorn' not matched to Bow");
  ok(__equipDef("Star Lance")===null, "equipDef: 'Star Lance' not matched to a lance");
  ok(__equipDef("The Lion's Shield")===null, "equipDef: \"The Lion's Shield\" not matched to Shield");
  ok(__equipDef("Morning Star of Fracasse")===null, "equipDef: 'Morning Star of Fracasse' not matched");
  const e4=__eqToHTML("Hand weapon, Bow of Avelorn, light armour");
  ok(/class="ruleword"[^>]*>Hand weapon</.test(e4) && /class="ruleword"[^>]*>light armour</.test(e4),
     "eqToHTML: base items clickable alongside a named item");
  ok(!/ruleword[^>]*>Bow of Avelorn/.test(e4), "eqToHTML: 'Bow of Avelorn' not force-matched to generic Bow (no glossary entry in this book)");
  // a genuine plain 'bow' (Tomb Kings / Grand Cathay) is the rulebook Longbow
  ok(__equipDef("bow").name==="Longbow", "equipDef: plain 'bow' -> Longbow");
  ok(!window.COMMON_RULES["Bow"], "COMMON_RULES: generic 'Bow' entry removed");
  const e5=__eqToHTML("Light lance, bow, light armour");
  ok(/class="ruleword"[^>]*>bow</.test(e5) && /class="ruleword"[^>]*>Light lance</.test(e5),
     "eqToHTML: plain 'bow' and 'Light lance' clickable");
  // the unjustified generic entries were removed
  ok(!window.COMMON_RULES["Lance"] && !window.COMMON_RULES["Morning Star"],
     "COMMON_RULES: generic Lance / Morning Star removed");
}

/* =================== artillery / war-machine weapon profiles =================== */
console.log("Artillery: war-machine weapon profiles resolve and render clickable…");
{
  const R=window.COMMON_RULES;
  // generic rulebook profiles added to COMMON_RULES
  ok(/32\/48"/.test(R["Bolt Thrower"]) && /Strength:\*\* 6/.test(R["Bolt Thrower"]), "Bolt Thrower: 32/48\", S6");
  ok(/Multiple Shots \(6\)/.test(R["Repeater Bolt Thrower"]), "Repeater Bolt Thrower defined");
  ok(/12-60"/.test(R["Cannon"]) && /Multiple Wounds \(D6\/D3\)/.test(R["Cannon"]), "Cannon: 12-60\", MW (D6/D3)");
  ok(/12-48"/.test(R["Stone Thrower"]) && /4\(8\)/.test(R["Stone Thrower"]), "Stone Thrower: 12-48\", S4(8)");
  ok(/Artillery Dice \+ 3D6/.test(R["Organ Gun"]), "Organ Gun defined");
  // generic tokens resolve case-insensitively via the aliases
  ok(__equipDef("bolt thrower").name==="Bolt Thrower", "equipDef: 'bolt thrower' -> Bolt Thrower");
  ok(__equipDef("repeater bolt thrower").name==="Repeater Bolt Thrower", "equipDef: 'repeater bolt thrower'");
  ok(__equipDef("stone thrower").name==="Stone Thrower", "equipDef: 'stone thrower' -> Stone Thrower");
  // a book-specific profile (lower-case eq token -> capitalised glossary key) resolves and overrides
  __switch("chaos-dwarfs",false);
  ok(__equipDef("magma cannon").name==="Magma Cannon", "equipDef: CD 'magma cannon' -> glossary Magma Cannon");
  ok(/12-60"/.test(__equipDef("doomfire").text), "equipDef: CD 'doomfire' profile present");
  ok(!/following profile:\s*$/.test(window.ARMY_BOOKS["chaos-dwarfs"].glossary["Siege Cannons"]) &&
     /24\/48"/.test(window.ARMY_BOOKS["chaos-dwarfs"].glossary["Siege Cannons"]), "CD Siege Cannons no longer truncated");
  __switch("skaven",false);
  ok(/18\/36"/.test(__equipDef("Warplock Jezzail").text), "equipDef: Skaven 'Warplock Jezzail' profile");
  ok(__equipDef("warp lightning cannon").name==="Warp Lightning Cannon", "equipDef: Skaven 'warp lightning cannon'");
  __switch("ogre-kingdoms",false);
  ok(__equipDef("Cannon of the Sky-titans").name==="Cannon of the Sky-titans", "equipDef: Ogre 'Cannon of the Sky-titans'");
  ok(__equipDef("chaintrap").name==="Chaintrap" && __equipDef("harpoon launcher").name==="Harpoon Launcher",
     "equipDef: Ogre Ice Mammoth chaintrap + harpoon launcher both resolve");
  // every artillery token in every book's eq lines resolves to a profile
  let unresolved=[];
  for(const id in window.ARMY_BOOKS){ __switch(id,false); const B=window.ARMY_BOOKS[id]; const ui=B.unitInfo||{};
    for(const uid in ui){ (ui[uid].eq||"").split(/[,;.]/).forEach(t=>{
      const base=t.trim().replace(/\s*\([^)]*\)\s*$/,"").trim();
      if(!base || !/cannon|mortar|rocket|catapult|bolt thrower|stone thrower|organ gun|launcher|cannonade|doomfire|bazuka|leadbelcher|skewer|chaintrap|harpoon|warpfire|ratling|jezzail|wind bow|crane gun|trebuchet|harvester|fireglaive/i.test(base)) return;
      const def=__equipDef(t.trim())||__equipDef(base);
      if(!def || !/range|strength/i.test(def.text)) unresolved.push(id+"/"+uid+":"+base);
    }); } }
  ok(unresolved.length===0, "every artillery eq token resolves to a profile"+(unresolved.length?" (missing: "+unresolved.join(", ")+")":""));
}

/* =================== spells: modal multi-pick picker =================== */
console.log("Spells: render via the modal picker (no inline checkbox list)…");
{
  __setState([]); __setGen(null); __switch("chaos-dwarfs",false);
  __addUnit("characters","sorcerers");
  const e=__getState()[0]; e.lore="Fire"; e.spells=[];
  const box=__renderSpells(e, __findUnit("characters","sorcerers"));
  // the DOM stub keeps appended children in a .children array (not serialised
  // HTML), so flatten the tree and inspect nodes directly.
  const nodes=[]; (function walk(n){ nodes.push(n); (n.children||[]).forEach(walk); })(box);
  const hasPickBtn=nodes.some(n=>typeof n.className==="string" && /pickbtn/.test(n.className));
  const hasAlwaysKnown=nodes.some(n=>/Always known/.test(n._html||"") || /Always known/.test(n._text||""));
  const hasCheckbox=nodes.some(n=>n.tag==="input");
  ok(hasPickBtn, "spell box uses a Choose… pick button (modal picker)");
  ok(hasAlwaysKnown, "spell box lists always-known signature/attribute read-only");
  ok(!hasCheckbox, "spell box has no inline checkbox <input> list anymore");
  // spell cap = wizardLevel (no longer +1); header reflects it
  const u=__findUnit("characters","sorcerers");
  const lvl=__wlevel(e,u);
  const headTxt=nodes.map(n=>n._html||"").join(" ");
  ok(/wizard level/.test(headTxt), "header phrases the cap as 'wizard level' (not level + 1)");
  ok(new RegExp(`choose ${lvl} more`).test(headTxt), `cap equals the wizard level (${lvl})`);
  ok(__bonusSpells(e)===0, "no extra-spell items ⇒ bonusSpells 0");
  // Spell Familiar grants one more spell choice
  e.magic={"Arcane Items:Relic":"Spell Familiar"};
  ok(__bonusSpells(e)===1, "Spell Familiar (extraSpells:1) adds one spell pick");
  const box2=__renderSpells(e,u);
  const nodes2=[]; (function walk(n){ nodes2.push(n); (n.children||[]).forEach(walk); })(box2);
  const head2=nodes2.map(n=>n._html||"").join(" ");
  ok(new RegExp(`choose ${lvl+1} more`).test(head2), "cap rises by 1 with Spell Familiar");
  ok(/from items/.test(head2), "header notes the item-granted bonus");
  e.magic={};
  // Arcane Familiar: separate signature-spell pool from the 8 Winds
  ok(__windSignatures().length===8, "windSignatures() returns 8 Winds' signatures");
  e.magic={"Arcane Items:Relic":"Arcane Familiar"};
  ok(__bonusSignatures(e)===1, "Arcane Familiar (extraSignatures:1) grants one signature pick");
  ok(__bonusSpells(e)===0, "Arcane Familiar does NOT change the main lore cap");
  const box3=__renderSpells(e,u);
  const nodes3=[]; (function walk(n){ nodes3.push(n); (n.children||[]).forEach(walk); })(box3);
  const head3=nodes3.map(n=>n._html||"").join(" ");
  ok(/Additional signature spell/.test(head3), "renders the Arcane Familiar signature picker");
  ok(/eight Winds of Magic/.test(head3), "signature picker names the 8 Winds");
  // a chosen signature is exported via knownSpells, trimmed to the item bonus
  e.sigSpells=["Fireball"]; e.lore="Metal"; e.spells=[];
  ok(__knownSpells(e).includes("Fireball"), "chosen wind-signature is a known spell");
  e.magic={};   // drop the item → the extra signature no longer counts
  ok(!__knownSpells(e).includes("Fireball"), "removing Arcane Familiar drops its signature from known spells");
  e.sigSpells=[]; e.lore="Fire";
}

/* =================== dropdown 'all options' info window =================== */
console.log("Dropdown info: shows every option's rule, marks selected, notes no-rule…");
{
  __setState([]); __setGen(null); __switch("chaos-dwarfs",false);
  const body=document.getElementById("modal2Body");
  // an equipment choice: two real weapons + a no-rule option, second selected
  const choices=[{label:"Great weapon",cost:2},{label:"Halberd"},{label:"Extra crew",cost:5}];
  __openOptionRules("Weapon", choices, choices[1]);
  let h=body.innerHTML;
  ok(/Great weapon/.test(h) && /Halberd/.test(h) && /Extra crew/.test(h), "lists every option");
  ok(/A model with a great weapon suffers -2 Initiative/.test(h), "expands the rule text verbatim");
  ok(/Halberd[\s\S]*?— selected/.test(h), "marks the selected option");
  ok(/No separate rule text/.test(h), "no-rule option is listed with a note");
  ok(document.getElementById("modal2Bg").classList.contains("open"), "opens in the stacked window");

  // mounts: each rendered as a COMPACT entity (profile + CLICKABLE rules, not expanded)
  __switch("chaos-dwarfs",false);
  const taurus={label:"Great Taurus",cost:235};
  const ent=__mountEntityHTML(taurus);
  ok(/<table class="prof">/.test(ent), "mountEntityHTML: profile table present");
  ok(/class="ruleword"[^>]*>Fly \(8\)</.test(ent), "mountEntityHTML: 'Fly (8)' is clickable (compact, not expanded)");
  ok(!/Flying models follow the rules for Swiftstride/.test(ent), "mountEntityHTML: rule text NOT dumped inline");
  // mount picker now reuses the SAME magic-item picker (single-select)
  __setState([]); __setGen(null); __switch("chaos-dwarfs",false);
  const sp=__D().units.characters.find(uu=>(uu.options||[]).some(o=>o.type==="mount"));
  __addUnit("characters", sp.id);
  const me=__getState()[0]; const mo=sp.options.find(o=>o.type==="mount");
  __openMountPicker(me, sp, mo);
  ok(document.getElementById("modalBg").classList.contains("open"), "mount picker opens (shared item picker)");
  const pk=__pk();
  ok(pk && pk.multi===false, "mount picker is single-select like magic items");
  ok(pk.groups[0].items.length>=2 && pk.groups[0].items.every(it=>/<table class="prof">/.test(it.html||"")),
     "mounts listed as rich entity rows (profile + clickable rules)");
  // confirming a tick sets the mount; an empty selection clears it
  const pick=pk.groups[0].items.find(x=>/Lammasu/.test(x.name)) || pk.groups[0].items[1];
  pk.onConfirm([pick.name]);
  ok(mo.choices[me.opts.mount] && mo.choices[me.opts.mount].label===pick.name, "tick + OK sets the chosen mount");
  pk.onConfirm([]);
  ok(me.opts.mount===null, "nothing ticked ⇒ no mount");

  // UI distinction: "all options" button vs single/chosen "i"
  const allb=__mkAllInfoBtn("Rules for all options", ()=>{});
  const oneb=__mkRuleInfoBtn("Hand Weapon");
  ok(allb.className==="info list" && allb.textContent==="≣", "all-options button: distinct list glyph/class");
  ok(oneb.className==="info" && oneb.textContent==="i", "single/chosen button: plain italic 'i'");
}

/* ====== multi-select UPGRADE options (picker variant) keep opts + points ====== */
console.log("Multi upgrades: opts array + point maths intact (K'daai Destroyer)…");
__setState([]); __setGen(null); __switch("chaos-dwarfs",false);
{
  const u=__D().units.rare.find(x=>x.id==="kdaaidestroyer");
  __addUnit("rare", u.id);
  const e=__getState()[0];
  const opt=u.options.find(o=>o.type==="multi");
  ok(!!opt && !opt.repeatable, "K'daai: has a non-repeatable multi upgrade option");
  e.opts[opt.id]=[0,1];                                   // Gore Blades (+10) + Dark Colossus (+20)
  ok(__entryPoints(e)===u.basePoints+30, "K'daai: two upgrades add their cost (265+30)");
  // each upgrade choice resolves to a rule definition (so the picker shows text)
  const undef=opt.choices.filter(c=>!ruleDef(c.label));
  ok(undef.length===0, `K'daai: every upgrade has rule text (${undef.map(c=>c.label).join(", ")||"all defined"})`);
}

/* ====== single-select choice now renders as a picker (no <select>) ====== */
console.log("Choice/mustChoose render as a picker, not a dropdown…");
__setState([]); __setGen(null); __switch("chaos-dwarfs",false);
{
  let found=null;
  for(const cat of ["characters","core","special","rare"]){
    for(const u of (__D().units[cat]||[])){
      const o=(u.options||[]).find(o=>o.type==="choice"||o.type==="mustChoose");
      if(o){ found={cat,u,o}; break; } }
    if(found) break;
  }
  ok(!!found, "found a choice/mustChoose option to test");
  __addUnit(found.cat, found.u.id);
  const e=__getState()[__getState().length-1];
  const row=renderOption(e, found.o, found.u);
  const flat=[]; (function walk(n){ (n.children||[]).forEach(c=>{ flat.push(c); walk(c); }); })(row);
  ok(!flat.some(c=>c.tag==="select"), "choice: no <select> element rendered");
  ok(flat.some(c=>c.tag==="button" && (c.className||"").indexOf("pickbtn")>=0), "choice: renders a Choose… pickbtn");
}

/* ====== a run of 3+ plain toggles auto-groups into one Upgrades picker ====== */
console.log("Plain-toggle run (Kolossus) auto-groups + keeps points…");
__setState([]); __setGen(null); __switch("chaos-dwarfs",false);
{
  const kol=__D().units.rare.find(x=>x.id==="kolossus");
  const plain=(kol.options||[]).filter(isPlainToggle);
  ok(plain.length>=3, `Kolossus: ${plain.length} plain toggles (>=3 -> grouped)`);
  __addUnit("rare", kol.id);
  const e=__getState()[__getState().length-1];
  e.opts.greed=true; e.opts.overdrive=true;                 // +10 +20
  ok(__entryPoints(e)===kol.basePoints+30, "Kolossus: grouped toggles still sum points (250+30)");
  const body=document.createElement("div"); renderOptions(e, kol, body);
  const flat=[]; (function walk(n){ (n.children||[]).forEach(c=>{ flat.push(c); walk(c); }); })(body);
  ok(flat.some(c=>c.tag==="button" && (c.className||"").indexOf("pickbtn")>=0), "Kolossus: grouped upgrades render a pickbtn");
}

/* ====== High Elves: Elven Honours — readable + conditional on mount ====== */
console.log("High Elves: Elven Honours rule text + mount-conditional availability…");
__setState([]); __setGen(null); __switch("high-elves",false);
{
  const D=__D();
  const cmd=D.units.characters.find(u=>u.id==="commanders");
  const ho=(cmd.options||[]).find(o=>o.id==="honour");
  const mo=(cmd.options||[]).find(o=>o.type==="mount");
  const honour=(nm)=>ho.choices.find(c=>c.label===nm);
  const mIdx=(key)=>mo.choices.findIndex(c=>c.key===key);
  // every honour resolves to readable rule text in the glossary
  ok(ho.choices.every(c=>__ruleDef(c.label)), "HE: every Elven Honour has glossary rule text");
  // Mages must NOT carry an honour option any more (book-accurate: Commanders only)
  const mage=D.units.characters.find(u=>u.id==="mages");
  ok(!(mage.options||[]).some(o=>o.id==="honour"), "HE: Mages have no honour option");
  __addUnit("characters", cmd.id);
  const e=__getState()[0]; e.variant=0;                 // Prince
  // on foot: foot-only honours OK, mount-required honours blocked
  e.opts.mount=null;
  ok(__honourCondOK(e,cmd,honour("Bladelord")).ok, "HE: Bladelord OK on foot");
  ok(!__honourCondOK(e,cmd,honour("Ellyrian Outrider")).ok, "HE: Ellyrian Outrider blocked on foot");
  ok(!__honourCondOK(e,cmd,honour("Blood of Caledor")).ok, "HE: Blood of Caledor blocked on foot");
  ok(__honourCondOK(e,cmd,honour("Pure of Heart")).ok, "HE: Pure of Heart always OK");
  // mounted on Elven Steed: steed honours OK, foot-only honours blocked
  e.opts.mount=mIdx("steed");
  ok(__honourCondOK(e,cmd,honour("Ellyrian Outrider")).ok, "HE: Ellyrian Outrider OK on steed");
  ok(__honourCondOK(e,cmd,honour("Blood of Caledor")).ok, "HE: Blood of Caledor OK on steed");
  ok(!__honourCondOK(e,cmd,honour("Bladelord")).ok, "HE: Bladelord blocked when mounted");
  // honour-gated mounts: Flamespyre Phoenix only unlocks for Anointed of Asuryan
  e.opts.mount=null; e.opts.honour=null;
  const fIdx=mIdx("flamespyre");
  ok(__mountChoiceBlocked(e,cmd,mo.choices[fIdx]), "HE: Flamespyre Phoenix blocked without honour");
  e.opts.honour=ho.choices.findIndex(c=>c.label==="Anointed of Asuryan");
  ok(!__mountChoiceBlocked(e,cmd,mo.choices[fIdx]), "HE: Flamespyre Phoenix unlocked by Anointed of Asuryan");
  // selecting Flamespyre then charges its points; foot honour Anointed stays valid
  e.opts.mount=fIdx;
  ok(__honourCondOK(e,cmd,honour("Anointed of Asuryan")).ok, "HE: Anointed valid on Flamespyre Phoenix");
  ok(__entryPoints(e)===cmd.variants[0].points+50+200, "HE: Prince + Anointed(50) + Flamespyre(200) points");
  // deselect the honour → reconcile drops the now-illegal mount, no phantom cost
  e.opts.honour=null; __render();
  ok(e.opts.mount==null, "HE: reconcile clears Flamespyre when its honour is removed");
}

/* ====== Audited books: newly-added unique upgrade / special-rule text resolves ====== */
console.log("Audited books (TK / VC / Bret): added rule text resolves via ruleDef…");
[["tomb-kings", ["Aspect of Asaph","Vortex of Souls","Khemric Titan Special Attacks","Master Stone Shaper","Settra's Champion","Hieroglyphs of Protection"]],
 ["vampire-counts", ["Battle of Wills","Necrofex Colossus Special Attacks","Evocation of Death","Drakenhof Guard","The Carrion King","Pronounce Judgement","Til Death Do Us Part"]],
 ["bretonnia", ["Bloodrage","Swooping Strike","Supreme Aura of the Lady","Valorous Ballads","The Wyrm Slayer","Jules the Jester","Blessing of the Lady","Lance Formation","Virtue of Purity"]]
].forEach(([id,names])=>{
  __setState([]); __setGen(null); __switch(id,false);
  names.forEach(nm=>{ const d=__ruleDef(nm); ok(d && d.text && d.text.length>5, `${id}: "${nm}" resolves to rule text`); });
});

/* ====== Orcs & Goblins: perN (unit-size) upgrades + sub-species gating ====== */
console.log("Orcs & Goblins: Goblin Gitz perN upgrades + sub-species gating…");
{
  __setState([]); __setGen(null); __switch("orcs-and-goblins",false);
  const u=__findUnit("core","goblingitz");
  __addUnit("core","goblingitz");
  const e=__getState()[0];
  const skulker=u.options.find(o=>o.id==="skulker"),
        netter =u.options.find(o=>o.id==="netter"),
        fanatic=u.options.find(o=>o.id==="fanatic");
  const base=u.basePoints*e.count;                      // 2 * 20 = 40
  ok(e.count===20, "O&G: Goblin Gitz default size 20");
  // Common Goblin (no sub-species): Nasty Skulker allowed, Netter/Fanatic blocked
  ok(!__optChoiceBlocked(e,u,skulker), "O&G: Nasty Skulker allowed for Common Goblin");
  ok(__optChoiceBlocked(e,u,netter),  "O&G: Netter blocked for Common Goblin");
  ok(__optChoiceBlocked(e,u,fanatic), "O&G: Fanatic blocked for Common Goblin");
  ok(__perNMax(e,skulker)===2, "O&G: Nasty Skulker max = floor(20/10) = 2");
  e.opts.skulker=2; ok(__entryPoints(e)===base+2*6, "O&G: 2 Nasty Skulkers = +12 pts");
  e.opts.skulker=5; ok(__perNCount(e,skulker)===2 && __entryPoints(e)===base+2*6, "O&G: perN clamps to the size cap");
  // switch to Night Goblin: Netter/Fanatic unlock, Nasty Skulker resets to 0 on reconcile
  const sub=u.options.find(o=>o.id==="subspecies");
  e.opts.subspecies=sub.choices.findIndex(c=>c.label==="Night Goblin");
  __render();
  ok(e.opts.skulker===0, "O&G: Nasty Skulker reset when sub-species switches to Night Goblin");
  ok(!__optChoiceBlocked(e,u,netter) && !__optChoiceBlocked(e,u,fanatic), "O&G: Netter/Fanatic unlocked for Night Goblin");
  e.opts.fanatic=2; e.opts.netter=4;                    // floor(20/10)=2, floor(20/5)=4
  ok(__entryPoints(e)===base+2*25+4*2, "O&G: 2 Fanatics(+50) + 4 Netters(+8)");
  // shrink the unit → perN counters clamp down on reconcile
  e.count=10; __render();
  ok(__perNCount(e,fanatic)===1 && __perNCount(e,netter)===2, "O&G: perN counters clamp when the unit shrinks");
  ok(__entryPoints(e)===u.basePoints*10+1*25+2*2, "O&G: points follow the clamped counters");
  // the standalone Fanatics core unit was removed (upgrade-only per the book)
  ok(!__findUnit("core","fanatics"), "O&G: no illegal standalone Fanatics core unit");
  // Squig Herd: one Herder (8 pts) auto-costed for every five Cave Squigs
  __setState([]); __addUnit("special","squigherd");
  const sh=__getState()[0], shu=__findUnit("special","squigherd");
  ok(sh.count===10, "O&G: Squig Herd default 10 Cave Squigs");
  ok(__entryPoints(sh)===10*7+2*8, "O&G: 10 Squigs + 2 required Herders = 86 pts");
  sh.count=17; __render();
  ok(__entryPoints(sh)===17*7+3*8, "O&G: 17 Squigs → 3 Herders (floor 17/5) = 143 pts");
  // newly-added rule / fixed-item text resolves through the real resolvers
  ["Fanatics","Surprise!","Imbued with Life","Power of da Great Green God","Ker-splat!","Grom's Waaagh!"]
    .forEach(nm=>ok(__ruleDef(nm)&&__ruleDef(nm).text.length>5, `O&G: rule "${nm}" resolves`));
  ["Gitsnik","Morglor the Mangler","Malfunctioning Leystone","Da Moon Onna Stikk"]
    .forEach(nm=>ok(__equipDef(nm), `O&G: fixed item "${nm}" is clickable in equipment`));
}

/* =================== Conditional lores (gated on sub-species / toggle) =================== */
console.log("Conditional lores: Goblin Shaman Bad Moon/Spider God gate on sub-species; Orc Shaman Savage Waaagh on toggle…");
{
  __setState([]); __setGen(null); __switch("orcs-and-goblins",false);
  const gs=__findUnit("characters","goblinshamans");
  __addUnit("characters","goblinshamans");
  const e=__getState()[0]; __setGen(e.uid); e.variant=0;      // Oddnob (wizard)
  const sub=gs.options.find(o=>o.id==="subspecies");
  // default (no sub-species): only Little Waaagh! available
  e.opts.subspecies=null;
  let av=__availableLores(e,gs);
  ok(av.length===1 && av[0]==="Little Waaagh!", "Goblin Shaman: only Little Waaagh! without a sub-species");
  ok(!av.includes("Bad Moon"), "Goblin Shaman: Bad Moon hidden until Night Goblin");
  // pick Night Goblin → Bad Moon unlocks, Spider God still hidden
  e.opts.subspecies=sub.choices.findIndex(c=>/Night Goblin/.test(c.label));
  av=__availableLores(e,gs);
  ok(av.includes("Bad Moon") && !av.includes("Spider God"), "Goblin Shaman: Night Goblin unlocks Bad Moon only");
  // Forest Goblin → Spider God unlocks, Bad Moon hidden
  e.opts.subspecies=sub.choices.findIndex(c=>/Forest Goblin/.test(c.label));
  av=__availableLores(e,gs);
  ok(av.includes("Spider God") && !av.includes("Bad Moon"), "Goblin Shaman: Forest Goblin unlocks Spider God only");
  // a stored gated lore is cleared on render when its condition is removed
  e.lore="Spider God"; e.opts.subspecies=null; __render();
  ok(e.lore==="", "Goblin Shaman: chosen Spider God cleared when Forest Goblin removed");
  // Orc Shaman: Savage Waaagh! gated on the Savage Orc toggle
  __setState([]); __setGen(null);
  const os=__findUnit("characters","orcshamans");
  __addUnit("characters","orcshamans");
  const oe=__getState()[0]; oe.variant=0;
  oe.opts.savage=false; let oav=__availableLores(oe,os);
  ok(oav.includes("Big Waaagh!") && !oav.includes("Savage Waaagh!"), "Orc Shaman: Savage Waaagh! hidden without the Savage Orc upgrade");
  oe.opts.savage=true; oav=__availableLores(oe,os);
  ok(oav.includes("Savage Waaagh!"), "Orc Shaman: Savage Orc upgrade unlocks Savage Waaagh!");
}

/* =================== Equipment-access magic-item gating =================== */
console.log("Equipment access: magic weapon/armour hidden unless the model can use that type…");
{
  // Vampire Counts: heavy-armour items require heavy-armour access
  __setState([]); __setGen(null); __switch("vampire-counts",false);
  const D=__D();
  const flayed=__findItem("The Flayed Hauberk");      // Heavy armour
  ok(flayed && flayed.requiresAccess==="heavy armour", "VC: Flayed Hauberk tagged heavy armour");
  // Blood Dragon (heavy armour base) may take it; Necrarch (no armour) may not
  __addUnit("characters","blooddragon"); const bd=__getState()[0];
  ok(__itemAllowed(flayed,bd,__findUnit("characters","blooddragon")), "VC: Blood Dragon (heavy armour) may take Flayed Hauberk");
  ok(__modelAccess(bd,__findUnit("characters","blooddragon")).has("heavy armour"), "VC: Blood Dragon has heavy-armour access from base equipment");
  // Blood Dragon no longer buys heavy armour (base equipment now)
  const bdu=__findUnit("characters","blooddragon");
  ok(!(bdu.options||[]).some(o=>o.id==="ha"), "VC: Blood Dragon heavy-armour toggle removed (base equipment)");
  __setState([]); __addUnit("characters","necrarch"); const nx=__getState()[0];
  ok(!__itemAllowed(flayed,nx,__findUnit("characters","necrarch")), "VC: Necrarch (no armour access) cannot take Flayed Hauberk");
  // the Flayed Hauberk is filtered out of the Necrarch's Magic Armour picker
  const groups=__pickerGroups("Magic Armour", nx, __findUnit("characters","necrarch"), null);
  const names=groups.flatMap(g=>g.items.map(i=>i.name));
  ok(!names.includes("The Flayed Hauberk"), "VC: Flayed Hauberk absent from Necrarch's Magic Armour list");
  // a stored illegal pick is dropped on render
  nx.magic={"Magic Armour":"The Flayed Hauberk"}; __render();
  ok(nx.magic["Magic Armour"]==="", "VC: illegal stored heavy-armour item dropped on render");
  // Orcs & Goblins: shield item needs shield access; great-weapon item needs great-weapon access
  __setState([]); __setGen(null); __switch("orcs-and-goblins",false);
  const ironskin=__findItem("Ironskin Shield");
  ok(ironskin.requiresAccess==="shield", "O&G: Ironskin Shield tagged shield");
  __addUnit("characters","orcbosses"); const ob=__getState()[0];
  ok(__itemAllowed(ironskin,ob,__findUnit("characters","orcbosses")), "O&G: Orc Boss (shield access) may take Ironskin Shield");
  __setState([]); __addUnit("characters","orcshamans"); const osh=__getState()[0];
  ok(!__itemAllowed(ironskin,osh,__findUnit("characters","orcshamans")), "O&G: Orc Shaman (no shield) cannot take Ironskin Shield");
  const bigaxe=__findItem("Bigger, Choppier Axe");   // Great weapon
  ok(!__itemAllowed(bigaxe,osh,__findUnit("characters","orcshamans")), "O&G: Orc Shaman (no great weapon) cannot take Bigger, Choppier Axe");
  ok(__itemAllowed(bigaxe,ob,__findUnit("characters","orcbosses")), "O&G: Orc Boss (great weapon access) may take Bigger, Choppier Axe");
}

/* =================== Daemons: alignment locks the wizard's lore =================== */
console.log("Daemons: Daemon Prince god-lore gated on Daemonic Alignment…");
{
  __setState([]); __setGen(null); __switch("daemons-of-chaos",false);
  const dp=__findUnit("characters","daemonprince");
  __addUnit("characters","daemonprince");
  const e=__getState()[0]; __setGen(e.uid);
  const align=dp.options.find(o=>o.id==="align");
  e.opts.wizlvl=0;   // ensure wizard for lore list (wizLevel via choice); force a level so lores show
  // unaligned: generic lores available, god lores hidden
  e.opts.align=null;
  let av=__availableLores(e,dp);
  ok(av.includes("Death") && av.includes("Shadow"), "Daemons: unaligned Prince sees generic lores");
  ok(!av.includes("Nurgle") && !av.includes("Tzeentch"), "Daemons: unaligned Prince cannot use god lores");
  // aligned Nurgle: ONLY Nurgle lore
  e.opts.align=align.choices.findIndex(c=>c.label==="Daemon of Nurgle");
  av=__availableLores(e,dp);
  ok(av.length===1 && av[0]==="Nurgle", "Daemons: Nurgle-aligned Prince locked to Lore of Nurgle");
  // aligned Tzeentch: ONLY Tzeentch
  e.opts.align=align.choices.findIndex(c=>c.label==="Daemon of Tzeentch");
  av=__availableLores(e,dp);
  ok(av.length===1 && av[0]==="Tzeentch", "Daemons: Tzeentch-aligned Prince locked to Lore of Tzeentch");
}

/* =================== Armour tier: heavier access covers a lighter magic armour =================== */
console.log("Armour tier: a heavy-armour model may take a light/medium magic armour…");
{
  __setState([]); __setGen(null); __switch("orcs-and-goblins",false);
  const ob=__findUnit("characters","orcbosses");   // access includes heavy armour
  __addUnit("characters","orcbosses");
  const e=__getState()[0];
  const gork=__findItem("Armour of Gork");         // medium armour item
  ok(gork.requiresAccess==="medium armour", "O&G: Armour of Gork tagged medium armour");
  ok(__hasAccess(e,ob,"medium armour"), "tier: heavy-armour Orc Boss satisfies a medium-armour requirement");
  ok(__hasAccess(e,ob,"light armour"), "tier: heavy-armour model satisfies a light-armour requirement");
  // a light-only model does NOT satisfy a heavy requirement
  __setState([]); __switch("chaos-dwarfs",false);
  const dsmith=__findUnit("characters","daemonsmith");   // access light/medium only
  __addUnit("characters","daemonsmith"); const de=__getState()[0];
  ok(!__hasAccess(de,dsmith,"heavy armour"), "tier: medium-armour Daemonsmith cannot meet a heavy-armour requirement");
  ok(__hasAccess(de,dsmith,"light armour"), "tier: medium-armour model still meets a light-armour requirement");
}

console.log(`\n${fails? "FAIL":"PASS"}: ${checks-fails}/${checks} checks passed.`);
process.exit(fails?1:0);
