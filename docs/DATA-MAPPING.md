# Data mapping — getting an army book into a data file

The playbook for **adding, updating or auditing an army book**. It says what to pull
out of the source PDF, where each piece goes, how to extract it, and how to prove the
result matches the book.

- What every field *means* → [`SCHEMA.md`](SCHEMA.md). This file does not repeat that.
- How the engine uses the data → [`../CLAUDE.md`](../CLAUDE.md).

## Golden rules

1. **The PDF is the only source.** Statlines, points, options, costs, item and spell
   values and rule text are copied from the PDF. Nothing is filled in from memory of
   another edition, from a similar unit, or from what "should" be there. If the book
   does not say it, leave it out.
2. **No PDF, no data.** Source PDFs live in `reference/Army books/` and the rulebook in
   `reference/Rulebook/`. Today only **Chaos Dwarfs, Daemons of Chaos, Dark Elves,
   Grand Cathay, Vampire Counts and Wood Elves (all v3.1)** and the **rulebook
   (3.11)** are there. The other ten bundled books cannot be checked: do not "fix" a
   value in them on a hunch — report it and ask for the PDF.
3. **One home per fact.** Book-specific things go in `data/<id>.js`. Rulebook things
   (the eight Lores, common magic items, universal special rules, weapons and armour,
   troop types) live once in the shared `*-common.js` files — never copy them into a
   book (a private copy goes stale; Chaos Dwarfs carried one until it was removed).
4. **Prove it.** A book is not done until `scripts/audit-pdf.js` shows no `✗` for it
   and every `?` has an explanation (see "Verification").
5. **Old saves must survive.** Never rename a unit `id` or an option `id`, and never
   re-order an existing `choices` list without recording the old order (see "Updating a
   book").

## Where things live

| File | Holds | Edit it when |
|---|---|---|
| `data/<id>.js` | one whole book: composition, magic items, units, `unitInfo`, `itemDesc`, `glossary`, `spellLores` | adding / updating that book |
| `data/books.js` | the registry (`BOOK_INDEX`: id, name, file), alphabetical | adding a new book — one line |
| `data/lores-common.js` | the eight rulebook Lores (`COMMON_LORES`) | a rulebook lore changes |
| `data/common-items.js` | text of the rulebook's common magic items (`COMMON_ITEM_DESC`) | a common item's text changes |
| `data/special-rules-common.js` | universal special rules (`COMMON_SPECIAL_RULES`) | a core rule is missing app-wide |
| `data/rules-common.js` | weapons, armour, command (`COMMON_RULES`) | almost never |
| `data/troop-types-common.js` | rulebook Troop Types chapter (`COMMON_TROOP_TYPES`) | a troop type does not resolve |

A new book is `(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["<id>"] = { id:"<id>", name:"…", … }`
plus one line in `data/books.js`. The page loads a book's file the first time that
army is picked, so there is no `<script>` tag to add. The harness fails if a `data/`
book is missing from the registry or its `name` differs.

## Extraction: which text mode for which part

`pdftotext` (poppler-utils) has two modes that matter. Use the right one per section —
most past transcription slips came from reading a two-column page in the wrong mode.

| Section of the book | Mode | Why |
|---|---|---|
| Unit entries (profile table, UNIT SIZE, TROOP TYPE, EQUIPMENT, SPECIAL RULES, OPTIONS) | `-layout` | one column; keeps the profile rows and the `+N points` column aligned |
| Magic items, gifts, powers, spites | `-raw` | two columns; `-layout` interleaves them. `-raw` gives `NAME* 35 points` then the description |
| Spell lores | `-raw` | `NAME` then `Level 2 Cast on 9+` / `Signature Spell Cast on 5+` then the text |
| Army special rules pages | `-raw` | two columns of `RULE NAME` + paragraph |
| Rulebook (everything) | `-raw` | two columns throughout |

```bash
# always quote: the folder name has a space
pdftotext -layout "reference/Army books/Warhammer - Dark Elves 3.1.pdf" "$TMP/de.layout.txt"
pdftotext -raw    "reference/Army books/Warhammer - Dark Elves 3.1.pdf" "$TMP/de.raw.txt"
```

Things to know about the text:

- A bare number on its own line is a **page number**; drop it. A paragraph can continue
  across it.
- Unit rules are bullets under the unit: `• Name: text`. They stop at the next bullet
  or the next ALL-CAPS label (`OPTIONS:`, `UPGRADES:`, `NOTES:`).
- A long item name wraps over two lines (`ARMOUR OF BAZHERAK` / `THE CRUEL 50 points`).
- In an item heading a trailing `*` means **common** ("a magic item marked with an
  asterisk is considered to be a common item") → `common:true`.
- Special characters are headed by the name, then a subtitle line, then the profile.
- The PDFs have typos (`RANU'S HEARTSTIONE`, `MAGNIFICENT BUBOUES`). Keep the correct
  spelling in data and expect the audit to ask about it.
- Do not read values off a rendered page image when the text is available; if a table
  is an image, say so rather than guess.

## Order of work for a new book

1. Extract both text modes. Read the contents page: it lists every unit and section.
2. `composition` + `duplicateCaps` are the rulebook's and identical in every book —
   copy them from an existing book.
3. **Army special rules** → `glossary`.
4. **Lore(s)** → `spellLores` (only the book's own lores).
5. **Magic items** (and gifts / powers / spites / virtues) → `magicItems` + `itemDesc`;
   copy `commonMagicItems` unchanged from another book.
6. **Mounts** → `unitInfo.mount_<name>` (they are needed by the characters).
7. **Characters, then Core / Special / Rare, then special characters** → `units` +
   `unitInfo`, one entry at a time, top to bottom of the page.
8. Run the verification block. Fix every `✗`. Explain every `?`.

## PDF → data: what goes where

| In the PDF | Goes to | Notes |
|---|---|---|
| Army-wide list rules | `listRules` | free text shown to the player |
| Army special rules pages | `glossary` | one key per rule, text verbatim |
| Lore of … | `spellLores.<Lore>` `{attribute, spells:[{name,lvl,cast,type,range,effect}]}` | `lvl:0` = signature. Rulebook lores stay in `lores-common.js` |
| Magic Weapons … Magic Standards | `magicItems.<Category>` + `itemDesc` | six fixed categories; extra multi-pick categories via `multiPickCategories` |
| Item heading `*` | `common:true` | may be taken more than once |
| Item text opens with a type (`Heavy armour.`, `Great weapon.`, `Light lance/spear.`) | `requiresAccess` | heavy ≠ light lance; "X and Y" → `{all:[…]}`; a "/" → any-of array. An item that grants itself ("despite not normally being allowed") gets none |
| Arcane item text | `itemDesc` must open with `Relic.` / `Charm.` / `Staff.` | the sub-slot is derived from that word |
| "X only" in an item's text | `only:"<profile name>"` when X is a character profile | otherwise it is shown, not enforced (see SCHEMA) |
| Unit heading + first profile row + Points | `units.<cat>[]` `id`, `name`, `basePoints` | characters: one entry, `variants:[{name,points,…}]` in profile-row order |
| Profile rows | `unitInfo.<id>.profile` | every row, in order, including crew / mount / handler rows; `-` and `*` exactly as printed |
| `UNIT SIZE: 10-30` / `10+` | `perModel:true`, `unitSize:[10,30]` / `[10,null]` | no UNIT SIZE line = a single model: `perModel:false` — do not invent a range |
| NOTES: "You may take 1-2 X as a single … choice" | `perModel:true`, `unitSize:[1,2]` | one roster entry of 1–2 models; with `perModel:false` the second could never be taken |
| NOTES: "one Overseer for every 20 …" (required) | `attachedPerN` | auto-added and costed |
| "one X for every N models" (optional) | option `type:"perN"` | |
| `TROOP TYPE:` line | `unitInfo.<id>.troop`, verbatim with its parenthesis | also on `mount_…` entries; drives mounted-troop-type and the mount-duplicate rule |
| `EQUIPMENT:` / `SPECIAL RULES:` lines | `unitInfo.<id>.eq` / `.rules` | then the unit's own bullet rules after a `;` |
| `MAGIC:` paragraph (level + lores) | `wizardLevel` (variant or unit) + `lores:[…]` | a lore tied to a sub-type / alignment / upgrade → a gated `lores` entry |
| "May take Magic Items up to a total of N" | variant `magicBudget` | per profile |
| "May take a Magic Standard worth up to N" | `{type:"command", magicStandard:N}` | check each unit — they differ (25 / 50 / 100) |
| "One X may carry the Battle Standard +25" | `{id:"bsb", type:"toggle", bsb:true, only:"X", cost:25}` | `only` is what enforces "X" — the label alone does nothing |
| "May be upgraded to a Level 1 Wizard" | `wizardIfUpgraded` + toggle `id:"wiz"`, or `wizLevel:N` on the toggle / choice | then give the unit `lores` |
| "May take an additional Wizard Level" | toggle `id:"wlvl"` | |
| "May be mounted on one of …" | `{type:"mount", choices:[{label,cost,key,only}]}` | the mount's own options (barding, breath) are separate options with `requiresMount:"<key>"` |
| Character's EQUIPMENT + weapon/armour options | `access:[…]` | union of types it has or can buy; the harness audits it |
| Unlocks from another unit ("If Zhatan is in your army, one unit may …") | option with `requires:{unit:"id"}` (+ `oncePerArmy` / `limitByUnit`) | |

## One unit entry, end to end

```
KOLOSSUS                                          → units.rare[] id / name
Profile …  Kolossus  6 4 3 6 7 6 1 5 10   250     → basePoints:250 ; unitInfo.kolossus.profile
TROOP TYPE: Monster (Animated Construct)          → unitInfo.kolossus.troop (verbatim)
BASE SIZE: 75x50 or 100x100                       → not modelled
EQUIPMENT: Bane maces, heavy armour               → unitInfo.kolossus.eq
  • Bane Maces: …   • Immolation Cannons: …       → glossary (so the words are clickable)
SPECIAL RULES: Animated Construct, Hellbound      → unitInfo.kolossus.rules (+ glossary)
UPGRADES: • Greed Pistons: …  • Overdrive Switch  → glossary (the rule text)
OPTIONS: May take Greed Pistons  +10 points       → options[] (the price)
```

```js
// units.rare — no UNIT SIZE line, so a single model
{ id:"kolossus", name:"Kolossus", perModel:false, basePoints:250, unitSize:[1,1],
  options:[
    { id:"cannons",  type:"toggle", label:"Replace bane maces with immolation cannons", cost:40, per:"flat" },
    { id:"greed",    type:"toggle", label:"Greed Pistons",      cost:10, per:"flat" },
    { id:"breath",   type:"toggle", label:"Breath of Contempt", cost:15, per:"flat" },
    { id:"overdrive",type:"toggle", label:"Overdrive Switch",   cost:20, per:"flat" } ] },
// unitInfo
kolossus:{ troop:"Monster (Animated Construct)", profile:[["Kolossus",6,4,3,6,7,6,1,5,10]],
           eq:"Bane maces, heavy armour", rules:"Animated Construct, Hellbound" },
// glossary — the eq word, the rules words and each upgrade's i-button all resolve here
"Bane maces":`…`, "Immolation Cannons":`…`, "Greed Pistons":`…`, "Breath of Contempt":`…`, "Overdrive Switch":`…`,
```

## Turning OPTIONS bullets into options

| The book says | Model it as |
|---|---|
| "May choose one of the following: A / B / C" | `choice` (may be none) |
| "Must choose one of the following" | `mustChoose` (first choice is the default) |
| "May take X" | `toggle` |
| "May take up to two X" (the same thing twice) | `multi` with `repeatable:true`, `max:2`, one choice |
| "May take up to two of the following" (different things) | `multi`, `max:2` |
| "May upgrade one … to a Leader / Musician / Standard Bearer" | `command` (add `roles:[…]` if not all three). Costs are fixed in the engine — do not enter them |
| `+N points/model` | `per:"model"` — on that choice / toggle |
| `+N points` | `per:"flat"` (the default) |
| "free" | `cost:0` |

Name each option as the book's bullet does and add that bullet's rule to `glossary`;
the picker and the `i` button show it. A run of three or more plain toggles is shown as
one "Upgrades" picker automatically — nothing to tag.

### Slips that have actually happened — check for each

- **A restriction that only lives in the label.** "Battle Standard (Wargor only)" with
  no `only:"Wargor"` let any profile take it. Every "(X only)" needs an `only`
  (option, choice or mount choice) when X is one of the unit's profiles.
- **"Up to 2" that allows 1.** A non-repeatable `multi` with one choice can be ticked
  once. Use `repeatable:true`.
- **A size the player cannot reach.** `unitSize:[1,2]` with `perModel:false`.
- **Flat instead of per model** (and the reverse). Read the unit of every price:
  `/model`, `/Crew`, or nothing.
- **The banner allowance copied from the unit above.** It is per unit.
- **A statline off by one** in a single column — compare every row, not just the first.
- **A wizard upgrade that does nothing.** A "(Level 1 Wizard)" toggle needs `wizLevel`
  (or `id:"wiz"` + `wizardIfUpgraded`) and the unit needs `lores`.
- **A private copy of a rulebook lore or common item text** in the book file.
- **A mount whose label matches no profile.** The mount picker then shows "No profile
  recorded": the label (or its parenthesis) must equal a `unitInfo` profile row name,
  or the choice carries its own `prof`.

## What becomes clickable

`eq` and `rules` are split on `, ; .` — also inside parentheses, so write
`Hatred (High Elves & Dwarfs)` rather than a comma there — and each token is looked up
**exactly**; a trailing `(…)` is ignored for the lookup and kept on screen.

| Token | Define it in | Resolver |
|---|---|---|
| Weapon / armour / command (hand weapon, heavy armour, shield…) | `COMMON_RULES` (already there) or an `EQUIP_ALIASES` phrase | `equipDef` |
| Universal rule (Fear, Frenzy, Stubborn…) | `COMMON_SPECIAL_RULES` | `ruleExact` |
| Army- or unit-specific rule or named mundane weapon (Hellbound, Bane maces) | the book's `glossary` | `ruleExact` / `equipDef` |
| Named magic item, gift, honour (Stone Mantle, Star Lance) | `itemDesc`, **not** `glossary` | not linked in `eq`/`rules` on purpose ("Bow of Avelorn" must not open the generic bow) |

Gotchas: a rule written `Dirty, Rotten, Sneaky` is three tokens unless the glossary key
is the whole phrase (the tokenizer then joins it); `&` is not a separator (`Lumbering &
Unstoppable` is one key); put a `;` between the SPECIAL RULES line and the unit's own
bullet rules.

## Updating a book to a new version

Saved armies and share links must keep opening the way they were saved.

- Keep every unit `id` and option `id`. A removed unit is dropped from old saves with
  a notice; a renamed one is a removed one.
- Saves made today carry their picks by name, so re-ordering a `choices` list is safe
  for them — but saves made before that hold bare positions. If you move, insert
  (anywhere but the end) or delete a choice in an existing `choice` / `mustChoose` /
  `multi` / `mount` list, add the old order to the option:
  `orderBefore:[{ until:"<ISO time the change goes live>", order:["old 1st","old 2nd",…] }]`
  (labels in their current spelling). SCHEMA has the details.
- Changing a `multi` into a `repeatable` counter is handled on load (the old array
  becomes its length).
- Diff the old and new PDF text rather than re-reading the book: every changed line
  is a data change or a deliberate non-change.

## Verification

```bash
node --check data/*.js js/*.js mobile-init.js
node scripts/test-engine.js            # must end "PASS: N/N"
node scripts/audit-pdf.js <book-id>    # the data against its PDF  (rulebook | all)
node scripts/sweep.js <book-id>        # option labels and rule tokens with no rule text
```

**`audit-pdf.js`** reads the PDF with `pdftotext`, parses unit entries, items and
spells, and compares them with the data. It needs the book's PDF in
`reference/Army books/` named `Warhammer - <Book name> <version>.pdf`.

- `✗` — the data differs from the PDF: a statline, points, unit size, troop type, magic
  or banner allowance, a priced PDF option with no option of that cost, an item's cost
  or common star, an arcane type, a spell's level or casting value, a common item that
  differs between books. **Fix these**, or the PDF is wrong and you say so. The script
  exits non-zero while any remain.
- `?` — look at it: an option priced elsewhere (a special character's rule unlocks it),
  an entry the parser could not find, a special rule missing from the `rules` line, a
  PDF item or spell with no match in data. Each should have a one-line explanation.
  All six audited books currently report 0 `✗`.

What it does **not** check, so you still read these by eye: the wording of rule, item
and spell text; which option a cost belongs to (it compares the set of prices and
their per-model flags, not labels); `only` / `requires*` gating; `access` lists (the
harness does those); and anything in a book without a PDF.

**`sweep.js`** lists tokens that will not be clickable. What is left should be a real
gap to add to `glossary`, or a magic item (intentionally not linked).

Add a case to `scripts/test-engine.js` whenever a book needs a new engine hook, and
for any value you corrected that was wrong for a reason likely to recur.

## Conventions

- Rule and description strings use **backtick** template literals (the text has both
  apostrophes and `"` inch marks). Escape a literal backtick and `${`.
- `bow` in a book is the rulebook Longbow (an alias — no invented stats).
- Ids are lower-case, no spaces, stable forever.
- Put a short comment where the data deliberately differs from a naive reading of the
  page (a self-granting item with no `requiresAccess`, a PDF typo, an `orderBefore`).
