# Chaos Dwarfs — unit combat analysis

Core, Special and Rare only. No characters, no special characters.

- **Resilience** = effective wounds per 100 pts vs attack Strength 3/4/5/6
  (`W / (P(wound) × P(all saves fail))`, divided by cost).
- **Damage** = expected unsaved wounds per 100 pts against seven benchmark targets.

Unlike the Daemons book (uniformly Daemonic), Chaos Dwarf reliability genuinely
varies — Leadership 3-10, Stubborn, Unbreakable and Treacherous Gits all appear — so
the resilience table carries two extra columns:

- **Hold** = probability the unit stays and fights instead of breaking and being run
  down (from Leadership + Stubborn / Unbreakable / Resolute / Treacherous Gits; units
  on their own Ld).
- **ADJ** = AVG × Hold, i.e. realised durability once morale is accounted for.

**AVG is the plain average of the S3-S6 columns and is unaffected by Hold** — the
table is still ranked by AVG, with ADJ shown alongside as the "what you actually get"
figure. The gap between them exposes cheap low-Ld chaff (Goblin/Orc Slaves,
Cutthroats) whose raw durability evaporates once it runs. Add `--general-ld 9` to the
analyzer to model an Inspiring Presence bubble.

## Resilience — effective wounds per 100 pts

| Unit | Cost | AVG | Hold | ADJ | S3 | S4 | S5 | S6 |
|---|---|---|---|---|---|---|---|---|
| Bull Centaur Renders (med+shield) | 56 | **68.6** | 0.42 | 28.6 | 192.9 | 48.2 | 21.4 | 12.1 |
| Goblin Slaves (shield) | 3 | **52.5** | 0.00 | 0.0 | 80.0 | 50.0 | 40.0 | 40.0 |
| Bolt Throwa (war machine) | 35 | **45.0** | 0.42 | 18.8 | 51.4 | 51.4 | 51.4 | 25.7 |
| Cutthroats (shield+light) | 4 | **45.0** | 0.15 | 6.7 | 75.0 | 45.0 | 30.0 | 30.0 |
| Warriors + Infernal Cohort (hvy+shield) | 9.5 | **43.9** | 0.72 | 31.7 | 94.7 | 42.1 | 23.7 | 15.2 |
| Infernal Guard (hvy+shield) | 11 | **37.9** | 0.72 | 27.4 | 81.8 | 36.4 | 20.5 | 13.1 |
| Warriors (med+shield) | 8 | **37.5** | 0.72 | 27.1 | 75.0 | 37.5 | 22.5 | 15.0 |
| Archers (shortbow, light) | 5 | **31.5** | 0.15 | 4.7 | 48.0 | 30.0 | 24.0 | 24.0 |
| Black Orcs (hvy+shield) | 13.5 | **30.9** | 0.42 | 12.9 | 66.7 | 29.6 | 16.7 | 10.7 |
| Orc Slaves (AHW) | 7 | **29.6** | 0.03 | 0.8 | 51.4 | 28.6 | 21.4 | 17.1 |
| Sneaky Gits (2HW, poison) | 5 | **29.5** | 0.15 | 4.4 | 40.0 | 30.0 | 24.0 | 24.0 |
| Hellcannon | 190 | **26.2** | 0.90 | 23.6 | 47.4 | 35.5 | 14.2 | 7.9 |
| Ogre Slaves (GW) | 27 | **23.1** | 0.03 | 0.6 | 40.0 | 22.2 | 16.7 | 13.3 |
| Kolossus | 250 | **22.5** | 1.00 | 22.5 | 34.6 | 25.9 | 20.7 | 8.6 |
| Razers (blunderbuss, med armour) | 12 | **20.0** | 0.72 | 14.4 | 37.5 | 20.0 | 12.5 | 10.0 |
| Devastators (Bazuka) | 25 | **19.2** | 0.72 | 13.9 | 36.0 | 19.2 | 12.0 | 9.6 |
| Bull Centaurs (med+shield) | 22 | **19.0** | 0.42 | 7.9 | 40.9 | 18.2 | 10.2 | 6.5 |
| Immortals (GW, heavy) | 16 | **18.8** | 0.83 | 15.6 | 37.5 | 18.7 | 11.2 | 7.5 |
| K'daai Fireborn | 50 | **18.7** | 0.90 | 16.8 | 32.4 | 18.0 | 13.5 | 10.8 |
| Juggernaut Siege Tower | 230 | **18.5** | 1.00 | 18.5 | 26.1 | 26.1 | 13.0 | 8.7 |
| K'daai Destroyer | 265 | **18.0** | 0.90 | 16.2 | 30.6 | 24.5 | 10.2 | 6.8 |
| Zealot Berzerkers | 12 | **17.3** | 0.72 | 12.5 | 30.0 | 16.7 | 12.5 | 10.0 |
| Wolf Raiders (light lance) | 10.5 | **17.1** | 0.15 | 2.6 | 28.6 | 17.1 | 11.4 | 11.4 |
| Deathshrieker Rocket (war machine) | 95 | **16.6** | 0.83 | 13.8 | 18.9 | 18.9 | 18.9 | 9.5 |
| Whirlwind / Tenderiser | 100 | **16.1** | 0.42 | 6.7 | 36.0 | 14.4 | 8.0 | 6.0 |
| Magma Cannon (war machine) | 100 | **15.8** | 0.83 | 13.1 | 18.0 | 18.0 | 18.0 | 9.0 |
| Siege Giant | 200 | **13.6** | 0.92 | 12.5 | 21.6 | 18.0 | 9.0 | 6.0 |
| Iron Daemon | 190 | **13.4** | 1.00 | 13.4 | 18.9 | 18.9 | 9.5 | 6.3 |
| Dreadquake Mortar (war machine) | 130 | **12.1** | 0.83 | 10.1 | 13.8 | 13.8 | 13.8 | 6.9 |
| Lammasu | 155 | **8.1** | 0.42 | 3.4 | 15.5 | 7.7 | 5.2 | 3.9 |

## Melee damage — wounds per 100 pts

| Unit | Cost | AVG | LtInf | HvInf | HvCav | MoCav | Monst | Resil | HiT |
|---|---|---|---|---|---|---|---|---|---|
| Zealot Berzerkers (2HW, charge) | 12 | **6.3** | 12.3 | 5.6 | 4.9 | 4.7 | 2.5 | 4.9 | 9.3 |
| Immortals (GW, 1st round) | 16 | **5.5** | 6.9 | 5.8 | 4.6 | 4.3 | 4.2 | 5.6 | 6.9 |
| Zealot Berzerkers (2HW, sustained) | 12 | **4.7** | 9.3 | 4.2 | 3.7 | 3.1 | 1.9 | 3.7 | 6.9 |
| Sneaky Gits (2HW, poison) | 5 | **4.4** | 8.9 | 3.3 | 2.2 | 3.3 | 3.3 | 3.3 | 6.7 |
| Ogre Slaves (GW, 1st round) | 30 | **4.4** | 6.0 | 4.3 | 3.5 | 4.3 | 2.9 | 4.1 | 5.6 |
| Orc Slaves (AHW) | 7 | **4.1** | 7.9 | 3.6 | 3.2 | 3.6 | 1.6 | 3.2 | 6.0 |
| Immortals (GW, sustained) | 16 | **4.0** | 6.9 | 3.7 | 3.5 | 2.8 | 2.3 | 3.5 | 5.6 |
| Goblin Slaves (shield) | 2 | **3.5** | 8.3 | 2.8 | 2.1 | 1.9 | 2.1 | 2.1 | 5.6 |
| Black Orcs (GW, 1st round, Mighty Blow ×2) | 13 | **3.3** | 4.3 | 3.2 | 2.7 | 3.2 | 2.6 | 3.2 | 4.3 |
| Infernal Guard (GW, 1st round) | 13 | **2.9** | 4.3 | 2.7 | 2.1 | 2.7 | 1.9 | 2.6 | 4.3 |
| Wolf Raiders (light lance, charge) | 10 | **2.9** | 5.6 | 2.5 | 2.2 | 2.5 | 1.1 | 2.2 | 4.2 |
| Warriors (GW, 1st round) | 10 | **2.9** | 5.6 | 2.2 | 2.1 | 2.2 | 1.4 | 2.1 | 4.4 |
| Bull Centaurs (AHW) | 20 | **2.5** | 5.6 | 1.9 | 1.7 | 1.9 | 0.8 | 1.7 | 4.2 |
| Ogre Slaves (GW, sustained) | 30 | **2.5** | 4.2 | 2.2 | 2.1 | 2.2 | 1.4 | 2.1 | 3.3 |
| Infernal Guard (hvy+shield) | 13 | **2.2** | 4.3 | 1.7 | 1.6 | 1.7 | 1.1 | 1.6 | 3.4 |
| Black Orcs (hvy+shield, sustained) | 13 | **2.2** | 4.3 | 1.7 | 1.6 | 1.7 | 1.1 | 1.6 | 3.4 |
| Whirlwind (Bull Centaur, charge) | 100 | **2.1** | 3.7 | 1.8 | 1.7 | 1.8 | 1.1 | 1.7 | 2.9 |
| Bull Centaur Renders (GW, 1st round) | 56 | **2.0** | 3.0 | 1.9 | 1.5 | 1.9 | 1.3 | 1.8 | 3.0 |
| K'daai Fireborn | 50 | **2.0** | 4.0 | 1.6 | 1.4 | 1.6 | 1.0 | 1.4 | 3.1 |
| K'daai Destroyer (+Stomp) | 265 | **2.0** | 2.5 | 2.4 | 2.0 | 1.0 | 1.0 | 2.4 | 2.4 |
| Cutthroats (shield+light) | 4 | **1.8** | 4.2 | 1.4 | 1.0 | 1.4 | 1.0 | 1.0 | 2.8 |
| Iron Daemon (charge, impact) | 190 | **1.7** | 2.2 | 1.7 | 1.4 | 1.7 | 1.2 | 1.6 | 2.1 |
| Tenderizer (Bull Centaur, charge) | 100 | **1.7** | 2.4 | 1.6 | 1.3 | 1.6 | 1.1 | 1.6 | 2.2 |
| Warriors (med+shield) | 10 | **1.7** | 3.7 | 1.2 | 1.1 | 1.2 | 0.6 | 1.1 | 2.8 |
| Archers (shortbow, light) | 4.5 | **1.6** | 3.7 | 1.2 | 0.9 | 1.2 | 0.9 | 0.9 | 2.5 |
| Kolossus (+Stomp, bane maces AP1) | 250 | **1.5** | 2.3 | 1.8 | 1.5 | 0.8 | 0.5 | 1.6 | 2.3 |
| Wolf Raiders (sustained) | 10 | **1.5** | 3.3 | 1.1 | 0.8 | 1.1 | 0.8 | 0.8 | 2.2 |
| Bull Centaur Renders (med+shield, AHW) | 50 | **1.3** | 3.0 | 1.0 | 0.9 | 1.0 | 0.4 | 0.9 | 2.2 |
| Iron Daemon (grind, stomp) | 190 | **1.0** | 1.8 | 1.3 | 1.1 | 0.1 | 0.0 | 1.3 | 1.7 |
| Razers (blunderbuss) | 11 | **0.8** | 2.0 | 0.5 | 0.4 | 0.5 | 0.4 | 0.4 | 1.3 |
| Hellcannon | 190 | **0.8** | 1.5 | 0.6 | 0.5 | 0.6 | 0.4 | 0.5 | 1.2 |
| Lammasu | 155 | **0.3** | 0.5 | 0.3 | 0.3 | 0.3 | 0.2 | 0.3 | 0.4 |

## Ranged damage — wounds per 100 pts

| Unit | Cost | AVG | LtInf | HvInf | HvCav | MoCav | Monst | Resil | HiT |
|---|---|---|---|---|---|---|---|---|---|
| Dreadquake Mortar (war machine) | 130 | **13.5** | 13.5 | 13.5 | 13.5 | 13.5 | 13.5 | 13.5 | 13.5 |
| Devastators (Earthshaker Mortar) | 65 | **9.1** | 10.3 | 10.3 | 8.5 | 10.3 | 6.2 | 8.2 | 10.3 |
| Deathshrieker Rocket (war machine) | 95 | **7.0** | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 |
| Magma Cannon (war machine) | 100 | **4.0** | 6.7 | 3.6 | 3.3 | 3.6 | 2.2 | 3.3 | 5.3 |
| Hellcannon (doomfire) | 190 | **3.7** | 6.1 | 3.3 | 3.1 | 3.3 | 2.0 | 3.1 | 4.9 |
| Devastators (Bazuka) | 25 | **3.2** | 3.3 | 3.3 | 2.8 | 3.3 | 2.7 | 3.3 | 3.3 |
| Devastators (Inferno Gun) | 50 | **3.0** | 5.0 | 2.7 | 2.5 | 2.7 | 1.7 | 2.5 | 4.0 |
| Sneaky Gits (throwing, poison) | 5 | **2.2** | 4.4 | 1.7 | 1.1 | 1.7 | 1.7 | 1.7 | 3.3 |
| Bolt Throwa | 35 | **2.0** | 2.4 | 2.0 | 1.6 | 2.0 | 1.4 | 1.9 | 2.4 |
| Infernal Guard (fireglaive) | 14 | **1.8** | 3.0 | 1.6 | 1.5 | 1.6 | 1.0 | 1.5 | 2.4 |
| Cutthroats (throwing) | 4.5 | **1.6** | 3.7 | 1.2 | 0.9 | 1.2 | 0.9 | 0.9 | 2.5 |
| Archers (shortbow) | 4.5 | **1.6** | 3.7 | 1.2 | 0.9 | 1.2 | 0.9 | 0.9 | 2.5 |
| Juggernaut Siege Tower (siege cannons) | 230 | **1.4** | 1.4 | 1.4 | 1.2 | 1.4 | 1.2 | 1.4 | 1.4 |
| Razers (blunderbuss) | 11 | **1.3** | 2.5 | 1.1 | 1.0 | 1.1 | 0.5 | 1.0 | 1.9 |
| Iron Daemon (steam cannonade) | 190 | **1.2** | 2.0 | 1.1 | 1.0 | 1.1 | 0.7 | 1.0 | 1.6 |
| Wolf Raiders (shortbow) | 10 | **0.7** | 1.7 | 0.6 | 0.4 | 0.6 | 0.4 | 0.4 | 1.1 |

## Method & assumptions

Scope: **Core, Special and Rare only.** Source: `data/chaos-dwarfs.js`, cross-checked
against `reference/Army books/` and the 9th Ed 3.0 rulebook. Benchmark targets:
LtInf (WS3 T3 5+), HvInf (WS4 T4 3+), HvCav (WS4 T3 2+), MoCav (WS5 T4 3+), Monst
(WS4 T6 4+), Resil (WS4 T5 4+), HiT (WS3 T4 5+). Resilience is vs Strength 3-6.

**Army-wide rules applied**

- **Great weapon = S+1 with Mighty Blow (1)** (`rules-common.js`): +2 Strength in the
  first round, +1 sustained — *not* a flat +2. GW users appear twice, `(1st round)`
  and `(sustained)`.
- **Black Orcs** carry their own Mighty Blow (1); with a great weapon that stacks to
  Mighty Blow (2), so first round = base +1 (GW) +2 (both Mighty Blows) = **S7**,
  sustained = **S5**.
- **Fireglaive** = +1 Strength in combat (two hands) and a Strength 5, 9/18",
  Ponderous shot — modelled as the Infernal Guard ranged option.
- **Resolute** (Warriors, Infernal Guard, Razers, Zealots, Devastators) counts a lost
  combat as 1 less → `hold: resolute`. **Immortals** are Stubborn; **K'daai, Iron
  Daemon, Juggernaut, Kolossus** are Unbreakable (Kolossus via Animated Construct);
  **Cutthroats / Archers / Wolf Raiders** have Treacherous Gits (0.90 hold penalty).
- **Daemonic** (K'daai) = Magical Ward (5+) + Unbreakable. **Hellbound** (Kolossus) =
  Magical Ward (6+). Wards are unmodified by Strength, so they hold up against S6+
  where armour collapses.
- **Blackshard Armour** (Infernal Guard, Immortals) = Immunity (Flaming Attacks); no
  effect on these benchmarks, not modelled.

**Troop-type rules applied**

- Cavalry / Monstrous Cavalry use the **highest Toughness and Wounds** of rider or
  mount. Natural Armour (Bull Centaurs 6+, Renders 5+) **stacks** with worn armour —
  which is how Renders reach a 2+ save (medium +2, shield +1, Natural 5+ = +2).
- Monsters get **Stomp (D6)** = 3.5 auto-hits at their own Strength vs targets with
  Line of Sight ≤ 3 (K'daai Destroyer S7, Kolossus S6). The **Iron Daemon's Grind
  Attack** is the same Stomp (S6) but only in a turn it does not charge — hence its
  separate `(grind, stomp)` row, which is empty in the MoCav/Monst columns.

**Stated estimates (not book quotes)**

- Impact Hits: Iron Daemon D6+1 → 4.5 (S6); Whirlwind D6 → 3.5 (S5); Tenderizer D3 →
  2 (S6, MW D3); Ogre Charge → 1 (S4).
- Steam cannonade ≈ 9 shots at S5 (Artillery Dice + D6, rapid fire). Inferno Gun ≈ 6
  shots (Artillery Dice) at S5.
- Template war machines (models hit): Magma Cannon ≈ 4 (S5, MW D3); Deathshrieker ≈ 4
  (S8, MW D3); Dreadquake ≈ 6 (S8, AP1, MW D6); Hellcannon doomfire ≈ 4 (S5, MW D6);
  Earthshaker ≈ 4 (S6, AP1, MW D3). Cannon/bolt profiles (Bolt Throwa S6 MW D3,
  Juggernaut Siege Cannons 4×S7 MW D3) are approximate — all swing with scatter and
  misfire.
- Multiple Wounds counted uncapped (D3 → 2, D6 → 3.5), i.e. wounds inflicted, not
  models killed — this overstates them against single-wound targets.

**Deliberate omissions**

- **Warriors + Infernal Cohort** (heavy armour, +1.5/model, one unit per Despot) is
  *included* — heavy+shield = 3+ save at 9.5 pts, the cheapest 3+ body in the book —
  but note it requires a Despot character in the list.
- **Killing Blow, Poisoned Attacks' full interactions, magic standards, command
  upgrades, and the other character-dependent host upgrades** (Granite Guard,
  Ironsworn, Hashut's Dark Ravagers, Blazing Beards) are excluded; costs are the plain
  per-model / per-unit price.
- **Siege Giant's random `*` attacks** (club/yell/jump giant special attacks) are not
  modelled, so it appears in resilience only.
- Magic Resistance (Lammasu) is not modelled — it only affects magic.

Input file: `chaos-dwarfs-analysis-input.json`.
