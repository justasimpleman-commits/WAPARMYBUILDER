/* rules.js — rule/equipment glossary lookup and clickable-token HTML. */
/* ---------- single-rule info popup (one weapon / armour / command option) ----------
   Resolve an option label to one rule. EQUIP_REGEX normalises free-form labels
   (e.g. "Additional hand weapon", "Light armour", "shortbow") onto the canonical
   COMMON_RULES / COMMON_SPECIAL_RULES keys. */
const EQUIP_REGEX=[
  [/additional hand weapon|extra hand weapon|two\/?additional|two hand weapons|paired weapon|brace of hand weapons/, "Additional Hand Weapons"],
  [/great\s?weapon/, "Great Weapon"],
  [/halberd|polearm/, "Polearm (Halberd)"],
  [/\bpikes?\b/, "Pike"],
  [/light lance/, "Light Lance"],
  [/heavy lance/, "Heavy Lance"],
  [/\bflails?\b/, "Flail"],
  [/cavalry spear|\bspears?\b/, "Spear"],
  [/\bhand weapons?\b/, "Hand Weapon"],
  [/light armour/, "Light Armour"],
  [/medium armour/, "Medium Armour"],
  [/heavy armour|full plate/, "Heavy Armour"],
  [/buckler/, "Buckler"],
  [/\bshields?\b/, "Shield"],
  [/barding/, "Barding"],
  [/throwing axe/, "Throwing Axes"],
  [/throwing (weapon|knive|knife|spear|star)/, "Throwing Weapons"],
  [/javelin/, "Javelins"],
  [/crossbow/, "Crossbow"],
  [/great\s?bow/, "Greatbow"],
  [/short\s?bow/, "Shortbow"],
  [/long\s?bow/, "Longbow"],
  [/handgun/, "Handgun"],
  [/blunderbuss/, "Blunderbuss"],
  [/blow\s?pipe/, "Blowpipe"],
  [/\bpistol/, "Pistol"],
  [/\bslings?\b/, "Sling"],
  [/\bbows?\b/, "Longbow"],
  [/poisoned attack/, "Poisoned Attacks"],
  [/armour piercing/, "Armour Piercing"],
  [/nat(ural|\.) ?armour/, "Natural Armour"],
  [/regenerat/, "Regeneration"],
  [/killing blow/, "Killing Blow"]
];
function equipRegexHit(l){
  const R=window.COMMON_RULES||{}, SR=window.COMMON_SPECIAL_RULES||{};
  for(const [re,key] of EQUIP_REGEX){ if(re.test(l)){ const t=R[key]||SR[key]; if(t) return {name:key, text:t}; } }
  return null;
}
function ruleDef(label){
  if(!label) return null;
  const ex=ruleExact(label); if(ex) return ex;             // glossary, then SR, then R (exact)
  const hit=equipRegexHit(label.toLowerCase()); if(hit) return hit;
  if(D.glossary){ for(const k in D.glossary){ if(label.toLowerCase().includes(k.toLowerCase())) return {name:k, text:D.glossary[k]}; } }
  return null;
}
/* Equipment-line resolver. The `eq` string mixes base equipment with NAMED magic
   items (e.g. "Bow of Avelorn", "The Lion's Shield", "Star Lance"), so a loose
   substring match would mis-link those to a generic weapon/armour rule. Instead a
   token is only clickable if its whole (paren-stripped, lower-cased) form is an
   exact known equipment phrase. Book `glossary`/COMMON_SPECIAL_RULES exact hits
   still win first. */
const EQUIP_ALIASES={
  "hand weapon":"Hand Weapon","hand weapons":"Hand Weapon",
  "additional hand weapon":"Additional Hand Weapons","additional hand weapons":"Additional Hand Weapons",
  "two hand weapons":"Additional Hand Weapons","two additional hand weapons":"Additional Hand Weapons",
  "pair of hand weapons":"Additional Hand Weapons","brace of hand weapons":"Additional Hand Weapons",
  "great weapon":"Great Weapon","great weapons":"Great Weapon",
  "halberd":"Polearm (Halberd)","halberds":"Polearm (Halberd)","polearm":"Polearm (Halberd)","polearms":"Polearm (Halberd)",
  "pike":"Pike","pikes":"Pike",
  "spear":"Spear","spears":"Spear","cavalry spear":"Spear","cavalry spears":"Spear",
  "flail":"Flail","flails":"Flail",
  "light lance":"Light Lance","light lances":"Light Lance",
  "heavy lance":"Heavy Lance","heavy lances":"Heavy Lance",
  "light armour":"Light Armour","medium armour":"Medium Armour","heavy armour":"Heavy Armour",
  "shield":"Shield","shields":"Shield","buckler":"Buckler","bucklers":"Buckler",
  "barding":"Barding",
  "shortbow":"Shortbow","shortbows":"Shortbow","longbow":"Longbow","longbows":"Longbow",
  "greatbow":"Greatbow","greatbows":"Greatbow","bow":"Longbow","bows":"Longbow",
  "crossbow":"Crossbow","crossbows":"Crossbow","handgun":"Handgun","handguns":"Handgun",
  "sling":"Sling","slings":"Sling","javelin":"Javelins","javelins":"Javelins",
  "blowpipe":"Blowpipe","blowpipes":"Blowpipe","pistol":"Pistol","pistols":"Pistol",
  "brace of pistols":"Pistol","blunderbuss":"Blunderbuss","blunderbusses":"Blunderbuss",
  "throwing weapon":"Throwing Weapons","throwing weapons":"Throwing Weapons",
  "throwing axe":"Throwing Axes","throwing axes":"Throwing Axes",
  "grenade":"Grenades","grenades":"Grenades",
  // generic rulebook war machines (specific army-book variants live in each
  // book's glossary and override these via the case-insensitive match above)
  "bolt thrower":"Bolt Thrower","bolt throwers":"Bolt Thrower",
  "repeater bolt thrower":"Repeater Bolt Thrower","repeater bolt throwers":"Repeater Bolt Thrower",
  "cannon":"Cannon","cannons":"Cannon",
  "stone thrower":"Stone Thrower","stone throwers":"Stone Thrower",
  "mortar":"Mortar","mortars":"Mortar",
  "rocket launcher":"Rocket Launcher","rocket launchers":"Rocket Launcher",
  "fire thrower":"Fire Thrower","fire throwers":"Fire Thrower",
  "organ gun":"Organ Gun","organ guns":"Organ Gun"
};
function equipDef(label){
  if(!label) return null;
  const ex=ruleExact(label); if(ex) return ex;
  const base=label.replace(/\s*\([^)]*\)\s*$/,"").trim();
  // Case-insensitive EXACT glossary match FIRST, so a book's own war-machine
  // profile wins over the generic rulebook one. Artillery / war-machine weapon
  // tokens are written in the equipment line in lower case ("magma cannon",
  // "warpfire thrower") but live under a capitalised glossary key ("Magma
  // Cannon"); ruleExact is case-sensitive, so match the whole token here. Exact
  // (not substring), so named magic items in an eq line are never mis-linked.
  if(D.glossary){ const lc=base.toLowerCase();
    for(const k in D.glossary){ if(k.toLowerCase()===lc) return {name:k, text:D.glossary[k]}; } }
  // then the shared rulebook weapon/armour rules via alias (generic profiles)
  const key=EQUIP_ALIASES[base.toLowerCase()];
  if(key){ const R=window.COMMON_RULES||{}; if(R[key]) return {name:key, text:R[key]}; }
  return null;
}
function hasRuleDef(label){ return !!ruleDef(label); }
/* strict, exact-name lookup (no equipment regex/substring fallback) — used to
   decide which words in a unit's Special-rules line are clickable. */
function ruleExact(name){
  if(!name) return null;
  if(D.glossary && D.glossary[name]) return {name, text:D.glossary[name]};
  const SR=window.COMMON_SPECIAL_RULES||{}; if(SR[name]) return {name, text:SR[name]};
  const R=window.COMMON_RULES||{}; if(R[name]) return {name, text:R[name]};
  return null;
}
/* render a comma/semicolon/period-separated string (a unit's `rules` or `eq`
   line) with each recognised token clickable — opens its definition in the
   stacked window. `resolver` decides what is a known rule; a trailing
   parenthetical like "Fly (8)" or "light armour (Handlers)" is stripped for the
   lookup but kept in the displayed text. Unknown tokens stay plain. */
function tokensToHTML(str, resolver){
  if(!str) return "";
  window.__rw = window.__rw || [];
  const parts = String(str).split(/([,;.])/);
  let out = "";
  for(const part of parts){
    if(part===","||part===";"||part==="."){ out+=esc(part); continue; }
    const m = part.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const lead=m[1], core=m[2], trail=m[3];
    if(!core){ out+=esc(part); continue; }
    const base = core.replace(/\s*\([^)]*\)\s*$/,"").trim();
    const def = resolver(core) || (base && base!==core ? resolver(base) : null);
    if(def){
      const idx = window.__rw.push(def.name)-1;
      out += esc(lead) + `<span class="ruleword" onclick="event.stopPropagation();openRuleInfo(__rw[${idx}])">${esc(core)}</span>` + esc(trail);
    } else {
      out += esc(part);
    }
  }
  return out;
}
function rulesToHTML(rules){ return tokensToHTML(rules, ruleExact); }   // strict: special rules
function eqToHTML(eq){ return tokensToHTML(eq, equipDef); }            // weapons/armour/command
/* render a rule's text: paragraphs are separated by blank lines, and a sub-heading
   wrapped in **double asterisks** becomes bold (rule text is transcribed verbatim
   from the rulebook, which uses bold sub-headers like "Berserk Rage"). */
function ruleTextHTML(text){
  return String(text).split(/\n[ \t]*\n/).map(p=>p.trim()).filter(Boolean)
    .map(p=>`<div class="rule">${esc(p).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")}</div>`).join("");
}
