# Daemons of Chaos — unit combat analysis

Core, Special and Rare only. No characters, no special characters.

- **RAW AVG** = effective wounds per 100 pts, averaged over attack Strength 3/4/5/6
  (`W / (P(wound) × P(all saves fail))`, divided by cost). **This column ranks the
  table.**
- **Hold / ADJ** = Daemonic Instability reliability. **Informational only — neither
  feeds the average nor the ordering.**
- **Damage** = expected unsaved wounds per 100 pts against seven benchmark targets.

## How to read Hold and ADJ

Daemons are Unbreakable — they never flee. Instead, a lost round of combat triggers a
**Daemonic Instability** test: a Break test (`2d6 ≤ Ld − loss margin`) where every
point failed by costs the unit one extra Wound, **no saves of any kind**.

`Hold` is the probability of taking **zero** extra wounds after losing a round by 2,
i.e. `P(2d6 ≤ Ld − 2)`. `ADJ` = RAW × Hold.

| Ld | Units | Hold (own Ld) | Hold (Ld 9 general nearby) |
|----|-------|---------------|----------------------------|
| 7 | almost everything | 0.28 | 0.58 |
| 6 | Chaos Furies | 0.17 | 0.58 |
| 5 | Imp Swarms | 0.08 | 0.58 |

Read ADJ as a **worst-case floor**, not a second ranking. It assumes the unit loses
the round; a unit that wins or draws takes no test at all, in which case RAW is the
honest number. What it does show is that Ld 7 is the real weakness of this army — even
a modest 2-point loss leaves a Daemon unit bleeding wounds 72% of the time, and the
5+ ward does not apply to those wounds.

**The single biggest lever in the book is an Inspiring Presence bubble.** Parking the
army inside a Ld 9 general's range takes Hold from 0.28 to 0.58 — it roughly doubles
every ADJ figure and pulls Imp Swarms (0.08 → 0.58) and Chaos Furies (0.17 → 0.58) back
from near-worthless to average. Nothing else in this analysis moves the numbers that far.

## Resilience — effective wounds per 100 pts  (RAW ranks the table; Hold & ADJ are informational and excluded from the average)

| Unit                            | Cost | RAW AVG |    S3 |   S4 |   S5 |   S6 | Hold |  ADJ |
|---------------------------------|------|---------|-------|------|------|------|------|------|
| Blood Chariot (charge, 1st rd)  |  145 |    66.3 | 186.2 | 46.6 | 20.7 | 11.6 | 0.28 | 18.4 |
| Brimstone Horrors               |   10 |    38.2 |  45.0 | 36.0 | 36.0 | 36.0 | 0.28 | 10.6 |
| Plague Chariot (charge)         |  130 |    35.3 |  83.1 | 31.2 | 16.6 | 10.4 | 0.28 |  9.8 |
| Imp Swarms                      |   35 |    32.8 |  38.6 | 30.9 | 30.9 | 30.9 | 0.08 |  2.7 |
| Beasts of Nurgle                |   55 |    30.7 |  58.9 | 29.5 | 19.6 | 14.7 | 0.28 |  8.5 |
| Plague Drones                   |   50 |    28.1 |  54.0 | 27.0 | 18.0 | 13.5 | 0.28 |  7.8 |
| Plague Toads (Core)             |   31 |    27.9 |  43.5 | 29.0 | 21.8 | 17.4 | 0.28 |  7.8 |
| Soul Grinder                    |  275 |    25.5 |  39.3 | 29.5 | 23.6 |  9.8 | 0.28 |  7.1 |
| Pox Riders                      |   35 |    24.7 |  38.6 | 25.7 | 19.3 | 15.4 | 0.28 |  6.9 |
| Nurglings                       |   50 |    22.9 |  27.0 | 21.6 | 21.6 | 21.6 | 0.28 |  6.4 |
| Plaguebearers                   |   13 |    22.2 |  34.6 | 23.1 | 17.3 | 13.8 | 0.28 |  6.2 |
| Brutes (GW, 1st rd)             |   40 |    21.7 |  33.8 | 22.5 | 16.9 | 13.5 | 0.28 |  6.0 |
| Bloodcrushers (1st rd)          |   55 |    19.6 |  36.8 | 19.6 | 12.3 |  9.8 | 0.28 |  5.5 |
| Daemonettes                     |   12 |    18.4 |  25.0 | 18.8 | 15.0 | 15.0 | 0.28 |  5.1 |
| Bloodletters (GW, 1st rd)       |   13 |    18.2 |  27.7 | 17.3 | 13.8 | 13.8 | 0.28 |  5.0 |
| Screamers                       |   32 |    18.0 |  28.1 | 18.7 | 14.1 | 11.2 | 0.28 |  5.0 |
| Flamers                         |   32 |    18.0 |  28.1 | 18.7 | 14.1 | 11.2 | 0.28 |  5.0 |
| Skull Cannon (melee, charge)    |  240 |    18.0 |  45.0 | 15.0 |  7.5 |  4.5 | 0.28 |  5.0 |
| Pink Horrors                    |   13 |    17.0 |  23.1 | 17.3 | 13.8 | 13.8 | 0.28 |  4.7 |
| Bloodbeasts (1st rd)            |   55 |    17.0 |  29.5 | 16.4 | 12.3 |  9.8 | 0.28 |  4.7 |
| Chaos Furies                    |   14 |    15.8 |  21.4 | 16.1 | 12.9 | 12.9 | 0.17 |  2.6 |
| Fiends                          |   55 |    15.8 |  24.5 | 16.4 | 12.3 |  9.8 | 0.28 |  4.4 |
| Firewyrms                       |   55 |    15.8 |  24.5 | 16.4 | 12.3 |  9.8 | 0.28 |  4.4 |
| Seeker Chariot (charge)         |   80 |    15.6 |  27.0 | 15.0 | 11.2 |  9.0 | 0.28 |  4.3 |
| Flesh Hounds (1st rd)           |   21 |    14.8 |  25.7 | 14.3 | 10.7 |  8.6 | 0.28 |  4.1 |
| Pleasureseekers                 |   60 |    14.4 |  22.5 | 15.0 | 11.2 |  9.0 | 0.28 |  4.0 |
| Changebringers                  |   45 |    12.8 |  20.0 | 13.3 | 10.0 |  8.0 | 0.28 |  3.6 |
| Exalted Flamer                  |   70 |    12.4 |  19.3 | 12.9 |  9.6 |  7.7 | 0.28 |  3.4 |
| Contorted Epitome               |  165 |    12.2 |  10.9 |  9.7 | 10.9 | 17.5 | 0.28 |  3.4 |
| Exalted Seeker Chariot (charge) |  210 |    11.9 |  20.6 | 11.4 |  8.6 |  6.9 | 0.28 |  3.3 |
| Seekers (rider+steed)           |   20 |    11.1 |  15.0 | 11.2 |  9.0 |  9.0 | 0.28 |  3.1 |
| Hellflayer (charge)             |  120 |    10.4 |  18.0 | 10.0 |  7.5 |  6.0 | 0.28 |  2.9 |
| Burning Chariot (charge)        |  120 |     9.6 |  15.0 | 10.0 |  7.5 |  6.0 | 0.28 |  2.7 |

## Melee damage — wounds per 100 pts

| Unit                            | Cost | AVG | LtInf | HvInf | HvCav | MoCav | Monst | Resil | HiT |
|---------------------------------|------|-----|-------|-------|-------|-------|-------|-------|-----|
| Bloodletters (GW, 1st rd)       |   15 | 3.4 |   3.7 |   3.7 |   3.1 |   2.8 |   3.0 |   3.7 | 3.7 |
| Blood Chariot (charge, 1st rd)  |  145 | 3.1 |   4.5 |   2.9 |   2.4 |   2.9 |   2.0 |   2.8 | 4.1 |
| Seeker Chariot (charge)         |   80 | 3.0 |   6.2 |   2.5 |   2.3 |   2.2 |   1.3 |   1.9 | 4.3 |
| Hellflayer (charge)             |  120 | 2.8 |   5.9 |   2.4 |   2.2 |   2.1 |   1.2 |   1.9 | 4.1 |
| Brutes (GW, 1st rd)             |   46 | 2.8 |   3.6 |   2.7 |   2.3 |   2.7 |   2.2 |   2.7 | 3.6 |
| Bloodbeasts (1st rd)            |   55 | 2.8 |   4.0 |   2.5 |   2.0 |   2.5 |   1.8 |   2.4 | 4.0 |
| Flesh Hounds (1st rd)           |   21 | 2.7 |   5.3 |   2.1 |   2.0 |   2.1 |   1.3 |   2.0 | 4.2 |
| Brutes (add. hand weapons)      |   43 | 2.7 |   5.2 |   2.1 |   1.9 |   2.1 |   1.3 |   1.9 | 4.1 |
| Daemonettes                     |   12 | 2.5 |   5.9 |   2.1 |   2.1 |   1.5 |   1.3 |   1.3 | 3.7 |
| Brutes (GW, sustained)          |   46 | 2.5 |   3.6 |   2.3 |   1.8 |   2.3 |   1.6 |   2.2 | 3.6 |
| Bloodletters (hand wpn, 1st rd) |   13 | 2.5 |   4.3 |   2.3 |   2.1 |   1.7 |   1.4 |   2.1 | 3.4 |
| Exalted Seeker Chariot (charge) |  210 | 2.4 |   5.0 |   2.0 |   1.9 |   1.8 |   1.0 |   1.6 | 3.4 |
| Plague Chariot (charge)         |  130 | 2.3 |   4.0 |   2.0 |   1.8 |   2.0 |   1.3 |   2.0 | 3.2 |
| Seekers (rider+steed)           |   20 | 2.3 |   5.3 |   1.9 |   1.9 |   1.4 |   1.2 |   1.2 | 3.3 |
| Pleasureseekers                 |   60 | 2.3 |   5.3 |   1.6 |   1.6 |   1.6 |   0.6 |   1.3 | 3.7 |
| Pox Riders                      |   35 | 2.2 |   4.0 |   1.9 |   1.6 |   1.9 |   1.3 |   1.9 | 3.2 |
| Skull Cannon (melee, charge)    |  240 | 2.2 |   2.7 |   2.3 |   1.8 |   2.0 |   1.6 |   2.2 | 2.7 |
| Bloodletters (GW, sustained)    |   15 | 2.2 |   3.7 |   2.0 |   1.9 |   1.5 |   1.2 |   1.9 | 3.0 |
| Bloodcrushers (1st rd)          |   55 | 2.1 |   4.0 |   1.6 |   1.5 |   1.6 |   1.0 |   1.5 | 3.2 |
| Bloodbeasts (sustained)         |   55 | 2.1 |   4.0 |   1.6 |   1.5 |   1.6 |   1.0 |   1.5 | 3.2 |
| Burning Chariot (charge)        |  120 | 2.1 |   4.2 |   1.7 |   1.5 |   1.7 |   0.7 |   1.5 | 3.2 |
| Plague Toads (Core)             |   31 | 1.9 |   3.4 |   1.6 |   1.3 |   1.6 |   1.1 |   1.6 | 2.7 |
| Contorted Epitome               |  165 | 1.9 |   3.9 |   1.6 |   1.6 |   1.2 |   0.6 |   1.3 | 2.7 |
| Screamers                       |   32 | 1.8 |   3.5 |   1.6 |   1.4 |   1.6 |   0.7 |   1.4 | 2.6 |
| Plaguebearers                   |   13 | 1.7 |   3.6 |   1.3 |   1.1 |   1.3 |   0.9 |   1.3 | 2.8 |
| Beasts of Nurgle                |   55 | 1.6 |   2.8 |   1.4 |   1.1 |   1.4 |   0.9 |   1.4 | 2.3 |
| Flesh Hounds (sustained)        |   21 | 1.6 |   3.5 |   1.2 |   1.1 |   1.2 |   0.5 |   1.1 | 2.6 |
| Plague Drones                   |   50 | 1.6 |   2.8 |   1.3 |   1.1 |   1.3 |   0.9 |   1.3 | 2.2 |
| Fiends                          |   55 | 1.5 |   3.5 |   1.1 |   1.1 |   1.1 |   0.4 |   0.9 | 2.4 |
| Soul Grinder                    |  275 | 1.3 |   2.1 |   1.5 |   1.2 |   0.6 |   0.5 |   1.5 | 2.1 |
| Changebringers                  |   45 | 1.3 |   2.5 |   1.1 |   1.0 |   1.1 |   0.5 |   1.0 | 1.9 |
| Bloodcrushers (sustained)       |   55 | 1.2 |   2.7 |   0.9 |   0.8 |   0.9 |   0.4 |   0.8 | 2.0 |
| Soul Grinder (Daemonbone Claw)  |  300 | 1.1 |   1.6 |   1.3 |   1.1 |   0.5 |   0.5 |   1.3 | 1.6 |
| Chaos Furies                    |   14 | 1.0 |   2.4 |   0.8 |   0.6 |   0.8 |   0.6 |   0.6 | 1.6 |
| Nurglings                       |   50 | 1.0 |   2.0 |   0.7 |   0.5 |   0.4 |   1.0 |   1.0 | 1.3 |
| Brimstone Horrors               |   10 | 0.9 |   2.2 |   0.6 |   0.6 |   0.4 |   0.8 |   0.8 | 1.1 |
| Firewyrms                       |   55 | 0.9 |   1.8 |   0.8 |   0.7 |   0.8 |   0.4 |   0.7 | 1.3 |
| Flamers                         |   32 | 0.9 |   1.7 |   0.8 |   0.7 |   0.5 |   0.3 |   0.7 | 1.3 |
| Imp Swarms                      |   35 | 0.8 |   1.9 |   0.5 |   0.5 |   0.5 |   0.7 |   0.7 | 1.0 |
| Exalted Flamer                  |   70 | 0.7 |   1.6 |   0.5 |   0.5 |   0.5 |   0.2 |   0.5 | 1.2 |
| Blood Chariot (sustained)       |  145 | 0.6 |   1.3 |   0.4 |   0.4 |   0.4 |   0.2 |   0.4 | 1.0 |
| Pink Horrors                    |   13 | 0.6 |   1.3 |   0.4 |   0.3 |   0.4 |   0.3 |   0.3 | 0.9 |

## Ranged damage — wounds per 100 pts

| Unit                         | Cost | AVG | LtInf | HvInf | HvCav | MoCav | Monst | Resil | HiT |
|------------------------------|------|-----|-------|-------|-------|-------|-------|-------|-----|
| Exalted Flamer               |   70 | 4.0 |   6.7 |   3.6 |   3.4 |   3.6 |   2.2 |   3.4 | 5.4 |
| Firewyrms                    |   55 | 2.5 |   4.7 |   2.1 |   1.9 |   2.1 |   0.9 |   1.9 | 3.5 |
| Burning Chariot (charge)     |  120 | 2.4 |   3.9 |   2.1 |   2.0 |   2.1 |   1.3 |   2.0 | 3.1 |
| Flamers                      |   32 | 2.1 |   4.1 |   1.8 |   1.6 |   1.8 |   0.8 |   1.6 | 3.0 |
| Brimstone Horrors            |   10 | 2.0 |   4.4 |   1.5 |   1.1 |   1.5 |   1.1 |   1.1 | 3.0 |
| Skull Cannon (melee, charge) |  240 | 1.8 |   1.8 |   1.8 |   1.8 |   1.8 |   1.8 |   1.8 | 1.8 |
| Pink Horrors                 |   13 | 1.5 |   3.4 |   1.1 |   0.9 |   1.1 |   0.9 |   0.9 | 2.3 |
| Changebringers               |   45 | 1.5 |   2.9 |   1.3 |   1.2 |   1.3 |   0.6 |   1.2 | 2.2 |
| Plague Drones                |   55 | 0.9 |   1.8 |   0.8 |   0.7 |   0.8 |   0.4 |   0.7 | 1.3 |
| Soul Grinder                 |  290 | 0.4 |   0.4 |   0.4 |   0.3 |   0.4 |   0.3 |   0.4 | 0.4 |

## Method & assumptions

Scope: **Core, Special and Rare only.** Source: `data/daemons-of-chaos.js`, verified
against `reference/Army books/Warhammer - Daemons of Chaos 3.0.pdf` and the 9th Ed
3.11 rulebook.

**Army-wide rules applied**

- **Daemonic** — every model has Magical Ward (5+) and Unbreakable, so `ward: 5`
  everywhere. This is the single biggest driver in the resilience table: a 5+ ward is
  unmodified by Strength, so Daemon durability degrades far more slowly against S6+
  than an armour-based army's.
- **Daemonic Instability** is modelled as an **Ld-sensitive** hold factor (see above).
  This replaces the generic skill's flat 0.90 for `daemonic`, which would have been
  meaningless in a book where every single unit shares the trait.
- **Khorne — Mighty Blow (1)**: +1 Strength in the **first round only** (and it
  applies to Impact Hits and Stomps). Khorne units therefore appear twice,
  `(1st rd)` and `(sustained)`.
- **Nurgle — Poisoned Attacks** (+1 To Wound) is modelled. The **-1 WS to enemies
  in base contact is not** — Nurgle melee rows are slightly pessimistic.
- **Slaanesh — Armour Piercing (1)** (`ap: 1`) and the extra Attack for every
  unsaved Wound are both modelled (the analyzer was extended with
  `bonus_attack_on_wound`; extra attacks correctly do not chain).
- **Tzeentch's Magical Ward (6+)** is ignored — it is strictly worse than the
  Daemonic 5+ they already have.
- **Great weapon = S+1 with Mighty Blow (1)** per `data/rules-common.js`, i.e. S+2
  in the first round and S+1 sustained — *not* a flat +2.

**Troop-type rules applied**

- Cavalry / Monstrous Cavalry use the **highest Toughness and Wounds** of rider or
  mount (rulebook p.72). This is why Plague Drones (T5 W3 from the Rot Fly) and
  Bloodcrushers (T4 W3 from the Juggernaut) score so well.
- Monsters get **Stomp (D6)** = 3.5 hits (Soul Grinder only, in this scope). Stomp
  applies only against targets with Line of Sight ≤ 3.
- Chariot troop-type armour **stacks with Natural Armour** ("Natural Armour can be
  combined with other armour as normal"). This gives the Blood Chariot a **2+ save**
  (4+ chariot, +2 from Natural Armour 5+) and the Skull Cannon a 3+ — the main reason
  the Blood Chariot tops the resilience table.

**Stated estimates (not book quotes)**

- Chariot Impact Hits: D6 avg 3.5, +1 for scythes. Exalted Seeker 3D6 = 10.5,
  Hellflayer 2D6 = 7, Blood/Seeker/Burning Chariot 4.5, Plague Chariot 3.5.
- Exalted Fire of Tzeentch (Blue Fire): Artillery Dice + D6 ≈ **8.5 shots** at S5
  (D3+3). Swingy; treat as an estimate.
- Skull Cannon: modelled as ~1.5 template hits at S10 with Multiple Wounds 3.5.
  Cannon bounce/misfire makes this the least reliable row in the report.
- Plague Drones' Death Heads (each hit → D6 hits) are modelled as `mw: 3.5`, which
  gives the same expected value.
- Random Attacks are averaged: Beast of Nurgle D6+1 → 4.5, Firewyrm D6 → 3.5.

**Deliberate omissions**

- **Killing Blow** (Bloodletters, Bloodcrushers, Blood Chariot, Skull Cannon) is not
  modelled. It is worth a lot against single-wound targets, so the Khorne rows
  understate them in the LtInf / HvInf / HvCav columns.
- **Split** (Pink Horrors becoming two Blue Horrors) is not modelled — their real
  resilience per point is materially better than shown.
- **Wound overkill is not modelled.** The resilience metric counts wounds needed, so
  multi-wound models (Brimstone Horrors, Screamers) look better against Multiple
  Wounds attacks and templates than they play.
- **Magic standards, command upgrades, Summoned from Beyond and the named-character
  host upgrades** (Hellforged Host, Festering Stooges, etc.) are excluded; costs are
  the plain per-model / per-unit price.
- Mixed-profile models (cavalry, chariots) are collapsed into one attack pool using
  the dominant Strength, since the analyzer takes a single S per build. Affected:
  Seekers, Pleasureseekers, Pox Riders, Plague Drones, Skull Cannon,
  Burning Chariot, Contorted Epitome.
- Regeneration is applied where printed (Beasts of Nurgle, Plague Chariot). Magic
  Resistance is not modelled (it only affects magic).
- The Contorted Epitome's **Swallow Energy** (ward improves by +1 per point of
  Strength above 3) *is* modelled, via a `ward_by_S` extension — which is why it is
  the only unit in the book whose S6 column is higher than its S3 column.

Input file: `daemons-of-chaos-analysis-input.json`.
