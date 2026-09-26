/* ============================================================================
   WOOD ELVES — army data (Warhammer Armies, Mathias Eliasson v3.1,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA file. See SCHEMA.md for the full field reference.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size

   Forest Spites are modelled as a seventh magic-item category
   ("Forest Spites") declared in `multiPickCategories`, so a character may
   take one or more Spites from the same budget as their Magic Items
   ("one Spite and/or Magic Items up to N points"). The Treelord Ancient,
   Grove Guardian, Branchwraith and Drycha may take Spites but NOT Magic Items — they carry
   `magicCatsOnly:["Forest Spites"]`.
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["wood-elves"] = {
  id: "wood-elves",
  name: "Wood Elves",
  author: "Mathias Eliasson v3.1 (unofficial) — 9th Edition 3.0",
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
  multiPickCategories: ["Forest Spites"],
  listRules: [
    "Special characters are unique — each may be taken only once.",
    "Magic items are unique (one of each per army) unless marked * (common).",
    "Each model may take only one item from each magic-item category.",
    "Forest Spites: a character may take Spites (and Magic Items) from its budget; each Spite may only be chosen once per army.",
    "Ambush from the Worldroots: your army may always place an additional forest (≤12\" diameter) wholly in your half during deployment.",
    "Enchanted Arrows: a model may only have one kind of Enchanted Arrows, and must use them when shooting.",
    "You may not have more units of Deepwood Scouts than units of Glade Archers.",
    "Eternal Guard: you may take one unit as Core (instead of Special) for every Glade Lord in your army (or if Araloth is included).",
    "Orion: must be the Army General; Wild Riders become Core units and the army must include at least one Wild Riders unit."
  ],

  magicItems: {
    "Magic Weapons": [
      { name: "The Spirit Sword", cost: 50 },
      { name: "Daith's Reaper", cost: 50 },
      { name: "Dawnspear", cost: 35, requiresAccess: ["light lance", "spear"] },
      { name: "Callach's Claw", cost: 25 },
      { name: "The Hunter's Talon", cost: 25, requiresAccess: "longbow" },
      { name: "Spear of Daith", cost: 25, requiresAccess: ["light lance", "spear"] },
      { name: "The Bow of Loren", cost: 20, requiresAccess: "longbow" },
      { name: "Blades of Loec", cost: 20, only: "Shadowdancer", requiresAccess: "additional hand weapon" },
      { name: "Greenwood Gladius", cost: 20 },
      { name: "Hunt Master's Pride", cost: 20, only: "Wild Hunter", requiresAccess: "light lance" },
      { name: "Spear of Twilight", cost: 20, requiresAccess: ["light lance", "spear"] },
      { name: "Sword of a Thousand Winters", cost: 20 },
      { name: "Vaul's Wrath", cost: 20, requiresAccess: "longbow" },
      { name: "Spear of the Hunt", cost: 15, only: "Wild Hunter", requiresAccess: "light lance" },
      { name: "Splinterbirch Blade", cost: 15 },
      { name: "Starcaster Longbow", cost: 15, requiresAccess: "longbow" },
      { name: "Asyendi's Bane", cost: 10, requiresAccess: "longbow" },
      { name: "Rageth's Wildfire Blades", cost: 10, requiresAccess: "additional hand weapon" }
    ],
    "Magic Armour": [
      { name: "Armour of the Fey", cost: 30, requiresAccess: "light armour" },
      { name: "The Oaken Armour", cost: 30, requiresAccess: "light armour" },
      { name: "Cloak of Tumbling Leaves", cost: 25, requiresAccess: "light armour" },
      { name: "Briarsheath", cost: 15, requiresAccess: "light armour" },
      { name: "The Helm of the Hunt", cost: 15, only: "Wild Hunter" },
      { name: "Railarian's Mantle", cost: 15, requiresAccess: "light armour" },
      { name: "Amber Armour", cost: 10, requiresAccess: "light armour" }
    ],
    "Talismans": [
      { name: "Rhymer's Harp", cost: 60 },
      { name: "Glamourweave Brooch", cost: 35 },
      { name: "Amaranthine Brooch", cost: 30 },
      { name: "Stone of the Crystal Mere", cost: 30 },
      { name: "Amber Pendant", cost: 25 },
      { name: "Fimbulwinter Shard", cost: 25 },
      { name: "Talisman of Qwarr", cost: 20 },
      { name: "Stone of Rebirth", cost: 15 },
      { name: "Merciw's Locus", cost: 15 },
      { name: "Deepmire Cloak", cost: 10 }
    ],
    "Arcane Items": [
      { name: "Orb of Midsummer", cost: 40 },
      { name: "Ranu's Heartstone", cost: 40 },
      { name: "Vesperal Gem", cost: 40 },
      { name: "Oaken Stave", cost: 35 },
      { name: "Viridescent Shawl", cost: 30 },
      { name: "Divination Orb", cost: 25 },
      { name: "Deepwood Sphere", cost: 20 },
      { name: "Silverwood Circlet", cost: 30 },
      { name: "Elf Charm", cost: 20 },
      { name: "Calaingor's Stave", cost: 15 },
      { name: "Heartwood Pendant", cost: 10 },
      { name: "Warsong Stave", cost: 10 },
      { name: "Wending Wand", cost: 5 },
      { name: "Sigil of the Mage Queen", cost: 5, common: true }
    ],
    "Enchanted Items": [
      { name: "Crown of Fell Bowers", cost: 40 },
      { name: "Wardroth Horn", cost: 40 },
      { name: "Moonstone of the Hidden Ways", cost: 35 },
      { name: "Hail of Doom Arrow", cost: 35 },
      { name: "Forget-Me-Knot", cost: 25 },
      { name: "Horn of the Asrai", cost: 25 },
      { name: "Waystalker's Cloak", cost: 25 },
      { name: "Wraithstone", cost: 25 },
      { name: "Elynett's Brooch", cost: 20 },
      { name: "Wailing Arrows", cost: 15, common: true },
      { name: "Arrows of Potency", cost: 10, common: true },
      { name: "Blight-Tipped Arrows", cost: 10, common: true },
      { name: "Crown of Antlers", cost: 10 },
      { name: "Orion's Favour", cost: 10, common: true },
      { name: "Gwytherc's Horn", cost: 5 },
      { name: "Dragontooth Arrows", cost: 5, common: true }
    ],
    "Magic Standards": [
      { name: "Battle Standard of Athel Loren", cost: 75 },
      { name: "Banner of the Wildwood", cost: 40 },
      { name: "Banner of the Eternal Queen", cost: 35 },
      { name: "Banner of the Hunter King", cost: 30, only: "Wild Riders" },
      { name: "Gaemrath, the Banner of Midwinter", cost: 25 },
      { name: "Faoghir, the Banner of Dwindling", cost: 25 },
      { name: "Saemrath, the Banner of Zenith", cost: 25 },
      { name: "Standard of Morning's Chill", cost: 25 },
      { name: "Tapestry of Talsyn", cost: 25 },
      { name: "Banner of the Wild Hunt", cost: 20, only: "Wild Riders" },
      { name: "Aech, the Banner of Springtide", cost: 10 },
      { name: "Banner of Midsummer's Eve", cost: 10 }
    ],
    "Forest Spites": [
      { name: "A Blight of Terrors", cost: 25 },
      { name: "A Cluster of Radiants", cost: 25, only: "Forest Spirit" },
      { name: "An Annoyance of Netlings", cost: 20 },
      { name: "A Muster of Malevolents", cost: 20 },
      { name: "Hagbane Spite", cost: 20 },
      { name: "A Pageant of Shrikes", cost: 15 },
      { name: "A Befuddlement of Mischiefs", cost: 10 },
      { name: "A Lamentation of Despairs", cost: 10 },
      { name: "A Resplendence of Luminescents", cost: 10 },
      { name: "A Murder of Spites", cost: 10 }
    ]
  },

  // Common rulebook magic items (identical across armies — descriptions live in common-items.js).
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
      { name: "Trickster's Helm", cost: 30 },
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
      { name: "Obsidian Amulet", cost: 20 },
      { name: "Dawnstone", cost: 15, common: true },
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
      { name: "Boots of Flight", cost: 20 },
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
    /* ---- Army special rules (pp.3-4) ---- */
    "Ambush from the Worldroots": `A Wood Elf army can always place an additional forest no more than 12" in diameter on the battlefield. This is done during deployment, before any units are deployed, and must be placed wholly in your half of the battlefield. Declare which type of forest it is when you place it. If you cannot fit the forest on your half of the table, move other terrain features by the shortest distance necessary so that the forest can be placed. If you still cannot place the forest, or if the scenario means that the Wood Elf army does not have a table half in which to deploy, this additional forest is not used in this battle.`,
    "Asrai Archery": `Models with this rule do not suffer the normal -1 To Hit penalty for moving and shooting.`,
    "Blessings of the Ancients": `A Wizard that has this rule and is within 6" of a forest gains a +1 casting and dispel bonus.`,
    "Elven Grace": `Models with this rule have the Dodge (6+) special rule in close combat. However, this cannot be used against enemies that attack before the model with Elven Grace.`,
    "Elven Shortbow": `16/24", Strength 3, Armour Piercing (1), March & Shoot, Multiple Shots (2)*, Volley Fire. *Only applies in turns the model has not marched. Cannot be used as a charge reaction.`,
    "Elven Longbow": `24/36", Strength 3, Armour Piercing (1), Multiple Shots (2)*, Volley Fire. *Only applies in turns the model has not moved. Cannot be used as a charge reaction.`,
    "Forest Spirit": `A model with this rule has the Fear, Forest Strider, Immunity (Psychology), Magical Attacks and Magical Ward (5+) special rules. However, units of Forest Spirits may only be joined by characters that are also Forest Spirits and vice versa.`,
    "Forest Stalker": `While inside a wood, models with this special rule are at an additional -1 to be Hit with missile attacks. In addition, when using the Scouts special rule they may deploy within 12" of an enemy unit if they do so within a wood.`,
    "Lethal Shot": `Models with this rule have the Killing Blow special rule with missile attacks from their Elven longbows or shortbows.`,
    "Martial Memories": `Models with this rule may re-roll 1's when rolling To Hit and To Wound in close combat.`,
    "Saearath": `Spear. Unless used with a shield in combat or when using the Mighty Blow (1) special rule from the weapon, a model armed with a saearath gains +1 Attack.`,
    "Shadow Dances of Loec": `At the start of each round of close combat (before Impact Hits), the model may choose one Shadow Dance; all models in the unit must choose the same one, lasting until the end of the turn. Whirling Death: Armour Piercing (1) and Killing Blow. Storm of Blades: +1 Attack. The Shadows Coil: all close combat attacks against the model suffer -1 To Hit. Woven Mist: Always Strikes First. Cannot choose the same Shadow Dance in two consecutive rounds.`,
    "Tree Aspects": `At the start of each round of close combat (before Impact Hits), the model may choose one Tree Aspect; all models in the unit must choose the same one, lasting until the end of the turn. Birch Aspect: +1 Attack. Oak Aspect: +1 Toughness. Willow Aspect: all close combat attacks against the model suffer -1 To Hit. Cannot choose the same Tree Aspect in two consecutive rounds.`,
    "Tree Whack": `A model with this rule can make a single Tree Whack in place of its normal close combat attacks. Nominate an enemy model in base contact; it must pass an Initiative test or suffer D6 Wounds which Ignores Armour Saves.`,

    /* ---- Enchanted Arrows (a model may only have one kind) ---- */
    "Arcane Bodkins": `Shooting attacks made with Arcane Bodkins have the Armour Piercing (1) special rule.`,
    "Hagbane Tips": `Shooting attacks made with Hagbane Tips have the Poisoned Attacks special rule.`,
    "Moonfire Shot": `Shooting attacks made with Moonfire Shot have the Flaming Attacks and Magical Attacks special rules.`,
    "Starfire Shafts": `Shooting attacks made with Starfire Shafts have the Magical Attacks special rule and force enemies to re-roll successful Panic tests caused by Heavy Casualties.`,
    "Swiftshiver Shards": `Shooting attacks made with Swiftshiver Shards allow the model to fire Multiple Shots even when moving (longbows) or marching (shortbows) that turn.`,
    "Trueflight Arrows": `Shooting attacks made with Trueflight Arrows ignore all shooting modifiers that are not caused by magic items or spells.`,

    /* ---- Unit-specific special rules & upgrades ---- */
    "Fortress of Boughs": `A unit where the majority of the models have this special rule counts as fighting behind a defended obstacle.`,
    "Guardians of the Wildwood": `If a model with this special rule is in base contact with at least one enemy model with either the Fear or Terror special rule, it gains +1 Attack.`,
    "Animal Form": `At the start of each round of close combat (before Impact Hits), the model may choose one Animal Form; all models in the unit must choose the same one, lasting until the end of the turn. Bear: +1 Strength. Boar: +1 Toughness. Wolf: +1 Attack and Armour Piercing (1). Stag: Impact Hits (1) with Mighty Blow (1). Cannot choose the same Animal Form in two consecutive rounds.`,
    "Spirit-walk": `Instead of moving normally, the unit can walk the spirit paths during the Remaining Moves sub-phase. Remove it from play and set it up so that the centre of the unit is within any wood on the table.`,
    "Unbridled Malice": `Spite Revenants' Hatred applies in all rounds of close combat, not just the first. In addition, enemy units in base contact must re-roll successful Leadership tests. This has no effect on units with Immunity (Psychology).`,
    "Master of the Vengeful Forest": `If a Zoat is wholly within a forest, all enemy models treat that forest as Dangerous Terrain and will fail their Dangerous Terrain tests on a roll of a 1 or 2.`,
    "The Power of the Deepwoods": `If a Zoat is wholly within a forest, it gets a +2 casting bonus.`,
    "Soporific Breath": `A Forest Dragon has a Strength 2 Breath Weapon. Armour saves against Wounds caused by Soporific Breath suffer a -3 penalty. All models in a unit that suffers one or more hits from it gain the Stupidity special rule for the remainder of the game.`,
    "Larval Shafts": `If a model with this special rule rolls a natural 6 To Hit with their bows, that Attack automatically Wounds with the Multiple Wounds (D3) special rule.`,
    "Zephyrspites": `After a unit where the majority of the models with this special rule has resolved all their missile attacks and is within 6" of an enemy unit, they may move directly backwards D6", keeping the same unit facing.`,
    "Deepwood Coven": `The unit receives an additional +1 casting bonus for every 5 models in the unit with this special rule. Nominate one Sister as caster/target for line of sight and range. On a miscast, do not roll on the Miscast table; instead the unit suffers D3 Wounds with no saves of any kind allowed.`,
    "Call to Battle": `All friendly units with the Forest Spirit special rule within 6" of the Arch-Revenant are subject to the Frenzy special rule as long as they remain within range, and do not lose Frenzy even if losing combat.`,
    "Song of Athel Loren": `Friendly models within 12" of one or more Warsong Revenants gain +1 to their Leadership. Enemy models within 12" of one or more Warsong Revenants suffer -1 to their Leadership.`,
    "Regenesis": `All friendly units of Forest Spirits within 6" of a Grove Guardian gain the Regeneration (6+) special rule.`,
    "Soulshriek": `Each time a model with the Forest Spirit special rule is removed as a casualty in close combat within 12" of a Grove Guardian, roll a D6. On a 5+, the enemy model that struck the blow suffers one Wound which Ignores Armour Saves.`,
    "Strangleroots": `A shooting attack. Treelord Ancient: Range 6/12", Strength 5, Multiple Shots (D6+1), Quick Shot, Rapid Fire. Treelord: Range 12", Strength 5, Multiple Shots (D6+1), Quick Shot, Rapid Fire.`,
    "Traps": `A Waywatcher unit that is within a forest is automatically assumed to set traps around its positions. Any enemy charging the unit through the forest will activate the traps as soon as the enemy unit touches the forest. If the chargers are already inside the forest when the charge is declared the traps are activated as soon as the charge is declared. Roll a D6 to determine the type and effect of the trap: 1-2 Spikes: The enemy unit suffers D6 Strength 3 hits. 3 Snares: The enemy unit deducts D3" from the charge distance. 4 Nets: D3 models in the enemy unit suffer -1 Attacks. 5 Camouflaged Pit: The enemy unit counts as moving through Dangerous Terrain. If the unit would already treat the forest as Dangerous Terrain, they instead fail the test on a 1-2. 6 Impaler: Treat the unit as being hit by a bolt thrower in the front rank. The file it hits is determined by the Wood Elf player.`,
    "Swiftsense": `The model gains the Always Strikes First special rule in any turn that they charge.`,
    "Shredding Talons": `The model gains the Armour Piercing (1) special rule.`,
    "Impale": `A Unicorn gains the Mighty Blow (1) special rule in any turn that it charges.`,
    "Elven shortbow": `16/24", Strength 3, Armour Piercing (1), March & Shoot, Multiple Shots (2)*, Volley Fire. *Only applies in turns the model has not marched. Cannot be used as a charge reaction.`,
    "Elven longbow": `24/36", Strength 3, Armour Piercing (1), Multiple Shots (2)*, Volley Fire. *Only applies in turns the model has not moved. Cannot be used as a charge reaction.`,

    /* ---- Special-character rules ---- */
    "The Wild Hunt": `Orion must be the Army General. In addition, Wild Riders count as Core Units instead of Special Units. An army led by Orion must include at least one unit of Wild Riders.`,
    "Orion's Equerries": `The Hounds of Orion are War Beasts (Canine, Forest Spirit) with the Frenzy, Forest Spirit and Unbreakable special rules. They must be deployed as a unit with Orion; Orion cannot leave this unit or join others.`,
    "Aura of the Fey Queen": `All friendly units within 6" of Ariel have the Immunity (Panic) special rule.`,
    "Earthbind": `Any units declaring a charge on Ariel count as moving through Dangerous Terrain for the turn. If Ariel flees combat, pursuers roll an extra D6 and discard the highest.`,
    "Screech": `Ariel may use Screech when it would be her time to attack in close combat: it automatically Hits all enemy models in base contact at Strength 4 with the Ignores Armour special rule.`,
    "Conjoined Destiny": `Naestra and Arahan count as a single model for all purposes. If they have been reduced to less than 4 Wounds at the end of any turn, they are restored to 4 Wounds.`,
    "Impetuous": `If Ceithin-Har can declare a Charge during the Charge sub-phase, he must do so unless he passes a Leadership test.`,
    "Hunter's Mount": `When mounted on Gwindalor, Naestra and Arahan re-roll all failed To Hit rolls when making shooting attacks.`,
    "Sisters of Twilight": `Naestra's close combat attacks receive +1 To Wound against models from the Forces of Destruction. Arahan's receive +1 To Wound against models from the Forces of Order.`,
    "Boldest of the Bold": `Whilst Araloth is a lone character, he has the Unbreakable special rule.`,
    "Guardians of Talsyn": `If Araloth is included, you may upgrade one unit of Eternal Guard to the Guardians of Talsyn for +1 point per model. This unit has +1 Attack.`,
    "Skaryn the Eye Thief": `Range 24", Strength 3, Sniper. Rather than rolling to Hit with Ballistic Skill, the target must pass a Weapon Skill test to avoid being Hit. If the Wound is unsaved and the To Wound roll was a 6, the model suffers -5 to Weapon Skill, Ballistic Skill and Initiative (min 1) for the rest of the game (once only).`,
    "Othu the Owl": `Othu may settle on any Wood Elf unit with a Standard Bearer at the start of the shooting phase; that unit may re-roll To Hit rolls of 1 with missile attacks this turn. Never settles on the same unit twice in succession. Othu cannot be harmed, but flies away if Naieth is removed.`,
    "Choose Opponent": `In close combat, Wychwethyl can choose to attack any enemy model in the enemy unit (excluding Challenges), not just the models in base contact with him.`,
    "Dance of Doom": `Wychwethyl can use the Dance of Doom instead of his normal Shadow Dances. If he does, he gains +1 Attack for every enemy model in base contact with him.`,
    "Falcons": `Range 24", Strength 3, Multiple Shots (3); rather than rolling to Hit using Ballistic Skill, the target must pass a Weapon Skill test to avoid being Hit. In close combat the falcons give Skaw an additional 3 Attacks resolved at Weapon Skill 4, Strength 3 and Initiative 4; these do not benefit from any special rules or items Skaw might have.`,
    "Beastmaster": `Fang and Claw are War Beasts (Canine) and Gruarth is their Handler. If Gruarth is slain, Fang and Claw become subject to Frenzy. If both Fang and Claw are slain, Gruarth becomes subject to Hatred.`,
    "Mixed Unit": `A unit made of models with differing profiles; allocate hits and Wounds according to the Mixed Unit rules.`,
    "Unburden of Thieflings": `A close combat attack used in addition to Durthu's other attacks: Combat range, Strength 2, Magical Attacks, Poisoned Attacks, Random Attacks (D6). Enemy units that suffer Wounds also suffer -1 To Hit and To Wound and -1 to armour saves until the start of your next turn.`,
    "Writhing Vines": `At the start of each round of close combat, the Lady of Vines chooses one: Protective Barrier (enemies targeting her or her unit suffer -1 To Hit this round) or Ensnare Foes (she and her unit gain +1 To Hit this round).`,
    "Eternal Rage": `Drycha has the Hatred special rule which applies in every round of close combat, not just the first.`,
    "Fanatical Resolve": `If Drycha is reduced to 1 Wound, she gains Frenzy. She loses it automatically if healed back to her starting number of Wounds.`,
    "Roused to Wrath": `Choose up to D3 units with the Forest Spirit special rule to deploy as Ambushers; when they enter, place them wholly within a forest at least 1" from other units/impassable terrain. Requires forests on the battlefield when deploying.`
  },

  unitInfo: {
    /* ---- Character mounts ---- */
    mount_elvensteed:{profile:[["Elven Steed",9,3,0,3,3,1,4,1,5]],eq:"—",rules:"—"},
    mount_steedofkurnous:{profile:[["Steed of Kurnous",9,3,0,4,3,1,4,1,5]],eq:"—",rules:"—"},
    mount_unicorn:{profile:[["Unicorn",10,5,0,4,4,2,5,2,8]],eq:"—",rules:"Forest Strider, Magical Attacks, Magic Resistance (2), Impale."},
    mount_warhawk:{profile:[["Warhawk",2,4,0,4,3,2,5,2,5]],eq:"—",rules:"Fly (10)."},
    mount_greatstag:{profile:[["Great Stag",9,5,0,5,4,3,4,2,7]],eq:"—",rules:"Forest Strider, Impact Hits (D3)."},
    mount_greateagle:{profile:[["Great Eagle",2,5,0,4,4,3,4,3,8]],eq:"—",rules:"Fly (9)."},
    mount_meadowchariot:{profile:[["Meadow Chariot",8,"-","-",5,4,4,"-","-","-"],["Charioteer","-",5,4,3,"-","-",5,1,9],["Elven Steed","-",3,0,3,"-","-",4,1,"-"]],eq:"Light lance, Elven shortbow. Crew of 2, drawn by 2 Elven Steeds.",rules:"Asrai Archery, Elven Grace. Chariot (Armour Save 6+)."},
    mount_forestdragon:{profile:[["Forest Dragon",6,6,0,6,6,6,3,5,8]],eq:"—",rules:"Fly (7), Forest Spirit, Natural Armour (3+), Soporific Breath."},

    /* ---- Characters ---- */
    highborns:{profile:[["Glade Lord",5,7,7,4,3,3,8,4,10],["Glade Captain",5,6,6,4,3,2,7,3,9]],eq:"Hand weapon",rules:"Asrai Archery, Elven Grace, Forest Strider. One Glade Captain may be the Battle Standard Bearer."},
    spellsingers:{profile:[["Spellweaver",5,5,4,3,3,3,6,2,9],["Spellsinger",5,4,4,3,3,2,5,1,8]],eq:"Hand weapon",rules:"Blessings of the Ancients, Elven Grace, Forest Strider. Wizard: Spellsinger L1 / Spellweaver L3 — Athel Loren, Beasts, Heavens, Light, Life, Shadow."},
    shadowdancer:{profile:[["Shadowdancer",5,8,6,4,3,2,8,4,8]],eq:"Hand weapon",rules:"Blessings of the Ancients, Elven Grace, Forest Strider, Magical Ward (6+), Magic Resistance (1), Shadow Dances of Loec. May be a Level 1 Wizard using the Lore of Shadow."},
    wildhunter:{profile:[["Wild Hunter",5,6,6,4,3,2,7,3,9],["Elven Steed",9,3,0,3,3,1,4,1,5]],eq:"Light lance",rules:"Devastating Charge, Elven Grace, Forest Spirit, Frenzy. Cavalry."},
    waystalker:{profile:[["Waystalker",5,6,7,4,3,2,7,2,8]],eq:"Hand weapon, Elven shortbow",rules:"Asrai Archery, Elven Grace, Forest Strider, Forest Stalker, Lethal Shot, Scouts, Sniper."},
    archrevenant:{profile:[["Arch-Revenant",5,7,7,4,3,3,8,4,10]],eq:"Polearm, shield",rules:"Fly (10), Forest Spirit, Natural Armour (6+), Call to Battle."},
    warsongrevenant:{profile:[["Warsong Revenant",5,4,4,3,3,3,5,1,9]],eq:"Hand weapon",rules:"Blessings of the Ancients, Fly (5), Forest Spirit, Regeneration (5+), Natural Armour (6+), Song of Athel Loren. Level 3 Wizard — Athel Loren or Life."},
    treelordancient:{profile:[["Treelord Ancient",5,4,4,6,6,6,2,3,10]],eq:"Hand weapon",rules:"Blessings of the Ancients, Flammable, Forest Spirit, Natural Armour (3+), Stubborn, Tree Whack. Level 1 Wizard — Athel Loren or Life."},
    groveguardian:{profile:[["Grove Guardian",5,6,6,4,4,3,7,4,9]],eq:"Great weapon",rules:"Flammable, Forest Spirit, Hatred, Natural Armour (6+), Regenesis, Soulshriek."},
    branchwraith:{profile:[["Branchwraith",5,6,6,4,4,2,7,4,9]],eq:"Hand weapon",rules:"Blessings of the Ancients, Flammable, Forest Spirit, Hatred, Natural Armour (6+), Tree Aspects. May be a Level 1 Wizard — Athel Loren or Life."},

    /* ---- Core ---- */
    gladeguard:{profile:[["Glade Guard",5,4,4,3,3,1,5,1,8]],eq:"Spear, shield",rules:"Elven Grace, Forest Strider."},
    gladearchers:{profile:[["Glade Archer",5,4,4,3,3,1,5,1,8]],eq:"Hand weapon, Elven longbow",rules:"Asrai Archery, Elven Grace, Forest Strider."},
    deepwoodscouts:{profile:[["Deepwood Scout",5,4,4,3,3,1,5,1,8]],eq:"Hand weapon, Elven shortbow",rules:"Asrai Archery, Elven Grace, Forest Strider, Scouts, Skirmishers."},
    gladeriders:{profile:[["Glade Rider",5,4,4,3,3,1,5,1,8],["Elven Steed",9,3,0,3,3,1,4,1,5]],eq:"Hand weapon",rules:"Asrai Archery, Elven Grace, Fast Cavalry, Forest Strider."},
    dryads:{profile:[["Dryad",5,4,4,3,3,1,5,2,8]],eq:"—",rules:"Flammable, Forest Spirit, Hatred, Natural Armour (6+), Tree Aspects."},
    spiteswarms:{profile:[["Spite Swarm",5,3,0,2,2,6,4,6,6]],eq:"—",rules:"Forest Spirit."},

    /* ---- Special ---- */
    eternalguard:{profile:[["Eternal Guard",5,5,4,3,3,1,5,1,9]],eq:"Saearath, light armour",rules:"Elven Grace, Forest Strider, Stubborn, Fortress of Boughs."},
    wildwoodrangers:{profile:[["Wildwood Ranger",5,5,4,4,3,1,5,1,9]],eq:"Great weapon, light armour",rules:"Elven Grace, Forest Strider, Immunity (Psychology), Guardians of the Wildwood."},
    wardancers:{profile:[["Wardancer",5,6,4,3,3,1,6,2,8]],eq:"Hand weapon",rules:"Elven Grace, Forest Strider, Magical Ward (6+), Magic Resistance (1), Shadow Dances of Loec, Skirmishers."},
    alters:{profile:[["Alter",8,4,4,3,3,1,6,2,8]],eq:"—",rules:"Ambushers, Elven Grace, Fear, Forest Strider, Skirmishers, Swiftstride, Animal Form."},
    wildriders:{profile:[["Wild Rider",5,5,4,4,3,1,5,1,9],["Elven Steed",9,3,0,3,3,1,4,1,5],["Steed of Kurnous",9,3,0,4,3,1,4,1,5]],eq:"Light lance",rules:"Devastating Charge, Elven Grace, Fast Cavalry, Forest Spirit, Frenzy."},
    warhawkriders:{profile:[["Warhawk Rider",5,4,4,3,3,1,5,1,8],["Warhawk",2,4,0,4,3,2,5,2,5]],eq:"Light lance, Elven shortbow",rules:"Asrai Archery, Elven Grace, Fast Cavalry, Fly (10)."},
    meadowchariot:{profile:[["Meadow Chariot",8,"-","-",5,4,4,"-","-","-"],["Charioteer","-",5,4,3,"-","-",5,1,9],["Elven Steed","-",3,0,3,"-","-",4,1,"-"]],eq:"Light lance, Elven shortbow. Crew of 2 Charioteers, drawn by 2 Elven Steeds.",rules:"Asrai Archery, Elven Grace. Chariot (Armour Save 6+)."},
    treerevenants:{profile:[["Tree Revenant",5,5,4,4,3,1,5,2,8]],eq:"Hand weapon",rules:"Forest Spirit, Martial Memories, Natural Armour (6+), Spirit-walk."},
    spiterevenants:{profile:[["Spite Revenant",5,4,4,4,3,1,5,2,8]],eq:"—",rules:"Forest Spirit, Hatred, Natural Armour (6+), Scouts, Skirmishers, Unbridled Malice."},
    treekin:{profile:[["Tree Kin",5,4,4,4,4,3,3,3,8]],eq:"—",rules:"Flammable, Forest Spirit, Natural Armour (4+), Stubborn."},
    treeman:{profile:[["Treeman",5,5,0,5,5,4,2,4,9]],eq:"—",rules:"Flammable, Forest Spirit, Natural Armour (3+), Stubborn, Tree Whack."},

    /* ---- Rare ---- */
    waywatchers:{profile:[["Waywatcher",5,4,5,3,3,1,5,1,8]],eq:"Hand weapon, Elven shortbow",rules:"Asrai Archery, Elven Grace, Forest Strider, Forest Stalker, Lethal Shot, Scouts, Skirmishers."},
    sistersofthorn:{profile:[["Sister of the Thorn",5,4,5,3,3,1,5,1,8],["Steed of Isha",9,3,0,4,3,1,4,1,5]],eq:"Hand weapon, javelins, light armour",rules:"Asrai Archery, Blessings of the Ancients, Elven Grace, Fast Cavalry, Forest Strider, Magical Ward (4+), Poisoned Attacks, Deepwood Coven. Level 1 Wizard — Athel Loren, Beasts or Life."},
    greatstagknights:{profile:[["Wild Rider",5,5,4,4,3,1,5,1,9],["Great Stag",9,5,0,5,4,3,4,2,7]],eq:"Light lance",rules:"Devastating Charge, Elven Grace, Forest Spirit, Forest Strider, Frenzy, Impact Hits (D3)."},
    greateagle:{profile:[["Great Eagle",2,5,0,4,4,3,4,3,8]],eq:"—",rules:"Fly (9)."},
    gossamidarchers:{profile:[["Gossamid Archer",5,5,4,4,3,1,5,2,8]],eq:"Hand weapon, Elven longbow",rules:"Fly (10), Forest Spirit, Martial Memories, Natural Armour (6+), Larval Shafts, Zephyrspites."},
    spiteriderrevenants:{profile:[["Spiterider Revenant",5,5,4,4,3,1,5,2,8],["Dragonspite",3,3,0,4,4,2,4,2,5]],eq:"Hand weapon, shields",rules:"Devastating Charge, Fast Cavalry, Fly (9), Forest Spirit, Martial Memories, Natural Armour (5+), Regeneration (5+)."},
    zoat:{profile:[["Zoat",8,4,3,4,5,3,4,3,8]],eq:"Great weapon",rules:"Cold-blooded, Forest Strider, Magic Resistance (1), Natural Armour (4+), Master of the Vengeful Forest, The Power of the Deepwoods. Level 1 Wizard — Life."},
    treelord:{profile:[["Treelord",5,6,6,6,6,6,2,6,9]],eq:"—",rules:"Flammable, Forest Spirit, Natural Armour (3+), Stubborn, Tree Whack."},
    forestdragon:{profile:[["Forest Dragon",6,6,0,6,6,6,3,5,8]],eq:"—",rules:"Fly (7), Forest Spirit, Natural Armour (3+), Soporific Breath."},

    /* ---- Special characters ---- */
    orion:{profile:[["Orion",9,8,8,5,5,5,9,5,10],["Hound of Orion",9,4,0,4,4,1,4,1,6]],eq:"Spear of Kurnous, Hawk's Talon, Cloak of Isha, Horn of the Wild Hunt",rules:"Asrai Archery, Elven Grace, Forest Spirit, Frenzy, Terror, Unbreakable, The Wild Hunt, Orion's Equerries. Monstrous Infantry."},
    ariel:{profile:[["Ariel",5,5,5,4,4,5,7,0,10]],eq:"The Dart of Doom, The Heartstone of Athel Loren, The Wand of Wych Elm, The Berry Wine, The Acorn of Ages",rules:"Blessings of the Ancients, Fly (9), Forest Spirit, Loremaster (Lore of Athel Loren), Magic Resistance (3), Aura of the Fey Queen, Earthbind, Screech. Level 4 Wizard — Athel Loren. Monstrous Infantry."},
    naestraarahan:{profile:[["Naestra",5,6,6,4,3,2,7,3,9],["Arahan",5,6,6,4,3,2,7,3,9],["Ceithin-Har (Forest Dragon)",6,6,0,6,6,6,3,5,8],["Gwindalor (Great Eagle)",2,5,0,4,4,4,4,3,8]],eq:"Shield; Talon of Dawn, Talon of Dusk",rules:"Asrai Archery, Elven Grace, Conjoined Destiny, Impetuous, Hunter's Mount, Sisters of Twilight."},
    araloth:{profile:[["Araloth",5,8,7,4,3,3,8,5,10]],eq:"Light armour, shield; Spear of Talsyn",rules:"Elven Grace, Forest Strider, Magical Ward (5+), Boldest of the Bold, Guardians of Talsyn, Skaryn the Eye Thief."},
    scarloc:{profile:[["Scarloc",5,6,6,4,3,2,7,3,8]],eq:"Elven longbow; Runesword of Darkwood",rules:"Asrai Archery, Elven Grace, Forest Strider, Scouts."},
    naieth:{profile:[["Naieth",5,4,4,3,3,2,5,1,8]],eq:"Hand weapon; The Rod of Divination",rules:"Blessings of the Ancients, Elven Grace, Forest Strider, Othu the Owl. Level 2 Wizard — Heavens."},
    wychwethyl:{profile:[["Wychwethyl",5,8,6,4,3,2,8,4,8]],eq:"Hand weapon; The Drum of Orcskin",rules:"Elven Grace, Forest Strider, Magical Ward (6+), Magic Resistance (1), Shadow Dances of Loec, Choose Opponent, Dance of Doom."},
    skaw:{profile:[["Skaw",5,5,5,4,3,2,6,2,8]],eq:"Hand weapon; The Lash of Claws, The Cape of Feathers",rules:"Elven Grace, Forest Strider, Falcons."},
    gruarth:{profile:[["Gruarth",8,5,5,4,3,2,6,2,8],["Fang",9,4,0,4,4,2,4,2,5],["Claw",9,4,0,4,4,2,4,2,5]],eq:"Hand weapon; The Binding Bolas",rules:"Animal Form (Gruarth only), Elven Grace (Gruarth only), Forest Strider, Mixed Unit, Natural Armour (6+), Skirmishers, Beastmaster."},
    durthu:{profile:[["Durthu",5,6,6,6,6,6,2,5,10]],eq:"Sword of Daith",rules:"Blessings of the Ancients, Flammable, Forest Spirit, Frenzy, Hatred, Natural Armour (3+), Strangleroots, Stubborn, Tree Whack, Unburden of Thieflings. Level 1 Wizard — Beasts. Monster."},
    belthanos:{profile:[["Belthanos",5,7,6,5,5,4,7,5,9],["Carnelian Greatspite",6,3,0,5,5,5,3,4,7]],eq:"Polearm; Mantle of Leaves, War-horn of Kurnous",rules:"Flammable, Fly (7), Forest Spirit, Natural Armour (3+). Monster."},
    ladyofvines:{profile:[["The Lady of Vines",5,7,6,5,5,5,7,5,9]],eq:"Kurnotheal's Wrath; Verdian Crown",rules:"Blessings of the Ancients, Flammable, Forest Spirit, Natural Armour (5+), Writhing Vines. Level 2 Wizard — Athel Loren. Monstrous Creature."},
    drycha:{profile:[["Drycha",5,7,6,4,4,3,7,4,9]],eq:"—",rules:"Blessings of the Ancients, Flammable, Forest Spirit, Natural Armour (6+), Spirit-walk, Tree Aspects, Eternal Rage, Fanatical Resolve, Roused to Wrath. Level 2 Wizard — Athel Loren, Life or Shadow."}
  },

  itemDesc: {
    // -- Magic Weapons --
    "The Spirit Sword":`Armour saves cannot be taken against Wounds caused by the Spirit Sword. When an enemy single model unit or Character suffers one or more unsaved Wounds from the Spirit Sword, both they and the wielder roll 2D6 and add their Leadership. If the wounded model's total is higher or the same, nothing else happens. If it is lower, it suffers a Wound which Ignores Armour Saves for each point by which its total was exceeded.`,
    "Daith's Reaper":`All failed To Hit and To Wound rolls with Daith's Reaper must be re-rolled, as must all successful armour saves taken against Wounds caused by this weapon.`,
    "Dawnspear":`Light lance/spear. If the wielder causes an unsaved wound on an enemy, all enemy models in that unit that have not yet attacked suffer -1 To Hit this round of close combat.`,
    "Callach's Claw":`Any unit suffering one or more unsaved wounds from Callach's Claw suffers a -2 penalty to its Leadership for the remainder of the Combat phase.`,
    "The Hunter's Talon":`Elven longbow. The Hunter's Talon gives the wielder the Sniper special rule.`,
    "Spear of Daith":`Light lance/spear. Gives the wielder the Parry (5+) special rule.`,
    "The Bow of Loren":`Elven longbow. All shots resolve at Strength 4 with Multiple Shots (A) — a number of shots equal to the wielder's Attacks. Cannot fire enchanted arrows.`,
    "Blades of Loec":`Shadowdancer only. Two hand weapons. Allow the wielder to re-roll failed rolls To Wound.`,
    "Greenwood Gladius":`The wielder gains +D3 Attacks, rolled at the start of each round of close combat.`,
    "Hunt Master's Pride":`Wild Hunter only. Light lance. All attacks with this weapon have the Multiple Wounds (D3) special rule.`,
    "Spear of Twilight":`Light lance/spear. Gives the wielder the Killing Blow special rule.`,
    "Sword of a Thousand Winters":`Gives the bearer the Ice Attacks special rule. Characters and Monsters must take a Toughness test for each unsaved wound; for every test failed they suffer -1 Strength, Initiative and Attacks for the rest of the game.`,
    "Vaul's Wrath":`Elven longbow: Range 24/36", Strength 4, Armour Piercing (1), Multiple Shots (2), Multiple Wounds (2), Volley Fire.`,
    "Spear of the Hunt":`Wild Hunter only. Light lance. Gives the wielder Armour Piercing (1). In addition, they and any unit they are with may re-roll 1's for their charge distance.`,
    "Splinterbirch Blade":`Whenever an enemy model makes a successful save against Wounds caused by this blade, they suffer an additional D6 Strength 1 Hits.`,
    "Starcaster Longbow":`Elven longbow. All shots have Multiple Wounds (D3). On a To Wound roll of a natural 6, that shot has Multiple Wounds (D6) instead.`,
    "Asyendi's Bane":`Elven longbow. Allows the wielder to re-roll all failed rolls To Hit; however, if the shot still misses after the re-roll, they suffer a Strength 3 hit.`,
    "Rageth's Wildfire Blades":`Two hand weapons. Give the wielder the Flaming Attacks special rule.`,
    // -- Magic Armour --
    "Armour of the Fey":`Light armour. Gives the bearer the Magical Ward (4+) special rule against Magical Attacks.`,
    "The Oaken Armour":`Light armour. Gives the wearer the Regeneration (4+) special rule.`,
    "Cloak of Tumbling Leaves":`Model on foot only. Light armour. The bearer gains the Fly (10) special rule.`,
    "Briarsheath":`Model on foot only. Light armour. Missile attacks targeted at the wearer suffer -1 To Hit, or -2 To Hit if the wearer is in a forest.`,
    "The Helm of the Hunt":`Wild Hunter only. Gives the wearer a 6+ armour save and lets them re-roll To Hit in turns that they successfully charge into combat.`,
    "Railarian's Mantle":`Light armour. Gives the wearer a Magical Ward (5+) if they are within 6" of a forest.`,
    "Amber Armour":`Light armour. The bearer's armour save can never be reduced below a 6+.`,
    // -- Talismans --
    "Rhymer's Harp":`Gives the bearer and any unit they join the Magical Ward (5+) and Strider special rules.`,
    "Glamourweave Brooch":`Gives the bearer the Magical Ward (4+) special rule against missile attacks. In addition, any model attempting to strike the bearer in close combat must first pass a Leadership test or require 6's To Hit the bearer during that Combat phase.`,
    "Amaranthine Brooch":`Gives the wearer the Magical Ward (4+) special rule against non-Magical Attacks.`,
    "Stone of the Crystal Mere":`Gives the bearer the Magical Ward (3+) special rule. However, if this Ward Save is ever failed, the Magical Ward is lost for the rest of the game.`,
    "Amber Pendant":`Causes all enemy units in base contact with the wearer to be subject to the Always Strikes Last special rule.`,
    "Fimbulwinter Shard":`Enemies attacking the bearer in close combat suffer -1 To Hit. However, all models with the Forest Spirit special rule (including the bearer) suffer Stupidity while the bearer is within 6".`,
    "Talisman of Qwarr":`Models targeting the bearer with missile attacks must re-roll successful rolls To Hit.`,
    "Stone of Rebirth":`One use only. If the bearer is killed, roll a D6. On a 2+ the model is brought back to life with one Wound remaining. No effect if killed as a result of being pursued down.`,
    "Merciw's Locus":`The bearer and any model attacking them lose all Strength bonuses from any weapon they might carry.`,
    "Deepmire Cloak":`Model on foot only. If the wearer is in cover and at their starting Wounds, enemy missile attacks suffer -1 To Hit. If in cover and has suffered one or more Wounds, they cannot be targeted by missile attacks at all.`,
    // -- Arcane Items (must open with Relic./Charm./Staff.) --
    "Orb of Midsummer":`Relic. The bearer may re-roll failed casting attempts, unless a Miscast has been rolled.`,
    "Ranu's Heartstone":`Relic. Once per Magic phase, the bearer may re-roll one of the dice when casting or dispelling a spell. This can be used to prevent a miscast or to cause Ultimate Power.`,
    "Vesperal Gem":`Charm. One use only. At the start of your Magic phase, the Wizard may automatically cast any one of their spells from the Lore of Athel Loren without using any power dice; it cannot be dispelled. Then roll a D6 — on a 1 the bearer suffers 1 Wound with no saves.`,
    "Oaken Stave":`Staff. The bearer may roll an extra D6 when dispelling and discard the lowest result.`,
    "Viridescent Shawl":`Relic. Gives the bearer a +1 casting bonus. In addition, all enemy missile attacks targeting the bearer suffer -1 To Hit.`,
    "Divination Orb":`Relic. If an opponent uses more than three power dice (from any source) when casting any spell, the bearer may add an extra free Dispel dice into the attempt to dispel that spell.`,
    "Deepwood Sphere":`Relic. Any enemy unit that enters a forest within 18" of the bearer suffers D6 Strength 4 Hits as soon as it has finished its move. It continues to suffer D6 Strength 4 Hits at the start of any of its Movement phases for as long as it remains in the forest and the bearer remains within range.`,
    "Silverwood Circlet":`Relic. The bearer adds +12" to the range of all their spells (excluding auras).`,
    "Elf Charm":`Relic. When casting spells from the Lore of Life, the wizard may add a +D3 casting bonus once per Magic phase.`,
    "Calaingor's Stave":`Staff. When casting the Tree Singing spell, the bearer may re-roll the distance the forest moves.`,
    "Heartwood Pendant":`Relic. The bearer may choose their spells from the Lore of Athel Loren in addition to one other spell lore.`,
    "Warsong Stave":`Staff. The bearer knows the Tree Singing spell in addition to their other spells.`,
    "Wending Wand":`Staff. Any friendly unit that pursued off the table can enter from any point of any table edge in their next turn, as long as it is within 24" of the bearer.`,
    "Sigil of the Mage Queen":`Charm. One use only. May be used after making a casting roll; when used, it adds a +3 casting bonus.`,
    // -- Enchanted Items --
    "Crown of Fell Bowers":`The wearer and any unit they are with gain +1 To Wound in close combat.`,
    "Wardroth Horn":`One use only. At the start of any close combat phase, all friendly units (excluding mounts) within 12" gain +1 Attack for the duration of this turn.`,
    "Moonstone of the Hidden Ways":`If the bearer's unit is wholly within a forest at the end of your Movement phase and not in close combat, it can forestwalk — remove it and replace it wholly within any forest on the battlefield (counts as having marched).`,
    "Hail of Doom Arrow":`One use only. Model with Elven longbow only. Used instead of a Shooting attack with the bearer's Elven longbow (not with Sniper); declare before any dice are rolled: Range 24/36", Strength 4, Multiple Shots (3D6).`,
    "Forget-Me-Knot":`One use only. Used against one enemy model in base contact at the start of any round of close combat; for that round the target may not Attack or Stomp.`,
    "Horn of the Asrai":`One use only. At the beginning of any enemy Movement phase, all enemies able to declare a charge against the bearer must take a Psychology test; if they fail, they must declare a charge against the bearer this turn.`,
    "Waystalker's Cloak":`Gives the wearer the Forest Stalker and Scouts special rules.`,
    "Wraithstone":`All enemy units within 6" of the bearer suffer a -1 penalty to their Leadership.`,
    "Elynett's Brooch":`Allows the wearer and any unit they are with to re-roll failed Psychology tests.`,
    "Wailing Arrows":`Enchanted Arrows. Any unit that suffers an unsaved wound from these arrows must make a Panic test.`,
    "Arrows of Potency":`Enchanted Arrows. Any shots made with the Arrows of Potency have the Multiple Wounds (2) special rule.`,
    "Blight-Tipped Arrows":`Enchanted Arrows. Any Character, Monstrous Creature or Monster that suffers an unsaved Wound from these arrows must pass a Toughness test at the start of each turn for the rest of the game or suffer an additional Wound which Ignores Armour Saves.`,
    "Crown of Antlers":`The bearer gains the Impact Hits (D3) special rule; the Impact Hits are Armour Piercing (1).`,
    "Orion's Favour":`One use only. The bearer can re-roll any failed rolls To Hit and/or To Wound made during either the Shooting or Close Combat phase.`,
    "Gwytherc's Horn":`All friendly units within 12" of the bearer gain +1 to their Leadership when attempting to Rally.`,
    "Dragontooth Arrows":`Enchanted Arrows. Any Character, Monstrous Creature or Monster that suffers an unsaved Wound from these arrows gains the Stupidity special rule for the rest of the game.`,
    // -- Magic Standards --
    "Battle Standard of Athel Loren":`Whenever an enemy spell is cast at a friendly unit within 12" of this standard, roll a D6; on a 5+, the spell is automatically dispelled.`,
    "Banner of the Wildwood":`All enemy units with Line of Sight to this banner suffer -1 to their Leadership.`,
    "Banner of the Eternal Queen":`The unit carrying this standard has Magic Resistance (3). In addition, it gains +1 combat resolution if it is within 6" of a forest.`,
    "Banner of the Hunter King":`Wild Riders only. The unit adds +D6" to their charge range.`,
    "Gaemrath, the Banner of Midwinter":`One use only. At the start of any close combat phase, until the start of your next Movement phase the unit may not move and gains the Unbreakable special rule.`,
    "Faoghir, the Banner of Dwindling":`Enemies that attempt to charge or flee from the unit carrying this banner roll one dice fewer than normal to determine their charge/flee distance.`,
    "Saemrath, the Banner of Zenith":`Enemy units within 12" of the unit carrying this banner at the start of their Movement phase may not March.`,
    "Standard of Morning's Chill":`All missile attacks targeting the unit carrying this standard suffer -1 To Hit.`,
    "Tapestry of Talsyn":`The unit carrying this standard gains the Hold Your Ground (6) special rule.`,
    "Banner of the Wild Hunt":`Wild Riders only. The unit gains +1 Combat Resolution and may re-roll failed pursuit rolls.`,
    "Aech, the Banner of Springtide":`The unit gains the Quick Shot special rule and may fire Multiple Shots with their bows when choosing Stand & Shoot as a charge reaction.`,
    "Banner of Midsummer's Eve":`The unit ignores To Hit penalties for shooting at enemies in cover.`,
    // -- Forest Spites --
    "A Blight of Terrors":`A character with a Blight of Terrors gains the Terror special rule.`,
    "A Cluster of Radiants":`Forest Spirit only. A character with a Cluster of Radiants adds one extra dice to their Dispel pool in their opponent's Magic phase.`,
    "An Annoyance of Netlings":`Any enemy attempting to strike a character with an Annoyance of Netlings in close combat suffers -1 To Hit.`,
    "A Muster of Malevolents":`A shooting attack used in addition to the model's other shooting attacks (not with Sniper): Range 6/12", Strength 2, Magical Attacks, Multiple Shots (D6), Poisoned Attacks, Quick Shot, Rapid Fire.`,
    "Hagbane Spite":`One use only. Used after an enemy Wizard successfully casts a spell within 24", instead of dispelling it: the enemy Wizard automatically suffers D3 Hits that Wound on a 4+ with the Ignores Armour Saves special rule.`,
    "A Pageant of Shrikes":`A shooting attack used in addition to the model's other shooting attacks: Range 12/18", Strength 4, Cumbersome, Magical Attacks, Sniper.`,
    "A Befuddlement of Mischiefs":`Bound Spell (Level 2, cast on 7+). A hex spell with a range of 18": the target becomes subject to Stupidity until the start of your next Magic phase.`,
    "A Lamentation of Despairs":`Bound Spell (Level 2, cast on 7+). A direct damage spell, range 12", targeting enemy Characters or Monsters even within a unit: the target must pass a Leadership test or suffer D3 Wounds which Ignores Armour Saves.`,
    "A Resplendence of Luminescents":`Gives the character and any unit they join Magical Attacks.`,
    "A Murder of Spites":`A close combat attack used in addition to the model's other attacks: Combat, Strength 2, Magical Attacks, Poisoned Attacks, Random Attacks (D6).`
  },

  // Lore of Athel Loren — the Wood Elves' own lore. Standard lores come from COMMON_LORES.
  spellLores: {
    "Athel Loren": { attribute: { name:"Glamourweaving", text:`Whenever a spell from the Lore of Athel Loren is successfully cast, all enemy units suffer a -3" penalty to their spell and maximum weapon ranges in their next turn when targeting any friendly units within 6" of the Wizard. This is a cumulative effect.` }, spells: [
      { name:"Tree Singing", lvl:0, cast:6, type:"Special", range:`24"`, effect:`Targets a single forest within 24" of the caster. The target immediately moves up to D6+1" in a direction of your choice. A forest cannot move to within 1" of other terrain features.` },
      { name:"Fury of the Forest", lvl:1, cast:5, type:"Direct damage", range:`18"`, effect:`If the target is within 6" of a forest it suffers 2D6 Strength 4 hits. If partially or wholly within a forest it suffers 3D6 Strength 4 hits.` },
      { name:"Durthu's Wrath", lvl:1, cast:6, type:"Direct damage (combat)", range:`Combat`, effect:`All models in the front rank of any unit in base contact with the caster must pass an Initiative test or suffer a Strength 4 hit with the Ignores Armour Saves and Multiple Wounds (D3) special rules.` },
      { name:"The Twilight Host", lvl:1, cast:6, type:"Augment", range:`18"`, effect:`The target gains Fear until the caster's next Magic phase. In addition, it counts as having twice its Unit Strength and number of ranks for the purpose of determining Outnumber and Steadfast.` },
      { name:"The Hidden Path", lvl:2, cast:7, type:"Augment", range:`18"`, effect:`The unit gains the Ethereal special rule until the caster's next Magic phase. If the unit becomes engaged in close combat, the spell instantly ends.` },
      { name:"Spiteful Torrent", lvl:2, cast:8, type:"Magical vortex (RIP)", range:`—`, effect:`Remains in play. A magical vortex using the small round template. Any model touched by the template during its move suffers a Strength 2 hit with Armour Piercing (1).` },
      { name:"Aspect of Athel Loren", lvl:2, cast:9, type:"Augment (aura)", range:`12"`, effect:`Until the caster's next Magic phase, all affected units gain the Magical Ward (6+) special rule.` },
      { name:"Madrigal of Greening", lvl:3, cast:9, type:"Summoning", range:`18"`, effect:`Summons a forest of your choosing no more than 12" in diameter.` },
      { name:"Cage of Thorns", lvl:3, cast:10, type:"Hex (RIP)", range:`24"`, effect:`Remains in play. While in effect, the target unit halves all its Movement (rounding up) and suffers D6 Strength 3 Hits any time it moves.` },
      { name:"Sapping Blight", lvl:3, cast:10, type:"Hex (RIP)", range:`18"`, effect:`Remains in play. While in effect, the target has -1 Strength and -1 Toughness (to a minimum of 1).` },
      { name:"The Call of the Hunt", lvl:4, cast:11, type:"Conveyance", range:`18"`, effect:`The target immediately moves towards the closest enemy unit in line of sight using Random Movement (2D6) (or directly forwards if none). In addition, the unit gains +1 Attack (except mounts) until the caster's next Magic phase.` },
      { name:"Verdurous Harmony", lvl:4, cast:12, type:"Augment (aura)", range:`12"`, effect:`All targets instantly recover D3 Wounds' worth of models slain earlier in the battle, just like a summoning spell.` },
      { name:"Ariel's Blessing", lvl:4, cast:13, type:"Augment", range:`18"`, effect:`The target gains the Regeneration (4+) special rule until the caster's next Magic phase.` }
    ]}
  },

  units: {
    /* ---------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "highborns", name: "Highborns", isCharacter: true,
        access: ["additional hand weapon","spear","great weapon","light armour","shield","light lance","shortbow","longbow"],
        variants: [
          { name: "Glade Lord", points: 120, magicBudget: 100 },
          { name: "Glade Captain", points: 55, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Spear", cost: 5 }, { label: "Light lance", cost: 5 },
            { label: "Great weapon", cost: 15 } ] },
          { id: "bow", type: "choice", label: "Bow", choices: [
            { label: "Elven shortbow", cost: 6 }, { label: "Elven longbow", cost: 8 } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1 }, { label: "Moonfire Shot", cost: 1 }, { label: "Starfire Shafts", cost: 1 },
            { label: "Hagbane Tips", cost: 2 }, { label: "Swiftshiver Shards", cost: 2 }, { label: "Trueflight Arrows", cost: 2 } ] },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Elven Steed", cost: 15, key: "steed" }, { label: "Warhawk", cost: 25, key: "warhawk" },
            { label: "Great Eagle", cost: 40, key: "eagle" }, { label: "Great Stag", cost: 50, key: "greatstag" },
            { label: "Meadow Chariot", cost: 70, key: "chariot" }, { label: "Forest Dragon", cost: 325, key: "dragon" } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard Bearer (one Glade Captain only)", cost: 25, per: "flat", only: "Glade Captain", bsb: true }
        ],
        notes: "BSB may carry a Magic Standard with no points limit, in addition to any other Magic Items."
      },
      {
        id: "spellsingers", name: "Spellsingers", isCharacter: true,
        access: [],
        lores: ["Athel Loren","Beasts","Heavens","Light","Life","Shadow"],
        variants: [
          { name: "Spellweaver", points: 195, wizardLevel: 3, magicBudget: 100 },
          { name: "Spellsinger", points: 85, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Elven Steed", cost: 15 }, { label: "Warhawk", cost: 25 }, { label: "Unicorn", cost: 25 }, { label: "Great Eagle", cost: 40 } ] }
        ]
      },
      {
        id: "shadowdancer", name: "Shadowdancer", isCharacter: true,
        access: ["additional hand weapon","spear","great weapon"],
        lores: ["Shadow"], wizardIfUpgraded: true,
        variants: [ { name: "Shadowdancer", points: 100, magicBudget: 50 } ],
        options: [
          { id: "wiz", type: "toggle", label: "Upgrade to a Level 1 Wizard", cost: 35, per: "flat" },
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Saearath", cost: 5 }, { label: "Great weapon", cost: 15 } ] }
        ]
      },
      {
        id: "wildhunter", name: "Wild Hunter", isCharacter: true,
        access: ["shield","light armour","light lance"],
        variants: [ { name: "Wild Hunter", points: 110, magicBudget: 50 } ],
        options: [
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "mount", type: "choice", label: "Replace Elven Steed", choices: [
            { label: "Steed of Kurnous", cost: 5 }, { label: "Great Stag", cost: 25 } ] }
        ],
        notes: "Rides an Elven Steed by default (included in points)."
      },
      {
        id: "waystalker", name: "Waystalker", isCharacter: true,
        access: ["additional hand weapon","shortbow","longbow"],
        variants: [ { name: "Waystalker", points: 90, magicBudget: 50 } ],
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapon", cost: 3, per: "flat" },
          { id: "bow", type: "toggle", label: "Replace Elven shortbow with Elven longbow", cost: 2, per: "flat" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1 }, { label: "Moonfire Shot", cost: 1 }, { label: "Hagbane Tips", cost: 2 },
            { label: "Starfire Shafts", cost: 2 }, { label: "Swiftshiver Shards", cost: 2 }, { label: "Trueflight Arrows", cost: 2 } ] }
        ]
      },
      {
        id: "archrevenant", name: "Arch-Revenant", isCharacter: true, keyword: "forest-spirit",
        access: ["halberd","shield"],
        variants: [ { name: "Arch-Revenant", points: 160, magicBudget: 100 } ],
        options: []
      },
      {
        id: "warsongrevenant", name: "Warsong Revenant", isCharacter: true, keyword: "forest-spirit",
        access: [],
        lores: ["Athel Loren","Life"],
        variants: [ { name: "Warsong Revenant", points: 250, wizardLevel: 3, magicBudget: 100 } ],
        options: []
      },
      {
        id: "treelordancient", name: "Treelord Ancient", isCharacter: true, keyword: "forest-spirit",
        access: [],
        lores: ["Athel Loren","Life"], magicCatsOnly: ["Forest Spites"],
        variants: [ { name: "Treelord Ancient", points: 250, wizardLevel: 1, magicBudget: 100 } ],
        options: [
          { id: "wlvl", type: "toggle", label: "Upgrade to a Level 2 Wizard", cost: 35, per: "flat" },
          { id: "strangle", type: "toggle", label: "Strangleroots", cost: 10, per: "flat" }
        ],
        notes: "May take Spites (no other Magic Items)."
      },
      {
        id: "groveguardian", name: "Grove Guardian", isCharacter: true, keyword: "forest-spirit",
        access: ["great weapon"],
        magicCatsOnly: ["Forest Spites"],
        variants: [ { name: "Grove Guardian", points: 170, magicBudget: 100 } ],
        options: [],
        notes: "May take Spites (no other Magic Items)."
      },
      {
        id: "branchwraith", name: "Branchwraith", isCharacter: true, keyword: "forest-spirit",
        access: ["great weapon"],
        lores: ["Athel Loren","Life"], wizardIfUpgraded: true, magicCatsOnly: ["Forest Spites"],
        variants: [ { name: "Branchwraith", points: 85, magicBudget: 50 } ],
        options: [
          { id: "wiz", type: "toggle", label: "Upgrade to a Level 1 Wizard", cost: 35, per: "flat" },
          { id: "gw", type: "toggle", label: "Great weapon", cost: 15, per: "flat" }
        ],
        notes: "May take Spites (no other Magic Items)."
      },
      /* ---- Special characters ---- */
      { id: "orion", name: "Orion", isCharacter: true, isSpecialChar: true, mustBeGeneral: true, keyword: "forest-spirit",
      access: ["spear"],
        variants: [ { name: "Orion", points: 420, magicBudget: 0 } ],
        options: [ { id: "hounds", type: "toggle", label: "Two Hounds of Orion", cost: 20, per: "flat" } ],
        notes: "Must be the Army General. Wild Riders become Core; the army must include at least one Wild Riders unit." },
      { id: "ariel", name: "Ariel", isCharacter: true, isSpecialChar: true, keyword: "forest-spirit",
      access: [],
        lores: ["Athel Loren"],
        variants: [ { name: "Ariel", points: 380, wizardLevel: 4, magicBudget: 0 } ], options: [],
        notes: "Loremaster of the Lore of Athel Loren." },
      { id: "naestraarahan", name: "Naestra & Arahan", isCharacter: true, isSpecialChar: true,
      access: ["shield"],
        variants: [ { name: "Naestra & Arahan", points: 180, magicBudget: 0 } ],
        options: [ { id: "mount", type: "mount", label: "Mount (must choose one)", choices: [
          { label: "Gwindalor (Great Eagle)", cost: 100 }, { label: "Ceithin-Har (Forest Dragon)", cost: 320 } ] } ],
        notes: "Naestra 90 + Arahan 90; must be mounted on Gwindalor or Ceithin-Har." },
      { id: "araloth", name: "Araloth the Bold", isCharacter: true, isSpecialChar: true,
      access: ["spear","light armour","shield"],
        variants: [ { name: "Araloth", points: 185, magicBudget: 75 } ], options: [],
        notes: "If included: one Eternal Guard unit may be taken as Core, and one may be upgraded to Guardians of Talsyn (+1/model)." },
      { id: "scarloc", name: "Scarloc", isCharacter: true, isSpecialChar: true,
      access: ["longbow"],
        variants: [ { name: "Scarloc", points: 100, magicBudget: 25 } ],
        options: [ { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
          { label: "Arcane Bodkins", cost: 1 }, { label: "Moonfire Shot", cost: 1 }, { label: "Starfire Shafts", cost: 1 },
          { label: "Hagbane Tips", cost: 2 }, { label: "Swiftshiver Shards", cost: 2 }, { label: "Trueflight Arrows", cost: 2 } ] } ] },
      { id: "naieth", name: "Naieth the Prophetess", isCharacter: true, isSpecialChar: true,
      access: [],
        lores: ["Heavens"],
        variants: [ { name: "Naieth", points: 100, wizardLevel: 2, magicBudget: 0 } ], options: [] },
      { id: "wychwethyl", name: "Wychwethyl", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Wychwethyl", points: 110, magicBudget: 0 } ], options: [] },
      { id: "skaw", name: "Skaw the Falconer", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Skaw", points: 80, magicBudget: 0 } ], options: [] },
      { id: "gruarth", name: "Gruarth the Beastmaster", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Gruarth", points: 75, magicBudget: 0 } ], options: [] },
      { id: "durthu", name: "Durthu Oakheart", isCharacter: true, isSpecialChar: true, keyword: "forest-spirit",
      access: [],
        lores: ["Beasts"],
        variants: [ { name: "Durthu", points: 320, wizardLevel: 1, magicBudget: 50 } ], options: [],
        notes: "May take one Spite and/or Magic Items up to 50 points." },
      { id: "belthanos", name: "Belthanos", isCharacter: true, isSpecialChar: true, keyword: "forest-spirit",
      access: ["halberd"],
        variants: [ { name: "Belthanos", points: 400, magicBudget: 0 } ], options: [] },
      { id: "ladyofvines", name: "The Lady of Vines", isCharacter: true, isSpecialChar: true, keyword: "forest-spirit",
      access: [],
        lores: ["Athel Loren"],
        variants: [ { name: "The Lady of Vines", points: 390, wizardLevel: 2, magicBudget: 0 } ], options: [] },
      { id: "drycha", name: "Drycha", isCharacter: true, isSpecialChar: true, keyword: "forest-spirit",
      access: [],
        lores: ["Athel Loren","Life","Shadow"], magicCatsOnly: ["Forest Spites"],
        variants: [ { name: "Drycha", points: 185, wizardLevel: 2, magicBudget: 50 } ], options: [],
        notes: "May take Spites (no other Magic Items)." }
    ],

    /* ------------------------------- CORE ------------------------------- */
    core: [
      { id: "gladeguard", name: "Glade Guard", perModel: true, basePoints: 7, unitSize: [15,45],
        options: [ { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "gladearchers", name: "Glade Archers", perModel: true, basePoints: 12, unitSize: [10,30],
        options: [
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1, per: "model" }, { label: "Moonfire Shot", cost: 1, per: "model" }, { label: "Starfire Shafts", cost: 1, per: "model" },
            { label: "Hagbane Tips", cost: 2, per: "model" }, { label: "Swiftshiver Shards", cost: 2, per: "model" }, { label: "Trueflight Arrows", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "deepwoodscouts", name: "Deepwood Scouts", perModel: true, basePoints: 12, unitSize: [5,15],
        options: [
          { id: "bow", type: "toggle", label: "Replace Elven shortbows with Elven longbows", cost: 1, per: "model" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1, per: "model" }, { label: "Moonfire Shot", cost: 1, per: "model" }, { label: "Starfire Shafts", cost: 1, per: "model" },
            { label: "Hagbane Tips", cost: 2, per: "model" }, { label: "Swiftshiver Shards", cost: 2, per: "model" }, { label: "Trueflight Arrows", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ],
        notes: "You may not have more units of Deepwood Scouts than units of Glade Archers." },
      { id: "gladeriders", name: "Glade Riders", perModel: true, basePoints: 13, unitSize: [5,15],
        options: [
          { id: "lance", type: "toggle", label: "Light lances", cost: 1, per: "model" },
          { id: "bow", type: "choice", label: "Bows", choices: [
            { label: "Elven shortbows", cost: 3, per: "model" }, { label: "Elven longbows", cost: 3, per: "model" } ] },
          { id: "armour", type: "toggle", label: "Light armour", cost: 1.5, per: "model" },
          { id: "shield", type: "toggle", label: "Shields (if armed with light lances)", cost: 1, per: "model" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1, per: "model" }, { label: "Moonfire Shot", cost: 1, per: "model" }, { label: "Starfire Shafts", cost: 1, per: "model" },
            { label: "Hagbane Tips", cost: 2, per: "model" }, { label: "Swiftshiver Shards", cost: 2, per: "model" }, { label: "Trueflight Arrows", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "dryads", name: "Dryads", perModel: true, basePoints: 11, unitSize: [10,30], keyword: "forest-spirit",
        options: [
          { id: "skirm", type: "toggle", label: "Skirmishers", cost: 1, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "spiteswarms", name: "Spite Swarms", perModel: true, basePoints: 35, unitSize: [3,9], keyword: "forest-spirit", options: [] }
    ],

    /* ------------------------------ SPECIAL ----------------------------- */
    special: [
      { id: "eternalguard", name: "Eternal Guard", perModel: true, basePoints: 10, unitSize: [10,30],
        options: [
          { id: "shield", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ],
        notes: "One unit may be taken as Core for every Glade Lord (or if Araloth is included)." },
      { id: "wildwoodrangers", name: "Wildwood Rangers", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "wardancers", name: "Wardancers", perModel: true, basePoints: 13, unitSize: [5,15],
        options: [
          { id: "wep", type: "mustChoose", label: "Weapon (must choose at least one)", choices: [
            { label: "Saeraths", cost: 0.5, per: "model" }, { label: "Additional hand weapons", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "alters", name: "Alters", perModel: true, basePoints: 14, unitSize: [5,15],
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "wildriders", name: "Wild Riders", perModel: true, basePoints: 24, unitSize: [5,15], keyword: "forest-spirit",
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 1.5, per: "model" },
          { id: "shield", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "kurnous", type: "toggle", label: "Replace Elven Steeds with Steeds of Kurnous", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "warhawkriders", name: "Warhawk Riders", perModel: true, basePoints: 24, unitSize: [3,9],
        options: [
          { id: "bow", type: "toggle", label: "Replace Elven shortbows with Elven longbows", cost: 0, per: "model" },
          { id: "shield", type: "toggle", label: "Shields", cost: 2, per: "model" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1, per: "model" }, { label: "Moonfire Shot", cost: 1, per: "model" }, { label: "Starfire Shafts", cost: 1, per: "model" },
            { label: "Hagbane Tips", cost: 2, per: "model" }, { label: "Swiftshiver Shards", cost: 2, per: "model" }, { label: "Trueflight Arrows", cost: 2, per: "model" } ] },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "meadowchariot", name: "Meadow Chariot", perModel: false, basePoints: 70, unitSize: [1,1],
        options: [
          { id: "bow", type: "toggle", label: "Replace Elven shortbows with Elven longbows", cost: 0, per: "flat" },
          { id: "steeds", type: "toggle", label: "Two additional Elven Steeds", cost: 5, per: "flat" },
          { id: "crew", type: "toggle", label: "Two additional Charioteers", cost: 10, per: "flat" } ] },
      { id: "treerevenants", name: "Tree Revenants", perModel: true, basePoints: 15, unitSize: [5,15], keyword: "forest-spirit",
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "spiterevenants", name: "Spite Revenants", perModel: true, basePoints: 14, unitSize: [5,15], keyword: "forest-spirit",
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "treekin", name: "Tree Kin", perModel: true, basePoints: 45, unitSize: [3,9], keyword: "forest-spirit",
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Greatbows", cost: 6, per: "model" }, { label: "Polearms", cost: 6, per: "model" }, { label: "Great weapons", cost: 9, per: "model" } ] },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "treeman", name: "Treeman", perModel: false, basePoints: 155, unitSize: [1,1], keyword: "forest-spirit", options: [] }
    ],

    /* ------------------------------- RARE ------------------------------- */
    rare: [
      { id: "waywatchers", name: "Waywatchers", perModel: true, basePoints: 19, unitSize: [5,15],
        options: [
          { id: "bow", type: "toggle", label: "Replace Elven shortbows with Elven longbows", cost: 1, per: "model" },
          { id: "ahw", type: "toggle", label: "Additional hand weapons", cost: 1, per: "model" },
          { id: "traps", type: "toggle", label: "Traps", cost: 15, per: "flat" },
          { id: "arrows", type: "choice", label: "Enchanted Arrows", choices: [
            { label: "Arcane Bodkins", cost: 1, per: "model" }, { label: "Moonfire Shot", cost: 1, per: "model" }, { label: "Starfire Shafts", cost: 1, per: "model" },
            { label: "Hagbane Tips", cost: 2, per: "model" }, { label: "Swiftshiver Shards", cost: 2, per: "model" }, { label: "Trueflight Arrows", cost: 2, per: "model" } ] },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "sistersofthorn", name: "Sisters of the Thorn", perModel: true, basePoints: 25, unitSize: [5,15],
        lores: ["Athel Loren","Beasts","Life"], wizardLevel: 1,
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ],
        notes: "The unit itself is a Level 1 Wizard (Deepwood Coven)." },
      { id: "greatstagknights", name: "Great Stag Knights", perModel: true, basePoints: 58, unitSize: [3,6], keyword: "forest-spirit",
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 3, per: "model" },
          { id: "shield", type: "toggle", label: "Shields", cost: 3, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "greateagle", name: "Great Eagle", perModel: true, basePoints: 50, unitSize: [1,3], countsAsSingleChoice: true,
        options: [
          { id: "talons", type: "toggle", label: "Shredding Talons", cost: 5, per: "flat" },
          { id: "swift", type: "toggle", label: "Swiftsense", cost: 5, per: "flat" } ],
        notes: "1-3 Great Eagles count as a single Rare choice." },
      { id: "gossamidarchers", name: "Gossamid Archers", perModel: true, basePoints: 23, unitSize: [5,15], keyword: "forest-spirit",
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "spiteriderrevenants", name: "Spiterider Revenants", perModel: true, basePoints: 60, unitSize: [3,6], keyword: "forest-spirit",
        options: [
          { id: "lance", type: "toggle", label: "Light lances", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "zoat", name: "Zoat", perModel: false, basePoints: 130, unitSize: [1,1],
        lores: ["Life"], wizardLevel: 1,
        options: [ { id: "wlvl", type: "toggle", label: "Upgrade to a Level 2 Wizard", cost: 35, per: "flat" } ],
        notes: "Level 1 Wizard (Lore of Life)." },
      { id: "treelord", name: "Treelord", perModel: false, basePoints: 260, unitSize: [1,1], keyword: "forest-spirit",
        options: [ { id: "strangle", type: "toggle", label: "Strangleroots", cost: 20, per: "flat" } ] },
      { id: "forestdragon", name: "Forest Dragon", perModel: false, basePoints: 325, unitSize: [1,1], keyword: "forest-spirit", options: [] }
    ]
  }
};
