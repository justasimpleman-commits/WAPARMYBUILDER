/* ============================================================================
   SKAVEN — army data (Warhammer Armies, Mathias Eliasson v3.0,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   This file is pure DATA. See SCHEMA.md for the full field reference.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size
   Option types:
     choice     -> pick AT MOST one of choices[] (radio, can be none)
     mustChoose -> pick EXACTLY one of choices[] (required)
     multi      -> pick up to `max` of choices[]
     toggle     -> a single optional add-on (checkbox)
     command    -> Leader/Musician/Standard Bearer (+ magic standard budget)
     mount      -> pick at most one mount
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["skaven"] = {
  id: "skaven",
  name: "Skaven",
  author: "Mathias Eliasson v3.0 (unofficial) — 9th Edition 3.0",
  // The book states no explicit percentage composition; using the standard.
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
    "You may not have more units of any single Core Unit type than you have units of Clanrats (waived if the Army General is a Clan Eshin, Moulder or Pestilens character).",
    "Clan Enmity: Greater Clan (Pestilens, Eshin, Moulder, Skryre) units may only be joined by characters of the same Clan.",
    "Warpfire Thrower, Ratling Gun, Warpvolt Scourger and Poisoned Wind Mortar all count as the same Special choice for duplicate limits.",
    "Magic items are unique (one of each per army) unless marked * (common).",
    "Each model may take only one item from each magic-item category."
  ],

  magicItems: {
    "Magic Weapons": [
      { name: "Fellblade", cost: 85, only: "Clawlord" },
      { name: "Electro-whip", cost: 40, common: true, only: "Clan Moulder", requiresAccess: "whip" },
      { name: "Dwarf Slayer", cost: 35 },
      { name: "Desolate Blade", cost: 30 },
      { name: "The Fumigatous", cost: 30, only: "Clan Pestilens", requiresAccess: "plague censer" },
      { name: "Languisher Sword", cost: 25 },
      { name: "Shock-Prod", cost: 25, common: true, only: "Clan Moulder", requiresAccess: "halberd" },
      { name: "The Three Fangs", cost: 25, requiresAccess: "additional hand weapon" },
      { name: "Cursed Blade of Delirium", cost: 20 },
      { name: "Headsplitter", cost: 20, only: "Clan Eshin", requiresAccess: "sling" },
      { name: "Things-Catcher", cost: 20, common: true, only: "Clan Moulder", requiresAccess: "halberd" },
      { name: "Snap-Snap Snarepole", cost: 20, common: true, only: "Clan Moulder", requiresAccess: "halberd" },
      { name: "Blade of Black Fury", cost: 15 },
      { name: "Gnawshard", cost: 15 },
      { name: "Things-Bane", cost: 15 },
      { name: "Weeping Blades", cost: 15, common: true, only: "Clan Eshin", requiresAccess: "additional hand weapon" },
      { name: "Warpstone Stars", cost: 15, common: true, requiresAccess: "throwing weapon" },
      { name: "Brooding Blade", cost: 10 },
      { name: "Lash of Fangs", cost: 10, only: "Clan Moulder", requiresAccess: "whip" },
      { name: "Warpforged Blade", cost: 10, common: true, only: "Clan Skryre" }
    ],
    "Magic Armour": [
      { name: "Foulhide", cost: 30, requiresAccess: "medium armour" },
      { name: "Shield of Distraction", cost: 30, requiresAccess: "shield" },
      { name: "Rust Armour", cost: 25, requiresAccess: "medium armour" },
      { name: "Tenebrous Cloak", cost: 30 },
      { name: "Twisted Crown of the Horned Rat", cost: 30 }
    ],
    "Talismans": [
      { name: "Rival Hide Talisman", cost: 25 },
      { name: "Shadow Magnet Trinket", cost: 25 },
      { name: "Warpstone Amulet", cost: 25 },
      { name: "Amulet of Darkness", cost: 15 },
      { name: "Suspicious Stone", cost: 15 },
      { name: "Warpscale Pendant", cost: 10, common: true }
    ],
    "Arcane Items": [
      { name: "Warpscroll", cost: 25 },
      { name: "Warpstorm Scroll", cost: 25 },
      { name: "Esoteric Warp Resonator", cost: 20, only: "Clan Skryre" },
      { name: "Staff of Rightful Supremacy", cost: 20 },
      { name: "Eye of the Horned Rat", cost: 15 },
      { name: "Scrying Stone", cost: 10 },
      { name: "Warpstone Token", cost: 10, common: true }
    ],
    "Enchanted Items": [
      { name: "Brass Orb", cost: 40, only: "Clan Skryre" },
      { name: "Bilious Bell", cost: 30, only: "Clan Pestilens" },
      { name: "The Cube of Mists", cost: 30, only: "Clan Eshin" },
      { name: "Doomrocket", cost: 30, only: "Clan Skryre" },
      { name: "Fleshgift Vial", cost: 30, only: "Clan Moulder" },
      { name: "Infernal Bomb", cost: 30, only: "Clan Eshin" },
      { name: "Skalm", cost: 30 },
      { name: "Screechskull Trophies", cost: 30 },
      { name: "Skavenbrew", cost: 30 },
      { name: "Death Globe", cost: 25, only: "Clan Skryre" },
      { name: "Pipes of Piebald", cost: 25 },
      { name: "Skryre's-Breath Bellows", cost: 25, only: "Clan Skryre" },
      { name: "Blistrevous, the Living Cyst", cost: 20, only: "Clan Pestilens" },
      { name: "Flaypelt Cloak", cost: 20 },
      { name: "Gnawbomb", cost: 20, only: "Clan Eshin" },
      { name: "Portents of Verminous Doom", cost: 20 },
      { name: "Rabid Crown", cost: 20, only: "Clan Moulder" },
      { name: "Snoutgrovel Robes", cost: 20 },
      { name: "Farskitter Cloak", cost: 15, only: "Clan Eshin" },
      { name: "Warpstone Innards", cost: 15, only: "Clan Moulder" },
      { name: "Assassins-Bane Rigging", cost: 10, only: "Clan Eshin" },
      { name: "Rat-Tail Snake", cost: 10, only: "Clan Moulder" },
      { name: "Warpstone Charm", cost: 10 },
      { name: "Vial of the Fulminator", cost: 5, only: "Clan Skryre" }
    ],
    "Magic Standards": [
      { name: "Sacred Standard of the Horned Rat", cost: 75 },
      { name: "Storm Banner", cost: 50 },
      { name: "Icon of Great-Total Supremacy", cost: 35 },
      { name: "Umbranner", cost: 35 },
      { name: "Grand Banner of Clan Superiority", cost: 30 },
      { name: "Plague Banner", cost: 25, only: "Plague Monks" },
      { name: "Shroud of Dripping Death", cost: 25, only: "Clan Pestilens" },
      { name: "Banner of Burning Hatred", cost: 25 },
      { name: "Banner of the Under-Empire", cost: 20 },
      { name: "Dwarf-Hide Banner", cost: 20 },
      { name: "Banner of the Swarm", cost: 15 },
      { name: "Banner of the Four Black Winds", cost: 10 },
      { name: "Banner of Verminous Scurrying", cost: 10 }
    ]
  },

  // Common magic items from the 9th Edition rulebook (verbatim from chaos-dwarfs.js).
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
    /* ---- war machine weapon profiles (from the source PDF) ---- */
    "Warplock Jezzail": `Warplock Jezzails have the following profile: Range 18/36", Strength 6, Special Rules: Armour Piercing (1), Magical Attacks, Move or Fire, Ponderous, Unstable Ammunition.`,
    "Warpfire Thrower": `A warpfire thrower is a fire thrower with the following profile: Range —, Strength 4, Special Rules: Armour Piercing (1), Cumbersome, Flaming Attacks, Magical Attacks, Multiple Wounds (D3). (Brood Terror and Boneripper warpfire throwers are Strength 5 and lose Armour Piercing.) If the warpfire thrower misfires, it inflicts D6 automatic hits on the closest friendly unit within 12" in the firing unit's front arc.`,
    "Ratling Gun": `A ratling gun is an organ gun with the following profile: Range 12/24", Strength 4, Special Rules: Armour Piercing (1), Magical Attacks, Multiple Shots (Artillery Dice), Rapid Fire, Ponderous.`,
    "Poisoned Wind Mortar": `A poisoned wind mortar is a mortar that uses the small round template, with the following profile: Range 12-36", Strength n/a, Special Rules: Cumbersome, Ignores Armour Saves, Magical Attacks.`,
    "Plagueclaw Catapult": `A plagueclaw catapult is a stone thrower that uses the large round template, with the following profile: Range 12-48", Strength 2, Special Rules: Ignores Armour Saves. Any unit that takes one or more wounds must immediately take a Panic test.`,
    "Warp Lightning Cannon": `A warp lightning cannon is a great cannon that uses the following profile: Range 72", Strength Artillery Dice, Special Rules: Lightning Attacks, Magical Attacks, Multiple Wounds (D6).`,
    /* auto-mapped from army-book PDF (unit UPGRADE / option rules) */
    "Bloated Mutants": `The unit gains +1 Toughness but suffer -1 to their Movement and Initiative.`,
    "Corruptor": `A Corruptor has the following:`,
    "Deceiver": `A Deceiver has the following:`,
    "Doom-flayer Gauntlets": `Doom-Flayer Gauntlets use the following profile: Range: Strength: Special Rules: Combat As user +2D3 Attacks, Impact Hits (D3)`,
    "Extra Extremities": `All Rat Ogres in the unit gain +1 Attack.`,
    "Lash Tail": `The Brood Horror gains +1 Attack.`,
    "Pestilent Breath": `The Brood Horror gains a Strength 2 Breath Weapon which Ignores Armour saves.`,
    "Plague Rats": `The Rat Swarms gain the Poison Attacks special rule and counts as Clan Pestilens.`,
    "Pox Feeders": `The unit gains the Poisoned Attacks special rule.`,
    "Quadrupedal": `All Rat Ogres in the unit gain +1 Movement.`,
    "Resilient": `All Rat Ogres in the unit gain +1 Toughness.`,
    "Shock Gauntlets": `Shock Gauntlets use the following profile:`,
    "Shock-prod": `Polearm. A Shock-Prod gives the wielder the Lightning Attacks special rule.`,
    "Supercharged Warp-Power Accumulator": `A Supercharged Warp-Power Accumulator allows the bearer to cast spells with one more Power dice than they are normally allowed.`,
    "Things-catcher": `Polearm. A Things-catcher gives the wielder the Killing Blow special rule.`,
    "Troll-blooded": `All Rat Ogres in the unit gain the Regeneration (5+) special rule.`,
    "Warbringer": `A Warbringer has the following:`,
    "Warlock Optics": `A Warlock Engineer equipped with Warlock Optics gains +1 to their Ballistic Skill as well as the Sniper special rule.`,
    "Warpfire Projectors": `Warpfire Projectors are fire throwers with the following profile:`,
    "Warpmusket": `A Warpmusket has the following profile: Range: Strength: Special Rules: 12/24" 5 Armour Piercing (1), Magical Attacks, Ponderous, Unstable Ammunition`,
    "Warpseer": `A Warpseer has the following:`,
    "Warpvolt Obliterator": `A Warpvolt Obliterator has the following profile:`,
    "Windlaunchers": `Windlaunchers are mortars that use the small round temple and the following profile:`,

    /* auto-mapped from army-book PDF (unit-profile special rules) */
    "A Reputation for Cunning": `All friendly Skaven units within 12" of Krittok at the start of the game gain the Vanguard special rule.`,
    "Attack-attack": `Any unit joined by Spinetail may re-roll To Wound rolls of 1 in close combat.`,
    "Aura of Pestilence": `Any units in base contact with Lord Skrolk that are not part of Clan Pestilens suffer -1 To Hit.`,
    "Bodyguard of Thanquol": `If, at the start of any friendly turn, Boneripper (either version) is not within 12" of Thanquol, he cannot do anything at all, and in combat he will be hit automatically and will not strike back. If the game ends while Boneripper is shut down, he counts as a casualty. If Thanquol is slain or flees off the table, Boneripper is removed as a casualty as well.`,
    "Brain Transplant": `All Rat Ogres in the unit are no longer subject to Stupidity and Frenzy.`,
    "Clawguard": `You may upgrade one unit of Stormvermin with heavy armour for +1.5 points/model for each model with this special rule in your army.`,
    "Exceptional Pack": `If you include Skweel Gnawtooth in your army, you must also include a unit of Giant Rats that he must join. After deploying Skweel into his unit, roll a D6 and consult the chart below to determine the Giant Rats' special attributes. Skweel will never leave his special pack and may never join another unit.`,
    "Extra Arm": `Throt may use both his Magic Weapons in each round of Close Combat.`,
    "Foster Competition": `All friendly Stormvermin units within 12" of Krittok may re-roll 1's To Hit in close combat.`,
    "Foul Ichor": `If a Brood Horror is slain, all units in base contact with the Brood Horror suffer 2D6 Strength 2 hits, distributed as shooting attacks.`,
    "Grind Attack": `The Doomwheel has the Stomp (D6) special rule like a Monster in any turn it does not charge, but only against units to its front.`,
    "Master Controller": `Throt has the Inspiring Presence (6) special rule for all Clan Moulder units.`,
    "No Pain": `Successful To Wound rolls against Veskit must be re-rolled.`,
    "Plague Disciples": `A unit of Plague Censer Bearers within 3" of a friendly units of Plague Monks may use the "Look Out, Sir" rule as if they were characters. In addition, if the Plague Censer Bearers are within 6" of a Plague Furnace they have the Stubborn special rule.`,
    "Ravening Hunger": `At the start of each of his turns, Throt must pass a Toughness test or start to eat one friendly model in base contact of your choosing. This model suffers 1 Wound with no saves allowed. If this is not possible, Throt will suffer 1 Wound with no saves allowed.`,
    "Rodent Genius": `Any rolls on the Misfire table for all Clan Skryre units within 12" may be re-rolled.`,
    "Sensei": `A Master Assassin may be the Army General despite being Hidden. However, he can only pass on his Leadership value to other units if he is not Hidden.`,
    "Spined Tail": `If Clawlord Spinetail is in base contact with an enemy Infantry Character at the start of any close combat phase, both you and your opponent roll a D6. If you roll the higher result, the enemy Character suffers one Wound which Ignores Armour Saves. If your result is at least double your opponent’s, that model suffers D3 Wounds which Ignores Armour Saves instead.`,
    "The Best Defence": `The Doom-flayer gains +2 to its armour save against all models attacking it from the front.`,
    "The Red Guard": `Queek must be accompanied by a unit of Stormvermin chosen from the army list at a cost of +2 points per model. This unit has +1 Strength. Queek may never choose to leave this unit. No Grey Seers may join the unit.`,
    "The Yellow Death": `If Morbus is included in your army, you may upgrade one unit of Rat Swarms with the Plague Rats upgrade to Yellow Death Rats for +10 points per model. Yellow Death Rats have +1 Weapon Skill and Strength.`,
    "Too Horrible to Die": `As soon as the Hell Pit Abomination loses its last Wound, roll a D6 and check the Too Horrible to Die chart:`,
    "Tretch's Raiders": `Tretch can choose one unit of Clanrats or Stormvermin in your army to deploy as Ambushers. If so, Tretch must deploy with this unit. In addition, he and his unit re-roll all failed To Hit rolls when attacking in the flank or rear.`,
    "Trophy Heads": `Queek must issue or accept challenges whenever possible. When fighting in a challenge, Queek gains +1 To Hit and To Wound.`,
    "Warp Fleas": `All enemy models in base contact with Morbus suffer a -1 To Hit penalty in close combat.`,
    "Warpstone Fumes": `All missile fire directed against a Brood Terror or any unit within 6" of it suffer -1 To Hit.`,
    "Warpstone Mutants": `If Klawmunkast is included in your army, you may upgrade one unit of Skavenslaves to Warpstone Mutants for +3 points per model. Warpstone Mutants have +1 Strength and Attacks.`,
    "Whirling Death": `Doom-flayers only inflict Impact Hits (D3) on the charge. In addition, instead of attacking normally, the Doom-flayer causes one artillery dice worth of Impact Hits at the start of each close combat phase. In case a Misfire is rolled, roll a D6 and consult the Doom-flayer Mishap chart.`,
    "Zzzzap": `In each friendly Shooting phase, even when engaged in close combat or when fleeing, the Doomwheel automatically unleashes bolts of warp lightning using the following profile:`,

    "Grinderfists": `Strength: As user, Magical Attacks. Rather than attacking normally, a model with Grinderfists inflicts 2D3 Impact Hits at the start of each round of close combat. (A Stormfiend with Grinderfists also gains Ambushers.)`,
    "Ratling Cannons": `Artillery weapon. Range 12/24". Special Rules: Armour Piercing (1), Magical Attacks, Multiple Shots (3D6), Rapid Fire. Each To Hit roll of a 1 inflicts a hit on the closest friendly unit in the firing unit's front arc within range.`,
    "Skryre Claws": `The bearer (Brood Horror) gains the Armour Piercing (1) and Magical Attacks special rules.`,
    "Warp-Blades": `Give the bearer a +1 casting bonus when casting the Warp Lightning spell from the Lore of Ruin.`,
    "Warpstone Shard Teeth": `The unit gains the Armour Piercing (1) and Magical Attacks special rules.`,
    "Warpstone Spikes": `The Hell Pit Abomination gains the Magical Attacks and Magic Resistance (1) special rules.`,
    "Rusted Armour": `The Brood Horror gains medium armour.`,
    "Armoured": `All Rat Ogres in the unit gain medium armour.`,
    "Strength in Numbers": `+1 Leadership if the unit has Unit Strength 10+, +2 if US 15+, +3 if US 20+ (to a max Leadership of 10). Applied after the unit's basic Leadership; the General's Inspiring Presence does not pass on this US bonus.`,
    "Scurry Away": `When fleeing, roll an extra D6 and discard the lowest when determining the flee distance.`,
    "Verminous Valour": `If the model refuses a challenge, its unit may still use the model's Leadership value, Inspiring Presence or Hold Your Ground.`,
    "Life is Cheap": `Skaven may target missile attacks at enemies engaged with friends even beyond 4", but then hit their own troops on 1s and 2s; templates may be placed over friendly troops.`,
    "Clan Enmity": `Greater Clan (Pestilens/Eshin/Moulder/Skryre) units may only be joined by characters of the same Clan.`,
    "Gas Mask": `+2 bonus to Toughness tests caused by any weapon or magic item in this army book.`,
    "Tail Weapon": `+1 Attack (gains no special rules from the model's other weapons).`,
    "Unstable Ammunition": `On a To Hit roll of 1, roll another dice; on a further 1-2 the gun misfires and the shooter takes the hit.`,
    "Plague Censer": `Flail. At the start of each close-combat round, all enemy models in base contact (and the eligible censer bearers themselves) pass a Toughness test or suffer a single Wound with Ignores Armour Saves and Magical Attacks. Clan Pestilens models get +1 to the test.`,
    "Whip": `+1 Attack and Fight in Extra Ranks (2); may make supporting attacks equal to its Attack characteristic.`,
    "Snare-nets": `Roll a D6 per model with snare-nets; on 2+ one enemy in base contact suffers -1 Attack this Close Combat phase.`,
    "Smoke Bombs": `May disengage from combat at the end of any Close Combat phase by fleeing; the enemy cannot pursue and the unit rallies automatically next turn.`,
    "Rat Hound Bodyguard": `Extra WS3 S3 I3 Attack; on a To Hit roll of 1 it instead inflicts an automatic hit on its owner.`,
    "Leader of the Pack": `On-foot models may join Giant Rat/Rat Ogre units as handlers (Mixed Units) or stand in the front rank; friendly Clan Moulder units within 6" gain Cold-blooded.`,
    "Daemonic": `Magical Attacks, Magical Ward (5+) and Unbreakable. On losing a combat round, take a Daemonic Instability test (extra wounds, no saves, per point failed).`,
    "Cornered Rats": `If Skavenslaves break, units they flee through (friend or foe) take D6 Strength 3 hits per complete rank of 5+ Skavenslaves; the broken unit is then removed.`
  },

  unitInfo: {
    mount_warlitter:{profile:[["War-litter",5,4,3,4,"-","-",5,4,5]],eq:"—",rules:"Inspiring Presence (6), Scurry Away, Strength in Numbers."},
    mount_greatpoxrat:{profile:[["Great Pox Rat",7,3,0,4,4,1,5,2,2]],eq:"—",rules:"Poisoned Attacks, Scurry Away."},
    mount_gnawbeast:{profile:[["Gnaw-beast",8,4,0,4,4,3,4,4,5]],eq:"—",rules:"Scurry Away."},
    mount_bonebreaker:{profile:[["Rat Ogre Bonebreaker",6,4,0,5,5,3,3,4,5]],eq:"—",rules:"Scurry Away."},
    mount_plaguefurnace:{profile:[["Plague Furnace",5,"-","-","-",6,6,"-","-","-"]],eq:"—",rules:"War-altar carried by Plague Monks — see army book."},
    mount_screamingbell:{profile:[["Screaming Bell",5,"-","-","-",6,6,"-","-","-"]],eq:"—",rules:"War-altar carried by Clanrats — see army book."},
    greyseer:{profile:[["Grey Seer",5,4,3,3,3,3,5,2,6]],eq:"Hand weapon",rules:"Scurry Away, Strength in Numbers, Verminous Valour. Level 4 Wizard — Plague + Ruin (and Curse of the Horned Rat)."},
    commanders:{profile:[["Clawlord",5,6,4,4,4,3,7,4,7],["Clawleader",5,5,4,4,4,2,6,3,6]],eq:"Hand weapon, medium armour",rules:"Scurry Away, Strength in Numbers, Verminous Valour; Clawguard."},
    verminlord:{profile:[["Verminlord",8,8,4,6,6,6,10,5,8]],eq:"Doom Glaive",rules:"Daemonic. Level 4 Wizard — Plague + Ruin. May never be Army General."},
    assassins:{profile:[["Master Assassin",6,7,6,4,4,3,9,4,8],["Assassin",6,6,5,4,4,2,8,3,7]],eq:"Two hand weapons, throwing weapons",rules:"Dodge (5+), Hidden, Poisoned Attacks, Scouts, Scurry Away, Strength in Numbers; Sensei (Master Assassin)."},
    sorcerers:{profile:[["Sorcerer Lord",6,4,4,3,3,3,6,2,6],["Sorcerer",6,3,3,3,3,2,5,1,5]],eq:"Hand weapon",rules:"Poisoned Attacks, Scurry Away, Strength in Numbers, Verminous Valour. Wizard (Lord L3 / Sorcerer L1) — Stealth."},
    moulders:{profile:[["Master Mutator",6,5,3,4,4,3,6,3,7],["Master Moulder",6,4,3,4,4,2,5,2,6]],eq:"Hand weapon, light armour",rules:"Scurry Away, Strength in Numbers; Leader of the Pack."},
    plaguepriests:{profile:[["Plaguelord",5,5,3,4,5,3,6,3,7],["Plague Priest",5,4,3,4,5,2,5,2,6]],eq:"Hand weapon",rules:"Frenzy, Scurry Away, Strength in Numbers. Wizard (Plaguelord L2 / Priest L1) — Plague."},
    warlocks:{profile:[["Warlock Master",5,4,4,3,3,3,5,2,6],["Warlock Engineer",5,3,3,3,3,2,4,1,5]],eq:"Hand weapon",rules:"Scurry Away, Strength in Numbers, Verminous Valour. Warlock Master is a Level 3 Wizard — Ruin."},
    clanrats:{profile:[["Clanrat",5,3,3,3,3,1,4,1,5]],eq:"Hand weapon, light armour, shield",rules:"Scurry Away, Strength in Numbers"},
    stormvermin:{profile:[["Stormvermin",5,4,3,3,3,1,5,1,6]],eq:"Hand weapon, medium armour",rules:"Scurry Away, Strength in Numbers"},
    skavenslaves:{profile:[["Skavenslave",5,2,2,3,3,1,4,1,2],["Pawleader",5,3,3,3,3,1,4,1,4]],eq:"Hand weapon",rules:"Expendable, Mixed Unit, Scurry Away, Strength in Numbers; Cornered Rats. 1 Pawleader per 20."},
    ratswarms:{profile:[["Rat Swarm",6,3,0,1,1,8,4,8,3]],eq:"—",rules:"Swarm. May upgrade to Plague Rats (Poisoned Attacks, counts as Clan Pestilens)."},
    nightrunners:{profile:[["Night Runner",6,3,3,3,3,1,5,1,5]],eq:"Hand weapon",rules:"Scurry Away, Skirmishers, Strength in Numbers"},
    giantrats:{profile:[["Giant Rat",6,3,0,2,2,1,4,1,3],["Packmaster",6,3,3,3,3,1,4,1,5]],eq:"Hand weapon; whip, light armour (Packmaster)",rules:"Fight in Extra Ranks (1), Mixed Unit, Scurry Away, Strength in Numbers. 1 Packmaster per 5."},
    plaguemonks:{profile:[["Plague Monk",5,3,3,3,4,1,3,1,5]],eq:"Two hand weapons",rules:"Frenzy, Scurry Away, Strength in Numbers"},
    gutterrunners:{profile:[["Gutter Runner",6,4,4,3,3,1,6,1,6]],eq:"Hand weapon",rules:"Ambushers, Dodge (6+), Scouts, Scurry Away, Skirmishers, Strength in Numbers; Snare-nets."},
    wolfrats:{profile:[["Wolf Rat",9,4,0,4,3,1,4,1,4]],eq:"—",rules:"Frenzy, Scurry Away, Strength in Numbers"},
    ratogres:{profile:[["Rat Ogre",6,3,1,5,4,3,4,3,5],["Packmaster",6,3,3,3,3,1,4,1,5]],eq:"Hand weapon; whip, light armour (Packmaster)",rules:"Frenzy, Mixed Unit, Scurry Away, Strength in Numbers, Stupidity. 1 Packmaster per 3."},
    censerbearers:{profile:[["Plague Censer Bearer",5,3,3,3,4,1,3,1,5]],eq:"Plague censer",rules:"Frenzy, Hatred, Scurry Away, Skirmishers, Strength in Numbers; Plague Disciples."},
    jezzails:{profile:[["Warplock Jezzail",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, Warplock Jezzail, pavise",rules:"Scurry Away, Strength in Numbers. Jezzail: 18/36\", S6, AP(1), Magical, Move or Fire, Ponderous, Unstable Ammunition."},
    globadiers:{profile:[["Poisoned Wind Globadier",5,3,3,3,3,1,4,1,5]],eq:"Hand weapon, poisoned wind globes, gas mask",rules:"Scurry Away, Skirmishers, Strength in Numbers."},
    warpfire:{profile:[["Warpfire Thrower",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, warpfire thrower",rules:"Scurry Away, Weapon Team."},
    ratling:{profile:[["Ratling Gun",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, ratling gun",rules:"Scurry Away, Weapon Team."},
    warpvolt:{profile:[["Warpvolt Scourger",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, warpvolt scourger",rules:"Scurry Away, Weapon Team."},
    pwmortar:{profile:[["Poisoned Wind Mortar",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, poisoned wind mortar, gas mask",rules:"Scurry Away, Weapon Team."},
    warpgrinder:{profile:[["Warp-grinder",5,3,3,3,3,2,4,2,5]],eq:"Hand weapon, warp-grinder",rules:"Scurry Away, Weapon Team; tunnelling ambush deployment."},
    doomflayer:{profile:[["Doom-flayer",6,3,3,4,4,2,4,1,5]],eq:"Hand weapon, light armour (Crew)",rules:"Chariot (6+). Scurry Away; The Best Defence; Whirling Death."},
    eshintriad:{profile:[["Assassin Adept",6,5,5,4,4,2,7,2,7]],eq:"Two hand weapons, throwing weapons",rules:"Ambushers, Dodge (5+), Poisoned Attacks, Scouts, Scurry Away, Skirmishers."},
    stormfiend:{profile:[["Stormfiend",6,4,3,5,5,4,5,4,7]],eq:"Hand weapon, light armour; one weapon system",rules:"Monstrous Creature. Scurry Away. 1-2 Stormfiends = one Rare choice."},
    broodhorror:{profile:[["Brood Horror",8,3,0,5,5,5,4,5,6]],eq:"—",rules:"Monster. Poisoned Attacks, Scurry Away; Foul Ichor."},
    broodterror:{profile:[["Brood Terror",6,3,0,5,5,5,4,5,6]],eq:"Flail, warpfire thrower",rules:"Monster. Regeneration (4+), Scurry Away; Warpstone Fumes."},
    hellpit:{profile:[["Hell Pit Abomination","*",3,1,6,5,6,4,"*",8]],eq:"—",rules:"Monster. Impact Hits (D6), Immunity (Psychology), Random Movement (3D6), Regeneration (4+), Stubborn; Too Horrible to Die."},
    plagueclaw:{profile:[["Plagueclaw Catapult","–","–","–","–",7,"–","–","–","–"],["Plague Monk Crew",5,3,3,3,4,1,3,1,5]],eq:"Hand weapon, plagueclaw catapult (crew of 3)",rules:"War Machine. Frenzy."},
    warplightning:{profile:[["Warp Lightning Cannon","–","–","–","–",7,"–","–","–","–"],["Crew",5,3,3,3,3,1,4,1,5]],eq:"Hand weapon, warp lightning cannon (crew of 3)",rules:"War Machine."},
    warpblaster:{profile:[["Ratling Warpblaster","–","–","–","–",7,1,"–","–","–"],["Crew",5,3,3,3,3,1,4,1,5]],eq:"Hand weapon (crew of 5)",rules:"War Machine (Organ Gun). Scurry Away."},
    doomwheel:{profile:[["Doomwheel","*",3,3,6,6,5,4,1,7],["Warlock Engineer","–",3,3,3,"–","–",4,1,5]],eq:"Hand weapon, scythes",rules:"Chariot (4+). Immunity (Psychology), Random Movement (3D6), Terror; Grind Attack; Zzzzap."},
    /* Special characters */
    thanquol:{profile:[["Thanquol",5,4,3,3,3,3,6,2,7]],eq:"Hand weapon; Amulet of the Horned One, Staff of the Horned One",rules:"Scurry Away, Strength in Numbers, Verminous Valour. Level 4 Wizard — Plague + Ruin (+ Curse of the Horned Rat)."},
    boneripper:{profile:[["Boneripper",6,3,1,5,5,4,1,4,10],["Boneripper Mk II",6,3,1,6,5,5,1,5,10]],eq:"Warpfire Thrower(s)",rules:"Unbreakable; Bodyguard of Thanquol. Requires Thanquol. May never be Army General."},
    queek:{profile:[["Queek Headtaker",5,7,6,4,4,3,7,4,8]],eq:"Dwarf-Gouger, Warpstone Armour, The Foul Pendant",rules:"Clawguard, Hatred (Dwarfs, Goblins, Orcs), Scurry Away, Strength in Numbers; The Red Guard; Trophy Heads."},
    krittok:{profile:[["Krittok Foulblade",5,6,5,4,4,3,6,3,8]],eq:"Doomfang, warplock pistol, heavy armour",rules:"Clawguard, Scurry Away, Strength in Numbers; A Reputation for Cunning; Foster Competition."},
    spinetail:{profile:[["Spinetail",5,6,4,4,4,3,7,4,7]],eq:"Blade of Corruption, medium armour",rules:"Scurry Away, Strength in Numbers, Verminous Valour; Spined Tail; Attack-attack."},
    tretch:{profile:[["Tretch Craventail",5,5,4,4,4,2,6,3,6]],eq:"Two hand weapons, light armour, tail weapon; Lucky Skullhelm",rules:"Scurry Away, Strength in Numbers, Verminous Valour; Tretch's Raiders; Stay Here, I'll Get Help."},
    skreech:{profile:[["Skreech Verminking",8,8,4,6,6,6,10,5,8]],eq:"Doom Glaive, Plaguereaper",rules:"Daemonic. Level 4 Wizard — Plague + Ruin + Stealth (+ Curse of the Horned Rat). May never be Army General."},
    vizzik:{profile:[["Vizzik Skour",8,8,4,6,6,6,10,5,8]],eq:"Hand weapon",rules:"Daemonic. Level 4 Wizard — Plague + Ruin + Stealth (+ Curse). May never be Army General."},
    snikch:{profile:[["Deathmaster Snikch",6,8,6,4,4,3,10,5,8]],eq:"Weeping Blades, Warpstars; Bands of Power, The Cloak of Shadows",rules:"Dodge (5+), Hidden, Poisoned Attacks, Scouts, Scurry Away, Sensei."},
    veskit:{profile:[["Veskit",6,6,5,4,4,2,8,4,8]],eq:"Eshin Fighting Claws, light armour",rules:"Dodge (5+), Hidden, Poisoned Attacks, Scouts, Scurry Away, Sniper; No Pain."},
    throt:{profile:[["Throt the Unclean",5,6,3,4,4,3,6,4,7]],eq:"Creature-killer, Whip of Domination",rules:"Fear, Leader of the Pack, Regeneration (4+), Scurry Away, Strength in Numbers; Extra Arm; Master Controller; Ravening Hunger."},
    skweel:{profile:[["Skweel Gnawtooth",6,5,3,4,4,2,6,2,6]],eq:"Warp-lash, light armour",rules:"Mixed Unit, Scurry Away, Strength in Numbers, Verminous Valour; Exceptional Pack."},
    ghoritch:{profile:[["Ghoritch",6,6,0,5,5,4,5,5,7]],eq:"—",rules:"Monstrous Infantry. Armour Piercing (3), Leader of the Pack, Scurry Away, Strength in Numbers; Brain Transplant."},
    nurglitch:{profile:[["Nurglitch",5,6,3,4,5,3,5,3,7],["Bilios",5,3,3,3,4,1,3,2,6],["Pox (Great Pox Rat)",6,3,0,4,"–","–",5,2,2]],eq:"Blade of Nurglitch, Bubonic Sceptre; Plague Censer (Bilios)",rules:"Cavalry. Frenzy, Hatred, Scurry Away, Strength in Numbers, Terror. Level 3 Wizard — Plague (+ Plague)."},
    skrolk:{profile:[["Lord Skrolk",5,6,4,4,5,3,6,4,7]],eq:"Rod of Corruption, The Liber Bubonicus",rules:"Frenzy, Scurry Away, Strength in Numbers, Terror; Aura of Pestilence. Level 2 Wizard — Plague."},
    morbus:{profile:[["Morbus Sanguis",5,4,3,4,5,2,5,2,6]],eq:"Censer Mace",rules:"Fear, Frenzy, Scurry Away, Strength in Numbers; Warp Fleas; The Yellow Death."},
    ikit:{profile:[["Ikit Claw",5,5,3,4,4,3,3,2,7]],eq:"Storm Daemon, Iron Frame; Warp-Blades, Supercharged Warp-Power Accumulator, Upgraded Warp-Energy Condenser",rules:"Scurry Away, Strength in Numbers, Verminous Valour. Level 4 Wizard — Ruin."},
    klawmunkast:{profile:[["Klawmunkast",5,3,4,3,3,2,4,1,6]],eq:"Hand weapon, light armour; Eye of Skraw",rules:"Scurry Away, Strength in Numbers, Verminous Valour; Rodent Genius; Warpstone Mutants. Level 2 Wizard — Ruin."}
  },

  itemDesc: {
    /* Skaven magic weapons */
    "Fellblade":`Clawlord only. Strength 10 and Multiple Wounds (D6); successful Magical Ward saves against its wounds must be re-rolled. At the end of each of the wielder's turns roll a D6: on 1-2 the wielder takes 1 Wound (Ignores Armour Saves).`,
    "Electro-whip":`Clan Moulder only. Whip. Gives +D3 Attacks (instead of +1) and the Lightning Attacks special rule. Common.`,
    "Dwarf Slayer":`Attacks at +1 Strength with Multiple Wounds (2). Against Dwarfs, all hits gain Armour Piercing (1) and the wielder re-rolls failed To Wound rolls.`,
    "Desolate Blade":`+1 Strength and re-roll all failed To Wound rolls.`,
    "The Fumigatous":`Clan Pestilens only. Plague Censer. All Toughness tests caused by this weapon suffer a +1 modifier.`,
    "Languisher Sword":`All enemy models in base contact with the wielder are subject to Always Strikes Last.`,
    "Shock-Prod":`Clan Moulder only. Polearm. Gives the wielder the Lightning Attacks special rule. Common.`,
    "The Three Fangs":`Two hand weapons & tail weapon. If the wielder scores 3 or more Hits on a single model, all those hits automatically Wound with Ignores Armour Saves.`,
    "Cursed Blade of Delirium":`All enemy models attempting to strike the wielder in close combat suffer -1 To Hit.`,
    "Headsplitter":`Clan Eshin only. Sling. Against models with Toughness 5+, automatically Wounds on a 2+ with Ignores Armour Saves.`,
    "Things-Catcher":`Clan Moulder only. Polearm. Gives the wielder the Killing Blow special rule. Common.`,
    "Snap-Snap Snarepole":`Clan Moulder only. Polearm. One enemy model in base contact of your choice suffers a -1 penalty to their Attacks. Common.`,
    "Brooding Blade":`Any model suffering one or more unsaved Wounds from this weapon suffers 2D6 Strength 1 Hits (no saves) at the end of that round of close combat.`,
    "Blade of Black Fury":`+2 Initiative and +1 Attack.`,
    "Gnawshard":`Any character, Monstrous Creature or Monster suffering an unsaved Wound from this weapon must pass a Toughness test at the start of each subsequent Close Combat phase or take a Wound (no saves) for the rest of the game.`,
    "Things-Bane":`Gives the bearer Multiple Wounds (2).`,
    "Weeping Blades":`Clan Eshin only. Two hand weapons. All attacks gain Armour Piercing (1), Magical Attacks and Multiple Wounds (D3). Common.`,
    "Warpstone Stars":`Throwing weapon (6/9"): As user Strength, Armour Piercing (1), Magical Attacks, Multiple Shots (2), Multiple Wounds (D3), Quick Shot. Common.`,
    "Lash of Fangs":`Clan Moulder only. Whip. Any character, Monstrous Creature or Monster suffering an unsaved Wound becomes subject to Stupidity for the rest of the game.`,
    "Warpforged Blade":`Clan Skryre only. Gives the wielder the Ignores Armour Saves special rule. Common.`,
    /* Skaven magic armour */
    "Foulhide":`Medium armour. Gives the wearer Regeneration (5+).`,
    "Shield of Distraction":`Shield. All enemies in base contact with the bearer suffer -1 Attack.`,
    "Rust Armour":`Medium armour. The first time the wearer is wounded by a Strength high enough to cancel his save (or with no save allowed), the Wound is discounted but the armour is destroyed.`,
    "Tenebrous Cloak":`Gives the wearer a Magical Ward (3+) against all missile attacks and spells.`,
    "Twisted Crown of the Horned Rat":`Gives the wearer Regeneration (4+).`,
    /* Skaven talismans */
    "Rival Hide Talisman":`All enemies attempting to strike the wearer in close combat must re-roll successful To Hit rolls.`,
    "Shadow Magnet Trinket":`All missile attacks targeting the bearer or their unit suffer -1 To Hit.`,
    "Warpstone Amulet":`Magical Ward (4+). At the end of each of your turns, roll a D6; on a 1 the character takes a Wound (no saves).`,
    "Amulet of Darkness":`The wearer and any unit they join gain Magic Resistance (1). If forced to reveal magic items or hidden models, only the Amulet need be revealed.`,
    "Suspicious Stone":`Magical Ward (6+) which may be re-rolled.`,
    "Warpscale Pendant":`Immunity (Flaming Attacks, Lightning Attacks) and Magic Resistance (2). At the start of the game the bearer must pass a Toughness test or take a Wound (no saves). Common.`,
    /* Skaven arcane items */
    "Warpscroll":`Charm, one use. Bound spell (Level 3, cast on 9+): direct damage, 24" range — all models in the target unit suffer a Strength 3 Hit; casualties force a Panic test.`,
    "Warpstorm Scroll":`Charm, one use. Bound spell (Level 2, cast on 7+): direct damage targeting all units with Fly within 24" — D6 Strength 6 Hits with Lightning Attacks.`,
    "Esoteric Warp Resonator":`Relic. Clan Skryre only. Adds a free Power dice whenever the bearer attempts to cast Warp Lightning (Lore of Ruin).`,
    "Staff of Rightful Supremacy":`Staff. All enemy Wizards within 12" suffer -1 to cast. If the bearer's dispel roll totals 13, the spell is automatically dispelled.`,
    "Eye of the Horned Rat":`Relic. At the start of your Magic phase roll a D6: on 2+ add one Power dice; on a 1 remove one Power dice.`,
    "Scrying Stone":`Charm, one use. Magical Ward (2+) against the bearer's first wounding Hit; if saved, the model gains Stupidity for the rest of the game.`,
    "Warpstone Token":`Charm, one use; may be taken in multiples. Spend one or more when casting to add that many Power dice (may exceed your level). Each warpstone-generated die that rolls a 1 inflicts a Wound (no saves). Common.`,
    /* Skaven enchanted items */
    "Brass Orb":`Clan Skryre only, one use. Thrown in the Shooting phase: small template within 6" + LoS, scatters D3". Models touched roll a D6 per Wound — each 4+ is a Wound with Ignores Armour Saves and Magical Attacks.`,
    "Bilious Bell":`Clan Pestilens only, one use. At the start of any of your turns: enemy units within 18" take a Strength 3 Hit, within 12" D3 Strength 4 Hits, within 6" D6 Strength 5 Hits.`,
    "The Cube of Mists":`Clan Eshin only, one use. At the start of any combat round, enemy units in base contact may make no Supporting Attacks this round and all enemy models in the unit suffer -1 To Hit.`,
    "Doomrocket":`Clan Skryre only, one use. Rocket launcher, small template, Range 12-36", Strength 5, Slow to Fire (own Misfire chart).`,
    "Fleshgift Vial":`Clan Moulder only, one use. At the start of any Close Combat phase roll a D6: 1 the bearer takes 1 Wound (no saves); 2-4 one enemy unit in base contact takes D3 Wounds (no saves); 5-6 takes D6 Wounds (no saves).`,
    "Infernal Bomb":`Clan Eshin only, one use. Place a bomb along the movement path; detonate at the start of any Movement sub-phase on a 2+. Large template: centre model takes S10 Multiple Wounds (D6); other touched models take a Strength 3 hit with Armour Piercing (1).`,
    "Skalm":`One use. Used at the beginning of any phase in either turn: the bearer recovers all Wounds suffered so far.`,
    "Screechskull Trophies":`All enemy units within 6" of the bearer roll an additional D6 on Leadership tests and discard the lowest.`,
    "Skavenbrew":`One use, start of game. Roll on the table for the bearer's unit (rank & file): Gone Bad / Inspired Hatred / Frenzied / Rabid (Frenzy + Hatred, with ongoing wounds).`,
    "Death Globe":`Clan Skryre only, one use. Small template within 6" + LoS, scatters D3". Models touched pass a Toughness test or take a Wound with Ignores Armour Saves and Magical Attacks; on a 1, centre on the thrower.`,
    "Pipes of Piebald":`All enemy units within 12" of the bearer are subject to Stupidity.`,
    "Skryre's-Breath Bellows":`Clan Skryre only, one use. Breath Weapon: any model Hit takes a Toughness test or suffers a Wound (Ignores Armour Saves).`,
    "Blistrevous, the Living Cyst":`Clan Pestilens only. The bearer gains Frenzy and Hatred. From your second turn, if a friendly Clan Pestilens character is within 12", the item transfers to them.`,
    "Flaypelt Cloak":`The bearer may re-roll 1s To Hit and To Wound in close combat.`,
    "Gnawbomb":`Clan Eshin only, one use. At the start of any of your turns, remove the bearer and their unit (leave a marker); place them within 3D6" of the marker in the Remaining Moves sub-phase.`,
    "Portents of Verminous Doom":`Gives the bearer the Fear special rule.`,
    "Rabid Crown":`Clan Moulder only. All friendly Clan Moulder units (except characters) within 6" of the bearer may re-roll failed To Wound rolls.`,
    "Vial of the Fulminator":`Clan Skryre only. At the start of each of your Remaining Moves sub-phases, pick one friendly War Machine within 12" of the bearer: it may march this turn, or move and shoot. If it does, all remaining crew must pass a Toughness test or suffer a Wound with no saves allowed.`,
    "Snoutgrovel Robes":`All friendly units within 12" of the bearer gain Immunity (Fear).`,
    "Farskitter Cloak":`Clan Eshin only. Bound spell (Level 1, cast on 5+): conveyance targeting the bearer — moved anywhere within 24" of its original position.`,
    "Warpstone Innards":`Mounted Clan Moulder model only. The bearer's mount gains +1 Strength and Frenzy, but must pass a Toughness test at the start of each of your turns or take a Wound (no saves).`,
    "Assassins-Bane Rigging":`Clan Eshin only. All enemy models attacking the bearer in close combat suffer a Strength 3 Hit for each Hit they inflict on the bearer.`,
    "Rat-Tail Snake":`Clan Moulder only. If an enemy rolls a 6 To Hit against the bearer, they immediately suffer a Strength 4 Hit.`,
    "Warpstone Charm":`One use. The bearer may re-roll any single dice roll that directly affects them.`,
    /* Skaven magic standards */
    "Sacred Standard of the Horned Rat":`All enemy units within 12" suffer -1 Leadership, and enemy units in base contact with the bearer must re-roll successful Leadership tests.`,
    "Plague Banner":`Plague Monks only, one use. Activated at the start of any Close Combat phase: for the rest of that phase all Plague Monk models in the unit may re-roll failed To Hit and To Wound rolls.`,
    "Storm Banner":`One use. Within 24": no model may use Fly, non-magical missiles are at -2 To Hit, and non-BS shooting must roll 4+ to fire. Ends at the start of each following player turn on a 4+.`,
    "Icon of Great-Total Supremacy":`At the start of each of your turns, the unit regains D3 Infantry models slain earlier in the game.`,
    "Umbranner":`The unit gains a Magical Ward (4+) against non-magical missiles of Strength 4 or less.`,
    "Grand Banner of Clan Superiority":`The unit gains +D3 combat resolution if it has more ranks than each enemy unit in base contact.`,
    "Banner of Burning Hatred":`The unit gains the Hatred special rule.`,
    "Shroud of Dripping Death":`Clan Pestilens only. All enemy models in base contact with the unit take a Strength 2 Hit (Ignores Armour Saves) at the start of every Close Combat phase.`,
    "Banner of the Under-Empire":`All enemy units in base contact with the unit take 3D6 Strength 1 Hits at the start of every Close Combat phase.`,
    "Dwarf-Hide Banner":`The unit gains Hatred against all Dwarfs.`,
    "Banner of the Swarm":`The unit gains +2 (instead of +1) to combat resolution from outnumbering its enemies.`,
    "Banner of the Four Black Winds":`Enemies cannot use Fly to charge the unit carrying this standard.`,
    "Banner of Verminous Scurrying":`The unit may march three times its Movement; if it does, it suffers 2D6 Strength 3 Hits (no saves) after the March move.`,
    /* Common rulebook items */
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

  // Skaven unique lores. A Wizard knows (level + 1) spells from its lore(s);
  // lvl 0 = the signature spell, known automatically.
  spellLores: {
    "Ruin": { attribute: { name:"Musk of Fear", text:`If one or more Lore of Ruin spells affect an enemy unit, the target suffers -1 Leadership (min 1) until the start of the caster's next Magic phase.` }, spells: [
      { name:"Warp Lightning", lvl:0, cast:5, type:"Magic Missile", range:`24"`, effect:`D3 Strength 5 hits with Lightning Attacks. If the number of hits rolled is a natural 1 (on a D6), the caster suffers a Strength 5 hit instead of the target.` },
      { name:"Death Frenzy", lvl:1, cast:6, type:"Augment", range:`18"`, effect:`Target gains Frenzy for the rest of the game (can be lost as normal). May be re-cast on the same target; if it already has Frenzy it instead suffers D3 Wounds (Ignores Armour) at the end of each Magic phase.` },
      { name:"Warp Power", lvl:1, cast:6, type:"Augment", range:`18"`, effect:`Target may re-roll failed To Hit and To Wound rolls until the caster's next Magic phase, then suffers D3 Wounds (Ignores Armour) when the spell ends.` },
      { name:"Warp Shield", lvl:1, cast:6, type:"Augment", range:`18"`, effect:`Until the caster's next Magic phase the target ignores missile hits equal to the casting result (max 10); if it suffers more it then takes D6 Strength 3 hits and the spell ends.` },
      { name:"Howling Warpgale", lvl:2, cast:7, type:"Hex (aura)", range:`18"`, effect:`Until the caster's next Magic phase, no units within range may use Fly and all non-magical missile attacks suffer -1 To Hit.` },
      { name:"Splinter", lvl:2, cast:7, type:"Direct damage (aura)", range:`6"`, effect:`All target units within range pass a Leadership test or suffer one Wound that Ignores Armour Saves per point failed.` },
      { name:"Pit of the Underworld", lvl:2, cast:9, type:"Summoning (area)", range:`36"`, effect:`Place a marker (cannot be dispelled). At the start of each following Magic phase, on a 4+ the large round template strikes — each model rolls a D6 per Wound, on 4+ suffers a Wound (Ignores Armour & Regeneration); then the spell ends.` },
      { name:"Flensing Ruin", lvl:3, cast:10, type:"Direct damage", range:`12"`, effect:`Single model (even a character in a unit) suffers D3 Strength 6 hits with Lightning Attacks.` },
      { name:"Madness", lvl:3, cast:10, type:"Hex", range:`24"`, effect:`Unengaged target turns on the spot and moves 2D6" in a random direction (scatter dice), stopping 1" from any unit or impassable terrain.` },
      { name:"Warpstorm", lvl:3, cast:10, type:"Direct damage (aura)", range:`12"`, effect:`Roll a D6 per unit in range — enemy affected on 3+, friendly on 6. Each affected unit suffers D6 Strength 5 hits with Lightning Attacks.` },
      { name:"Cracks Call", lvl:4, cast:13, type:"Direct damage (line)", range:`24" line`, effect:`24" line template from the caster's front arc — each model rolls a D6 per Wound, on 4+ suffers a Wound (Ignores Armour & Regeneration).` },
      { name:"Scorch", lvl:4, cast:15, type:"Direct damage (area)", range:`24"`, effect:`Large round template — all models under it suffer a Strength 4 hit with Flaming Attacks; a unit taking casualties must take a Panic test.` }
    ]},
    "Plague": { attribute: { name:"Plague Rash", text:`If one or more Lore of Plague spells affect an enemy unit, the target suffers -1 Weapon Skill and -1 Initiative (min 1) until the start of the caster's next Magic phase.` }, spells: [
      { name:"Pestilent Breath", lvl:0, cast:5, type:"Direct damage (Breath)", range:`Breath`, effect:`Strength 2 Breath Weapon attack with Ignores Armour Saves (may be cast in close combat).` },
      { name:"Bless with Filth", lvl:1, cast:5, type:"Augment", range:`18"`, effect:`Target gains Poisoned Attacks until the caster's next Magic phase.` },
      { name:"Mantle of Contagion", lvl:1, cast:5, type:"Augment", range:`18"`, effect:`The target unit and any units in base contact with it suffer 2D6 Strength 3 hits with Ignores Armour Saves.` },
      { name:"Veil of Flies", lvl:1, cast:5, type:"Augment", range:`18"`, effect:`All enemy units in base contact with the target suffer -1 To Hit until the caster's next Magic phase.` },
      { name:"Vermintide", lvl:2, cast:7, type:"Magical vortex (RIP)", range:`Large template`, effect:`Large round template vortex; any model touched suffers a Strength 1 hit.` },
      { name:"Weeping Wounds", lvl:2, cast:8, type:"Hex (RIP)", range:`24"`, effect:`Target suffers D6 Strength 2 hits (Ignores Armour); while in play it suffers a further D6 such hits at the start of each subsequent Magic phase.` },
      { name:"Purulent World Sores", lvl:2, cast:9, type:"Summoning (area)", range:`18"`, effect:`Summon a marshland up to 6" across; models within it on summoning or entering later suffer a Strength 1 Hit with Ignores Armour Saves.` },
      { name:"Putrefy", lvl:3, cast:10, type:"Hex", range:`18"`, effect:`Target suffers -1 Strength for the rest of the game (cumulative on re-cast).` },
      { name:"Wither", lvl:3, cast:11, type:"Hex", range:`18"`, effect:`Target suffers -1 Toughness for the rest of the game (cumulative on re-cast).` },
      { name:"Air of Pestilence", lvl:3, cast:11, type:"Direct damage (aura)", range:`12"`, effect:`Roll a D6 per unit in range — enemy affected on 2+, friendly on 4+, Clan Pestilens (friend or foe) on 5+. Each affected unit suffers 2D6 Strength 3 hits with Ignores Armour Saves.` },
      { name:"Cloud of Corruption", lvl:4, cast:12, type:"Direct damage (area)", range:`24"`, effect:`Large template — all models touched suffer a Strength 2 Hit with Ignores Armour Saves.` },
      { name:"Plague", lvl:4, cast:15, type:"Direct damage", range:`18"`, effect:`May target units in close combat. All models in the target unit pass a Toughness test or take a Wound (Ignores Armour). Then roll a D6 to spread to a unit within 6" of a previous target (chart). A unit can only be targeted by Plague once per Magic phase.` }
    ]},
    "Stealth": { attribute: { name:"Toxic Rain", text:`If one or more Lore of Stealth spells affect an enemy unit, the target suffers -1 to its armour saves until the start of the caster's next Magic phase.` }, spells: [
      { name:"Warp Stars", lvl:0, cast:6, type:"Magic Missile", range:`18"`, effect:`D6 Strength 4 hits with Armour Piercing (1) and Poisoned Attacks.` },
      { name:"Stickypaws", lvl:1, cast:5, type:"Augment", range:`18"`, effect:`Cast on an Infantry unit; until the caster's next Magic phase it treats cliffs and buildings as open ground (may not end its move within 1").` },
      { name:"Armour of Darkness", lvl:1, cast:6, type:"Augment", range:`Self`, effect:`Until the caster's next turn, the caster and their unit gain a 6+ armour save and all missile fire at them suffers -1 To Hit.` },
      { name:"Marked for Death", lvl:1, cast:6, type:"Hex", range:`24"`, effect:`All attacks against the target gain +1 To Hit until the caster's next Magic phase.` },
      { name:"Pelt of the Assassin", lvl:2, cast:7, type:"Augment (RIP)", range:`18"`, effect:`No unit can draw line of sight to the target unless within 12". If the target moves for any reason the spell is immediately dispelled.` },
      { name:"Brittle Bone", lvl:2, cast:7, type:"Hex", range:`24"`, effect:`Until the caster's next Magic phase, all models in the target take a Dangerous Terrain test whenever they charge, march, flee or pursue (failing on 1-2 in already-dangerous terrain).` },
      { name:"Shadow Strike", lvl:2, cast:7, type:"Direct damage", range:`24"`, effect:`Target takes 3D6 Weapon Skill tests; each failed test causes a Strength 4 Hit.` },
      { name:"Swiftscamper", lvl:3, cast:9, type:"Augment", range:`18"`, effect:`Target doubles its Movement (max 10) and may re-roll Charge, Flee and Pursuit results until the caster's next Magic phase.` },
      { name:"Skitterleap", lvl:3, cast:10, type:"Conveyance", range:`12"`, effect:`Target is picked up and moved anywhere within 24" of its original position, like a summoning spell.` },
      { name:"Black Whirlwind", lvl:3, cast:10, type:"Direct damage (area)", range:`24"`, effect:`Small round template — all models under it suffer a Strength 3 hit; the unit then suffers -1 WS, BS and Initiative until the caster's next Magic phase.` },
      { name:"Veil of Shadows", lvl:4, cast:15, type:"Magical vortex (RIP)", range:`Large template`, effect:`Large round template vortex; any model touched takes a Strength 4 hit and the unit counts as Disrupted for the rest of the turn.` }
    ]}
  },

  units: {
    /* ---------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "greyseer", name: "Grey Seer", isCharacter: true, lores: ["Plague","Ruin"],
        access: [],
        variants: [ { name: "Grey Seer", points: 190, wizardLevel: 4, magicBudget: 100 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "War-litter", cost: 30 },
            { label: "Screaming Bell", cost: 200 } ] }
        ],
        notes: "Level 4 Wizard using Plague + Ruin; also knows Curse of the Horned Rat."
      },
      {
        id: "commanders", name: "Commanders", isCharacter: true,
        access: ["medium armour","additional hand weapon","halberd","great weapon","light armour","heavy armour","shield","pistol"],
        variants: [
          { name: "Clawlord", points: 85, magicBudget: 100 },
          { name: "Clawleader", points: 45, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Polearm", cost: 10 }, { label: "Great weapon", cost: 15 } ] },
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Warplock pistol", cost: 7 }, { label: "Ratling pistol", cost: 7 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 3 }, { label: "Medium armour", cost: 9 }, { label: "Heavy armour", cost: 18 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "tail", type: "toggle", label: "Tail weapon", cost: 5, per: "flat" },
          { id: "rathound", type: "toggle", label: "Rat Hound Bodyguard", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Great Pox Rat", cost: 20 },
            { label: "War-litter", cost: 25 },
            { label: "Gnaw-beast", cost: 35 },
            { label: "Rat Ogre Bonebreaker", cost: 75 },
            { label: "Brood Horror", cost: 150, only: "Clawlord" } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard Bearer (one Clawleader only)", cost: 25, per: "flat", only: "Clawleader", bsb: true }
        ],
        notes: "Clawguard: may upgrade one Stormvermin unit with heavy armour (+1.5 pts/model per Clawguard model). BSB Clawleader may carry a Magic Standard with no points limit."
      },
      {
        id: "verminlord", name: "Verminlord", isCharacter: true, cannotBeGeneral: true, lores: ["Plague","Ruin"],
        access: [],
        variants: [ { name: "Verminlord", points: 450, wizardLevel: 4, magicBudget: 0 } ],
        options: [
          { id: "upg", type: "choice", label: "Upgrade", choices: [
            { label: "Corruptor", cost: 5 }, { label: "Deceiver", cost: 25 }, { label: "Warbringer", cost: 25 }, { label: "Warpseer", cost: 50 } ] }
        ],
        notes: "Daemonic, Level 4 Wizard (Plague + Ruin). Upgrades change weapon/spell access (Deceiver → Stealth; Corruptor → Plague; Warseer/Warbringer → Ruin). May never be Army General."
      },
      {
        id: "assassins", name: "Assassins", isCharacter: true,
        access: ["additional hand weapon","throwing weapon","blowpipe","sling"],
        variants: [
          { name: "Master Assassin", points: 145, magicBudget: 100 },
          { name: "Assassin", points: 100, magicBudget: 50 }
        ],
        options: [
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Blowpipe", cost: 6 }, { label: "Sling", cost: 7 } ] },
          { id: "tail", type: "toggle", label: "Tail weapon", cost: 5, per: "flat" },
          { id: "smoke", type: "toggle", label: "Smoke bombs", cost: 5, per: "flat" }
        ],
        notes: "Clan Eshin. Hidden; a Master Assassin may be the Army General (passes on Leadership only when not Hidden)"
      },
      {
        id: "sorcerers", name: "Sorcerers", isCharacter: true, lores: ["Stealth"],
        access: [],
        variants: [
          { name: "Sorcerer Lord", points: 160, wizardLevel: 3, magicBudget: 100 },
          { name: "Sorcerer", points: 65, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level (Sorcerer only)", cost: 35, per: "flat", only: "Sorcerer" }
        ],
        notes: "Clan Eshin. Use the Lore of Stealth."
      },
      {
        id: "moulders", name: "Master Moulders", isCharacter: true,
        access: ["light armour","additional hand weapon","great weapon","whip"],
        variants: [
          { name: "Master Mutator", points: 80, magicBudget: 100 },
          { name: "Master Moulder", points: 30, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Whip", cost: 10 }, { label: "Great weapon", cost: 15 }, { label: "Things-catcher", cost: 20 }, { label: "Shock-prod", cost: 25 } ] },
          { id: "tail", type: "toggle", label: "Tail weapon", cost: 5, per: "flat" },
          { id: "rathound", type: "toggle", label: "Rat Hound Bodyguard", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Great Pox Rat", cost: 20 },
            { label: "Gnaw-beast", cost: 36 },
            { label: "Rat Ogre Bonebreaker", cost: 75 },
            { label: "Brood Horror", cost: 150, only: "Master Mutator" } ] }
        ],
        notes: "Clan Moulder."
      },
      {
        id: "plaguepriests", name: "Plague Priests", isCharacter: true, lores: ["Plague"],
        access: ["additional hand weapon","flail","great weapon","plague censer"],
        variants: [
          { name: "Plaguelord", points: 165, wizardLevel: 2, magicBudget: 100 },
          { name: "Plague Priest", points: 90, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Flail", cost: 10 }, { label: "Great weapon", cost: 15 }, { label: "Plague censer", cost: 20 } ] },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Great Pox Rat", cost: 20 },
            { label: "Plague Furnace", cost: 150, only: "Plaguelord" } ] }
        ],
        notes: "Clan Pestilens. Use the Lore of Plague."
      },
      {
        id: "warlocks", name: "Warlock Engineers", isCharacter: true, lores: ["Ruin"],
        access: ["halberd","light armour","pistol"],
        variants: [
          { name: "Warlock Master", points: 155, wizardLevel: 3, magicBudget: 100 },
          { name: "Warlock Engineer", points: 60, magicBudget: 50 }
        ],
        options: [
          { id: "polearm", type: "toggle", label: "Polearm", cost: 5, per: "flat" },
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Warplock Pistol", cost: 6 }, { label: "Ratling Pistol", cost: 6 }, { label: "Warpmusket", cost: 9 }, { label: "Warpvolt Obliterator", cost: 15 } ] },
          { id: "optics", type: "choice", label: "Equipment", choices: [
            { label: "Gas Mask", cost: 5 }, { label: "Warlock Optics", cost: 15 } ] },
          { id: "upgrade", type: "choice", label: "Warp upgrade", choices: [
            { label: "Warp-Blades", cost: 5 }, { label: "Supercharged Warp-Power Accumulator", cost: 10 }, { label: "Upgraded Warp-Energy Condenser", cost: 15 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" }
        ],
        notes: "Clan Skryre. A Warlock Master is a Level 3 Wizard (Ruin); a Warlock Engineer is not a Wizard."
      },
      /* Special characters */
      { id: "thanquol", name: "Thanquol", isCharacter: true, isSpecialChar: true, lores: ["Plague","Ruin"],
      access: [],
        variants: [ { name: "Thanquol", points: 255, wizardLevel: 4, magicBudget: 50 } ], options: [],
        notes: "Level 4 Wizard (Plague + Ruin + Curse of the Horned Rat). May be mounted on Boneripper Mk II (taken as a separate special character)" },
      { id: "boneripper", name: "Boneripper", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
      access: [],
        variants: [
          { name: "Boneripper", points: 160, magicBudget: 0 },
          { name: "Boneripper Mk II", points: 320, magicBudget: 0 }
        ],
        options: [
          { id: "braziers", type: "toggle", label: "Exchange Warpfire Thrower for Warpfire Braziers (Mk II only)", cost: 0, per: "flat", only: "Boneripper Mk II" }
        ],
        notes: "Requires Thanquol in the army. May never be Army General." },
      { id: "queek", name: "Queek Headtaker", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Queek Headtaker", points: 220, magicBudget: 0 } ], options: [],
        notes: "Must be accompanied by a unit of Stormvermin (+2 pts/model, +1 Strength) and may never leave it." },
      { id: "krittok", name: "Krittok Foulblade", isCharacter: true, isSpecialChar: true,
      access: ["heavy armour"],
        variants: [ { name: "Krittok Foulblade", points: 180, magicBudget: 25 } ], options: [] },
      { id: "spinetail", name: "Spinetail", isCharacter: true, isSpecialChar: true,
      access: ["medium armour"],
        variants: [ { name: "Spinetail", points: 160, magicBudget: 50 } ], options: [] },
      { id: "tretch", name: "Tretch Craventail", isCharacter: true, isSpecialChar: true,
      access: ["additional hand weapon","light armour"],
        variants: [ { name: "Tretch Craventail", points: 105, magicBudget: 0 } ], options: [] },
      { id: "skreech", name: "Skreech Verminking", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true, lores: ["Plague","Ruin","Stealth"],
      access: [],
        variants: [ { name: "Skreech Verminking", points: 470, wizardLevel: 4, magicBudget: 0 } ], options: [],
        notes: "Level 4 Wizard (Plague + Ruin + Stealth + Curse). May never be Army General." },
      { id: "vizzik", name: "Vizzik Skour", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true, lores: ["Plague","Ruin","Stealth"],
      access: [],
        variants: [ { name: "Vizzik Skour", points: 620, wizardLevel: 4, magicBudget: 0 } ], options: [],
        notes: "Level 4 Wizard (Plague + Ruin + Stealth + Curse). May never be Army General." },
      { id: "snikch", name: "Deathmaster Snikch", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Deathmaster Snikch", points: 280, magicBudget: 0 } ], options: [],
        notes: "Clan Eshin. Hidden; may be the Army General via Sensei." },
      { id: "veskit", name: "Veskit", isCharacter: true, isSpecialChar: true,
      access: ["light armour"],
        variants: [ { name: "Veskit", points: 165, magicBudget: 0 } ], options: [] },
      { id: "throt", name: "Throt the Unclean", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Throt the Unclean", points: 175, magicBudget: 0 } ], options: [] },
      { id: "skweel", name: "Skweel Gnawtooth", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
      access: ["light armour"],
        variants: [ { name: "Skweel Gnawtooth", points: 85, magicBudget: 0 } ], options: [],
        notes: "Must include and join a unit of Giant Rats; may never leave it." },
      { id: "ghoritch", name: "Ghoritch", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
      access: [],
        variants: [ { name: "Ghoritch", points: 180, magicBudget: 0 } ], options: [] },
      { id: "nurglitch", name: "Nurglitch", isCharacter: true, isSpecialChar: true, lores: ["Plague"],
      access: [],
        variants: [ { name: "Nurglitch", points: 410, wizardLevel: 3, magicBudget: 0 } ], options: [],
        notes: "Clan Pestilens, mounted on the Great Pox Rat 'Pox'. Level 3 Wizard (Plague + always knows Plague)" },
      { id: "skrolk", name: "Lord Skrolk", isCharacter: true, isSpecialChar: true, lores: ["Plague"],
      access: [],
        variants: [ { name: "Lord Skrolk", points: 320, wizardLevel: 2, magicBudget: 0 } ], options: [],
        notes: "Clan Pestilens. Level 2 Wizard (Plague)" },
      { id: "morbus", name: "Morbus Sanguis", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Morbus Sanguis", points: 90, magicBudget: 0 } ], options: [] },
      { id: "ikit", name: "Ikit Claw", isCharacter: true, isSpecialChar: true, lores: ["Ruin"],
      access: [],
        variants: [ { name: "Ikit Claw", points: 335, wizardLevel: 4, magicBudget: 0 } ], options: [],
        notes: "Clan Skryre. Level 4 Wizard (Ruin)" },
      { id: "klawmunkast", name: "Klawmunkast", isCharacter: true, isSpecialChar: true, lores: ["Ruin"],
      access: ["light armour"],
        variants: [ { name: "Klawmunkast", points: 150, wizardLevel: 2, magicBudget: 0 } ], options: [],
        notes: "Clan Skryre. Level 2 Wizard (Ruin)" }
    ],

    /* ------------------------------- CORE ------------------------------- */
    core: [
      { id: "clanrats", name: "Clanrats", perModel: true, basePoints: 4, unitSize: [20,60],
        options: [
          { id: "spears", type: "toggle", label: "Spears", cost: 0.5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 } ],
        notes: "You may not field more units of any single other Core type than units of Clanrats." },
      { id: "stormvermin", name: "Stormvermin", perModel: true, basePoints: 6, unitSize: [15,45],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Spears", cost: 0.5, per: "model" }, { label: "Polearms", cost: 2, per: "model" } ] },
          { id: "shield", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "clawguard", type: "toggle", label: "Clawguard heavy armour (one unit per Clawguard model)", cost: 1.5, per: "model", requires: { unit: ["commanders","queek","krittok"] } },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "skavenslaves", name: "Skavenslaves", perModel: true, basePoints: 2, unitSize: [20,60], expendable: true,
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Spears", cost: 0.5, per: "model" }, { label: "Shields", cost: 1, per: "model" }, { label: "Polearms", cost: 2, per: "model" }, { label: "Slings", cost: 2, per: "model" } ] },
          { id: "mus", type: "toggle", label: "Musician", cost: 5, per: "flat" } ],
        notes: "Include 1 Pawleader per 20 models." },
      { id: "ratswarms", name: "Rat Swarms", perModel: true, basePoints: 25, unitSize: [3,9],
        options: [
          { id: "plague", type: "toggle", label: "Plague Rats", cost: 5, per: "model" } ] },
      { id: "nightrunners", name: "Night Runners", perModel: true, basePoints: 4, unitSize: [10,30], keyword: "eshin",
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapons", cost: 1, per: "model" },
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Throwing weapons", cost: 1, per: "model" }, { label: "Slings", cost: 2, per: "model" } ] },
          { id: "poison", type: "toggle", label: "Poisoned Attacks (not slings)", cost: 1, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "giantrats", name: "Giant Rats", perModel: true, basePoints: 2, unitSize: [10,30],
        options: [], notes: "Include 1 Packmaster (5 pts each) per 5 Giant Rats." },
      { id: "plaguemonks", name: "Plague Monks", perModel: true, basePoints: 8, unitSize: [15,45], keyword: "pestilens",
        options: [
          { id: "cmd", type: "command", magicStandard: 25 } ] }
    ],

    /* ------------------------------ SPECIAL ----------------------------- */
    special: [
      { id: "gutterrunners", name: "Gutter Runners", perModel: true, basePoints: 8, unitSize: [5,15], keyword: "eshin",
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapons", cost: 1, per: "model" },
          { id: "ranged", type: "choice", label: "Ranged weapon", choices: [
            { label: "Throwing weapons", cost: 1, per: "model" }, { label: "Slings", cost: 2, per: "model" } ] },
          { id: "snare", type: "toggle", label: "Snare-nets", cost: 2, per: "model" },
          { id: "poison", type: "toggle", label: "Poisoned Attacks (not slings)", cost: 1, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "wolfrats", name: "Wolf Rats", perModel: true, basePoints: 7, unitSize: [5,15],
        options: [
          { id: "upg", type: "choice", label: "Upgrade", choices: [
            { label: "Pox Feeders", cost: 1, per: "model" }, { label: "Warpstone Shard Teeth", cost: 1, per: "model" }, { label: "Bloated Mutants", cost: 1, per: "model" } ] } ] },
      { id: "ratogres", name: "Rat Ogres", perModel: true, basePoints: 33, unitSize: [3,9], keyword: "moulder",
        options: [
          { id: "upg", type: "multi", label: "Upgrades (up to two)", max: 2, choices: [
            { label: "Brain Transplant", cost: 3, per: "model" }, { label: "Extra Extremities", cost: 3, per: "model" }, { label: "Quadrupedal", cost: 3, per: "model" }, { label: "Armoured", cost: 5, per: "model" }, { label: "Resilient", cost: 6, per: "model" }, { label: "Troll-blooded", cost: 6, per: "model" } ] } ],
        notes: "Include 1 Packmaster (5 pts each) per 3 Rat Ogres." },
      { id: "censerbearers", name: "Plague Censer Bearers", perModel: true, basePoints: 13, unitSize: [5,15], keyword: "pestilens",
        options: [
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "jezzails", name: "Warplock Jezzails", perModel: true, basePoints: 20, unitSize: [3,10], keyword: "skryre",
        options: [
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "globadiers", name: "Poisoned Wind Globadiers", perModel: true, basePoints: 10, unitSize: [5,15], keyword: "skryre",
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "warpfire", name: "Warpfire Thrower", perModel: false, basePoints: 50, unitSize: [1,1], keyword: "skryre",
        options: [],
        notes: "Counts as the same Special choice as Ratling Gun / Warpvolt Scourger / Poisoned Wind Mortar." },
      { id: "ratling", name: "Ratling Gun", perModel: false, basePoints: 55, unitSize: [1,1], keyword: "skryre",
        options: [],
        notes: "Counts as the same Special choice as Warpfire Thrower / Warpvolt Scourger / Poisoned Wind Mortar." },
      { id: "warpvolt", name: "Warpvolt Scourger", perModel: false, basePoints: 50, unitSize: [1,1], keyword: "skryre",
        options: [],
        notes: "Counts as the same Special choice as Warpfire Thrower / Ratling Gun / Poisoned Wind Mortar." },
      { id: "pwmortar", name: "Poisoned Wind Mortar", perModel: false, basePoints: 60, unitSize: [1,1], keyword: "skryre",
        options: [],
        notes: "Counts as the same Special choice as Warpfire Thrower / Ratling Gun / Warpvolt Scourger." },
      { id: "warpgrinder", name: "Warp-grinder", perModel: false, basePoints: 30, unitSize: [1,1], keyword: "skryre",
        options: [],
        notes: "Tunnelling ambush deployment with one Infantry unit." },
      { id: "doomflayer", name: "Doom-flayer", perModel: false, basePoints: 30, unitSize: [1,1], keyword: "skryre",
        options: [
          { id: "crew", type: "toggle", label: "Additional crew", cost: 5, per: "flat" } ] }
    ],

    /* ------------------------------- RARE ------------------------------- */
    rare: [
      { id: "eshintriad", name: "Eshin Triad", perModel: true, basePoints: 35, unitSize: [3,3], keyword: "eshin",
        options: [
          { id: "tail", type: "toggle", label: "Tail weapons", cost: 2, per: "model" },
          { id: "smoke", type: "toggle", label: "Smoke Bombs", cost: 5, per: "model" } ] },
      { id: "stormfiend", name: "Stormfiend", perModel: true, basePoints: 70, unitSize: [1,2], keyword: "moulder",
        options: [
          { id: "wep", type: "mustChoose", label: "Weapon system (per model)", choices: [
            { label: "Doom-flayer Gauntlets", cost: 15, per: "model" }, { label: "Grinderfists", cost: 20, per: "model" }, { label: "Shock Gauntlets", cost: 20, per: "model" }, { label: "Ratling Cannons", cost: 45, per: "model" }, { label: "Warpfire Projectors", cost: 50, per: "model" }, { label: "Windlaunchers", cost: 50, per: "model" } ] },
          { id: "armour", type: "toggle", label: "Medium armour (melee variants only)", cost: 4, per: "model" } ],
        notes: "1-2 Stormfiends count as a single Rare choice." },
      { id: "broodhorror", name: "Brood Horror", perModel: false, basePoints: 150, unitSize: [1,1], keyword: "moulder",
        options: [
          { id: "upg", type: "choice", label: "Upgrade", choices: [
            { label: "Skryre Claws", cost: 5 }, { label: "Rusted Armour", cost: 10 }, { label: "Lash Tail", cost: 15 }, { label: "Pestilent Breath", cost: 25 } ] } ] },
      { id: "broodterror", name: "Brood Terror", perModel: false, basePoints: 220, unitSize: [1,1], keyword: "moulder",
        options: [] },
      { id: "hellpit", name: "Hell Pit Abomination", perModel: false, basePoints: 225, unitSize: [1,1], keyword: "moulder",
        options: [
          { id: "spikes", type: "toggle", label: "Warpstone Spikes", cost: 10, per: "flat" } ] },
      { id: "plagueclaw", name: "Plagueclaw Catapult", perModel: false, basePoints: 100, unitSize: [1,1], keyword: "pestilens",
        options: [] },
      { id: "warplightning", name: "Warp Lightning Cannon", perModel: false, basePoints: 100, unitSize: [1,1], keyword: "skryre",
        options: [] },
      { id: "warpblaster", name: "Ratling Warpblaster", perModel: false, basePoints: 100, unitSize: [1,1], keyword: "skryre",
        options: [] },
      { id: "doomwheel", name: "Doomwheel", perModel: false, basePoints: 175, unitSize: [1,1], keyword: "skryre",
        options: [] }
    ]
  }
};
