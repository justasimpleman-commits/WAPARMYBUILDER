# Changelog

All notable changes to **Warhammer Army Builder**. A new entry is added for **every
release**.

**Versioning (this project's convention).** The first number is reserved. A **major**
change bumps the **middle** number and resets the last to 0 (`1.4.0 → 1.5.0`); a
**minor** change bumps the **last** number (`1.5.0 → 1.5.1`). The build workflow asks
which kind each time. (2.0.0 was a one-off bump of the first number for the move to
a web-only app.)

## [2.0.0] — 2026-09-26

A big release: the app is now a web-only page (no installers), with a new game-day
view, undo/redo, share links and three new army books. The first number goes up to
mark the move to the web.

### Added
- **Game mode** (⚔ Game button in the header). A read-only view you can use at the
  table, with one compact card per unit. Each card shows the chosen profile's
  statline plus its mount, then equipment, special rules, magic items, the lore
  attribute and spells with casting values. Tap any rule, weapon, item or spell to
  read it. Buttons at the top jump to each unit.
- **Drag-and-drop reordering** of roster cards within a category: drag by the
  header, or press and hold on a phone. The order carries into the summary, export,
  share link and game mode.
- **Undo / redo** for every change: ↶ ↷ buttons, Ctrl/⌘+Z and Ctrl/⌘+Shift+Z, plus
  an Undo button after removing a unit or clearing the army.
- **Share link.** The whole army is packed into a link. Nothing is uploaded, and
  opening the link loads the army.
- **Catalogue search** and badges: how many of each unit you have, Special/Rare
  duplicates against the game-size cap, and special characters greyed out once
  taken.
- **Clickable validation messages** that jump to the unit concerned.
- **Points-limit presets** (1000–4000).
- **Magic weapon/armour type badges** (Heavy armour, Shield, Light lance…). Items a
  character can't use are shown disabled with the reason ("needs Shield") instead
  of being hidden.
- **New army books:** Lizardmen, Estalia and Dwarfs (with a Runic Items engine).
- **Loadout popup** for each roster entry, showing what that unit has actually
  bought.

### Changed
- **Web-only.** The Electron desktop app and the Android build were removed. The
  site runs from GitHub Pages or straight from `index.html`, with a phone drawer
  layout on narrow screens. Army books load on demand.
- **No "are you sure?" prompts.** Switching armies, loading an army and deleting a
  library army are undoable instead.
- **Chaos Dwarfs** and **Wood Elves** updated to army book v3.1 (points, unit sizes,
  options and rule text). Slave Overseers are now added automatically at the
  required ratio.
- Equipment-access rules for magic items were extended and re-checked in every book.
  Armour of Bone needs medium armour, except for Necromancers.

### Fixed
- Rune costs now add up correctly when the same rune is taken more than once.
- The Hobgoblins-only item restriction checks the unit keyword.
- Altar of Hashut rules and glossary entries completed.

## [1.5.0] — 2026-07-21

### Added
- **Equipment-access gating for magic items.** A magic weapon or armour that *is* a
  mundane type (heavy armour, great weapon, lance, shield, …) is now offered only to
  characters that can actually use that type — from base equipment or a buyable option.
  Each character carries an `access` list; items carry `requiresAccess`. Ineligible
  items are hidden from the picker and dropped from a loaded save. Armour is tiered
  (a heavy-armour model can still take a lighter magic armour). Applied across all 13
  books (~232 access lists, ~252 tagged items), including the shared rulebook armours.
- **Conditional lores.** A lore can be gated on a chosen option: the Goblin Shaman
  only sees *Bad Moon* with the Night-Goblin sub-species and *Spider God* with Forest
  Goblin; the Orc Shaman's *Savage Waaagh!* needs the Savage Orc upgrade; a god-aligned
  Daemon Prince / Exalted Daemon is locked to that god's Lore. Choosing the option off
  clears a now-illegal lore automatically (27 gates total).

### Fixed
- **Blood Dragon (Vampire Counts)** had heavy armour as base equipment but the data
  also charged a redundant "+18 heavy armour" option — removed; heavy armour is now
  base (reflected in its `access`).

### Build / tooling
- `scripts/sync-builds.js` — one command to refresh both installer folders and the
  mobile build from the repo root.
- `scripts/set-version.js` — set the version across all package.json files at once.
- `docs/BUILDING-INSTALLERS.md` + the `build-installers` skill now cover versioning
  and this changelog.

---

_Baseline: **1.4.0** was the last build before this changelog was introduced (all 13
books audited against their source PDFs; clickable rules/equipment; mobile + desktop)._
