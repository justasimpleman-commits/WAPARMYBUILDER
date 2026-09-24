# Warhammer Army Builder

A web app for building armies for Warhammer 9th Edition 3.0 (Mathias Eliasson's
unofficial ruleset). Assemble a list, get live points and composition maths, have
the list-building rules enforced as you go, save/load armies, share a list as a
link, and export a text list.

There is no build step. Open `index.html` in a browser (it works straight from
`file://`), or serve the folder. The hosted copy is published by GitHub Pages. The
same page is also wrapped as an Android app with Capacitor (see `mobile/README.md`).

Sixteen army books are bundled and chosen from the **Army** dropdown in the header:
Chaos Dwarfs, Grand Cathay, Daemons of Chaos, Beastmen, Ogre Kingdoms, Orcs &
Goblins, Skaven, High Elves, Dark Elves, Tomb Kings, Vampire Counts, Bretonnia,
Wood Elves, Dwarfs, Lizardmen and Estalia. Only the chosen book is downloaded.
Switching armies clears the current roster (you are asked first). Each army needs
exactly one character nominated as the **Army General** (the radio on each
character entry); it is shown with ★ in the summary and `[General]` in the export.

## Folder layout

```
index.html           the page: markup + <script>/<link> tags (no inline code)
mobile-init.js       phone layout (drawers, ☰ menu, Android Back) — self-activates on narrow screens
css/app.css          styles
js/                  the engine, split by concern (loaded in this order)
  core.js              state, book loader, update()/undo/redo, dirty tracking
  engine.js            rules: points, budgets, items, runes, gating, validation (no DOM)
  rules.js             rule / equipment glossary lookup, clickable tokens
  modals.js            modals, the shared item picker, rune picker, detail popups, toasts
  roster.js            render(): catalogue, bars, entry cards, summary, validation panel
  storage.js           library, .json files, autosave draft, share links, export
  app.js               army switching, header controls, start-up
data/                all data (the engine reads these)
  books.js             the registry of bundled books (id, name, file)
  lores-common.js      the 8 shared rulebook Lores of Magic
  rules-common.js      shared rulebook equipment & command rules
  special-rules-common.js  universal special-rules glossary
  common-items.js      descriptions of the common rulebook magic items
  <book>.js            one file per army book
docs/                SCHEMA.md (field reference), DATA-MAPPING.md (extraction playbook)
scripts/             test-engine.js (test harness), sweep.js, release helpers
build/               release.command (version bump + Android build), build-android.command
mobile/              Capacitor Android build (wraps the same page) — see mobile/README.md
reference/           source PDFs + a printable stats/logic .docx (not shipped)
```

The app is a generic **engine** (`js/`) driven by **data files** in `data/`.
Adding another book means writing one `data/<book>.js` file and adding one line to
`data/books.js`; the engine doesn't change. See `CLAUDE.md` and `docs/SCHEMA.md`.

## Using it

- **Catalogue** (left): search box, **+** to add, **i** for stats and rules. Badges
  show how many of a unit you have, Special/Rare duplicates against the game-size
  cap (e.g. `2/3`), and a special character already in the army is greyed out.
- **Roster** (centre): each unit's options, mounts, magic items and spells. Every
  change can be undone: **↶ / ↷** in the header, **Ctrl/⌘+Z** and
  **Ctrl/⌘+Shift+Z**, or **Undo** on the message after removing a unit.
- **Summary & validation** (right): click a validation message about a unit to
  jump to it.
- **Points limit**: type a value or pick a preset (1000–4000).

## Saving, loading & sharing

- **Save** → quick-save to the named **Library** (stored in this browser, in IndexedDB).
- **Library…** → saved armies for the current book: **Load** or **Delete**.
- **Save to file… / Open file…** → download or open a `.json` army (for backups
  or moving between devices).
- **Share link** → copies a link with the whole army packed into it; whoever opens
  it gets the army loaded (nothing is uploaded). Share from the hosted site — a
  link made from a local `file://` copy only works on that computer.
- **Export list** → the text summary, downloaded and copied to the clipboard.
- Unsaved work is autosaved in the browser and restored on your next visit; the
  status line and tab title show "●" when there are unsaved changes, and the
  browser warns before closing.

Army files are JSON:
`{ app, version, army, name, savedAt, limit, points, uidc, generalUid, state }`.
They are namespaced per army; loading a list for another bundled book switches to
it automatically.

## What the engine enforces

Category caps (Characters ≤35%, Core ≥25% warning, Special ≤50%, Rare ≤25%); the
25% single-unit cost limit; unit size min/max (the model stepper is clamped to the
allowed range); duplicate Special/Rare caps by game size; special characters
unique; army-wide magic-item uniqueness (common `*` items exempt); per-character
magic-item budgets (the picker disables items you can't afford); one item per
category per model; Expendable Core needs a non-Expendable Core unit; slave units ≤
Hobgoblin Cutthroat/Archer units; exactly one Army General.

**Magic & spells.** Wizards know their lore's **signature spell and lore
attribute automatically** (neither counts against the pick limit). A level-N
wizard then chooses **N** more spells, plus **one extra per spell-granting magic
item** it carries (e.g. the Spell Familiar). The **Arcane Familiar** adds a
separate pick: one signature spell from any of the eight Winds of Magic.
**Arcane Items** come in three types (**Relic**, **Charm**, **Staff**) and a
wizard may carry one of each. Magic standards are for the BSB (no points limit) or
a unit's standard bearer (within its banner budget).

## Verifying changes

```
node --check data/*.js js/*.js mobile-init.js
node scripts/test-engine.js     # or: npm test
node mobile/sync-web.js         # keep the Android copy in step
```

The engine is tested in Node with a small DOM stub. The harness loads every book,
runs points maths, validation, the army-specific systems, undo/redo, share-link
round-trips and more. See `CLAUDE.md → Verifying changes`.
