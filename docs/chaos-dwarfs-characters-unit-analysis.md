# Chaos Dwarfs — CHARACTER combat analysis

Generic characters only (no special/named characters). Each character is modelled as
**one representative loadout** — best mundane armour + shield where allowed, an
additional hand weapon (+1 Attack, keeps the shield), and a defensive magic item (a
ward) sized to its budget — with resilience **and** damage computed at that same full
cost (base + wargear + item).

> **Read this before the tables.** Per-100-points metrics flatter cheap rank-and-file
> and punish characters, because a character's points buy things this model does *not*
> price: Look Out Sir, lending the army's Leadership, joining and anchoring a unit, a
> caster's spells, and killing/utility magic items. So the **damage-per-point** figures
> below look tiny — that is expected and does **not** mean characters hit softly (an
> Overlord still swings 5 Strength-4 attacks). Use the character table to compare
> characters **against each other**, not against the rank-and-file file.

Columns as in the main army file: **AVG** = plain mean of the S3-S6 columns (ranking
key, unaffected by Hold); **Hold** = stay-and-fight probability; **ADJ** = AVG × Hold.

## Resilience — effective wounds per 100 pts

| Unit | Cost | AVG | Hold | ADJ | S3 | S4 | S5 | S6 |
|---|---|---|---|---|---|---|---|---|
| Bull Centaur Taur'ruk (med+shield+AHW, Ward 4+) | 198 | **51.8** | 0.58 | 30.2 | 145.5 | 36.4 | 16.2 | 9.1 |
| Overseer (heavy+shield+AHW, Ward 4+) | 128 | **22.5** | 0.72 | 16.2 | 56.2 | 18.8 | 9.4 | 5.6 |
| Overlord (heavy+shield+AHW, Ward 4+) | 193 | **22.4** | 0.83 | 18.7 | 56.0 | 18.7 | 9.3 | 5.6 |
| Hobgoblin Chieftain (med+shield+AHW, Ward 5+) | 84 | **10.7** | 0.28 | 3.0 | 21.4 | 10.7 | 6.4 | 4.3 |
| Daemonsmith (med, Ward 5+) | 94 | **7.7** | 0.72 | 5.5 | 14.4 | 7.7 | 4.8 | 3.8 |
| Sorcerer-Priest (heavy, Ward 6+) | 108 | **6.7** | 0.72 | 4.8 | 13.3 | 6.7 | 4.0 | 2.7 |
| Sorcerer-Prophet (heavy, Ward 5+) | 238 | **5.7** | 0.72 | 4.1 | 11.3 | 5.7 | 3.4 | 2.3 |

## Melee damage — wounds per 100 pts

| Unit | Cost | AVG | LtInf | HvInf | HvCav | MoCav | Monst | Resil | HiT |
|---|---|---|---|---|---|---|---|---|---|
| Hobgoblin Chieftain (med+shield+AHW, Ward 5+) | 84 | **0.9** | 1.8 | 0.8 | 0.7 | 0.6 | 0.4 | 0.7 | 1.3 |
| Bull Centaur Taur'ruk (med+shield+AHW, Ward 4+) | 198 | **0.8** | 1.4 | 0.7 | 0.7 | 0.6 | 0.5 | 0.7 | 1.1 |
| Overseer (heavy+shield+AHW, Ward 4+) | 128 | **0.6** | 1.2 | 0.5 | 0.5 | 0.5 | 0.2 | 0.5 | 0.9 |
| Overlord (heavy+shield+AHW, Ward 4+) | 193 | **0.5** | 1.0 | 0.4 | 0.4 | 0.4 | 0.2 | 0.4 | 0.7 |
| Daemonsmith (med, Ward 5+) | 94 | **0.4** | 0.8 | 0.3 | 0.2 | 0.3 | 0.1 | 0.2 | 0.6 |
| Sorcerer-Priest (heavy, Ward 6+) | 108 | **0.1** | 0.2 | 0.1 | 0.0 | 0.1 | 0.0 | 0.0 | 0.1 |
| Sorcerer-Prophet (heavy, Ward 5+) | 238 | **0.1** | 0.2 | 0.1 | 0.0 | 0.0 | 0.0 | 0.0 | 0.1 |

No ranged table — no generic Chaos Dwarf character is a shooter of note (the pistol /
crossbow / naptha options are negligible and omitted).

## What the numbers say

- **Bull Centaur Taur'ruk is the standout durable chassis** — T5, W4, and the way
  Natural Armour (5+) stacks with medium armour + shield gives a **2+ save**, which on
  top of a 4+ ward makes it shrug low-Strength fire almost entirely (145 EW/100pts vs
  S3). Its only soft spot is reliability: no Resolute/Stubborn and it *can't be the
  General*, so its Hold (0.58) drags the ADJ well below its raw AVG. Park it near your
  General and it's the toughest thing in the character section by a mile.
- **Overlord vs Overseer** land almost level on raw resilience per point (22.4 vs
  22.5) — the Overseer is the efficient "bunker" pick, the Overlord adds a wound, WS7,
  an extra attack and Ld10, and its higher Hold (0.83, Resolute + Ld10) makes it the
  better *realised* anchor once morale is priced in.
- **Casters sit at the bottom of both tables and that's fine** — you are not buying a
  Sorcerer-Prophet for 238 points of toughness or 0.1 wounds of melee; you are buying
  a Level 3-4 wizard. Their durability figure is only useful for deciding *how much
  armour/ward to bolt on* to keep the caster alive, where the cheap Priest is the more
  point-efficient bunker.
- **Absolute damage, for context** (not per-point): Taur'ruk 5×S5, Overlord 5×S4,
  Overseer 4×S4 — all respectable duellists; the per-point column just can't show that
  against a 4-point Cutthroat.

## Method & assumptions

Scope: **generic characters only.** Source: `data/chaos-dwarfs.js` (`units.characters`),
9th Ed 3.0. Benchmark targets and mechanics identical to the main army file.

**Loadout modelled (one per character, full cost = base + wargear + item)**

- **Overlord** 125 + heavy armour 18 + shield 5 + additional hand weapon 5 + Talisman
  of Preservation 40 (Ward 4+) = **193**. Save 3+ (heavy + shield).
- **Overseer** 60 + heavy 18 + shield 5 + AHW 5 + Talisman of Preservation 40 = **128**.
- **Bull Centaur Taur'ruk** 140 + medium 9 + shield 5 + AHW 4 + Talisman of
  Preservation 40 = **198**. Save 2+ = medium (+2) + shield (+1) + Natural Armour 5+
  (+2). Cannot be Army General.
- **Hobgoblin Chieftain** 40 + medium 9 + shield 5 + AHW 5 + Talisman of Endurance 25
  (Ward 5+) = **84**. Cannot be Army General.
- **Sorcerer-Prophet** 195 + heavy 18 + Talisman of Endurance 25 = **238** (Level 3).
- **Sorcerer-Priest** 80 + heavy 18 + Talisman of Protection 10 (Ward 6+) = **108**
  (Level 1).
- **Daemonsmith** 60 + medium 9 + Talisman of Endurance 25 = **94**.

**Rules applied**

- Additional hand weapon = +1 Attack and keeps the shield's armour save.
- **Resolute** (Overlord, Overseer, Sorcerers, Daemonsmith) → Hold at Ld−1; Taur'ruk
  and Hobgoblin Chieftain are plain. Hold uses each model's own Leadership — but
  characters normally sit in a unit and use its Leadership and Look Out Sir, so lone
  Hold here is indicative only.
- Wards are unmodified by Strength (the reason the high-ward models decay slowly into
  the S5/S6 columns). Blackshard Armour (Immunity Flaming) has no effect on these
  benchmarks.

**Deliberate omissions / caveats**

- **A great weapon** (S+1, Mighty Blow 1 = +2 charge / +1 sustained) is a valid
  alternative to the AHW+shield build — it trades the shield's save for more Strength.
  Not modelled to keep one loadout per character; it would raise the melee columns and
  lower resilience.
- **Spells** (Sorcerers Level 1-3, Daemonsmith if upgraded) and the **Infernal
  Engineer** war-machine buff are the casters' real value and are not modelled.
- **Magic weapons and other offensive/utility items** bought from the magic budget are
  not modelled — only a single defensive ward is. Real characters vary hugely here.
- **Mounts** (Great/Bale Taurus, Lammasu, Palanquin, Altar of Hashut) are excluded —
  foot builds only.
- Per-point figures do not price Look Out Sir, joining/anchoring units, or lending the
  army General's Leadership.

Input file: `chaos-dwarfs-characters-analysis-input.json`.
