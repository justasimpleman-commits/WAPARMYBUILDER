# Warhammer Army Builder — Desktop App

A cross-platform **Electron** desktop app (Windows + macOS) for building armies
for Warhammer 9th Edition 3.0 (Mathias Eliasson's unofficial ruleset). Assemble a
list, get live points and composition maths, have the list-building rules enforced
as you go, save/load armies, and export a text list.

Nine army books are bundled and chosen from the **Army** dropdown in the header:

- Chaos Dwarfs
- Grand Cathay
- Daemons of Chaos
- Beastmen
- Ogre Kingdoms
- Orcs & Goblins
- Skaven
- High Elves
- Dark Elves

Switching armies clears the current roster. Each army requires exactly one
character to be nominated as the **Army General** (the radio on each character
entry); it is shown with ★ in the summary and `[General]` in the export.

## Folder layout

```
Army builder/
  index.html           the whole app (UI, rules, points, validation, export)
  main.js              Electron main process (window, menu, file/library IPC)
  preload.js           safe bridge exposing window.armyAPI to the page
  package.json         deps + electron-builder config
  CLAUDE.md            engine + data architecture notes
  data/                all data files (engine reads these)
    lores-common.js      the 8 shared rulebook Lores of Magic
    rules-common.js      shared rulebook equipment & command rules (info popups)
    special-rules-common.js  universal special-rules glossary
    common-items.js      shared descriptions of the common rulebook magic items
    chaos-dwarfs.js  grand-cathay.js  daemons-of-chaos.js  beastmen.js
    ogre-kingdoms.js  orcs-and-goblins.js  skaven.js  high-elves.js
    dark-elves.js  tomb-kings.js  vampire-counts.js  bretonnia.js   (one per book)
  docs/                SCHEMA.md (field reference), DATA-MAPPING.md (extraction playbook)
  scripts/             test-engine.js (DOM-stub test harness), sweep.js
  build/               build-mac.command / build-win.bat (one-click installer builds)
  mobile/              Capacitor Android/iOS build (wraps the same web app) — see mobile/README.md
  reference/           source PDFs + a printable stats/logic .docx (not shipped)
```

The app is a generic **engine** (`index.html`) driven by **data files** in
`data/`. Adding another book means writing one `data/<book>.js` file and adding a
`<script src="data/…">` tag — the engine never changes. See `CLAUDE.md` and
`docs/SCHEMA.md`.

## Running from source

1. Install [Node.js LTS](https://nodejs.org).
2. From this folder:

   ```
   npm install      # first run downloads the Electron runtime (~100 MB)
   npm start        # launches the desktop app
   ```

`index.html` also opens directly in a browser for quick development; without the
Electron bridge it falls back to in-browser storage (IndexedDB) and file
download/upload. The desktop build adds native windows, menus, file dialogs and
an on-disk army library.

## Building installers

**Easiest:** double-click `build/build-mac.command` (macOS) or `build/build-win.bat`
(Windows). Each installs dependencies and produces the installer in `dist/`.
On macOS the first double-click may need: right-click → Open, to clear the
Gatekeeper warning.

Or run it manually (build on the matching OS — packaging is platform-specific):

```
npm run dist:mac     # → dist/*.dmg
npm run dist:win     # → dist/*.exe (nsis installer)
npm run dist:dir     # quick unpacked build, no installer, for testing
```

The packaged app bundles `index.html`, `main.js`, `preload.js`, `lores-common.js`
and all five army data files. The PDFs and `.docx` in `reference/` are excluded to
keep installers small.

### Icon (optional)
electron-builder uses a default icon. Add `build/icon.ico` (Windows) and
`build/icon.icns` (macOS), then rebuild.

### Code signing (optional)
Unsigned apps trigger an OS warning on first launch (SmartScreen on Windows,
Gatekeeper on macOS — right-click → Open). For distribution, sign with a Windows
code-signing cert / Apple Developer ID; see the electron-builder docs.

## Saving & loading

- **Save** → quick-save to the named **Library**.
- **Library…** → list saved armies for the current book, **Load** or **Delete**.
  In the desktop app these live in the OS user-data folder (survive app updates);
  in a plain browser they live in IndexedDB.
- **Save to file… / Open file…** → write or read a `.json` army anywhere on disk
  (for backups or sharing).
- **Export list** → the text summary, saved to a file you choose (and copied to
  the clipboard).

Army files are JSON:
`{ app, version, army, name, savedAt, limit, points, uidc, generalUid, state }`.
They are namespaced per army — loading a list for another bundled book switches
to it automatically.

## What the engine enforces

Category caps (Characters ≤35%, Core ≥25% warning, Special ≤50%, Rare ≤25%); the
25% single-unit cost limit; unit size min/max (the model stepper is clamped to the
allowed range); duplicate Special/Rare caps by game size; special characters
unique; army-wide magic-item uniqueness (common `*` items exempt); per-character
magic-item budgets with **affordability filtering** (each dropdown only offers
items you can still pay for); one item per category per model; Expendable Core
needs a non-Expendable Core unit; slave units ≤ Hobgoblin Cutthroat/Archer units;
exactly one Army General.

**Magic & spells.** Wizards know their lore's **signature spell and lore
attribute automatically** (neither counts against the pick limit); a level-N
wizard then chooses **N** more spells, plus **one extra per spell-granting magic
item** it carries (e.g. the Spell Familiar). The **Arcane Familiar** adds a
separate pick — one signature spell from any of the eight Winds of Magic. Small `i` buttons next to equipment and
command options show just that one rule. **Arcane Items** come in three types —
**Relic**, **Charm**, **Staff** —
and a wizard may carry one of each (up to three arcane items). Magic standards are
for the BSB (no points limit) or a unit's standard bearer (within its banner
budget).

## Verifying changes without a GUI

```
node --check data/*.js main.js preload.js
node scripts/test-engine.js
```

The renderer logic is verified with a Node DOM-stub harness (load every book, run
points maths, the General rule, arcane sub-slots, budget filtering, signature
spells, the Daemonic Gifts multi-pick shared budget, validation and army
switching). See `CLAUDE.md → Verifying changes`.
