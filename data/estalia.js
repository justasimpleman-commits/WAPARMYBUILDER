/* ============================================================================
   ESTALIA — army data (Warhammer Armies, Mathias Eliasson v3.0,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA file. See docs/SCHEMA.md for the full field reference and
   docs/DATA-MAPPING.md for how each PDF section maps here.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size

   Note: the Estalian book does not type its Arcane Items (no "Relic./Charm./
   Staff." prefix in the source), so they are left untyped — the engine's
   default puts them in the Relic sub-slot. Nothing is invented here.
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["estalia"] = {
  id: "estalia",
  name: "Estalia",
  author: "Mathias Eliasson v3.0 (unofficial) — 9th Edition 3.0",
  // No army-specific composition section in the book — standard caps.
  composition: {
    charactersMax: 0.35,
    coreMin: 0.25,
    specialMax: 0.50,
    rareMax: 0.25,
    singleUnitMax: 0.25
  },
  duplicateCaps: [
    { upTo: 999,  special: 1, rare: 1 },
    { upTo: 1999, special: 2, rare: 1 },
    { upTo: 2999, special: 3, rare: 1 },
    { upTo: 3999, special: 4, rare: 2 },
    { upTo: 4999, special: 5, rare: 3 },
    { upTo: Infinity, special: 6, rare: 3 }
  ],
  listRules: [
    "Special characters are unique — each may be taken only once.",
    "Magic items are unique (one of each per army) unless marked * (common).",
    "Each model may take only one item from each magic-item category.",
    "Juan Federico: one unit of Knights of the Righteous Spear may be upgraded to Inner Circle for +2 points per model (+1 Strength, +1 Initiative).",
    "Francisco Cortez: units of Conquistadors count as Core Units instead of Special Units."
  ],

  magicItems: {
    "Magic Weapons": [
      { name: "Spear of Righteousness", cost: 55, only: "Priest of Myrmidia or High Priest of Myrmidia", requiresAccess: ["lance","spear"] },
      { name: "Staff of Tomas the Pure", cost: 50, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Wolfslayer", cost: 40 },
      { name: "Basilisk Blade", cost: 30 },
      { name: "Fencer's Blades", cost: 30, requiresAccess: "additional hand weapon" },
      { name: "Lance of Rectitude", cost: 25, requiresAccess: "lance" },
      { name: "Sword of the Vendetta", cost: 25 },
      { name: "Figuera's Rapier", cost: 25, only: "Maestro" },
      { name: "Mace of Sacrifice", cost: 20, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Sword of Fortitude", cost: 20 },
      { name: "Sword of Talabaro", cost: 20 },
      { name: "Pistols of the Duel", cost: 15 },
      { name: "Relic Sword", cost: 10 }
    ],
    "Magic Armour": [
      { name: "Shield of Honour", cost: 45, only: "Priest of Myrmidia or High Priest of Myrmidia", requiresAccess: "shield" },
      { name: "Cuirass of the Blazing Sun", cost: 40, requiresAccess: "heavy armour" },
      { name: "Scintillating Shield", cost: 30, requiresAccess: "shield" },
      { name: "Morion of the Eagle", cost: 20, only: "Grand Commander or Captain" },
      { name: "Sacred Armour of Purity", cost: 20, requiresAccess: "medium armour" },
      { name: "Shield of the Wolf Rampant", cost: 20, requiresAccess: "shield" }
    ],
    "Talismans": [
      { name: "Amulet of Dawn", cost: 45 },
      { name: "Custodia of Sanctuary", cost: 35, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Aegis of the Maiden", cost: 20 },
      { name: "Cape of Velacruz", cost: 20 },
      { name: "Rat Catcher's Charm", cost: 15 }
    ],
    "Arcane Items": [
      { name: "Living Deadwood Staff", cost: 35 },
      { name: "Staff of Arcane Draining", cost: 30 },
      { name: "Temperance Crystal", cost: 25 },
      { name: "Ring of the Sanctioned Thaumaturge", cost: 10 },
      { name: "The Gem of Taranto", cost: 10 }
    ],
    "Enchanted Items": [
      { name: "Coronet of the Conqueror", cost: 50, only: "Grand Commander" },
      { name: "Tome of Wisdom", cost: 35, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Monstrance of Divine Pronouncement", cost: 35, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Blessed Grenade of Aquilia", cost: 30 },
      { name: "Sanctified Reliquary of Myrmidia", cost: 25 },
      { name: "Scripture of True Insight", cost: 25 },
      { name: "Ampulla of Myrmidia's Wrath", cost: 15, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Rosary of the Maiden", cost: 15, only: "Priest of Myrmidia or High Priest of Myrmidia" },
      { name: "Missal of Myrmidia's Word", cost: 10, only: "Priest of Myrmidia or High Priest of Myrmidia" }
    ],
    "Magic Standards": [
      { name: "Standard of Myrmidia", cost: 45 },
      { name: "Standard of Superior Form", cost: 25 },
      { name: "Banner of Santiago", cost: 20 },
      { name: "Banner of the Bull", cost: 15 },
      { name: "Colours of Conquest", cost: 15 },
      { name: "Standard of Prowess", cost: 15 },
      { name: "Banner of Courage", cost: 10 }
    ]
  },

  commonMagicItems: {
    "Magic Weapons": [
      { name: "Giant Blade", cost: 45 },
      { name: "Sword of Bloodshed", cost: 45 },
      { name: "Sword of Power", cost: 30 },
      { name: "Sword of Strife", cost: 30 },
      { name: "Sword of Swift Slaying", cost: 25 },
      { name: "Parrying Blade", cost: 20 },
      { name: "Blade of Sea Gold", cost: 15 },
      { name: "Ogre Blade", cost: 15 },
      { name: "Headsman's Axe", cost: 15 },
      { name: "Sword of Striking", cost: 15, common: true },
      { name: "Sword of Might", cost: 15, common: true },
      { name: "Sword of Battle", cost: 15, common: true },
      { name: "Shrieking Blade", cost: 15 },
      { name: "Berserker Sword", cost: 10 },
      { name: "Blade of Slicing", cost: 10 },
      { name: "Venom Sword", cost: 10 },
      { name: "Biting Blade", cost: 5, common: true },
      { name: "Burning Blade", cost: 5, common: true }
    ],
    "Magic Armour": [
      { name: "Armour of Destiny", cost: 60, requiresAccess: "heavy armour" },
      { name: "Armour of Resilience", cost: 40, requiresAccess: "heavy armour" },
      { name: "Armour of Silvered Steel", cost: 40, requiresAccess: "heavy armour" },
      { name: "Armour of Fortune", cost: 35, requiresAccess: "medium armour" },
      { name: "Trickster's Helm", cost: 30, restrict: "footCav" },
      { name: "Glittering Scales", cost: 25, requiresAccess: "light armour" },
      { name: "Seamless Armour", cost: 25, requiresAccess: "medium armour" },
      { name: "Alleviating Armour", cost: 20, requiresAccess: "medium armour" },
      { name: "Gambler's Armour", cost: 20, requiresAccess: "light armour" },
      { name: "Bedazzling Helm", cost: 20 },
      { name: "Shield of the Warrior True", cost: 15 },
      { name: "Dragonhelm", cost: 10 },
      { name: "Enchanted Shield", cost: 10, common: true, requiresAccess: "shield" },
      { name: "Charmed Shield", cost: 5, common: true }
    ],
    "Talismans": [
      { name: "Talisman of Preservation", cost: 40 },
      { name: "Obsidian Lodestone", cost: 30 },
      { name: "Talisman of Endurance", cost: 25 },
      { name: "Dawnstone", cost: 15, common: true, restrict: "footCav" },
      { name: "Obsidian Amulet", cost: 20 },
      { name: "Opal Amulet", cost: 15, common: true },
      { name: "Talisman of Protection", cost: 10, common: true },
      { name: "Obsidian Trinket", cost: 10, common: true },
      { name: "Seed of Rebirth", cost: 10, common: true },
      { name: "Lucky Trinket", cost: 5, common: true }
    ],
    "Arcane Items": [
      { name: "Wand of the Winds", cost: 40 },
      { name: "Destroy Magic Scroll", cost: 35 },
      { name: "Feedback Scroll", cost: 35 },
      { name: "Dispel Scroll", cost: 25 },
      { name: "Scroll of Leaching", cost: 25 },
      { name: "Power Familiar", cost: 25 },
      { name: "Wand of Jade", cost: 25 },
      { name: "Wand of Jet", cost: 25 },
      { name: "Channelling Staff", cost: 20 },
      { name: "Forbidden Rod", cost: 20 },
      { name: "Wand of Onyx", cost: 20 },
      { name: "Sceptre of Stability", cost: 20 },
      { name: "Arcane Familiar", cost: 15, common: true, extraSignatures: 1 },
      { name: "Earthing Rod", cost: 15, common: true },
      { name: "Power Scroll", cost: 15, common: true },
      { name: "Luckstone", cost: 10, common: true },
      { name: "Power Stone", cost: 10, common: true },
      { name: "Scroll of Shielding", cost: 10, common: true },
      { name: "Spell Familiar", cost: 10, common: true, extraSpells: 1 }
    ],
    "Enchanted Items": [
      { name: "Ruby Ring of Ruin", cost: 35 },
      { name: "Boots of Flight", cost: 20, restrict: "infantry" },
      { name: "Crown of Command", cost: 20 },
      { name: "Healing Potion", cost: 15, common: true },
      { name: "Potion of Strength", cost: 10, common: true },
      { name: "Potion of Toughness", cost: 10, common: true },
      { name: "Potion of Speed", cost: 10, common: true },
      { name: "Potion of Foolhardiness", cost: 5, common: true },
      { name: "Warrior Familiar", cost: 5, common: true }
    ],
    "Magic Standards": [
      { name: "Banner of Defiance", cost: 25 },
      { name: "Banner of Iron Resolve", cost: 25 },
      { name: "Rampager's Standard", cost: 25 },
      { name: "Banner of Swiftness", cost: 25 },
      { name: "Razor Standard", cost: 25 },
      { name: "Ranger's Standard", cost: 20 },
      { name: "Banner of Eternal Flame", cost: 15 },
      { name: "Standard of Discipline", cost: 15 },
      { name: "Standard of Shielding", cost: 15 },
      { name: "War Banner", cost: 15, common: true },
      { name: "Lichbone Pennant", cost: 10, common: true },
      { name: "Gleaming Pennant", cost: 5, common: true }
    ]
  },


  glossary: {
    /* ---- Army Special Rules (p.3) ---- */
    "Countermarch Fire": `Models with this rule in the front rank of a unit ignore the Ponderous special rule (or treat Move and Fire as Ponderous instead) if they have another friendly model with the same special rule in base contact behind them.`,
    "Tactical Supremacy": `All models with this rule have the Disciplined special rule.

If the unit is charged during the Movement phase and chooses Hold as a charge reaction, it can attempt to change formation immediately before your opponent has moved any of their charging units, as long as it is not already engaged in close combat. To do so, the unit must take pass Leadership test – if successful, the unit can immediately make a swift reform as described in the Warhammer Rulebook.`,
    "Tercio Formation": `A Tercio Formation consists of a mix of models armed with pikes/polearms, handguns/crossbows and bucklers. All models are treated as having the same equipment, though you should attempt to model the unit with appropriate equipment as much as possible.

All models in the front rank, both flanks and rear may fire in the Shooting phase, even if they have moved this turn. This means that models in the front arc can fire forward, models in the left flank fire to the left, models in the right flank fire to right and models in the rear rank fire to the rear. Each arc may choose to fire at different targets if they wish.

All models in the unit's front rank fight using hand weapons and bucklers. The remaining models fight using pikes/polearms. All attacks against the unit's front are resolved against the models armed with hand weapon and bucklers.

If the unit has not moved in the last turn it counts as having no flanks or rear for the purpose of Disruption and combat resolution. However, for every flank or rear arc they are engaged in, they suffer -1 to their rank bonus.

**Support Fire** Units of Crossbowmen, Arquebusiers and Musketeers within 3" of a unit of Tercios may lend them support fire if the Tercio is charged by passing a Leadership test (which may be re-rolled with a Leader). This works out like a normal Stand and Shoot reaction, except that they do not suffer -1 To Hit for shooting at a charging enemy. In addition; if they choose to Flee as a charge reaction this does not cause Panic to friendly units.`,

    /* ---- Character special rules ---- */
    "Blessing of Myrmidia": `The model and any unit they are currently in have the Always Strikes First special rule.`,
    "Battle Prayers of Myrmidia": `A model with this special rule knows the three Battle Prayers listed below. Unless fleeing, they may attempt to use one at the start of each of your turns by taking a Leadership test on their own unmodified Leadership. If passed, the prayer is answered and takes immediate effect. A friendly unit can only be under the effect of one Battle Prayer at a time.

**Skill of Combat** The model and any unit they are with gain +1 To Hit in close combat until the start of your next turn.

**Shield of Myrmidia** The model and any unit they are with gain a 6+ armour save until the start of your next turn.

**Spear of Myrmidia** The model and any unit they are with gain the Armour Piercing (1) and Magical Attacks special rules until the start of your next turn.`,
    "Face Me": `Face Me, You Coward! A Maestro must always issue and accept Challenges. If your opponent refuses to answer the challenge, you may force the one enemy character in the unit to take a Psychology test. If failed, that model must accept the challenge. While in a challenge, the Maestro may re-roll failed rolls To Hit and To Wound.`,
    "Duelling Techniques": `At the start of each round of close combat, a Maestro may choose to utilize one of the following Duelling Techniques. He may not use the same technique two rounds in a row.

**Quick Strikes** The Maestro gains +D3 Attacks.

**Defence** The Maestro gains the Parry (5+) rule.

**Perforation** The Maestro gains the Killing Blow special rule.`,

    /* ---- Character mount upgrades (p.11-12) ---- */
    "Iron-hard Hooves": `A Pegasus with this upgrade re-rolls failed To Wound rolls.`,
    "Swift as the Wind": `A Pegasus with this upgrade re-rolls any dice results of a 1 when determining its charge range.`,
    "Shredding Talons": `The model gains the Armour Piercing (1) special rule.`,
    "Swooping Strike": `The model gains the Devastating Charge special rule.`,
    "Holy Fervour": `All friendly Human units benefit from the rider's Blessing of Myrmidia special rule whilst within 6" of a War Altar of Myrmidia.`,
    "The Power of Myrmidia": `Any Battle Prayers of Myrmidia cast by a model who is mounted on a War Altar of Myrmidia also target all friendly units within 6".`,
    "Drawn by an Aurochs": `A War Altar of Myrmidia drawn by an Aurochs (Bovine) is a Chariot with the Fear and Mighty Blow (1) special rule.`,
    "Drawn by 2 Bulls": `A War Altar of Myrmidia drawn by 2 Bulls (Bovine) is a Chariot with the Impact Hits (D6+2) special rule.`,
    "Drawn by 4 Bulls": `A War Altar of Myrmidia drawn by 4 Bulls (Bovine) is a Chariot with the Impact Hits (D6+4) special rule.`,

    /* ---- Unit special rules & weapons ---- */
    "Close Formation": `Almogavars can choose to deploy in either a regular or skirmish formation. Whenever they make a Reform, they may choose to adopt either a regular or skirmish formation.`,
    "Caracole": `Models with this special rule ignore the Ponderous special rule, and may fire their missile weapons to their flanks (in up to two files to either side) as well as their front.`,
    "Musket": `Muskets have the following profile — Range: 15/30", Strength: 5, Special Rules: Armour Piercing (1), Move or Fire, Ponderous.`,
    "Guerrilla Fighters": `Unless it charged, marched or fled during the Movement phase of its turn, a unit with this special rule may move up to its Movement value directly backwards after resolving its missile attacks in its Shooting phase.`,
    "Ogre Charge": `Each model with this special rule that successfully charges an enemy has the Impact Hits (1) special rule. Models with this special rule that are part of a unit with ranks add their current Rank Bonus to the Strength of the Impact Hits they inflict. In addition, they count as having one more rank than their actual number for the purpose of determining Steadfast in any turn that they charge.`,
    "Ogre Pistol": `Ogre pistols use the following profile — Range: 12/24", Strength: 5, Special Rules: Quick Shot.`,
    "Ogre Handgun": `Ogre handguns use the following profile — Range: 18/36", Strength: 6, Special Rules: Ponderous.`,
    "Falconet": `A falconet is a cannon that uses the following profile — Range: 12-48", Strength: 7, Special Rules: Multiple Wounds (D3). When firing grapeshot, hits are resolved at Strength 4 rather than Strength 5.`,
    "Lombard": `A lombard is a mortar that uses the small round template and the following profile — Range: 12-48", Strength: 4(8), Special Rules: Multiple Wounds (D3).`,
    "Knights of the Blazing Sun": `The model must be armed with heavy lance, shield and barding. Whenever a unit where the majority of models have this special rule makes a successful charge, the enemy unit being charged suffer -1 Weapon Skill and Ballistic Skill for the duration of the turn.`,
    "Knights of the Righteous Spear": `The model must be armed with heavy lance, shield and barding. All models with this special rule may re-roll failed To Wound rolls in turns that they successfully charge a unit.`,
    "Bull Run": `The Picadors may light up the horns of the Bulls at the start of any of your Movement phases. They then move using the Random Movement (3D6) special rule and gains the Immunity (Psychology) special rule for the remainder of the game.

If the Fire Bulls' move would bring them into contact with another unit, then they move through rather than stopping. If the Fire Bulls' move would end within a unit, then they automatically move through it – place the Fire Bulls 1" beyond the unit, in the direction they were moving. When a unit of Fire Bulls moves through a unit (friend or foe), each Bull in the unit inflicts a Strength 5 hit with the Flaming Attacks special rule.

Any unit that moves into contact with the front arc of a unit of Fire Bulls suffers a Strength 5 hit for each Fire Bull in base contact. These are resolved like Impact Hits in the close combat phase if the Fire Bulls are charged, or immediately in case a unit flees through them.

If the Picador(s) are killed before they have lit the bulls, the bulls simply wander off and are removed as casualties. If the Picadors are slain after they have lit the bulls, the Fire Bulls will move in a Random direction every turn.`,

    /* ---- Special-character special rules ---- */
    "Living Saint": `Isabella and all friendly units within 12" may re-roll failed Psychology tests. In addition, Isabella may re-roll failed Leadership tests when using her Battle Prayers. Any Battle Prayers can target any friendly unit within 12" rather than just the unit she is with.`,
    "Grand Master": `Juan Federico and any unit of Knights of the Righteous Spear that he joins gains the Immunity (Psychology) special rule for as long as he remains in the unit.`,
    "Knights of the Inner Circle": `If Juan Federico is in your army, you may upgrade one unit of Knights of the Righteous Spear to be Inner Circle for +2 points per model. These models gain +1 Strength and +1 Initiative.`,
    "Champion of Estalia": `Each Wound caused by Santiago in close combat counts as D3 Wounds for the purposes of combat resolution.`,
    "Conquistador Commander": `If Cortez is in your army, units of Conquistadors count as Core Units instead of Special Units. In addition, all Conquistador units may use his Leadership just as if he was the Army General.`,
    "Avenger": `At the start of the game, choose one enemy character. Against this model, Diego Montoya has the Hatred special rule. In addition, the target must re-roll all successful To Wound rolls against him.`,
    "Tilting at Windmills": `Don Lomente may never be the Army General. If he has Line of Sight to a Monster or building, he must always move directly towards the nearest one whenever possible (charging if possible, even if the building is empty or garrisoned by a friendly unit). If he moves into contact with an empty or friendly building, he may move normally in his next turn.`,
    "Insane Luck": `Don Lomente has a 3+ invulnerable save.`,
    "Mark of Death": `At the start of the game, secretly nominate one enemy character to be Maria's chosen target. Against this character, she has the Killing Blow special rule.`
  },

  unitInfo: {
    /* ---- Character mounts (p.11-12) ---- */
    mount_warhorse:{profile:[["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"—",rules:"—"},
    mount_pegasus:{profile:[["Pegasus",8,4,0,4,4,2,4,2,6]],eq:"—",rules:"Fly (9)"},
    mount_aurochs:{profile:[["Aurochs",7,3,0,4,4,3,3,3,6]],eq:"—",rules:"Impact Hits (D3), Mighty Blow (1)"},
    mount_griffon:{profile:[["Griffon",6,5,0,5,5,4,4,4,7]],eq:"—",rules:"Fly (8), Natural Armour (6+)"},
    mount_altar:{profile:[["War Altar of Myrmidia","–","–","–",5,5,5,"–","–","–"],["Bull",6,3,0,4,"–","–",3,1,"–"],["Aurochs",6,3,0,4,"–","–",3,3,"–"]],eq:"—",rules:"Magical Ward (4+); Holy Fervour, The Power of Myrmidia. Shrine (Armour save 6+); Line of Sight value 4."},

    /* ---- Characters ---- */
    commanders:{profile:[["Grand Commander",4,6,5,4,4,3,6,4,9],["Captain",4,5,5,4,4,2,5,3,8]],eq:"Hand weapon, medium armour",rules:"Tactical Supremacy"},
    magos:{profile:[["Grand Mago",4,3,3,3,3,3,3,1,8],["Mago",4,3,3,3,3,2,3,1,7]],eq:"Hand weapon",rules:"Tactical Supremacy. Wizard: Mago L1 / Grand Mago L3 — Beasts, Death, Heavens, Fire, Light, Life, Metal, Shadow."},
    priests:{profile:[["High Priest of Myrmidia",4,5,3,4,4,3,5,3,9],["Priest of Myrmidia",4,4,3,4,4,2,4,2,8]],eq:"Hand weapon",rules:"Magical Attacks, Magic Resistance (1), Tactical Supremacy; Blessing of Myrmidia, Battle Prayers of Myrmidia"},
    maestro:{profile:[["Maestro",4,6,5,4,4,2,6,3,8]],eq:"Hand weapon",rules:"Tactical Supremacy; Face Me, You Coward!, Duelling Techniques"},

    /* ---- Core ---- */
    pikemen:{profile:[["Pikeman",4,3,3,3,3,1,3,1,7]],eq:"Pike, light armour",rules:"Tactical Supremacy"},
    rodeleros:{profile:[["Rodelero",4,4,3,3,3,1,4,1,7]],eq:"Hand weapon, light armour, buckler",rules:"Tactical Supremacy"},
    arquebusiers:{profile:[["Arquebusier",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, handgun",rules:"Countermarch Fire, Tactical Supremacy"},
    crossbowmen:{profile:[["Crossbowman",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, crossbow",rules:"Countermarch Fire, Tactical Supremacy"},
    tercios:{profile:[["Tercio",4,4,3,3,3,1,4,1,7]],eq:"Pike, handgun, light armour, buckler",rules:"Tactical Supremacy, Tercio Formation"},
    diestros:{profile:[["Diestro",4,4,3,3,3,1,4,1,7]],eq:"Hand weapon",rules:"Tactical Supremacy, Skirmishers"},
    hidalgos:{profile:[["Hidalgo",4,3,3,3,3,1,3,1,7],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon, medium armour, shield",rules:"Fast Cavalry, Tactical Supremacy"},
    genitors:{profile:[["Genitor",4,3,3,3,3,1,3,1,7],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon, light armour, shield",rules:"Fast Cavalry, Tactical Supremacy"},
    almogavars:{profile:[["Almogavar",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon",rules:"Skirmishers, Tactical Supremacy; Close Formation"},
    wardogs:{profile:[["War Dog",8,3,0,3,3,1,3,1,5],["Handler",4,3,3,3,3,1,3,1,7]],eq:"—",rules:"Mixed Unit, Tactical Supremacy"},

    /* ---- Special ---- */
    royalguard:{profile:[["Royal Guard",4,4,3,3,3,1,4,1,8]],eq:"Polearm, medium armour",rules:"Stubborn, Tactical Supremacy"},
    sistersoffury:{profile:[["Sister of Fury",4,4,3,3,3,1,4,1,8]],eq:"Spear, heavy armour, shield",rules:"Hatred, Tactical Supremacy"},
    knights:{profile:[["Knight",4,4,3,3,3,1,3,1,8],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon, heavy armour",rules:"Tactical Supremacy"},
    conquistadors:{profile:[["Conquistador",4,4,4,3,3,1,3,1,8],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon, handgun, light armour",rules:"Fast Cavalry, Tactical Supremacy; Caracole"},
    musketeers:{profile:[["Musketeer",4,3,4,3,3,1,3,1,7]],eq:"Hand weapon, musket",rules:"Countermarch Fire, Tactical Supremacy"},
    grenadiers:{profile:[["Grenadier",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, grenades, light armour",rules:"Skirmishers, Tactical Supremacy"},
    mountainbandits:{profile:[["Mountain Bandit",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, shortbow",rules:"Expendable, Scouts, Skirmishers; Guerrilla Fighters"},
    mercenaryogres:{profile:[["Ogre",6,3,3,4,4,3,2,3,7]],eq:"Hand weapons, light armour",rules:"Independent, Natural Armour (6+); Ogre Charge"},
    falconet:{profile:[["Falconet","–","–","–","–",7,"–","–","–","–"],["Crew",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, falconet. Crew of 2.",rules:"War Machine"},

    /* ---- Rare ---- */
    ragingbull:{profile:[["Knight",4,4,3,4,3,1,3,1,8],["Aurochs",7,3,0,4,4,3,3,3,6]],eq:"Heavy lance, heavy armour, shield",rules:"Impact Hits (D3), Mighty Blow (1), Tactical Supremacy"},
    firebulls:{profile:[["Fire Bull",7,3,0,4,4,1,3,1,5],["Picador",4,3,3,3,3,1,3,1,7],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Light lance (Picador only)",rules:"Mixed Unit; Bull Run"},
    culverin:{profile:[["Culverin","–","–","–","–",7,"–","–","–","–"],["Crew",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, cannon. Crew of 3.",rules:"War Machine"},
    lombard:{profile:[["Lombard","–","–","–","–",7,"–","–","–","–"],["Crew",4,3,3,3,3,1,3,1,7]],eq:"Hand weapon, lombard. Crew of 3.",rules:"War Machine"},

    /* ---- Special characters ---- */
    isabella:{profile:[["Isabella Giovanna Luccelli",4,5,4,4,4,3,5,3,9]],eq:"Sacred Sword of Vengeance, Blessed Cuirass, Light of Myrmidia",rules:"Battle Prayers of Myrmidia, Blessing of Myrmidia, Magical Attacks, Magic Resistance (1), Tactical Supremacy; Living Saint"},
    juanfederico:{profile:[["Juan Federico",4,6,5,4,4,3,6,4,9],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Shield, barding; Sword of Retribution, Armour of Virtue, Eagle of Myrmidia",rules:"Righteous Charge, Tactical Supremacy; Grand Master, Knights of the Inner Circle"},
    santiago:{profile:[["Santiago de Vivar",4,7,5,4,4,3,6,5,9],["Babieca (Warhorse)",8,3,0,3,3,1,3,1,5]],eq:"Barding; Tizona & Colada, Armour of the Champion",rules:"Tactical Supremacy; Champion of Estalia"},
    cortez:{profile:[["Francisco Cortez",4,5,5,4,4,2,5,3,8]],eq:"Pistol, medium armour; Rapier of Quietude, Amulet of Pahuax",rules:"Tactical Supremacy; Conquistador Commander"},
    montoya:{profile:[["Diego Montoya",4,6,5,4,4,2,6,3,8]],eq:"Pistol; Blades of the Duellist",rules:"Duelling Techniques, Face Me, You Coward!, Tactical Supremacy; Avenger"},
    donlomente:{profile:[["Don Lomente",4,3,3,3,4,2,3,2,10],["Rocinante (Warhorse)",7,2,0,2,2,1,2,1,4]],eq:"Heavy lance, medium armour, shield",rules:"Unbreakable; Tilting at Windmills, Insane Luck"},
    mariadesalvo:{profile:[["Maria de Salvo",4,7,5,4,4,2,7,3,9]],eq:"Throwing weapons; The Eradicators, Seal of Myrmidia",rules:"Dodge (5+), Hidden, Immunity (Psychology), Tactical Supremacy; Mark of Death"}
  },

  itemDesc: {
    // -- Magic Weapons (army) --
    "Spear of Righteousness":`Priest of Myrmidia only. Light lance/spear. At the start of each round of close combat, roll a D3; the wielder adds this number to their Weapon Skill, Strength, Attacks and Initiative characteristics until the end of the turn.`,
    "Staff of Tomas the Pure":`Priest of Myrmidia only. Range 24", Strength 5, Lightning Attacks, Multiple Shots (D3), Quick to Fire, Rapid Fire.`,
    "Wolfslayer":`All attacks made with Wolfslayer have the Heroic Killing Blow special rule. In addition, enemy models who are Hit by this sword must pass a Leadership test or suffer an additional automatic Wound. However, if the wielder of this sword flees for any reason, they suffer one Wound themself instead, with no saves allowed.`,
    "Basilisk Blade":`Hits from this weapon automatically Wound with the Armour Piercing (1) special rule. However, if the wielder rolls a natural 1 To Hit, they suffer a Wound with the Armour Piercing (1) special rule themselves.`,
    "Fencer's Blades":`Two hand weapons. The wielder has Weapon Skill 10.`,
    "Lance of Rectitude":`Heavy lance. The wielder of this weapon can re-roll all failed rolls To Hit in close combat.`,
    "Sword of the Vendetta":`After deployment, but before the game starts, the wielder of the Sword of the Vendetta may choose one enemy character on the table. The wielder must always issue and accept challenges against this character if possible. The wielder of the sword Hits and Wounds the chosen enemy on a 2+ with the Ignores Armour saves special rule. If the target is killed by this weapon, the wielder suffers -D3 to their Strength and Toughness and the sword counts as a normal magical hand weapon for the remainder of the game.`,
    "Figuera's Rapier":`Maestro only. All attacks made with this weapon gain +1 To Hit and the Armour Piercing (1) special rule. In addition, no Parry saves can be taken against it.`,
    "Mace of Sacrifice":`Priest of Myrmidia only. The wielder gains +2 Strength. At the end of each close combat phase of which the wielder takes part, roll a D6; on a 6 the wielder suffers a wound which cannot be saved by any means.`,
    "Sword of Fortitude":`The character, and any unit they are with, gains the Immunity (Psychology) special rule.`,
    "Sword of Talabaro":`The wielder of this sword gains +1 to their Leadership and Attacks characteristics. However, if the wielder ever fails a Leadership test, these bonuses are lost.`,
    "Pistols of the Duel":`Brace of Pistols. Range 6/12", Strength 5, Armour Piercing (1), Multiple Shots (4), Quick Shot.`,
    "Relic Sword":`The wielder will always wound on a 3+, unless they would normally need a lower result.`,
    // -- Magic Armour (army) --
    "Shield of Honour":`Priest of Myrmidia only. Shield. The bearer of this shield gains the Parry (5+) special rule. In addition, all enemy units in base contact suffer -1 Weapon Skill.`,
    "Cuirass of the Blazing Sun":`Heavy armour. All attacks targeting the wearer of this suffer -1 to Wound. In addition, the wearer gains the Immunity (Flaming Attacks) special rule.`,
    "Scintillating Shield":`Shield. All attacks targeted at the bearer suffer -1 To Hit. For every armour or Parry save that the bearer saves in close combat, one enemy Character or Lone Model (chosen by the bearer) in base contact suffers -1 to their Weapon Skill until the end of the next combat phase. This effect is cumulative.`,
    "Morion of the Eagle":`Grand Commander or Captain only. This helmet gives the wielder a 6+ armour. In addition, they gain the Always Strikes First and Devastating Charge special rules in any turn that they charge.`,
    "Sacred Armour of Purity":`Medium armour. This armour cannot be reduced below a 5+ save.`,
    "Shield of the Wolf Rampant":`Shield. The wielder has the Fear special rule. In addition, if the wielder rolls a natural 6 when making a Parry save, they inflict an extra Hit using their Strength characteristic back onto the model or unit that struck the blow.`,
    // -- Talismans (army) --
    "Amulet of Dawn":`The bearer gains a Magical Ward save equal to the game turn +1. So, in the first turn of the game, they have a Magical Ward (2+), in the second turn a Magical Ward (3+) and so on. On turn 6, the item has no effect.`,
    "Custodia of Sanctuary":`Priest of Myrmidia only. One use only. This item may be used at the start of your turn as long as no enemy units are within 1". Until the start of your next turn, enemy units cannot move within 1" of the bearer or their unit – they are treated as impassable terrain. If the bearer or their unit moves within 1" of an enemy unit, the effect is lost.`,
    "Aegis of the Maiden":`Whenever the wielder of this item is removed as a casualty, they are immediately brought back to life in the same location with 1 Wound remaining.`,
    "Cape of Velacruz":`War Beasts, Monstrous Infantry, Monstrous Beasts, Monstrous Creatures and Monsters must re-roll all successful rolls To Hit against the wearer of this cape. In addition, the wearer gains the Immunity (Impact Hits, Stomp) special rule.`,
    "Rat Catcher's Charm":`The bearer has the Immunity (Poisoned Attacks) and Regeneration (6+) special rules. In addition, the wearer causes Fear against Skaven.`,
    // -- Arcane Items (army) — the book gives no Relic/Charm/Staff typing --
    "Living Deadwood Staff":`Bound spell (Level 2, cast on 8+). This item contains a special type of aura spell with a range of 18". Each wood within range may be moved up to 6" in any direction, as long as they stop within 1" of other terrain. In addition, any unit touched by a moving wood suffer D6 Strength 4 Hits.`,
    "Staff of Arcane Draining":`The bearer gains +1 bonus when channelling Dispel Dice. Additionally, for each natural 6 rolled when channelling Dispel Dice with the bearer, you may remove one Power Dice from the enemy's Power Pool.`,
    "Temperance Crystal":`The bearer of this item may re-roll one Power Dice when casting spells once per Magic phase.`,
    "Ring of the Sanctioned Thaumaturge":`The Wizard may choose their spells from a combination of Lores of Magic available to them, but may only choose Level 1 spells.`,
    "The Gem of Taranto":`One use only. The Gem of Taranto can be used whenever you successfully dispel an enemy spell (except Summoning Spells). The bearer of the Gem will be able to cast the spell themselves (limited by their Wizard level as normal) for the remainder of the game, even if it is from a lore not normally available to them.`,
    // -- Enchanted Items (army) --
    "Coronet of the Conqueror":`Grand Commander only. This item gives the wearer the Inspiring Presence (6) special rule. In addition, all friendly units within 6" of them gains +1 to their Combat Resolution.`,
    "Tome of Wisdom":`Priest of Myrmidia only. Bound Spell (Level 3, cast on 9+). This item contains a direct damage spell that may be cast while in combat. Place the small round template anywhere in base contact with the bearer. All models covered by the template suffer a Strength 4 hit with the Magical Attacks special rule. Against models with the Daemonic, Undead and Vampiric special rules, as well as Wizards, the Strength is increased to 5.`,
    "Monstrance of Divine Pronouncement":`Priest of Myrmidia only. Bound Spell (Level 2, cast on 8+). This item contains a hex spell with a range of 24". The target must immediately take a Panic test with a negative modifier equal to the difference of the Leadership between the caster and the target.`,
    "Blessed Grenade of Aquilia":`One use only. Range 6/9", Strength 4, Armour Piercing (1), Magical Attacks. Place the small round template with its centre anywhere within range. If the attacks hits, resolve the damage as normal. If the attack misses, the template scatters D6".`,
    "Sanctified Reliquary of Myrmidia":`The bearer and any unit they are with gain +1 Weapon Skill.`,
    "Scripture of True Insight":`This item allows you to reroll the dice when determining which side to deploy on and who takes the first turn.`,
    "Ampulla of Myrmidia's Wrath":`Priest of Myrmidia only. This item may be used at the start of any close combat the bearer is involved in by passing a Leadership test. If successful, the bearer's Attacks are doubled until the start of the next close combat phase.`,
    "Rosary of the Maiden":`Priest of Myrmidia only. Every unsaved wound inflicted by the bearer's normal Attacks in Close Combat counts as two for the purposes of combat resolution.`,
    "Missal of Myrmidia's Word":`Priest of Myrmidia only. All enemy units attempting to charge the bearer or their unit must pass a Psychology test. If they fail, they may not charge that turn.`,
    // -- Magic Standards (army) --
    "Standard of Myrmidia":`Each time the unit carrying this standard destroys or breaks an enemy unit, all models in it gain one of the following bonuses for as long as the banner remains in the unit. Each bonus is cumulative: 1 unit — +1 Weapon Skill; 2 units — +1 Strength; 3 units — +1 Attack.`,
    "Standard of Superior Form":`The unit carrying this standard may make a Swift Reform at the start of their Movement phase. The unit may then move as normal (including declaring charges). However, they have all their movement halved the rest of the Movement phase.`,
    "Banner of Santiago":`One use only. The unit carrying this standard automatically passes its first Break Test.`,
    "Banner of the Bull":`All models in the unit carrying this standard gain the Impact Hits (1) special rule.`,
    "Colours of Conquest":`The unit carrying this standard gains +1 Combat Resolution for each subsequent round of close combat they remain in after the first. This bonus resets once leaving combat.`,
    "Standard of Prowess":`The unit carrying this standard gains the Fight in Extra Ranks (1) special rule.`,
    "Banner of Courage":`The unit carrying this standard may re-roll failed Break tests.`,
    // -- Common rulebook items --
    "Giant Blade":`+3 Strength.`,
    "Sword of Bloodshed":`+3 Attacks.`,
    "Sword of Power":`+2 Strength.`,
    "Sword of Strife":`+2 Attacks.`,
    "Sword of Swift Slaying":`Always Strikes First.`,
    "Parrying Blade":`Parry (5+).`,
    "Blade of Sea Gold":`Armour Piercing (3).`,
    "Ogre Blade":`Multiple Wounds (D3).`,
    "Headsman's Axe":`Killing Blow.`,
    "Sword of Striking":`+1 To Hit. Common.`,
    "Sword of Might":`+1 Strength. Common.`,
    "Sword of Battle":`+1 Attack. Common.`,
    "Shrieking Blade":`Fear.`,
    "Berserker Sword":`Frenzy, and can never lose Frenzy.`,
    "Blade of Slicing":`Armour Piercing (2).`,
    "Venom Sword":`Poisoned Attacks.`,
    "Biting Blade":`Armour Piercing (1). Common.`,
    "Burning Blade":`Flaming Attacks. Common.`,
    "Armour of Destiny":`Heavy armour. Magical Ward (4+).`,
    "Armour of Resilience":`Heavy armour. +1 Toughness.`,
    "Armour of Silvered Steel":`Heavy armour. 2+ armour save.`,
    "Armour of Fortune":`Medium armour. Magical Ward (5+).`,
    "Trickster's Helm":`Infantry/Monstrous Infantry/Cavalry only. 6+ save; enemy must re-roll successful To Wound rolls against the wearer.`,
    "Glittering Scales":`Light armour. Enemy suffer -1 To Hit in close combat.`,
    "Seamless Armour":`Medium armour. Ignores negative save modifiers (cannot drop below 5+).`,
    "Alleviating Armour":`Medium armour. Regeneration (6+).`,
    "Gambler's Armour":`Light armour. Magical Ward (6+).`,
    "Bedazzling Helm":`6+ save; enemy must re-roll 6s To Hit against the wearer in close combat.`,
    "Shield of the Warrior True":`Shield. Magical Ward (5+) against missile attacks.`,
    "Dragonhelm":`6+ save and Immunity (Flaming Attacks).`,
    "Enchanted Shield":`Shield. +1 to armour save. Common.`,
    "Charmed Shield":`Shield, one use. The first hit suffered is ignored on a 2+. Common.`,
    "Talisman of Preservation":`Magical Ward (4+).`,
    "Obsidian Lodestone":`The bearer and any unit they join gain Magic Resistance (3).`,
    "Talisman of Endurance":`Magical Ward (5+).`,
    "Dawnstone":`Infantry/Monstrous Infantry/Cavalry only. Re-roll 1's when taking armour saves.`,
    "Obsidian Amulet":`The bearer and any unit they join gain Magic Resistance (2).`,
    "Opal Amulet":`One use. Magical Ward (2+) against the first unsaved wound suffered. Common.`,
    "Talisman of Protection":`Magical Ward (6+). Common.`,
    "Obsidian Trinket":`The bearer and any unit they join gain Magic Resistance (1). Common.`,
    "Seed of Rebirth":`Regeneration (6+). Common.`,
    "Lucky Trinket":`One use. Re-roll a single failed armour or invulnerable save. Common.`,
    "Wand of the Winds":`Staff. Re-roll one D3 when determining the Winds of Magic each Magic phase.`,
    "Destroy Magic Scroll":`Charm, one use. Counter an enemy spell with 6 free dispel dice; on a 4+ the spell is destroyed for the rest of the game.`,
    "Feedback Scroll":`Charm, one use. After an enemy spell resolves, its caster takes 1 Wound (ignores armour) for each casting die that rolled 5+.`,
    "Dispel Scroll":`Charm, one use. Dispel a spell (including remains-in-play) with 6 free dispel dice.`,
    "Scroll of Leaching":`Charm, one use. After an enemy spell resolves, add dispel dice equal to the dice used to cast it.`,
    "Power Familiar":`Relic. +1 Power Dice each of your Magic phases.`,
    "Wand of Jade":`Staff. +6" casting range to your spells (excluding auras).`,
    "Wand of Jet":`Staff. +6" dispel range.`,
    "Channelling Staff":`Staff. Roll one extra dice when attempting to channel power or dispel dice.`,
    "Forbidden Rod":`Staff, one use. +D6 power dice at the start of your Magic phase, but suffer 1 Wound (ignores armour).`,
    "Wand of Onyx":`Staff. +1 casting bonus.`,
    "Sceptre of Stability":`Staff. +1 dispel bonus.`,
    "Arcane Familiar":`Relic. Choose one Signature spell from any of the eight Winds of Magic as an additional spell. Common.`,
    "Earthing Rod":`Staff, one use. On a miscast, do not add the power dice used to the result. Common.`,
    "Power Scroll":`Charm, one use. During one casting attempt, any double (except 1s) counts as a 6 for Ultimate Power. Common.`,
    "Luckstone":`Charm, one use. Re-roll all dice rolled for a casting or dispel attempt. Common.`,
    "Power Stone":`Charm, one use. +D3 dice to a casting attempt. Common.`,
    "Scroll of Shielding":`Charm, one use. A targeted friendly unit gains Magic Resistance (3) against that spell. Common.`,
    "Spell Familiar":`Relic. Know one additional spell from those normally allowed to the bearer. Common.`,
    "Ruby Ring of Ruin":`Bound spell — Fireball (Lore of Fire).`,
    "Boots of Flight":`Infantry only. Movement 10 and the Strider special rule.`,
    "Crown of Command":`The bearer and any unit they join gain Disciplined while the bearer remains with them.`,
    "Healing Potion":`One use. Recover D3 Wounds up to the starting value. Common.`,
    "Potion of Strength":`One use. +D3 Strength until the end of the turn. Common.`,
    "Potion of Toughness":`One use. +D3 Toughness until the end of the turn. Common.`,
    "Potion of Speed":`One use. +D3 Attacks until the end of the turn. Common.`,
    "Potion of Foolhardiness":`One use. Frenzy until the end of the turn. Common.`,
    "Warrior Familiar":`+1 Strength 3 Attack (no special rules); does not count against the magic-item points limit. Common.`,
    "Banner of Defiance":`The unit gains Stubborn.`,
    "Banner of Iron Resolve":`The unit gains Immunity (Psychology).`,
    "Rampager's Standard":`The unit can re-roll its charge distance.`,
    "Banner of Swiftness":`The unit gains Swiftstride.`,
    "Razor Standard":`The unit gains Armour Piercing (1).`,
    "Ranger's Standard":`The unit gains Strider.`,
    "Banner of Eternal Flame":`The unit gains Magical Attacks and Flaming Attacks.`,
    "Standard of Discipline":`+1 Leadership, but the unit cannot use Inspiring Presence.`,
    "Standard of Shielding":`Magical Ward (6+) against missile attacks.`,
    "War Banner":`+1 to combat resolution. Common.`,
    "Lichbone Pennant":`Magic Resistance (1). Common.`,
    "Gleaming Pennant":`One use. Re-roll one failed Leadership test. Common.`
  },

  units: {
    /* ----------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "commanders", name: "Commanders", isCharacter: true,
        access: ["additional hand weapon","lance","halberd","great weapon","light armour","medium armour","heavy armour","shield","barding"],
        variants: [
          { name: "Grand Commander", points: 90, magicBudget: 100 },
          { name: "Captain", points: 50, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Light lance", cost: 5 },
            { label: "Heavy lance", cost: 10 }, { label: "Polearm", cost: 10 }, { label: "Great weapon", cost: 15 } ] },
          { id: "missile", type: "choice", label: "Missile weapon", choices: [
            { label: "Pistol", cost: 4 }, { label: "Brace of pistols", cost: 5 },
            { label: "Crossbow", cost: 7 }, { label: "Handgun", cost: 7 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 }, { label: "Heavy armour", cost: 18 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 15, key: "warhorse" },
            { label: "Pegasus", cost: 25, key: "pegasus" },
            { label: "Aurochs", cost: 40, key: "aurochs" },
            { label: "Griffon", cost: 125, only: "Grand Commander", key: "griffon" } ] },
          { id: "barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: "warhorse" },
          { id: "hooves", type: "toggle", label: "Iron-hard Hooves", cost: 5, per: "flat", requiresMount: "pegasus" },
          { id: "swift", type: "toggle", label: "Swift as the Wind", cost: 5, per: "flat", requiresMount: "pegasus" },
          { id: "talons", type: "toggle", label: "Shredding Talons", cost: 5, per: "flat", requiresMount: "griffon" },
          { id: "swoop", type: "toggle", label: "Swooping Strike", cost: 5, per: "flat", requiresMount: "griffon" },
          { id: "bsb", type: "toggle", label: "Battle Standard (one Captain only)", cost: 25, per: "flat", only: "Captain", bsb: true }
        ],
        notes: "The BSB may carry a Magic Standard with no points limit in addition to any other Magic Items."
      },
      {
        id: "magos", name: "Magos", isCharacter: true,
        access: ["barding"],
        lores: ["Beasts","Death","Heavens","Fire","Light","Life","Metal","Shadow"],
        variants: [
          { name: "Grand Mago", points: 160, wizardLevel: 3, magicBudget: 100 },
          { name: "Mago", points: 65, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 15, key: "warhorse" },
            { label: "Pegasus", cost: 25, key: "pegasus" } ] },
          { id: "barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: "warhorse" },
          { id: "hooves", type: "toggle", label: "Iron-hard Hooves", cost: 5, per: "flat", requiresMount: "pegasus" },
          { id: "swift", type: "toggle", label: "Swift as the Wind", cost: 5, per: "flat", requiresMount: "pegasus" }
        ]
      },
      {
        id: "priests", name: "Priests of Myrmidia", isCharacter: true,
        access: ["spear","lance","light armour","medium armour","heavy armour","shield","barding"],
        variants: [
          { name: "High Priest of Myrmidia", points: 130, magicBudget: 100 },
          { name: "Priest of Myrmidia", points: 90, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Spear", cost: 5 }, { label: "Light lance", cost: 5 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 }, { label: "Heavy armour", cost: 18 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 15, key: "warhorse" },
            { label: "War Altar of Myrmidia", cost: 100, only: "High Priest of Myrmidia", key: "altar" } ] },
          { id: "barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: "warhorse" },
          { id: "drawn", type: "choice", label: "War Altar drawn by", requiresMount: "altar", choices: [
            { label: "Drawn by an Aurochs", cost: 15 }, { label: "Drawn by 2 Bulls", cost: 15 }, { label: "Drawn by 4 Bulls", cost: 25 } ] }
        ],
        notes: "Knows the three Battle Prayers of Myrmidia (not a Wizard)."
      },
      {
        id: "maestro", name: "Maestro", isCharacter: true,
        access: ["additional hand weapon","light armour"],
        variants: [ { name: "Maestro", points: 100, magicBudget: 50 } ],
        options: [
          { id: "wep", type: "choice", label: "Off-hand", choices: [
            { label: "Buckler", cost: 5 }, { label: "Additional hand weapon", cost: 5 } ] },
          { id: "missile", type: "choice", label: "Pistols", choices: [
            { label: "Pistol", cost: 5 }, { label: "Brace of pistols", cost: 6 } ] },
          { id: "throwing", type: "toggle", label: "Throwing weapons", cost: 5, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" }
        ]
      },
      /* ---- Special characters ---- */
      { id: "isabella", name: "Isabella Giovanna Luccelli", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour"],
        variants: [ { name: "Isabella Giovanna Luccelli", points: 295, magicBudget: 0 } ], options: [] },
      { id: "juanfederico", name: "Juan Federico", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour","shield","barding"],
        variants: [ { name: "Juan Federico", points: 205, magicBudget: 0 } ], options: [],
        notes: "Mounted on a Warhorse. Unlocks the Knights of the Inner Circle upgrade (+2/model)." },
      { id: "santiago", name: "Santiago de Vivar", isCharacter: true, isSpecialChar: true,
        access: ["additional hand weapon","heavy armour","barding"],
        variants: [ { name: "Santiago de Vivar", points: 275, magicBudget: 0 } ], options: [],
        notes: "Mounted on Babieca (Warhorse)." },
      { id: "cortez", name: "Francisco Cortez", isCharacter: true, isSpecialChar: true,
        access: ["medium armour"],
        variants: [ { name: "Francisco Cortez", points: 115, magicBudget: 0 } ],
        options: [ { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Warhorse", cost: 12 } ] } ],
        notes: "If included: Conquistadors count as Core Units instead of Special Units." },
      { id: "montoya", name: "Diego Montoya", isCharacter: true, isSpecialChar: true,
        access: ["additional hand weapon"],
        variants: [ { name: "Diego Montoya", points: 130, magicBudget: 0 } ], options: [] },
      { id: "donlomente", name: "Don Lomente", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
        access: ["lance","medium armour","shield"],
        variants: [ { name: "Don Lomente", points: 100, magicBudget: 0 } ], options: [],
        notes: "Mounted on Rocinante (Warhorse). May never be the Army General." },
      { id: "mariadesalvo", name: "Maria de Salvo", isCharacter: true, isSpecialChar: true,
        access: ["additional hand weapon"],
        variants: [ { name: "Maria de Salvo", points: 150, magicBudget: 0 } ], options: [] }
    ],

    /* ------------------------------- CORE -------------------------------- */
    core: [
      { id: "pikemen", name: "Pikemen", perModel: true, basePoints: 6, unitSize: [15,45],
        options: [
          { id: "polearms", type: "toggle", label: "Replace pikes with polearms", cost: 0, per: "flat" },
          { id: "bucklers", type: "toggle", label: "Bucklers", cost: 0.5, per: "model" },
          { id: "armour", type: "toggle", label: "Medium armour", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "rodeleros", name: "Rodeleros", perModel: true, basePoints: 5, unitSize: [15,45],
        options: [
          { id: "wep", type: "choice", label: "Replace bucklers", choices: [
            { label: "Additional hand weapons", cost: 0.5, per: "model" }, { label: "Shields", cost: 0.5, per: "model" } ] },
          { id: "armour", type: "toggle", label: "Medium armour", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "arquebusiers", name: "Arquebusiers", perModel: true, basePoints: 8, unitSize: [10,30],
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "crossbowmen", name: "Crossbowmen", perModel: true, basePoints: 8, unitSize: [10,30],
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "tercios", name: "Tercios", perModel: true, basePoints: 9, unitSize: [20,60],
        options: [
          { id: "polearms", type: "toggle", label: "Replace pikes with polearms", cost: 0, per: "flat" },
          { id: "crossbows", type: "toggle", label: "Replace handguns with crossbows", cost: 0, per: "flat" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "diestros", name: "Diestros", perModel: true, basePoints: 4, unitSize: [10,30],
        options: [
          { id: "wep", type: "choice", label: "Weapons", choices: [
            { label: "Bucklers", cost: 0.5, per: "model" }, { label: "Additional hand weapons", cost: 1, per: "model" },
            { label: "Pistols", cost: 3, per: "model" } ] },
          { id: "throwing", type: "toggle", label: "Throwing weapons", cost: 1, per: "model" },
          { id: "cmd", type: "command", roles: ["leader"] } ] },
      { id: "hidalgos", name: "Hidalgos", perModel: true, basePoints: 13, unitSize: [5,15],
        options: [
          { id: "lances", type: "toggle", label: "Light lances", cost: 1, per: "model" },
          { id: "pistols", type: "toggle", label: "Pistols", cost: 3, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "genitors", name: "Genitors", perModel: true, basePoints: 12, unitSize: [5,15],
        options: [
          { id: "lances", type: "toggle", label: "Light lances", cost: 1, per: "model" },
          { id: "javelins", type: "toggle", label: "Javelins", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "almogavars", name: "Almogavars", perModel: true, basePoints: 4, unitSize: [10,30],
        options: [
          { id: "ambush", type: "toggle", label: "Ambushers", cost: 1, per: "model" },
          { id: "spears", type: "toggle", label: "Spears", cost: 0.5, per: "model" },
          { id: "javelins", type: "toggle", label: "Javelins", cost: 2, per: "model" },
          { id: "shields", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "wardogs", name: "War Dogs", perModel: true, basePoints: 5, unitSize: [10,30],
        attachedPerN: { every: 10, cost: 10, name: "Handler" },
        options: [
          { id: "skirmish", type: "toggle", label: "Skirmishers", cost: 1, per: "model" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", roles: ["musician"] } ],
        notes: "One Handler must be included for every 10 War Dogs in the unit (added automatically)." }
    ],

    /* ------------------------------ SPECIAL ------------------------------ */
    special: [
      { id: "royalguard", name: "Royal Guard", perModel: true, basePoints: 10, unitSize: [10,30],
        options: [
          { id: "gw", type: "toggle", label: "Replace polearms with great weapons", cost: 1, per: "model" },
          { id: "armour", type: "toggle", label: "Heavy armour", cost: 1.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "sistersoffury", name: "Sisters of Fury", perModel: true, basePoints: 11, unitSize: [10,30],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "knights", name: "Knights", perModel: true, basePoints: 15, unitSize: [5,15],
        options: [
          { id: "order", type: "choice", label: "Knightly order", choices: [
            { label: "Knights of the Blazing Sun", cost: 1, per: "model" },
            { label: "Knights of the Righteous Spear", cost: 1, per: "model" } ] },
          { id: "lances", type: "choice", label: "Lances", choices: [
            { label: "Light lances", cost: 1, per: "model" }, { label: "Heavy lances", cost: 2, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields", cost: 2, per: "model" },
          { id: "barding", type: "toggle", label: "Barding", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "conquistadors", name: "Conquistadors", perModel: true, basePoints: 19, unitSize: [5,15],
        options: [
          { id: "armour", type: "toggle", label: "Medium armour", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "musketeers", name: "Musketeers", perModel: true, basePoints: 10, unitSize: [10,30],
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "grenadiers", name: "Grenadiers", perModel: true, basePoints: 12, unitSize: [10,null],
        options: [
          { id: "wep", type: "choice", label: "Firearms", choices: [
            { label: "Pistols", cost: 1, per: "model" }, { label: "Blunderbusses", cost: 2, per: "model" } ] },
          { id: "armour", type: "toggle", label: "Medium armour", cost: 1, per: "model" },
          { id: "cmd", type: "command", roles: ["leader"] } ] },
      { id: "mountainbandits", name: "Mountain Bandits", perModel: true, basePoints: 8, unitSize: [5,15],
        options: [ { id: "cmd", type: "command", roles: ["leader","musician"] } ] },
      { id: "mercenaryogres", name: "Mercenary Ogres", perModel: true, basePoints: 27, unitSize: [3,9],
        options: [
          { id: "wep", type: "choice", label: "Weapons", choices: [
            { label: "Bucklers", cost: 3, per: "model" }, { label: "Additional hand weapons", cost: 3, per: "model" },
            { label: "Polearms", cost: 6, per: "model" }, { label: "Ogre handguns", cost: 6, per: "model" },
            { label: "Ogre pistols", cost: 6, per: "model" }, { label: "Great weapons", cost: 9, per: "model" } ] },
          { id: "armour", type: "toggle", label: "Medium armour", cost: 6, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "falconet", name: "Falconet", perModel: false, basePoints: 60, unitSize: [1,1],
        options: [ { id: "crew", type: "toggle", label: "Additional crew", cost: 5, per: "flat" } ] }
    ],

    /* ------------------------------- RARE -------------------------------- */
    rare: [
      { id: "ragingbull", name: "Knights of the Raging Bull", perModel: true, basePoints: 55, unitSize: [3,6],
        options: [
          { id: "barding", type: "toggle", label: "Barding", cost: 3, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "firebulls", name: "Fire Bulls", perModel: true, basePoints: 12, unitSize: [5,15],
        attachedPerN: { every: 5, cost: 11, name: "Picador" },
        options: [],
        notes: "One Picador (on a Warhorse) must be included for every 5 Fire Bulls in the unit (added automatically)." },
      { id: "culverin", name: "Culverin", perModel: false, basePoints: 85, unitSize: [1,1],
        options: [ { id: "crew", type: "toggle", label: "Additional crew", cost: 5, per: "flat" } ] },
      { id: "lombard", name: "Lombard", perModel: false, basePoints: 80, unitSize: [1,1],
        options: [ { id: "crew", type: "toggle", label: "Additional crew", cost: 5, per: "flat" } ] }
    ]
  }
};
