# Changelog

All notable changes to **Warhammer Army Builder**. A new entry is added for **every
installer build**, and the version is stamped into the installer output filenames.

**Versioning (this project's convention).** The first number is reserved. A **major**
change bumps the **middle** number and resets the last to 0 (`1.4.0 → 1.5.0`); a
**minor** change bumps the **last** number (`1.5.0 → 1.5.1`). The build workflow asks
which kind each time.

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
