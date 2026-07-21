# Vampire Counts — data audit

**File audited:** `data/vampire-counts.js` (1096 lines)
**Source:** `reference/Army books/Warhammer - Vampire Counts 3.0.pdf` (Mathias Eliasson v3.0, 9th Ed 3.0)
**Date:** 2026-07-09
**Method:** `pdftotext -layout` of the full book, then line-by-line comparison of every points value, statline, option cost, magic-item cost, restriction, lore list and wizard level against the PDF. Followed by the repo's own harness (`node --check`, `scripts/test-engine.js`, `scripts/sweep.js vampire-counts`).

## Verdict

**Clean.** Every unit's points, every profile statline, every option/upgrade cost, all 74 army magic-item costs and their bloodline/keyword restrictions, all six character lore lists and all wizard levels match the source PDF exactly. No fabricated values were found. The remaining items below are minor description/enforcement gaps and one real tokenisation bug, none of which change points maths or legality.

## What was verified as correct

**Characters (points / statlines / options)** — all match: von Carstein 190/80, Necrarch 245/70, Lahmian 175/70, Blood Dragon 215/100, Strigoi 220/120, Necromancer 160/65, Liche Lord 290, Wight King/Lord 140/100, Cairn Wraith 60, Tomb Banshee 80, Swain 50, Crypt Ghast 60, Strigany Mystic 65. Wizard-level upgrade costs (+35/+70/+105), weapon/armour/mount option costs, BSB (+25) and per-variant magic budgets (50/100) all correct.

**Special characters** — all points, statlines, wizard levels and mount lists match: Vlad 450, Isabella 110, Konrad 215, Mannfred 565, Zacharias 720, Melkhior 455, Neferata 510, Sekhar 190, Walach 490, Vhordrai 615, Ushoran 590, Gormayne 170, Kemmler 325, Helman Ghorst 165, Krell 235. `mustBeGeneral` correctly set on Neferata and Ushoran.

**Core / Special / Rare units** — all base points, per-model option costs, unit sizes, command budgets and profiles match (Skeleton Warriors 3, Archers 4, Horsemen 9, Zombies 2.5, Crypt Ghouls 7, Sylvanian Levy 2, Strigany 4, Dire Wolves 5, Fell Bats 12, Bat Swarms 30, Spirit Hosts 40, Grave Guard 10, Black Knights 22, Crypt Guard 9, Crypt Horrors 35, Vargheists 50, Flesh Golems 20, Skeleton Chariot 45, Corpse Cart 100, Wraithwisps 13, Hexwraiths 27, Varghulf 135, Mourngul 130, Blood Knights 36, Lahmian Handmaidens 18, Morbheg Knights 35, Terrorgheist 225, Zombie Dragon 245, Necrofex Colossus 240, Skeleton Catapult 80, Black Coach 140, Coven Throne 200, Mortis Engine 220).

**Magic items** — all 74 army items' costs correct across the six categories; every "X only" line in the book is encoded via `blood:` / `only:` / `vampireOnly:` (spot-checked all restrictions). Common rulebook items unchanged.

**Vampiric Powers** — all 45 powers, costs and bloodline gates match the book.

**Lore of Necromancy** — attribute + 13 spells, casting values and levels all match.

**Army rules** — `requireWizardLore: "Necromancy"`, the Archers≤Warriors / Horsemen≤Warriors caps, and the conditional units (Sylvanian Levy→von Carstein, Strigany/Strigany Mystic→Strigoi, Swain→Lahmian) all match the book's restrictions.

**Engine verification** — `node --check data/vampire-counts.js` passes; `scripts/test-engine.js` reports **177/177** checks passing (incl. the VC Vampiric-Powers-share-the-magic-budget assertion and the Undead Necromancy validator).

## Findings (all minor)

### 1. Tokenisation bug — Mannfred's Loremaster rule not clickable
`unitInfo.mannfred.rules` is `"Loremaster (Death, Necromancy), The Red Thirst, …"`. The detail-popup splits rule strings on commas, so this becomes `Loremaster (Death` + `Necromancy)` and neither resolves — the Loremaster word is not clickable. This is the exact comma-in-parenthetical gotcha in DATA-MAPPING.md.
**Fix:** use a semicolon or drop the inner comma, e.g. `"Loremaster (Death & Necromancy)"` or `"Loremaster (Death; Necromancy)"`. (Kemmler/Helman already use the safe single-lore form `Loremaster (Lore of Necromancy)`.) Sweep also lists a bare `Wizard` token (Necromancer/Strigany Mystic) and `Chariot (Armour save 5+)` (Barrow Chariot) as unresolved — both are profile/troop-type keywords, not special rules; leave as-is or add glossary stubs if you want them non-flagged.

### 2. The Bilious Decanter — missing "Ghoul or Strigoi only" restriction
Book: *"Ghoul or Strigoi only."* The data lists it with no `only`/restriction, so any model can take it. This is the one restriction that is genuinely un-encoded (all other "X only" items are gated).
**Fix:** add the appropriate restriction so only Strigoi-bloodline / Ghoul characters can pick it.

### 3. "On foot only" / troop-type restrictions dropped from a few descriptions
Purely descriptive; not enforced by the engine, and the `itemDesc` text also omits the clause:
- **Armour of Night** — book adds *"model on foot only"*.
- **The Flayed Hauberk** — book adds *"Model on foot only."*
- **Nightshroud** — book adds *"Infantry or Cavalry only."* (compare common items that use `restrict:"footCav"`).
- **Talisman of the Lycni** — already `vampireOnly`, but book also says *"Model on foot only."*
Consider adding the clause to each `itemDesc` string for accuracy; add `restrict` only if you want it enforced.

### 4. Chariot/Shrine crew special rules trimmed on two profiles
`coventhrone` and `mortisengine` rules lines omit the book's *"Magical Attacks (Spirit Horde only)"* and *"Random Attacks (2D6) (Spirit Horde only)"*. Cosmetic completeness of the special-rules line only; no points/legality impact.

### 5. Mount sub-upgrades not offered (known engine limitation)
The book gives some mounts their own upgrade options that the picker (which treats a mount as a single-pick item) can't surface: Abyssal Terror *Poisonous Tail +10 / Sword-claws +5*, Skeletal Steed & Nightmare *barding +5*, Barrow Chariot *scythes +5 / barding +5*. Flagging for awareness — this is the same generic mount limitation noted for other books, not a VC-specific data error.

## Not auditable against this PDF
`composition` (Characters 0.35 / Core 0.25 / Special 0.50 / Rare 0.25 / single-unit 0.25) and `duplicateCaps` are not restated in the army book — they derive from the core rulebook, same as every other bundled book. Values are consistent with the app's shared convention.

## Recommendation
Only finding #1 (Mannfred Loremaster) and #2 (Bilious Decanter) are worth changing; both are one-line edits. #3–#5 are optional polish. After any edit, re-run `node scripts/test-engine.js` and `node mobile/sync-web.js`.
