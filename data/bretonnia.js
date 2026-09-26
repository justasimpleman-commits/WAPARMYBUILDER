/* ============================================================================
   BRETONNIA — army data (Warhammer Armies, Mathias Eliasson v3.0,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA file. See SCHEMA.md for the full field reference.

   Engine-fit notes:
   - VIRTUES of the Chivalric Knight are a top-level `virtues:[]` list. An eligible
     character (virtueEligible:true) may pick ONE virtue from the same budget as its
     magic items. The escalating ×N cost for duplicate virtues across the army is
     handled by the engine — do NOT encode it here.
   - VOWS: Knight's Vow is the free default; the Crusader's/Questing/Grail vows are
     encoded as `choice` options (per-character flat cost on Lords, per-model on the
     Knight units). Units with a baked-in vow (Questing/Grail Knights, Foot Knights
     have it as default with a per-model upgrade) carry it in `rules`.

   Cost convention:
     per: "model"  -> cost is multiplied by the number of models
     per: "flat"   -> cost is added once, regardless of unit size
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["bretonnia"] = {
  id: "bretonnia",
  name: "Bretonnia",
  author: "Mathias Eliasson v3.0 (unofficial) — 9th Edition 3.0",
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
    "Virtues of the Chivalric Knight: a Baron or Paladin may take ONE Virtue, paid from its magic-item budget. If more than one character takes the same Virtue, each extra copy costs ×N the listed price (2nd ×2, 3rd ×3, …) — handled automatically.",
    "Chivalrous Vows: Knight's Vow is the default (free). A Lord may replace it with the Crusader's (+15), Questing (+15) or Grail (+45) Vow; Knight units may upgrade to the Crusader's Vow per model.",
    "Louen Leoncoeur must be the Army General if taken. A Sergeant-at-Arms, Faceless, Priestess of Shallya, Hermit Knight, Green Knight and Suliman may never be the Army General.",
    "Ballista: you may take 1-2 Ballistas as a single Rare choice."
  ],

  // Virtues of the Chivalric Knight — one per eligible character (Baron/Paladin),
  // paid from the magic-item budget. Engine applies the ×N duplicate escalation.
  virtues: [
    { name: "Virtue of Heroism", cost: 35, desc: `The Knight has the Heroic Killing Blow special rule.` },
    { name: "Virtue of Stoicism", cost: 35, desc: `The Knight (and any unit he has joined) gains the Cold-Blooded special rule.` },
    { name: "Virtue of the Ideal", cost: 30, desc: `+2 Weapon Skill, +1 Initiative, +1 Attack. He may not be the army's General, and any friendly unit (including other Knightly characters, or units using a Knight's Leadership) taking any Leadership test within 6" of this model suffers -1 Leadership.` },
    { name: "Virtue of the Impetuous Knight", cost: 30, desc: `The Knight, and any mounted unit he is with, adds +D3" to their charge distance.` },
    { name: "Virtue of Audacity", cost: 30, desc: `Against enemies with a higher Strength than himself (before weapon modifications), the Knight may re-roll any failed rolls to hit and to wound.` },
    { name: "Virtue of Confidence", cost: 25, desc: `The Knight must always issue challenges, and will always accept them if possible. In challenges, he may re-roll all failed rolls to hit and to wound.` },
    { name: "Virtue of Knightly Temper", cost: 25, desc: `For each attack that the Knight hits and wounds with on the charge (after saves), he may make an additional attack. These extra attacks do not themselves generate more attacks.` },
    { name: "Virtue of Devotion", cost: 20, desc: `The Knight is completely immune to the effects of all enemy spells.` },
    { name: "Virtue of Duty", cost: 20, desc: `For as long as the General is alive, this model adds +1 to the combat resolution of any fight of which he is a part. May not be taken by the General.` },
    { name: "Virtue of the Penitent", cost: 20, desc: `The Knight has the Stubborn special rule, though he may never join any friendly units.` },
    { name: "Virtue of the Joust", cost: 20, desc: `The Knight may re-roll failed rolls to hit when charging and/or using a lance (including magical lances).` },
    { name: "Virtue of Discipline", cost: 15, desc: `Enemies can never claim the Outnumber bonus against the Knight and any unit he is with.` },
    { name: "Virtue of Knightly Ardour", cost: 15, desc: `The Knight and the unit he is with may choose to Counter-charge as long as the distance between them and the enemy is less than the enemy unit's Movement value, and even if they failed their charge the previous turn.` },
    { name: "Virtue of Noble Disdain", cost: 15, desc: `The Knight Hates all enemies using missile weapons (including war machine crews). In addition, any unit the Knight has joined never takes Panic tests caused by suffering 25% casualties from Shooting or Magic.` },
    { name: "Virtue of Purity", cost: 15, desc: `The Knight gains a +1 bonus to his Magical Ward save from the Blessing of the Lady.` },
    { name: "Virtue of Utter Serenity", cost: 15, desc: `All enemy Wizards within 12" of this Knight suffer -1 casting penalty.` },
    { name: "Virtue of Empathy", cost: 10, desc: `If not the General, models with the Peasant's Duty within 12" treat him as having Inspiring Presence. If the General, his Inspiring Presence is increased to 18" for models with the Peasant's Duty. He may also join units with the Peasant's Duty.` }
  ],

  magicItems: {
    "Magic Weapons": [
      { name: "Silver Lance of the Blessed", cost: 70, requiresAccess: "heavy lance" },
      { name: "Dragon Slaying Sword", cost: 45, requiresAccess: "great weapon" },
      { name: "Crusader's Lance", cost: 30, requiresAccess: "heavy lance" },
      { name: "Sword of Heroes", cost: 30 },
      { name: "Wyrmlance", cost: 30, requiresAccess: "heavy lance" },
      { name: "Birth-sword of Carcassonne", cost: 25 },
      { name: "Sword of the Quest", cost: 25, only: "Questing Vow" },
      { name: "Heartwood Lance", cost: 25, requiresAccess: "heavy lance" },
      { name: "Frontier Axe", cost: 25, requiresAccess: "great weapon" },
      { name: "The Virtuous Lance", cost: 25, requiresAccess: "heavy lance" },
      { name: "Foebreaker", cost: 20 },
      { name: "Lance of Artois", cost: 15, requiresAccess: "heavy lance" },
      { name: "Sword of the Lady's Champion", cost: 15, only: "Grail Vow" },
      { name: "Sword of the Stout Hearted", cost: 10, requiresAccess: "great weapon" }
    ],
    "Magic Armour": [
      { name: "Armour of the Midsummer Sun", cost: 50, requiresAccess: "heavy armour" },
      { name: "Armour of Agilulf", cost: 40, requiresAccess: { all: ["heavy armour", "shield"] } },
      { name: "Cuirass of Fortune", cost: 40, requiresAccess: "heavy armour" },
      { name: "Anointed Armour", cost: 35, requiresAccess: "heavy armour" },
      { name: "Gromril Great Helm", cost: 35 },
      { name: "Gilded Cuirass", cost: 30, only: "Grail Vow", requiresAccess: "heavy armour" },
      { name: "Helm of the Dragon Slayer", cost: 20 },
      { name: "The Grail Shield", cost: 15, only: "Grail Vow", requiresAccess: "shield" },
      { name: "Orcbane Shield", cost: 15, requiresAccess: "shield" },
      { name: "Ironspike Shield", cost: 10, requiresAccess: "shield" }
    ],
    "Talismans": [
      { name: "Sirienne's Locket", cost: 65, only: "Baron" },
      { name: "Holy Icon", cost: 50 },
      { name: "Insignia of the Quest", cost: 25, only: "Questing Vow" },
      { name: "Token of the Damsel", cost: 20, common: true, only: "Baron or Paladin" },
      { name: "Lucky Heirloom", cost: 15, common: true },
      { name: "Mantle of the Damsel Elena", cost: 10 },
      { name: "Grail Pendant", cost: 10, common: true, only: "Grail Vow" }
    ],
    "Arcane Items": [
      { name: "Sacrament of the Lady", cost: 50 },
      { name: "The Silver Mirror", cost: 45 },
      { name: "Prayer Icon of Quenelles", cost: 45 },
      { name: "The Verdant Heart", cost: 40 },
      { name: "Flamestrike Wand", cost: 35 },
      { name: "Heart of the Wilds", cost: 20 },
      { name: "Chalice of Malfleur", cost: 15 },
      { name: "Potion Sacre", cost: 10, common: true },
      { name: "Diadem of Power", cost: 10 }
    ],
    "Enchanted Items": [
      { name: "The Mane of the Purebreed", cost: 30, only: "Warhorse" },
      { name: "The Ruby Goblet", cost: 25 },
      { name: "Falcon-horn of Fredemund", cost: 20 },
      { name: "The Seal of Parravon", cost: 20 },
      { name: "Wyrmbreath Vial", cost: 20 },
      { name: "Battle Stone of the Marquis", cost: 15 },
      { name: "Crusader's Clarion", cost: 15, only: "Crusader's Vow" },
      { name: "Antlers of the Great Hunt", cost: 10, common: true, only: "Baron or Paladin" },
      { name: "Claw of Malgrimace", cost: 10 },
      { name: "Gauntlet of the Duel", cost: 10, only: "Baron or Paladin" },
      { name: "Tress of Isoulde", cost: 10 }
    ],
    "Magic Standards": [
      { name: "Banner of the Lady's Grace", cost: 50 },
      { name: "The Grail Banner", cost: 50 },
      { name: "Banner of the Lady", cost: 40 },
      { name: "Crusader's Tapestry", cost: 40, only: "Crusader's Vow" },
      { name: "Banner of Defence", cost: 25 },
      { name: "Conqueror's Tapestry", cost: 25 },
      { name: "Errantry Banner", cost: 25, only: "Knights Errant" },
      { name: "Twilight Banner", cost: 25 },
      { name: "Valorous Standard", cost: 25 },
      { name: "Banner of Honourable Warfare", cost: 15 },
      { name: "Banner of the Zealous Knight", cost: 15 },
      { name: "Banners of Chalons", cost: 10 }
    ]
  },

  // Common rulebook magic items (identical across armies — copied verbatim).
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
    "Field Trebuchet": `A field trebuchet is a stone thrower with the following profile: Range 12-60", Strength 5(10), Special Rules: Multiple Wounds (D6).`,
    "Bombard": `A bombard is a cannon with the following profile: Range 12-48", Strength 10, Special Rules: Multiple Wounds (D6). If a misfire is rolled, roll on the Black Powder Misfire Chart as normal but subtract 1 from the result.`,
    /* ---- audited & added from the source PDF (unique upgrades / special rules) ---- */
    // Character mount upgrades (Pegasus / Royal Hippogryph)
    "Iron-hard Hooves": `A Pegasus with this upgrade re-rolls failed To Wound rolls.`,
    "Swift as the Wind": `A Pegasus with this upgrade re-rolls any dice results of a 1 when determining its charge range.`,
    "Shredding Talons": `The Hippogryph gains the Armour Piercing (1) rule.`,
    "Serrated Maw": `The Hippogryph gains the Multiple Wounds (2) special rule.`,
    "Swooping Strike": `The Hippogryph gains the Devastating Charge and Mighty Blow (1) special rules when charging.`,
    "Bloodrage": `The Hippogryph is subject to Frenzy and Hatred.`,
    // Peasant unit upgrades
    "Braziers": `A unit with this upgrade gains the Flaming Attacks special rule for their longbows.`,
    // Special-character & Lady's-blessing rules
    "Supreme Aura of the Lady": `Any unit joined by Morgiana the Fay gains the Magical Attacks special rule. In addition, she causes Terror against Beastmen, Skaven, Goblins and Orcs.`,
    "Supreme Blessing of the Lady": `Morgiana the Fay has the Blessing of the Lady. In addition, the Magical Ward save gained from the Blessing of the Lady is increased by +1 for any unit that is joined by her.`,
    "Favour of the Fay": `One friendly character with a Chivalrous Vow may be given the Favour of the Fay before the game starts but after deployment is finished. This model receives +1 To Hit in close combat. However, if the model loses the Blessing of the Lady, then both the Favoured model and Morgiana the Fay suffer a Wound.`,
    "Aura of the Fey": `If the Green Knight's Wounds value is ever reduced to zero, remove him from play as normal. However, in the Remaining Moves part of the following Bretonnian Movement phase, the player may attempt to reawaken the Green Knight as described in Guardian of the Sacred Sites, following all the same rules. Each time the Green Knight is slain, a -1 is suffered on the next dice roll made to awaken him (so after the first death he awakens on a 4+, after the second on a 5+, etc.). The enemy only gets full Victory Points for the Green Knight if he is not on the table at the end of the game.`,
    "Guardian of the Sacred Sites": `The Green Knight is not deployed with the rest of the army, but follows the entry rules for Ambushers (with the exception that he may appear in the first turn instead of the second). When awoken he must be placed in a forest or water terrain piece anywhere on the table (otherwise from any table edge using the normal Ambushers rules). During the game the Green Knight may disappear at will and reappear in another location.`,
    "Arcane Backlash": `Élise Duchard has a +1 dispel bonus. In addition, if she rolls any natural double when dispelling, treat this as having rolled Ultimate Power. If a spell is dispelled by her rolling two or more natural 6's, the casting Wizard also suffers a Wound which Ignores Armour saves.`,
    "Spirit of the Tempest": `Alberic, and any models in the same unit, may re-roll 1's to Hit in close combat.`,
    "Jules the Jester": `Jules is an Infantry model armed with a hand weapon. Jules must deploy within 6" of Tristan at the start of the game but may move freely after this. He has the Dodge (2+) and The Peasant's Duty special rules. In addition, all enemy units within 6" of Jules suffer a -1 penalty to Hit rolls in close combat.`,
    "Valorous Ballads": `Tristan knows the three songs listed below. He may choose to use one of them at the start of each round of close combat.\n• The Anthem of the Uniter: Tristan and any unit he has joined have the Stubborn special rule this turn.\n• The Battle-hymn of Quenelles: Tristan gains a +D3 Combat Resolution bonus this turn.\n• The Grail Chorale: The Magical Ward save from the Blessing of the Lady is increased by +1 for Tristan and any unit he has joined this turn.`,
    "The Virtue of the Lionheart": `Roll a D3 at the beginning of each close combat phase and add the score to Louen's Strength for the duration of that phase.`,
    "The Lady's Champion": `Louen gains a Magical Ward (4+) from the Blessing of the Lady. However, if he loses the Blessing, he will immediately lose a Wound with no saves allowed.`,
    "The Beastslayers of Bastonne": `If Bohemond the Beastslayer is included in your army, you may upgrade one unit of Foot Knights to the Beastslayers of Bastonne for +1 point per model. This unit gains the Multiple Wounds (2) special rule. The unit must be equipped with polearms.`,
    "The Companions of Quenelles": `If Tancred II is included in your army, you may upgrade one unit of Knights of the Realm to the Companions of Quenelles for +1 point per model. This unit gains the Immunity (Psychology) special rule and a Magical Ward (6+) against Flaming Attacks.`,
    "The Wyrm Slayer": `If Cecil Gastonne kills an enemy Monstrous Infantry, Monstrous Cavalry, Monstrous Beast, Monstrous Creature or Monster model in close combat, he gains the Terror special rule for the remainder of the game.`,
    "The Bowmen of Bergerac": `Bertrand must be accompanied by a unit of Herrimaults chosen from the army list at a cost of 9 points per model. This unit has +1 Ballistic Skill. Little Hugo and Gui the Great are part of the unit's Command Group and must be upgraded at no additional cost. Bertrand is the unit's Leader and may never choose to leave this unit.`,
    "Marksman": `Bertrand may re-roll failed To Hit rolls with missile weapons.`,
    "Hugo le Petit": `Little Hugo is armed with a warbow instead of a longbow.`,
    "Gui le Gros": `As long as Gui the Great is alive, the unit he is with may re-roll failed Leadership tests.`,
    "Warrior of the Sands": `If Odo of Outremer is included in your army then Suliman the Saracen may also be included. Suliman is a Cavalry model armed with a great weapon, light armour and shield, and causes Fear in any turn in which he charges. Odo and Suliman always move and fight together as a unit and may join a unit if you wish. Suliman may never be the Army General.`,

    "The Lance Formation": `Any Cavalry unit with this rule may deploy in / reform into the Lance Formation: it follows the Ranks rules for Monstrous Cavalry. Three models wide ⇒ counts as Lance Formation (wider than three ⇒ no longer in Lance Formation), and may form up to 5 ranks deep. A Wizard may be placed in the centre of the second rank (third for a second Wizard). On a turn it makes a successful charge, every model gains Fight in Extra Ranks (1) and each rider that fights may make up to 2 Supporting Attacks; ranks count double for Steadfast that turn.`,
    "The Blessing of the Lady": `Models with this rule have Magical Ward (6+), increased to Magical Ward (5+) against missile attacks. Models with the Grail Vow always have Magical Ward (5+). A model loses the Blessing if it flees for any reason or refuses a challenge.`,
    "The Knight's Vow": `The model has Immunity (Panic) caused by friendly models without a Chivalrous Vow. May only join units with the Knight's Vow.`,
    "The Crusader's Vow": `Immunity (Panic) from friendlies without a Chivalrous Vow, and may re-roll failed Panic tests. May only join units with the Knight's or Crusader's Vow. A character with this Vow lets any unit it joins roll an additional D6 for charge distance and discard the lowest.`,
    "The Questing Vow": `Immunity (Panic) from friendlies without a Chivalrous Vow, and may re-roll failed Psychology tests. May only join units with the Knight's, Crusader's or Questing Vow. Ignores Initiative penalties from great weapons on any turn it charges, but may not use a heavy lance (unless specified).`,
    "The Grail Vow": `+1 Weapon Skill and +1 Attack (if taken as an upgrade), Immunity (Psychology) and Magical Attacks. May only join units with any Chivalrous Vow. Characters with the Grail Vow add +1 Leadership. Models with the Grail Vow always have Magical Ward (5+) from the Blessing of the Lady.`,
    "The Peasant's Duty": `Models with this rule treat all friendly models with a Chivalrous Vow as having Inspiring Presence (6). Unit standards in such units confer no extra victory points if captured. Characters with the Peasant's Duty may not join units that have a Chivalrous Vow.`,
    "Purebred Warhorse": `Models with this rule suffer no movement penalties for being barded.`,
    "Impetuous": `A unit with one or more models with this rule follows the Berserk Rage rules from Frenzy; if the test is passed it may move normally. Whenever Knights Errant charge, they gain Immunity (Psychology) and may re-roll one of their charge distance dice.`,
    "Favour of the Lady": `Lore Attribute. If a Lore of the Lady spell is successfully cast on a friendly unit with the Blessing of the Lady, it may re-roll Magical Ward rolls of 1 until the start of the next Bretonnian Magic phase.`,
    "Yeomen Guard": `You may upgrade one unit of Men-at-Arms with medium armour for +1 point/model for each Sergeant-at-Arms in your army.`,
    "Healing Hands": `A Priestess of Shallya may only join units with the Peasant's Duty. She may be placed in the second rank of any Infantry unit she joins. Any unit she is with (but not herself) gains Regeneration (6+).`,
    "Prayers of Shallya": `The Priestess knows three Prayers (Shallya's Endurance: +1 Toughness to her unit; Compassionate Mind: Immunity (Psychology) to her unit; Purify: dispel all Hexes on friendly units within 12" and inflict D6 Strength 4 hits on Daemonic/Vampiric/Undead units in base contact). She may attempt one per turn on an unmodified Leadership test; each lasts until the start of her next turn. A unit may be under one Prayer at a time.`,
    "Grail Monk": `A Grail Monk counts as part of the unit's Command Group. A unit with a Grail Monk counts as having one more rank than it actually does for the purpose of Steadfast.`,
    "Defensive Stakes": `Stakes are placed in front of each front-rank model at deployment (within the deployment zone). They are Defended Obstacles. Non-Infantry/non-Swarm troop types suffer D6 Strength 4 hits when charging a unit behind the stakes; enemies in base contact suffer -1 To Hit in the first round of combat. Applies only to the unit's front.`,
    "Hunting Hounds": `Hunting Hounds are War Beasts (Canine). A unit of Squires with Hunting Hounds follows the Mixed Units rules, the Squires being handlers. Up to two Hunting Hounds per Squire may be included.`,
    "Grail Reliquae": `Grail Reliquae follow the rules for Shrines. Only once all the Battle Pilgrims (except the Command Group) are removed does the Reliquae itself start taking wounds. Its presence means the entire unit is affected by the Blessing of the Lady.`,
    "Wall Warden": `A war machine with a Wall Warden may re-roll one failed To Hit roll (Ballista) or one Artillery dice (Trebuchet/Bombard) once per game.`
  },

  unitInfo: {
    /* Character mounts */
    mount_warhorse:{profile:[["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"—",rules:"Purebred Warhorse."},
    mount_horse:{profile:[["Horse",8,3,0,3,3,1,3,1,5]],eq:"—",rules:"War Beast (Equine)."},
    mount_unicorn:{profile:[["Unicorn",10,5,0,4,4,1,5,2,8]],eq:"—",rules:"Impale (Mighty Blow (1) on a turn it charges), Magical Attacks, Magic Resistance (2)."},
    mount_pegasus:{profile:[["Pegasus",8,4,0,4,4,2,4,2,6]],eq:"—",rules:"Fly (9); Iron-hard Hooves, Swift as the Wind."},
    mount_royalpegasus:{profile:[["Royal Pegasus",8,4,0,4,4,3,4,3,7]],eq:"—",rules:"Monstrous Beast (Equine). Fly (9); Iron-hard Hooves, Swift as the Wind."},
    mount_royalhippogryph:{profile:[["Royal Hippogryph",8,5,0,5,5,4,5,4,8]],eq:"—",rules:"Monstrous Creature (Avian-Equine). Fly (8); Shredding Talons, Serrated Maw, Swooping Strike, Bloodrage."},
    /* Characters */
    lords:{profile:[["Baron",4,6,5,4,4,3,6,4,9],["Paladin",4,5,5,4,4,2,5,3,8]],eq:"Hand weapon",rules:"Blessing of the Lady, The Knight's Vow, Lance Formation. One Paladin may be the Battle Standard Bearer."},
    handmaidens:{profile:[["Prophetess",4,4,3,3,3,3,4,2,8],["Grail Damsel",4,3,3,3,3,2,3,1,7]],eq:"Hand weapon",rules:"Blessing of the Lady, Magic Resistance (1). Wizard: Grail Damsel L1 / Prophetess L3 — Beasts, Heavens, Lady, Light, Life."},
    sergeant:{profile:[["Sergeant-at-Arms",4,4,4,4,4,2,4,2,7]],eq:"Hand weapon",rules:"The Peasant's Duty; Yeomen Guard. May never be the Army General."},
    faceless:{profile:[["Faceless",4,4,4,4,4,2,4,2,7]],eq:"Hand weapon, longbow",rules:"Independent, Scouts, Sniper. May never be the Army General."},
    priestess:{profile:[["Priestess of Shallya",4,2,2,3,3,2,3,0,7]],eq:"—",rules:"Magic Resistance (1); Healing Hands, Prayers of Shallya. May never be the Army General."},
    /* Core */
    knightserrant:{profile:[["Knight Errant",4,3,3,3,3,1,3,1,7],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, shield, barding",rules:"Blessing of the Lady, The Knight's Vow, Lance Formation, Purebred Warhorse, Impetuous."},
    knightrealm:{profile:[["Knight of the Realm",4,4,3,3,3,1,3,1,8],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, shield, barding",rules:"Blessing of the Lady, The Knight's Vow, Lance Formation, Purebred Warhorse."},
    menatarms:{profile:[["Man-at-Arms",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, light armour",rules:"The Peasant's Duty."},
    longbowmen:{profile:[["Longbowman",4,2,3,3,3,1,3,1,5]],eq:"Hand weapon, longbow",rules:"The Peasant's Duty."},
    peasantmob:{profile:[["Peasant",4,2,2,3,3,1,3,1,4]],eq:"Hand weapon",rules:"The Peasant's Duty."},
    bidowers:{profile:[["Bidower",4,2,3,3,3,1,3,1,5]],eq:"Hand weapon, javelin",rules:"The Peasant's Duty, Skirmishers."},
    /* Special */
    questingknights:{profile:[["Questing Knight",4,4,3,4,3,1,4,1,8],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Great weapon, heavy armour, shield, barding",rules:"Blessing of the Lady, The Questing Vow, Lance Formation, Purebred Warhorse."},
    pegasusknights:{profile:[["Pegasus Knight",4,4,3,3,3,1,4,1,8],["Pegasus",8,3,0,4,4,2,4,2,6]],eq:"Heavy lance, heavy armour, shield, barding",rules:"Blessing of the Lady, Fly (9), The Knight's Vow."},
    footknights:{profile:[["Foot Knight",4,4,3,3,3,1,3,1,8]],eq:"Hand weapon, heavy armour",rules:"Blessing of the Lady, The Knight's Vow."},
    squires:{profile:[["Squire",4,3,3,3,3,1,3,1,6],["Hunting Hound",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon, longbow",rules:"The Peasant's Duty, Skirmishers; Hunting Hounds."},
    yeomen:{profile:[["Yeoman",4,3,3,3,3,1,3,1,6],["Horse",8,3,0,3,3,1,3,1,5]],eq:"Hand weapon",rules:"Fast Cavalry, The Peasant's Duty."},
    battlepilgrims:{profile:[["Battle Pilgrim",4,3,3,3,3,1,3,1,8],["Grail Reliquae",4,3,3,3,3,6,3,4,8]],eq:"Hand weapon, shield",rules:"Hatred, Loner, The Peasant's Duty, Stubborn; Grail Reliquae."},
    herrimaults:{profile:[["Herrimault",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, longbow",rules:"Independent, Scouts, Skirmishers."},
    brigands:{profile:[["Brigand",4,3,3,3,3,1,3,1,6]],eq:"Great weapon, light armour",rules:"Independent."},
    /* Rare */
    grailknights:{profile:[["Grail Knight",4,5,3,4,4,1,5,2,9],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, shield, barding",rules:"Blessing of the Lady, The Grail Vow, Lance Formation, Purebred Warhorse."},
    hippogryphknights:{profile:[["Hippogryph Knight",4,4,3,4,3,1,4,1,8],["Hippogryph",8,4,0,5,4,3,4,3,7]],eq:"Heavy lance, heavy armour, shield",rules:"Blessing of the Lady, Fly (8), The Knight's Vow."},
    ballista:{profile:[["Ballista","-","-","-","-",7,"-","-","-","-"],["Peasant Crew",4,2,3,3,3,1,3,1,5],["Wall Warden",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, bolt thrower. Crew of 3 Peasant Crew.",rules:"The Peasant's Duty; Wall Warden. War Machine. 1-2 per Rare choice."},
    trebuchet:{profile:[["Field Trebuchet","-","-","-","-",7,"-","-","-","-"],["Peasant Crew",4,2,3,3,3,1,3,1,5],["Wall Warden",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, field trebuchet. Crew of 3.",rules:"The Peasant's Duty; Wall Warden. War Machine."},
    bombard:{profile:[["Bombard","-","-","-","-",7,"-","-","-","-"],["Peasant Crew",4,2,3,3,3,1,3,1,5],["Wall Warden",4,3,3,3,3,1,3,1,6]],eq:"Hand weapon, bombard. Crew of 3.",rules:"The Peasant's Duty; Wall Warden. War Machine."},
    /* Special characters */
    louen:{profile:[["Louen Leoncoeur",4,7,5,4,4,3,7,5,10],["Beaquis (Royal Hippogryph)",8,5,0,5,5,4,6,4,8]],eq:"Sword of Couronne, The Lion Lance, Armour of Brilliance, The Lion's Shield, The Tabard of Kings, The Crown of Bretonnia",rules:"Blessing of the Lady, The Grail Vow, Lance Formation; The Virtue of the Lionheart, The Lady's Champion. Must be the Army General."},
    bohemund:{profile:[["Bohemond the Beastslayer",4,7,5,4,4,3,6,5,10],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, barding; The Beast Mace of Bastonne, Bohemond's Shield",rules:"Blessing of the Lady, The Grail Vow, Hatred (Beastmen, Goblins, Orcs, Skaven), Lance Formation, Purebred Warhorse, Virtue of Heroism; The Beastslayers of Bastonne. Cavalry."},
    tancred:{profile:[["Tancred II",4,7,5,4,4,3,6,5,10],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, barding; The Blade of Banishment, The Grail Shield, Blessed Draught",rules:"Blessing of the Lady, The Grail Vow, Lance Formation, Purebred Warhorse, Virtue of Purity; The Companions of Quenelles. Cavalry."},
    alberic:{profile:[["Alberic of Bordeleaux",4,6,5,4,4,3,6,4,9],["Tempete (Royal Hippogryph)",8,5,0,5,5,4,5,4,8]],eq:"Heavy armour, shield; Trident of Manann, Braid of Bordeleaux",rules:"Blessing of the Lady, The Knight's Vow, Lance Formation, Purebred Warhorse, Virtue of Discipline; Spirit of the Tempest."},
    cecil:{profile:[["Cecil Gastonne",4,7,5,4,4,3,5,4,9]],eq:"Heavy armour, shield; Sorrow's End, Dragonhide Cloak",rules:"Blessing of the Lady, The Knight's Vow; The Wyrm Slayer."},
    repanse:{profile:[["Repanse of Lyonesse",4,4,3,3,3,2,4,2,8]],eq:"Heavy armour; Sword of Lyonesse, The Fleur de Lys Banner (Battle Standard)",rules:"Blessing of the Lady, Lance Formation, Magic Resistance (3), The Knight's Vow, Purebred Warhorse, Terror."},
    tristan:{profile:[["Tristan the Trobadour",4,5,5,4,4,2,5,3,8],["Jules the Jester",4,2,2,3,3,1,4,1,6],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy lance, heavy armour, shield, barding (Tristan)",rules:"Blessing of the Lady, Lance Formation, The Questing Vow, Purebred Warhorse, Virtue of Noble Disdain; Jules the Jester, Valorous Ballads. May use a heavy lance despite the Questing Vow. Cavalry."},
    odo:{profile:[["Odo of Outremer",4,6,5,4,4,2,5,3,8],["Suliman the Saracen",5,5,3,4,4,2,6,3,8],["Warhorse",8,3,0,3,3,1,3,1,5]],eq:"Heavy armour, shield, barding; Morning Star of Fracasse",rules:"Blessing of the Lady, Lance Formation, The Crusader's Vow, Purebred Warhorse, Virtue of Confidence; Warrior of the Sands. Suliman may never be the Army General. Cavalry."},
    hermit:{profile:[["The Hermit Knight",4,6,5,4,4,2,6,4,9]],eq:"Heavy armour; Sword of Virtue, Flask of Sangdragon",rules:"Blessing of the Lady, The Grail Vow, Virtue of the Penitent. May never be the Army General."},
    morgiana:{profile:[["Morgiana the Fay",5,4,4,3,3,3,5,2,9],["Silvaron (Unicorn)",10,5,0,4,4,1,5,2,8]],eq:"Hand weapon; The Girdle of Gold, The Chalice of Potions, Morgiana's Mirror, Toad Familiar",rules:"Fear, Magic Resistance (1); Supreme Aura of the Lady, Favour of the Fay, Supreme Blessing of the Lady. Level 4 Wizard — Beasts, Heavens, Lady, Light, Life."},
    elise:{profile:[["Élise Duchard",4,4,3,3,3,3,4,2,8],["Ariandir (Unicorn)",10,5,0,4,4,1,5,2,8]],eq:"Hand weapon; The Staff of the Elements, Chalice Of Brionne",rules:"Aura of the Lady, Impale & Magical Attacks (Ariandir only), Magic Resistance (1); Arcane Backlash. Level 3 Wizard — Heavens, Life. Cavalry."},
    greenknight:{profile:[["The Green Knight",4,7,3,4,4,3,6,4,10],["The Shadow Steed",9,4,0,4,3,1,4,2,6]],eq:"Heavy armour, shield; The Dolorous Blade",rules:"Ethereal, Terror, Unstable; Aura of the Fey, Guardian of the Sacred Sites. May never be the Army General. Cavalry (Spirit)."},
    bertrand:{profile:[["Bertrand",4,5,6,4,4,2,6,3,8],["Little Hugo",4,4,4,5,4,1,4,2,7],["Gui the Great",4,2,2,3,3,1,4,1,6]],eq:"Hand weapon, longbow; The Black Arrow",rules:"Loner, Scouts, Skirmisher, Sniper; The Bowmen of Bergerac, Marksman, Hugo le Petit, Gui le Gros."}
  },

  itemDesc: {
    /* -- Magic Weapons (army) -- */
    "Silver Lance of the Blessed":`Heavy lance. If the model has the Blessing of the Lady, all attacks with the lance automatically hit and all successful enemy armour saves and Magical Wards must be re-rolled. However, if the model flees for any reason, he suffers D6 Flaming Strength 4 hits with Ignores Armour Saves.`,
    "Dragon Slaying Sword":`Great weapon. The wielder gains Multiple Wounds (D6) against Draconids.`,
    "Crusader's Lance":`Heavy lance. Gives the wielder Devastating Charge and Hatred.`,
    "Sword of Heroes":`Against enemies with Toughness 5 or greater, the bearer gets +2 Strength and Multiple Wounds (D3).`,
    "Wyrmlance":`Heavy lance. The wielder gains a Strength 3 Breath Weapon with Flaming Attacks. All attacks made with the Wyrmlance have Flaming Attacks.`,
    "Birth-sword of Carcassonne":`+1 Strength. Enemies wounded by the sword must re-roll successful armour saves.`,
    "Sword of the Quest":`Questing Vow only. May be used as a hand weapon or a great weapon, decided at the start of each round of combat. All attacks have Ignores Armour Saves.`,
    "Heartwood Lance":`Heavy lance. Allows the bearer to re-roll all failed rolls to wound.`,
    "Frontier Axe":`Great weapon. All attacks have Multiple Wounds (2).`,
    "The Virtuous Lance":`Heavy lance. Gives Mighty Blow (1) and Multiple Wounds (D3) when charging. Against Monstrous Creatures and Monsters, once wounds are established, roll a D6 and add the number of wounds caused; on 6+ the model is removed as a casualty (at least one unsaved wound required).`,
    "Foebreaker":`+1 Strength. Any enemy Character or Lone Model that suffers one or more unsaved wounds suffers -1 Weapon Skill and -1 Attacks (min 1) until the end of the next round of close combat.`,
    "Lance of Artois":`Heavy lance. Gives the wielder Killing Blow on turns in which the character charges.`,
    "Sword of the Lady's Champion":`Character with the Grail Vow only. The character always counts their Strength as one higher than their target's Toughness, unless their Strength would normally be higher than this.`,
    "Sword of the Stout Hearted":`Great weapon. Gives the wielder Immunity (Psychology).`,
    /* -- Magic Armour (army) -- */
    "Armour of the Midsummer Sun":`Heavy armour. Opponents suffer -1 To Hit the wearer with both missile and close combat attacks.`,
    "Armour of Agilulf":`Heavy armour and shield. The wearer gains Weapon Skill 10, but may not use a weapon that Requires Two Hands.`,
    "Cuirass of Fortune":`Heavy armour. The Knight may re-roll 1's when rolling To Hit, To Wound and when making armour saves.`,
    "Anointed Armour":`Infantry or Cavalry only. Heavy armour. The wearer may re-roll failed Magical Ward saves as long as they have the Blessing of the Lady.`,
    "Gromril Great Helm":`Infantry or Cavalry only. Gives a 6+ armour save and allows the wearer to re-roll failed armour saves.`,
    "Gilded Cuirass":`Grail Vow only. Heavy armour. The wearer gains Regeneration (6+).`,
    "Helm of the Dragon Slayer":`Gives a 6+ armour save. The Ward Save from the Blessing of the Lady is increased to 5+ against close combat attacks, and the wearer gains Immunity (Flaming Attacks).`,
    "The Grail Shield":`Grail Vow only. Shield. The wearer gains +1 to the Magical Ward save from the Blessing of the Lady.`,
    "Orcbane Shield":`Shield. Any Orc or Goblin unit within 12" that must take an Animosity test fails it on a 1-2 instead of a 1.`,
    "Ironspike Shield":`Shield. Whenever an enemy model rolls a natural 1 To Hit against the bearer, they immediately suffer a Strength 3 hit with Armour Piercing (1).`,
    /* -- Talismans (army) -- */
    "Sirienne's Locket":`Baron only. The bearer has Immunity (Killing Blow, Multiple Wounds) and can never suffer more than one wound in any one phase. May still be run down by pursuers and affected by other "instant kill" attacks.`,
    "Holy Icon":`The bearer and any unit they are with gain Immunity (Psychology) and Magic Resistance (3).`,
    "Insignia of the Quest":`Questing Vow only. If the bearer is ever reduced to 1 Wound, they instantly gain Magical Ward (3+) as long as they remain at 1 Wound. If an attack would kill them before this (Killing Blow / Multiple Wounds), they are reduced to 1 Wound, then may attempt the Magical Ward (3+) save.`,
    "Token of the Damsel":`Baron or Paladin only. One use only. The wearer ignores the first wounding hit (after saves) suffered during the game.`,
    "Lucky Heirloom":`Once per Close Combat phase, the bearer may re-roll a single failed roll To Hit or To Wound, or re-roll a failed armour save or Magical Ward save roll.`,
    "Mantle of the Damsel Elena":`The wearer gains Immunity (Killing Blow, Poisoned Attacks).`,
    "Grail Pendant":`Grail Vow only. One use only. When the wearer loses their last Wound, roll a D6; on 2+ the Wound is not lost.`,
    /* -- Arcane Items (army) -- start with Relic./Charm./Staff. -- */
    "Sacrament of the Lady":`Relic. May be used at the start of any Bretonnian Magic phase. The model adds 2D3 Power Dice to your power pool, but may not cast any spells that turn.`,
    "The Silver Mirror":`Charm. One use only. Deflects a spell cast at the bearer or their unit back at the enemy caster (who may try to dispel it). No effect on spells that do not specifically target the bearer or their unit.`,
    "Prayer Icon of Quenelles":`Relic. The bearer and the unit they are with gain +1 to the Magical Ward save from the Blessing of the Lady.`,
    "The Verdant Heart":`Relic. Gives a +D3 casting bonus when using the Lore of Life. Roll for each spell casting attempt.`,
    "Flamestrike Wand":`Relic. Bound Spell. Contains the Fires of U'Zhul spell from the Lore of Fire.`,
    "Heart of the Wilds":`Relic. The bearer gains a +2 casting bonus if wholly within a forest or water terrain feature.`,
    "Chalice of Malfleur":`Relic. At the start of the opponent's Magic phase the bearer may drink: on a 1 they suffer a wound with no saves (including invulnerable); on 2-6 an extra Dispel dice is added to the player's pool.`,
    "Potion Sacre":`Charm. One use only. Used before rolling the dice to cast or dispel a spell. After rolling, the player may add +1 to the result of one dice — may cause Ultimate Power or prevent a Miscast.`,
    "Diadem of Power":`Relic. The bearer gains a +1 casting bonus when casting magical missiles, direct damage or magical vortex spells.`,
    /* -- Enchanted Items (army) -- */
    "The Mane of the Purebreed":`Model on Warhorse only. Gives +1 Strength to all Warhorses in the unit the model is with.`,
    "The Ruby Goblet":`Takes effect at the end of the first phase during which the bearer or their unit suffers an unsaved wound. From then on, the bearer and any unit they are with cannot be wounded on better than a 3+ from any non-magical source.`,
    "Falcon-horn of Fredemund":`One use only. May be sounded at the start of any Bretonnian turn. Until the start of your next turn, no enemy unit may use the Fly special rule.`,
    "The Seal of Parravon":`The bearer will always Hit on a 2+ in close combat.`,
    "Wyrmbreath Vial":`One use only. The bearer gains a Breath Weapon attack with Strength 4, Flaming Attacks and Magical Attacks.`,
    "Battle Stone of the Marquis":`One use only. Used at the start of any close combat phase. The bearer (but not any mount) gains +3 Attacks for this round of close combat.`,
    "Crusader's Clarion":`Cavalry with the Crusader's Vow only. On a turn the bearer charges, their mount and all mounts in the unit they have joined may re-roll failed rolls To Wound (including Impact Hits).`,
    "Antlers of the Great Hunt":`Baron or Paladin only. The model and any unit they are with roll an additional dice when pursuing and discard the lowest result.`,
    "Claw of Malgrimace":`When fighting Monstrous Creatures and Monsters, the bearer may deduct D3 Attacks from his opponent (not including any rider), to a minimum of 1.`,
    "Gauntlet of the Duel":`Baron or Paladin only. Any challenge issued by the bearer cannot be refused.`,
    "Tress of Isoulde":`One use only. Nominate one enemy Character, Monstrous Creature or Monster in base contact at the beginning of any Close Combat phase (after challenges). The bearer automatically hits that model that round, regardless of other modifiers.`,
    /* -- Magic Standards (army) -- */
    "Banner of the Lady's Grace":`The unit ignores all negative modifiers to its Leadership characteristic.`,
    "The Grail Banner":`All friendly units within 12" of this standard gain +1 Leadership.`,
    "Banner of the Lady":`All enemy units in base contact with the bearer get no combat resolution bonus for ranks.`,
    "Crusader's Tapestry":`Crusader's Vow only. The unit gains Frenzy.`,
    "Banner of Defence":`The unit may re-roll failed Magical Ward saves from the Blessing of the Lady against missile attacks.`,
    "Conqueror's Tapestry":`The unit gains +1 Combat Resolution Bonus for the rest of the game for every enemy unit destroyed in close combat or through pursuit.`,
    "Errantry Banner":`Knights Errant only. All Knights Errant in the unit get +1 Strength on any turn they charge. The unit suffers -2 to its Ld for any Impetuous tests.`,
    "Twilight Banner":`One use only. Used at the start of any of your Movement phases. For the rest of that Movement phase, the unit gains the Ethereal special rule.`,
    "Valorous Standard":`The unit gains the Cold-Blooded special rule.`,
    "Banner of Honourable Warfare":`The unit may re-roll any failed rolls To Hit during the first round of close combat when engaged with an enemy equipped with any missile weapons.`,
    "Banner of the Zealous Knight":`The unit gains the Vanguard special rule.`,
    "Banners of Chalons":`Enemy units cannot choose Stand & Shoot as a charge reaction against the unit carrying this banner.`
  },

  // The Lore of the Lady — Bretonnia's own lore. Standard lores come from COMMON_LORES.
  spellLores: {
    "Lady": {
      attribute: { name: "Favour of the Lady", text: `If a spell from the Lore of the Lady is successfully cast on a friendly unit that has the Blessing of the Lady, it may re-roll Magical Ward rolls of 1 until the start of the next Bretonnian Magic phase.` },
      spells: [
        { name: "The Lady's Gift", lvl: 0, cast: 6, type: "Augment (RIP)", range: `18"`, effect: `Remains in Play. Targets a unit with a Chivalrous Vow. While in effect, the target unit has Regeneration (6+).` },
        { name: "Mist of Châlons", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `All missile attacks targeting the unit suffer -1 To Hit until the start of the caster's next Magic phase.` },
        { name: "Beguilement of Blondel", lvl: 1, cast: 6, type: "Hex (RIP)", range: `24"`, effect: `Remains in Play. While in effect, the target is subject to the Stupidity special rule.` },
        { name: "Doom of Dol", lvl: 2, cast: 7, type: "Hex (RIP)", range: `24"`, effect: `Remains in Play. Targets a single enemy Character or Lone Model. Choose one friendly character with any Chivalrous Vow; while active, that Knight Hits and Wounds the enemy model on a 2+ with Ignores Armour Saves.` },
        { name: "Steed of the Lady", lvl: 2, cast: 7, type: "Conveyance", range: `18"`, effect: `Targets Cavalry or Monstrous Cavalry with a Chivalrous Vow. The target may immediately make a normal move as if it were the Remaining Moves sub-phase.` },
        { name: "The Lady's Wrath", lvl: 3, cast: 9, type: "Augment", range: `18"`, effect: `Targets a unit with a Chivalrous Vow. +1 Strength (excluding mounts) and Armour Piercing (1) until the start of your next Magic phase.` },
        { name: "Shield of the Lady", lvl: 3, cast: 10, type: "Augment", range: `18"`, effect: `Targets a unit with a Chivalrous Vow. The target may re-roll failed armour saves until the start of your next Magic phase.` },
        { name: "The Curse of the Lady", lvl: 4, cast: 11, type: "Hex", range: `12"`, effect: `Targets a single model (even a character in a unit). If cast, the enemy is turned into a frog. At the start of each enemy turn it tests Leadership; if passed it reverts (random facing), if failed move the marker D6" randomly. Still a frog at game end ⇒ treated as a casualty.` },
        { name: "Chivalric Onslaught", lvl: 4, cast: 12, type: "Augment", range: `18"`, effect: `Targets a unit with a Chivalrous Vow. Until the start of the caster's next Magic phase, all models in the unit (excluding mounts) gain +1 To Hit and the Devastating Charge special rule.` }
      ]
    }
  },

  units: {
    /* ---------------------------- CHARACTERS ---------------------------- */
    characters: [
      {
        id: "lords", name: "Lords (Baron / Paladin)", isCharacter: true, virtueEligible: true,
        access: ["halberd","great weapon","heavy armour","shield","barding","heavy lance"],
        variants: [
          { name: "Baron", points: 100, magicBudget: 100 },
          { name: "Paladin", points: 60, magicBudget: 50 }
        ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Heavy lance", cost: 10 }, { label: "Polearm (on foot only)", cost: 10 }, { label: "Great weapon", cost: 15 } ] },
          { id: "armour", type: "toggle", label: "Heavy armour", cost: 18, per: "flat" },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 15, key: "warhorse" }, { label: "Pegasus", cost: 25, key: "pegasus" }, { label: "Royal Pegasus", cost: 40, key: "royalpegasus" }, { label: "Royal Hippogryph (Baron only)", cost: 150, only: "Baron", key: "royalhippogryph" } ] },
          { id: "peg_hooves", type: "toggle", label: "Iron-hard Hooves", cost: 5, per: "flat", requiresMount: ["pegasus","royalpegasus"] },
          { id: "peg_swift", type: "toggle", label: "Swift as the Wind", cost: 5, per: "flat", requiresMount: ["pegasus","royalpegasus"] },
          { id: "peg_barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: ["warhorse","pegasus","royalpegasus"] },
          { id: "hip_talons", type: "toggle", label: "Shredding Talons", cost: 5, per: "flat", requiresMount: "royalhippogryph" },
          { id: "hip_maw", type: "toggle", label: "Serrated Maw", cost: 15, per: "flat", requiresMount: "royalhippogryph" },
          { id: "hip_swoop", type: "toggle", label: "Swooping Strike", cost: 15, per: "flat", requiresMount: "royalhippogryph" },
          { id: "hip_rage", type: "toggle", label: "Bloodrage", cost: 30, per: "flat", requiresMount: "royalhippogryph" },
          { id: "hip_barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: "royalhippogryph" },
          { id: "vow", type: "choice", label: "Replace the Knight's Vow", choices: [
            { label: "The Crusader's Vow", cost: 15 }, { label: "The Questing Vow", cost: 15 }, { label: "The Grail Vow", cost: 45 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard Bearer (one Paladin only)", cost: 25, per: "flat", only: "Paladin", bsb: true }
        ],
        notes: "Default Knight's Vow (free). The BSB (Paladin) may carry a Magic Standard with no points limit, in addition to other Magic Items. A Baron or Paladin may take ONE Virtue from its magic-item budget."
      },
      {
        id: "handmaidens", name: "Handmaidens of the Lady (Prophetess / Grail Damsel)", isCharacter: true, cannotBeGeneral: false,
        access: ["barding"],
        lores: ["Lady","Beasts","Heavens","Light","Life"],
        variants: [
          { name: "Prophetess", points: 170, wizardLevel: 3, magicBudget: 100 },
          { name: "Grail Damsel", points: 75, wizardLevel: 1, magicBudget: 50 }
        ],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 15, key: "warhorse" }, { label: "Pegasus", cost: 25, key: "pegasus" }, { label: "Unicorn (Prophetess only)", cost: 25, only: "Prophetess", key: "unicorn" } ] },
          { id: "peg_hooves", type: "toggle", label: "Iron-hard Hooves", cost: 5, per: "flat", requiresMount: "pegasus" },
          { id: "peg_swift", type: "toggle", label: "Swift as the Wind", cost: 5, per: "flat", requiresMount: "pegasus" },
          { id: "peg_barding", type: "toggle", label: "Barding", cost: 5, per: "flat", requiresMount: ["warhorse","pegasus"] }
        ]
      },
      {
        id: "sergeant", name: "Sergeant-at-Arms", isCharacter: true, cannotBeGeneral: true,
        access: ["lance","halberd","great weapon","light armour","medium armour","shield"],
        variants: [ { name: "Sergeant-at-Arms", points: 40, magicBudget: 0 } ],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Light lance", cost: 5 }, { label: "Polearm (on foot only)", cost: 5 }, { label: "Great weapon", cost: 10 } ] },
          { id: "bow", type: "choice", label: "Missile weapon", choices: [
            { label: "Shortbow", cost: 3 }, { label: "Longbow", cost: 5 }, { label: "Crossbow", cost: 6 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 5 }, { label: "Medium armour", cost: 10 } ] },
          { id: "shield", type: "toggle", label: "Shield", cost: 5, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Horse", cost: 15 } ] }
        ],
        notes: "May never be the Army General. Has no magic-item allowance. Yeomen Guard: each Sergeant-at-Arms lets one Men-at-Arms unit take medium armour for +1/model."
      },
      {
        id: "faceless", name: "Faceless", isCharacter: true, cannotBeGeneral: true,
        access: ["additional hand weapon","light armour"],
        variants: [ { name: "Faceless", points: 40, magicBudget: 0 } ],
        options: [
          { id: "ahw", type: "toggle", label: "Additional hand weapon", cost: 5, per: "flat" },
          { id: "la", type: "toggle", label: "Light armour", cost: 5, per: "flat" }
        ],
        notes: "May never be the Army General. No magic-item allowance."
      },
      {
        id: "priestess", name: "Priestess of Shallya", isCharacter: true, cannotBeGeneral: true,
        access: [],
        variants: [ { name: "Priestess of Shallya", points: 70, magicBudget: 50 } ],
        options: [],
        notes: "May never be the Army General. Not a Wizard — knows three Prayers of Shallya (see rules)"
      },
      /* -------- Special characters -------- */
      {
        id: "louen", name: "Louen Leoncoeur", isCharacter: true, isSpecialChar: true, mustBeGeneral: true,
        access: ["lance","shield"],
        variants: [ { name: "Louen Leoncoeur", points: 385, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 18 }, { label: "Pegasus", cost: 30 }, { label: "Royal Pegasus", cost: 45 }, { label: "Beaquis (Royal Hippogryph)", cost: 155 } ] }
        ],
        notes: "Must be the Army General."
      },
      {
        id: "bohemund", name: "Bohemund the Beastslayer", isCharacter: true, isSpecialChar: true,
        access: ["lance","heavy armour","shield","barding"],
        variants: [ { name: "Bohemund the Beastslayer", points: 300, magicBudget: 0 } ], options: [],
        notes: "Cavalry on Warhorse. The Beastslayers of Bastonne: one Foot Knights unit may be upgraded (+1/model) — see Foot Knights option."
      },
      {
        id: "tancred", name: "Tancred II", isCharacter: true, isSpecialChar: true,
        access: ["lance","heavy armour","shield","barding"],
        variants: [ { name: "Tancred II", points: 250, magicBudget: 0 } ], options: [],
        notes: "Cavalry on Warhorse. The Companions of Quenelles: one Knights of the Realm unit may be upgraded (+1/model) — see Knight of the Realm option."
      },
      {
        id: "alberic", name: "Alberic of Bordeleaux", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour","shield"],
        variants: [ { name: "Alberic of Bordeleaux", points: 175, magicBudget: 25 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Warhorse", cost: 18 }, { label: "Tempete (Royal Hippogryph)", cost: 150 } ] }
        ],
        notes: "May take Magic Items up to 25 points."
      },
      {
        id: "cecil", name: "Cecil Gastonne", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour","shield"],
        variants: [ { name: "Cecil Gastonne", points: 190, magicBudget: 0 } ], options: []
      },
      {
        id: "repanse", name: "Repanse of Lyonesse", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour","lance","shield"],
        variants: [ { name: "Repanse of Lyonesse", points: 185, magicBudget: 0 } ],
        options: [
          { id: "wep", type: "toggle", label: "Heavy lance", cost: 4, per: "flat" },
          { id: "shield", type: "toggle", label: "Shield", cost: 2, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Warhorse", cost: 12 } ] }
        ],
        notes: "Carries The Fleur de Lys Banner — she is the army's Battle Standard."
      },
      {
        id: "tristan", name: "Tristan the Trobadour", isCharacter: true, isSpecialChar: true,
        access: ["heavy armour","shield","barding","heavy lance"],
        variants: [ { name: "Tristan the Trobadour", points: 145, magicBudget: 25 } ], options: [],
        notes: "Cavalry on Warhorse, accompanied by Jules the Jester. May take Magic Items up to 25 points. May use a heavy lance despite the Questing Vow."
      },
      {
        id: "odo", name: "Odo of Outremer", isCharacter: true, isSpecialChar: true,
        access: ["morning star","heavy armour","shield","barding"],
        variants: [ { name: "Odo of Outremer", points: 130, magicBudget: 25 } ], options: [],
        notes: "Cavalry on Warhorse. If taken, Suliman the Saracen (+85, in profile) may also be included; Suliman may never be the Army General. May take Magic Items up to 25 points."
      },
      {
        id: "hermit", name: "The Hermit Knight of Malmont", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
        access: ["heavy armour"],
        variants: [ { name: "The Hermit Knight", points: 170, magicBudget: 0 } ], options: [],
        notes: "May never be the Army General. The Grail Vow is included in the profile."
      },
      {
        id: "morgiana", name: "Morgiana the Fay", isCharacter: true, isSpecialChar: true,
        access: [],
        lores: ["Lady","Beasts","Heavens","Light","Life"],
        variants: [ { name: "Morgiana the Fay", points: 420, wizardLevel: 4, magicBudget: 0 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Silvaron (Unicorn)", cost: 25 } ] }
        ],
        notes: "Level 4 Wizard. Carries fixed Magic Items (no further allowance)"
      },
      {
        id: "elise", name: "Lady Elise Duchard", isCharacter: true, isSpecialChar: true,
        access: [],
        lores: ["Heavens","Life"],
        variants: [ { name: "Lady Elise Duchard", points: 295, wizardLevel: 3, magicBudget: 0 } ], options: [],
        notes: "Level 3 Wizard (Heavens or Life only). Cavalry on Ariandir (Unicorn). Carries fixed Magic Items (no further allowance)"
      },
      {
        id: "greenknight", name: "The Green Knight", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
        access: ["heavy armour","shield"],
        variants: [ { name: "The Green Knight", points: 240, magicBudget: 0 } ], options: [],
        notes: "May never be the Army General."
      },
      {
        id: "bertrand", name: "Bertrand the Brigand", isCharacter: true, isSpecialChar: true, cannotBeGeneral: true,
        access: [],
        variants: [ { name: "Bertrand", points: 90, magicBudget: 0 } ], options: [],
        notes: "Must be accompanied by a unit of Herrimaults at 9 points/model (with +1 BS); Little Hugo and Gui the Great join that unit's Command Group at no cost."
      }
    ],

    /* ------------------------------- CORE ------------------------------- */
    core: [
      {
        id: "knightserrant", name: "Knights Errant", perModel: true, basePoints: 21, unitSize: [5,15], keyword: "knightserrant",
        options: [
          { id: "vow", type: "toggle", label: "Replace Knight's Vow with the Crusader's Vow", cost: 1, per: "model" },
          { id: "cmd", type: "command", magicStandard: 25 }
        ],
      },
      {
        id: "knightrealm", name: "Knight of the Realm", perModel: true, basePoints: 25, unitSize: [5,15],
        options: [
          { id: "vow", type: "toggle", label: "Replace Knight's Vow with the Crusader's Vow", cost: 1, per: "model" },
          { id: "companions", type: "toggle", label: "Companions of Quenelles (Tancred II)", cost: 1, per: "model", requires: { unit: "tancred" }, oncePerArmy: true },
          { id: "cmd", type: "command", magicStandard: 50 }
        ],
      },
      {
        id: "menatarms", name: "Men-at-Arms", perModel: true, basePoints: 3, unitSize: [15,45],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Spears", cost: 0.5, per: "model" }, { label: "Polearms", cost: 2, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "medarm", type: "toggle", label: "Yeomen Guard: medium armour (per Sergeant-at-Arms)", cost: 1, per: "model", requires: { unit: "sergeant" }, limitByUnit: ["sergeant"] },
          { id: "monk", type: "toggle", label: "Upgrade one Man-at-Arms to a Grail Monk", cost: 5, per: "flat" },
          { id: "cmd", type: "command" }
        ],
        notes: "Grail Monk counts as part of the Command Group."
      },
      {
        id: "longbowmen", name: "Longbowmen", perModel: true, basePoints: 6, unitSize: [10,30],
        options: [
          { id: "la", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "buck", type: "toggle", label: "Bucklers", cost: 0.5, per: "model" },
          { id: "braz", type: "toggle", label: "Braziers (Flaming Attacks for longbows)", cost: 0.5, per: "model" },
          { id: "stakes", type: "toggle", label: "Defensive stakes", cost: 1, per: "model" },
          { id: "cmd", type: "command" }
        ],
      },
      {
        id: "peasantmob", name: "Peasant Mob", perModel: true, basePoints: 2, unitSize: [20,60],
        options: [
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Spears", cost: 0.5, per: "model" }, { label: "Flails", cost: 2, per: "model" }, { label: "Polearms", cost: 2, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields (if armed with spears)", cost: 1, per: "model" },
          { id: "cmd", type: "command" }
        ],
      },
      {
        id: "bidowers", name: "Bidowers", perModel: true, basePoints: 5, unitSize: [10,30],
        options: [
          { id: "slings", type: "toggle", label: "Replace javelins with slings", cost: 0, per: "flat" },
          { id: "buck", type: "toggle", label: "Bucklers", cost: 0.5, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" },
          { id: "mus", type: "toggle", label: "Musician", cost: 5, per: "flat" }
        ],
        notes: "(No Standard Bearer option.)"
      }
    ],

    /* ------------------------------ SPECIAL ----------------------------- */
    special: [
      {
        id: "questingknights", name: "Questing Knights", perModel: true, basePoints: 26, unitSize: [5,15],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ],
      },
      {
        id: "pegasusknights", name: "Pegasus Knights", perModel: true, basePoints: 50, unitSize: [3,9],
        options: [
          { id: "vow", type: "toggle", label: "Replace Knight's Vow with the Crusader's Vow", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 }
        ],
      },
      {
        id: "footknights", name: "Foot Knights", perModel: true, basePoints: 9, unitSize: [10,30],
        options: [
          { id: "vow", type: "toggle", label: "Replace Knight's Vow with the Crusader's Vow", cost: 1, per: "model" },
          { id: "wep", type: "choice", label: "Weapon", choices: [
            { label: "Spears", cost: 0.5, per: "model" }, { label: "Polearms", cost: 2, per: "model" }, { label: "Great weapons", cost: 3, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "beastslayers", type: "toggle", label: "Beastslayers of Bastonne (Bohemund; requires polearms)", cost: 1, per: "model", requires: { unit: "bohemund" }, oncePerArmy: true },
          { id: "cmd", type: "command", magicStandard: 50 }
        ]
      },
      {
        id: "squires", name: "Squires", perModel: true, basePoints: 7, unitSize: [5,15],
        options: [
          { id: "la", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "buck", type: "toggle", label: "Bucklers", cost: 0.5, per: "model" },
          { id: "hounds", type: "multi", label: "Hunting Hounds (7 pts each)", repeatable: true, max: 30, choices: [ { label: "Hunting Hound", cost: 7 } ] },
          { id: "cmd", type: "command" }
        ],
        notes: "Mixed unit with Hunting Hounds (War Beasts, 7 pts each, up to 2 per Squire)"
      },
      {
        id: "yeomen", name: "Yeomen", perModel: true, basePoints: 10, unitSize: [5,15],
        options: [
          { id: "lance", type: "toggle", label: "Light lances", cost: 1, per: "model" },
          { id: "bow", type: "choice", label: "Missile weapon", choices: [
            { label: "Shortbows", cost: 1, per: "model" }, { label: "Crossbows", cost: 2, per: "model" } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 0.5, per: "model" }, { label: "Medium armour", cost: 1.5, per: "model" } ] },
          { id: "shields", type: "toggle", label: "Shields", cost: 1, per: "model" },
          { id: "cmd", type: "command" }
        ],
      },
      {
        id: "battlepilgrims", name: "Battle Pilgrims", perModel: true, basePoints: 7, unitSize: [10,30],
        options: [
          { id: "la", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "reliquae", type: "toggle", label: "Upgrade six Battle Pilgrims to a Grail Reliquae", cost: 30, per: "flat" },
          { id: "cmd", type: "command" }
        ],
      },
      {
        id: "herrimaults", name: "Herrimaults", perModel: true, basePoints: 7, unitSize: [5,15],
        options: [
          { id: "la", type: "toggle", label: "Light armour", cost: 0.5, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" },
          { id: "mus", type: "toggle", label: "Musician", cost: 5, per: "flat" }
        ],
        notes: "(No Standard Bearer option.)"
      },
      {
        id: "brigands", name: "Brigands", perModel: true, basePoints: 5, unitSize: [10,30],
        options: [
          { id: "ambush", type: "toggle", label: "Ambushers (unless armed with missile weapons)", cost: 1, per: "model" },
          { id: "wep", type: "choice", label: "Replace great weapons", choices: [
            { label: "Crossbows", cost: 2, per: "model" }, { label: "Handguns", cost: 2, per: "model" } ] },
          { id: "medarm", type: "toggle", label: "Medium armour", cost: 1, per: "model" },
          { id: "cmd", type: "command" }
        ],
      }
    ],

    /* ------------------------------- RARE ------------------------------- */
    rare: [
      {
        id: "grailknights", name: "Grail Knights", perModel: true, basePoints: 38, unitSize: [5,15],
        options: [ { id: "cmd", type: "command", magicStandard: 75 } ],
      },
      {
        id: "hippogryphknights", name: "Hippogryph Knights", perModel: true, basePoints: 75, unitSize: [3,6],
        options: [
          { id: "vow", type: "toggle", label: "Replace Knight's Vow with the Crusader's Vow", cost: 3, per: "model" },
          { id: "barding", type: "toggle", label: "Barding", cost: 3, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 }
        ],
        notes: "Monstrous Cavalry."
      },
      {
        id: "ballista", name: "Ballista", basePoints: 30, unitSize: null,
        options: [
          { id: "crew", type: "toggle", label: "Additional Peasant Crew", cost: 5, per: "flat" },
          { id: "warden", type: "toggle", label: "Upgrade one Peasant Crew to a Wall Warden", cost: 10, per: "flat" }
        ],
        notes: "War Machine (bolt thrower), crew of 3. You may take 1-2 Ballistas as a single Rare choice."
      },
      {
        id: "trebuchet", name: "Field Trebuchet", basePoints: 100, unitSize: null,
        options: [
          { id: "crew", type: "toggle", label: "Additional Peasant Crew", cost: 5, per: "flat" },
          { id: "warden", type: "toggle", label: "Upgrade one Peasant Crew to a Wall Warden", cost: 10, per: "flat" }
        ]
      },
      {
        id: "bombard", name: "Bombard", basePoints: 90, unitSize: null,
        options: [
          { id: "crew", type: "toggle", label: "Additional Peasant Crew", cost: 5, per: "flat" },
          { id: "warden", type: "toggle", label: "Upgrade one Peasant Crew to a Wall Warden", cost: 10, per: "flat" }
        ]
      }
    ]
  }
};

/* Some unit profile Special-rules lines write "Blessing of the Lady" / "Lance
   Formation" without the leading "The", and special characters list their fixed
   Virtue by name. Alias those tokens to the canonical text so they stay clickable
   (no duplication — they point at the existing entries / the Virtues catalog). */
(function(){
  var b = window.ARMY_BOOKS["bretonnia"], g = b.glossary;
  if (g["The Blessing of the Lady"]) g["Blessing of the Lady"] = g["The Blessing of the Lady"];
  if (g["The Lance Formation"])      g["Lance Formation"]      = g["The Lance Formation"];
  // "Aura of the Lady" is the Blessing of the Lady (distinct from Supreme Aura of the Lady).
  if (g["The Blessing of the Lady"]) g["Aura of the Lady"]     = g["The Blessing of the Lady"];
  (b.virtues || []).forEach(function(v){ if (!g[v.name]) g[v.name] = v.desc; });
})();
