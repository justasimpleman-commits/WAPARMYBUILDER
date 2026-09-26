/* ============================================================================
   DARK ELVES — army data (Warhammer Armies, Mathias Eliasson v3.0,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA. See SCHEMA.md for the full field reference.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["dark-elves"] = {
  id: "dark-elves",
  name: "Dark Elves",
  author: "Mathias Eliasson v3.0 (unofficial) — 9th Edition 3.0",

  // The book states no explicit composition percentages; use the standard
  // 9th Edition values used by the other bundled books.
  composition: {
    charactersMax: 0.35,   // includes character mounts
    coreMin: 0.25,         // no maximum
    specialMax: 0.50,
    rareMax: 0.25,
    singleUnitMax: 0.25    // no single unit/character may exceed 25%
  },
  // Duplicate-choice limits for Special / Rare, by total points of the game.
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
    "Gifts of Khaine: a model may not have multiples of the same Gift, but a Gift may be taken by more than one model in the army. Gifts share the model's magic-item budget.",
    "Each model may take only one item from each magic-item category.",
    "Slaves: include one Slavemaster for every 20 Slaves in the unit.",
    "Khainite: Khainite models may only join Khainite units, and non-Khainites may not join Khainite units."
  ],

  // Gifts of Khaine are taken from the magic-item budget (per the army list).
  multiPickCategories: ["Gifts of Khaine"],

  magicItems: {
    "Magic Weapons": [
      { name: "Doomsinger", cost: 65 },
      { name: "Chillblade", cost: 50 },
      { name: "Venomfang Blade", cost: 50, only: "Khainite Assassin" },
      { name: "Executioner's Axe", cost: 45, requiresAccess: "great weapon" },
      { name: "Blood Blades", cost: 30, requiresAccess: "additional hand weapon" },
      { name: "Shade Claw", cost: 30 },
      { name: "Lifetaker", cost: 25, requiresAccess: "deathrain crossbow" },
      { name: "Web of Shadows", cost: 25 },
      { name: "Blade of Spite", cost: 20 },
      { name: "Crone Blade", cost: 20 },
      { name: "Deathpiercer", cost: 20, requiresAccess: "heavy lance" },
      { name: "Draich of Dark Power", cost: 20, requiresAccess: "great weapon" },
      { name: "Shadesliver", cost: 20, requiresAccess: "additional hand weapon" },
      { name: "The Mirror Glaive", cost: 20, requiresAccess: "halberd" },
      { name: "Shadracar's Fang", cost: 20 },
      { name: "Soulrender", cost: 20, requiresAccess: "great weapon" },
      { name: "Sword of Ruin", cost: 20 },
      { name: "Caledor's Bane", cost: 15, requiresAccess: "heavy lance" },
      { name: "Heartseeker", cost: 15 },
      { name: "Hydra Blade", cost: 15 },
      { name: "Dagger of Hotek", cost: 10, requiresAccess: "additional hand weapon" }
    ],
    "Magic Armour": [
      { name: "Armour of Eternal Servitude", cost: 50, requiresAccess: "heavy armour" },
      { name: "Armour of Living Death", cost: 40, requiresAccess: "heavy armour" },
      { name: "Armour of Darkness", cost: 35, requiresAccess: "heavy armour" },
      { name: "Blood Armour", cost: 30, requiresAccess: "heavy armour" },
      { name: "Cloak of Hag Graef", cost: 25, requiresAccess: "sea dragon cloak" },
      { name: "Shield of Ghrond", cost: 25, requiresAccess: "shield" }
    ],
    "Talismans": [
      { name: "The Black Amulet", cost: 55 },
      { name: "Soulstone", cost: 55 },
      { name: "Pendant of Khaeleth", cost: 45 },
      { name: "Heart-stone of Darkness", cost: 40 },
      { name: "Crown of Black Iron", cost: 40 },
      { name: "Ring of Darkness", cost: 30 },
      { name: "Ring of Hotek", cost: 30 },
      { name: "Cloak of Twilight", cost: 30 },
      { name: "Shadowshroud Ring", cost: 25 },
      { name: "Seal of Ghrond", cost: 25 },
      { name: "Amber Amulet", cost: 20 },
      { name: "Incorporeal Retainer", cost: 20 },
      { name: "Null Talisman", cost: 10, common: true },
      { name: "Charm of Hotek", cost: 10 }
    ],
    "Arcane Items": [
      { name: "Black Staff", cost: 55 },
      { name: "Shadow Stone", cost: 55 },
      { name: "Darkstar Cloak", cost: 50 },
      { name: "The Sacrificial Dagger", cost: 25 },
      { name: "Focus Familiar", cost: 20 },
      { name: "Crystal Heart", cost: 15 },
      { name: "The Gem of Spite", cost: 15 },
      { name: "Tome of Furion", cost: 15 },
      { name: "Wand of the Kharaidon", cost: 15 },
      { name: "Anklet of Epiphany", cost: 10 }
    ],
    "Enchanted Items": [
      { name: "Rubric of Dark Dimensions", cost: 35 },
      { name: "Asphyxica Censer", cost: 30, only: "Disciple of Khaine" },
      { name: "Crown of Woe", cost: 30 },
      { name: "Decanter of Egos", cost: 30 },
      { name: "Pearl of Infinite Bleakness", cost: 30 },
      { name: "Black Dragon Egg", cost: 25 },
      { name: "Deathmask", cost: 25 },
      { name: "The Hydra's Teeth", cost: 20 },
      { name: "The Guiding Eye", cost: 20 },
      { name: "Crystal of Midnight", cost: 20 },
      { name: "Orb of Ghrond", cost: 15 },
      { name: "The Cloak of Dark Souls", cost: 10 },
      { name: "Gem of Nightmares", cost: 10 },
      { name: "Sevenfold Shadow", cost: 10 }
    ],
    "Magic Standards": [
      { name: "Banner of Nagarythe", cost: 75 },
      { name: "Hydra Banner", cost: 50 },
      { name: "Standard of Hag Graef", cost: 50 },
      { name: "Banner of Cold Blood", cost: 30 },
      { name: "Banner of Murder", cost: 25 },
      { name: "The Blood Banner", cost: 25, only: "Cold One Knights" },
      { name: "Sea Serpent Standard", cost: 25, only: "Corsairs" },
      { name: "Standard of Har Ganeth", cost: 25, only: "Executioners" },
      { name: "Sacrificial Banner", cost: 25 },
      { name: "Dread Banner", cost: 20 },
      { name: "Standard of Slaughter", cost: 20 },
      { name: "Soul Shadows Standard", cost: 15 },
      { name: "Traitor's Banner", cost: 10 }
    ],
    "Gifts of Khaine": [
      { name: "Dance of Doom", cost: 30 },
      { name: "Hand of Khaine", cost: 25 },
      { name: "Rune of Khaine", cost: 25 },
      { name: "Cry of War", cost: 20 },
      { name: "Rending Stars", cost: 20, only: "Khainite Assassin" },
      { name: "Black Lotus", cost: 20, only: "Khainite Assassin" },
      { name: "Touch of Death", cost: 20 },
      { name: "Blood Sigil", cost: 15, only: "Disciple of Khaine" },
      { name: "Dark Venom", cost: 15, only: "Khainite Assassin" },
      { name: "Manbane", cost: 15, only: "Khainite Assassin" },
      { name: "Khainite Pendant", cost: 25 },
      { name: "Witchbrew", cost: 10, only: "Disciple of Khaine" }
    ]
  },

  // Common magic items from the 9th Edition rulebook (verbatim from the shared list).
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
      { name: "Shield of the Warrior True", cost: 15, requiresAccess: "shield" },
      { name: "Dragonhelm", cost: 10 },
      { name: "Enchanted Shield", cost: 10, common: true, requiresAccess: "shield" },
      { name: "Charmed Shield", cost: 5, common: true, requiresAccess: "shield" }
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
    /* ---- special ranged weapon profile (from the source PDF) ---- */
    "Ravager Harpoon": `A Ravager Harpoon has the following profile: Range 24/36", Strength 5, Special Rules: Armour Piercing (1), Multiple Wounds (D3). If a Monstrous Creature or Monster is Hit but survives, it must immediately turn and move D6" towards the Scourgerunner Chariot (stopping within 1" of units/impassable terrain); next turn the target either suffers 1 Wound with no saves or is forced to keep moving D6" towards the chariot.`,
    /* auto-mapped from army-book PDF (unit UPGRADE / option rules) */
    "Acid Breath": `The model gains a Strength 2 Breath Weapon with the Ignores Armour Saves special rule.`,
    "Battle Lover": `The model gains the Vanguard special rule.`,
    "Bloodthirsty": `The model gains the Devastating Charge special rule.`,
    "Chameleon Skin": `All enemy missile attacks targeting the model suffer -1 To Hit.`,
    "Daerlythe's Aura": `The model gains the Magic Resistance (2) special rule.`,
    "Fiery Breath": `The model gains a Breath Weapon with the Flaming Attacks special rule. The Strength of this attack is equal to the War Hydra's remaining Wounds.`,
    "Spit Fire": `The model gains a shooting attack with the following profile:`,

    "At Them": `At Them, You Curs!: If a Black Ark Fleetmaster joins a unit of Black Ark Corsairs, they may both re-roll failed To Hit rolls of 1 in close combat.`,

    /* auto-mapped from army-book PDF (unit-profile special rules) */
    "Absolute Power": `If you take Malekith, he must be your Army General. Malekith has the Inspiring Presence (18) special rule.`,
    "Abyssal Howl": `Enemy units that are in base contact with a Kharibdyss must re-roll successful Leadership tests. This has no effect on models that have Immunity (Fear/Terror/Psychology).`,
    "Altar of Khaine": `The Cauldron of Blood has the Magical Ward (6+) special rule. In addition, any unit joined by it gains the Stubborn special rule.`,
    "Aura of Agony": `Enemy units within 6" suffer a -1 penalty to their Weapon Skill, Initiative and Leadership (to a minimum of 1).`,
    "Beastlord": `Any friendly Monster within 12" of Rakarth treat him as having the Hold Your Ground! special rule. In addition, his Beastslaver special rule affects Bracchus.`,
    "Beloved of Khaine": `All Khainite models always treat Morathi as the Army's General for all purposes, regardless of what character is the Army General.`,
    "Blades of the Blood Queen": `Tullaris must be accompanied by a unit of Har Ganeth Executioners chosen from the army list at a cost of +1 point per model. This unit has the Frenzy special rule. Tullaris may never choose to leave this unit.`,
    "Bloodrage": `The Manticore gains the Hatred special rule.`,
    "Burnt Offerings": `Krethusa knows the three prophecies listed below. She may attempt to use one at the start of each of your Magic phases by taking a Leadership test on her own unmodified Leadership If passed, the prophecy is fulfilled and takes immediate effect. Each prophecy targets one friendly unit within 12".`,
    "Enchanting Beauty": `All models suffer -1 To Hit against Morathi in close combat. This has no effect on models with the Immunity (Psychology) special rule.`,
    "Feast of Bones": `Roll a D6 for each unsaved Wound caused by this model with its normal Attacks. On the roll of a 6+, the Kharibdyss immediately regains 1 Wound lost previously during the game.`,
    "Foresight of Morai-Heg": `Krethusa has a 4+ invulnerable save.`,
    "Idol of Worship": `All friendly Dark Elves within 12" of an Avatar of Khaine gain +1 Leadership.`,
    "Impale": `Dark Pegasi gain +1 Strength to their Impact Hits.`,
    "Iron-hard Skin": `The Manticore gains the Natural Armour (5+) special rule.`,
    "Khaine's Sacred Slaughterer": `Each time Tullaris inflicts a successful Killing Blow, he and his unit gain a +1 bonus to their combat resolution score, in addition to any wounds inflicted by him.`,
    "Master of Disguise": `Shadowblade can deploy using the Hidden special rule like an Assassin. If he does so, he can change which unit he is hiding in at the start of any Movement or Close Combat phase – keep a note of where Shadowblade is each time you change your mind. If an opponent has an ability that forces you to state that there are 'hidden' models within a unit, you only need to say that Shadowblade is hiding within a unit, but not which unit he is currently in.`,
    "Merciless Slaver": `If an enemy unit breaks from a close combat that includes Lokhir Fellheart, all units taking Panic tests as a result of that unit breaking suffer a -1 penalty to their Leadership value for that test.`,
    "Murderous Swashbuckler": `If Lokhir makes a successful Parry save, he may immediately make an additional Attack back against the model that struck the blow.`,
    "Not Just a Dumb Brute": `Any unit of Cold One Knights joined by Spite are not subject to their normal Stupidity.`,
    "Noxious Breath": `A Black Dragon has a Strength 3 Breath Weapon. All models in a unit that has suffered one or more casualties from the attack suffer a -1 penalty to their Weapon Skill and Ballistic Skill until the end of the following turn.`,
    "Orgy of Slaughter": `The model and any unit they join gain the Hatred special rule.`,
    "Paragon of Slaughter": `A High Gladiatrix and all Sisters of Slaughter in a unit that is joined by one or more High Gladiatrixes gain the Armour Piercing (1) special rule.`,
    "Queen of Khaine": `If Hellebron is your General, all Witch Elves are taken as Core units rather than as Special units.`,
    "Ravagers of Rakarth": `If Rakarth is included in your army, you may upgrade any Scourgerunner Chariots to the Ravagers of Rakarth for a cost of +5 points per model. These models gain the Poisoned Attacks special rule.`,
    "Show no Weakness": `Each unsaved Wound caused by a Fleetmaster counts as two Wounds when calculating combat resolution. In addition, a Fleetmaster must always accept challenges. While fighting challenges, the Fleetmaster may re-roll all failed rolls To Hit.`,
    "Sisters of the Singing Doom": `If Crone Hellebron is included in your army, you may upgrade one unit of Witch Elves to the Sisters of the Singing Doom for a cost of +1 point per model. This unit gains the Fear special rule.`,
    "The First Sorceress": `Morathi has a +2 casting bonus. In addition, she can choose her spells from all the Lores of Magic available to her, in any combination she wishes. Note that she always has the Doombolt of Kharaidon as her Signature Spell.`,
    "The Right Hand of Darkness": `If Kouran Darkhand is in a unit of Black Guard, he and all models in that unit have the Unbreakable special rule.`,
    "Tz'arkan": `Malus Darkblade may unleash the power of Tz'arkan at the start of any friendly Movement phase. Once the Daemon is released, he cannot be bound back during the battle. If Malus releases Tz'arkan, the following rules apply for the rest of the game: - Malus Darkblade immediately gains 5+ Ward save and the Frenzy special rule, but loses Elven Grace, Eternal Hatred and Murderous Prowess. - Malus Darkblade gains +1 Weapon Skill, +1 Strength, +2 Toughness and +1 Initiative. However, friendly units can no longer use his Leadership. - Each time Malus Darkblade makes a To Hit roll of 1, a friendly model in base contact (of your choice) is struck by the attack instead. Roll to Wound as normal.`,
    "Venom Tail": `The Manticore gains an additional Attack that has the Poisoned Attacks special rule.`,
    "Wrath of Khaine": `For each successful Killing Blow scored (before any saves), the Avatar of Khaine immediately gets to make an additional Attack.`,
    "Wrath of the Melusai": `Any unit of Melusai joined by a Melusai Ironscale can re-roll failed charge and pursue distances.`,

    "Armour Plates": `The model gains the Natural Armour (6+) special rule.`,
    "Elven Grace": `Models with this rule have the Dodge (6+) special rule in close combat, but it cannot be used against enemies that strike before the model with Elven Grace.`,
    "Eternal Hatred": `The model has the Hatred special rule in addition to Hatred (High Elves).`,
    "Hekarti's Blessing": `A Wizard with this rule gains a +1 casting bonus.`,
    "Murderous Prowess": `The model may re-roll all To Wound rolls of 1 when making close combat attacks.`,
    "Khainite": `Khainite models (except those deploying Hidden) may only join units that are also Khainite, and non-Khainite models may not join Khainite units.`,
    "Sea Dragon Cloak": `Gives the wearer Natural Armour (5+) against missile attacks.`,
    "Deathrain Crossbow": `16/24", Strength 2, Multiple Shots (3), Rapid Fire.`,
    "Repeater Handbow": `8/12", Strength 2, Multiple Shots (3), Quick Shot, Rapid Fire.`,
    "Slavers": `When a unit of 5+ Corsairs breaks an enemy in close combat and pursues, the fleeing unit must re-roll the highest result on its flee roll.`,
    "Blood Rites": `The Disciple knows three Blood Rites (Catechism of Murder, Crimson Rejuvenation, Sacrament of Blood) and may attempt one each turn with a Leadership test; the effect lasts until your next turn.`,
    "Dance of Death": `The model has Dodge (5+) (re-rolling failed Dodge saves); at the start of each combat round, one enemy unit in base contact loses its Rank Bonus and may not make Parry saves that turn.`,
    "The Trial of Blades": `+1 To Hit and To Wound if at least one enemy model in base contact has Weapon Skill 5+ and/or Strength 4+.`,
    "Gory Offering": `If a Melusai Ironscale slays any enemy in close combat, all Melusai in her unit gain Frenzy for the rest of that Close Combat phase.`,
    "Avert Your Gaze": `At the start of each Close Combat phase, enemy models in base contact suffer a Strength 4 hit with Ignores Armour Saves, Magical Attacks and Killing Blow; To Wound uses the target's Initiative in place of Toughness.`,
    "Bloodwrack Stare": `12" shooting attack: Strength 4, Ignores Armour Saves, Killing Blow, Magical Attacks, Multiple Shots (5), Quick to Fire; To Wound uses Initiative in place of Toughness, with no To Hit penalties.`,
    "Blessings of Khaine": `Each turn the Cauldron grants all friendly Dark Elves within 6" one Blessing (Bloodshield, Fury, or Strength of Khaine) until your next turn.`,
    "Cursed Coven": `+1 casting bonus per 5 Doomfire Warlocks in the unit. On a miscast, no Miscast table roll — instead the unit suffers D3 Wounds with no saves.`,
    "Loss of Heads": `For each unsaved Wound the War Hydra has suffered, it loses one Attack.`,
    "Slavemaster": `Each Slaves unit takes a Leadership test at the start of its turn; if failed it suffers D6 Strength 3 hits per Slavemaster in the unit.`,
    "Fight and Flight": `In any combat phase it doesn't break (or break the enemy), a Khinerai unit may disengage and make a Feigned-Flight Flee move, then rally automatically; the enemy may not pursue.`,
    "Harness Shadow": `Missile attacks targeting a unit with one or more of these models suffer -1 To Hit.`,
    "Shadowleap": `Instead of moving normally in the Remaining Moves sub-phase, the unit may make a Fly (6) move.`,
    "Beastslaver": `On foot, a Beastmaster can join units of Monsters with Mixed Unit; a Monster joined by Beastmaster(s) (or a Monstrous Creature it rides) gains +D3 Attacks.`,
    "Expendable": `A friendly unit charging through this unit, or that this unit flees through, ignores the usual penalties.`,
    "Mixed Unit": `A single unit made up of different model types (e.g. handlers and a monster) that share a movement tray.`
  },

  // Profile rows: [name, M, WS, BS, S, T, W, I, A, Ld].
  unitInfo: {
    commanders:{profile:[["Dreadlord",5,7,7,4,3,3,8,4,10],["Dreadmaster",5,6,6,4,3,2,7,3,9]],eq:"Hand weapon",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess. One Dreadmaster may be the Battle Standard Bearer."},
    sorceresses:{profile:[["Supreme Sorceress",5,4,4,3,3,3,5,1,9],["Sorceress",5,4,4,3,3,2,5,1,8]],eq:"Hand weapon",rules:"Elven Grace, Hatred (High Elves), Hekarti's Blessing, Murderous Prowess. Wizard: Sorceress L1 / Supreme L3 — Beasts, Dark, Death, Fire, Heavens, Light, Life, Metal, Shadow."},
    hagsofkhaine:{profile:[["Hag Queen",5,7,5,4,3,3,8,4,10],["Death Hag",5,6,5,4,3,2,7,3,9]],eq:"Hand weapon",rules:"Elven Grace, Hatred (High Elves), Frenzy, Khainite, Murderous Prowess, Poisoned Attacks. One Death Hag may be the Battle Standard Bearer."},
    fleetmaster:{profile:[["Fleetmaster",5,6,6,4,3,2,7,3,9]],eq:"Hand weapon",rules:"Ambushers, Elven Grace, Hatred (High Elves), Murderous Prowess; At Them, You Curs!; Show no Weakness."},
    beastmaster:{profile:[["Beastmaster",5,5,5,4,3,2,6,2,8]],eq:"Hand weapon",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess; Beastslaver."},
    disciple:{profile:[["Disciple of Khaine",5,5,5,4,3,2,6,2,9]],eq:"Hand weapon",rules:"Elven Grace, Hatred (High Elves), Khainite, Magical Attacks, Murderous Prowess; Orgy of Slaughter; Blood Rites."},
    assassin:{profile:[["Khainite Assassin",5,9,9,4,3,2,10,3,9]],eq:"Hand weapon",rules:"Dodge (5+), Hatred (High Elves), Hidden, Immunity (Psychology), Khainite, Murderous Prowess, Poisoned Attacks, Scouts."},
    gladiatrix:{profile:[["High Gladiatrix",5,8,5,4,3,2,7,4,9]],eq:"Hand weapon",rules:"Hatred (High Elves), Immunity (Fear), Killing Blow, Murderous Prowess; Dance of Death; Paragon of Slaughter; The Trial of Blades. May not be Army General."},
    ironscale:{profile:[["Melusai Ironscale",6,6,5,4,4,3,7,4,9]],eq:"Keldrisaíth (polearm), medium armour",rules:"Elven Grace, Hatred (High Elves), Khainite, Magic Resistance (1), Murderous Prowess, Natural Armour (6+), Swiftstride, Vanguard; Gory Offering; Wrath of the Melusai. May not be Army General."},
    dreadspears:{profile:[["Dreadspear",5,4,4,3,3,1,5,1,8]],eq:"Spear, medium armour, shield",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess"},
    bleakswords:{profile:[["Bleaksword",5,4,4,3,3,1,5,1,8]],eq:"Hand weapon, medium armour, shield",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess"},
    darkshards:{profile:[["Darkshard",5,4,4,3,3,1,5,1,8]],eq:"Hand weapon, Deathrain crossbow, medium armour",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess"},
    corsairs:{profile:[["Corsair",5,4,4,3,3,1,5,1,8]],eq:"Two hand weapons, light armour, Sea Dragon Cloak",rules:"Ambushers, Elven Grace, Hatred (High Elves), Murderous Prowess; Slavers"},
    witchelves:{profile:[["Witch Elf",5,4,4,3,3,1,6,1,8]],eq:"Two hand weapons",rules:"Elven Grace, Hatred (High Elves), Frenzy, Khainite, Murderous Prowess, Poisoned Attacks"},
    darkriders:{profile:[["Dark Rider",5,4,4,3,3,1,5,1,8],["Dark Steed",9,3,0,3,3,1,4,1,5]],eq:"Light lance, light armour",rules:"Elven Grace, Fast Cavalry, Hatred (High Elves), Murderous Prowess"},
    slaves:{profile:[["Slave",4,2,2,3,3,1,3,1,4],["Slavemaster",5,4,4,3,3,1,5,1,8]],eq:"Hand weapons",rules:"Expendable, Mixed Unit, Vanguard; Slavemaster (Elven Grace, Hatred, Murderous Prowess on Slavemaster only). One Slavemaster per 20 Slaves."},
    harpies:{profile:[["Harpy",5,3,0,3,3,1,5,2,6]],eq:"—",rules:"Expendable, Independent, Fly (10)"},
    executioners:{profile:[["Executioner",5,5,4,4,3,1,5,1,8]],eq:"Great weapon, heavy armour",rules:"Elven Grace, Hatred (High Elves), Killing Blow, Khainite, Murderous Prowess"},
    bloodhags:{profile:[["Blood Hag",5,5,4,3,3,1,6,1,8]],eq:"Polearm, throwing weapons, medium armour",rules:"Elven Grace, Hatred (High Elves), Frenzy, Khainite, Murderous Prowess, Poisoned Attacks"},
    sisters:{profile:[["Sister of Slaughter",5,6,4,3,3,1,6,2,9]],eq:"Hand weapon, buckler",rules:"Hatred (High Elves), Immunity (Fear), Murderous Prowess; Dance of Death; The Trial of Blades"},
    shades:{profile:[["Shade",5,5,5,3,3,1,5,1,8]],eq:"Hand weapon, Deathrain crossbow",rules:"Elven Grace, Hatred (High Elves), Independent, Murderous Prowess, Scouts, Skirmishers"},
    coldoneknights:{profile:[["Cold One Knight",7,5,4,4,3,1,6,1,9],["Cold One",7,3,0,4,4,1,2,2,3]],eq:"Heavy lance, heavy armour, shield",rules:"Elven Grace, Fear, Hatred (High Elves), Murderous Prowess, Natural Armour (6+), Stupidity"},
    coldonechariot:{profile:[["Cold One Chariot",6,"–","–",5,5,4,"–","–","–"],["Charioteer","–",5,4,4,"–","–",6,1,9],["Cold One","–",3,0,4,"–","–",2,2,"–"]],eq:"Light lance, Deathrain crossbow, heavy armour, scythes",rules:"Elven Grace, Fear, Hatred (High Elves), Murderous Prowess, Natural Armour (6+), Stupidity"},
    scourgerunner:{profile:[["Scourgerunner Chariot",8,"–","–",4,4,4,"–","–","–"],["Beastmaster Crew","–",4,4,3,"–","–",5,1,8],["Dark Steed","–",3,0,3,"–","–",4,1,"–"]],eq:"Light lance, Deathrain crossbow, Ravager Harpoon, Sea Dragon Cloak",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess"},
    reaper:{profile:[["Reaper Bolt Thrower","–","–","–","–",7,1,"–","–","–"],["Crew",5,4,4,3,3,1,5,1,8]],eq:"Hand weapon, repeater bolt thrower, medium armour (crew of 2)",rules:"Elven Grace, Hatred (High Elves), Murderous Prowess"},
    melusai:{profile:[["Melusai",6,5,5,3,4,2,5,2,8]],eq:"Heartshard Glaive (polearm), light armour",rules:"Elven Grace, Hatred (High Elves), Khainite, Murderous Prowess, Natural Armour (6+), Swiftstride, Vanguard"},
    khinerai:{profile:[["Khinerai",5,4,4,3,3,1,6,2,8]],eq:"Hand weapon, light armour, shield",rules:"Ambushers, Elven Grace, Fly (10), Hatred (High Elves), Khainite, Murderous Prowess; Fight and Flight"},
    medusa:{profile:[["Bloodwrack Medusa",6,5,5,4,4,3,5,3,7]],eq:"Polearm",rules:"Elven Grace, Frenzy, Hatred (High Elves), Independent, Murderous Prowess, Natural Armour (6+); Avert Your Gaze; Bloodwrack Stare"},
    blackguard:{profile:[["Black Guard",5,5,4,4,3,1,6,2,9]],eq:"Polearm, heavy armour",rules:"Elven Grace, Eternal Hatred, Immunity (Psychology), Murderous Prowess, Stubborn"},
    shadowstalkers:{profile:[["Shadowstalker",5,5,5,3,3,1,6,2,8]],eq:"Two hand weapons, throwing weapons",rules:"Elven Grace, Hatred (High Elves), Loner, Murderous Prowess, Poisoned Attacks, Scouts, Skirmishers; Harness Shadow; Shadowleap"},
    warlocks:{profile:[["Doomfire Warlock",5,4,4,3,3,1,5,2,8],["Dark Steed",9,3,0,3,3,1,4,1,5]],eq:"Hand weapon",rules:"Elven Grace, Fast Cavalry, Hatred (High Elves), Hekarti's Blessing, Magical Ward (4+), Murderous Prowess, Poisoned Attacks; Cursed Coven. The unit is a Level 1 Wizard — Dark, Death, Shadow."},
    cauldron:{profile:[["Cauldron of Blood",5,"–","–",5,6,5,"–","–","–"],["Keeper of the Cauldron","–",4,4,3,"–","–",6,2,8],["Guardian","–",4,4,3,"–","–",6,1,8]],eq:"Two hand weapons",rules:"Elven Grace, Hatred (High Elves), Frenzy, Impact Hits (D3), Khainite, Murderous Prowess, Poisoned Attacks, Terror; Altar of Khaine; Blessings of Khaine. LoS value 5."},
    bloodwrackshrine:{profile:[["Bloodwrack Shrine",5,"–","–",5,6,5,"–","–","–"],["Shrinekeeper","–",4,4,3,"–","–",5,1,8],["Bloodwrack Medusa","–",5,5,4,"–","–",5,3,"–"]],eq:"Polearm",rules:"Elven Grace, Hatred (High Elves), Impact Hits (D3), Murderous Prowess, Natural Armour (6+), Terror; Aura of Agony; Avert Your Gaze; Bloodwrack Stare. LoS value 5."},
    warhydra:{profile:[["War Hydra",6,4,4,5,5,5,2,8,6],["Beastmaster Apprentice",5,4,4,3,3,1,5,1,8]],eq:"Two hand weapons (Apprentices only)",rules:"Mixed Unit, Natural Armour (4+), Regeneration (4+); Loss of Heads. (Apprentice: Elven Grace, Hatred, Murderous Prowess.)"},
    kharibdyss:{profile:[["Kharibdyss",6,5,0,6,6,5,4,5,6],["Beastmaster Apprentice",5,4,4,3,3,1,5,1,8]],eq:"Two hand weapons (Apprentices only)",rules:"Aquatic, Mixed Unit, Multiple Wounds (D3), Natural Armour (4+), Poisoned Attacks; Abyssal Howl; Feast of Bones. (Apprentice: Elven Grace, Hatred, Murderous Prowess.)"},
    avatar:{profile:[["Avatar of Khaine",6,6,0,6,7,5,3,5,10]],eq:"Hand weapon, heavy armour",rules:"Animated Construct, Hatred, Killing Blow, Magical Ward (5+), Unstable; Idol of Worship; Wrath of Khaine"},
    darksteed:{profile:[["Dark Steed",9,3,0,3,3,1,4,1,5]],eq:"—",rules:"War Beast. May take barding (+5)."},
    coldone:{profile:[["Cold One",7,3,0,4,4,1,2,2,3]],eq:"—",rules:"Fear, Natural Armour (6+), Stupidity. May take barding (+5)."},
    darkpegasus:{profile:[["Dark Pegasus",8,3,0,4,4,2,4,2,6]],eq:"—",rules:"Fly (9); Impale (+1 Strength to Impact Hits)."},
    manticore:{profile:[["Manticore",6,5,0,5,5,4,5,4,5]],eq:"—",rules:"Fly (8), Frenzy, Killing Blow. Upgrades: Rending Fangs, Bloodrage, Iron-hard Skin, Venom Tail."},
    blackdragon:{profile:[["Black Dragon",6,6,0,6,6,6,3,5,8]],eq:"—",rules:"Fly (7), Natural Armour (3+); Noxious Breath."},
    /* Special characters */
    malekith:{profile:[["Malekith",5,8,7,5,4,3,8,4,10],["Seraphon (Black Dragon)",6,7,0,6,6,6,3,6,8]],eq:"Fixed: Destroyer, Hand of Khaine, Armour of Midnight, Supreme Spellshield, Circlet of Iron",rules:"Elven Grace, Fear, Eternal Hatred, Hekarti's Blessing, Immunity (Psychology), Murderous Prowess; Absolute Power (must be General, Inspiring Presence 18); Black Guard become Special. Wizard L4 — Dark Magic."},
    morathi:{profile:[["Morathi",5,5,4,3,3,3,6,3,10],["Sulephet (Dark Pegasus)",8,4,0,4,4,2,4,3,6]],eq:"Fixed: Heartrender & the Darksword, Amber Amulet",rules:"Elven Grace, Hatred (High Elves), Hekarti's Blessing, Khainite, Murderous Prowess; A Thousand and One Dark Blessings; Beloved of Khaine; Enchanting Beauty; The First Sorceress (+2 cast, any lore). Wizard L4 — Dark, Death, Shadow."},
    malus:{profile:[["Malus Darkblade",5,7,7,4,3,3,8,4,10],["Spite",7,3,0,4,4,1,2,3,4]],eq:"Heavy armour, Sea Dragon Cloak. Fixed: Warpsword of Khaine",rules:"Elven Grace, Eternal Hatred, Murderous Prowess; Tz'arkan; Not Just a Dumb Brute."},
    hellebron:{profile:[["Crone Hellebron",5,7,7,4,3,3,9,4,10]],eq:"Light armour. Fixed: Deathsword & the Cursed Blade, Amulet of Dark Fire; Gifts: Cry of War, Rune of Khaine, Witchbrew",rules:"Elven Grace, Hatred (High Elves), Frenzy, Khainite, Murderous Prowess, Poisoned Attacks; Queen of Khaine (Witch Elves become Core); Sisters of the Singing Doom."},
    rakarth:{profile:[["Rakarth",5,6,6,4,3,3,6,3,10],["Bracchus (Black Dragon)",6,6,0,6,6,6,3,5,8]],eq:"Fixed: Whip of Agony, Beast Armour of Clar Karond",rules:"Beastslaver, Hatred (High Elves), Fly (7), Murderous Prowess, Natural Armour (3+), Noxious Breath; Beastlord; Ravagers of Rakarth."},
    krethusa:{profile:[["Krethusa",5,4,4,3,3,3,5,2,9]],eq:"Hand weapon",rules:"Elven Grace, Fly (10), Hatred (High Elves), Hekarti's Blessing, Murderous Prowess; Burnt Offerings; Foresight of Morai-Heg (4+ invuln). Wizard L3 — Shadow (+ Flock of Doom)."},
    kouran:{profile:[["Kouran Darkhand",5,8,6,4,3,2,7,3,9]],eq:"Fixed: Crimson Death, The Armour of Grief",rules:"Elven Grace, Hatred, Hatred (High Elves), Immunity (Psychology), Murderous Prowess, Stubborn; The Right Hand of Darkness."},
    tullaris:{profile:[["Tullaris Dreadbringer",5,7,6,4,3,2,7,3,9]],eq:"Heavy armour. Fixed: The First Draich",rules:"Elven Grace, Hatred (High Elves), Fear, Frenzy, Khainite, Killing Blow, Murderous Prowess; Blades of the Blood Queen; Khaine's Sacred Slaughterer."},
    lokhir:{profile:[["Lokhir Fellheart",5,6,6,4,3,2,7,3,9]],eq:"Medium armour, Sea Dragon Cloak. Fixed: The Red Blades, Helm of the Kraken",rules:"Ambushers, At Them You Curs!, Elven Grace, Hatred (High Elves), Murderous Prowess, Show no Weakness; Murderous Swashbuckler; Merciless Slaver."},
    shadowblade:{profile:[["Shadowblade",6,10,10,4,3,2,10,3,9]],eq:"Two hand weapons, throwing weapons. Fixed: Heart of Woe, Potion of Diabolic Strength; Gifts: Black Lotus, Dance of Doom, Dark Venom, Hand of Khaine, Manbane, Touch of Death",rules:"Dodge (5+), Hatred (High Elves), Hidden, Immunity (Psychology), Khainite, Murderous Prowess, Poisoned Attacks, Scouts; Master of Disguise."}
  },

  itemDesc: {
    /* ---- Dark Elf Magic Weapons ---- */
    "Doomsinger":`At the start of each round of close combat roll a D3 — increase the wielder's Weapon Skill, Strength and Attacks by that number for the round.`,
    "Chillblade":`Attacks wound automatically and have Ice Attacks. For each unsaved Wound from the Chillblade, the target suffers -1 Attack until the end of the Close Combat phase.`,
    "Venomfang Blade":`Khainite Assassin only. Any model that suffers an unsaved Wound must pass a Toughness test on 2D6 or lose all remaining wounds.`,
    "Executioner's Axe":`Infantry only. Great weapon. The wielder counts as Strength double the target's Toughness, attacks have Multiple Wounds (D3), and the wielder gains Khainite.`,
    "Blood Blades":`Hag Queen or Death Hag only. Two hand weapons granting +1 Strength and Multiple Wounds (D3).`,
    "Shade Claw":`The wielder gains Ignores Armour Saves; no Parry saves may be taken against it.`,
    "Lifetaker":`Deathrain crossbow. 30", Strength 4, Armour Piercing (1), Multiple Shots (3); ignores all To Hit modifiers.`,
    "Web of Shadows":`One use. In addition to normal attacks, one model in base contact automatically takes 2D6 Strength 3 hits.`,
    "Blade of Spite":`Any To Hit roll of 5+ automatically Wounds (armour saves apply). No effect on models with Immunity (Poisoned Attacks).`,
    "Crone Blade":`Hag Queen or Death Hag only. Roll a D6 for each unsaved Wound caused in close combat; on 4+ regain 1 Wound lost earlier.`,
    "Deathpiercer":`Heavy lance. Attacks have Killing Blow.`,
    "Draich of Dark Power":`On foot only. Great weapon. Ignores the great-weapon Initiative penalty and gains Killing Blow; wielder gains Khainite.`,
    "Shadesliver":`Additional hand weapon. After each combat round in which the bearer inflicts one or more unsaved Wounds, this weapon gains +1 Strength for the rest of the battle (cumulative).`,
    "The Mirror Glaive":`Polearm. Each time an enemy spell cast at the bearer or their unit is dispelled, you may cast it back as a Bound Spell using your Dispel dice as Power dice.`,
    "Shadracar's Fang":`The wielder gains +1 To Hit and Killing Blow.`,
    "Soulrender":`Great weapon. Attacks have Armour Piercing (1); wielder gains Khainite.`,
    "Sword of Ruin":`Attacks have Ignores Armour Saves.`,
    "Caledor's Bane":`Heavy lance. Grants Devastating Charge; attacks ignore Natural Armour.`,
    "Heartseeker":`The wielder may re-roll all failed To Hit and To Wound rolls in close combat.`,
    "Hydra Blade":`The wielder gains Random Attacks (D6) in addition to their normal attacks.`,
    "Dagger of Hotek":`Additional hand weapon granting Always Strikes First.`,
    /* ---- Dark Elf Magic Armour ---- */
    "Armour of Eternal Servitude":`Heavy armour. The wearer gains Regeneration (4+).`,
    "Armour of Living Death":`Heavy armour. +1 Toughness and +1 Wound, but the wearer becomes subject to Stupidity.`,
    "Armour of Darkness":`Heavy armour. Grants a 3+ armour save and Immunity (Armour Piercing).`,
    "Blood Armour":`Heavy armour. For every unsaved Wound the wearer inflicts in close combat, their armour save improves by 1 (to a max of 2+) for the rest of the game.`,
    "Cloak of Hag Graef":`Sea Dragon Cloak. Any missile attack on the wearer has its Strength halved (rounding up) before rolling To Wound.`,
    "Shield of Ghrond":`Shield. All Hits on the model are resolved at -1 Strength.`,
    /* ---- Dark Elf Talismans ---- */
    "The Black Amulet":`Magical Ward (4+). Each successful Ward save in close combat inflicts one Wound (Ignores Armour Saves) on the attacker that struck the blow.`,
    "Soulstone":`Charm, one use. Makes the Sorceress immune to the effects of her first Miscast.`,
    "Pendant of Khaeleth":`On foot only. Roll a D6 per Wound suffered; on a roll lower than the attack's Strength the Wound is saved. Rolls of 6 always fail.`,
    "Heart-stone of Darkness":`The bearer gains Magical Ward (4+) against close combat attacks.`,
    "Crown of Black Iron":`+1 Leadership, Magical Ward (5+) and Magic Resistance (1).`,
    "Ring of Darkness":`Close combat attacks against the bearer use half their Weapon Skill (round up); missile attacks at the bearer or their unit use half their Ballistic Skill (round up).`,
    "Ring of Hotek":`The bearer and their unit have Magic Resistance (3). Enemy Wizards casting/targeting a spell on a unit within 12" miscast on double 6 as well as double 1.`,
    "Cloak of Twilight":`Infantry or Cavalry only. Enemy units beyond 12" cannot charge or target the bearer with missiles/spells; within 12" they must first roll 4+, choosing a new target if failed.`,
    "Shadowshroud Ring":`One use. Use at the start of any of your turns: until your next turn, no enemy unit can declare a charge or target the bearer's unit with spells/missiles unless within 6".`,
    "Seal of Ghrond":`Adds +1 Dispel dice to your dispel pool at the start of every enemy Magic phase.`,
    "Amber Amulet":`The wearer gains Regeneration (5+).`,
    "Incorporeal Retainer":`Wizard only. Enemy models attacking the bearer must re-roll successful To Hit rolls.`,
    "Null Talisman":`The bearer and their unit gain a +3 dispel bonus against enemy spells targeting them directly. Common.`,
    "Charm of Hotek":`Grants a 6+ armour save and Immunity (Flaming Attacks).`,
    /* ---- Dark Elf Arcane Items (must start Relic/Charm/Staff) ---- */
    "Black Staff":`Staff. When casting, add a free power dice after rolling; if that dice rolls a 1 the Wizard suffers 1 Wound (Ignores Armour Saves).`,
    "Shadow Stone":`Relic. When casting Lore of Shadow spells, +1 casting bonus and re-roll a single natural 1 per casting attempt.`,
    "Darkstar Cloak":`Relic. The Wizard gains +D3 Power dice each Magic phase; only they may use them.`,
    "The Sacrificial Dagger":`Relic. Once per casting attempt, sacrifice one model in the unit (no saves) and roll a D6; on 2+ gain an extra power dice added to the result (can exceed normal level limits). On a 1, sacrifice another or accept the result.`,
    "Focus Familiar":`Relic. Place a marker within 6" of the Wizard each Magic phase; use that position for range and line of sight for spells.`,
    "Crystal Heart":`Relic. May cast the same spell twice per Magic phase; each time, roll a D6 first — on a 1 the model suffers a Wound (Ignores Armour Saves).`,
    "The Gem of Spite":`Relic. Whenever the bearer miscasts, inflicts a single Strength 6 hit on every enemy Wizard within 18".`,
    "Tome of Furion":`Relic. The bearer gains Loremaster (Lore of Dark Magic).`,
    "Wand of the Kharaidon":`Staff. When casting Doombolt (Lore of Dark Magic), re-roll the number of Hits caused.`,
    "Anklet of Epiphany":`Relic. +6" to the range of the bearer's spells (except auras) while within 6" of a terrain feature.`,
    /* ---- Dark Elf Enchanted Items ---- */
    "Rubric of Dark Dimensions":`Bound spell (Level 2, cast on 7+). Direct damage on all enemy models in base contact with the caster: each passes a Strength test per Wound on its profile or suffers a Wound (Ignores Armour Saves).`,
    "Asphyxica Censer":`Disciple of Khaine only. At the start of each combat round, all enemy models in base contact take a Toughness test or suffer a Wound with no saves.`,
    "Crown of Woe":`Hag Queen or Death Hag only. Enemy units within 6" cannot use Inspiring Presence; after the bearer slays a model in close combat, the range increases to 12" for the rest of the game.`,
    "Decanter of Egos":`Wizard only. All friendly units within 6" of the bearer gain +1 Movement.`,
    "Pearl of Infinite Bleakness":`The bearer and their unit gain Immunity (Psychology). Enemy units in base contact suffer -1 Leadership (no effect on Immunity (Psychology) models).`,
    "Black Dragon Egg":`One use. Consume at the start of any player turn: for that turn the bearer has Strength and Toughness 6 and the Noxious Breath special rule.`,
    "Deathmask":`The wearer causes Terror.`,
    "The Hydra's Teeth":`One use. At the start of any Close Combat phase, inflicts 5D6 Weapon Skill 2, Strength 3 attacks on one enemy unit in base contact.`,
    "The Guiding Eye":`The bearer and their unit may re-roll 1's To Hit with missile weapons.`,
    "Crystal of Midnight":`Nominate an enemy Wizard within 12" at the start of any Dark Elves turn; it must pass a Leadership test or lose a randomly determined spell for the rest of the battle.`,
    "Orb of Ghrond":`At the start of each of your turns (not in combat) take a Stupidity test; if passed, re-roll all failed To Hit rolls and re-roll one power or dispel dice until your next turn.`,
    "The Cloak of Dark Souls":`On foot only. The wearer gains Hidden and Scouts.`,
    "Gem of Nightmares":`One use. At the start of any turn, until end of turn the model and its unit gain Terror.`,
    "Sevenfold Shadow":`On foot only, one use. Instead of moving in the Remaining Moves sub-phase, move the model anywhere on the battlefield (not within 6" of an enemy or 1" of impassable terrain).`,
    /* ---- Dark Elf Magic Standards ---- */
    "Banner of Nagarythe":`Friendly Dark Elf units within 12" gain Eternal Hatred.`,
    "Hydra Banner":`All models in the unit gain +1 Attack in the first round of any close combat.`,
    "Standard of Hag Graef":`The unit gains Always Strikes First.`,
    "Banner of Cold Blood":`The unit gains Cold-Blooded.`,
    "Banner of Murder":`The unit adds +D6" to its charge range.`,
    "The Blood Banner":`Cold One Knights only. The unit does not take Stupidity tests caused by Cold Ones.`,
    "Sea Serpent Standard":`Corsairs only. The unit gains Frenzy.`,
    "Standard of Har Ganeth":`Executioners only. The unit causes Terror.`,
    "Sacrificial Banner":`Enemy Monsters with line of sight gain Berserk Rage against the unit and suffer -3 Leadership for Berserk Rage tests against it.`,
    "Dread Banner":`The unit gains Fear.`,
    "Standard of Slaughter":`The unit gains +D3 combat resolution on any turn it charges.`,
    "Soul Shadows Standard":`If the unit chooses Flee as a charge reaction it auto-rallies at the end of the Flee move (if the charger doesn't reach it).`,
    "Traitor's Banner":`Enemy units targeting the unit with missiles or spells must pass a Leadership test or choose another target.`,
    /* ---- Gifts of Khaine ---- */
    "Dance of Doom":`On foot only. Enemies targeting the model must re-roll all successful To Hit rolls (missile and close combat).`,
    "Hand of Khaine":`All enemy units in base contact suffer -1 To Hit in the first round of close combat (no effect on Immunity (Psychology)).`,
    "Rune of Khaine":`The model gains Random Attacks (D3) in addition to its normal attacks.`,
    "Cry of War":`All enemy units in base contact suffer -1 Weapon Skill and -1 Initiative.`,
    "Rending Stars":`Khainite Assassin only. Missile weapon: 6/9", Strength as user +1, Multiple Shots (3), Quick to Fire.`,
    "Black Lotus":`Khainite Assassin only. Each unsaved Wound in close combat counts as two for combat resolution (no effect on Immunity (Poisoned Attacks)).`,
    "Touch of Death":`The model gains the Killing Blow special rule.`,
    "Blood Sigil":`Disciple of Khaine only. May re-roll failed Leadership tests for Blood Rites; but double 6 on the re-roll inflicts a Wound (Ignores Armour Saves).`,
    "Dark Venom":`Khainite Assassin only. The model gains Multiple Wounds (D3) (including missile attacks); no effect on Immunity (Poisoned Attacks).`,
    "Manbane":`Khainite Assassin only. The model automatically Wounds on a 2+ (including missile attacks); no effect on Immunity (Poisoned Attacks).`,
    "Khainite Pendant":`The model gains the Killing Blow special rule.`,
    "Witchbrew":`Death Hag and Hag Queens only. The model and all models in the same unit gain Frenzy and can never lose it.`,
    /* ---- Common rulebook items ---- */
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

  // Lore of Dark Magic (the book's own lore). lvl 0 = signature spell.
  spellLores: {
    "Dark": { attribute: { name:"Spiteful Conjuration", text:`When a hex, magic missile or direct damage spell from this lore is successfully cast and the casting roll contains a double, the target suffers 2D6 Strength 2 hits after the spell resolves; if it contains a treble, the target suffers 3D6 hits instead.` }, spells: [
      { name:"Doombolt of Kharaidon", lvl:0, cast:6, type:"Magic Missile", range:`18"`, effect:`D6 Strength 5 hits.` },
      { name:"Death Spasm", lvl:1, cast:5, type:"Direct Damage", range:`18"`, effect:`Single enemy model takes D3 Toughness tests; each failure is a Wound that Ignores Armour Saves. All models in base contact with the target suffer a hit at the target's base Strength.` },
      { name:"Power of Darkness", lvl:1, cast:5, type:"Augment", range:`18"`, effect:`Target unit gains +1 Strength until the caster's next Magic phase; add D3 power dice to your pool. A natural 6 when generating these dice wounds the caster (Ignores Armour Saves).` },
      { name:"Shadow Daggers", lvl:1, cast:5, type:"Magic Missile", range:`12"`, effect:`D6 Strength 3 hits with Armour Piercing (1) on all enemy units in the caster's front arc.` },
      { name:"Sap Strength", lvl:2, cast:6, type:"Hex", range:`24"`, effect:`All models in the target unit suffer -1 Strength (min 1) until the caster's next Magic phase.` },
      { name:"Bladewind", lvl:2, cast:7, type:"Direct Damage (area)", range:`18"`, effect:`Large round template: each model hit must pass a Weapon Skill test or suffer a Strength 4 hit.` },
      { name:"Nagaelythe the Chillwind", lvl:2, cast:8, type:"Magic Missile", range:`24"`, effect:`2D6 Strength 2 hits. If the target suffers any unsaved Wounds, the whole unit has -1 Ballistic Skill until the caster's next Magic phase.` },
      { name:"Tenebrael Blades", lvl:3, cast:8, type:"Augment", range:`18"`, effect:`Target gains Armour Piercing (2) and Magical Attacks until the caster's next Magic phase.` },
      { name:"Chroesh – Word of Pain", lvl:3, cast:9, type:"Hex", range:`24"`, effect:`Target unit gains Always Strikes Last until the caster's next Magic phase.` },
      { name:"Shroud of Despair", lvl:3, cast:10, type:"Hex (aura, RIP)", range:`12"`, effect:`Affected units cannot benefit from Hold Your Ground or Inspiring Presence; whenever one fails a Break, Panic or Terror test, all affected units suffer -1 Leadership (cumulative).` },
      { name:"Oblivion", lvl:4, cast:12, type:"Direct Damage (aura)", range:`6"`, effect:`Each model within range (friend and foe, except the caster, even those in close combat) suffers a Strength 5 hit.` },
      { name:"Anchan-Rogar the Soul Stealer", lvl:4, cast:14, type:"Direct Damage", range:`24"`, effect:`Each model in the unit suffers a Wound on a 5+ that Ignores Armour Saves. Roll a D6 per unsaved Wound; each 5+ gains the caster a Wound (max 10).` },
      { name:"Arnzipal's Black Horror", lvl:4, cast:15, type:"Vortex (RIP)", range:`Small template`, effect:`Magical vortex: any model touched passes a Strength test per Wound on its profile or suffers a Wound that Ignores Armour Saves and Regeneration.` }
    ]}
  },

  units: {
    /* ---------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "commanders", name: "Commanders", isCharacter: true,
        access: ["additional hand weapon","spear","halberd","great weapon","light armour","medium armour","heavy armour","shield","light lance","heavy lance","deathrain crossbow","sea dragon cloak"],
        variants: [
          { name: "Dreadlord", points: 125, magicBudget: 100 },
          { name: "Dreadmaster", points: 55, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Spear", cost: 5 }, { label: "Light lance", cost: 5 },
            { label: "Heavy lance", cost: 10 }, { label: "Polearm", cost: 10 }, { label: "Great weapon", cost: 15 } ] },
          { id: "crossbow", type: "toggle", label: "Deathrain crossbow", cost: 8, per: "flat" },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 }, { label: "Heavy armour", cost: 18 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "cloak", type: "toggle", label: "Sea Dragon Cloak", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Dark Steed", cost: 15 }, { label: "Cold One", cost: 20 }, { label: "Dark Pegasus", cost: 25 },
            { label: "Cold One Chariot", cost: 100 },
            { label: "Manticore", cost: 150, only: "Dreadlord" }, { label: "Black Dragon", cost: 300, only: "Dreadlord" } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard Bearer (one Dreadmaster only)", cost: 25, per: "flat", only: "Dreadmaster", bsb: true }
        ],
        notes: "BSB may carry a Magic Standard with no points limit, in addition to other Magic Items."
      },
      {
        id: "sorceresses", name: "Sorceresses", isCharacter: true,
        access: ["light armour"],
        lores: ["Beasts", "Dark", "Death", "Fire", "Heavens", "Light", "Life", "Metal", "Shadow"],
        variants: [
          { name: "Supreme Sorceress", points: 185, wizardLevel: 3, magicBudget: 100 },
          { name: "Sorceress", points: 85, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Dark Steed", cost: 15 }, { label: "Cold One", cost: 20 }, { label: "Dark Pegasus", cost: 25 },
            { label: "Manticore", cost: 150, only: "Supreme Sorceress" }, { label: "Black Dragon", cost: 300, only: "Supreme Sorceress" } ] }
        ]
      },
      {
        id: "hagsofkhaine", name: "Hags of Khaine", isCharacter: true,
        access: ["additional hand weapon","halberd","light armour"],
        variants: [
          { name: "Hag Queen", points: 140, magicBudget: 100 },
          { name: "Death Hag", points: 70, magicBudget: 100 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Polearm", cost: 10 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Cauldron of Blood", cost: 130 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard Bearer (one Death Hag only)", cost: 25, per: "flat", only: "Death Hag", bsb: true }
        ],
        notes: "Magic Items and/or Gifts of Khaine. BSB may carry a Magic Standard with no points limit."
      },
      {
        id: "fleetmaster", name: "Black Ark Fleetmaster", isCharacter: true,
        access: ["additional hand weapon","light armour","sea dragon cloak"],
        variants: [ { name: "Fleetmaster", points: 70, magicBudget: 50 } ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Repeater handbow", cost: 5 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "cloak", type: "toggle", label: "Sea Dragon Cloak", cost: 3, per: "flat" }
        ]
      },
      {
        id: "beastmaster", name: "Beastmaster", isCharacter: true,
        access: ["additional hand weapon","spear","light armour","light lance","sea dragon cloak"],
        variants: [ { name: "Beastmaster", points: 45, magicBudget: 50 } ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 2 }, { label: "Spear", cost: 2 }, { label: "Light lance", cost: 4 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 2, per: "flat" },
          { id: "cloak", type: "toggle", label: "Sea Dragon Cloak", cost: 2, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Scourgerunner Chariot", cost: 50 }, { label: "Manticore", cost: 150 } ] }
        ]
      },
      {
        id: "disciple", name: "Disciple of Khaine", isCharacter: true,
        access: ["additional hand weapon","light armour","medium armour"],
        variants: [ { name: "Disciple of Khaine", points: 100, magicBudget: 50 } ],
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapon", cost: 2, per: "flat" },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 } ] }
        ],
        notes: "Magic Items and/or Gifts of Khaine."
      },
      {
        id: "assassin", name: "Khainite Assassin", isCharacter: true, cannotBeGeneral: true,
        access: ["additional hand weapon","light armour","throwing weapon"],
        variants: [ { name: "Khainite Assassin", points: 105, magicBudget: 50 } ],
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapon", cost: 2, per: "flat" },
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Repeater handbow", cost: 2 }, { label: "Throwing weapons", cost: 2 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" }
        ],
        notes: "Hidden — deploys inside a unit. Magic Items and/or Gifts of Khaine."
      },
      {
        id: "gladiatrix", name: "High Gladiatrix", isCharacter: true, cannotBeGeneral: true,
        access: ["additional hand weapon","halberd","light armour","buckler"],
        variants: [ { name: "High Gladiatrix", points: 145, magicBudget: 50 } ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Buckler", cost: 5 }, { label: "Polearm", cost: 10 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" }
        ],
        notes: "May never be the Army General."
      },
      {
        id: "ironscale", name: "Melusai Ironscale", isCharacter: true, cannotBeGeneral: true,
        access: ["halberd","medium armour","light armour"],
        variants: [ { name: "Melusai Ironscale", points: 180, magicBudget: 50 } ],
        options: [
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 } ] }
        ],
        notes: "Magic Items and/or Gifts of Khaine. May never be the Army General."
      },
      /* Special characters */
      { id: "malekith", name: "Malekith", isCharacter: true, isSpecialChar: true,
      access: [],
        lores: ["Dark"],
        variants: [ { name: "Malekith", points: 495, wizardLevel: 4, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Cold One", cost: 20 }, { label: "Cold One Chariot", cost: 100 }, { label: "Seraphon (Black Dragon)", cost: 320 } ] } ],
        notes: "Must be the Army General (Inspiring Presence 18). Black Guard become Special units." },
      { id: "morathi", name: "Morathi", isCharacter: true, isSpecialChar: true,
      access: [],
        lores: ["Dark", "Death", "Shadow"],
        variants: [ { name: "Morathi", points: 335, wizardLevel: 4, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Sulephet (Dark Pegasus)", cost: 40 } ] } ],
        notes: "The First Sorceress: +2 cast, may pick spells from all her lores in any combination; always has Doombolt of Kharaidon as her signature." },
      { id: "malus", name: "Malus Darkblade", isCharacter: true, isSpecialChar: true,
      access: ["heavy armour"],
        variants: [ { name: "Malus Darkblade", points: 210, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Spite (Cold One with barding)", cost: 50 } ] } ] },
      { id: "hellebron", name: "Crone Hellebron", isCharacter: true, isSpecialChar: true,
      access: ["light armour"],
        variants: [ { name: "Crone Hellebron", points: 280, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Cauldron of Blood", cost: 130 }, { label: "Manticore", cost: 150 } ] } ],
        notes: "If General, all Witch Elves are taken as Core. May upgrade one Witch Elf unit to Sisters of the Singing Doom (+1/model, gain Fear)" },
      { id: "rakarth", name: "Rakarth", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Rakarth", points: 445, magicBudget: 0 } ], options: [],
        notes: "Always mounted on Bracchus (Black Dragon). May upgrade Scourgerunner Chariots to Ravagers of Rakarth (+5/model, gain Poisoned Attacks)" },
      { id: "krethusa", name: "Krethusa the Croneseer", isCharacter: true, isSpecialChar: true,
      access: [],
        lores: ["Shadow"],
        variants: [ { name: "Krethusa", points: 295, wizardLevel: 3, magicBudget: 0 } ], options: [],
        notes: "Level 3 Wizard — Lore of Shadow; also knows Flock of Doom (Lore of Beasts)" },
      { id: "kouran", name: "Kouran Darkhand", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Kouran Darkhand", points: 140, magicBudget: 0 } ], options: [] },
      { id: "tullaris", name: "Tullaris Dreadbringer", isCharacter: true, isSpecialChar: true,
      access: ["heavy armour"],
        variants: [ { name: "Tullaris Dreadbringer", points: 130, magicBudget: 0 } ], options: [],
        notes: "Must be accompanied by a unit of Har Ganeth Executioners (+1/model, that unit gains Frenzy); may not leave it." },
      { id: "lokhir", name: "Lokhir Fellheart", isCharacter: true, isSpecialChar: true,
      access: ["medium armour"],
        variants: [ { name: "Lokhir Fellheart", points: 150, magicBudget: 0 } ], options: [] },
      { id: "shadowblade", name: "Shadowblade", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
      access: ["additional hand weapon"],
        variants: [ { name: "Shadowblade", points: 220, magicBudget: 0 } ], options: [],
        notes: "Master of Disguise — deploys Hidden and may change which unit he hides in." }
    ],

    /* ------------------------------- CORE ------------------------------- */
    core: [
      { id: "dreadspears", name: "Dreadspears", perModel: true, basePoints: 10, unitSize: [15,45],
        options: [ { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "bleakswords", name: "Bleakswords", perModel: true, basePoints: 9, unitSize: [15,45],
        options: [ { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "darkshards", name: "Darkshards", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [ { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "corsairs", name: "Black Ark Corsairs", perModel: true, basePoints: 9, unitSize: [10,30], keyword: "corsairs",
        options: [
          { id: "skirm", type: "toggle", label: "Skirmishers", cost: 1, per: "model" },
          { id: "handbow", type: "toggle", label: "Replace one hand weapon with repeater handbows", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "witchelves", name: "Witch Elves", perModel: true, basePoints: 10, unitSize: [10,30],
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ],
        },
      { id: "darkriders", name: "Dark Riders", perModel: true, basePoints: 16, unitSize: [5,15],
        options: [
          { id: "crossbow", type: "toggle", label: "Deathrain crossbows", cost: 3, per: "model" },
          { id: "shield", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "barding", type: "toggle", label: "Barding", cost: 0, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "slaves", name: "Slaves", perModel: true, basePoints: 2, unitSize: [20,60], expendable: true,
        options: [],
        notes: "Include one Slavemaster per 20 Slaves (+25 each)" },
      { id: "harpies", name: "Harpies", perModel: true, basePoints: 11, unitSize: [5,15], expendable: true,
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] }
    ],

    /* ------------------------------ SPECIAL ----------------------------- */
    special: [
      { id: "executioners", name: "Har Ganeth Executioners", perModel: true, basePoints: 15, unitSize: [10,30], keyword: "executioners",
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ],
        },
      { id: "bloodhags", name: "Blood Hags", perModel: true, basePoints: 15, unitSize: [10,30],
        options: [ { id: "cmd", type: "command", magicStandard: 25 } ],
        },
      { id: "sisters", name: "Sisters of Slaughter", perModel: true, basePoints: 15, unitSize: [10,30],
        options: [
          { id: "skirm", type: "toggle", label: "Skirmishers", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "shades", name: "Shades", perModel: true, basePoints: 15, unitSize: [5,15],
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapons", cost: 1, per: "model" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "coldoneknights", name: "Cold One Knights", perModel: true, basePoints: 32, unitSize: [5,15], keyword: "coldoneknights",
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "coldonechariot", name: "Cold One Chariot", perModel: false, basePoints: 100, unitSize: [1,1],
        options: [ { id: "std", type: "toggle", label: "Standard bearer", cost: 10, per: "flat" } ] },
      { id: "scourgerunner", name: "Scourgerunner Chariot", perModel: false, basePoints: 70, unitSize: [1,1],
        options: [] },
      { id: "reaper", name: "Reaper Bolt Thrower", perModel: false, basePoints: 60, unitSize: [1,1],
        options: [ { id: "crew", type: "toggle", label: "Additional Crew", cost: 11, per: "flat" } ] },
      { id: "melusai", name: "Melusai", perModel: true, basePoints: 26, unitSize: [5,15],
        options: [
          { id: "armour", type: "toggle", label: "Medium armour", cost: 2, per: "model" },
          { id: "bows", type: "toggle", label: "Replace Heartshard Glaives with Heartseeker Bows", cost: 0, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ],
        },
      { id: "khinerai", name: "Khinerai", perModel: true, basePoints: 15, unitSize: [5,15],
        options: [
          { id: "jav", type: "toggle", label: "Javelins", cost: 2, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ],
        },
      { id: "medusa", name: "Bloodwrack Medusa", perModel: false, basePoints: 55, unitSize: [1,1],
        options: [] }
    ],

    /* ------------------------------- RARE ------------------------------- */
    rare: [
      { id: "blackguard", name: "Black Guard of Naggarond", perModel: true, basePoints: 18, unitSize: [10,30],
        options: [ { id: "cmd", type: "command", magicStandard: 75 } ] },
      { id: "shadowstalkers", name: "Shadowstalkers", perModel: true, basePoints: 16, unitSize: [5,15],
        options: [
          { id: "handbow", type: "toggle", label: "Replace throwing weapons with repeater handbows", cost: 2, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "warlocks", name: "Doomfire Warlocks", perModel: true, basePoints: 26, unitSize: [5,15],
        lores: ["Dark", "Death", "Shadow"], wizardLevel: 1,
        options: [
          { id: "barding", type: "toggle", label: "Barding", cost: 0, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ],
        notes: "The unit is a Level 1 Wizard (Cursed Coven: +1 cast per 5 models)" },
      { id: "cauldron", name: "Cauldron of Blood", perModel: false, basePoints: 130, unitSize: [1,1],
        options: [],
        },
      { id: "bloodwrackshrine", name: "Bloodwrack Shrine", perModel: false, basePoints: 135, unitSize: [1,1],
        options: [] },
      { id: "warhydra", name: "War Hydra", perModel: false, basePoints: 200, unitSize: [1,1],
        options: [
          { id: "breath", type: "choice", label: "Breath upgrade", choices: [
            { label: "Spit Fire", cost: 10 }, { label: "Fiery Breath", cost: 20 }, { label: "Acid Breath", cost: 30 } ] },
          { id: "upg", type: "choice", label: "Upgrade", choices: [
            { label: "Bloodthirsty", cost: 5 }, { label: "Daerlythe's Aura", cost: 5 }, { label: "Battle Lover", cost: 10 },
            { label: "Chameleon Skin", cost: 10 }, { label: "Armour Plates", cost: 15 } ] } ] },
      { id: "kharibdyss", name: "Kharibdyss", perModel: false, basePoints: 210, unitSize: [1,1],
        options: [] },
      { id: "avatar", name: "Avatar of Khaine", perModel: false, basePoints: 265, unitSize: [1,1],
        options: [] }
    ]
  }
};
