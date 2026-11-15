# CLAUDE.md — Warhammer Army Builder

A static web app for building armies for Warhammer 9th Edition (Mathias Eliasson's
unofficial "Warhammer Armies Project" ruleset), published on GitHub Pages. The player
assembles a list; the app does the points and composition maths, enforces the
list-building rules, saves and loads armies (browser library or `.json` files), shares
an army as a link, exports it as text, and shows it as a table-side reference (Game
mode). No build step, no dependencies at runtime: `index.html` works from `file://`.

It is a generic **engine** (`js/`) driven by **data files** (`data/`), one per army
book. Sixteen books are bundled.

Read this file first. Then, depending on the task:

- any change to `data/` → read [`docs/SCHEMA.md`](docs/SCHEMA.md) (what each field
  means) **and** [`docs/DATA-MAPPING.md`](docs/DATA-MAPPING.md) (how to get it out of
  the PDF and prove it) before touching anything;
- a release → [`docs/RELEASING.md`](docs/RELEASING.md).

## Working rules

These are what "done well" means here. They outrank convenience.

### 1. The source books decide

- Every statline, points value, option, cost, item, spell and rule text comes from the
  PDF. Never fill a value in from memory, from another edition, from a similar unit,
  or from what looks consistent. (Unit sizes were once invented for two units; the
  owner still remembers.)
- **No PDF, no data.** `reference/Army books/` holds only Chaos Dwarfs, Daemons of
  Chaos, Dark Elves, Grand Cathay, Vampire Counts and Wood Elves (v3.1);
  `reference/Rulebook/` holds the 3.11 rulebook. For the other ten books you can
  check internal consistency only. If something there looks wrong, **report it and
  say it is unverified** — do not change it on a hunch. The one exception is a
  contradiction the data itself settles (a label that says "(Wargor only)" with
  nothing enforcing it).
- After any data change to a PDF-backed book, `node scripts/audit-pdf.js <book-id>`
  must show no `✗`.

### 2. The engine stays generic

- A book that fits the existing systems needs no engine change. A genuinely new
  mechanic gets a **data-driven hook** (a field any book can use, documented in
  SCHEMA.md), never logic keyed on a book, unit id or option id.
- Existing exceptions are legacy, not precedent: the Chaos Dwarf slave limits
  (`orcslaves` / `goblinslaves` / `cutthroats` / `archers` in `collectIssues`), the
  item restrictions `only:"Daemonsmith"` / `"Hobgoblins"` in `restrictOK`, the Dwarf
  rune `only` keywords in `runeAllowed`, and the god list in `pickerGroups`. Do not
  add to them; turn one into a data hook if you have to touch it.

### 3. One path for every change of state

- Every roster change goes through `update(fn)` — that is what makes it undoable and
  re-rendered. Never mutate `state` and call `render()` yourself. View-only state
  (fold carets, catalogue search) calls `render()` / `renderCatalog()` directly.
- Whatever keeps an entry legal lives in `reconcileEntry` (run at the start of every
  render). Render functions never mutate entries.
- Anything shown, charged or exported for an option goes through `optionActive`. A
  hidden option is never charged or exported.
- Rule checks live in `collectIssues` and return data (`{msg, uid}`); the panel only
  displays them.

### 4. Saved armies keep working

- Never rename a unit `id`, an option `id`, or the storage keys (`cd-…`,
  `chaos-dwarfs-…` — historical names that existing saves depend on).
- Do not re-order, insert into the middle of, or delete from an existing `choices`
  list without adding `orderBefore` (SCHEMA.md). Append instead where you can.
- Anything loaded (library, file, draft, link) must never throw: it goes through
  `migrateEntry` → `normalizeEntry`. If you add a field to roster entries, give it a
  default in `blankEntry` and handle its absence in `normalizeEntry`.

### 5. What the owner has asked for

- No confirmation popups and no "Undo" toasts for removing units, clearing the army,
  switching books or loading — undo is the safety net. The single confirm in the app
  is "Replace saved army?", because undo cannot restore an overwritten save. Do not
  add others without asking.
- Concise, direct answers; minimal formatting. Correctness against the books matters
  more than speed. This is a personal hobby project — no corporate branding.

### 6. Keep the docs true

A change is not finished until the docs describe it: a new or changed data field →
`docs/SCHEMA.md`; a change in how data is extracted or checked →
`docs/DATA-MAPPING.md`; a change in engine behaviour, a rule the engine enforces, or
a working rule → this file. Delete statements that stop being true; do not let them
pile up. The changelog and version number belong to the release step, not to
ordinary changes.

## Definition of done

Run all that apply, and report the actual results — including what you could not
verify.

```bash
for f in data/*.js js/*.js mobile-init.js scripts/*.js; do node --check "$f"; done
node scripts/test-engine.js          # must end "PASS: N/N"
node scripts/audit-pdf.js <book-id>  # after data changes to a PDF-backed book: no ✗
node scripts/sweep.js <book-id>      # after data changes: no new unresolved tokens
```

- **Engine change** → add cases to `scripts/test-engine.js`: the point maths, the
  validation, and the new behaviour, including the way it used to fail.
- **Data correction** → fix it from the PDF, and add a test if the mistake is of a
  kind that could come back.
- **UI change** → also load `index.html` in the pre-installed Chromium (Playwright)
  at desktop width and at phone width (≤ 820px, the drawer layout), drive the changed
  flow through the real controls, and check for console errors.
- **Any change** → smoke: `render()` once per bundled book without throwing (the
  harness does this).
- Say plainly what was checked against a PDF, what was checked only for internal
  consistency, and what was not checked.

## Repository map

```
index.html            markup + <script src> tags only (classic scripts, work from file://)
mobile-init.js        phone layout (≤ 820px): drawers and ☰ menu; loaded last
css/app.css           styles; palette = the --owb-* tokens in :root
js/                   the engine — classic scripts sharing one global scope, loaded in this order
  core.js               book registry + lazy loader, state, blankEntry/addUnit, update()/undo/redo, dirty tracking
  engine.js             pure rules, no DOM: points, budgets, wizard levels, items, runes, option gating,
                        reconcileEntry, collectIssues, describe/entryLoadout, picks by name, migrate/normalize
  rules.js              rule / equipment lookup (ruleDef, ruleExact, equipDef), clickable-token HTML
  modals.js             modal shells, prompt/confirm, openItemPicker, rune picker, unit/mount detail, toast
  roster.js             render(): catalogue, bars, entry cards, options, magic, spells, summary, validation panel
  storage.js            library (IndexedDB + localStorage fallback), .json files, draft, share links, export
  game.js               Game mode
  app.js                switchArmy, header controls, wiring, start() — the only code that runs at load
data/
  books.js              BOOK_INDEX — the only list of books ({id,name,file}), alphabetical
  <book>.js             one book each; registers into window.ARMY_BOOKS[id]
  lores-common.js       the eight rulebook Lores of Magic            (COMMON_LORES)
  common-items.js       text of the rulebook's common magic items   (COMMON_ITEM_DESC)
  special-rules-common.js  universal special rules, verbatim        (COMMON_SPECIAL_RULES)
  rules-common.js       weapons, armour, command rules, verbatim    (COMMON_RULES)
  troop-types-common.js rulebook Troop Types chapter, verbatim      (COMMON_TROOP_TYPES)
docs/                 SCHEMA.md, DATA-MAPPING.md, RELEASING.md, changelogs, unit-analysis write-ups
scripts/              test-engine.js (harness), audit-pdf.js (data vs PDF), sweep.js (unresolved tokens), release helpers
build/release.command tests + version bump + source snapshot (macOS double-click)
reference/            source PDFs (rulebook 3.11; six army books v3.1), audit notes, a printable CD reference .docx — not shipped
```

Quote paths: `reference/Army books/` contains a space.

The shared rules files were transcribed at the rulebook's 3.1 level and audited
against 3.11 (`reference/Core-Rulebook-3.11-Audit.md`); magic items and lores are
identical between the two.

## How the engine works

### Books and loading

`data/books.js` is loaded up front; `loadBook(id)` injects a book's `<script>` the
first time it is chosen. Books register in `window.ARMY_BOOKS`; the active one is `D`
(default `chaos-dwarfs`). `switchArmy(id)` returns a promise (synchronous when the
book is already loaded), clears the roster and is an undo step.

A roster entry: `{uid, cat, id, variant, count, opts, magic, magicStd, gifts, powers,
virtue, lore, spells, sigSpells, runes, collapsed}`. Picks are stored as **indexes**
into the unit's lists (`variant`, `opts.<choice id>`, `opts.mount`, `opts.<multi id>[]`),
toggles as booleans, command as `opts.cmd = {leader, musician, standard}`.

### Mutations, undo, dirty tracking

- `update(fn, opts)` snapshots, runs `fn`, renders, and pushes the old snapshot on the
  undo stack (100 deep) if the roster changed. Snapshots are `{army, uidc, generalUid,
  state}` without `collapsed`; undo keeps the current fold state.
- Whole-army steps (switch book, load, clear: `{meta:true}` / `pushHistory(before,meta)`)
  also restore the save name / file, saved-state and points limit.
- Undo / redo: header ↶ ↷, Ctrl/⌘+Z, Ctrl/⌘+Shift+Z or Ctrl+Y — ignored while typing or
  with a modal or Game mode open.
- `markSaved()` records roster + limit as saved; `isDirty()` compares. Dirty shows as
  "● unsaved changes", a "●" in the tab title and a `beforeunload` warning.

### Rendering

`render()` reconciles every entry, then draws catalogue, roster, bars, summary and
validation, updates the save status, schedules the autosave draft and refreshes Game
mode if open. It is incremental: the catalogue DOM is rebuilt only when the book,
search or fold state changes (`refreshCatalog` otherwise just updates badges); entry
cards are cached per entry with a signature and only changed cards are rebuilt, in
place (`patchChildren`). The cache is dropped when the army's make-up changes, because
options can depend on other units. Cards reorder by dragging the header (`wireDrag` →
`reorderEntry`, an undo step; touch needs a ~350ms hold).

### Options

Types: `choice` (≤1), `mustChoose` (exactly 1), `toggle`, `multi` (`max`, or a
`repeatable` counter), `perN` (one per N models), `command`, `mount`. `per:"model"`
multiplies by the model count. Command costs are fixed in the engine (Leader 5,
Musician 5, Standard 10).

Two UI patterns: a *choice among several* (magic items, mounts, `choice`,
`mustChoose`, `multi`, powers, virtues, and a run of 3+ plain toggles auto-grouped as
"Upgrades") opens the shared modal picker `openItemPicker`, which lists every option
with its rule text; the `i` button then shows only what is chosen. A *single yes/no*
(a lone toggle, a command role) is an inline checkbox with a one-rule `i`. Counters
are `+/–` steppers.

Gating — all through `optionActive(e,u,o)`: `requires:{unit}` (another unit in the
army), `noGod`, `requiresMount`, `requiresChoice`, and `only` on a toggle. A choice's
own `only` hides it on other profiles; `cond:{mounts}` shows it disabled.

### Keeping entries legal — `reconcileEntry`

Runs to a fixed point (mounts and options gate each other):

- a mount that is no longer allowed is dropped;
- an option the model itself bars (`optSelfBlocked`: its mount, god, a sibling choice,
  a profile-only toggle) goes back to its "not taken" value by type (`optDefault`); a
  pick restricted to another profile is cleared; `perN` counters are clamped. A missing
  `requires.unit` only hides an option — it is not reset;
- a magic standard / Banner Runes without a bearer are removed (`canCarryStandard`: the
  BSB, or a unit whose Standard Bearer is taken);
- `reconcileMagic`: unknown or illegal items, gifts and powers go; a non-Wizard keeps
  no Arcane Items; an `extra` item moves to its extra slot;
- `reconcileSpells`: a lore no longer offered is cleared; spells above the wizard's
  level or beyond its cap are dropped; a model that stops being a wizard keeps no lore.

### Magic items

- Six categories; army items plus the rulebook's common ones. `common:true` (shown
  `*`) may be taken more than once in the army; everything else is unique army-wide.
- One item per category per model, all within the profile's `magicBudget`. Arcane
  Items (Wizards only) are three sub-slots — Relic, Charm, Staff — derived from the
  first word of the item's description (`arcaneType`).
- `multiPickCategories` (Daemonic Gifts, Forest Spites, Lizardmen Spawnings /
  Disciplines) are take-several lists sharing the budget, stored in `entry.gifts`. A
  model must never see two such categories at once (`magicCatsOnly` separates them).
- `extra:true` items (Warrior Familiar) have their own "— extra" slot
  (`entry.magic["<Category>:extra"]`), outside the budget but still paid for.
- `requiresAccess`: a magic weapon / armour that *is* a mundane type needs a character
  whose `access` list has that type (armour is tiered light ⊂ medium ⊂ heavy). The
  picker shows such items disabled with the reason.
- Magic standards: the BSB (no limit, outside the budget, `entry.magicStd`) or a unit's
  Standard Bearer (within `magicStandard`).
- Army-specific systems, all data-driven: Vampiric Powers and Bloodlines, Virtues
  (duplicates cost × rank), Dwarf Runic Items, Daemon god sections.

### Wizards and spells

`wizardLevel(e,u)` = the profile's (or unit's) level; raised to a selected choice's or
taken toggle's `wizLevel`; 1 if `wizardIfUpgraded` and `opts.wiz`; +1 for `opts.wlvl`.
A `noGod` option is ignored for that god (Khornate Daemons cannot become Wizards).

A wizard knows its lore's signature spell(s) and lore attribute for free and chooses
`wizardLevel + bonusSpells(e)` more (`extraSpells:N` items), none above its own level.
`fixedSpells` are personal and always known. `mixLores` add other lores' spells to the
pick pool; using one brings that lore's attribute and signature. `extraSignatures:N`
items add a separate pick from the eight Winds' signatures (`entry.sigSpells`).
`loreData()` resolves a book's own `spellLores` first, then `COMMON_LORES`.

### Mounts and troop types

Mounts use the same picker; each row is a compact unit entity (profile, clickable
equipment and rules). `mountProfile(label)` matches the label, or its parenthesis,
against a `unitInfo` profile row name; mounts that are not units get `mount_…` entries.
`unitInfo.<id>.troop` is the book's TROOP TYPE line; `entryTroop` gives a mounted
character's effective type. **Only the six PDF-backed books have troop lines.**

### Rule text and clickable words

`ruleDef(label)` (option `i` buttons): book `glossary`, then `COMMON_SPECIAL_RULES`,
then `COMMON_RULES`, exact first, then the `EQUIP_REGEX` keywords and a glossary
substring. The detail popup's Special-rules line uses `ruleExact` (exact names only)
and its Equipment line uses `equipDef` (exact, case-insensitive glossary, then the
`EQUIP_ALIASES` phrases) — deliberately no substring matching, so a named magic item
in an equipment line is not linked to a generic weapon. A definition opens in the
second, stacked window (`openModal2`), leaving the stats window open underneath.

### Rules the engine enforces (`collectIssues`)

Points limit · Characters ≤ 35%, Special ≤ 50%, Rare ≤ 25%, Core ≥ 25% (warning) ·
no entry above 25% of the limit · unit size (also clamped in the stepper) ·
duplicate Special / Rare choices by game size (+1/+1 per 1000 pts past the table),
counting a character's Monstrous Creature / Monster / Chariot / Shrine / War Machine
mount that is also a Special or Rare unit — only in books with troop lines ·
special characters unique · magic-item uniqueness · per-model item budgets ·
`exclusive` items · Rules of the Runes · Expendable Core one-for-one · Chaos Dwarf
slave limits · `oncePerArmy` / `limitByUnit` upgrades · the required character Wizard
of a lore (`requireWizardLore`) · `mustBeGeneral` · exactly one Army General · at
most one BSB (warning if the BSB is the General) · conditional picks (`cond`).

An issue with a `uid` is a clickable row that scrolls to that entry.

### Save, load, share

- Library: IndexedDB (`cd-army-builder` / `armies`) with a localStorage fallback and
  legacy read. Keys are `fileSafe(name)+".json"`; the default name for a new army is
  made unique (`freeSaveName`), another book's army of the same name gets its own key
  (`libFileFor`), an army loaded from the library saves back to its entry, and saving
  over a *different* saved army asks first.
- Army JSON: `{app, version, army, name, savedAt, limit, points, uidc, generalUid,
  state}`. Each saved entry also carries `pick` — its profile / choice / mount / multi
  picks **by name** (`entryPicks`). On load `applyPicks` lets the name win over the
  index; name-less older saves go through `applyLegacyOrder` (`orderBefore`). Then
  `migrateEntry` and `normalizeEntry` repair the entry against the current data;
  unknown units are dropped with a notice.
- Draft: the roster is mirrored to localStorage (debounced, and on hide / unload) and
  restored silently at start-up; a draft that cannot be restored is discarded.
- Share link: `#army=<code>` — entries packed as differences from `blankEntry`, picks
  by name (`p`), deflate-raw + base64url (`z`; `j` = plain JSON). Nothing is uploaded.
  Start-up order: draft, then a shared link over it (an undo step), else the default
  army.
- Loading a file for another bundled book switches to that book.

### Game mode and phone layout

Game mode (`⚔ Game`, `#gameView`, under the modals) is a read-only card per entry:
chosen profile plus mount rows, troop type, equipment, rules, magic, spells with
casting values — every known word clickable. It keeps its click targets in its own
globals so a popup cannot break them.

`mobile-init.js` **moves** (does not clone) `#catalog`, `.col.validation` and the
`.actions` toolbar into drawers and a ☰ menu, so `render()` keeps filling them by id.
Anything added to the header, the action bar or the validation panel must still work
after being moved. Crossing back to a wide window reloads the page.

### Look

Modelled on Old World Builder's light theme: parchment page, slate-blue header, tan
category bars, green primary buttons, square white inputs, system sans-serif with
Gideon Roman for the title. Use the existing tokens; do not introduce new colours
casually.

## Testing notes

`scripts/test-engine.js` runs the engine in Node under a small DOM stub: it evals the
common data files and every book, concatenates `js/*.js` in page order and evals them
as one script, exposing internals as `__name` globals (add to that list when a test
needs another). `setTimeout` is a no-op there; use `setImmediate` to let async flows
settle. IndexedDB does not exist in Node — stub `localStorage` to test the library.
The tail of the file is `async function finish()`; new sections go before its final
summary line.

`scripts/audit-pdf.js` needs `pdftotext` (poppler-utils).

## Known gaps — do not paper over these

- Ten books have no PDF in the repo and no `troop` lines: Beastmen, Bretonnia, Dwarfs,
  Estalia, High Elves, Lizardmen, Ogre Kingdoms, Orcs & Goblins, Skaven, Tomb Kings.
- Open data questions that need those PDFs: Tomb Guard Chariot weapon costs (+2 flat
  vs per model); Bretonnia "Bohemund" vs "Bohemond", and Pegasus WS 4 vs 3; untyped
  Arcane Items in Estalia (5) and Ogre Kingdoms (2); mounts with no profile (High
  Elves White Lion Chariot and Star Dragon, Tomb Kings Chariot of the Liche King,
  Dwarfs Oathstone and Beer Cart); short lores in Skaven, Orcs & Goblins, Bretonnia.
- An item's `only` that names anything other than a character profile (a sub-species,
  a clan, a vow), and the `restrict` note on three common items, are shown but not
  enforced.
- Saves made before picks were stored by name are repaired only for lists that have an
  `orderBefore`; old share links cannot be repaired.
