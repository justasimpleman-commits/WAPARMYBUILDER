/* ============================================================================
   LIZARDMEN — army data (Warhammer Armies, Mathias Eliasson v3.0,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA file. See docs/SCHEMA.md for the full field reference and
   docs/DATA-MAPPING.md for how each PDF section maps here.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size

   Army-specific systems used:
     - "Blessed Spawnings"        — multi-pick magic-item category (characters),
                                    also buyable per model on Core/Special units
     - "Disciplines of the Old Ones" — multi-pick category, Slann Mage-Priest only
     (each model sees only ONE multi-pick category, via `magicCatsOnly`)
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["lizardmen"] = {
  id: "lizardmen",
  name: "Lizardmen",
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
  multiPickCategories: ["Blessed Spawnings", "Disciplines of the Old Ones"],
  listRules: [
    "Special characters are unique — each may be taken only once.",
    "Magic items are unique (one of each per army) unless marked * (common).",
    "Each model may take only one item from each magic-item category.",
    "Blessed Spawnings: Lords may take up to 3. Heroes, Core and Special units may take up to 2.",
    "A Core unit that takes more than one Blessed Spawning counts as a Special unit; a Special unit that does counts as a Rare unit.",
    "Blessed Mark of the Old Ones: one per army, Characters only (not Special Characters).",
    "Blessed Spawning of Itzl: mounted models only. Huanchi and Tzunki: models on foot only.",
    "Each Discipline of the Old Ones may only be taken once in the army (excluding Special Characters).",
    "A Slann Mage-Priest carrying the Battle Standard may only take other magic items and/or Disciplines up to 50 points.",
    "Kroq-Gar: an army led by him may include a single unit of Cold One Riders as a Core choice.",
    "Tehenhauin: Skink Cohorts, Skink Skirmishers, Raptadon/Horned One/Terradon/Ripperdactyl Riders may be upgraded to Red Crested Skinks for +2 points per model (no Blessed Spawnings)."
  ],

  magicItems: {
    "Magic Weapons": [
      { name: "Scimitar of the Sun Resplendent", cost: 45 },
      { name: "Blade of Realities", cost: 40 },
      { name: "Blade of Revered Tzunki", cost: 35 },
      { name: "Stegadon War-Spear", cost: 35, only: "High Chief", requiresAccess: "lance" },
      { name: "The Lash of Itzaotyl", cost: 30 },
      { name: "Sword of the Hornet", cost: 25 },
      { name: "The Piranha Blade", cost: 20 },
      { name: "Dagger of Sotek", cost: 15 },
      { name: "Burning Blade of Chotec", cost: 15 },
      { name: "Sacrificial Heart Cloth of Chotec", cost: 15 },
      { name: "Staff of the Lost Sun", cost: 15, only: "Priest or High Priest" },
      { name: "Staff of Sotek", cost: 10, only: "Priest or High Priest" }
    ],
    "Magic Armour": [
      { name: "Sacred Stegadon Helm of Itza", cost: 40 },
      { name: "Hide of the Cold Ones", cost: 40, only: "Oldblood or Scar-Veteran" },
      { name: "Shield of Chaqua", cost: 30, requiresAccess: "shield" },
      { name: "Coronal Shield", cost: 25, requiresAccess: "shield" },
      { name: "The Maiming Shield", cost: 20, requiresAccess: "shield" },
      { name: "Shield of the Mirrored Pool", cost: 20, requiresAccess: "shield" }
    ],
    "Talismans": [
      { name: "Aura of Quetzl", cost: 25 },
      { name: "Divine Plaque of Protection", cost: 25, only: "Slann Mage-Priest" },
      { name: "Glyph Necklace", cost: 20 },
      { name: "Amulet of Itzl", cost: 20 },
      { name: "Zoetic Dial", cost: 20 },
      { name: "Incandescent Rectrices", cost: 10 }
    ],
    "Arcane Items": [
      { name: "Crystalline Skull", cost: 60 },
      { name: "Cupped Hands of the Old Ones", cost: 45, only: "Slann Mage-Priest" },
      { name: "Plaque of Dominion", cost: 35 },
      { name: "Rod of the Storm", cost: 35 },
      { name: "The Tetragon of Tectonic Displacement", cost: 35 },
      { name: "Cube of Darkness", cost: 30 },
      { name: "Plaque of Xoloc", cost: 30 },
      { name: "Diadem of Power", cost: 20 },
      { name: "Plaque of Tepee", cost: 15 },
      { name: "Plaque of Tepok", cost: 10, only: "Slann Mage-Priest", extraSpells: 1 },
      { name: "Coatl Familiar", cost: 5 }
    ],
    "Enchanted Items": [
      { name: "Blood Statuette of Spite", cost: 35 },
      { name: "Prism of Amyntok", cost: 35, only: "Slann Mage-Priest" },
      { name: "The Cloak of Feathers", cost: 30 },
      { name: "The Egg of Quango", cost: 30 },
      { name: "Star Tablet", cost: 30 },
      { name: "Gleaming Pendant of Chotec", cost: 30 },
      { name: "The Horn of Kygor", cost: 25 },
      { name: "The Incantation of Xetlipocutzl", cost: 25 },
      { name: "Throne of the Lost Gods", cost: 20, only: "Slann Mage-Priest" },
      { name: "Charm of the Jaguar Warrior", cost: 15 },
      { name: "Curse-Charm of Tepok", cost: 15 },
      { name: "Bane Head", cost: 10 },
      { name: "Carnosaur Pendant", cost: 10, only: "Oldblood or Scar-Veteran" },
      { name: "Plaque of Fate", cost: 10 },
      { name: "Relocation Orb", cost: 10, only: "Slann Mage-Priest" },
      { name: "Sotek's Gaze", cost: 10 },
      { name: "War Drum of Xahutec", cost: 10 },
      { name: "Dragonfly of Quicksilver", cost: 5 }
    ],
    "Magic Standards": [
      { name: "Totem of Prophecy", cost: 40 },
      { name: "Huanchi's Blessed Totem", cost: 35 },
      { name: "Sun Standard of Chotec", cost: 35 },
      { name: "Skavenpelt Banner", cost: 30 },
      { name: "The Jaguar Standard", cost: 25 },
      { name: "Sign of Sotek", cost: 20, only: "Skinks" }
    ],
    /* Blessed Spawnings (p.5) — a multi-pick category sharing the character's
       magic-item budget. The costs below are the CHARACTER costs; rank-and-file
       units buy them at the per-model rate printed in their own entry. */
    "Blessed Spawnings": [
      { name: "Blessed Mark of the Old Ones", cost: 10 },
      { name: "Blessed Spawning of Chotec", cost: 10 },
      { name: "Blessed Spawning of Tepok", cost: 10 },
      { name: "Blessed Spawning of Sotek", cost: 10 },
      { name: "Blessed Spawning of Itzl", cost: 5 },
      { name: "Blessed Spawning of Quetzl", cost: 5 },
      { name: "Blessed Spawning of Huanchi", cost: 5 },
      { name: "Blessed Spawning of Tlazcotl", cost: 5 },
      { name: "Blessed Spawning of Tzunki", cost: 5 }
    ],
    /* Disciplines of the Old Ones (p.6) — Slann Mage-Priest only, bought from
       the same budget as its magic items. Each may be taken once per army. */
    "Disciplines of the Old Ones": [
      { name: "The Focused Rumination", cost: 30 },
      { name: "Focus of Mystery", cost: 30 },
      { name: "Harmonic Alignment", cost: 30 },
      { name: "Becalming Cogitation", cost: 25 },
      { name: "Soul of Stone", cost: 25 },
      { name: "Wandering Deliberations", cost: 25 },
      { name: "The Harrowing Scrutiny", cost: 20 },
      { name: "Higher State of Consciousness", cost: 20 },
      { name: "Transcendent Healing", cost: 20 },
      { name: "Deep Contemplations", cost: 15 },
      { name: "Reservoir of Eldritch Energy", cost: 10 },
      { name: "Unfathomable Presence", cost: 10 },
      { name: "Vast Intellect", cost: 10, extraSpells: 1 }
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
    "Blood Frenzy": `Once a model or unit with this special rule has inflicted one or more unsaved Wounds, it immediately becomes subject to Frenzy until the end of the next turn.`,
    "Chameleon": `Models shooting at a unit with this special rule suffer a -1 penalty To Hit.`,
    "Firefly Frog Venom": `Models with this upgrade gain the Poisoned Attacks special rule for their missile attacks.`,
    "Predatory Fighter": `Whenever a model with this special rule rolls a 6 To Hit in close combat, it immediately makes another Attack; roll To Hit and To Wound as normal. Attacks generated by the Predatory Fighter special rule do not generate further Attacks. This applies to all fighting models in the unit, including models making supporting attacks.

In addition, a unit that contains one or more models with this special rule that attempts to restrain pursuit suffer a Leadership modifier equal to the result they won the combat against that unit by, just like a Frenzied unit.`,
    "War Gauntlets": `Range: Combat. Strength: As user. Special Rules: Impact Hits (1), Parry (6+), Magical Attacks, Requires Two Hands.

A model with war gauntlets gains +1 Attack.`,

    /* ---- Blessed Spawnings (p.5) — also buyable per model on units, so the
       rule text lives here as well as in itemDesc (for the item picker) ---- */
    "Blessed Mark of the Old Ones": `One per army, Characters only (not including Special Characters). The character may re-roll a total of 3 dice to either To Hit, To Wound, armour saves or invulnerable saves during the game. This Blessed Spawning does not prevent the character from joining any other Blessed Spawning.`,
    "Blessed Spawning of Chotec": `Models with this Blessed Spawning re-roll failed Charge and Pursuit distances.`,
    "Blessed Spawning of Tepok": `Models with this Blessed Spawning have the Magic Resistance (2) special rule.`,
    "Blessed Spawning of Sotek": `Models with this Blessed Spawning have the Devastating Charge special rule.`,
    "Blessed Spawning of Itzl": `Mounted models only. Models with this Blessed Spawning re-roll failed Stupidity or Berserk Rage tests.`,
    "Blessed Spawning of Quetzl": `Models with this Blessed Spawning can never have their armour save reduced to less than 6+.`,
    "Blessed Spawning of Huanchi": `Models on foot only. Models with this Blessed Spawning have the Ambushers and Forest Strider special rules.`,
    "Blessed Spawning of Tlazcotl": `Models with this Blessed Spawning may re-roll failed Psychology tests.`,
    "Blessed Spawning of Tzunki": `Models on foot only. Models with this Blessed Spawning have the Aquatic special rule and +2 Initiative.`,

    /* ---- Character special rules & upgrades ---- */
    "Arcane Might": `The model gain a +1 casting and dispelling bonus.`,
    "Mage-Priest Palanquin": `The Palanquin gives the Slann Mage-Priest the Inspiring Presence (6) and Strider special rules. Additionally, while they have the troop type Monstrous Infantry, they are never considered to be 'models on foot' for the purposes of spells, magic items and special rules.`,
    "Telepathic Confabulation": `At the start of each friendly Magic phase, before dice are rolled to determine the strength of the Winds of Magic, you may pick two friendly Wizards with this special rule anywhere on the battlefield and they may exchange a single spell with each other. In subsequent turns, a different pairing of Wizards with this special rule may be chosen.`,
    "Skink Attendant": `A Skink Attendant is placed on the same base as the Slann. They increase the Unit Strength of the model by 1.`,
    "Temple Guard Palanquin": `A Temple Guard Palanquin adds +4 Unit Strength to the model. The Palanquin has the Cold-blooded, Inspiring Presence (6), Natural Armour (5+), Predatory Fighter and Stubborn special rules.`,
    "Arcane Vassal": `A Slann Mage-Priest can choose to cast any magical missile or direct damage spell through a model with this special rule within 24". If they do so, measure the spell's range from the Arcane Vassal and use that model's forward arc and line of sight for the purposes of casting the spell. If using an Arcane Vassal, a Slann Mage-Priest can cast magic missiles, even if their own unit is engaged in close combat (provided that the Arcane Vassal's is not). If a spell cast through an Arcane Vassal is miscast, the result of the miscast is applied to the Slann Mage-Priest, but the Arcane Vassal suffers a Strength 3 hit.`,

    /* ---- Mount upgrades ---- */
    "Bloodroar": `Enemy units must roll an additional D6, discarding the lowest result, for Leadership tests to resolve Terror effects caused by this beast.`,
    "Loping Stride": `A model with this upgrade has +1 Movement.`,

    /* ---- Unit special rules ---- */
    "Skirmish Screen": `Friendly units of Kroxigors can move through friendly units of Skink Skirmishers as if they were Open Terrain (note that they must end their Movement at least 1" apart as normal). If the Kroxigors make a move that would result in it ending on top of a unit of Skink Skirmishers, simply move the Skink Skirmishers aside by the smallest amount possible to make room for the Kroxigors.`,
    "Guardians": `When a Slann joins a unit whose front rank contains five or more models with the Guardians special rule, it must be placed in the second rank, rather than the first. If the unit's front rank is ever reduced to four or fewer models with the Guardians special rule, the Slann must immediately move to the front rank (displacing rank and file models if necessary).

A Slann who is in base contact with a model with the Guardians special rule is considered to be the same Troop Type as them for the purpose of resolving missile attacks. When casting a direct damage or magical vortex spell that originates from the Slann's base, draw this spell from the base of the model in front of the Slann instead.`,
    "Sacred Duty": `Whilst they are part of a combined unit that has been joined by a Slann, all Temple Guard models in the combined unit have the Immunity (Psychology) special rules.`,
    "Fireleech Bolas": `Range: 6/9". Strength: 4. Special Rules: Flaming Attacks, Quick Shot.`,
    "Drop Rocks": `Once per game, during the Remaining Moves sub-phase, models with this special rule may drop rocks unless they are fleeing or have declared a charge that turn. All models in a unit must drop rocks at the same time. To drop rocks, select one unengaged enemy unit that the Terradons moved over in that turn. That target immediately suffers D3 Strength 4 hits for each Terradon in the unit, distributed as Hits from shooting.`,
    "Toad Rage": `Before the game starts, but after Scouts have been deployed, a Lustrian blot toad marker can be placed for each unit of Ripperdactyl Riders in your army. A single blot toad marker can be placed on any enemy unit on the tabletop, this marker remains throughout the battle. When fighting in close combat against a unit with a blot toad marker, Ripperdactyls gain another level of Frenzy and the Hatred special rule.`,
    "Spout Flames": `Spout Flames shoots like a fire thrower with the following profile — Range: n/a, Strength: 4, Special Rules: Flaming Attacks, Slow to Fire.

If the artillery dice result is a misfire, no shots are fired and D3 Skink handlers are removed as casualties. If all Skink handlers are removed, the Salamander is subject to Frenzy for the remainder of the game.`,
    "Instinctive Defence": `If charged, a Razordon must Stand and Shoot if it is able to do so. However, when calculating the number of shots fired, the Razordon can re-roll the artillery dice. In addition, it gains the Quick to Fire special rule and does not suffer To Hit penalties for Stand and Shoot.`,
    "Shoot Barbs": `Shoot Barbs shoots like an organ gun with the following profile — Range: 18", Strength: 4, Special Rules: Armour Piercing (1), Rapid Fire.

If the artillery dice result is a misfire, no shots are fired and D3 Skink Handlers are removed as casualties. If all Skink handlers are removed, the Razordon is subject to Stupidity for the remainder of the game.`,
    "Stream of Fire": `Stream of Fire is a fire thrower with the following profile — Range: 6", Strength: 5, Special Rules: Flaming Attacks, Slow to Fire.

If the artillery dice result is a misfire, no shots are fired and D3 Skink Handlers are removed as casualties. If all Skink handlers are removed, the Ancient Salamander is subject to Frenzy for the remainder of the game.`,
    "Ark of Sotek": `At the end of each friendly turn, nominate a Jungle Swarm unit within 6" of each Bastiladon with an Ark of Sotek and roll a D6. On a 4+, add one base to the Jungle Swarm unit. This can take the Jungle Swarm unit beyond its starting size. If the base cannot be placed (because there is not enough room, or you don't have sufficient models), it is lost. In addition, the Ark of Sotek has a special shooting attack — Range: D6", Strength: 2.

The Ark of Sotek can be activated in any friendly Shooting phase, even if the Bastiladon has marched, charged or is engaged in close combat. When activated, all enemy units within D6" immediately take 2D6 Strength 2 hits, distributed as for shooting.`,
    "Revivification Crystal": `All friendly units with the Cold-blooded special rule within 6" of one or more Bastiladons with a Revivification Crystal gains the Regeneration (6+) special rule.`,
    "Solar Engine": `Arcane Item. All friendly units with the Cold-blooded special rule that are within 6" of one or more Bastiladons with a Solar Engine gain +1 Initiative. In addition, it contains a Bound Spell (Level 1, cast on 6+). Beam of Chotec is a magic missile with a range of 24". If successfully cast, roll a D6: 1 — D3 Strength 3 hits; 2-3 — D6 Strength 4 hits; 4-5 — 2D6 Strength 5 hits; 6 — 2D6 Strength 6 hits and the target suffers a -1 penalty to their Weapon Skill and Ballistic Skill (to a minimum of 1) until the start of the Bastiladon's next Magic phase. All hits caused by Beam of Chotec are Flaming Attacks.`,
    "Impervious Defence": `For the purposes of calculating combat result bonuses, a Bastiladon counts as having no flanks or rear.`,
    "Thunderous Bludgeon": `Before rolling To Hit, nominate one of the Bastiladon's Attacks as the Thunderous Bludgeon (a different coloured dice works best). This Attack is resolved at Strength 10 and receives a +1 To Hit bonus against models in the creature's rear arc.`,
    "Giant Bow": `Instead of firing another missile weapon in the Shooting phase, one of the Skink Crew may fire the giant bow. This is a bolt thrower with the following profile — Range: 36", Strength: 5, Special Rules: Cumbersome, Multiple Wounds (D3).`,
    "Giant Blowpipe": `Instead of firing another missile weapon in the Shooting phase, up to two of the Skink Crew may each fire a giant blowpipe. This is an artillery weapon with the following profile — Range: 9/18", Strength: 2, Special Rules: Cumbersome, Multiple Shots (2D6), Poisoned Attacks, Rapid Fire.`,
    "Engine of the Gods": `An Engine of the Gods confers the following special rules:

**Arcane Configuration** If you have one or more Engines of the Gods on the battlefield at the start of your Magic phase, select one of the eight Lores of Battle Magic from the Warhammer rulebook. Until the start of your next Magic phase, the casting values for all spells from the selected lore are reduced by 1 (to a minimum of 3).

**Burning Alignment** Bound spell (Level 2, cast on 8+). Burning Alignment is a direct damage aura spell with a range of 12". Each target suffers D6 Strength 4 hits with the Flaming Attacks special rule.

**Portent of Warding** The model and all friendly units within 6" have a Magical Ward (6+).`,
    "Ancient": `The Stegadon gains +1 Strength and the Natural Armour (6+) special rule. However, they suffer -1 Initiative and -1 Attacks.`,
    "Sharpened Horns": `The Stegadon's its Impact Hits gains the Multiple Wounds (D3) special rule.`,
    "Unstoppable Stampede": `The Stegadon gains the Devastating Charge special rule.`,
    "Power of the Ancients": `Arcane Item. Bound Spell. This item contains the Fiery Blast spell from the Lore of Fire.`,
    "Divining Rod": `Arcane Item. Staff. The model channels Power and Dispel dice as if they were a Level 1 Wizard.`,
    "Primeval Roar": `Once per battle, at the start of any friendly Close Combat phase, a Troglodon can unleash its Primeval Roar. This affects all friendly units within 12". All models with the Predatory Fighter special rule gain an additional Attack on any successful To Hit roll of a 5+ until the end of the phase.`,
    "Spit Venom": `A Troglodon can spit its venom as a shooting attack with the following profile — Range: 9/18", Strength: 5, Special Rules: Multiple Wounds (D3), Poisoned Attacks, Quick Shot.`,
    "Magical Storm": `All missile fire directed at a Coatl suffers a -1 penalty to hit.`,
    "Guardian of the Sacred Places": `Level 1, cast on 5+. Guardian of the Sacred Places is a special type of spell that targets a single forest within 12" of the caster. The target immediately moves up to 2D3" in a direction of your choice. A forest cannot move to within 1" of other terrain features.`,
    "Howdah": `The Dread Saurian is ridden by 6 Skinks (Lizardmen) who are equipped with blowpipes and have and Natural Armour (6+) special rule.`,
    "The Blazing Configuration of Chotec": `The Dread Saurian gains the Flaming Attacks special rule and causes 2D6 Strength 4 Flaming Impact Hits.`,
    "The Golden Shroud of Tlazcotl": `All attacks targeting the Dread Saurian suffer a -1 To Hit modifier.`,
    "Quetzl's Flawless Heartstone": `The Dread Saurian gains the Stubborn special rule and reduces its Movement rate to 5, but increases its Toughness to 8.`,
    "The Shadow Rebus of Huanchi": `The Dread Saurian gains the Ambushers deployment special rule.`,
    "Tepok's Crystalline Eye": `The Dread Saurian gains the Magical Ward (5+) special rule.`,

    /* ---- Special-character special rules ---- */
    "Mage-Lord of Hexoatl": `Lord Mazdamundi can use one more power dice than normal when casting spells.`,
    "The Deliverance of Itza": `Level 4, cast on 12+. A direct damage spell that targets all enemy units within 12" of the caster's front arc. Each target suffers 2D6 Strength 4 hits. If a target has the Daemonic, Undead or Vampiric special rules, it suffers 3D6 hits instead. Lord Kroak can choose to extend the range of this spell to 18"; if he does so, the casting value is increased to 18+. Alternatively, Lord Kroak can choose to extend the range of this spell to 24", in which case the casting value is increased to 24+.`,
    "Eternity Guardians": `If Lord Kroak joins a unit of Temple Guard, all models in the combined unit gain the Unbreakable special rule.`,
    "First Generation Spawning": `Lord Kroak can cast The Deliverance of Itza as many times per turn as he has sufficient power dice, and may use up to 6 Power Dice per casting attempt. If Lord Kroak miscasts, roll a D6; on a 2+ he does not roll on the Miscast table but instead suffers a Strength 6 hit. On a roll of 1, Lord Kroak rolls on the Miscast table as normal. In either case, if the spell was cast through an Arcane Vassal, the Arcane Vassal also suffers a Strength 6 hit.`,
    "The Spirit of Lord Kroak": `Lord Kroak's Wizard level can never be reduced from Level 4.`,
    "Army of Kroq-Gar": `Kroq-Gar must always be the Army General. An army led by Kroq-Gar may include a single unit of Saurus Cold One Riders as a Core choice.`,
    "Sacred Spawning of Xhotl": `Kroq-Gar has a Magical Ward (5+). If Kroq-Gar is wounded in close combat and does not pass his Magical Ward save, then whoever struck the blow immediately suffers an automatic Strength 5 hit.`,
    "Attuned to the Beast": `Grymloq does not suffer from Berserk Rage.`,
    "Master of Snakes": `Tehenhauin can join Jungle Swarm units, even though characters are not normally permitted to join Swarms. Whilst Tehenhauin leads a Jungle Swarm, he gains the Unbreakable special rule and the unit's Unstable special rule is ignored.`,
    "Prophet of Sotek": `If your army includes Tehenhauin, you may upgrade any units of Skink Cohorts, Skink Skirmishers, Raptadon Riders, Horned One Riders, Terradon Riders or Ripperdactyl Riders in your army to be Red Crested Skinks. Red Crested Skinks have +1 Weapon Skill, as well as the Devastating Charge, Hatred (Skaven) and Immunity (Poisoned Attacks) special rules for +2 points per model. They may not take any Sacred Spawning. In addition, Skink Cohorts with this upgrade may replace their shields with great weapons for +2 points per model.`,
    "Tide of Serpents": `In close combat Tehenhauin can make an extra D6 Attacks at Initiative 1. These extra Attacks are always resolved at Weapon Skill 2 and Strength 2 and have the Poisoned Attacks special rule.`,
    "Herald of Cosmic Events": `Roll a D6 at the start of each friendly Magic phase. On a roll of 2-6, Tetto'Eko's calculations are correct and the cosmic event occurs; all friendly Wizards within 12" must re-roll power dice rolls of a 1 this phase. However, on a roll of 1, the Chaos Moon has corrupted Tetto'eko's calculations and all friendly Wizards within 12" casting a spell must re-roll any of the power dice that roll a 6 this phase.`,
    "The Palanquin of Constellations": `The Palanquin of Constellations gives Tetto'eko the Strider special rule. Additionally, while they have the troop type Infantry, he is never considered to be a 'model on foot' for the purposes of spells, magic items and special rules. If Tetto'eko joins a unit Skink Cohorts whose front rank contains five or more models, he must be placed in the second rank, displacing other models if necessary. If the unit's front rank is ever reduced to four or fewer models, Tetto'eko must immediately move into the front rank (displacing models if necessary).`,
    "Eternity Warden": `Chakax must always issue a challenge, and can never refuse one. When fighting in a challenge, Chakax re-rolls all failed rolls To Hit.`,
    "Ultimate Bodyguard": `Whilst Chakax is part of a unit that contains both a Slann and Temple Guard, all models in the unit gain the Unbreakable special rule.`,
    "Resilient": `Any successful rolls To Wound roll against Gor-Rok must be re-rolled. In addition, Gor-Rok has the Immunity (Killing Blow) special rule.`,
    "Jungle Spirit": `Nakai always appears using the Ambushers special rule, with the following exception; he will always appear from a forest, marshland or river terrain feature rather than the table edge if able to. Any unit that kills Nakai in close combat may not overrun. If Nakai flees from combat, then the victorious unit may not pursue.`,
    "Master of Skies": `If your army contains Tiktaq'to, one unit of Terradon Riders may deploy using the Ambushers special rule.`,
    "Master Predator": `If Oxyotl remained stationary in his preceding Movement phase, enemies cannot draw Line of Sight to him unless they are within 6", and all shots made from the Golden Blowpipe of P'Toohee may re-roll failed To Wound rolls. If an enemy unit would move through Oxyotl, simply move Oxyotl aside by the smallest amount possible to make room for the enemy unit.`
  },

  unitInfo: {
    /* ---- Character mounts (p.16-18) ---- */
    mount_templeguardpalanquin:{profile:[["Temple Guard Palanquin",4,4,0,4,"–","–",2,8,8]],eq:"—",rules:"Cold-Blooded, Inspiring Presence (6), Natural Armour (5+), Predatory Fighter, Stubborn"},
    mount_raptadon:{profile:[["Raptadon",8,3,0,3,3,1,3,1,3]],eq:"—",rules:"Cold-Blooded"},
    mount_coldone:{profile:[["Cold One",7,3,0,4,4,1,2,2,3]],eq:"—",rules:"Cold-Blooded, Fear, Natural Armour (6+), Stupidity"},
    mount_hornedone:{profile:[["Horned One",8,3,0,4,4,1,3,2,3]],eq:"—",rules:"Cold-Blooded, Fear, Natural Armour (6+)"},
    mount_terradon:{profile:[["Terradon",2,3,0,4,3,2,2,1,3]],eq:"—",rules:"Fear, Fly (9), Forest Strider"},
    mount_ripperdactyl:{profile:[["Ripperdactyl",2,3,0,4,3,2,3,2,3]],eq:"—",rules:"Armour Piercing (1), Fear, Fly (9), Frenzy, Killing Blow, Toad Rage"},
    mount_aggradon:{profile:[["Aggradon",7,4,0,5,4,3,2,3,3]],eq:"—",rules:"Blood Frenzy, Cold-Blooded, Natural Armour (5+)"},
    mount_carnosaur:{profile:[["Carnosaur",7,4,0,6,5,5,2,4,5]],eq:"—",rules:"Blood Frenzy, Cold-Blooded, Multiple Wounds (D3), Natural Armour (4+)"},

    /* ---- Characters ---- */
    slann:{profile:[["Slann Mage-Priest",4,1,3,3,4,5,1,0,9],["Skink Attendant","–",2,3,3,"–","–",4,1,"–"]],eq:"Hand weapon",rules:"Cold-Blooded, Magical Ward (4+); Arcane Might, Mage-Priest Palanquin, Telepathic Confabulation"},
    saurusleaders:{profile:[["Oldblood",4,6,0,5,5,3,3,5,8],["Scar-Veteran",4,5,0,5,5,2,3,4,8]],eq:"Hand weapon",rules:"Cold-Blooded, Predatory Fighter, Natural Armour (5+)"},
    skinkchiefs:{profile:[["High Chief",6,5,6,4,3,3,7,4,7],["Chief",6,4,5,4,3,2,6,3,6]],eq:"Hand weapon",rules:"Aquatic, Cold-Blooded, Natural Armour (6+)"},
    skinkpriests:{profile:[["High Priest",6,3,3,3,2,3,5,2,6],["Priest",6,2,3,3,2,2,4,1,5]],eq:"Hand weapon",rules:"Aquatic, Cold-Blooded, Natural Armour (6+); Arcane Vassal"},
    kroxigorancient:{profile:[["Ancient",6,5,0,6,5,4,2,5,8]],eq:"Great weapon",rules:"Aquatic, Cold-Blooded, Predatory Fighter, Natural Armour (3+)"},
    chameleonstalker:{profile:[["Stalker",6,4,6,4,3,2,6,2,6]],eq:"Hand weapon, blowpipe",rules:"Aquatic, Chameleon, Cold-Blooded, Forest Strider, Natural Armour (6+), Scouts, Sniper"},

    /* ---- Core ---- */
    sauruswarriors:{profile:[["Saurus Warrior",4,3,0,4,4,1,1,2,8]],eq:"Hand weapon, shield",rules:"Cold-Blooded, Predatory Fighter, Natural Armour (5+)"},
    skinkcohort:{profile:[["Skink",6,2,3,3,2,1,4,1,5]],eq:"Hand weapon, shield",rules:"Aquatic, Cold-Blooded, Natural Armour (6+), Poisoned Attacks"},
    skinkskirmishers:{profile:[["Skink",6,2,3,3,2,1,4,1,5]],eq:"Hand weapon, blowpipe",rules:"Aquatic, Cold-Blooded, Natural Armour (6+), Skirmishers; Skirmish Screen"},
    raptadonriders:{profile:[["Skink",6,2,3,3,2,1,4,1,5],["Raptadon",8,3,0,3,3,1,3,1,3]],eq:"Hand weapon, light lance, shield",rules:"Aquatic, Cold-Blooded, Fast Cavalry, Natural Armour (6+)"},
    jungleswarms:{profile:[["Jungle Swarm",5,3,0,2,2,6,1,6,3]],eq:"—",rules:"Aquatic, Cold-Blooded, Poisoned Attacks"},
    terrawings:{profile:[["Terrawing",2,3,0,3,3,1,3,1,3]],eq:"—",rules:"Cold-Blooded, Fly (10), Forest Strider"},

    /* ---- Special ---- */
    templeguard:{profile:[["Temple Guard",4,4,0,4,4,1,2,2,8]],eq:"Polearm, shield",rules:"Cold-Blooded, Predatory Fighter, Natural Armour (5+), Stubborn; Guardians, Sacred Duty"},
    coldoneriders:{profile:[["Saurus",4,4,0,4,4,1,2,2,8],["Cold One",7,3,0,4,4,1,2,2,3]],eq:"Hand weapon, shield",rules:"Cold-Blooded, Fear, Predatory Fighter, Natural Armour (4+), Stupidity"},
    kroxigors:{profile:[["Kroxigor",6,3,0,5,4,3,1,3,7]],eq:"Great weapon",rules:"Aquatic, Cold-Blooded, Natural Armour (4+), Predatory Fighter"},
    chameleonskinks:{profile:[["Chameleon Skink",6,2,4,3,2,1,4,1,5]],eq:"Hand weapon, blowpipe",rules:"Aquatic, Chameleon, Cold-Blooded, Forest Strider, Natural Armour (6+), Scouts, Skirmishers"},
    hornedoneriders:{profile:[["Great Crested Skink",6,3,3,3,2,1,4,1,6],["Horned One",8,3,0,4,4,1,3,2,3]],eq:"Light lance, shield",rules:"Cold-Blooded, Fast Cavalry, Fear, Natural Armour (5+)"},
    terradonriders:{profile:[["Skink",6,2,3,3,2,1,4,1,5],["Terradon",2,3,0,4,3,2,2,1,3]],eq:"Hand weapon, light lance; Fireleech Bolas",rules:"Cold-Blooded, Fast Cavalry, Fear, Fly (9), Forest Strider, Natural Armour (6+); Drop Rocks"},
    ripperdactylriders:{profile:[["Skink Brave",6,3,3,3,2,1,4,1,6],["Ripperdactyl",2,3,0,4,3,2,3,2,3]],eq:"Light lance, shield",rules:"Armour Piercing (1), Cold-Blooded, Fast Cavalry, Fear, Fly (9), Frenzy, Killing Blow, Natural Armour (6+); Toad Rage"},
    salamander:{profile:[["Salamander",6,3,3,4,4,2,4,2,4],["Skink",6,2,3,3,2,1,4,1,5]],eq:"Spear (Skinks only); Spout Flames",rules:"Aquatic, Cold-Blooded, Fear, Mixed Unit, Natural Armour (5+), Natural Armour (6+), Skirmishers; Spout Flames"},
    razordon:{profile:[["Razordon",6,3,3,4,4,2,4,2,4],["Skink",6,2,3,3,2,1,4,1,5]],eq:"Spear (Skinks only); Shoot Barbs",rules:"Aquatic, Cold-Blooded, Fear, Mixed Unit, Natural Armour (5+), Natural Armour (6+), Skirmishers; Instinctive Defence, Shoot Barbs"},

    /* ---- Rare ---- */
    aggradonriders:{profile:[["Saurus",4,4,0,4,4,1,2,2,8],["Aggradon",7,4,0,5,4,3,2,3,3]],eq:"Hand weapon, shield",rules:"Blood Frenzy, Cold-Blooded, Predatory Fighter, Natural Armour (3+)"},
    ancientsalamander:{profile:[["Ancient Salamander",6,3,3,5,4,3,4,3,4],["Skink",6,2,3,3,2,1,4,1,5]],eq:"Spear (Skinks only); Stream of Fire",rules:"Aquatic, Armour Piercing (1), Cold-Blooded, Mixed Unit, Natural Armour (5+), Natural Armour (6+), Skirmishers; Stream of Fire"},
    bastiladon:{profile:[["Bastiladon",4,3,0,5,6,5,1,3,6],["Skink","–",2,3,3,"–","–",4,1,5]],eq:"Ark of Sotek, javelins (Skinks only)",rules:"Cold-Blooded, Natural Armour (2+), Stubborn; Impervious Defence, Thunderous Bludgeon"},
    stegadon:{profile:[["Stegadon",6,3,0,5,6,5,2,4,6],["Skink Crew","–",2,3,3,"–","–",4,1,5]],eq:"Giant Bow, javelins (Skinks only)",rules:"Cold-Blooded, Immunity (Psychology), Impact Hits (D6+1), Natural Armour (4+), Stubborn"},
    arcanadon:{profile:[["Arcanadon",6,2,0,5,6,6,1,3,6],["Skink","–",2,3,3,"–","–",4,1,5]],eq:"Power of the Ancients, javelins (Skinks only)",rules:"Cold-Blooded, Immunity (Psychology), Impact Hits (D6+1), Jungle Poisons, Natural Armour (4+), Stubborn"},
    troglodon:{profile:[["Troglodon",7,3,4,5,5,5,2,3,5],["Oracle","–",2,3,3,"–","–",4,1,5]],eq:"Divining Rod (Oracle only)",rules:"Aquatic, Arcane Vassal, Cold-Blooded, Jungle Poisons, Poisoned Attacks, Predatory Fighter, Natural Armour (4+); Primeval Roar, Spit Venom"},
    coatl:{profile:[["Coatl",5,4,0,5,5,5,2,4,8]],eq:"—",rules:"Cold-Blooded, Fly (8), Magic Resistance (3), Natural Armour (4+); Magical Storm"},
    dreadsaurian:{profile:[["Dread Saurian",7,4,0,8,7,10,1,6,6]],eq:"—",rules:"Cold-Blooded, Immunity (Psychology), Multiple Wounds (D3), Natural Armour (3+)"},

    /* ---- Special characters ---- */
    mazdamundi:{profile:[["Lord Mazdamundi","–",2,3,3,4,5,2,1,9],["Zlaaq (Stegadon)",6,3,0,6,6,5,1,3,6]],eq:"Cobra Mace of Mazdamundi, The Itxi Grubs, Sunburst Standard of Hexoatl; Disciplines of the Old Ones: Becalming Cogitation, Focus of Mystery, Harmonic Convergence, Soul of Stone, Transcendent Healing",rules:"Arcane Might, Cold-Blooded, Impact Hits (D6+1), Immunity (Psychology), Natural Armour (3+), Stubborn, Telepathic Confabulation; Mage-Lord of Hexoatl"},
    kroak:{profile:[["Lord Kroak",4,0,0,3,5,6,0,0,9],["Skink Attendant","–",2,3,3,"–","–",4,1,"–"]],eq:"Ceremonial Mace of Malachite, Golden Death Mask, Amulet of Itza, Glyph of Potec, Standard of the Sacred Serpent",rules:"Arcane Might, Cold-Blooded, Flammable, Mage-Priest Palanquin, Magical Ward (3+), Unbreakable; Eternity Guardians, First Generation Spawning, The Spirit of Lord Kroak. Level 4 Wizard — knows only The Deliverance of Itza."},
    kroqgar:{profile:[["Kroq-Gar",4,6,0,5,5,3,3,5,8],["Grymloq (Carnosaur)",7,4,0,6,5,5,2,5,5]],eq:"Light armour; Revered Spear of Tlanxla, Hand of the Gods",rules:"Blood Frenzy, Cold-Blooded, Multiple Wounds (D3), Predatory Fighter, Natural Armour (2+); Army of Kroq-Gar, Sacred Spawning of Xhotl, Attuned to the Beast"},
    tehenhauin:{profile:[["Tehenhauin",6,6,5,4,3,3,6,3,8]],eq:"Light armour; Blade of the Serpent's Tongue, Plaque of Sotek",rules:"Aquatic, Arcane Vassal, Cold-Blooded, Hatred (Skaven), Immunity (Poisoned Attacks), Magical Ward (5+), Natural Armour (6+); Master of Snakes, Prophet of Sotek, Tide of Serpents. Level 3 Wizard — Lore of Beasts."},
    tettoeko:{profile:[["Tetto'eko",6,2,3,2,2,3,4,1,6]],eq:"The Eye of the Old Ones, The Stellar Staff",rules:"Arcane Vassal, Cold-Blooded, Loremaster, Magical Ward (5+), Natural Armour (6+); Herald of Cosmic Events, The Palanquin of Constellations. Level 3 Wizard — Lore of Heavens."},
    chakax:{profile:[["Chakax",4,5,0,5,5,2,3,4,8]],eq:"Light armour; The Star-stone Mace, The Helm of the Prime Guardian, The Key to the Eternity Chamber",rules:"Cold-Blooded, Guardians, Predatory Fighter, Natural Armour (5+), Stubborn; Eternity Warden, Ultimate Bodyguard"},
    gorrok:{profile:[["Gor-Rok",4,5,0,5,5,2,3,4,8]],eq:"The Mace of Ulumak, The Shield of Aeons",rules:"Blessed Mark of the Old Ones, Cold-Blooded, Immunity (Psychology), Predatory Fighter, Natural Armour (5+), Stubborn; Resilient"},
    nakai:{profile:[["Nakai",6,5,0,6,5,4,3,5,8]],eq:"The Sacred Blade of Quetzl",rules:"Aquatic, Blessed Mark of the Old Ones, Cold-Blooded, Loner, Natural Armour (3+), Regeneration (4+), Predatory Fighter; Jungle Spirit"},
    tiktaqto:{profile:[["Tiktaq'to",6,4,5,4,3,2,6,3,7],["Zwup (Terradon)",2,3,0,4,3,2,2,1,3]],eq:"The Blade of Ancient Skies, Mask of Heavens",rules:"Ambushers, Cold-Blooded, Drop Rocks, Fear, Fly (9), Forest Strider, Natural Armour (6+); Master of Skies"},
    oxyotl:{profile:[["Oxyotl",6,4,6,4,3,2,6,3,7]],eq:"Hand weapon; The Golden Blowpipe of P'Toohee",rules:"Aquatic, Chameleon, Cold-Blooded, Forest Strider, Hatred (Daemons of Chaos), Natural Armour (6+), Scouts, Sniper; Master Predator"}
  },

  itemDesc: {
    // -- Magic Weapons (army) --
    "Scimitar of the Sun Resplendent":`This weapon gives the wielder +2 Attacks and the Hatred special rule.`,
    "Blade of Realities":`No armour or Magical Ward saves can be taken against Wounds caused by this weapon.`,
    "Blade of Revered Tzunki":`This weapon gives the wielder +1 Strength and the Ignores Armour Saves special rule.`,
    "Stegadon War-Spear":`Skink High Chief on Stegadon only. Light lance. This weapon gives the bearer's mount the Impact Hits (2D6+1) special rule.`,
    "The Lash of Itzaotyl":`This weapon gives the wielder the Always Strikes First special rule. In addition, any Monster successfully Hit by this weapon one or more times in a single round must pass a Leadership test. If failed, it cannot Attack this close combat phase.`,
    "Sword of the Hornet":`This weapon allows the wielder to re-roll 1's To Hit, and enemies must re-roll 6's To Hit against them.`,
    "The Piranha Blade":`The wielder has the Multiple Wounds (D3) and Armour Piercing special rules (1).`,
    "Dagger of Sotek":`Skink Only. This weapon gives the wielder the Killing Blow special rule. In addition, all models from Warhammer: Skaven treat the model as having the Fear special rule.`,
    "Burning Blade of Chotec":`This weapon gives the wielder the Armour Piercing (2) and Flaming Attacks special rules.`,
    "Sacrificial Heart Cloth of Chotec":`Sling. All shots from this weapon have +1 Strength.`,
    "Staff of the Lost Sun":`Skink Priest or Skink High Priest only. Range 18", Strength 5, Multiple Shots (3).`,
    "Staff of Sotek":`Skink Priest or Skink High Priest only. Range 12", Strength 6, Multiple Wounds (D3), Poisoned Attacks.`,
    // -- Magic Armour (army) --
    "Sacred Stegadon Helm of Itza":`This armour gives the wearer a 6+ armour save. In addition, they gain +1 Toughness and the Impact Hits (D3) special rule.`,
    "Hide of the Cold Ones":`Oldblood or Scar-veteran on foot only. The wearer of this armour gains +1 Toughness as well as the Fear, Natural Armour (5+) and Stupidity special rules.`,
    "Shield of Chaqua":`Shield. All missile attacks targeting the bearer of this shield or any unit they are with suffer -1 To Wound.`,
    "Coronal Shield":`Shield. All close combat attacks directed against the bearer of this shield must re-roll successful rolls To Hit.`,
    "The Maiming Shield":`Shield. This armour gives the bearer +1 Attack and the Magical Attacks special rule.`,
    "Shield of the Mirrored Pool":`Shield. Any magic missile that strikes the bearer of this armour or any unit they are with is reflected on the roll of 2+ on a D6. If the spell is reflected, the results of the magic missile are resolved against the caster of the spell and any unit they are with.`,
    // -- Talismans (army) --
    "Aura of Quetzl":`This talisman gives the wearer the Magical Ward (4+) special rule against attacks with Strength 5 or more.`,
    "Divine Plaque of Protection":`Slann Mage-Priest only. This talisman gives the wearer and any unit they are with the Magical Ward (5+) special rule against missile attacks.`,
    "Glyph Necklace":`All close combat attacks directed against the bearer of this talisman suffer -1 To Hit.`,
    "Amulet of Itzl":`One use only. This talisman automatically ignores the first unsaved Wound suffered.`,
    "Zoetic Dial":`The bearer of this item may re-roll 1's when taking armour saves.`,
    "Incandescent Rectrices":`One use only. If this model would be removed as a casualty, immediately roll a D6. On a 3+, the model remains with 1 Wound, and any additional Wounds suffered are ignored.`,
    // -- Arcane Items (army) — text must start with Relic./Charm./Staff. --
    "Crystalline Skull":`Relic. Each time the bearer of this item successfully casts a spell, add +1 Power Dice to the pool (to a maximum of 3 per Magic Phase). In addition, once per battle the bearer may choose to destroy this item at the end of any of your Magic phases. If they do so, pick one enemy unit within 12". Roll a number of dice equal to the number of Power dice in the pool. For each roll of a 3+, that unit suffer a Wound that Ignores Armour Saves.`,
    "Cupped Hands of the Old Ones":`Charm. Slann Mage-Priest only. One use only. If the bearer of this item miscasts, roll a D6. On a roll of 1 the bearer suffers the results of the miscast as normal. On 2+ the miscast is ignored. In addition, any enemy Wizards within line of sight of the Slann Mage-Priest will count as having rolled a 7 on the Miscast table.`,
    "Plaque of Dominion":`Relic. Bound spell (Level 2, cast on 8+). This item contains a hex aura spell with a range of 18". All enemy Wizards within range have the Stupidity special rule until the start of the caster's next Magic phase.`,
    "Rod of the Storm":`Staff. Bound Spell. This item contains the Urannon's Thunderbolt spell from the Lore of Heavens.`,
    "The Tetragon of Tectonic Displacement":`Relic. Bound Spell. The Tetragon of Tectonic Displacement contains the Tectonic Shift spell from the Lore of Geomancy.`,
    "Cube of Darkness":`Charm. One use only. When an enemy spell has been cast, a Wizard with this item can use it instead of attempting to dispel the spell using dispel dice. If he does so, roll a D6; on the roll of a 2+ the spell is automatically dispelled – otherwise the spell is resolved as normal. In either case, roll a separate D6 for every Remains in Play spell currently in effect; on a 2+ that spell automatically ends.`,
    "Plaque of Xoloc":`Charm. Once use only. This item may be used before attempting to cast any spell with a casting value of 10 maximum. Once used, the spell is cast automatically without using any Power dice. It may be dispelled as normal on its minimum casting value.`,
    "Diadem of Power":`Relic. This item allows you to save up to two unused Power dice at the end of your Magic phase and add them to your side's Dispel dice pool in the next enemy Magic phase.`,
    "Plaque of Tepee":`Relic. Every time an enemy spell targets the wearer or their unit, roll a D6. On a 5+, the spell is dispelled and has no effect. If the roll is failed, you may attempt to dispel the spell as normal.`,
    "Plaque of Tepok":`Relic. Slann Mage-Priest only. The model bearing this item can choose an additional spell from another Lore of Magic than the one they have chosen.`,
    "Coatl Familiar":`Charm. One use only. This item can be used at the start of any of your Magic phases. When used, the bearer may attempt to cast any one spell from any Lore of Magic normally available to them.`,
    // -- Enchanted Items (army) --
    "Blood Statuette of Spite":`Bound Spell (Level 2, cast on 7+). This item contains a direct damage spell with a range of 12" that targets one enemy model, even in a unit. The target model must pass a Toughness test or suffer a Wound which Ignores Armour Saves. If the model takes a Wound from this spell, it must immediately take another Toughness test, losing another Wound if it fails again. This continues until either the model passes a Toughness test or is slain.`,
    "Prism of Amyntok":`Slann only. Bound spell (Level 2, cast on 8+). This item contains a direct damage area spell that uses the line template. Place it 12" in length, directly away from the caster's front arc. Each model in the way suffers a Strength 6 Hit with the Flaming Attacks special rule. This has a +1 bonus To Wound against Daemons, Undead and Vampires.`,
    "The Cloak of Feathers":`Skink character on foot only. This item gives the wearer the Fly (10) and Magic Resistance (1) special rules.`,
    "The Egg of Quango":`One use only. This item can be used at the start of any Close Combat phase. Nominate one enemy unit in base contact with the bearer or his unit, roll a D6: 1 — the enemy unit immediately suffers D6 Strength 3 hits; 2-3 — D6 Strength 4 hits; 4-6 — 2D6 Strength 5 hits. Any Wounds inflicted count towards combat results.`,
    "Star Tablet":`Infantry only. Before deployment, the bearer of this item and one unit they must join gains the Scouts special rule.`,
    "Gleaming Pendant of Chotec":`One use only. This item may be used at the start of any close combat phase. For the remainder of the phase, all enemy units in base contact with the wearer or the unit it is with gain the Always Strikes Last special rule.`,
    "The Horn of Kygor":`One use only. The bearer of this item can sound it at the start of any of his Movement phases. If they do so, all friendly mounts, War Beasts, Monstrous Beasts and Monsters within 12" of the bearer have the Frenzy special rule until the start of their next Movement phase.`,
    "The Incantation of Xetlipocutzl":`One use only. The bearer can use this item at the start of any of your Magic phases. All enemy units within 12" must immediately take a Panic test using an additional D6, discarding the lowest result.`,
    "Throne of the Lost Gods":`Slann Mage-Priest only. The model gains +1 Wound and the Fly (8) special rule.`,
    "Charm of the Jaguar Warrior":`Saurus on foot only. This item gives the bearer Movement 8 and the Scouts special rule.`,
    "Curse-Charm of Tepok":`One use only. When an enemy Wizard rolls on the Miscast table, the bearer of this item may force them to re-roll the result.`,
    "Bane Head":`The bearer of this item gains the Multiple Wounds (2) special rule against one enemy model, nominated at the start of the battle.`,
    "Carnosaur Pendant":`Saurus Oldblood or Scar-Veteran. The bearer of this item gains the Blood Frenzy special rule.`,
    "Plaque of Fate":`The bearer of this item may re-roll one roll To Hit, To Wound, armour or invulnerable save per turn.`,
    "Relocation Orb":`Slann only. One use only. If the bearer of this item has suffered any unsaved Wounds at the end of any phase, they may be moved anywhere within 12" just like a summoning spell, even if they are in combat.`,
    "Sotek's Gaze":`Skink only. This item gives the wearer the Fear special rule.`,
    "War Drum of Xahutec":`All friendly units within 12" of the bearer of this item do not need to pass a Leadership test in order to march, regardless of the proximity of enemy units. In addition, they gain +1 Leadership when attempting to Rally.`,
    "Dragonfly of Quicksilver":`If both players have models with the Scouts special rule, the Lizardmen player adds +1 to their dice roll when rolling to see who deploys their Scouts first.`,
    // -- Magic Standards (army) --
    "Totem of Prophecy":`All enemy units with Line of Sight to this standard suffer a -1 penalty to their Leadership. This standard has no effect on models with Immunity (Psychology).`,
    "Huanchi's Blessed Totem":`Bound Spell (Level 3, cast on 9+). This standard contains a conveyance spell that targets the unit carrying it. The unit may immediately make a move directly forward using the Random Movement (2D6) special rule.`,
    "Sun Standard of Chotec":`All missile attacks targeted at the unit carrying this standard from within 12" suffer -2 To Hit, or -1 To Hit if fired from over 12" away.`,
    "Skavenpelt Banner":`The unit carrying this standard gains the Frenzy and Hatred (Skaven) special rules. However, all models from Warhammer: Skaven gain the Hatred special rule against the unit carrying the banner.`,
    "The Jaguar Standard":`The unit carrying this standard adds D3" to their charge or pursue distance.`,
    "Sign of Sotek":`Skinks only. The unit carrying this standard may re-roll failed rolls To Wound on any turn it charges.`,
    // -- Blessed Spawnings (p.5) --
    "Blessed Mark of the Old Ones":`One per army, Characters only (not including Special Characters). The character may re-roll a total of 3 dice to either To Hit, To Wound, armour saves or invulnerable saves during the game. This Blessed Spawning does not prevent the character from joining any other Blessed Spawning.`,
    "Blessed Spawning of Chotec":`Models with this Blessed Spawning re-roll failed Charge and Pursuit distances.`,
    "Blessed Spawning of Tepok":`Models with this Blessed Spawning have the Magic Resistance (2) special rule.`,
    "Blessed Spawning of Sotek":`Models with this Blessed Spawning have the Devastating Charge special rule.`,
    "Blessed Spawning of Itzl":`Mounted models only. Models with this Blessed Spawning re-roll failed Stupidity or Berserk Rage tests.`,
    "Blessed Spawning of Quetzl":`Models with this Blessed Spawning can never have their armour save reduced to less than 6+.`,
    "Blessed Spawning of Huanchi":`Models on foot only. Models with this Blessed Spawning have the Ambushers and Forest Strider special rules.`,
    "Blessed Spawning of Tlazcotl":`Models with this Blessed Spawning may re-roll failed Psychology tests.`,
    "Blessed Spawning of Tzunki":`Models on foot only. Models with this Blessed Spawning have the Aquatic special rule and +2 Initiative.`,
    // -- Disciplines of the Old Ones (p.6) --
    "The Focused Rumination":`Once per Magic phase, the Slann may add an additional 'free' Power dice to the casting attempt. This can cause a Miscast or Ultimate Power as normal, and can cause the Mage-Priest to roll more dice than normally allowed.`,
    "Focus of Mystery":`The Slann Mage-Priest has the Loremaster special rule. This discipline cannot be combined with the Wandering Deliberations or Deep Contemplations disciplines.`,
    "Harmonic Alignment":`The Slann Mage-Priest gains a +1 bonus to channel power and dispel dice.`,
    "Becalming Cogitation":`The Slann Mage-Priest re-rolls its first failed dispel attempt in each Magic phase.`,
    "Soul of Stone":`When rolling on the Miscast table, the Slann Mage-Priest can choose to subtract 1 from the result (to a minimum of 2) or add 1 to the result (to a maximum of 12), instead of accepting the original result.`,
    "Wandering Deliberations":`The Slann Mage-Priest may choose their spells from a combination of any of the eight Winds of Magic in the Warhammer rulebook. However, they may only choose one Signature Spell. This discipline cannot be combined with the Focus of Mystery or Deep Contemplations disciplines.`,
    "The Harrowing Scrutiny":`The Slann Mage-Priest has the Terror special rule.`,
    "Higher State of Consciousness":`The Slann Mage-Priest has the Ethereal special rule, but cannot join units.`,
    "Transcendent Healing":`If this model is alive at the end of any friendly Magic phase, roll a number of D6 equal to the difference between the Slann Mage-Priest's starting number of Wounds and its current number of Wounds. For each roll of a 6, the Slann Mage-Priest immediately recovers a single Wound lost earlier in the battle.`,
    "Deep Contemplations":`Whenever the Slann Mage-Priest successfully casts a spell, they can immediately choose one of the Signature Spells from one of the eight Winds of Magic in the Warhammer rulebook which they can cast for the remainder of the Magic phase. That newly chosen spell will always use that spell lore's lore attribute. This discipline cannot be combined with the Focus of Mystery or Wandering Deliberations discipline.`,
    "Reservoir of Eldritch Energy":`At the end of the opponent's Magic phase, the Slann Mage-Priest can store a single unused dispel dice remaining in your pool. At the beginning of your next Magic phase, roll a D6; on a 2+ you can add that dice to your power pool. On the roll of a 1, that bonus dice is lost. If the Slann is slain before their next Magic phase, the bonus dice is lost.`,
    "Unfathomable Presence":`Roll a D3 at the start of each enemy Magic phase; the Slann Mage-Priest has the Magic Resistance (*) special rule until the end of that phase, where the result of 1 gives Magic Resistance (1), a result of 2 gives Magic Resistance (2) and a result of 3 gives Magic Resistance (3).`,
    "Vast Intellect":`The Slann Mage-Priest can choose one additional spell.`,
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

  // The Lore of Geomancy (p.4). Standard lores come from COMMON_LORES.
  spellLores: {
    "Geomancy": { attribute: { name: "Earth Tremors", text: `Every time a spell from the Lore of Geomancy is successfully cast on an enemy unit or a unit suffers one or more unsaved Wounds from it, that unit suffers -1 to its Movement value until the start of the caster's next Magic phase. This has no effect on models with the Fly or Strider special rules.` }, spells: [
      { name:"Earth Line", lvl:0, cast:8, type:"Direct damage (area)", range:`Line template`, effect:`Earth Line is a direct damage area spell that uses the line template. Place it from one of the battlefield corners directly to the caster. Each model (friend and foe) in the way must pass a Toughness test or suffer a Wound with the Ignores Armour Saves special rule.` },
      { name:"Empowered Obsinite", lvl:1, cast:8, type:"Augment", range:`18"`, effect:`The target unit gains the Armour Piercing (2) special rule until the start of the caster's next Magic phase.` },
      { name:"Tectonic Shift", lvl:1, cast:8, type:"Special", range:`24"`, effect:`Choose one piece of terrain within 24". You may move the target up to 2D3" in any direction while still retaining its original facing, stopping within 1" of any other terrain. Unless it is in combat, any unit in that terrain piece is moved with it, stopping within 1" of other units. In addition, the unit is subject to Earth Tremors.` },
      { name:"Earthen Ramparts", lvl:1, cast:9, type:"Augment (RIP)", range:`18"`, effect:`Remains in play. While the spell is in effect, the target counts as being behind a wall (a defended obstacle that gives hard cover and a -1 To Hit modifier to charging models in base contact with them) on all sides. The spell is immediately dispelled if the unit moves for any reason.` },
      { name:"Entomb", lvl:2, cast:9, type:"Hex (RIP)", range:`24"`, effect:`Remains in play. Can be cast on an unengaged unit. While the spell is in effect, the target cannot move, use missile attacks or be damaged in any way (except by the Lore of Geomancy) and is treated as impassable terrain for all purposes.` },
      { name:"Uproot the Mountains", lvl:2, cast:9, type:"Summoning", range:`18"`, effect:`Summons a hill with one level, no more than 6" in diameter. Alternatively, the caster can target an existing hill within 18" and remove it from play. Any unit on or under the hill when the spell is cast are subject to Earth Tremors.` },
      { name:"Cavernous Crevasse", lvl:2, cast:10, type:"Direct damage (area)", range:`18"`, effect:`A direct damage area spell that uses the line template. Place it 12" in length, with its starting point anywhere within 18" from the caster. Each model in the way must roll a D6 per Wound on their profile – for each roll of a 4+ they suffer a Wound which Ignores Armour Saves and Regeneration.` },
      { name:"Seismic Upheaval", lvl:3, cast:10, type:"Hex", range:`24"`, effect:`All models in the unit must take a Dangerous Terrain test and suffer a -1 To Hit penalty in close combat and with missile weapons until the start of the caster's next Magic phase.` },
      { name:"Telepathic Summons", lvl:3, cast:10, type:"Conveyance", range:`24"`, effect:`Targets a friendly unit within 24". The target is immediately picked up and may be moved to any position on the battlefield within 12" of the caster, just like a summoning spell.` },
      { name:"Assault of Stone", lvl:3, cast:12, type:"Direct damage (area)", range:`24"`, effect:`Uses the small round template. All models under the template suffer a Strength 5 hit.` },
      { name:"Gravitic Redirection", lvl:4, cast:12, type:"Direct damage", range:`12"`, effect:`Roll a D6 for each model in the target unit; for each result of 4+, they suffer a Wound which Ignores Armour Saves.` },
      { name:"Ruination of Cities", lvl:4, cast:13, type:"Direct damage", range:`18"`, effect:`The target unit suffers 2D6 Strength 5 hits. A unit that suffers any wounds from this spell will have all its movement halved (rounding up) in its next Movement phase. Units inside a building take 3D6 Strength 5 hits.` },
      { name:"The Great Leveller", lvl:4, cast:15, type:"Direct damage (aura)", range:`12"`, effect:`All units (friend and foe, except the caster) within range (even if they are engaged in close combat) suffer 3D6 Strength 5 Hits.` }
    ]}
  },

  units: {
    /* ----------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "slann", name: "Slann Mage-Priest", isCharacter: true,
        access: [],
        lores: ["Beasts","Death","Heavens","Fire","Geomancy","Light","Life","Metal","Shadow"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Disciplines of the Old Ones"],
        variants: [ { name: "Slann Mage-Priest", points: 360, wizardLevel: 4, magicBudget: 100 } ],
        options: [
          { id: "extra", type: "choice", label: "Palanquin / attendant", choices: [
            { label: "Skink Attendant", cost: 3 },
            { label: "Replace Mage-Priest Palanquin with a Temple Guard Palanquin", cost: 25 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard (one Slann only)", cost: 25, per: "flat", bsb: true }
        ],
        notes: "May take Magic Items and/or Disciplines of the Old Ones up to 100 pts. A Slann carrying the Battle Standard may take a magic banner with no points limit, but only 50 pts of other items/Disciplines."
      },
      {
        id: "saurusleaders", name: "Saurus Leaders", isCharacter: true,
        access: ["additional hand weapon","spear","lance","halberd","great weapon","shield","light armour"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Blessed Spawnings"],
        variants: [
          { name: "Oldblood", points: 140, magicBudget: 100 },
          { name: "Scar-Veteran", points: 90, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Spear", cost: 5 }, { label: "Light lance", cost: 5 },
            { label: "Polearm", cost: 10 }, { label: "Great weapon", cost: 10 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 9, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Cold One", cost: 25, key: "coldone" },
            { label: "Horned One", cost: 30, key: "hornedone" },
            { label: "Aggradon", cost: 65, key: "aggradon" },
            { label: "Carnosaur", cost: 175, only: "Oldblood", key: "carnosaur" } ] },
          { id: "loping", type: "toggle", label: "Loping Stride", cost: 5, per: "flat", requiresMount: "carnosaur" },
          { id: "bloodroar", type: "toggle", label: "Bloodroar", cost: 15, per: "flat", requiresMount: "carnosaur" },
          { id: "bsb", type: "toggle", label: "Battle Standard (one Scar-Veteran only)", cost: 25, per: "flat", only: "Scar-Veteran", bsb: true }
        ],
        notes: "May take Blessed Spawnings and/or Magic Items up to the variant's budget. The BSB may carry a Magic Standard with no points limit in addition to any other Magic Items."
      },
      {
        id: "skinkchiefs", name: "Skink Chiefs", isCharacter: true,
        access: ["additional hand weapon","spear","lance","shield","light armour"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Blessed Spawnings"],
        variants: [
          { name: "High Chief", points: 70, magicBudget: 100 },
          { name: "Chief", points: 35, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Combat weapon", choices: [
            { label: "Additional hand weapon", cost: 5 }, { label: "Spear", cost: 5 }, { label: "Light lance", cost: 5 } ] },
          { id: "missile", type: "choice", label: "Missile weapon", choices: [
            { label: "Blowpipe", cost: 5 }, { label: "Shortbow", cost: 5 }, { label: "Sling", cost: 5 }, { label: "Javelins", cost: 6 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 6, per: "flat" },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 5, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Raptadon", cost: 25, key: "raptadon" },
            { label: "Horned One", cost: 30, key: "hornedone" },
            { label: "Terradon", cost: 35, key: "terradon" },
            { label: "Ripperdactyl", cost: 40, key: "ripperdactyl" },
            { label: "Stegadon (replacing one of the crew)", cost: 190, only: "High Chief", key: "stegadon" } ] }
        ],
        notes: "A Skink High Chief mounted on a Stegadon loses their Natural Armour special rule."
      },
      {
        id: "skinkpriests", name: "Skink Priests", isCharacter: true,
        access: [],
        lores: ["Beasts","Heavens","Fire","Life","Light"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Blessed Spawnings"],
        variants: [
          { name: "High Priest", points: 165, wizardLevel: 3, magicBudget: 100 },
          { name: "Priest", points: 60, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Upgrade to Level 2 Wizard", cost: 35, per: "flat", only: "Priest" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Terradon", cost: 35, key: "terradon" },
            { label: "Troglodon (replacing the Skink Oracle)", cost: 150, only: "High Priest", key: "troglodon" },
            { label: "Stegadon (Engine of the Gods)", cost: 240, only: "High Priest", key: "stegadon" },
            { label: "Coatl", cost: 270, only: "High Priest", key: "coatl" } ] }
        ],
        notes: "A Skink High Priest mounted on a Stegadon loses their Natural Armour special rule."
      },
      {
        id: "kroxigorancient", name: "Kroxigor Ancient", isCharacter: true, cannotBeGeneral: true,
        access: ["great weapon","light armour"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Blessed Spawnings"],
        variants: [ { name: "Ancient", points: 170, magicBudget: 50 } ],
        options: [
          { id: "gauntlets", type: "toggle", label: "Replace great weapon with war gauntlets", cost: 0, per: "flat" },
          { id: "armour", type: "toggle", label: "Light armour", cost: 16, per: "flat" }
        ],
        notes: "A Kroxigor Ancient may never be the Army General."
      },
      {
        id: "chameleonstalker", name: "Chameleon Stalker", isCharacter: true, cannotBeGeneral: true,
        access: ["shield"],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards","Blessed Spawnings"],
        variants: [ { name: "Stalker", points: 45, magicBudget: 50 } ],
        options: [
          { id: "wep", type: "choice", label: "Replace blowpipe", choices: [
            { label: "Sling & shield", cost: 1 }, { label: "Javelins & shield", cost: 3 } ] }
        ],
        notes: "A Chameleon Stalker may never be the Army General."
      },
      /* ---- Special characters ---- */
      { id: "mazdamundi", name: "Lord Mazdamundi", isCharacter: true, isSpecialChar: true,
        access: [], magicCatsOnly: [],
        lores: ["Beasts","Death","Heavens","Fire","Geomancy","Light","Life","Metal","Shadow"],
        variants: [ { name: "Lord Mazdamundi", points: 730, wizardLevel: 4, magicBudget: 0 } ], options: [],
        notes: "Mounted on Zlaaq (Stegadon). Carries the Cobra Mace, Itxi Grubs and the Sunburst Standard of Hexoatl — he must be the army's Battle Standard Bearer (may still be General). Disciplines: Becalming Cogitation, Focus of Mystery, Harmonic Convergence, Soul of Stone, Transcendent Healing." },
      { id: "kroak", name: "Lord Kroak", isCharacter: true, isSpecialChar: true,
        access: [], magicCatsOnly: [],
        variants: [ { name: "Lord Kroak", points: 510, magicBudget: 0 } ],
        options: [ { id: "attendant", type: "toggle", label: "Skink Attendant", cost: 3, per: "flat" } ],
        notes: "Level 4 Wizard, but knows only one spell — The Deliverance of Itza. Carries the Standard of the Sacred Serpent (the army's Battle Standard)." },
      { id: "kroqgar", name: "Kroq-Gar", isCharacter: true, isSpecialChar: true, mustBeGeneral: true,
        access: ["light armour","lance"], magicCatsOnly: [],
        variants: [ { name: "Kroq-Gar", points: 465, magicBudget: 0 } ], options: [],
        notes: "Mounted on Grymloq (Carnosaur). Must always be the Army General; his army may include one unit of Cold One Riders as a Core choice." },
      { id: "tehenhauin", name: "Tehenhauin", isCharacter: true, isSpecialChar: true,
        access: ["light armour"], magicCatsOnly: [],
        lores: ["Beasts"],
        variants: [ { name: "Tehenhauin", points: 310, wizardLevel: 3, magicBudget: 0 } ],
        options: [ { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Stegadon (Engine of the Gods)", cost: 265 } ] } ],
        notes: "If mounted on a Stegadon he does not add his Natural Armour save to the model's overall save. Unlocks the Red Crested Skinks upgrade (+2/model)." },
      { id: "tettoeko", name: "Tetto'eko", isCharacter: true, isSpecialChar: true,
        access: [], magicCatsOnly: [],
        lores: ["Heavens"],
        variants: [ { name: "Tetto'eko", points: 225, wizardLevel: 3, magicBudget: 0 } ], options: [],
        notes: "Loremaster (Lore of Heavens). Line of Sight value 2." },
      { id: "chakax", name: "Chakax", isCharacter: true, isSpecialChar: true,
        access: ["light armour","great weapon"], magicCatsOnly: [],
        variants: [ { name: "Chakax", points: 210, magicBudget: 0 } ], options: [] },
      { id: "gorrok", name: "Gor-Rok", isCharacter: true, isSpecialChar: true,
        access: ["shield"], magicCatsOnly: [],
        variants: [ { name: "Gor-Rok", points: 220, magicBudget: 0 } ], options: [] },
      { id: "nakai", name: "Nakai the Wanderer", isCharacter: true, isSpecialChar: true,
        access: ["great weapon"], magicCatsOnly: [],
        variants: [ { name: "Nakai", points: 310, magicBudget: 0 } ], options: [],
        notes: "Loner — always arrives using Ambushers, from a forest, marsh or river feature if able." },
      { id: "tiktaqto", name: "Tiktaq'to", isCharacter: true, isSpecialChar: true,
        access: [], magicCatsOnly: [],
        variants: [ { name: "Tiktaq'to", points: 145, magicBudget: 0 } ], options: [],
        notes: "Mounted on Zwup (Terradon). One unit of Terradon Riders may deploy using Ambushers." },
      { id: "oxyotl", name: "Oxyotl", isCharacter: true, isSpecialChar: true,
        access: [],
        magicCatsOnly: ["Magic Weapons","Magic Armour","Talismans","Arcane Items","Enchanted Items","Magic Standards"],
        variants: [ { name: "Oxyotl", points: 100, magicBudget: 25 } ], options: [],
        notes: "May take Magic Items up to 25 points (no Blessed Spawnings)." }
    ],

    /* ------------------------------- CORE -------------------------------- */
    core: [
      { id: "sauruswarriors", name: "Saurus Warriors", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [
          { id: "spears", type: "toggle", label: "Spears", cost: 1, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "skinkcohort", name: "Skink Cohort", perModel: true, basePoints: 3, unitSize: [20,60],
        options: [
          { id: "wep", type: "choice", label: "Weapons", choices: [
            { label: "Spears", cost: 0.5, per: "model" },
            { label: "Replace shields with shortbows", cost: 1, per: "model" },
            { label: "Javelins", cost: 2, per: "model" } ] },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "skinkskirmishers", name: "Skink Skirmishers", perModel: true, basePoints: 5, unitSize: [10,30],
        options: [
          { id: "wep", type: "choice", label: "Replace blowpipes", choices: [
            { label: "Slings & shields", cost: 1, per: "model" }, { label: "Javelins & shields", cost: 1, per: "model" } ] },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", roles: ["leader","musician"] } ] },
      { id: "raptadonriders", name: "Raptadon Riders", perModel: true, basePoints: 12, unitSize: [5,15],
        options: [
          { id: "jav", type: "toggle", label: "Replace light lances with javelins", cost: 1, per: "model" },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "jungleswarms", name: "Jungle Swarms", perModel: true, basePoints: 30, unitSize: [3,9], options: [] },
      { id: "terrawings", name: "Terrawings", perModel: true, basePoints: 10, unitSize: [5,15], options: [] }
    ],

    /* ------------------------------ SPECIAL ------------------------------ */
    special: [
      { id: "templeguard", name: "Temple Guard", perModel: true, basePoints: 17, unitSize: [10,30],
        options: [
          { id: "armour", type: "toggle", label: "Light armour", cost: 1, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "coldoneriders", name: "Cold One Riders", perModel: true, basePoints: 24, unitSize: [5,15],
        options: [
          { id: "lances", type: "toggle", label: "Light lances", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 2, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 2, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 2, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 2, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 2, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "kroxigors", name: "Kroxigors", perModel: true, basePoints: 47, unitSize: [3,9],
        options: [
          { id: "gauntlets", type: "toggle", label: "Replace great weapons with war gauntlets", cost: 0, per: "flat" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 3, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 3, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 3, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 3, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 3, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 3, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 3, per: "model" } ] },
          { id: "cmd", type: "command", roles: ["leader"] } ] },
      { id: "chameleonskinks", name: "Chameleon Skinks", perModel: true, basePoints: 8, unitSize: [5,15],
        options: [
          { id: "slings", type: "toggle", label: "Replace blowpipes with slings & shields", cost: 1, per: "model" },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 1, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 1, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 1, per: "model" }, { label: "Blessed Spawning of Quetzl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Huanchi", cost: 1, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 1, per: "model" },
            { label: "Blessed Spawning of Tzunki", cost: 1, per: "model" } ] },
          { id: "cmd", type: "command", roles: ["leader","musician"] } ] },
      { id: "hornedoneriders", name: "Horned One Riders", perModel: true, basePoints: 21, unitSize: [5,15],
        options: [
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 2, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 2, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 2, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 2, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 2, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 25 } ] },
      { id: "terradonriders", name: "Terradon Riders", perModel: true, basePoints: 22, unitSize: [3,9],
        options: [
          { id: "wep", type: "choice", label: "Replace light lances", choices: [
            { label: "Shortbows", cost: 0, per: "model" }, { label: "Javelins", cost: 1, per: "model" }, { label: "Fireleech bolas", cost: 3, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields", cost: 2, per: "model" },
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 2, per: "model" },
          { id: "extraskink", type: "toggle", label: "Additional Skink", cost: 5, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 2, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 2, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 2, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 2, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 2, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", roles: ["leader"] } ],
        notes: "Terradon Riders with 2 Skinks have a Unit Strength of 3." },
      { id: "ripperdactylriders", name: "Ripperdactyl Riders", perModel: true, basePoints: 30, unitSize: [3,9],
        options: [
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 2, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 2, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 2, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 2, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 2, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 2, per: "model" } ] },
          { id: "cmd", type: "command", roles: ["leader"] } ] },
      { id: "salamander", name: "Salamander", perModel: false, basePoints: 70, unitSize: [1,1], options: [],
        notes: "Comes with 3 Skink Handlers (Mixed Unit)." },
      { id: "razordon", name: "Razordon", perModel: false, basePoints: 50, unitSize: [1,1], options: [],
        notes: "Comes with 3 Skink Handlers (Mixed Unit)." }
    ],

    /* ------------------------------- RARE -------------------------------- */
    rare: [
      { id: "aggradonriders", name: "Aggradon Riders", perModel: true, basePoints: 60, unitSize: [3,6],
        options: [
          { id: "lances", type: "toggle", label: "Light lances", cost: 2, per: "model" },
          { id: "spawn", type: "multi", max: 2, label: "Blessed Spawnings", choices: [
            { label: "Blessed Spawning of Chotec", cost: 3, per: "model" }, { label: "Blessed Spawning of Tepok", cost: 3, per: "model" },
            { label: "Blessed Spawning of Sotek", cost: 3, per: "model" }, { label: "Blessed Spawning of Itzl", cost: 3, per: "model" },
            { label: "Blessed Spawning of Quetzl", cost: 3, per: "model" }, { label: "Blessed Spawning of Tlazcotl", cost: 3, per: "model" } ] },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "ancientsalamander", name: "Ancient Salamander", perModel: false, basePoints: 110, unitSize: [1,1], options: [],
        notes: "Comes with 3 Skink Handlers (Mixed Unit)." },
      { id: "bastiladon", name: "Bastiladon", perModel: false, basePoints: 175, unitSize: [1,1],
        options: [
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 6, per: "flat" },
          { id: "crew", type: "toggle", label: "Additional Skink", cost: 3, per: "flat" },
          { id: "ark", type: "choice", label: "Replace the Ark of Sotek", choices: [
            { label: "Revivification Crystal", cost: 10 }, { label: "Solar Engine", cost: 40 } ] } ] },
      { id: "stegadon", name: "Stegadon", perModel: false, basePoints: 195, unitSize: [1,1],
        options: [
          { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 20, per: "flat" },
          { id: "weapon", type: "choice", label: "Replace the giant bow", choices: [
            { label: "Giant blowpipes", cost: 0 }, { label: "Engine of the Gods", cost: 50 } ] },
          { id: "upg", type: "multi", max: 3, label: "Upgrades", choices: [
            { label: "Unstoppable Stampede", cost: 10 }, { label: "Sharpened Horns", cost: 20 }, { label: "Ancient", cost: 30 } ] } ] },
      { id: "arcanadon", name: "Arcanadon", perModel: false, basePoints: 210, unitSize: [1,1],
        options: [ { id: "venom", type: "toggle", label: "Firefly Frog Venom", cost: 6, per: "flat" } ] },
      { id: "troglodon", name: "Troglodon", perModel: false, basePoints: 155, unitSize: [1,1], options: [] },
      { id: "coatl", name: "Coatl", perModel: false, basePoints: 270, unitSize: [1,1],
        wizardLevel: 2, lores: ["Heavens"], options: [],
        notes: "Level 2 Wizard (Lore of Heavens). Also knows Guardian of the Sacred Places." },
      { id: "dreadsaurian", name: "Dread Saurian", perModel: false, basePoints: 365, unitSize: [1,1],
        options: [
          { id: "howdah", type: "toggle", label: "Howdah", cost: 50, per: "flat" },
          { id: "config", type: "choice", label: "Configuration", choices: [
            { label: "The Shadow Rebus of Huanchi", cost: 25 },
            { label: "Quetzl's Flawless Heartstone", cost: 35 },
            { label: "The Blazing Configuration of Chotec", cost: 35 },
            { label: "The Golden Shroud of Tlazcotl", cost: 35 },
            { label: "Tepok's Crystalline Eye", cost: 45 } ] } ] }
    ]
  }
};
