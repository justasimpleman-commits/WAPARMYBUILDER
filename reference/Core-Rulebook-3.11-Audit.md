# Core Rulebook Audit — 9th Edition 3.11 vs current data

Date: 2026-07-09. Scope requested: basic rules, universal special rules, common
magic items, lores of magic. Method: `pdftotext -layout` on the 3.0, 3.1 and new
3.11 rulebooks, then section-by-section diff against the data files
(`rules-common.js`, `special-rules-common.js`, `common-items.js`,
`lores-common.js`, `chaos-dwarfs.js`).

## Bottom line

The bundled data is built at the **3.1** level (the two common-rules files say so
in their headers, and the item/lore content already carries 3.1-era values). The
entire **magic-items and lores-of-magic region of the rulebook is byte-identical
between 3.1 and 3.11** — nothing to change there. The only data-relevant deltas
from 3.1 to 3.11 are **two small wording changes in the special-rules section**.
Per your instruction this report leaves the data untouched.

## Basic rules — no data impact

Close-combat weapons, missile weapons, armour and command (Leader / Standard /
Musician) in 3.11 match `rules-common.js` verbatim. Two core-rules changes exist
in 3.11 but are **movement mechanics the builder does not encode**, so no data
change is needed:

- **Charge / flee / pursuit distances now scale with Movement.** 3.11 splits the
  charge table: Charging (M5 and below) = Move + 2D6 choose highest; Charging (M6
  and above) = Move + 2D6; Failed Charge similarly split; **Fleeing / Pursuing =
  Move + D6** (was a flat 2D6 in 3.1). This is core movement, not list-building.
- **Challenges** gained a clarification that a character cannot refuse a challenge
  if they cannot be placed out of base contact. Gameplay only.

## Universal special rules — 2 stale spots (not fixed, per request)

Everything in the special-rules glossary matches 3.11 except:

1. **Swiftstride — wording changed.**
   - 3.1 (current data, `special-rules-common.js` ~line 348): *"…may re-roll the
     lowest dice."*
   - 3.11: *"…may re-roll 1's when determining the result of the distance they
     move."*
   - This is a genuine mechanical rewording (re-roll only 1s, not the lowest die).

2. **"Free Turn" renamed to "Swift Manoeuvre".**
   - The Fly rule's cross-reference in `special-rules-common.js` (~line 482) still
     reads *"…Loose Formation, Skirmishers & Combat, Free Turn."*
   - 3.11 renames that movement rule to **Swift Manoeuvre** (the data already uses
     "Swift Manoeuvre" as the sub-header elsewhere, so this is now inconsistent).

Related, out of strict scope: Beastmen's **Mark of Slaanesh** (`beastmen.js`) uses
the old "re-roll the lowest dice on their charge and pursuit distances" phrasing
that mirrors the old Swiftstride. Whether it should follow the new "re-roll 1's"
wording is governed by the Beastmen army book, not the core rulebook — flagging it
only because the phrasing is linked.

## Common magic items — no change

The magic-items section (pp.115–118) is **identical between 3.1 and 3.11**. The
data already carries the current values (e.g. Dawnstone 15 pts, common,
Infantry/MI/Cavalry, "re-roll 1's" — the 3.0→3.1 change was already applied;
Talisman of Endurance 25, Obsidian Amulet 20, Opal Amulet 15 common, Seed of
Rebirth 10 common all match). No action.

## Lores of magic — no change

The eight lores (pp.119–126) are **byte-identical between 3.1 and 3.11** (verified
by diffing "The Lore of Fire" through end-of-file: exit 0). `lores-common.js`
already reflects current content (e.g. "The Purple Sun of Xereus"). Its header
comment still says "3.0" — a stale comment only, not a data issue. No action.

## Files changed

- `reference/Army books/`: deleted the 3.0 and 3.1 core rulebooks; added
  `Warhammer - The Game of Fantasy Battles - 9th Edition 3.11.pdf`.
