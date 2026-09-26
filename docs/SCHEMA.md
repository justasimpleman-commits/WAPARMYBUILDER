# Army Builder — data schema

The app is **engine + data**. `js/` holds the generic engine (UI, army chooser,
point maths, validation, export), loaded by `index.html`. Each army book is a separate
data file that registers itself into `window.ARMY_BOOKS` under its `id`. To add a new
book, copy the structure below and add one line to the registry `data/books.js`
(`{id, name, file}`) — no engine changes needed; the page loads the file the first
time that army is picked. The header **Army** dropdown switches the active book; the engine also
requires exactly one character to be nominated as the **Army General**.

> This file documents what each **field means**. For *how to extract a book from
> its PDF and where each piece goes*, see [`DATA-MAPPING.md`](DATA-MAPPING.md).

## Top level

```js
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["chaos-dwarfs"] = {
  id: "chaos-dwarfs",
  name: "Chaos Dwarfs",
  author: "...",
  composition: { charactersMax, coreMin, specialMax, rareMax, singleUnitMax }, // fractions of total pts
  duplicateCaps: [ { upTo, special, rare }, ... ],   // Special/Rare duplicate limit by game size
  listRules: [ "free-text rules surfaced to the player" ],
  magicItems: { "Magic Weapons":[...], "Magic Armour":[...], ... },   // army-book items
  commonMagicItems: { "Magic Weapons":[...], ... },                   // shared rulebook items
  units: { characters:[...], core:[...], special:[...], rare:[...] },

  // ---- optional, army-specific systems (see the dedicated sections below) ----
  godSections: true,                 // Daemons: group magic items into per-god optgroups
  multiPickCategories: ["Daemonic Gifts"],   // categories taken several-times, sharing the budget
  vampiricPowers: [ { name, cost, blood:["von Carstein",…], desc } ], // VC — see "Vampiric Powers"
  virtues: [ { name, cost, desc } ],                                  // Bretonnia — see "Virtues"
  requireWizardLore: "Necromancy",   // Undead: army must field a Wizard using this lore
  requireWizardLoreMsg: "…"          // the validation message to show (optional override)
}
```

Three optional data maps power the detail/info popups (all keyed for lookup, kept
separate from the unit list so they're easy to extend):

- `unitInfo` — `{ id: { profile:[[name,M,WS,BS,S,T,W,I,A,Ld],...], eq, rules } }` for the unit detail view. Both `eq` (equipment) and `rules` are comma/semicolon-separated; in the detail popup each recognised token becomes a clickable word that opens its definition (weapons/armour/command from `COMMON_RULES`, special rules from `COMMON_SPECIAL_RULES`, army-specific from `glossary`) in a separate stacked window.
- `itemDesc` — `{ "Item name": "effect text" }` for the magic-item info popup (army + common).
- `glossary` — `{ "Rule name": "definition" }`; in the detail popup each rule name in a unit's `rules` string that matches a glossary key (or a core `COMMON_SPECIAL_RULES` / `COMMON_RULES` name) becomes a clickable word that opens its definition in a separate stacked window (the stats window stays open underneath; nothing is expanded inline). Universal special rules (Fear, Frenzy, Stubborn, Fly, …) need not be repeated per book — they live in `special-rules-common.js`.

`commonMagicItems` uses the same six category keys as `magicItems`. The engine merges
both pools per category, shown as "Army" vs "Common (rulebook)" groups. Each dropdown
only offers items the character can still afford (cost ≤ remaining magic budget; the
current pick stays visible). Magic Standards appear only for the BSB (no points limit)
or unit standard bearers (within the unit's banner budget).

**Arcane Items (Wizards only)** render as three sub-slots — **Relic**, **Charm**,
**Staff** — so a Wizard may carry one of each (max three). The sub-type is *derived*,
not stored: the engine reads the first word of the item's `itemDesc` text (the source
books open every arcane description with "Relic./Charm./Staff."). For the rulebook
"common" arcane items, an engine-side fallback map supplies the type; genuinely untyped
items default to Relic. So no extra data field is needed — just make sure a new arcane
item's `itemDesc` starts with its type word.

## Magic item

```js
{ name: "Volcanic Hammer", cost: 45, common: false, only: "Daemonsmith" }
```
`common:true` → marked `*`, may be taken multiple times.

`extraSpells:N` → a wizard carrying this item may choose **N additional spells**
from its normally-allowed spells (raises the spell cap; the Spell Familiar uses
`extraSpells:1`). The engine sums this over every item the model holds
(`bonusSpells`).

`exclusive:true` → the bearer may take **no other magic items** (e.g. the Chaos
Dwarf Talisman of Obsidian). Enforced in validation across `magic`, `gifts` and
`magicStd`.

`extraSignatures:N` → a wizard carrying this item may also know **N signature
spells chosen from any of the eight Winds of Magic** (a *separate* picker/pool
from its own lore, not counted against the wizard-level cap; the Arcane Familiar
uses `extraSignatures:1`). Picks live in `entry.sigSpells`; summed by
`bonusSignatures`. `only` → restricts to a
variant name (characters) or `"Hobgoblins"` (standards: requires `keyword:"hobgoblin"` unit).
When `only` names one of the model's own variant names (or `"A or B"`), the engine
**enforces** it (the item/choice is hidden on other variants); any other `only`
keyword is treated as descriptive (shown to all).

Two extra restriction fields used by the Undead/Bretonnia books:

- `blood: ["von Carstein", …]` — Vampire Counts only: the item is offered only to a
  model whose unit has a matching `bloodline` (see Vampire characters below).
- `vampireOnly: true` — offered only to a model whose unit carries `tags:["Vampire"]`.
- `requiresAccess: "heavy armour" | ["light lance","spear"] | {all:["heavy armour","shield"]}`
  — **equipment-access gating** (Magic Weapons / Magic Armour). A magic item that IS a
  mundane weapon or armour type (a magic heavy armour, a magic great weapon, a magic
  shield, a magic longbow, a magic gut-plate…) may only be taken by a model that can
  use that type — i.e. it has it in base equipment or as a buyable option, declared in
  the character's `access` list (see Unit entry). A string; an array = **any-of**; an
  `{all:[…]}` object (also allowed inside the array) = **all-of**, for an item that is
  two types at once (Armour of Agilulf: "Heavy armour and shield"). Tokens are
  normalised through an alias map (`lance`≡`heavy lance`, `cavalry spear`≡`spear`,
  `polearm`≡`halberd`, `two hand weapons`≡`additional hand weapon`, `bow`/`elven
  longbow`≡`longbow`, `elven shortbow`≡`shortbow`, `javelins`≡`javelin`, `throwing
  weapons`≡`throwing weapon`, `brace of ogre pistols`≡`ogre pistol`, `full plate`/
  `gromril`≡`heavy armour`). **Armour is tiered:** `light armour ⊂ medium armour ⊂ heavy
  armour` — a model that may wear a heavier armour also satisfies a lighter magic-armour
  requirement (a magic armour replaces the mundane one). Everything else matches
  exactly — in particular **heavy and light lances are different weapons**, and an Ogre
  **gut-plate** is its own type (not light armour). Items that self-grant ("may be
  taken despite not normally being allowed …") and
  generic magic hand weapons carry no `requiresAccess` (an item with no mundane type is
  open to every character; other restrictions still apply). Resolved in
  `itemAllowed`/`hasAccess`. In the picker an item barred only by access is **shown
  disabled** with the reason ("needs Shield"); a loaded save's ineligible pick is dropped.
- `accessWaivedFor: ["Master Necromancer","Necromancer"]` — models (variant or unit
  names) that may take a `requiresAccess` item regardless of their equipment, when the
  item's own text says so (Armour of Bone: "May be taken by Necromancers"). Everyone
  else still needs the type.
- `equipType: "Bow"` — optional display label for the item's mundane type. The picker,
  the chosen slot button and the info popup show the type as a small badge
  (`itemEquipType`); without `equipType` it is built from `requiresAccess`
  ("Heavy armour", "Light lance / Spear", "Heavy armour + Shield", "Polearm (halberd)").
  Only needed when that would read wrongly (Asp Bow: any bow; Sky-Titan Scatter
  Pistols: a brace of Ogre pistols).

`god:"Khorne"` (with the book-level `godSections:true` flag) → the item/gift is only
offered to a model of that god; untagged items are "Undivided" and offered to all.
A model's god comes from a unit-level `god:"…"` field or from the chosen choice of
the `choice`/`mustChoose` option whose choices carry `god` (Daemons of Chaos use
`{id:"align", type:"choice", choices:[{label,cost,god}]}`; the id is only a
convention for `requiresChoice` references). Items are grouped by god in the picker.

Book-level `multiPickCategories:["Daemonic Gifts"]` makes a magic-item category
multi-select (take several, each once) sharing the model's magic-item budget; the
picks live in `entry.gifts` and are exempt from army-wide item uniqueness.

## Unit entry

```js
{
  id, name,
  isCharacter, isSpecialChar,    // flags
  cannotBeGeneral, mustBeGeneral, // General eligibility (hides the radio / forces the pick)
  perModel: true, basePoints: 7, unitSize: [min,max],   // troop units
  variants: [ {name, points, wizardLevel, magicBudget} ], // characters (count is always 1)
  keyword: "hobgoblin",          // used by some restrictions
  expendable: true,              // Core slave units
  access: ["heavy armour","shield","great weapon","lance"], // mundane weapon/armour types this model may use
  lores: ["Fire","Metal"], wizardIfUpgraded: true,
  tags: ["Vampire"],             // VC: unlocks Vampiric Powers + vampireOnly items
  bloodline: "von Carstein",     // VC: which Bloodline's powers/items this model sees
  virtueEligible: true,          // Bretonnia: may take one Virtue from its budget
  magicCatsOnly: ["Forest Spites"], // restrict this model's magic box to these categories only
  attachedPerN: { every:5, cost:8, name:"Herder" }, // required attached models at a fixed ratio
  options: [ ...option descriptors ],
  notes: "ⓘ shown under the entry"
}
```

`magicCatsOnly` limits which `magicItems` categories a model may draw from (its magic
budget still applies). Used by the Wood Elves' tree characters (Treelord Ancient,
Branchwraith, Durthu, Drycha), which may spend their budget on **Forest Spites** but
not on the ordinary six magic-item categories or Arcane Items. Omit it and the model
sees every category as usual. Forest Spites themselves are a category listed in
`magicItems` plus `multiPickCategories:["Forest Spites"]`, so a character can take one
or more Spites from the same budget as its Magic Items ("one Spite and/or Magic Items
up to N points").

`access:[…]` lists the mundane **weapon and armour types** (melee *and* missile) a
character has in base equipment **or** can buy as an option — the union, regardless of
what's currently selected. It drives magic-item `requiresAccess` gating (see Magic
item). Build it from the character's base `unitInfo.eq` plus every weapon/armour option
(mount options excluded); a pure caster with no armour/weapon options gets `access: []`.
Canonical tokens: `light armour`, `medium armour`, `heavy armour`, `shield`, `buckler`,
`barding`, `great weapon`, `halberd`, `spear`, `heavy lance`, `light lance`,
`additional hand weapon`, `flail`, `morning star`, `pike`, `whip`, `longbow`,
`shortbow`, `greatbow`, `crossbow`, `repeater crossbow`, `handgun`, `pistol`,
`brace of pistols`, `blunderbuss`, `javelin`, `throwing weapon`, `sling`, `blowpipe`,
plus book-specific types: `fireglaive` (CD), `celestial blade`, `dragon fire pistol`
(GC), `gut-plate`, `ironfist`, `ogre pistol` (OK), `plague censer` (Skaven),
`deathrain crossbow`, `sea dragon cloak` (DE). A named special weapon of a type
(Saearath = spear, Keldrisaíth = polearm) is declared by hand. Omit it and the model can
take no magic weapon/armour item that carries a `requiresAccess` tag.
`scripts/test-engine.js` audits this: every character with a magic-item budget must
declare each type found in its equipment/options, and every `requiresAccess` token
must be a known type.

**Conditional lores.** A `lores` entry may be a plain string (always offered) or an
object gating that lore on a condition: `{name, requiresChoice:{id,is}}` (a sibling
`choice`/`mustChoose` value — e.g. Goblin Shaman "Bad Moon" only when the Night-Goblin
sub-species is chosen; `is` may be an array, `null` = "none selected"),
`{name, requiresToggle:"optId"}` (a toggle being on — e.g. Orc Shaman "Savage Waaagh!"
needs the Savage Orc upgrade), or `{name, requiresVariant:"Name"|[…]}`. The lore picker
lists only currently-available lores and clears a stored pick that becomes illegal;
`availableLores(e,u)` is the single source of truth (also used by the Undead
`requireWizardLore` validator). Used by O&G (sub-species) and Daemons (a god-aligned
Daemon Prince/Exalted Daemon is locked to that god's Lore).

`attachedPerN:{every,cost,name}` adds **required attached models at a fixed ratio** —
one `name` model, costing `cost` points, for every `every` models in the unit
(`floor(count/every)`). Used by the Orcs & Goblins Squig Herd: the model count is the
Cave Squigs (`basePoints` each) and one Herder (8 pts) is auto-included and costed for
every five Cave Squigs. The engine shows the attached count/points on the entry and in
export; it is not an option the player toggles.

A non-character unit may cast: set a unit-level `wizardLevel:N` (e.g. the Wood Elf
Zoat, or a Sisters of the Thorn unit) so the engine shows the lore/spell picker
without the model being a `isCharacter` variant.

## Option descriptors

| `type` | meaning | key fields |
|---|---|---|
| `choice` | pick at most one (radio, can be none) | `choices:[{label,cost,per}]` |
| `mustChoose` | pick exactly one (required) | `choices:[...]` |
| `toggle` | single optional add-on (checkbox) | `cost`, `per`, optional `only`, `bsb` |
| `multi` | pick up to `max` | `max`, `choices:[...]`; or `repeatable:true` for an N× counter |
| `command` | Leader/Musician/Standard Bearer | `magicStandard:<budget>` (banner picker shown when Standard taken); `roles:[…]` to offer a subset (e.g. Zombies: `["musician","standard"]` — no Leader) |
| `mount` | pick at most one mount | `choices:[{label,cost,only,key}]` (`key` lets upgrades gate on it via `requiresMount`) |
| `perN` | "one X for every N models in the unit" — a stepper whose max tracks unit size | `n` (models per upgrade), `cost` (points per upgrade). Max = `floor(count / n)`; the counter is clamped to that on every render (and reset to 0 when the option is blocked). Points = `count × cost`. Export shows `N× label`. Used by the Orcs & Goblins Goblin Gitz Nasty Skulker / Netter / Fanatic upgrades. The option `label`'s base name (trailing parenthetical stripped) should resolve in `glossary` so the `i` button shows its rule. |

**Gate an option on a sibling choice (`requiresChoice`).** Any option may carry
`requiresChoice:{id:"<other choice id>", is:"Label"|null|["A","B",null]}` — it is
hidden, ignored by the points maths and reset when the sibling `choice`/`mustChoose`
option (`id`) is not on one of the listed values. `is:null` means "no value selected"
(e.g. a base sub-species like Common Goblin). Used to hard-restrict the Goblin Gitz
upgrades: Nasty Skulker only on Common Goblins (`is:null`), Netter/Fanatic only on
Night Goblins (`is:"Night Goblin"`). A gated `toggle` is also excluded from the
auto-grouped "Upgrades" picker (`isPlainToggle`).

A `choice`/`mustChoose` option may set `only` on an individual choice; the engine
hides that choice on variants whose name doesn't match (e.g. a "Level 3 Wizard"
upgrade `only:"Count"`). A choice carrying `wizLevel:N` raises the model's Wizard
level when selected (tiered wizardry); a `toggle` with `id:"wlvl"` adds +1 level.

Any option may carry `noGod:["Khorne",…]` — it is hidden, ignored by the points
maths, and excluded from `wizLevel` when the model's god (from a fixed `god` or an
`align` choice) is in the list. Used so a Khornate Daemon cannot buy a Wizard
upgrade (Daemon Prince / Exalted Daemon `wizlvl`).

Any option may carry `requiresMount:"key"|["keyA",…]` — it is hidden, ignored by the
points maths and unavailable until the model's chosen mount has a matching `key`.
Give each `mount` choice a `key` and tag a mount's own upgrades with it, so e.g.
the Great Taurus "Flaming Breath"/"Bloodrage" or the Royal Hippogryph talons only
appear once that mount is selected (`selectedMount` / `optMountBlocked` in the engine).

**Conditional choices shown-but-disabled (`cond`).** Any `choice`/`mustChoose` (used
by the High Elf Elven Honours) may give each choice a
`cond:{mounts:[keys…]}` listing the mount `key`s it is compatible with (use the
sentinel `"__foot__"` for "on foot, no mount"). Unlike `only` (which *hides* a
choice), a failing `cond` leaves the option **visible but disabled** in the picker
with a "Requires: …" reason, and flags a validation error if it is the current pick
— so the player still sees every Honour but the UI helps keep the mount rule. A
choice with no `cond` is always selectable. The reverse link is a **mount** choice
carrying the same generic `requiresChoice:{id,is}` as options (e.g.
`requiresChoice:{id:"honour", is:"Anointed of Asuryan"}`): that mount stays
hidden/uncharged until that sibling choice is picked (e.g. the Flamespyre Phoenix only unlocks
under *Anointed of Asuryan*, the Star/Sun Dragon under *Blood of Caledor*). The
engine drops a choice-gated mount automatically if its choice is removed
(`reconcileEntry`). Both fields are generic engine features — only High Elves use
them today.

Any option may carry `requires:{unit:"id"|["id",…]}` — it is only shown/charged when
the army contains such a unit (cross-unit "unlock" rules, e.g. a Despot lets one
Warriors unit buy heavy armour, or a special character unlocks a host upgrade).
Add `oncePerArmy:true` to a toggle to cap it at one unit, or
`limitByUnit:["id",…]` to cap the number of units taking it to the number of those
source units in the army (e.g. one heavy-armour Warriors unit per Despot). Either
raises a validation error when exceeded.

`per: "model"` multiplies cost by model count; `per: "flat"` (default) adds once.
Command costs are fixed in the engine: Leader +5, Musician +5, Standard +10.

## Army-specific systems (Undead & Bretonnia)

**Vampiric Powers (Vampire Counts).** A book-level `vampiricPowers:[{name,cost,blood?,desc}]`
catalog. A character whose unit has `tags:["Vampire"]` gets a multi-pick "Vampiric
Powers" box that draws from the **same budget as its magic items** (`magicBudget`).
Picks live in `entry.powers`; they are **not** army-wide unique (different Vampires
may share a power, none twice on one model) and are filtered by the model's
`bloodline` against each power's `blood:[…]` list (omit `blood` ⇒ any Bloodline).
Bloodline-restricted magic items/standards use the same `blood:[…]` field.

**Virtues (Bretonnia).** A book-level `virtues:[{name,cost,desc}]` catalog. A
character with `virtueEligible:true` may pick **one** Virtue from its magic-item
budget (stored in `entry.virtue`). The Virtue's **base** cost counts against that
model's budget, but **duplicate copies across the army escalate**: the Nth model
carrying the same Virtue pays `cost × N` (added to the army total only). The picker
shows the live surcharge.

**Forced / forbidden General.** `mustBeGeneral:true` makes the engine require that
character be the nominated Army General (e.g. Settra, Louen, Neferata); the
nomination radio is hidden for `cannotBeGeneral:true` characters (peasant heroes,
the Green Knight, etc.).

**Required Wizard lore (Undead).** `requireWizardLore:"<lore>"` makes the engine
demand the army contain at least one Wizard actually using that lore — Vampire
Counts' Lore of Necromancy, and Tomb Kings' Lore of Nehekhara (its highest-level
Nehekhara wizard is the Hierophant). `requireWizardLoreMsg` overrides the message.

## What the engine enforces

- Category caps: Characters ≤35%, Core ≥25% (warning), Special ≤50%, Rare ≤25%
- No single unit/character above 25% of total
- Unit size min/max — the model stepper is **clamped** to the range (can't pick
  fewer than min or more than max; open-ended max stays unbounded)
- Duplicate Special/Rare caps by game size
- Special characters unique; army-wide magic-item uniqueness (unless `common`)
- One magic item per category per model (one dropdown per category; Arcane Items
  split into Relic/Charm/Staff sub-slots, one each)
- Magic-item budget per character, with unaffordable items hidden from each
  dropdown; magic-standard budget per unit
- Wizards know their lore's signature spell **and lore attribute** automatically
  (free, excluded from the pick limit) and choose `wizardLevel` more, **+1 for each
  carried magic item flagged `extraSpells:N`** (e.g. the Spell Familiar) — so the
  cap is `wizardLevel + Σ extraSpells`; a chosen spell's level may not exceed the
  wizard's level (a level-1 wizard can only pick level-1 spells). An item with
  `extraSignatures:N` adds a separate picker for N signature spells from any of the
  eight Winds (Arcane Familiar); stored in `entry.sigSpells`
- Per-option `i` buttons show a single equipment/command rule (`rules-common.js`
  `COMMON_RULES`, `special-rules-common.js` `COMMON_SPECIAL_RULES`, or the book's
  own `glossary`); the unit-detail Special-rules line makes each recognised rule
  name clickable for the same definitions
- Expendable Core requires a non-Expendable Core unit
- Slave units ≤ Hobgoblin Cutthroat/Archer units
- Exactly one character nominated as Army General (and `mustBeGeneral`/`cannotBeGeneral`)
- Undead armies require a Wizard of the book's `requireWizardLore`
- Vampiric Powers / Virtues share the per-character magic-item budget (Virtues escalate on duplicates)
- **Equipment access:** a magic weapon/armour item tagged `requiresAccess` is offered
  only to a model whose `access` list covers that mundane type (armour tiered light⊂
  medium⊂heavy; heavy ≠ light lance); ineligible items are shown disabled ("needs
  Shield") in the picker and dropped from a loaded save. The item's type is shown as a
  badge in the picker and on the chosen slot
- **Conditional lores:** a `lores` entry gated by `requiresChoice`/`requiresToggle`/
  `requiresVariant` is offered only while its condition holds; a now-illegal chosen lore is cleared

## Running

It's a static web app: open `index.html` in a browser (works from `file://`) or
serve the folder (GitHub Pages). Keep `index.html` next to `css/`, `js/` and
`data/`. See `README.md`.
