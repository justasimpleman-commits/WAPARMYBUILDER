# Data mapping — extracting an army book into a data file

This is the **onboarding playbook for adding (or auditing) an army book**. It maps
each part of a source army-book PDF to the place it lives in the application, in the
order you should work, plus the extraction technique and verification steps.

- **What every field *means*** → [`SCHEMA.md`](SCHEMA.md). This doc does **not**
  repeat field semantics; it tells you *what to pull from the PDF and where to put it*.
- **How the app is wired (engine + data)** → [`CLAUDE.md`](CLAUDE.md).

## Golden rules

1. **Verbatim from the source.** Statlines, points, options, item costs and rule
   text are transcribed and audited **against the PDF**, never invented. An earlier
   bug fabricated unit sizes — don't. If a value isn't in the book, leave it out.
2. **Source PDFs live in** `reference/Army books/` (not shipped in the build).
   The core rulebook is `Warhammer - The Game of Fantasy Battles - 9th Edition 3.0.pdf`.
   **No PDF, no data.** All bundled books have their PDF there (Tomb
   Kings, Vampire Counts and Bretonnia were added and their unique upgrades / special
   rules audited against the source). A handful of tokens still have no source
   definition anywhere (e.g. the universal "Loner" rule, Bretonnia's "Aura of the
   Lady") — left unresolved rather than invented.
3. **One source of truth per fact.** Points/options come from the book file
   (`<id>.js`). Universal rules are *not* copied per book — they live in the shared
   `*-common.js` files (see the token map below).
4. **Verify before done.** `node --check` every file, run `node scripts/test-engine.js`,
   and run the unmapped-token sweep (`scripts/sweep.js`, last section).

## The data files

All data files live in **`data/`**; the test/dev scripts live in **`scripts/`**;
`index.html`, `main.js`, `preload.js` stay at the **root** (see CLAUDE.md → repo layout).

| File | Holds | You edit it when… |
|---|---|---|
| `data/<id>.js` (e.g. `data/chaos-dwarfs.js`) | the whole book: composition, magic items, units, `unitInfo`, `itemDesc`, `glossary`, `spellLores` | adding/auditing a book |
| `index.html` | the generic engine **and** the `<script src="data/…">` tags | adding a *new* book (one `<script>` line + default id) |
| `data/lores-common.js` | the 8 standard Lores (`COMMON_LORES`) | a wizard uses a standard lore — reference it, don't recopy |
| `data/rules-common.js` | weapon/armour/command rules (`COMMON_RULES`) | almost never (rulebook kit) |
| `data/special-rules-common.js` | universal special rules (`COMMON_SPECIAL_RULES`) | a **core** rule (Fear, Strider, Ignores Armour…) is missing app-wide |
| `data/common-items.js` | descriptions of rulebook common magic items (`COMMON_ITEM_DESC`) | a shared common item lacks a description |

To register a brand-new book: `(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["<id>"] = { id:"<id>", … }`,
then add `<script src="data/<id>.js"></script>` in `index.html` next to the others.

**Four more places carry a hardcoded list of data files — add the new book to all of
them or it is silently skipped:**

| File | Why it matters |
|---|---|
| `index.html` (`<script src>` tags) | the app itself |
| `mobile/sync-web.js` (`DATA_FILES`) | otherwise `www/` never gets the book and the phone app can't select it |
| `scripts/test-engine.js` (the `eval` list) | otherwise the "render every book" smoke test never covers it |
| `scripts/sweep.js` (the `eval` list) | otherwise `node scripts/sweep.js <id>` prints "no book" |

After editing `index.html` or any `data/` file, **re-sync the mobile app** so the
phone build matches: `node mobile/sync-web.js` (copies `index.html` + `data/` into
`mobile/www/`). See CLAUDE.md → "Mobile app (Capacitor)".

## Source PDF → destination map

A typical army-book PDF is laid out: **Army Special Rules → Lore of <God> → Magic
Items (six categories) → Characters → Character Mounts → Core / Special / Rare
units → Special Characters**. Map it like this:

| PDF section | Goes into | Notes / SCHEMA ref |
|---|---|---|
| Army organisation / % limits | `composition` (fractions) + `duplicateCaps` | SCHEMA "Top level"; values are fractions of total pts |
| Army-wide list rules (free text) | `listRules: [ "…" ]` | surfaced to the player as-is |
| **Army Special Rules** pages | `glossary: { "Rule": "text" }` | one entry per rule, **verbatim** |
| **Lore of <God>** | `spellLores: { "<Lore>": { attribute, spells:[{name,lvl,cast,type,range,effect}] } }` | `lvl:0` = signature; standard lores stay in `lores-common.js` |
| **Magic Weapons / Armour / Talismans / Arcane / Enchanted / Standards** | `magicItems: { "<Category>": [ {name,cost,…} ] }` + a description in `itemDesc` | six fixed category keys; rulebook commons go in `commonMagicItems`. Arcane `itemDesc` **must start with** `Relic./Charm./Staff.` (subtype is derived from the first word) |
| **Character** entries | `units.characters: [ … ]` with `isCharacter:true`, `variants:[{name,points,wizardLevel,magicBudget}]` | one entry, variants = the stat/points tiers |
| **Character Mounts** | a `mount` option on the rider + a `unitInfo` profile (key prefixed `mount_…`) | SCHEMA "Option descriptors" → `mount`; gate mount-only upgrades with `requiresMount` |
| **Core / Special / Rare** units | `units.core / .special / .rare` | `perModel`+`basePoints` for regiments, flat `basePoints` for single models |
| **Special Characters** | same arrays, `isSpecialChar:true` (engine enforces unique) | `mustBeGeneral` / `cannotBeGeneral` as needed |
| Every unit's **Profile / Equipment / Special Rules** | `unitInfo: { id:{ profile:[[name,M,WS,BS,S,T,W,I,A,Ld],…], eq, rules } }` | drives the detail popup; `eq`/`rules` are comma/semicolon lists |
| Each character's **EQUIPMENT + weapon/armour OPTIONS** (the union of types it may use) | `access:[…]` on the character | powers magic-item `requiresAccess` gating — SCHEMA "Unit entry" |
| A **Magic Weapon/Armour** whose description names a mundane type (*Heavy armour*, *Great weapon*, *Shield*, *Light lance*…) | `requiresAccess:"<type>"` on that item | only models with the type in `access` may take it; self-granting items ("…despite not normally allowed") stay untagged — SCHEMA "Magic item" |
| A **lore only legal under a sub-species / upgrade / alignment** | a `lores` entry object with `requiresChoice`/`requiresToggle`/`requiresVariant` | e.g. Goblin Shaman Bad Moon (Night Goblin), Daemon Prince god-lore (alignment) — SCHEMA "Unit entry" |

## Extracting one unit entry

A unit page (the Kolossus, p.35) carries six things — here is where each lands:

```
KOLOSSUS                                  →  units.rare[].name / .id
Profile … 250 pts                         →  basePoints:250  (+ unitInfo.profile row)
TROOP TYPE: Monster (Animated Construct)  →  (informational; "Animated Construct" is a rule)
BASE SIZE                                 →  not modelled
EQUIPMENT: Bane maces, heavy armour       →  unitInfo.kolossus.eq
SPECIAL RULES: Animated Construct, Hellbound → unitInfo.kolossus.rules  (each name → glossary/COMMON)
UPGRADES: Greed Pistons / Breath of … / Overdrive →  glossary entries (the rule text)
OPTIONS: replace…/may take… +N points     →  options:[ {type, label, cost, per} ]
```

The resulting data:

```js
// units.rare
{ id:"kolossus", name:"Kolossus", perModel:false, basePoints:250, unitSize:[1,1],
  options:[
    { id:"cannons", type:"toggle", label:"Replace bane maces with immolation cannons", cost:40, per:"flat" },
    { id:"greed",   type:"toggle", label:"Greed Pistons",      cost:10, per:"flat" },
    { id:"breath",  type:"toggle", label:"Breath of Contempt", cost:15, per:"flat" },
    { id:"overdrive",type:"toggle",label:"Overdrive Switch",   cost:20, per:"flat" } ] },
// unitInfo
kolossus:{ profile:[["Kolossus",6,4,3,6,7,6,1,5,10]], eq:"Bane maces, heavy armour",
           rules:"Animated Construct, Hellbound" },
// glossary  (so the eq word, the rules words AND the upgrade i-buttons resolve)
"Immolation Cannons":`…`, "Bane maces":`…`, "Greed Pistons":`…`,
"Breath of Contempt":`…`, "Overdrive Switch":`…`,
```

Map each option to a `type` (full table in SCHEMA "Option descriptors"):
`choice` ≤1 · `mustChoose` exactly 1 · `toggle` one checkbox · `multi` up to `max`
(or `repeatable` counter) · `command` Leader/Musician/Standard · `mount`.
`per:"model"` scales cost with unit size; `per:"flat"` (default) adds once.
**Command costs are fixed in the engine** (Leader +5, Musician +5, Standard +10) —
don't put them in the data.

**Every named upgrade/choice should resolve to rule text.** Name each option
exactly as the book's bullet and add that bullet to `glossary`. The engine shows
the rule through one of two UIs (see CLAUDE.md "Two option-UI patterns"):

- *Choice among several* — `choice`, `mustChoose`, `multi`, or an **auto-grouped
  run of 3+ plain toggles** — renders as the **modal picker**: every option is
  listed with its rule text inline, so define each option's rule in `glossary`
  (else it shows "No separate rule text"). You do **not** tag groups in data — the
  engine auto-collapses a contiguous run of 3+ simple add-on toggles (typically the
  book's "UPGRADES:" block, e.g. the Kolossus) into one picker.
- *Single yes/no* — a lone `toggle` (shield or not, one upgrade or not) — stays an
  inline checkbox; its `i` button appears only when the label resolves via
  `glossary`/`COMMON_*`.

So whether you model an upgrade block as one `multi` or as several `toggle`s, the
player sees the same picker once there are 3+ — model it whichever way matches the
book, and just make sure every option label has a `glossary` entry.

## What becomes clickable — the token map

In the detail popup the `eq` and `rules` strings are split on `, ; .` and each token
is matched **exactly** (a trailing parenthetical like `Fly (8)` is stripped for the
lookup but kept on screen). Put each kind of token where the resolver will find it:

| Token kind | Define it in | Resolver |
|---|---|---|
| Weapon / armour / command (hand weapon, heavy armour, longbow, shield…) | `COMMON_RULES` (already there) or an alias | `equipDef` (eq) — exact + `EQUIP_ALIASES` |
| Universal special rule (Fear, Frenzy, Stubborn, Strider, Ignores Armour…) | `COMMON_SPECIAL_RULES` (`special-rules-common.js`) | `ruleExact` |
| **Army/unit-specific** special rule or named weapon (Hellbound, Spew Ichor, Bane maces, the K'daai upgrades…) | the book's **`glossary`** | `ruleExact` (rules) / `equipDef` (eq) |
| Magic item / gift / honour (Stone Mantle, Star Lance, Siren Song…) | `itemDesc` (**not** glossary) | shown via the item picker / info, **deliberately not linked in `eq`/`rules`** |

So: a **named magic item is never a glossary entry** — its text goes in `itemDesc`,
and the engine intentionally leaves it un-clickable in equipment lines to avoid
mis-linking ("Bow of Avelorn" must not link to a generic bow). A **plain
unit-specific weapon or rule** (Bane maces, Greed Pistons) *does* go in `glossary`.

Tokenization gotchas:
- Names are split on commas, so a rule written `Dirty, Rotten, Sneaky` is read as
  three tokens — prefer `;` between distinct rules, or add a glossary key per piece.
- `&` is **not** a separator: `Lumbering & Unstoppable` is one token — key it exactly.
- A name truncated by a comma (`At Them, You Curs!`) is only clickable on the part
  before the comma — key that part (`"At Them"`).
- Upgrade **options** (toggle/multi/choice) get their own `i`/≣ rule button; it
  resolves the option `label` through `glossary` too, so defining the upgrade's rule
  text makes the option button work (this is how the Kolossus & K'daai upgrades got
  their popups).

## Extraction technique

`pdftotext -layout` keeps columns aligned and is fast; the **army books** print each
rule as a bullet `• Name: text`, which extracts cleanly:

```bash
cd "reference/Army books"
pdftotext -layout "Warhammer - <Book> 3.0.pdf" /tmp/book.txt
# bullet-defined rules → {Name: text}: match ^[•\-–*] Name: text, stop at the next
# bullet or an ALL-CAPS section header (SPECIAL RULES / OPTIONS / UPGRADES / MAGIC …)
```

The **core rulebook** is two-column; `-layout` interleaves the columns, so for core
rules use plain `pdftotext` (no `-layout`) and grab the paragraph under the ALL-CAPS
heading. Always read the surrounding lines — strip trailing page numbers and text
that bleeds into the next entry.

## Conventions & gotchas

- Description/rule strings use **backtick** template literals — text contains both
  apostrophes and `"` inch marks. Escape a literal backtick and `${`.
- Profiles use `–`/`"-"`/`"*"` for "no value"/variable exactly as the book prints.
- `bow` in a book = the rulebook **Longbow** (mapped via alias; no invented stats).
- Arcane items: open the `itemDesc` with `Relic.`/`Charm.`/`Staff.` so the engine
  derives the sub-slot.
- A profile parenthetical (`Fly (8)`, `Immunity (Psychology)`) stays in the display
  but is stripped for the lookup — define the **base** name.

## Verification (no GUI needed)

```bash
node --check data/*.js main.js preload.js
node scripts/test-engine.js   # DOM-stub harness: smoke-renders every book + asserts
node scripts/sweep.js         # unmapped-token sweep (see below)
```

Add a case to `scripts/test-engine.js` when you touch the engine. To find
rule/equipment tokens that still don't resolve in a book, run `scripts/sweep.js`: it
loads the common files + book, walks every `unitInfo.eq` / `.rules`, splits on
`, ; .` (respecting parentheses), and reports name-like tokens not found in
`glossary` / `COMMON_SPECIAL_RULES` / `COMMON_RULES` (filtering out stat fragments
like `Unit Strength 2`, lore names, and magic items already in `itemDesc`).
Remaining hits are either a real gap to add to `glossary` or an intentional skip
(magic item).

Finally, after any `index.html`/`data/` change, run `node mobile/sync-web.js` so the
mobile `www/` copy is not left stale.
