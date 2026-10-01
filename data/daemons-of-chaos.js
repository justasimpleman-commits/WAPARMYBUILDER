/* ============================================================================
   DAEMONS OF CHAOS — army data (Warhammer Armies, Mathias Eliasson v3.1,
   9th Edition 3.0 ruleset). Encoded for the Army Builder engine.

   Pure DATA — same structure as chaos-dwarfs.js (see SCHEMA.md).

   Engine-fit notes (Daemons have a few things the generic engine approximates):
   - "Daemonic Gifts" are modelled as an extra magic-item category. They share
     the character's magic-item budget (correct), but the engine allows only one
     pick per category, so only one Gift can be chosen via the UI.
   - Optional multi-level Wizard upgrades are modelled as a `choice` so the POINTS
     are correct; the spell picker only appears for characters who are wizards by
     default (their base wizardLevel is set).
   - Daemonic Alignment (Khorne/Nurgle/Slaanesh/Tzeentch) is a `choice` where the
     book lets a unit/character pick a god.
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["daemons-of-chaos"] = {
  id: "daemons-of-chaos",
  name: "Daemons of Chaos",
  author: "Mathias Eliasson v3.1 (unofficial) — 9th Edition 3.0",
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
  // Categories whose items may be taken in MULTIPLES per model (each once),
  // all drawn from the same magic-item budget. Daemonic Gifts work this way.
  multiPickCategories: ["Daemonic Gifts"],
  godSections: true,
  listRules: [
    "Special characters are unique — each may be taken only once.",
    "Magic items are unique (one of each per army) unless marked * (common).",
    "Each model may take only one item from each magic-item category.",
    "Daemonic Gifts: each Gift may be taken only once per character, but more than one character may take the same Gift.",
    "Reign of Chaos: the bonus you get depends on your Army General's Daemonic Alignment.",
    "Daemonic Animosity: Daemons of different Gods are Suspicious Allies (Khorne/Slaanesh and Tzeentch/Nurgle are Desperate Allies) and suffer -1 Leadership (-2 for those pairs) within 6\" of each other; unaligned Daemons may only join unaligned units.",
    "Some Gifts/items are restricted to a specific Daemon (e.g. Bloodthirster only, Great Unclean One only)."
  ],
  magicItems: {
    "Magic Weapons": [
      { name: "The Eternal Blade", cost: 40, only: "Daemon Prince" },
      { name: "Axe of Khorne", cost: 30, god: "Khorne" },
      { name: "Blade of Blood", cost: 25, god: "Khorne" },
      { name: "Firestorm Blade", cost: 25, god: "Khorne" },
      { name: "Balesword", cost: 25, god: "Nurgle" },
      { name: "Etherblade", cost: 25, god: "Slaanesh" },
      { name: "Lash of Despair", cost: 25, god: "Slaanesh" },
      { name: "Staff of Change", cost: 25, god: "Tzeentch" },
      { name: "Harvester of Skulls", cost: 20, only: "Bloodthirster or Bloodmaster", god: "Khorne" },
      { name: "Nurgle's Nail", cost: 20, god: "Nurgle" },
      { name: "Ar'gath, the King of Blades", cost: 15, god: "Khorne" },
      { name: "Behemoth's Bane", cost: 15, god: "Khorne" },
      { name: "The Virulent Blade", cost: 15, god: "Nurgle" },
      { name: "Pyrofyre Stave", cost: 15, god: "Tzeentch" },
      { name: "Deathdealer", cost: 10, god: "Khorne" },
      { name: "Khartoth the Bloodhunger", cost: 10, god: "Khorne" },
      { name: "Plague Flail", cost: 10, god: "Nurgle" },
      { name: "Torment Blade", cost: 10, god: "Slaanesh" },
      { name: "Blade of Fate", cost: 10, god: "Tzeentch" },
      { name: "Warpfire Blade", cost: 10, god: "Tzeentch" },
      { name: "Warptongue Blade", cost: 10, god: "Tzeentch" },
      { name: "Bileblade", cost: 5, only: "Great Unclean One", god: "Nurgle" }
    ],
    "Magic Armour": [
      { name: "Armour of Khorne", cost: 25, god: "Khorne", requiresAccess: "medium armour" },
      { name: "Armour of Scorn", cost: 10, god: "Khorne", requiresAccess: "light armour" }
    ],
    "Talismans": [
      { name: "Daemonic Robes", cost: 25, god: "Tzeentch" },
      { name: "The Bloody Shackle", cost: 15, god: "Khorne" },
      { name: "Crimson Soulstone", cost: 5, god: "Khorne" }
    ],
    "Arcane Items": [
      { name: "Abhorrent Lodestone", cost: 50 },
      { name: "Doomsday Bell", cost: 35, god: "Nurgle" },
      { name: "Staff of Nurgle", cost: 35, god: "Nurgle" },
      { name: "Tome of a Thousand Poxes", cost: 30, god: "Nurgle" },
      { name: "Nine-Eyed Tome", cost: 30, god: "Tzeentch" },
      { name: "Wand of Whimsy", cost: 30, god: "Tzeentch" },
      { name: "The Eternal Shroud", cost: 15, god: "Tzeentch" },
      { name: "The Chromatic Tome", cost: 10, god: "Tzeentch" }
    ],
    "Enchanted Items": [
      { name: "Bloodstone", cost: 50, god: "Khorne" },
      { name: "Beacon of Mutability", cost: 40, god: "Tzeentch" },
      { name: "Enrapturing Circlet", cost: 40, god: "Slaanesh" },
      { name: "Flesh Peeler", cost: 30, god: "Nurgle" },
      { name: "Mark of the Slayer", cost: 30, god: "Khorne" },
      { name: "Threnody Voicebox", cost: 35, god: "Slaanesh" },
      { name: "The Portalglyph", cost: 25 },
      { name: "The Rock of Inevitability", cost: 25 },
      { name: "The Witherstave", cost: 25, god: "Nurgle" },
      { name: "Fallacious Gift", cost: 20, god: "Slaanesh" },
      { name: "Mask of Spiteful Beauty", cost: 20, god: "Slaanesh" },
      { name: "Mark of the Bloodreaper", cost: 15, god: "Khorne" },
      { name: "Girdle of the Realm-Racer", cost: 15, god: "Slaanesh" },
      { name: "The Crimson Crown", cost: 10, god: "Khorne" }
    ],
    "Magic Standards": [
      { name: "Standard of Chaos Glory", cost: 60 },
      { name: "Great Standard of Sundering", cost: 50 },
      { name: "Great Icon of Despair", cost: 40 },
      { name: "Banner of Unholy Victory", cost: 40 },
      { name: "Standard of Beguilement", cost: 35, god: "Slaanesh" },
      { name: "Standard of Conjuration", cost: 35, god: "Tzeentch" },
      { name: "Banner of Infernal Fire", cost: 25 },
      { name: "Icon of Endless War", cost: 25, god: "Khorne" },
      { name: "Standard of Eternal Wrath", cost: 25, god: "Khorne" },
      { name: "Standard of Fecundity", cost: 25, god: "Nurgle" },
      { name: "Standard of Seeping Decay", cost: 25, god: "Nurgle" },
      { name: "Banner of Ecstasy", cost: 25, god: "Slaanesh" },
      { name: "Siren Standard", cost: 25, god: "Slaanesh" },
      { name: "Standard of Twisted Grace", cost: 25, god: "Slaanesh" },
      { name: "Banner of Change", cost: 25, god: "Tzeentch" },
      { name: "Icon of Sorcery", cost: 25, god: "Tzeentch" },
      { name: "Icon of Eternal Virulence", cost: 20, god: "Nurgle" },
      { name: "Skull Totem", cost: 15, god: "Khorne" },
      { name: "Standard of Transmogrification", cost: 10, god: "Tzeentch" }
    ],
    "Daemonic Gifts": [
      { name: "Bringer of the Swarm", cost: 70 },
      { name: "Aura of Disruption", cost: 60 },
      { name: "Sorcerous Lodestone", cost: 55 },
      { name: "Aura of Fury", cost: 50, only: "Bloodthirster", god: "Khorne" },
      { name: "Sensual Barrage", cost: 50, only: "Keeper of Secrets", god: "Slaanesh" },
      { name: "Spirit Swallower", cost: 50, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Aspect of Tzeentch", cost: 40, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Twin Heads", cost: 40, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Hellfire", cost: 35, only: "Bloodthirster", god: "Khorne" },
      { name: "Lord of Flux", cost: 35, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Daemonic Arrogance", cost: 30 },
      { name: "Chaos Disruption", cost: 30 },
      { name: "Noxious Breath", cost: 30 },
      { name: "Souleater", cost: 30 },
      { name: "Soul Hunger", cost: 30 },
      { name: "Unholy Sacrifice", cost: 30 },
      { name: "Ward of Chaos", cost: 30 },
      { name: "Dark Insanity", cost: 30, only: "Bloodthirster", god: "Khorne" },
      { name: "Slaughterborn", cost: 30, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Extreme Contagion", cost: 30, only: "Great Unclean One", god: "Nurgle" },
      { name: "The Bountiful Swarm", cost: 30, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Stream of Bile", cost: 30, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Temptator", cost: 30, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Symphoniac", cost: 30, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Master of Sorcery", cost: 30, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Tzeentch's Will", cost: 30, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Power Vortex", cost: 30, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Radiance of Dark Glory", cost: 25 },
      { name: "Spell Destroyer", cost: 25, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Spell Breaker", cost: 25, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Immortal Fury", cost: 25, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Noxious Vapours", cost: 25, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Nurgle's Rot", cost: 25, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Nurgling Infestation", cost: 25, only: "Great Unclean One", god: "Nurgle" },
      { name: "Pestilent Breath", cost: 25, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Pestilent Mucus", cost: 25, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Invigorated by Pain", cost: 25, only: "Keeper of Secrets", god: "Slaanesh" },
      { name: "Siren Song", cost: 25, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Soporific Musk", cost: 25, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Unnatural Swiftness", cost: 25, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Barrage of Knowledge", cost: 25, only: "Lord of Change", god: "Tzeentch" },
      { name: "Dark Magister", cost: 25, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Wellspring of Arcane Might", cost: 25, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Cleaving Blow", cost: 20 },
      { name: "Crushing Mass", cost: 20 },
      { name: "Impenetrable Hide", cost: 20 },
      { name: "Withering Gaze", cost: 20 },
      { name: "Massive Might", cost: 20, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Battlemaster", cost: 20, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Might of Khorne", cost: 20, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Gift of Febrile Frenzy", cost: 20, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Allure of Slaanesh", cost: 20, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Enrapturing Gaze", cost: 20, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Tormentor", cost: 20, only: "Daemon of Slaanesh", god: "Slaanesh" },
      { name: "Cursed Ichor", cost: 20, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Flames of Tzeentch", cost: 20, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Iridescent Corona", cost: 20, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Awesome Strength", cost: 15 },
      { name: "Corpulence", cost: 15 },
      { name: "Diabolic Splendour", cost: 15 },
      { name: "Incorporeal Strike", cost: 15 },
      { name: "Skill Swallower", cost: 15 },
      { name: "Unbreakable Skin", cost: 15 },
      { name: "Unholy Flurry", cost: 15 },
      { name: "Aspect of Death", cost: 15, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Relentless Hunter", cost: 15, only: "Bloodthirster", god: "Khorne" },
      { name: "Unrivalled Battle-Lust", cost: 15, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Trappings of Nurgle", cost: 15, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Dark Blessing", cost: 10 },
      { name: "Arch-Slaughterer", cost: 10, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Rage Unchained", cost: 10, only: "Daemon of Khorne", god: "Khorne" },
      { name: "Devastating Blow", cost: 10, only: "Daemon of Khorne", god: "Khorne" },
      { name: "The Endless Gift", cost: 10, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "Slime Trail", cost: 10, only: "Daemon of Nurgle", god: "Nurgle" },
      { name: "All-Seeing Eye", cost: 10, only: "Daemon of Tzeentch", god: "Tzeentch" },
      { name: "Mark of the Conjurer", cost: 10, only: "Daemon of Tzeentch", god: "Tzeentch" }
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
    /* ---- army special rules (pp.3-4) ---- */
    "Daemonic": `Models with this rule have the Fear, Magical Attacks, Magical Ward (5+) and Unbreakable special rules (including mounts).`,
    "Daemonic Alignment": `In addition to the rules above, a Daemon (including any mount they have) can have any of the following Daemonic Alignments:

**Daemon of Khorne:** A Daemon of Khorne has the Hatred (Daemons of Slaanesh), Magic Resistance (1) and Mighty Blow (1) special rules.

**Daemon of Nurgle:** A Daemon of Nurgle has the Hatred (Daemons of Tzeentch) and Poisoned Attacks special rules. Enemy models in base contact suffer -1 to their Weapon Skill.

**Daemon of Slaanesh:** A Daemon of Slaanesh has the Hatred (Daemons of Khorne) and Armour Piercing (1) special rules. For every close combat Attack that causes an unsaved Wound, the model may make an additional Attack (including supporting attacks). These additional Attacks cannot generate further attacks.

**Daemon of Tzeentch:** A Daemon of Tzeentch has the Hatred (Daemons of Nurgle) and Magical Ward (6+) special rules. Wizards with the Daemon of Tzeentch upgrade can also re-roll channelling results of 1.`,
    "Daemon of Khorne": `A Daemon of Khorne has the Hatred (Daemons of Slaanesh), Magic Resistance (1) and Mighty Blow (1) special rules.`,
    "Daemon of Nurgle": `A Daemon of Nurgle has the Hatred (Daemons of Tzeentch) and Poisoned Attacks special rules. Enemy models in base contact suffer -1 to their Weapon Skill.`,
    "Daemon of Slaanesh": `A Daemon of Slaanesh has the Hatred (Daemons of Khorne) and Armour Piercing (1) special rules. For every close combat Attack that causes an unsaved Wound, the model may make an additional Attack (including supporting attacks). These additional Attacks cannot generate further attacks.`,
    "Daemon of Tzeentch": `A Daemon of Tzeentch has the Hatred (Daemons of Nurgle) and Magical Ward (6+) special rules. Wizards with the Daemon of Tzeentch upgrade can also re-roll channelling results of 1.`,
    "Daemonic Animosity": `Daemons with a different Daemonic Alignment treat each other as Suspicious Allies. However, Daemons of Khorne and Slaanesh, or Tzeentch and Nurgle, treat each other as Desperate Allies, respectively.

If there is a Daemonic unit within 6" of another Daemonic unit belonging to a different God those units suffer a -1 Leadership penalty. However, Daemons of Khorne and Slaanesh, or Tzeentch and Nurgle, respectively, suffer a -2 penalty to their Leadership if within 6" of each other instead.

Daemons that do not have a Daemonic Alignment are not subject to Daemonic Animosity, but they may only join units that also do not have a Daemonic Alignment.`,
    "Daemonic Instability": `If a unit of Daemons loses a round of close combat it must take a Daemonic Instability test. This works like a normal Break test, except that for every point they fail the test by, the unit suffers one additional Wound with no saves allowed. Daemonic Instability replaces Unstable where applicable.

If characters are present in the unit, the controlling player first allocates Wounds to the unit (up to their current Wounds), then divides remaining Wounds as equally as possible amongst any characters.

The Daemonic Instability test can use Inspiring Presence, Hold Your Ground and/or be tested on unmodified Leadership if the unit is Stubborn or Steadfast as normal.`,
    "Reign of Chaos": `If your Army General has a Daemonic Alignment, then one of the following bonuses apply:

**Khorne's Wrath:** Khorne only. At the start of each of your turns, roll a D6 for each enemy unit, and each unit that contains one or more Daemons of Slaanesh, or models with the Mark of Slaanesh, within 12" of your Army General. Do not roll for units that are engaged in close combat. On the roll of a 6, place a small round template centred directly over the centre of the unit. This then scatters D6". Resolve damage as you would from a stone thrower shot, with the model under the centre of the template suffering a Strength 8 hit with the Magical Attacks and Multiple Wounds (D6) special rule, and all other models wholly or partially under the template suffering a Strength 4 hit with the Magical Attacks special rule.

**Rot, Glorious Rot:** Nurgle only. At the start of each of your turns, roll a D6 for each enemy unit, and each unit that contains one or more Daemons of Tzeentch, or models with the Mark of Tzeentch, within 12" of your Army General. Do not roll for units engaged in close combat. On the roll of a 6, that unit suffers D6+3 Strength 3 hits with the Ignores Armour saves and Magical Attacks special rules.

**The Dark Prince Thirsts:** Slaanesh only. At the start of each of your turns, roll a D6 for each enemy unit, and each unit that contains one or more Daemons of Khorne, or models with the Mark of Khorne, within 12" of your Army General. Do not roll for units that are engaged in close combat. On the roll of a 6, that unit must take a Leadership test on 3D6, adding the results together. If the test is passed, nothing happens. Otherwise, for each point by which the unit failed the test, it suffers a Wound, with the Ignores Armour saves and Magical Attacks special rules.

**Storm of Fire:** Tzeentch only. At the start of each of your turns, roll a D6 for each enemy unit, and each unit that contains one or more Daemons of Nurgle, or models with the Mark of Nurgle, within 12" of your Army General. Do not roll for units that are engaged in close combat. On the roll of a 6, place a small round template centred directly over the centre of the unit – this then scatters D3". Any models wholly or partially beneath the template's final position suffer a single Strength 4 hit with the Flaming Attacks and Magical Attacks special rules.`,
    "Summoned from Beyond": `A unit with the Summoned from Beyond special rule gives them the Ambushers special rule. However, instead of deploying like normal Ambushers, the unit can arrive anywhere on the battlefield.

When the unit emerges, place a marker anywhere on the battlefield and roll 2D6 and the scatter dice. If you roll a hit on the scatter dice, the marker stays in place; if you roll an arrow, move the marker the number of inches indicated by the 2D6 in the direction shown by the arrow. If the marker is moved off the tabletop, the unit is considered lost; treat them as casualties.

Once the final position is established, place the unit so it can touch the marker. If the marker is under a unit or impassable terrain, place it next to the closest edge of the unit/terrain. They may face in any direction.`,
    "Chaos Armour": `Models with this rule cannot have their armour save reduced below a 6+ save from non-magical Attacks.`,

    /* ---- character / unit special rules ---- */
    "Jolly Gutpipes": `At the start of each close combat phase the Sloppity Bilepiper can play one of the following tunes which affects the unit they are with. The effect of that tune lasts until the end of that phase. A unit can only benefit from one tune once per phase.

**A Stabbing We Will Go!:** All models in the unit may re-roll failed rolls To Wound.

**Early One Evening My Pustule Was Seeping:** All models in the unit gain the Multiple Wounds (2) special rule.

**My Love Is Like a Ripe, Ripe Fart:** All enemy units in base contact with the Sloppity Bilepiper suffer -1 To Hit.`,
    "Keep Counting": `Keep Counting, I'm Watching You: At the start of each close combat phase the Spoilpox Scrivener can use one of the following counts which affects the unit they are with. The effect of each count lasts until the end of that phase. A unit can only benefit from one count once per phase.

**Tally of Blows:** All models in the unit gain +1 Attack.

**Studied Lacerations:** All models in the unit gain the Armour Piercing (1) special rule.

**Recorded Stamina:** Enemies must re-roll To Wound rolls of 6 against all models in the unit.`,
    "Discordant Disruption": `All enemy Wizards within 18" of an Infernal Enrapturess whose casting roll contains any double suffers a Strength 4 Hit for each double rolled.`,
    "Harmonic Alignment": `All friendly Daemons of Slaanesh within 6" of an Infernal Enrapturess may re-roll failed Magical Ward saves.`,
    "Versatile Instrument": `During the Shooting phase, the Infernal Enrapturess can play either Cacophonous Melody or Euphonic Blast.

**Cacophonous Melody:** Range 18", Strength 4, Special Rules: Multiple Shots (2D6).

**Euphonic Blast:** Range 24", Strength 6, Special Rules: Multiple Wounds (D3).`,
    "Summon Daemons": `Level 3, cast on 8+. Summon Daemons is a summoning spell with a range of 18" that can target units of Pink Horrors, Brimstone Horrors, Screamers or Flamers. The target unit immediately gains D6 Wounds worth of models.`,
    "Gorefeast": `If this chariot's Impact Hits cause unsaved Wounds, immediately roll a D6 for each Wound caused. For each score of 4+, the chariot regains a single Wound lost earlier in the game.`,
    "Totem of Endless Bloodletting": `Any Daemon of Khorne unit within 6" of a Bloodmaster on a Blood Throne gain the Frenzy special rule.`,
    "Lesser Flames of Tzeentch": `Lesser Flames of Tzeentch have the following profile: Range 12/18", Strength 3, Special Rules: Flaming Attacks, Multiple Shots (2), Quick Shot.`,
    "Split": `When a Pink Horror is slain in close combat (not removed as a result of Daemonic Instability). Roll a D6; on the result of 1-3, the Pink Horror inflicts an automatic Strength 3 on the unit that inflicted the Wound, distributed as a missile attack. On the roll of a 4-6, the Pink Horror will split into two Blue Horrors instead; replace the slain Pink Horror with two Blue Horror models at the back of the unit. If you do not have access to enough Blue Horrors, treat the result as having rolled a 1-3 instead. When resolving attacks against a unit with both Pink and Blue Horrors present, the Blue Horrors are targeted and removed as casualties first.`,
    "Whirling Destroyers": `The unit receives an additional +1 casting bonus for every 5 five Pink Horrors in the unit, to a maximum of +3. If the unit has 15+ Pink Horrors, it counts as a Level 2 Wizard and gains access to the Pink Fire of Tzeentch spell from the Lore of Tzeentch. Each time the unit casts a spell (or is targeted by a special rule that affects a Wizard), you must nominate one Pink Horror as the caster for the purposes of line of sight, range, etc. In the event of a Pink Horror unit rolling a miscast, do not roll on the Miscast table. Instead, the unit suffers D3 Wounds with no saves of any kind allowed.`,
    "Slashing Attack": `If a unit of Screamers moves over one or more unengaged enemy units in the Remaining Moves sub-phase, each of those units suffer one Strength 4 Hit per Screamer, distributed as shooting attacks.

**Burning Chariot:** If a Burning Chariot moves over one or more unengaged enemy units in the Remaining Moves sub-phase, each of those units suffer two Strength 4 Hits, distributed as shooting attacks.`,
    "Attention Seeker": `Beasts of Nurgle can issue and accept challenges as if they were Characters.`,
    "Slime Trail": `Enemy units do not receive combat result bonuses for attacking the flank or rear of models with this special rule.`,
    "Soporific Musk": `Units in base contact with one or more Fiends of Slaanesh suffer a -1 penalty to both Weapon Skill and Initiative. This has no effect on Daemons of Slaanesh.`,
    "Flames of Tzeentch": `Flames of Tzeentch have the following profile: Range 12/18", Strength 4, Special Rules: Flaming Attacks, Multiple Shots (D6), Quick Shot, Rapid Fire.`,
    "Exalted Fire of Tzeentch": `During the Shooting phase, the Exalted Flamer can shoot either Pink Fire or Blue Fire below. If a misfire is rolled when resolving Pink Fire or Blue Fire, the Exalted Flamer (on a Burning Chariot: the Burning Chariot) suffers D6 Strength D6 hits with the Flaming Attacks special rule.

**Blue Fire:** Blue Fire is an organ gun with the following profile: Range 12/18", Strength D3+3, Special Rules: Cumbersome, Flaming Attacks, Multiple Shots (Artillery Dice + D6), Rapid Fire.

**Pink Fire:** Pink Fire is a fire thrower that uses the following profile: Range n/a, Strength D6, Special Rules: Cumbersome, Flaming Attacks.`,
    "Exalted Flames of Tzeentch": `Exalted Flames of Tzeentch have the following profile: Range 16/24", Strength 4, Special Rules: Flaming Attacks, Multiple Shots (2D6), Quick Shot, Rapid Fire.`,
    "Caught by the Iron Claw": `Immediately before the Soulgrinder makes its Attacks, nominate one model in base contact with the Soulgrinder. That model must pass an Initiative test. If failed, all other attacks the Soulgrinder makes against that model this turn hit automatically.`,
    "Harvester Cannon": `This allows the Soulgrinder to fire grapeshot (see Cannons in the Warhammer Rulebook). If a misfire is rolled on the artillery dice, the Soulgrinder suffers a Wound with no saves allowed instead of rolling on the chart.

**Grapeshot (rulebook, Cannons):** Range 12", Strength 5, Special Rules: Cumbersome, Rapid Fire. Roll an artillery dice and a D6; the number of shots is the artillery dice plus the D6.`,
    "Baleful Torrent": `This follows the rules for fire throwers. If a misfire is rolled on the artillery dice, the Soulgrinder suffers a wound with no saves allowed instead of rolling on the chart.`,
    "Daemonbone Claw": `If a Soulgrinder has a Daemonbone Claw it can exchange all of its Attacks for a single special Attack – this is declared after the Caught by the Iron Claw rules is resolved. This Attack is resolved at Strength 10 and has the Multiple Wounds (D6) special rule.`,
    "Phlegm Bombardment": `Phlegm Bombardment is a stone thrower with the profile below. If a misfire is rolled on the artillery dice, the Soulgrinder suffers a Wound with no saves allowed instead of rolling on the chart. Range 12-36", Strength 3, Special Rules: Cumbersome.`,
    "Warp Gaze": `Warp Gaze follows the rules for bolt throwers.`,
    "Skull Cannon": `Skull cannons are cannons with the following profile: Range 12-48", Strength 10, Special Rules: Cumbersome, Flaming Attacks, Multiple Wounds (D6/D3).`,
    "Death Heads": `Death Heads have the following profile: Range 6/9", Strength 4, Special Rules: Quick Shot. Each Hit from a Death Head is multiplied into D6 Hits.`,
    "Totem of Endless Pleasure": `Any Daemon of Slaanesh unit within 6" of an Exalted Chariot gains the Always Strikes First special rule.`,
    "Soulscent": `If a Hellflayer causes one or more unsaved Wounds with its Impact Hits, all crew members receive a number of bonus Attacks equal to the number of unsaved Wounds caused. This bonus lasts until the end of the turn.`,
    "Gift of Power": `For each friendly Contorted Epitome on the battlefield at the start of your Magic phase, add one dice to your power pool.`,
    "Horrible Fascination": `At the start of the enemy's turn, each enemy unit that is within 12" of one or more Contorted Epitomes and has Line of Sight to it must pass a Psychology test. If failed, that unit may not move in the Movement phase this turn.`,
    "Swallow Energy": `A Contorted Epitome's Magical Ward save is increased by +1 for every point of Strength above 3 that every attack targeting it has. So, against a Strength 4 Attack it has Magical Ward (4+), against Strength 5 it has a Magical Ward (3+).`,

    /* ---- special characters ---- */
    "The Dark Master": `All enemy units within 12" of Be'lakor suffer -1 to their Leadership.`,
    "Lord of Torment": `If one or more enemy units failed a Panic or Break test during the previous turn (after any re-rolls for special rules such as a Battle Standard Bearer's Hold Your Ground! rule), Be'lakor receives D3 additional power dice in your Magic phases, which only he can make use of. Any unused power dice are discarded at the end of the Magic phase as normal.`,
    "Shadow Form": `Be'lakor has a Magical Ward (6+), and any missile attacks targeting him suffer -2 To Hit.`,
    "Bellow of Endless Fury": `This is a Strength 5 Breath Weapon as described in the Warhammer rulebook.`,
    "Hellforged Host": `If Skarbrand is included in your army, you may upgrade one unit of Bloodletters to the Hellforged Host for a cost of +1 point per model. This unit has the Armour Piercing (1) special rule and may re-roll To Wound rolls of 1.`,
    "Rage Embodied": `Skarbrand can never lose his Frenzy. In addition, while Skarbrand is alive, all units within 12" (friendly and enemy) of him are subject to the rules for Hatred.`,
    "The Butcher's Due": `At the start of each of your close combat phases, choose one friendly Daemon of Khorne unit within 12". The target unit may re-roll failed To Wound rolls of 1's until the start of your next close combat phase.`,
    "Skulls for the Skull Throne!": `Skulltaker must always issue and accept challenges.`,
    "Prey of the Blood God": `At the start of the game, nominate one enemy character on the battlefield. Karanak re-rolls failed To Hit and To Wound rolls against the chosen character.`,
    "Hounds of the Blood Hunt": `If Karanak is included in your army, you may upgrade one unit of Flesh Hounds to the Hounds of the Blood Hunt Host for a cost of +2 points per model. For every unsaved Wound caused by this unit in close combat, they regain 1 Wound's worth of models up to their starting value, just like a summoning spell.`,
    "Burning Blood": `Skaarac has a Breath Weapon Attack with Strength 4 and the Ignores Armour Saves special rule.`,
    "Life Eater": `Roll a D6 for each Wound inflicted by Skaarac in close combat. For each result of a 6, he may restore one Wound previously lost during the battle.`,
    "Infernal Iron": `All Wizards within 12" of Skaarac suffer a -1 casting penalty.`,
    "Undying Hate": `If this model is slain, before removing it, all models in base contact suffers a Strength 5 Hit which Ignores Armour saves.`,
    "Call of the Skull Throne": `All friendly Daemons of Khorne within 12" of Skaarac may re-roll failed charge distances.`,
    "Festering Stooges": `If Ku'gath Plaguefather is included in your army, you may upgrade one unit of Plaguebearers to the Festering Stooges for a cost of +1 point per model. This unit has the Regeneration (6+) special rule.`,
    "Blubber and Bile": `Each time Rotigus successfully makes a Regeneration save in close combat, he inflicts a Strength 4 Hit on the model which caused the Wound.`,
    "Streams of Brackish Filth": `At the start of each of your Shooting phases, all enemy units within 6" of Rotigus suffer D3 Strength 4 Hits.`,
    "The Tally of Pestilence": `Whilst Epidemius is alive, keep a count of all unsaved Wounds caused by any unit he is with in close combat (unless he has refused a challenge that turn). At the start of each of your turns, consult the table below to determine the effect of the Tally of Pestilence. Note that these effects are cumulative. If Epidemius is killed or leaves the unit, these effects are immediately lost.

**0-6 Wounds:** No effect.

**7+ Wounds:** All models in the unit gain +1 Strength.

**14+ Wounds:** All models in the unit gain +1 Toughness.

**21+ Wounds:** All models in the unit gain the Killing Blow special rule.

**28+ Wounds:** All models in the unit re-roll failed Magical Ward saves.`,
    "Beast Handler": `Friendly Beasts of Nurgle within 12" of Horticulous Slimux re-roll failed charge rolls and To Hit rolls of 1.`,
    "In Death There is Life": `All friendly units within 6" of Horticulous Slimux gain the Regeneration (6+) special rule.`,
    "Cultivating the Garden of Nurgle": `Once during the battle, at the start of your turns, you can set up a Venom Thicket (see the Warhammer Rulebook) no more than 10" in diameter within 3" of Horticulous Slimux and more than 1" away from any other model or terrain feature.`,
    "Bringers of Beguilement": `If N'Kari is included in your army, you may upgrade one unit of Daemonettes to the Bringers of Beguilement for a cost of +1 point per model. All models in this unit have +1 Movement and may re-roll failed charge and pursuit distances.`,
    "Willing Prey": `Enemy units in base contact with N'Kari suffer -1 to their Weapon Skill.`,
    "Irresistible Challenge": `Enemy characters who refuses a Challenge from Shalaxi Helbane suffer D3 Strength 5 Hits which Ignores Armour saves.`,
    "Aura of Slaanesh": `Any enemy unit in base contact with Azazel suffers a -1 penalty to its Leadership value.`,
    "Dark Halo": `Azazel may re-roll failed Magical Ward saves.`,
    "Deadly Symbiosis": `For each successful To Hit roll by Syll, Esske may re-roll one failed To Hit roll the same phase.`,
    "Lithe and Swift": `Syll'Esske may re-roll failed charge and pursuit rolls.`,
    "Subvert": `At the start of each of your turns, one enemy Character within 12" and Line of Sight of Syll'Esske must take a Psychology test. If failed, no units can use that model's Leadership until the start of your next turn.`,
    "Regal Authority": `All friendly Daemons of Slaanesh within 18" of Syll'Esske may re-roll 1's To Hit in close combat.`,
    "Joyous Battle Fury": `Dexcessa receives +1 Attack for each round of close combat after the first, for as a long as they remain in close combat (to a maximum of 10 Attacks total).`,
    "Mesmerising Lepidoptera": `All enemy attacks targeting this model (Dexcessa or Synessa) suffer a -1 penalty To Hit.`,
    "Redolence of Violence": `During any turn in which Dexcessa makes a successful charge, all friendly Daemon of Slaanesh units within 12" gain +1 Attack for the duration of this turn.`,
    "Whispers of Doubt": `Level 1, cast on 5+. Whispers of Doubt is a hex spell with a range of 24". The target unit must take a Leadership test using an additional D6; if failed, all close combat attacks targeting that unit gain +1 To Hit until the start of your next Magic phase.`,
    "The Voice of Slaanesh": `All friendly models within Line of Sight of Synessa may use their Leadership. In addition, any spells that Synessa casts can be targeted at any enemy unit within Line of Sight, regardless of range.`,
    "The Eternal Dance": `At the start of each of the controlling player's Close Combat phases, the Masque must choose one dance to perform from the list given below. These abilities target one enemy unit (which may be in combat). Each dance has a range of 12" and does not require line of sight. Until the end of the phase, the target suffers a penalty to the characteristic stated (to a minimum of 1).

**The Fleshspasm Polka:** All models in the unit suffer -1 Strength.

**The Waltz of Lethargy:** All models in the unit suffer -D3 Initiative.

**The Dance of Dreaming:** All models in the unit suffer -D3 Leadership.`,
    "Unnatural Reflexes": `The Masque of Slaanesh has the Dodge (6+) special rule, and may re-roll failed Dodge saves.`,
    "Oracle of Eternity": `Kairos Fateweaver has a 6+ invulnerable save.`,
    "Blazing Squealers": `If Kairos Fateweaver is included in your army, you may upgrade one unit of Pink Horrors to the Blazing Squealers for a cost of +2 points per model. The Lesser Flames of Tzeentch from this unit are resolved at Strength 4 instead of Strength 3.`,
    "Daemonic Aura": `Amon 'Chakai and all friendly units within 6" gain +1 to their Magical Ward saves (to a maximum of 3+) against non-Magical Attacks.`,
    "The Hand of Destiny": `At the start of the game, choose one enemy model. All close combat and shooting attacks against this model will automatically Hit for the remainder of the game.`,
    "Spell Syphon": `Whenever an enemy successfully casts a spell (including Bound Spells), place a counter next to the Blue Scribes. At the start of your next Magic phase, the Blue Scribes can make a channelling attempt for each counter. Once the Blue Scribes have attempted to channel, remove all counters from them.`,
    "Formless Horror": `At the start of each Close Combat phase, choose an enemy model in base contact with the Changeling. The Changeling may increase any or all of his Weapon Skill, Strength, Toughness, Initiative and Attacks characteristics to match those of the chosen enemy model until the end of that phase. If the chosen model has more than one value for a characteristic (as is the case with a mounted model), the Changeling may always choose the higher value. The Changeling cannot match the characteristics of an enemy that is fighting in a challenge, unless the Changeling is fighting in the same challenge.`
  },
  unitInfo: {
    /* character mounts (pp.28-30) — listed first so the mount picker uses these */
    mount_juggernaut: { troop: "Monstrous Beast (Daemon)", profile: [["Juggernaut",7,4,0,4,4,3,2,3,7]], eq: "—", rules: "Daemon of Khorne, Natural Armour (6+)" },
    mount_khultayran: { troop: "Monstrous Beast (Daemon)", profile: [["Khul'tayran (Juggernaut)",7,4,0,5,4,3,2,3,7]], eq: "—", rules: "Daemon of Khorne, Natural Armour (6+)" },
    mount_bloodthrone:{ troop: "Chariot (Armour Save 4+)", profile: [["Blood Throne",6,5,"-",5,5,4,2,3,"-"],["Bloodletter","-",5,3,4,"-","-",4,1,7]], eq: "Hand weapon, scythes", rules: "Crew: 2 Bloodletters (Daemon). Daemon of Khorne, Killing Blow (Bloodletter only), Natural Armour (6+); Gorefeast; Totem of Endless Bloodletting" },
    mount_palanquin:  { troop: "Infantry (Daemon)", profile: [["Palanquin",4,2,2,2,"-","-",3,8,7]], eq: "—", rules: "Daemon of Nurgle, Inspiring Presence (6). A Palanquin of Nurgle has a Line of Sight Value of 2 and Unit Strength 3." },
    mount_plaguetoad: { troop: "Monstrous Beast (Daemon)", profile: [["Plague Toad",6,3,0,4,4,3,1,3,7]], eq: "—", rules: "Daemon of Nurgle" },
    mount_rotfly:     { troop: "Monstrous Beast (Daemon)", profile: [["Rot Fly",1,3,0,4,5,3,2,3,7]], eq: "—", rules: "Daemon of Nurgle, Fly (6)" },
    mount_steed:      { troop: "War Beast (Daemon)", profile: [["Steed of Slaanesh",10,3,0,3,3,1,5,1,7]], eq: "—", rules: "Daemon of Slaanesh, Poisoned Attacks" },
    mount_serpent:    { troop: "Monstrous Beast (Daemon)", profile: [["Serpent of Slaanesh",10,4,0,4,4,3,5,3,7]], eq: "—", rules: "Daemon of Slaanesh, Poisoned Attacks" },
    mount_disc:       { troop: "War Beast (Daemon)", profile: [["Disc of Tzeentch",0,3,0,4,4,1,4,2,7]], eq: "—", rules: "Daemon of Tzeentch, Fly (9)" },

    /* characters */
    daemonprince:   { troop: "Monstrous Creature (Character, Daemon)", profile: [["Daemon Prince",8,8,5,6,5,5,8,5,9]], eq: "Hand weapon", rules: "Daemonic; Chaos Armour" },
    exalteddaemon:  { troop: "Monstrous Infantry (Character, Daemon)", profile: [["Exalted Daemon",6,7,5,5,5,4,7,4,8]], eq: "Hand weapon", rules: "Daemonic, Terror; Chaos Armour" },
    bloodthirster:  { troop: "Monster (Character, Daemon)", profile: [["Bloodthirster",8,9,5,6,6,6,8,6,9]], eq: "Hand weapon", rules: "Daemon of Khorne, Fly (8), Killing Blow, Magic Resistance (1)" },
    bloodmaster:    { troop: "Infantry (Character, Daemon)", profile: [["Bloodmaster",5,7,5,5,4,2,6,3,8]], eq: "Hand weapon", rules: "Daemon of Khorne, Killing Blow, Natural Armour (6+)" },
    greatucleanone: { troop: "Monster (Character, Daemon)", profile: [["Great Unclean One",6,6,3,6,7,7,4,5,9]], eq: "Hand weapon", rules: "Daemon of Nurgle. Level 1 Wizard (Lore of Nurgle)." },
    poxbringer:     { troop: "Infantry (Character, Daemon)", profile: [["Poxbringer",4,6,5,5,5,2,4,3,8]], eq: "Hand weapon", rules: "Daemon of Nurgle. May be a Wizard (Lore of Nurgle)." },
    sloppity:       { troop: "Infantry (Character, Daemon)", profile: [["Sloppity Bilepiper",4,4,4,4,5,2,4,2,8]], eq: "Hand weapon", rules: "Daemon of Nurgle; Jolly Gutpipes" },
    spoilpox:       { troop: "Infantry (Character, Daemon)", profile: [["Spoilpox Scrivener",4,4,4,4,5,2,4,2,8]], eq: "Hand weapon", rules: "Daemon of Nurgle; Keep Counting, I'm Watching You" },
    keeperofsecrets:{ troop: "Monster (Character, Daemon)", profile: [["Keeper of Secrets",10,8,5,6,6,6,9,6,9]], eq: "Hand weapon", rules: "Daemon of Slaanesh. Level 1 Wizard (Lore of Slaanesh)." },
    viceleader:     { troop: "Infantry (Character, Daemon)", profile: [["Viceleader",6,7,6,4,3,2,7,4,8]], eq: "Hand weapon", rules: "Daemon of Slaanesh. May be a Wizard (Lore of Slaanesh)." },
    infernalenrap:  { troop: "Infantry (Character, Daemon)", profile: [["Infernal Enrapturess",6,6,6,4,3,2,6,3,8]], eq: "Hand weapon", rules: "Daemon of Slaanesh; Discordant Disruption; Harmonic Alignment; Versatile Instrument" },
    lordofchange:   { troop: "Monster (Character, Daemon)", profile: [["Lord of Change",8,6,5,6,6,6,6,5,9]], eq: "Hand weapon", rules: "Daemon of Tzeentch, Fly (8). Level 2 Wizard (Lore of Tzeentch)." },
    gauntsummoner:  { troop: "Infantry (Character, Daemon)", profile: [["Gaunt Summoner",4,3,4,4,4,3,3,2,8]], eq: "Hand weapon", rules: "Daemon of Tzeentch. Level 3 Wizard (Lore of Tzeentch); Summon Daemons" },
    changecaster:   { troop: "Infantry (Character, Daemon)", profile: [["Changecaster",4,3,4,4,4,2,3,2,8]], eq: "Hand weapon", rules: "Daemon of Tzeentch. Level 1 Wizard (Lore of Tzeentch)." },

    /* special characters */
    belakor:        { troop: "Monstrous Creature (Special Character, Daemon)", profile: [["Be'lakor",8,9,5,6,5,5,8,5,10]], eq: "The Blade of Shadows", rules: "Daemonic, Fly (8); The Dark Master; Lord of Torment; Shadow Form. Level 4 Wizard (Lore of Shadow)." },
    skarbrand:      { troop: "Monster (Special Character, Daemon)", profile: [["Skarbrand",8,10,5,6,6,6,9,6,9]], eq: "Slaughter and Carnage, medium armour", rules: "Daemon of Khorne, Frenzy, Hatred, Killing Blow, Magic Resistance (1); Bellow of Endless Fury; Hellforged Host; Rage Embodied" },
    mazarall:       { troop: "Monster (Special Character, Daemon)", profile: [["Mazarall the Butcher",8,8,5,7,6,6,8,6,9]], eq: "Harrow Meat, The Ancyte Shield, light armour", rules: "Daemon of Khorne, Impact Hits (D3); The Butcher's Due" },
    skulltaker:     { troop: "Infantry (Special Character, Daemon)", profile: [["Skulltaker",5,8,5,5,4,2,7,4,8]], eq: "The Slayer Sword, Cloak of Skulls, light armour", rules: "Daemon of Khorne, Natural Armour (6+); Skulls for the Skull Throne!" },
    karanak:        { troop: "War Beast (Special Character, Daemon)", profile: [["Karanak",8,7,0,5,5,2,6,4,8]], eq: "Brass Collar of Bloody Vengeance", rules: "Daemon of Khorne, Hatred, Independent, Magic Resistance (2), Natural Armour (6+); Prey of the Blood God; Hounds of the Blood Hunt. May never be the Army General." },
    skaarac:        { troop: "Monster (Special Character, Daemon)", profile: [["Skaarac",7,5,0,6,6,6,4,6,7]], eq: "Light armour", rules: "Daemon of Khorne, Independent, Natural Armour (6+); Burning Blood; Life Eater; Infernal Iron; Undying Hate; Call of the Skull Throne" },
    kugath:         { troop: "Monster (Special Character, Daemon)", profile: [["Ku'gath Plaguefather",4,6,3,6,7,7,4,6,9],["Palanquin of Nurgle",4,2,2,2,"-","-",3,8,7]], eq: "Necrotic Missiles", rules: "Daemon of Nurgle, Hatred (Dwarfs); Festering Stooges. Level 1 Wizard (Lore of Nurgle). Gifts: Nurgling Infestation, Slime Trail." },
    rotigus:        { troop: "Monster (Special Character, Daemon)", profile: [["Rotigus",6,6,3,6,7,7,4,5,9]], eq: "Gnarlrod of Nurgle", rules: "Daemon of Nurgle; Blubber and Bile; Streams of Brackish Filth. Level 3 Wizard (Lore of Nurgle). Gift: The Endless Gift." },
    epidemus:       { troop: "Infantry (Special Character, Daemon)", profile: [["Epidemius",4,6,5,5,5,2,4,3,8],["Palanquin",4,2,2,2,"-","-",3,8,7]], eq: "Hand weapon", rules: "Mount: Palanquin (Daemon). Daemon of Nurgle, Inspiring Presence (6); The Tally of Pestilence" },
    horticulous:    { troop: "Monstrous Cavalry (Special Character)", profile: [["Horticulous",4,6,5,5,5,2,4,3,8],["Mulch",4,3,0,5,5,4,1,4,7]], eq: "Great weapon", rules: "Daemon of Nurgle; Beast Handler; In Death There is Life; Cultivating the Garden of Nurgle. Gift: Slime Trail." },
    nkari:          { troop: "Monster (Special Character, Daemon)", profile: [["N'Kari",10,8,5,6,6,6,9,6,9]], eq: "Witstealer Sword", rules: "Daemon of Slaanesh, Hatred (High Elves); Bringers of Beguilement; Willing Prey. Level 4 Wizard (Lore of Slaanesh). Gifts: Allure of Slaanesh, Spirit Swallower, Siren Song." },
    shalaxi:        { troop: "Monster (Special Character, Daemon)", profile: [["Shalaxi Helbane",10,9,5,6,6,6,10,6,9]], eq: "Soulpiercer, Shining Aegis, Cloak of Constriction", rules: "Daemon of Slaanesh; Irresistible Challenge. Level 2 Wizard (Lore of Slaanesh)." },
    azazel:         { troop: "Monstrous Creature (Special Character, Daemon)", profile: [["Azazel",8,8,5,6,5,5,9,5,10]], eq: "Daemonblade", rules: "Daemon of Slaanesh, Fly (8); Aura of Slaanesh; Dark Halo. Level 2 Wizard (Lore of Slaanesh). Gifts: Soporific Musk, Temptator." },
    syllesske:      { troop: "Monstrous Creature (Special Character)", profile: [["Syll","-",7,6,4,"-","-",8,4,8],["Esske",8,8,5,6,5,5,8,5,9]], eq: "Axe of Dominion, Scourging Whip, light armour", rules: "Daemon of Slaanesh; Deadly Symbiosis; Lithe and Swift; Subvert; Regal Authority. Syll'Esske has a Line of Sight value of 4 and a Unit Strength of 5." },
    dexcessa:       { troop: "Monstrous Creature (Special Character, Daemon)", profile: [["Dexcessa",8,9,5,6,5,5,8,5,9]], eq: "Sceptre of Slaanesh", rules: "Daemon of Slaanesh, Fly (8); Joyous Battle Fury; Mesmerising Lepidoptera; Redolence of Violence" },
    synessa:        { troop: "Monstrous Creature (Special Character, Daemon)", profile: [["Synessa",8,6,5,5,5,5,7,3,9]], eq: "Staff of Slaanesh", rules: "Daemon of Slaanesh, Fly (8), Loremaster (Lore of Slaanesh); Mesmerising Lepidoptera; The Voice of Slaanesh. Level 4 Wizard; Whispers of Doubt" },
    masque:         { troop: "Infantry (Special Character, Daemon)", profile: [["Masque of Slaanesh",10,7,6,4,3,2,7,5,8]], eq: "Hand weapon", rules: "Daemon of Slaanesh; The Eternal Dance; Unnatural Reflexes" },
    kairos:         { troop: "Monster (Special Character, Daemon)", profile: [["Kairos Fateweaver",8,1,0,5,5,6,1,1,9]], eq: "Hand weapon, Staff of Tomorrow", rules: "Daemon of Tzeentch, Fly (8), Loremaster (Lore of Tzeentch); Oracle of Eternity; Blazing Squealers. Level 4 Wizard. Gift: Twin Heads." },
    amon:           { troop: "Monster (Special Character, Daemon)", profile: [["Amon 'Chakai",8,6,5,6,6,6,6,5,9]], eq: "Hand weapon", rules: "Daemon of Tzeentch, Fly (8); Daemonic Aura; The Hand of Destiny. Level 4 Wizard (Lore of Tzeentch). Gifts: All-Seeing Eye, Master of Sorcery." },
    bluescribes:    { troop: "Cavalry (Special Character, Daemon)", profile: [["The Blue Scribes","-",3,3,3,3,2,3,2,7],["Disc of Tzeentch",0,3,0,4,4,1,4,2,7]], eq: "Scrolls of Sorcery", rules: "Mount: Disc of Tzeentch (Daemon). Daemon of Tzeentch, Fly (9); Spell Syphon. The Blue Scribes have a Unit Strength of 3." },
    changeling:     { troop: "Infantry (Special Character, Daemon)", profile: [["The Changeling",4,3,4,3,3,2,3,1,8]], eq: "Hand weapon", rules: "Daemon of Tzeentch; Formless Horror. Level 1 Wizard (Lore of Tzeentch)." },

    /* core */
    chaosfuries:    { troop: "Infantry (Daemon)", profile: [["Chaos Fury",4,3,0,3,3,1,4,2,6]], eq: "Hand weapon", rules: "Daemonic, Expendable, Fly (10)" },
    impswarms:      { troop: "Swarm (Daemon)", profile: [["Imp Swarm",4,3,0,2,2,6,3,6,5]], eq: "Hand weapon", rules: "Daemonic, Fly (5)" },
    bloodletters:   { troop: "Infantry (Daemon)", profile: [["Bloodletter",5,5,3,4,3,1,4,1,7]], eq: "Hand weapon", rules: "Daemon of Khorne, Killing Blow, Natural Armour (6+)" },
    fleshhounds:    { troop: "War Beast (Daemon)", profile: [["Flesh Hound",8,4,0,4,4,1,4,2,7]], eq: "—", rules: "Daemon of Khorne, Magic Resistance (2), Natural Armour (6+)" },
    plaguebearers:  { troop: "Infantry (Daemon)", profile: [["Plaguebearer",4,4,3,4,4,1,2,1,7]], eq: "Hand weapon", rules: "Daemon of Nurgle" },
    plaguetoadscore:{ troop: "Monstrous Beast (Daemon)", profile: [["Plague Toad",6,3,0,4,4,3,1,3,7]], eq: "—", rules: "Daemon of Nurgle, Marsh Strider" },
    nurglings:      { troop: "Swarm (Daemon)", profile: [["Nurglings",4,2,2,2,2,6,3,6,7]], eq: "—", rules: "Daemon of Nurgle. Nurglings have a Line of Sight value of 1." },
    daemonettes:    { troop: "Infantry (Daemon)", profile: [["Daemonette",6,5,4,3,3,1,5,2,7]], eq: "—", rules: "Daemon of Slaanesh" },
    seekers:        { troop: "Cavalry (Daemon)", profile: [["Daemonette",6,5,4,3,3,1,5,2,7],["Steed of Slaanesh",10,3,0,3,3,1,5,1,7]], eq: "—", rules: "Mount: Steed of Slaanesh (Daemon). Daemon of Slaanesh, Fast Cavalry, Poisoned Attacks (Steed of Slaanesh only)" },
    pinkhorrors:    { troop: "Infantry (Daemon)", profile: [["Pink Horror",4,3,3,3,3,1,3,1,7],["Blue Horror",4,3,3,2,3,1,3,1,7]], eq: "Lesser Flames of Tzeentch", rules: "Daemon of Tzeentch; Split; Whirling Destroyers. The unit is a Level 1 Wizard that knows Blue Fire of Tzeentch." },
    screamers:      { troop: "War Beast (Daemon)", profile: [["Screamer",1,3,0,4,4,2,4,2,7]], eq: "—", rules: "Daemon of Tzeentch, Fly (9), Multiple Wounds (2); Slashing Attack" },
    brimstone:      { troop: "Infantry (Daemon)", profile: [["Brimstone Horrors",4,2,3,2,2,2,3,2,7]], eq: "Lesser Flames of Tzeentch", rules: "Daemon of Tzeentch, Flaming Attacks. Brimstone Horrors have a Line of Sight value of 0." },

    /* special */
    brutes:         { troop: "Monstrous Infantry (Daemon)", profile: [["Brute",6,4,0,5,4,3,5,3,7]], eq: "Hand weapon", rules: "Daemonic. May take a Daemonic Alignment." },
    bloodcrushers:  { troop: "Monstrous Cavalry (Daemon)", profile: [["Bloodletter",5,5,3,4,3,1,4,1,7],["Juggernaut",7,4,0,4,4,3,2,3,7]], eq: "Hand weapon", rules: "Mount: Juggernaut (Daemon). Daemon of Khorne, Killing Blow, Natural Armour (5+)" },
    bloodchariot:   { troop: "Chariot (Armour Save 4+)", profile: [["Blood Chariot",6,"-","-",5,5,5,"-","-","-"],["Bloodletter","-",5,3,4,"-","-",4,1,7],["Juggernaut","-",4,0,4,"-","-",2,3,7]], eq: "Hand weapon, scythes", rules: "Crew: 2 Bloodletters (Daemon). Drawn by: 1 Juggernaut (Daemon). Daemon of Khorne, Killing Blow (Bloodletter only), Natural Armour (5+)" },
    bloodbeasts:    { troop: "Monstrous Beast (Daemon)", profile: [["Bloodbeast",7,4,0,5,4,3,4,4,7]], eq: "—", rules: "Daemon of Khorne, Natural Armour (6+)" },
    poxriders:      { troop: "Monstrous Cavalry (Daemon)", profile: [["Plaguebearer",4,4,3,4,4,1,2,1,7],["Plague Toad",6,3,0,4,4,3,1,3,7]], eq: "Hand weapon", rules: "Mount: Plague Toad (Daemon). Daemon of Nurgle, Marsh Strider" },
    beastsofnurgle: { troop: "Monstrous Beast (Daemon)", profile: [["Beast of Nurgle",6,3,0,4,5,3,2,"*",7]], eq: "—", rules: "Daemon of Nurgle, Random Attacks (D6+1), Regeneration (6+); Attention Seeker; Slime Trail" },
    plaguechariot:  { troop: "Chariot (Armour Save 4+)", profile: [["Plague Chariot",5,"-","-",5,5,5,"-","-","-"],["Plaguebearer","-",4,3,4,"-","-",2,1,7],["Beast of Nurgle","-",3,0,4,"-","-",2,"*",7]], eq: "Hand weapon", rules: "Crew: 2 Plaguebearer (Daemon). Drawn by: 1 Beast of Nurgle (Daemon). Daemon of Nurgle, Random Attacks (D6+1) (Beast of Nurgle only), Regeneration (6+); Slime Trail" },
    pleasureseekers:{ troop: "Monstrous Cavalry (Daemon)", profile: [["Daemonette",6,5,4,3,3,1,5,2,7],["Serpent of Slaanesh",10,4,0,4,4,3,5,3,7]], eq: "Hand weapon", rules: "Mount: Serpent of Slaanesh (Daemon). Daemon of Slaanesh, Poisoned Attacks (Serpent of Slaanesh only)" },
    seekerchariot:  { troop: "Chariot (Armour Save 6+)", profile: [["Seeker Chariot",9,"-","-",4,4,4,"-","-","-"],["Daemonette","-",5,4,3,"-","-",5,2,7],["Alluress","-",5,4,3,"-","-",5,3,7],["Steed of Slaanesh","-",3,0,3,"-","-",5,1,"-"]], eq: "Scythes", rules: "Crew: 1 Daemonette & 1 Alluress (Daemon). Drawn by: 2 Steeds of Slaanesh (Daemon). Daemon of Slaanesh, Poisoned Attacks (Steed of Slaanesh only)" },
    fiends:         { troop: "Monstrous Beast (Daemon)", profile: [["Fiend",10,4,0,4,4,3,6,3,7]], eq: "—", rules: "Daemon of Slaanesh; Soporific Musk" },
    flamers:        { troop: "Infantry (Daemon)", profile: [["Flamer",6,2,4,4,4,2,4,2,7]], eq: "Flames of Tzeentch", rules: "Daemon of Tzeentch, Flaming Attacks, Skirmishers, Strider" },
    exaltedflamer:  { troop: "Monstrous Infantry (Daemon)", profile: [["Exalted Flamer",6,4,4,4,4,3,4,3,7]], eq: "Hand weapon", rules: "Daemon of Tzeentch, Flaming Attacks, Strider; Exalted Fire of Tzeentch" },
    firewyrms:      { troop: "Monstrous Beast (Daemon)", profile: [["Firewyrm","*",3,4,4,4,3,4,"*",7]], eq: "Exalted Flames of Tzeentch", rules: "Daemon of Tzeentch, Random Movement (3D6), Random Attacks (D6)" },

    /* rare */
    soulgrinder:    { troop: "Monster (Daemon)", profile: [["Soul Grinder",8,4,4,6,7,6,3,5,7]], eq: "Hand weapon, harvester cannon", rules: "Daemonic, Natural Armour (4+); Caught by the Iron Claw. May take a Daemonic Alignment." },
    skullcannon:    { troop: "Chariot (Armour Save 4+)", profile: [["Skull Cannon",6,5,"-",5,5,4,2,3,"-"],["Bloodletter","-",5,3,4,"-","-",4,1,7]], eq: "Hand weapon, scythes, skull cannon", rules: "Crew: 2 Bloodletters (Daemon). Daemon of Khorne, Killing Blow (Bloodletter only), Natural Armour (6+); Gorefeast" },
    plaguedrones:   { troop: "Monstrous Cavalry (Daemon)", profile: [["Plaguebearer",4,4,3,4,4,1,2,1,7],["Rot Fly",1,3,0,4,5,3,2,3,7]], eq: "Hand weapon", rules: "Mount: Rot Fly (Daemon). Daemon of Nurgle, Fly (6)" },
    exaltedseeker:  { troop: "Chariot (Armour Save 6+)", profile: [["Exalted Chariot",9,"-","-",4,4,8,"-","-","-"],["Daemonette","-",5,4,3,"-","-",5,2,7],["Alluress","-",5,4,3,"-","-",5,3,7],["Steed of Slaanesh","-",3,0,3,"-","-",5,1,"-"]], eq: "Scythes", rules: "Crew: 3 Daemonettes & 1 Alluress (Daemon). Drawn by: 4 Steeds of Slaanesh (Daemon). Daemon of Slaanesh, Impact Hits (3D6), Poisoned Attacks (Steed of Slaanesh only); Totem of Endless Pleasure" },
    hellflayer:     { troop: "Chariot (Armour Save 6+)", profile: [["Exalted Chariot",9,"-","-",4,4,4,"-","-","-"],["Daemonette","-",5,4,3,"-","-",5,2,7],["Alluress","-",5,4,3,"-","-",5,3,7],["Steed of Slaanesh","-",3,0,3,"-","-",5,1,"-"]], eq: "Scythes", rules: "Crew: 2 Daemonettes & 1 Alluress (Daemon). Drawn by: 2 Steeds of Slaanesh (Daemon). Daemon of Slaanesh, Impact Hits (2D6), Poisoned Attacks (Steed of Slaanesh only); Soulscent" },
    contorted:      { troop: "Shrine (Daemon)", profile: [["Contorted Epitome",6,5,0,4,4,4,5,4,"-"],["Alluress",6,5,4,3,"-","-",5,3,7]], eq: "—", rules: "Crew: 2 Alluresses (Daemon). Daemon of Slaanesh; Gift of Power; Horrible Fascination; Swallow Energy" },
    changebringers: { troop: "Cavalry (Daemon)", profile: [["Flamer",6,2,4,4,4,2,4,2,7],["Disc of Tzeentch",0,3,0,4,4,1,4,2,7]], eq: "Flames of Tzeentch", rules: "Daemon of Tzeentch, Flaming Attacks, Fly (9)" },
    burningchariot: { troop: "Chariot", profile: [["Burning Chariot","-","-","-",4,4,4,"-","-","-"],["Exalted Flamer","-",4,4,4,"-","-",4,3,7],["Blue Horror","-",3,3,2,"-","-",3,1,7],["Screamer","-",3,0,4,"-","-",4,2,"-"]], eq: "Exalted Flames of Tzeentch (Exalted Flamer only), scythes, Lesser Flames of Tzeentch (Blue Horrors only)", rules: "Crew: 1 Exalted Flamer (Daemon). Drawn by: 2 Screamers (Daemon). Daemon of Tzeentch, Fly (8), Flaming Attacks (Exalted Flamer only), Multiple Wounds (2) (Screamers only); Exalted Fire of Tzeentch; Slashing Attack" }
  },
  itemDesc: {
    "The Eternal Blade": `Daemon Prince only. Roll a D3 at the start of each round of combat – the bearer's Weapon Skill, Strength, Initiative and Attacks are increased by this amount until the end of the phase.`,
    "Axe of Khorne": `The wielder receives +1 Attack for each enemy model he is in base contact with, to a maximum of +3 Attacks.`,
    "Blade of Blood": `Attacks made with the Blade of Blood are resolved at +1 Strength and may re-roll failed rolls To Wound.`,
    "Firestorm Blade": `The Firestorm Blade gives the wielder the Flaming Attacks special rule and allows them to re-roll failed rolls To Wound.`,
    "Balesword": `Attacks made with the Balesword have the Poisoned Attacks and Multiple Wounds (D3) special rules.`,
    "Etherblade": `The Etherblade gives the wielder the Ignores Armour Saves special rule. In addition, enemy models Wounded by it must re-roll successful Magical Ward saves.`,
    "Lash of Despair": `The Lash of Despair uses the following profile: Range 12", Strength As user, Special Rules: Multiple Shots (D6), Quick Shot.`,
    "Staff of Change": `Any model that suffers one or more unsaved Wounds from the Staff of Change must immediately pass a Toughness test or suffer an additional D6 Wounds with the Ignores Armour Saves special rule. If a multiple-Wound model loses its last Wound to the Staff of Change, all enemy models within D6" immediately suffer a single Strength 5 hit.`,
    "Harvester of Skulls": `Bloodthirster or Bloodmaster only. This weapon makes the model's Killing Blow special rule take effect on a 4+.`,
    "Nurgle's Nail": `The wielder of this weapon will automatically Wound on the To Hit roll of a 5+. In addition, at the end of each round of close combat, roll 2D6 for each enemy model that has suffered one or more unsaved Wounds from this weapon. If the result is exactly 7, that model is slain with no saves of any kind allowed.`,
    "Ar'gath, the King of Blades": `The wielder of this weapon always automatically Hits enemy characters.`,
    "Behemoth's Bane": `When attacking Monsters, the wielder of Behemoth's Bane may re-roll failed To Wound rolls and gains the Multiple Wounds (D3) special rule.`,
    "The Virulent Blade": `If the wielder of this weapon rolls a natural 5 or 6 on their To Wound roll, that Attack has the Multiple Wounds (D6) special rule.`,
    "Pyrofyre Stave": `The wielder of this weapon gains the Flaming Attacks special rule, and may re-roll any To Wound rolls of 1 when casting magic missiles. In addition, if a Wizard suffers one or more unsaved Wounds against this weapon, they cannot channel Power or Dispel dice for the rest of the game.`,
    "Deathdealer": `Every time a model with this weapon causes an unsaved Wound, the enemy model must pass a Toughness test or suffer an additional Wound with no saves allowed.`,
    "Khartoth the Bloodhunger": `If a model suffers an unsaved Wound against this weapon, that model is subject to the Always Strikes Last special rule for the remainder of the close combat phase.`,
    "Plague Flail": `This weapon gives the wielder the Mighty Blow (1) special rule. Any model that suffers one or more unsaved Wounds from the Plague Flail must immediately pass a Toughness test or suffer another Wound with the Ignores Armour Saves special rule.`,
    "Torment Blade": `A model that suffers one or more unsaved wound from the Torment Blade must pass a Leadership test. If failed, they may not attack that close combat phase.`,
    "Blade of Fate": `For every 6 rolled when rolling To Hit, the wielder may re-roll a failed To Hit, To Wound or invulnerable save roll of their choosing this close combat phase.`,
    "Warpfire Blade": `If the wielder of this weapon rolls a natural 6 To Hit, that Attack automatically Wounds with the Multiple Wounds (2) and Flaming Attacks special rules.`,
    "Warptongue Blade": `If the Warptongue Blade causes an unsaved Wound in close combat, the target must pass a Leadership test or be removed as casualty, with no saves allowed.`,
    "Bileblade": `Great Unclean One only. At the start of each of your Magic phases, the bearer can choose to suffer one Wound with no saves allowed. If they do so, they gain +1 Power Dice for the remainder of this Magic phase.`,
    "Armour of Khorne": `Medium armour. Magic weapons carried by enemy models lose all their magical abilities whilst the bearer remains in contact with the Daemon.`,
    "Armour of Scorn": `Light armour. The wearer gains a Magical Ward (6+).`,
    "Daemonic Robes": `The Daemon can never be wounded on better than a 4+.`,
    "The Bloody Shackle": `One use only. The Bloody Shackle may be used at the start of any phase. Until the end of that turn, the wearer gains the Regeneration (4+) special rule.`,
    "Crimson Soulstone": `The bearer regains 1 Wound lost earlier during the game each time they slay an enemy character in close combat.`,
    "Abhorrent Lodestone": `Relic. Any enemy Wizard within 12" of the bearer of this item that rolls any double counts as having rolled a Miscast.`,
    "Doomsday Bell": `Relic. Bound Spell (Level 3, cast on 8+). The Doomsday Bell contains a summoning spell with a range of 18" that can target units of Plague Bearers, Nurglings or Plague Toads. The target unit immediately gains D6 Wounds worth of models.`,
    "Staff of Nurgle": `Staff. Bound Spell. The Staff of Nurgle contains the Rancid Visitation spell from the Lore of Nurgle.`,
    "Tome of a Thousand Poxes": `Relic. The bearer of this item gains a +1 casting bonus. This bonus increases by +1 for each subsequent spell successfully cast by the bearer on the same target during the current Magic phase.`,
    "Nine-Eyed Tome": `Relic. The bearer can re-roll one casting or dispel attempt each Magic phase.`,
    "Wand of Whimsy": `Staff. Whenever the bearer successfully casts or dispels a spell, roll a D6 – the Wand of Whimsy gains a charge token on a roll of 5+. The Wand of Whimsy grants the bearer a bonus to both Strength and Attacks equal to the number of charge tokens for the remainder of the game.`,
    "The Eternal Shroud": `Relic. Once per turn, the wearer can add or subtract 1 from any dice roll when channelling, casting, dispelling or rolling on the miscast table.`,
    "The Chromatic Tome": `Relic. You can choose to re-roll the Winds of Magic dice in your turn. However, if you do so, your opponent can also re-roll the Winds of Magic dice in their next turn if they wish. In either case, all of the Winds of Magic dice must be re-rolled.`,
    "Bloodstone": `One use only. Keep a tally of the number of models slain by the bearer in close combat during the game. At the start of any of your Magic phases, you may choose to use the Bloodstone. When you do so, you may summon a unit of Bloodletters equal in size to the number of models slain by the bearer anywhere within 12", facing in a direction of your choice. This unit does not have any upgrades, and do not award any Victory Points.`,
    "Beacon of Mutability": `All friendly Daemon of Tzeentch units within 6" of the bearer gain +1 To Wound in close combat.`,
    "Enrapturing Circlet": `All enemy models in base contact with the bearer of this item suffer -1 to their Attacks. In addition, any unit in base contact with the bearer suffer -2 to any Flee rolls they make.`,
    "Flesh Peeler": `The Flesh Peeler may be used at the start of your shooting phase as long as the wearer is not in close combat. When used, all enemy units within 12" take D6 Hits, even if engaged in close combat. Each Hit automatically Wounds on a 5+ which Ignores Armour Saves.`,
    "Mark of the Slayer": `The bearer and any unit they join may re-roll 1's To Hit in close combat. In addition, they may re-roll 1's To Wound in close combat during turns that they charge.`,
    "Threnody Voicebox": `Any enemy unit in base contact with the bearer of this item is subject to the Always Strikes Last special rule.`,
    "The Portalglyph": `All friendly units deploying using the Summoned from Beyond special rule may choose to automatically arrive if they place the marker within 12" of the bearer of this item.`,
    "The Rock of Inevitability": `One use only. The bearer of the Rock of Inevitability can use it at the end of any Movement phase. Place a cursed bulwark (an obstacle that provides hard cover up to 8" long) anywhere within 6" of the bearer. It cannot be placed on top of a unit, or placed on a terrain feature other than a hill. At the end of each of your turns, roll a D6. On a score of 1-3 nothing happens. On a score of 4-5 place a further cursed bulwark (this does not require the character to be within 6"). On a score of 6 place a cursed tower (a two story-building up to 6" in diameter). Cursed terrain features placed in this way must be positioned touching an existing cursed terrain feature, and cannot be placed on top of a unit, or a terrain feature other than a hill or forest. If the terrain feature cannot be placed, or you don't have the relevant terrain feature, then nothing is placed. Any unit from the Forces of Order within 6" of a cursed tower or cursed bulwark suffers a -2 penalty to their Initiative.`,
    "The Witherstave": `Enemy units in base contact with the bearer of this item must re-roll 6's To Hit in close combat.`,
    "Fallacious Gift": `At the start of the game, after deployment, nominate one enemy Character on the table. That Character suffers a Strength 4 Hit at the end of each close combat phase in which they have made one or more Attacks.`,
    "Mask of Spiteful Beauty": `Any enemy unit in base contact with the bearer of this item suffer -1 to their Leadership.`,
    "Mark of the Bloodreaper": `In each close combat phase that the bearer inflicts 3 or more unsaved Wounds, they gain +D3 to their close combat resolution.`,
    "Girdle of the Realm-Racer": `Mounted model only. The wearer gains the Fly (10) and Strider special rules.`,
    "The Crimson Crown": `For each To Hit roll of 6 they make in close combat, the wearer gets to make an additional Attack. These additional attacks do not generate further attacks.`,
    "Standard of Chaos Glory": `The Standard of Chaos Glory allows all friendly units of Daemons within 12" to roll an additional dice for their Daemonic Instability tests and discard the highest result.`,
    "Great Standard of Sundering": `All enemy Wizards targeting friendly units within 12" of this standard suffer a -1 casting penalty, and will miscast on the roll of both double 1's and 2's.`,
    "Great Icon of Despair": `All enemy units with Line of Sight to the Great Icon of Despair suffer a -1 penalty to their Leadership. This standard has no effect on models with Immunity (Psychology).`,
    "Banner of Unholy Victory": `The unit carrying the Banner of Unholy Victory gains a +D3 combat resolution bonus.`,
    "Standard of Beguilement": `Any enemy unit in base contact with the unit carrying this standard gains the Always Strikes Last special rule.`,
    "Standard of Conjuration": `Any spells cast by the unit carrying this standard are resolved at +1 Strength.`,
    "Banner of Infernal Fire": `Bound Spell (Level 2, cast on 8+). The Banner of Infernal Fire contains a direct damage aura spell with a range of 6". The target units suffer D6 Strength 5 Hits with the Flaming Attacks special rule.`,
    "Icon of Endless War": `The unit carrying this standard adds D3" to its charge move.`,
    "Standard of Eternal Wrath": `The unit carrying this standard gains the Hatred special rule.`,
    "Standard of Fecundity": `The unit carrying this standard gains the Regeneration (6+) special rule.`,
    "Standard of Seeping Decay": `If any model in the unit carrying this standard rolls a natural 6 To Hit in close combat, the target immediately suffers an additional automatic hit resolved at Strength 4.`,
    "Banner of Ecstasy": `The unit carrying this standard gains the Stubborn special rule.`,
    "Siren Standard": `Any enemy unit charged by the unit carrying this standard can only choose Hold as a charge reaction. This standard has no effect on models with the Immunity (Psychology) special rule.`,
    "Standard of Twisted Grace": `The unit carrying this standard gains the Vanguard special rule, and automatically pass Dangerous Terrain tests, "Look Out Sir!" tests and characteristic tests (but not Leadership tests).`,
    "Banner of Change": `Bound Spell (Level 2, cast on 7+). The Banner of Change contains a direct damage aura spell that targets all enemy units in base contact. The target units suffer 2D6 Strength 3 Hits.`,
    "Icon of Sorcery": `The unit carrying this standard gains a +1 casting bonus.`,
    "Icon of Eternal Virulence": `Each unsaved Wound caused by the unit carrying this standard when rolling a natural 6 on the To Wound roll add an extra point of Combat Resolution in the first round of close combat. In the second round of close combat it takes effect on To Wound rolls of 5+, and in the third round of close combat on To Wounds rolls of 4+, and so on. The effect resets if the unit leaves combat.`,
    "Skull Totem": `The unit carrying this standard gain +1 to its Movement when they make March moves and do not need to test to be able to March due to nearby enemies.`,
    "Standard of Transmogrification": `When a model with the Split special rule in the unit carrying this standard is slain, you may re-roll dice results of 1-3 to see if it turns into two Blue Horrors.`,
    "Bringer of the Swarm": `At the end of every Close Combat phase in which the Daemon causes one or more unsaved Wounds, a unit of Chaos Furies with the same Daemonic Alignment as the Daemon is created. The unit consists of one Chaos Fury for every unsaved Wound caused. The unit must be placed wholly within 12" of the Daemon and cannot be placed with 1" of another unit or impassable terrain. If any model cannot be placed because there isn't enough room, or you do not have sufficient models, it is lost. Units created in this way do not award victory points.`,
    "Aura of Disruption": `Any dispel attempt you make while this model is within dispel range receives one extra 'free' dispel dice.`,
    "Tzeentch's Will": `The Daemon may re-roll a single D6 once per player turn. This can be any roll To Hit, To Wound, armour save, invulnerable save, channelling, casting, dispelling, miscast, charging, pursuing, characteristic test or Leadership test.`,
    "Sorcerous Lodestone": `Whenever a spell is successfully cast by any Wizard, roll a D6 – this Daemon regains a Wound lost earlier in the battle on a roll of 5+. Whenever a spell is miscast by any Wizard, the Daemon instead suffers a Wound on a roll of 4+.`,
    "Aura of Fury": `Bloodthirster only. All friendly Daemons of Khorne units within 12" of the Daemon may re-roll 1's To Wound and gain the Fight in Extra Ranks (1) special rule.`,
    "Sensual Barrage": `Keeper of Secrets only. All enemy units within 6" of the Daemon are subject to the Always Strikes Last special rule. This has no effect on Daemons of Slaanesh.`,
    "Spirit Swallower": `Roll a D6 for each unsaved wound the Daemon causes in close combat. On a 4+, the Daemon regains one wound lost earlier in the battle.`,
    "Aspect of Tzeentch": `Every time this Daemon uses a Power or Dispel dice, roll a D6. On a 6, they may use this dice again this phase. These additional dice cannot generate new dice.`,
    "Twin Heads": `The Daemon gains a +2 casting bonus.`,
    "Hellfire": `Bloodthirster only. The Daemon gains a Strength 5 Breath Weapon with the Flaming Attacks special rule.`,
    "Lord of Flux": `At the beginning of each round of close combat, all enemy models in base contact with the Daemon must roll a D6, on a 4+ they suffer 1 Wound which Ignores Armour Saves.`,
    "Daemonic Arrogance": `The Daemon gains the Stubborn special rule.`,
    "Chaos Disruption": `Any missile attack targeting the Daemon or the unit it is with suffers an additional -1 to Hit penalty.`,
    "Noxious Breath": `The Daemon has a Strength 2 Breath Weapon with the Ignores Armour Saves special rule.`,
    "Souleater": `At the end of any phase in which the Daemon causes one or more unsaved Wounds in close combat, it regains a single lost Wound.`,
    "Soul Hunger": `The Daemon may re-roll failed rolls To Hit and To Wound in the first round of any combat.`,
    "Unholy Sacrifice": `This Daemon can choose to lose D3 Wounds (with no saves allowed) at the start of any of your Magic phases. If it does so, add D3+1 dice to your power pool.`,
    "Ward of Chaos": `The Daemon has the Magical Ward (3+) special rule against missile attacks.`,
    "Dark Insanity": `Bloodthirster only. The Daemon replaces its normal Attacks with the Random Attacks (2D6+2) special rule.`,
    "Slaughterborn": `The Daemon gains +D3 Attacks in close combat.`,
    "Extreme Contagion": `Great Unclean One only. All enemy units within 6" of the Daemon at the start of any close combat phase suffer D6 Hits that Wound on a 5+ with the Ignores Armour Saves special rule. This has no effect on Daemons of Nurgle.`,
    "The Bountiful Swarm": `At the start of each close combat phase, all enemy units in base contact with the Daemon suffer D6 Hits. Models Hit must pass a Toughness test or suffer a Wound which Ignores Armour saves. This has no effect on Daemons of Nurgle.`,
    "Stream of Bile": `This is a Strength 4 Breath Weapon. It has no effect on Daemons of Nurgle.`,
    "Temptator": `At the beginning of a combat, one enemy character in base contact with the Daemon must take a Psychology test. If the test is failed, the character will direct his attacks against friendly models or units chosen by the Daemon's controlling player. These wounds count towards the Daemon's combat resolution. If there are no suitable targets in base contact with the character, he or she does not attack at all this turn.`,
    "Symphoniac": `At the beginning of each round of close combat, all enemy models in base contact with the Daemon must pass a Toughness test or suffer 1 Wound which Ignores Armour saves.`,
    "Master of Sorcery": `The Daemon gains the Loremaster special rule. In addition, it can use any of the Winds of Magic from the Warhammer Rulebook instead of its normal Lore.`,
    "Power Vortex": `Once per Magic phase, the Daemon may add an additional 'free' Power dice to the casting attempt. This can cause Ultimate Power as normal, and can cause the Daemon to roll more dice than normally allowed.`,
    "Radiance of Dark Glory": `The Daemon and all friendly units within 12" suffer one less wound than normal when taking Daemonic Instability tests.`,
    "Spell Destroyer": `If an enemy spell is successfully cast on a model with this Gift, or the unit it is in, roll a D6. On a 4+, the spell is destroyed after it has been resolved, and the enemy must discard the spell for the rest of the game.`,
    "Spell Breaker": `One use only. When an enemy spell has been cast, a Daemon with this Gift can use it instead of attempting to dispel the spell by using dispel dice. This gives them 6 free dice to attempt to dispel the spell, which cannot be combined with any other dispel dice. This may also be used to dispel spells that Remains in Play.`,
    "Immortal Fury": `The Daemon gains the Hatred special rule, which applies in all rounds of close combat. However, it must always pursue fleeing enemies.`,
    "Noxious Vapours": `All enemy models in base contact with this Daemon are subject to the Always Strikes Last special rule in close combat. This has no effect on Daemons of Nurgle.`,
    "Nurgle's Rot": `Enemy models in base contact with the Daemon at the start of any close combat phase suffer a Strength 2 Hit with the Ignores Armour Saves special rule. This has no effect on Daemons of Nurgle.`,
    "Nurgling Infestation": `Great Unclean One only. At the start of each of your turns, one unit of Nurglings within 6" of the Daemon automatically regains D6 Wounds lost earlier in the battle.`,
    "Pestilent Breath": `This is a Breath Weapon. Each model hit suffers a Wound on a 5+ which Ignores Armour saves. It has no effect on Daemons of Nurgle.`,
    "Pestilent Mucus": `When this Daemon suffers a wound, all enemy models in base contact must pass a Toughness test for each Wound inflicted on the Daemon or themselves suffer a Wound with the Ignores Armour Saves special rule. This has no effect on Daemons of Nurgle.`,
    "Invigorated by Pain": `Keeper of Secrets only. The Daemon gains +1 Attack for each unsaved Wound they have lost on their starting profile.`,
    "Siren Song": `This gift is used during the enemy turn, before charges are declared. Nominate one enemy unit within their maximum charging distance and with Line of Sight to the Daemon – this unit must be able to charge according to the normal Warhammer rules. The target unit must pass a Psychology test or declare a charge against the Daemon (or the unit it is with).`,
    "Soporific Musk": `Models in base contact with one or more models with this Gift suffer a -1 penalty to both Weapon Skill and Initiative. This has no effect on Daemons of Slaanesh.`,
    "Unnatural Swiftness": `The Daemon has the Always Strikes First special rule.`,
    "Barrage of Knowledge": `Lord of Change only. All enemy Wizards within 18" of the Daemon suffer a -1 casting penalty.`,
    "Dark Magister": `The Daemon ignores the result of his first Miscast.`,
    "Wellspring of Arcane Might": `The Daemon gains a +1 bonus when channelling Power dice.`,
    "Cleaving Blow": `The Daemon's close combat attacks have the Multiple Wounds (2) special rule.`,
    "Crushing Mass": `The Daemon gains the Impact Hits (D3) special rule.`,
    "Impenetrable Hide": `The Daemon gains +1 Toughness.`,
    "Withering Gaze": `This is a missile attack with the following profile: Range 12", Strength 6, Special Rules: Quick Shot.`,
    "Massive Might": `The Daemon may re-roll failed rolls To Wound in close combat.`,
    "Battlemaster": `The Daemon receives +1 To Hit in close combat.`,
    "Might of Khorne": `The Daemon gains the Heroic Killing Blow special rule.`,
    "Gift of Febrile Frenzy": `Once per battle, at the start of any close combat phase, the Daemon can make the unit they are with subject to the Frenzy special rule for the remainder of this turn.`,
    "Allure of Slaanesh": `Enemy models in base contact with the Daemon must pass a Psychology test. If the test is failed, the affected model may not strike blows in that round of combat.`,
    "Enrapturing Gaze": `Units in base contact with the Daemon cannot use the Inspiring Presence of Hold Your Ground special rules.`,
    "Tormentor": `Each unsaved Wound inflicted in close combat from the Daemon counts as two Wounds for the purposes of combat resolution.`,
    "Cursed Ichor": `Roll a D6 every time the Daemon suffers an unsaved Wound; on a 5+, the model that struck the blow suffers a Wound which Ignores Armour Saves.`,
    "Flames of Tzeentch": `The Daemon gains the Flames of Tzeentch special rule.`,
    "Iridescent Corona": `Enemy models in base contact with the Daemon at the start of any close combat phase suffer a Strength 3 Hit with the Flaming Attacks special rule. Any wounds caused count towards combat resolution.`,
    "Awesome Strength": `The Daemon gains +1 Strength.`,
    "Corpulence": `The Daemon gains +1 Wound.`,
    "Diabolic Splendour": `The Daemon may re-roll 1's when taking Ward saves.`,
    "Incorporeal Strike": `Enemies Wounded by this Daemon in close combat must re-roll successful armour saves.`,
    "Skill Swallower": `Whenever the Daemon slays an enemy character in close combat, it immediately increases one characteristic, of your choice, by one point.`,
    "Unbreakable Skin": `The Daemon gains the Natural Armour (5+) special rule.`,
    "Unholy Flurry": `The Daemon has +1 Attacks.`,
    "Aspect of Death": `Enemy units in base contact with the Daemon suffer an additional -D3 to their Leadership when taking Break tests.`,
    "Relentless Hunter": `Bloodthirster only. The Daemon gains the Hatred (Characters) special rule and gains 3" to its charge range when charging a unit containing any characters.`,
    "Unrivalled Battle-Lust": `The Daemon may re-roll failed charge distances.`,
    "Trappings of Nurgle": `The Daemon gains the Natural Armour (5+) special rule.`,
    "Dark Blessing": `The Daemon gains a Magical Ward (2+) against the first Wound it suffers in the battle.`,
    "Arch-Slaughterer": `The Daemon doubles the amount of combat resolution it receives for Wounds caused in a challenge.`,
    "Rage Unchained": `The Daemon gains the Frenzy special rule.`,
    "Devastating Blow": `The Daemon may replace its normal Attacks for a special attack. If this special attack Hits, it automatically Wounds with the Multiple Wounds (D6) special rule.`,
    "The Endless Gift": `The Daemon gains the Regeneration (6+) special rule.`,
    "Slime Trail": `Enemy units do not receive combat resolution bonuses for attacking the flank or rear of a Daemon with this ability, or any unit he has joined.`,
    "All-Seeing Eye": `At the start of each of your Magic Phases, you may pick one enemy unit within 24" of the Daemon. That unit must reveal all Magic Items and Hidden units in it.`,
    "Mark of the Conjurer": `The Daemon gain a +1 bonus to all Fires of Change rolls (see Lore of Tzeentch).`
  },
  spellLores: {
    "Chaos": {
      attribute: { name: "Scions of the Dark Gods", text: `Roll a D6 for each unsaved Wound caused by a spell from this lore; on a 5+, add 1 Wound's worth of models to one friendly Daemonic unit within 12" of the caster, just like a summoning spell.` },
      spells: [
        { name: "The Summoning", lvl: 0, cast: 6, type: "Magic missile", range: `18"`, effect: `Causes 2D6 Strength 3 hits with the Armour Piercing (1) special rule.` },
        { name: "Daemonic Familiars", lvl: 1, cast: 5, type: "Direct damage (aura)", range: "Base contact", effect: `Targets all units in base contact with the Wizard. The target units suffer 2D6 Strength 2 hits with the Ignores Armour saves special rule.` },
        { name: "Gift of Chaos", lvl: 1, cast: 6, type: "Direct damage (aura)", range: `12"`, effect: `Each target suffers D6 Strength 3 Hits.` },
        { name: "Veil of Gloom", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `The target unit gains a Magical Ward (5+) against missile attacks until the start of your next Magic phase.` },
        { name: "Vision of Torment", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `The target must pass a Leadership test or be unable to voluntarily move or shoot until the start of the caster's next turn.` },
        { name: "Winds of Chaos", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `The target suffers -2 to their Movement until the start of the caster's next turn.` },
        { name: "Binding Damnation", lvl: 2, cast: 9, type: "Hex", range: `24"`, effect: `The target suffers -3 to their Weapon Skill and Ballistic Skill (to a minimum of 1) until the start of the caster's next turn.` },
        { name: "Mask of Darkness", lvl: 3, cast: 9, type: "Conveyance", range: `12"`, effect: `The target is immediately picked up and may be moved to any point on the battlefield within 12" of its original position, just like a summoning spell.` },
        { name: "Veil of Corruption", lvl: 3, cast: 9, type: "Direct damage (area)", range: `24"`, effect: `Uses the large round template. All models hit by the template suffer a Strength 3 hit.` },
        { name: "Ruinous Vigour", lvl: 3, cast: 10, type: "Augment", range: `18"`, effect: `The target gains +1 Movement, Toughness and Initiative until the start of the caster's next Magic phase.` },
        { name: "Chaotic Conduit", lvl: 4, cast: 10, type: "Augment", range: `18"`, effect: `The target gains +1 To Hit and To Wound in close combat until the start of the caster's next Magic phase.` },
        { name: "Spite-tongue Curse", lvl: 4, cast: 12, type: "Direct damage", range: `12"`, effect: `Causes 3D6 Strength 5 hits. However, if the spell fails to reach its casting value, the caster suffers 1 Wound which Ignores Armour Saves.` },
        { name: "Vortex of Chaos", lvl: 4, cast: 15, type: "Vortex", range: "Large round template", effect: `Remains in play. A magical vortex that uses the large round template. Any model touched by the template at any point during its move suffer a Strength 4 hit.` }
      ]
    },
    "Nurgle": {
      attribute: { name: "Children of Nurgle", text: `Roll a D6 for each unsaved Wound caused by a spell from this lore; on a 5+, add 1 Wound's worth of models to one friendly Daemons of Nurgle unit within 12" of the caster, just like a summoning spell.` },
      spells: [
        { name: "Stream of Corruption", lvl: 0, cast: 7, type: "Direct damage", range: "Breath Weapon", effect: `The caster makes a Breath Weapon Attack. This may be cast in close combat, following the normal rules for Breath Weapons. All models Hit must pass a Toughness test or suffer a Wound with the Ignores Armour saves special rule.` },
        { name: "Miasma of Pestilence", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `Until the start of the caster's next Magic phase, all enemy units in base contact with the target unit reduce their Weapon Skill and Initiative by 1 (to a minimum of 1).` },
        { name: "Blades of Putrefaction", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `The target unit's close combat attacks gain the Poisoned Attacks special rule until the start of the caster's next Magic phase.` },
        { name: "Magnificent Buboes", lvl: 1, cast: 6, type: "Magic missile", range: `18"`, effect: `Targets a single enemy model (even a character in a unit). The target suffers one Wound which Ignores Armour saves.` },
        { name: "Curse of the Leper", lvl: 2, cast: 7, type: "Augment / Hex", range: `24"`, effect: `If cast on a friendly unit, it increases the target unit's Toughness by 1 until the start of the caster's next Magic phase. If cast on an enemy unit, it reduces the target unit's Toughness by 1 (to a minimum of 1) until the start of the caster's next Magic phase.` },
        { name: "Plague Squall", lvl: 2, cast: 8, type: "Direct damage (area)", range: `24"`, effect: `Uses the large round template; it scatters like a stone thrower. If a misfire is rolled, the caster suffers 1 Wound which Ignores Armour Saves. Any model hit suffers a Strength 1 Hit with the Ignores Armour Saves special rule.` },
        { name: "Rancid Visitations", lvl: 2, cast: 10, type: "Magic missile", range: `18"`, effect: `Inflicts D6 Strength 5 hits. The target unit must then immediately pass a Toughness test or suffer a further D6 hits. The target must keep taking Toughness tests until it passes, or is removed as a casualty.` },
        { name: "Rotbomb", lvl: 3, cast: 10, type: "Hex", range: `24"`, effect: `The target's armour save is lowered by two points for the rest of the game. Rotbomb can be repeatedly cast on the same target, reducing its armour save by a further -2 each time.` },
        { name: "Cloying Quagmire", lvl: 3, cast: 11, type: "Direct damage", range: `24"`, effect: `All models in the unit must take an Initiative test. Those that fail must then take an armour save (using its combat value). If passed, they are removed as casualties, with no saves allowed. Models without armour count as passing on a 6. This spell has no effect on models with the Fly, Ethereal or Strider special rules.` },
        { name: "Fleshy Abundance", lvl: 3, cast: 11, type: "Augment", range: `18"`, effect: `Until the start of the caster's next Magic phase, the target has the Regeneration (5+) special rule (to a maximum of a 3+ save for Daemons of Nurgle).` },
        { name: "Grandfather Nurgle's Circle of Life", lvl: 4, cast: 11, type: "Direct damage", range: `24"`, effect: `Causes D6 hits that wound on a 4+ with the Ignores Armour Saves special rule. For each unsaved Wound caused, one friendly unit within 6" of the caster instantly recovers 1 Wounds' worth of models slain earlier in the battle, just like a summoning spell.` },
        { name: "Plague Wind", lvl: 4, cast: 12, type: "Vortex", range: "Small round template", effect: `Remains in play. A magical vortex that uses the small round template. Any model touched by the template at any point during its move must pass a Toughness test or suffer a single Wound with the Ignores Armour Saves special rule.` },
        { name: "Rot, Glorious Rot", lvl: 4, cast: 13, type: "Direct damage (aura)", range: `18"`, effect: `Each target suffers D6 Strength 3 Hits with the Ignores Armour Saves special rule.` }
      ]
    },
    "Slaanesh": {
      attribute: { name: "Born of Damnation", text: `Roll a D6 for each unsaved Wound caused by a spell from this lore; on a 5+, add 1 Wound's worth of models to one friendly Daemons of Slaanesh unit within 12" of the caster, just like a summoning spell.` },
      spells: [
        { name: "Lash of Slaanesh", lvl: 0, cast: 6, type: "Direct damage", range: `24" line`, effect: `Extend a straight line, 24" in length, within the caster's forward arc and directly from their base. Each model in the way (determined using the line template) suffers a Strength 4 hit with the Armour Piercing (1) special rule. Any unit that suffers a casualty from this spell may not march in its next Movement phase.` },
        { name: "Hysterical Frenzy", lvl: 1, cast: 6, type: "Augment / Hex", range: `24"`, effect: `Remains in play. While the spell is in effect, the target gains the Frenzy special rule (which is not lost if the unit is defeated in close combat) and suffers D6 Strength 3 hits at the end of each of the caster's Magic phases.` },
        { name: "Pavane of Slaanesh", lvl: 1, cast: 6, type: "Direct damage", range: `12"`, effect: `Targets a single enemy model (even a character in a unit). If successfully cast, the target must pass a Leadership test on their own unmodified Leadership or suffer 1 Wound which Ignores Armour Saves for every point they failed the test by.` },
        { name: "Succour of Chaos", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `The target gains the Always Strikes First special rule until the start of the caster's next Magic phase.` },
        { name: "Titillating Delusions", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `Remains in play. Place a marker (this has a Line of Sight value of 1) within 24" of the caster. While the spell is in effect, the target must pass a Leadership test at the start of each of their Movement phases or be forced to move towards the marker as quickly as possible. The spell is automatically dispelled as soon as the unit reaches the marker or loses Line of Sight to it.` },
        { name: "Slothful Stupor", lvl: 2, cast: 8, type: "Hex", range: `24"`, effect: `The target suffers -2 Leadership and gains the Stupidity special rule until the start of the caster's next Magic phase.` },
        { name: "Acquiescence", lvl: 2, cast: 9, type: "Hex", range: `24"`, effect: `The target unit is subject to the Always Strikes Last and Random Movement (D6) special rules until the start of the caster's next Magic phase.` },
        { name: "Delicious Excruciation", lvl: 3, cast: 9, type: "Hex", range: `24"`, effect: `Until the start of the caster's next Magic phase, all models in the target are automatically Hit in close combat and gain the Unbreakable special rule.` },
        { name: "Slicing Shards", lvl: 3, cast: 10, type: "Magic missile", range: `24"`, effect: `Inflicts D6 Strength 4 hits with the Armour Piercing (1) special rule. The target must then immediately pass a Leadership test or suffer a further D6 hits. The target must keep taking Leadership tests until it passes, or is removed as a casualty.` },
        { name: "Phantasmagoria", lvl: 3, cast: 10, type: "Hex", range: `24"`, effect: `Until the start of the caster's next Magic phase, the target unit must roll an additional D6 whenever it takes a Leadership test, discarding the lowest result rolled.` },
        { name: "Cacophonic Choir", lvl: 4, cast: 15, type: "Hex", range: `12"`, effect: `The target takes 3D6 hits that wound on a 4+ which Ignores Armour saves. If at least one unsaved Wound is caused, the target is subject to the Always Strikes Last and Random Movement (D6) special rules until the start of the caster's next Magic phase.` },
        { name: "Ecstatic Seizures", lvl: 4, cast: 15, type: "Direct damage", range: `12"`, effect: `All models in the target unit must pass a Strength test or suffer 1 Wound which Ignores Armour Saves.` },
        { name: "Song of Seduction", lvl: 4, cast: 15, type: "Hex", range: `24"`, effect: `Remains in play. While the spell is in effect, this unit is wholly under the caster's control. It may move and shoot (but not charge, cast spells or channel dice) during the enemy's turn as if it were your own unit. At the end of each subsequent Magic phase, the unit must take a Leadership test. If passed, the spell is dispelled. The spell is immediately dispelled if the unit becomes engaged in close combat.` }
      ]
    },
    "Tzeentch": {
      attribute: { name: "Fires of Change", text: `Roll a D6 for each unsaved Wound caused by a spell from this lore; on a 5+, add 1 Wound's worth of models to one friendly Daemons of Tzeentch unit within 12" of the caster, just like a summoning spell.` },
      spells: [
        { name: "Blue Fire of Tzeentch", lvl: 0, cast: 6, type: "Magic missile", range: `24"`, effect: `Causes D6 Strength D6+1 hits with the Flaming Attacks special rule.` },
        { name: "Baleful Transmogrification", lvl: 1, cast: 6, type: "Direct damage", range: `24"`, effect: `The target suffers D3 Strength D6 Hits which Ignores Armour Saves. If a 3 is rolled for the number of Hits, it suffers an additional D3 hits.` },
        { name: "Boon of Tzeentch", lvl: 1, cast: 6, type: "Augment", range: "Self", effect: `Cast on the Wizard itself. The Wizard immediately gains D3+1 Power dice, that only they may use.` },
        { name: "Pandemonium", lvl: 1, cast: 7, type: "Hex", range: `24"`, effect: `Until the start of the caster's next Magic phase, the target unit suffers -1 Leadership and cannot benefit from the Inspiring Presence or Hold Your Ground! abilities.` },
        { name: "Pink Fire of Tzeentch", lvl: 2, cast: 8, type: "Direct damage", range: "Teardrop template", effect: `Place the teardrop-shaped template with its narrow end touching the front of the Wizard's base and the large end aimed at the target. Roll 2D6 and move the template directly forwards the number of inches indicated. All models underneath the template suffer a Strength D6+1 hit (roll once and apply the result to all models) with the Flaming Attacks special rule.` },
        { name: "Bolt of Change", lvl: 2, cast: 8, type: "Magic missile", range: `24"`, effect: `Inflicts a single Strength D6+4 hit with the Multiple Wounds (D3), Ignores Armour Saves and Flaming Attacks special rules, and then penetrates ranks in the same manner as a shot from a bolt thrower.` },
        { name: "Shield of Fate", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `The target may re-roll armour and Ward save rolls of 1 until the start of the caster's next Magic phase.` },
        { name: "Fold Reality", lvl: 3, cast: 8, type: "Augment", range: `18"`, effect: `The target unit instantly recovers D3+1 Wounds' worth of models slain earlier in the battle, just like a summoning spell. However, if a 1 is rolled, the target suffers D3+1 Wounds with no saves allowed instead.` },
        { name: "Glean Magic", lvl: 3, cast: 8, type: "Hex", range: `18"`, effect: `Targets a single enemy Wizard. The caster and the target both roll a D6 and add their Wizard level to the score. If the caster rolls higher, the target suffers a Strength 4 hit with the Flaming Attacks special rule and loses one Wizard level (along with one spell). The caster gains access to this spell (unless it is a summoning spell) and can cast it themselves for the remainder of the game (using Boon of Magic as the Lore Attribute).` },
        { name: "Tzeentch's Firestorm", lvl: 3, cast: 11, type: "Direct damage (area)", range: `30"`, effect: `Uses the small round template. All models hit by the template suffer a Strength D6+1 hit (roll once and apply the result to all models) with the Flaming Attacks special rule.` },
        { name: "Daemonfire Vortex", lvl: 4, cast: 12, type: "Vortex", range: "Small round template", effect: `Remains in play. A magical vortex that uses the small round template. Any model touched by the template at any point during its move suffers a Strength D6+1 hit (roll once for each unit and apply the result to all models in that unit) with the Flaming Attacks special rule.` },
        { name: "Treason of Tzeentch", lvl: 4, cast: 14, type: "Hex", range: `24"`, effect: `All models in the unit immediately make a number of close combat attacks equal to the models' Attack characteristic (in addition to any extra Attacks from weapons) against the unit itself. Roll To Hit, To Wound and take saves as normal. The caster may choose which of the unit's weapons is used for these attacks. Parry or Dodge saves do not apply, and neither do any special rules that only apply in the first round of close combat.` },
        { name: "Infernal Gateway", lvl: 4, cast: 15, type: "Direct damage", range: `24"`, effect: `The target suffers 2D6 Strength 2D6 hits with the Flaming Attacks special rule. Roll for the Strength first. If an 11 or 12 is rolled when determining the spell's Strength value, the hits are resolved at Strength 10, and the unit suffers 3D6 hits rather than 2D6.` }
      ]
    }
  },
  units: {
    characters: [
      { id: "daemonprince", name: "Daemon Prince", isCharacter: true,
      access: ["light armour","medium armour"],
        variants: [ { name: "Daemon Prince", points: 250, wizardLevel: 0, magicBudget: 100 } ],
        lores: [
          { name: "Beasts",   requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Chaos",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Death",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Fire",     requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Heavens",  requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Metal",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Shadow",   requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Nurgle",   requiresChoice: { id: "align", is: "Daemon of Nurgle" } },
          { name: "Slaanesh", requiresChoice: { id: "align", is: "Daemon of Slaanesh" } },
          { name: "Tzeentch", requiresChoice: { id: "align", is: "Daemon of Tzeentch" } } ],
        options: [
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Khorne", cost: 15, god: "Khorne" }, { label: "Daemon of Nurgle", cost: 15, god: "Nurgle" },
            { label: "Daemon of Slaanesh", cost: 15, god: "Slaanesh" }, { label: "Daemon of Tzeentch", cost: 15, god: "Tzeentch" } ] },
          { id: "wizlvl", type: "choice", label: "Wizard (not Khorne)", noGod: ["Khorne"], choices: [
            { label: "Level 1 Wizard", cost: 35, wizLevel: 1 }, { label: "Level 2 Wizard", cost: 70, wizLevel: 2 },
            { label: "Level 3 Wizard", cost: 105, wizLevel: 3 }, { label: "Level 4 Wizard", cost: 140, wizLevel: 4 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 5 }, { label: "Medium armour", cost: 15 } ] },
          { id: "fly", type: "toggle", label: "Fly (8)", cost: 25, per: "flat" } ] },
      { id: "exalteddaemon", name: "Exalted Daemon", isCharacter: true,
      access: ["light armour","medium armour"],
        variants: [ { name: "Exalted Daemon", points: 170, wizardLevel: 0, magicBudget: 50 } ],
        lores: [
          { name: "Beasts",   requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Chaos",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Death",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Fire",     requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Heavens",  requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Metal",    requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Shadow",   requiresChoice: { id: "align", is: [null,"Daemon of Khorne"] } },
          { name: "Nurgle",   requiresChoice: { id: "align", is: "Daemon of Nurgle" } },
          { name: "Slaanesh", requiresChoice: { id: "align", is: "Daemon of Slaanesh" } },
          { name: "Tzeentch", requiresChoice: { id: "align", is: "Daemon of Tzeentch" } } ],
        options: [
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Slaanesh", cost: 5, god: "Slaanesh" }, { label: "Daemon of Khorne", cost: 15, god: "Khorne" },
            { label: "Daemon of Nurgle", cost: 15, god: "Nurgle" }, { label: "Daemon of Tzeentch", cost: 15, god: "Tzeentch" } ] },
          { id: "wizlvl", type: "choice", label: "Wizard (not Khorne)", noGod: ["Khorne"], choices: [
            { label: "Level 1 Wizard", cost: 35, wizLevel: 1 }, { label: "Level 2 Wizard", cost: 70, wizLevel: 2 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 5 }, { label: "Medium armour", cost: 15 } ] },
          { id: "fly", type: "toggle", label: "Fly (8)", cost: 25, per: "flat" },
          { id: "bsb", type: "toggle", label: "Battle Standard", cost: 25, per: "flat", bsb: true } ] },
      { id: "bloodthirster", god: "Khorne", name: "Bloodthirster", isCharacter: true,
      access: ["additional hand weapon","great weapon","light armour","medium armour"],
        variants: [ { name: "Bloodthirster", points: 375, magicBudget: 100 } ],
        options: [
          { id: "wpn", type: "choice", label: "Weapon", choices: [
            { label: "Additional hand weapon", cost: 10 }, { label: "Great weapon", cost: 10 } ] },
          { id: "armour", type: "choice", label: "Armour", choices: [
            { label: "Light armour", cost: 6 }, { label: "Medium armour", cost: 18 } ] } ] },
      { id: "bloodmaster", god: "Khorne", name: "Bloodmaster", isCharacter: true,
      access: ["great weapon","light armour"],
        variants: [ { name: "Bloodmaster", points: 110, magicBudget: 50 } ],
        options: [
          { id: "gw", type: "toggle", label: "Great weapon", cost: 5, per: "flat" },
          { id: "la", type: "toggle", label: "Light armour", cost: 3, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Juggernaut", cost: 50 }, { label: "Blood Throne", cost: 150 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard", cost: 25, per: "flat", bsb: true } ] },
      { id: "greatucleanone", god: "Nurgle", name: "Great Unclean One", isCharacter: true,
      access: ["additional hand weapon"],
        variants: [ { name: "Great Unclean One", points: 400, wizardLevel: 1, magicBudget: 100 } ],
        lores: ["Nurgle"],
        options: [
          { id: "wizup", type: "choice", label: "Wizard Level", choices: [
            { label: "Level 2", cost: 35, wizLevel: 2 }, { label: "Level 3", cost: 70, wizLevel: 3 }, { label: "Level 4", cost: 105, wizLevel: 4 } ] },
          { id: "ahw", type: "toggle", label: "Additional hand weapon", cost: 20, per: "flat" } ] },
      { id: "poxbringer", god: "Nurgle", name: "Poxbringer", isCharacter: true,
      access: [],
        variants: [ { name: "Poxbringer", points: 110, wizardLevel: 0, magicBudget: 50 } ],
        lores: ["Nurgle"],
        options: [
          { id: "wizlvl", type: "choice", label: "Wizard", choices: [
            { label: "Level 1", cost: 35, wizLevel: 1 }, { label: "Level 2", cost: 70, wizLevel: 2 } ] },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Palanquin", cost: 30 }, { label: "Plague Toad", cost: 35 }, { label: "Rot Fly", cost: 45 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard", cost: 25, per: "flat", bsb: true } ] },
      { id: "sloppity", god: "Nurgle", name: "Sloppity Bilepiper", isCharacter: true,
      access: [],
        variants: [ { name: "Sloppity Bilepiper", points: 95, magicBudget: 50 } ], options: [] },
      { id: "spoilpox", god: "Nurgle", name: "Spoilpox Scrivener", isCharacter: true,
      access: [],
        variants: [ { name: "Spoilpox Scrivener", points: 95, magicBudget: 50 } ], options: [] },
      { id: "keeperofsecrets", god: "Slaanesh", name: "Keeper of Secrets", isCharacter: true,
      access: ["buckler"],
        variants: [ { name: "Keeper of Secrets", points: 400, wizardLevel: 1, magicBudget: 100 } ],
        lores: ["Slaanesh"],
        options: [
          { id: "wizup", type: "choice", label: "Wizard Level", choices: [
            { label: "Level 2", cost: 35, wizLevel: 2 }, { label: "Level 3", cost: 70, wizLevel: 3 }, { label: "Level 4", cost: 105, wizLevel: 4 } ] },
          { id: "buckler", type: "toggle", label: "Buckler", cost: 10, per: "flat" } ] },
      { id: "viceleader", god: "Slaanesh", name: "Viceleader", isCharacter: true,
      access: [],
        variants: [ { name: "Viceleader", points: 95, wizardLevel: 0, magicBudget: 50 } ],
        lores: ["Slaanesh"],
        options: [
          { id: "wizlvl", type: "choice", label: "Wizard", choices: [
            { label: "Level 1", cost: 35, wizLevel: 1 }, { label: "Level 2", cost: 70, wizLevel: 2 } ] },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Steed of Slaanesh", cost: 25 }, { label: "Serpent of Slaanesh", cost: 40 },
            { label: "Exalted Chariot", cost: 190 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard", cost: 25, per: "flat", bsb: true } ] },
      { id: "infernalenrap", god: "Slaanesh", name: "Infernal Enrapturess", isCharacter: true,
      access: [],
        variants: [ { name: "Infernal Enrapturess", points: 135, magicBudget: 50 } ], options: [] },
      { id: "lordofchange", god: "Tzeentch", name: "Lord of Change", isCharacter: true,
      access: [],
        variants: [ { name: "Lord of Change", points: 400, wizardLevel: 2, magicBudget: 100 } ],
        lores: ["Tzeentch"],
        options: [
          { id: "wizup", type: "choice", label: "Wizard Level", choices: [
            { label: "Level 3", cost: 35, wizLevel: 3 }, { label: "Level 4", cost: 70, wizLevel: 4 } ] } ] },
      { id: "gauntsummoner", god: "Tzeentch", name: "Gaunt Summoner", isCharacter: true,
      access: [],
        variants: [ { name: "Gaunt Summoner", points: 240, wizardLevel: 3, magicBudget: 100 } ],
        lores: ["Tzeentch"],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [ { label: "Disc of Tzeentch", cost: 25 } ] } ],
        notes: "Knows Summon Daemons (Lv3, 8+) in addition to its lore." },
      { id: "changecaster", god: "Tzeentch", name: "Changecaster", isCharacter: true,
      access: [],
        variants: [ { name: "Changecaster", points: 110, wizardLevel: 1, magicBudget: 50 } ],
        lores: ["Tzeentch"],
        options: [
          { id: "wlvl", type: "toggle", label: "Additional Wizard Level", cost: 35, per: "flat" },
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Disc of Tzeentch", cost: 25 }, { label: "Burning Chariot", cost: 70 } ] },
          { id: "bsb", type: "toggle", label: "Battle Standard", cost: 25, per: "flat", bsb: true } ] },
      { id: "belakor", name: "Be'lakor", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Be'lakor", points: 515, wizardLevel: 4 } ], lores: ["Shadow"], options: [] },
      { id: "skarbrand", god: "Khorne", name: "Skarbrand", isCharacter: true, isSpecialChar: true,
      access: ["additional hand weapon","medium armour"],
        variants: [ { name: "Skarbrand", points: 480 } ], options: [] },
      { id: "mazarall", god: "Khorne", name: "Mazarall the Butcher", isCharacter: true, isSpecialChar: true,
      access: ["light armour","shield"],
        variants: [ { name: "Mazarall the Butcher", points: 430 } ], options: [] },
      { id: "skulltaker", god: "Khorne", name: "U'Zhul the Skulltaker", isCharacter: true, isSpecialChar: true,
      access: ["light armour"],
        variants: [ { name: "U'Zhul the Skulltaker", points: 170 } ],
        options: [
          { id: "mount", type: "mount", label: "Mount", choices: [
            { label: "Khul'tayran (Juggernaut)", cost: 50 }, { label: "Blood Throne", cost: 150 } ] } ] },
      { id: "karanak", god: "Khorne", name: "Karanak", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Karanak", points: 125 } ], options: [], notes: "May never be the Army General." },
      { id: "skaarac", god: "Khorne", name: "Skaarac the Bloodborn", isCharacter: true, isSpecialChar: true,
      access: ["light armour"],
        variants: [ { name: "Skaarac the Bloodborn", points: 325 } ], options: [] },
      { id: "kugath", god: "Nurgle", name: "Ku'gath Plaguefather", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Ku'gath Plaguefather", points: 480, wizardLevel: 1 } ], lores: ["Nurgle"], options: [] },
      { id: "rotigus", god: "Nurgle", name: "Rotigus", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Rotigus", points: 570, wizardLevel: 3 } ], lores: ["Nurgle"], options: [] },
      { id: "epidemus", god: "Nurgle", name: "Epidemius", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Epidemius", points: 190 } ], options: [] },
      { id: "horticulous", god: "Nurgle", name: "Horticulous Slimux", isCharacter: true, isSpecialChar: true,
      access: ["great weapon"],
        variants: [ { name: "Horticulous Slimux", points: 235 } ], options: [] },
      { id: "nkari", god: "Slaanesh", name: "N'Kari", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "N'Kari", points: 625, wizardLevel: 4 } ], lores: ["Slaanesh"], options: [] },
      { id: "shalaxi", god: "Slaanesh", name: "Shalaxi Helbane", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Shalaxi Helbane", points: 525, wizardLevel: 2 } ], lores: ["Slaanesh"], options: [] },
      { id: "azazel", god: "Slaanesh", name: "Azazel", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Azazel", points: 425, wizardLevel: 2 } ], lores: ["Slaanesh"], options: [] },
      { id: "syllesske", god: "Slaanesh", name: "Syll'Esske", isCharacter: true, isSpecialChar: true,
      access: ["light armour"],
        variants: [ { name: "Syll'Esske", points: 350 } ], options: [] },
      { id: "dexcessa", god: "Slaanesh", name: "Dexcessa", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Dexcessa", points: 390 } ], options: [] },
      { id: "synessa", god: "Slaanesh", name: "Synessa", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Synessa", points: 480, wizardLevel: 4 } ], lores: ["Slaanesh"], options: [],
        notes: "Also knows Whispers of Doubt (Lv1, 5+). Loremaster (Lore of Slaanesh)." },
      { id: "masque", god: "Slaanesh", name: "The Masque of Slaanesh", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "The Masque of Slaanesh", points: 160 } ], options: [] },
      { id: "kairos", god: "Tzeentch", name: "Kairos Fateweaver", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Kairos Fateweaver", points: 415, wizardLevel: 4 } ], lores: ["Tzeentch"], options: [],
        notes: "Loremaster (Lore of Tzeentch). His left head also chooses four spells from Heavens, Life, Light or Metal; his right head four from Beasts, Death, Fire or Shadow. Each Magic phase pick one head: he may cast only that head's spells plus the Lore of Tzeentch." },
      { id: "amon", god: "Tzeentch", name: "Amon 'Chakai", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "Amon 'Chakai", points: 570, wizardLevel: 4 } ], lores: ["Tzeentch"], options: [] },
      { id: "bluescribes", god: "Tzeentch", name: "The Blue Scribes", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "The Blue Scribes", points: 80 } ], options: [] },
      { id: "changeling", god: "Tzeentch", name: "The Changeling", isCharacter: true, isSpecialChar: true,
      access: [],
        variants: [ { name: "The Changeling", points: 130, wizardLevel: 1 } ], lores: ["Tzeentch"], options: [] }
    ],
    core: [
      { id: "chaosfuries", name: "Chaos Furies", perModel: true, basePoints: 14, unitSize: [5,15], expendable: true,
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" },
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Slaanesh", cost: 1, per: "model", god: "Slaanesh" }, { label: "Daemon of Khorne", cost: 2, per: "model", god: "Khorne" },
            { label: "Daemon of Nurgle", cost: 2, per: "model", god: "Nurgle" }, { label: "Daemon of Tzeentch", cost: 2, per: "model", god: "Tzeentch" } ] } ] },
      { id: "impswarms", name: "Imp Swarms", perModel: true, basePoints: 35, unitSize: [3,9],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 5, per: "model" },
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Slaanesh", cost: 3, per: "model", god: "Slaanesh" }, { label: "Daemon of Khorne", cost: 6, per: "model", god: "Khorne" },
            { label: "Daemon of Nurgle", cost: 6, per: "model", god: "Nurgle" }, { label: "Daemon of Tzeentch", cost: 6, per: "model", god: "Tzeentch" } ] } ] },
      { id: "bloodletters", god: "Khorne", name: "Bloodletters", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [
          { id: "host", type: "toggle", label: "Hellforged Host (Skarbrand)", cost: 1, per: "model", requires: { unit: "skarbrand" }, oncePerArmy: true },
          { id: "gw", type: "toggle", label: "Great weapons", cost: 2, per: "model" },
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "fleshhounds", god: "Khorne", name: "Flesh Hounds", perModel: true, basePoints: 21, unitSize: [5,15],
        options: [
          { id: "host", type: "toggle", label: "Hounds of the Blood Hunt (Karanak)", cost: 2, per: "model", requires: { unit: "karanak" }, oncePerArmy: true },
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 3, per: "model" },
          { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "plaguebearers", god: "Nurgle", name: "Plaguebearers", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [
          { id: "host", type: "toggle", label: "Festering Stooges (Ku'gath)", cost: 1, per: "model", requires: { unit: "kugath" }, oncePerArmy: true },
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "plaguetoadscore", god: "Nurgle", name: "Plague Toads", perModel: true, basePoints: 31, unitSize: [3,9],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 4, per: "model" } ] },
      { id: "nurglings", god: "Nurgle", name: "Nurglings", perModel: true, basePoints: 50, unitSize: [3,9],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 5, per: "model" } ] },
      { id: "daemonettes", god: "Slaanesh", name: "Daemonettes", perModel: true, basePoints: 12, unitSize: [10,30],
        options: [
          { id: "host", type: "toggle", label: "Bringers of Beguilement (N'Kari)", cost: 1, per: "model", requires: { unit: "nkari" }, oncePerArmy: true },
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "seekers", god: "Slaanesh", name: "Seekers", perModel: true, basePoints: 20, unitSize: [5,15],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 3, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "pinkhorrors", god: "Tzeentch", name: "Pink Horrors", perModel: true, basePoints: 13, unitSize: [10,30],
        options: [
          { id: "host", type: "toggle", label: "Blazing Squealers (Kairos Fateweaver)", cost: 2, per: "model", requires: { unit: "kairos" }, oncePerArmy: true },
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ],
        notes: "The unit is a Level 1 Wizard (Blue Fire of Tzeentch); 15+ models counts as Level 2." },
      { id: "screamers", god: "Tzeentch", name: "Screamers", perModel: true, basePoints: 32, unitSize: [3,9],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 4, per: "model" } ] },
      { id: "brimstone", god: "Tzeentch", name: "Brimstone Horrors", perModel: true, basePoints: 10, unitSize: [10,30],
        options: [
          { id: "summon", type: "toggle", label: "Summoned from Beyond", cost: 2, per: "model" } ] }
    ],
    special: [
      { id: "brutes", name: "Brutes", perModel: true, basePoints: 40, unitSize: [3,9],
        options: [
          { id: "wpn", type: "choice", label: "Weapons", choices: [
            { label: "Additional hand weapons", cost: 3, per: "model" }, { label: "Great weapons", cost: 6, per: "model" } ] },
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Slaanesh", cost: 3, per: "model", god: "Slaanesh" }, { label: "Daemon of Khorne", cost: 6, per: "model", god: "Khorne" },
            { label: "Daemon of Nurgle", cost: 6, per: "model", god: "Nurgle" }, { label: "Daemon of Tzeentch", cost: 6, per: "model", god: "Tzeentch" } ] } ] },
      { id: "bloodcrushers", god: "Khorne", name: "Bloodcrushers", perModel: true, basePoints: 55, unitSize: [3,6],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "bloodchariot", god: "Khorne", name: "Blood Chariot", perModel: false, basePoints: 145, unitSize: [1,1],
        options: [ { id: "std", type: "toggle", label: "Standard Bearer", cost: 10, per: "flat" } ] },
      { id: "bloodbeasts", god: "Khorne", name: "Bloodbeasts", perModel: true, basePoints: 55, unitSize: [1,3], options: [] },
      { id: "poxriders", god: "Nurgle", name: "Pox Riders", perModel: true, basePoints: 35, unitSize: [3,6],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "beastsofnurgle", god: "Nurgle", name: "Beasts of Nurgle", perModel: true, basePoints: 55, unitSize: [1,3], options: [] },
      { id: "plaguechariot", god: "Nurgle", name: "Plague Chariot", perModel: false, basePoints: 130, unitSize: [1,1],
        options: [ { id: "std", type: "toggle", label: "Standard Bearer", cost: 10, per: "flat" } ] },
      { id: "pleasureseekers", god: "Slaanesh", name: "Pleasureseekers", perModel: true, basePoints: 60, unitSize: [3,6],
        options: [ { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "seekerchariot", god: "Slaanesh", name: "Seeker Chariot", perModel: false, basePoints: 80, unitSize: [1,1], options: [] },
      { id: "fiends", god: "Slaanesh", name: "Fiends", perModel: true, basePoints: 55, unitSize: [1,3],
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "flamers", god: "Tzeentch", name: "Flamers", perModel: true, basePoints: 32, unitSize: [3,6],
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "exaltedflamer", god: "Tzeentch", name: "Exalted Flamer", perModel: false, basePoints: 70, unitSize: null, options: [] },
      { id: "firewyrms", god: "Tzeentch", name: "Firewyrms", perModel: true, basePoints: 55, unitSize: [1,3], options: [] }
    ],
    rare: [
      { id: "soulgrinder", name: "Soul Grinder", perModel: false, basePoints: 275, unitSize: [1,1],
        options: [
          { id: "align", type: "choice", label: "Daemonic Alignment", choices: [
            { label: "Daemon of Slaanesh", cost: 5, god: "Slaanesh" }, { label: "Daemon of Khorne", cost: 15, god: "Khorne" },
            { label: "Daemon of Nurgle", cost: 15, god: "Nurgle" }, { label: "Daemon of Tzeentch", cost: 15, god: "Tzeentch" } ] },
          { id: "claw", type: "toggle", label: "Daemonbone Claw", cost: 25, per: "flat" },
          { id: "ranged", type: "choice", label: "Replace Harvester Cannon", choices: [
            { label: "Warp Gaze", cost: 15 }, { label: "Baleful Torrent", cost: 25 }, { label: "Phlegm Bombardment", cost: 25 } ] } ] },
      { id: "skullcannon", god: "Khorne", name: "Skull Cannon", perModel: false, basePoints: 240, unitSize: [1,1], options: [] },
      { id: "plaguedrones", god: "Nurgle", name: "Plague Drones", perModel: true, basePoints: 50, unitSize: [3,6],
        options: [
          { id: "deathheads", type: "toggle", label: "Death Heads", cost: 5, per: "model" },
          { id: "cmd", type: "command", magicStandard: 50 } ] },
      { id: "exaltedseeker", god: "Slaanesh", name: "Exalted Seeker Chariot", perModel: false, basePoints: 210, unitSize: [1,1], options: [] },
      { id: "hellflayer", god: "Slaanesh", name: "Hellflayer", perModel: false, basePoints: 120, unitSize: [1,2], options: [],
        notes: "1-2 Hellflayers may be taken as a single Rare choice." },
      { id: "contorted", god: "Slaanesh", name: "Contorted Epitome", perModel: false, basePoints: 165, unitSize: [1,1], options: [] },
      { id: "changebringers", god: "Tzeentch", name: "Changebringers", perModel: true, basePoints: 45, unitSize: [3,6],
        options: [ { id: "leader", type: "toggle", label: "Leader", cost: 5, per: "flat" } ] },
      { id: "burningchariot", god: "Tzeentch", name: "Burning Chariot", perModel: false, basePoints: 120, unitSize: [1,1],
        options: [ { id: "bluehorror", type: "toggle", label: "3 Blue Horror crew", cost: 12, per: "flat" } ] }
    ]
  }
};
