/* ============================================================================
   DWARFS — army data (Warhammer Armies, Mathias Eliasson v3.11,
   9th Edition 3.11 ruleset). Encoded for the Army Builder engine.

   This file is pure DATA. See SCHEMA.md for the full field reference.

   NEW MECHANIC — RUNIC ITEMS (see the `runes` catalog below and the engine's
   runic subsystem in index.html). A Dwarf character (or war machine) may build
   its own magic items by inscribing up to three runes onto a weapon, armour,
   talisman, standard or war machine. Rules of the Runes enforced by the engine:
     • no item may carry more than three runes;
     • no two items in the army may carry the exact same combination of runes
       (this also applies to a single rune used alone);
     • a master rune may be used only once per army, and only one master rune
       may be inscribed on any single item;
     • non-master runes may be repeated only when the rune states a cumulative
       cost (e.g. 5/35/55 = the TOTAL cost for one/two/three copies — 5, 35 or
       55 pts, not summed), up to the number of listed tiers.
   Rune costs come out of the character's "Magic Items and/or Runic Items"
   budget (Weapon/Armour/Talismanic/Tattoo runes), the BSB's unlimited banner
   allowance or a unit standard's banner budget (Banner runes), or a war
   machine's engineering-rune budget (Engineering runes).

   Cost convention (options): per:"model" ×count · per:"flat" (default) once.
   ========================================================================== */
(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["dwarfs"] = {
  id: "dwarfs",
  name: "Dwarfs",
  author: "Mathias Eliasson v3.11 (unofficial) — 9th Edition 3.11",
  // The book states no bespoke percentages, so the standard rulebook army
  // composition is used (fractions of the agreed total points).
  composition: {
    charactersMax: 0.35,   // includes character mounts (Shieldbearers, Anvil, Beer Cart)
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
    "Dwarfs may not use magic items found in the Warhammer rulebook — only the Dwarf magic items and Runic Items below.",
    "Runic Items: a character may spend its magic-item allowance on Runic Items instead of (or as well as) the fixed magic items. See the Runes builder on each character.",
    "Runes of the Runes: max 3 runes per item; no two items may share the same rune combination (single runes included); a master rune may appear only once in the army and only one master rune per item.",
    "War machines (Bolt Thrower, Grudge Thrower, Cannon, Organ Gun, Flame Cannon) may take Engineering Runes up to 50 points each."
  ],

  /* ---------------- fixed Dwarf magic items ---------------- */
  magicItems: {
    "Magic Weapons": [
      { name: "Hammer of Smednir", cost: 45 },
      { name: "Red Axe of Karak Eight Peaks", cost: 40 },
      { name: "Kraggis' Ancestral Pickaxe", cost: 25, requiresAccess: "great weapon" },
      { name: "Hammer of Karak Drazh", cost: 20 }
    ],
    "Magic Armour": [
      { name: "Magnificent Armour of Borek Beetlebrow", cost: 35, requiresAccess: "heavy armour" },
      { name: "Ever-Burning Helmet of Grungni", cost: 30 },
      { name: "Runic Bracers of Skavor", cost: 25 },
      { name: "Helmet of the Anvil", cost: 10 }
    ],
    "Talismans": [
      { name: "Golden Bands of Grimnir", cost: 45 },
      { name: "Heavy Metal Ingot", cost: 30 }
    ],
    "Enchanted Items": [
      { name: "Focal Lens of Morgrim", cost: 40 },
      { name: "Fiery Ring of Thori", cost: 35 },
      { name: "Golden Sceptre of Norgrim", cost: 30 },
      { name: "Runic Tablet of Thungni", cost: 30 },
      { name: "Silver Horn of Vengeance", cost: 30 },
      { name: "Teardrop of Grungni", cost: 20 },
      { name: "Healing Salve of Valaya", cost: 15 },
      { name: "Resounding Gromril Horn", cost: 10 }
    ],
    "Magic Standards": [
      { name: "Banner of Lost Holds", cost: 60 }
    ]
  },
  // Dwarfs use no rulebook common magic items.

  /* ---------------- RUNIC ITEMS — rune catalogs ----------------
     cost: a number (single) or [c1,c2,c3] cumulative TOTAL costs (the total
     points for having 1 / 2 / 3 copies of the rune on the item — NOT summed).
     master:true → master rune. only: character/machine gate. solo:true →
     cannot combine with any other rune on the same item. */
  runes: {
    "Weapon Runes": [
      { name: "Master Rune of Smiting", cost: 35, master: true, desc: "The weapon has the Multiple Wounds (D6) special rule." },
      { name: "Master Rune of Death", cost: 30, master: true, desc: "Grants the wielder the Heroic Killing Blow special rule." },
      { name: "Master Rune of Dragon Slaying", cost: 30, master: true, desc: "Against Dragons and Drakes the weapon always wounds on a 2+ and has the Multiple Wounds (2) special rule." },
      { name: "Master Rune of Alaric the Mad", cost: 25, master: true, desc: "The weapon has the Ignores Armour Saves special rule." },
      { name: "Master Rune of Breaking", cost: 25, master: true, desc: "On one or more hits, the foe's weapon or armour is destroyed on a D6 roll of 2+ (roll once; random piece if several)." },
      { name: "Master Rune of Snorri Spangelhelm", cost: 25, master: true, desc: "The weapon always hits on a To Hit roll of 2+." },
      { name: "Master Rune of Swiftness", cost: 25, master: true, desc: "The weapon has the Always Strikes First special rule." },
      { name: "Master Rune of Banishment", cost: 20, master: true, desc: "May re-roll failed To Wound rolls against models with the Ethereal, Undead or Vampiric special rule." },
      { name: "Master Rune of Flight", cost: 20, master: true, desc: "May be thrown as a missile weapon (range 12\") which always hits on a 2+; other runes still apply, then it returns. May also be used in close combat as normal." },
      { name: "Master Rune of Skalf Blackhammer", cost: 20, master: true, desc: "Wounds any model not in magic armour on a 2+ regardless of Toughness; against models in magic armour, a 3+ is required." },
      { name: "Master Rune of Kragg the Grim", cost: 5, master: true, only: "great-weapon", desc: "Great weapons only. Allows the great weapon to be inscribed with runes." },
      { name: "Rune of Daemon Slaying", cost: [25,50,100], desc: "Vs Daemonic: +1 To Hit and To Wound. Two runes add Multiple Wounds (D3). Three runes: hits & wounds on 2+, Multiple Wounds (D3), and the foe cannot take Magical Ward saves against it." },
      { name: "Rune of Fire", cost: [5,35,55], desc: "Flaming Attacks. Two runes also grant a Strength 4 Breath Weapon with Flaming Attacks. Three runes: that Breath Weapon also has Multiple Wounds (D3)." },
      { name: "Rune of Fury", cost: [15,25,50], desc: "+1 Attack. Two runes also grant Frenzy. Three runes also grant an extra Attack after each successful To Hit and To Wound roll (these do not generate further Attacks)." },
      { name: "Rune of Striking", cost: [10,30,40], desc: "+1 Weapon Skill. Two runes also allow re-rolling failed To Hit rolls in close combat. Three runes: Weapon Skill 10 and re-roll failed To Hit rolls in close combat." },
      { name: "Rune of Cleaving", cost: [5,20,35], desc: "Armour Piercing (1). Two runes also grant +1 Strength. Three runes also grant +1 Strength and the Killing Blow special rule." },
      { name: "Rune of Might", cost: [25,35], desc: "Doubles the wielder's Strength against foes of Toughness 5+ in close combat. Two runes also grant Multiple Wounds (D3) against foes of Toughness 5+ in close combat." },
      { name: "Rune of Dismay", cost: [15,25], desc: "Grants the Fear special rule. Two runes grant the Terror special rule instead." },
      { name: "Rune of Parrying", cost: 20, desc: "Enemy models attacking the wielder in close combat suffer -1 To Hit." },
      { name: "Grudge Rune", cost: 20, desc: "For each Grudge Rune in your army, nominate one enemy character or monster at the start of the game. Vs that model the wielder gains +1 To Hit and may re-roll failed To Wound rolls in close combat." },
      { name: "Rune of Speed", cost: 5, desc: "+1 Initiative." }
    ],
    "Armour Runes": [
      { name: "Master Rune of Adamant", cost: 50, master: true, desc: "The wearer can only be wounded on natural To Wound rolls of 6." },
      { name: "Master Rune of Gromril", cost: 30, master: true, solo: true, desc: "The armour ignores negative modifiers to its armour save. Cannot be combined with any other armour runes." },
      { name: "Master Rune of Steel", cost: 30, master: true, desc: "Enemies must re-roll successful To Wound rolls against the wearer." },
      { name: "Rune of Fortitude", cost: [20,45,55], desc: "+1 Toughness. Two runes also grant Magical Ward (5+). Three runes also grant Immunity (Multiple Wounds) and Magical Ward (5+)." },
      { name: "Rune of Iron", cost: [15,35,45], desc: "+1 Wound. Two runes also grant +1 Toughness. Three runes also grant +1 Toughness and Regeneration (5+)." },
      { name: "Rune of Resistance", cost: 25, desc: "The wearer may re-roll any failed armour saving throws." },
      { name: "Rune of Impact", cost: 15, desc: "Grants Impact Hits (1) and Mighty Blow (1)." },
      { name: "Rune of Shielding", cost: 15, desc: "Grants Magical Ward (2+) against Wounds caused by missile attacks." },
      { name: "Rune of Preservation", cost: 10, desc: "Grants Immunity (Killing Blow)." },
      { name: "Rune of Stone", cost: 10, desc: "+1 to the wearer's armour save." }
    ],
    "Talismanic Runes": [
      { name: "Master Rune of Balance", cost: 50, master: true, only: "runesmith", desc: "Runesmiths/Runelords only. During the enemy Magic phase, remove one power dice from the opponent's pool and add it to your dispel pool." },
      { name: "Master Rune of Kingship", cost: 40, master: true, only: "king", desc: "Dwarf Lord only. The Lord and his unit gain Stubborn and Immunity (Fear/Terror) while he remains with the unit." },
      { name: "Master Rune of Spite", cost: 30, master: true, desc: "Each time the bearer is Hit in close combat, the attacker suffers a Strength 4 hit." },
      { name: "Master Rune of Passage", cost: 20, master: true, desc: "The bearer and any unit he joins gain the Strider special rule." },
      { name: "Master Rune of Spellbinding", cost: 20, master: true, desc: "+1 bonus to all attempts to channel dispel dice." },
      { name: "Master Rune of Challenge", cost: 15, master: true, desc: "One use only. Used in the enemy turn before charges: a nominated enemy unit within 12\" must charge the bearer (or his unit) or flee." },
      { name: "Rune of Warding", cost: [10,25,40], desc: "Magical Ward (6+). Two runes: Magical Ward (5+). Three runes: Magical Ward (4+)." },
      { name: "Rune of Spellbreaking", cost: [25,35], only: "runesmith", desc: "Runesmiths/Runelords only. One use. Instead of dispelling normally, gain 6 free dispel dice to dispel one spell. Two runes: after dispelling, on a 4+ the spell is lost to the caster for the game." },
      { name: "Rune of Fate", cost: 15, desc: "One use. Magical Ward (2+) against the first unsaved Wound suffered." },
      { name: "Rune of Brotherhood", cost: 5, only: "no-oath", desc: "May not be used with an Oath Stone or Shieldbearers. The character may deploy with Rangers (Scouts) or join Miners (Ambushers)." },
      { name: "Rune of the Furnace", cost: 5, desc: "Grants Immunity (Flaming Attacks)." },
      { name: "Rune of Luck", cost: 5, desc: "One use. Re-roll a single To Hit, To Wound, armour save, invulnerable save or characteristic test." }
    ],
    "Banner Runes": [
      { name: "Master Rune of Groth One-Eye", cost: 75, master: true, desc: "Confers Stubborn to the bearer's unit and all friendly Dwarf units within 12\"." },
      { name: "Master Rune of Stromni Redbeard", cost: 60, master: true, desc: "+1 combat result to the bearer's unit and all friendly Dwarf units within 12\"." },
      { name: "Master Rune of Grungni", cost: 60, master: true, desc: "Magical Ward (5+) against Wounds caused by missile attacks to any friendly units within 12\"." },
      { name: "Master Rune of Grimnir", cost: 50, master: true, only: "slayer-banner", desc: "Slayers only. Any friendly Slayer unit within 12\" gains Magical Ward (5+) against all missile attacks." },
      { name: "Master Rune of Valaya", cost: 25, master: true, desc: "+1 to dispel attempts; each Remains-in-Play spell is dispelled on a 3+ at the start of each friendly Magic phase." },
      { name: "Master Rune of Fear", cost: 25, master: true, desc: "Confers the Fear special rule to the bearer's unit." },
      { name: "Rune of Battle", cost: [20,40,60], desc: "+1 combat result. Two runes: +2. Three runes: +2 and Fight in Extra Ranks (1) to the bearer's unit." },
      { name: "Rune of Slowness", cost: [20,30,50], desc: "Foes charging the unit subtract D3\" from their charge. Two runes: 2D3, pick highest. Three runes: also Always Strikes Last in the first round if contact is made." },
      { name: "Rune of Stoicism", cost: 40, desc: "Confers the Stubborn special rule to the bearer's unit." },
      { name: "Rune of Guarding", cost: 30, only: "bsb", desc: "Battle Standard Bearer only. The bearer has the Magical Ward (5+) special rule." },
      { name: "Rune of Courage", cost: 20, desc: "Confers Immunity (Psychology) to the bearer's unit." },
      { name: "Rune of Kadrin", cost: 20, desc: "All models in the unit re-roll To Wound rolls of 1 with close combat and missile attacks." },
      { name: "Rune of Sanctuary", cost: [10,20], desc: "Magic Resistance (2) to the unit. Two runes: Magic Resistance (3)." },
      { name: "Rune of Determination", cost: 15, desc: "One use. The unit may take a Break test on a single D6 rather than 2D6." },
      { name: "Strollaz' Rune", cost: 10, desc: "Confers the Vanguard special rule to the bearer's unit." },
      { name: "Ancestor Rune", cost: 10, desc: "One use. On a Break test the rune is expended and the unit tests as if Stubborn." }
    ],
    "Engineering Runes": [
      { name: "Master Rune of Bursting Flame", cost: 40, master: true, only: "grudge", desc: "Grudge Thrower only. The war machine uses the large round template." },
      { name: "Master Rune of Immolation", cost: 20, master: true, desc: "One use. The war machine may explode at the end of a combat round (or on losing its last Wound), inflicting 2D6 magical S4 Flaming hits to each enemy in combat with it." },
      { name: "Master Rune of Defence", cost: 20, master: true, desc: "Magical Ward (3+) against all missile attacks." },
      { name: "Master Rune of Slaying", cost: 20, master: true, desc: "Always Wounds on a 3+ or better against enemy Monstrous Creatures and Monsters." },
      { name: "Master Rune of Skewering", cost: 20, master: true, only: "bolt", desc: "Bolt Thrower only. Always hits on a 3+ with no modifiers." },
      { name: "Master Rune of Disguise", cost: 15, master: true, desc: "The war machine always counts as being in hard cover." },
      { name: "Rune of Penetrating", cost: [30,50], desc: "+1 Strength to its shots (both Strength values for a Grudge Thrower). Two runes also allow re-rolling failed To Wound rolls." },
      { name: "Rune of Rapid Fire", cost: 30, only: "bolt", desc: "Bolt Thrower only. Gains Multiple Shots (2)." },
      { name: "Rune of Forging", cost: 25, desc: "Re-roll the artillery dice whenever a misfire is rolled." },
      { name: "Rune of Accuracy", cost: 20, desc: "Re-roll 1s To Hit; if it does not use BS, re-roll the scatter dice instead." },
      { name: "Rune of Reloading", cost: 20, desc: "May shoot every turn, even if it moved or misfired the previous turn." },
      { name: "Flakksson's Rune of Seeking", cost: 15, only: "bolt", desc: "Bolt Throwers only. +1 To Hit against units with the Fly special rule." },
      { name: "Rune of Concussive Force", cost: 15, only: ["bolt","grudge","cannon"], desc: "Bolt Thrower, Grudge Thrower and Cannon only. A unit directly hit gains Stupidity until your next Shooting phase." },
      { name: "Rune of Fortune", cost: 10, desc: "Re-roll the result on the machine's Misfire chart." },
      { name: "Stalwart Rune", cost: [5,10], desc: "+1 combat result to its crew. Two runes: also grant the crew Stubborn." },
      { name: "Rune of Burning", cost: 5, desc: "All the war machine's shooting attacks have the Flaming Attacks special rule." },
      { name: "Enchanted Rune", cost: 5, desc: "All the war machine's shooting attacks have the Magical Attacks special rule." }
    ],
    "Runic Tattoos": [
      { name: "Rune of the Dishonoured", cost: 30, desc: "On its last Wound, gains Magical Ward (3+) against further wounds; but if slain it is worth no Victory Points, and if it survives the enemy gains VP equal to 100% of its cost." },
      { name: "Rune of Endless Battle", cost: 25, desc: "On a turn it charged, every attack causing an unsaved Wound allows one immediate additional attack (these do not generate more)." },
      { name: "Rune of Grit", cost: 20, desc: "+1 Toughness." },
      { name: "Rune of the Reckless", cost: 20, desc: "+1 To Hit and Frenzy; but enemies targeting it in close combat also gain +1 To Hit." },
      { name: "Rune of the Hateful", cost: 15, desc: "Grants the Hatred special rule." },
      { name: "Rune of Wrath", cost: 15, desc: "+1 Attack." },
      { name: "Rune of the Dauntless", cost: 10, desc: "Must always issue and accept challenges (if possible); may re-roll failed To Hit rolls in a challenge." },
      { name: "Warrior's Rune", cost: 10, desc: "+1 Weapon Skill." },
      { name: "Rune of Blazing Fury", cost: 5, desc: "Has the Flaming Attacks special rule." }
    ]
  },

  /* ============================== UNITS ============================== */
  units: {
    characters: [
      { id:"lords", name:"Lord", isCharacter:true,
        access:["additional hand weapon","great weapon","medium armour","heavy armour","shield"],
        variants:[
          { name:"King", points:125, magicBudget:100 },
          { name:"Thane", points:65, magicBudget:50 }
        ],
        options:[
          { id:"wpn", type:"choice", label:"Weapon", choices:[
            { label:"Additional hand weapon", cost:5 },
            { label:"Great weapon", cost:15 } ] },
          { id:"rng", type:"choice", label:"Ranged weapon", choices:[
            { label:"Dwarfen pistol", cost:5 },
            { label:"Dwarfen crossbow", cost:7 },
            { label:"Dwarfen handgun", cost:7 } ] },
          { id:"arm", type:"choice", label:"Armour", choices:[
            { label:"Medium armour", cost:18 },
            { label:"Heavy armour", cost:27 } ] },
          { id:"shield", type:"toggle", label:"Shield", cost:5 },
          { id:"bsb", type:"toggle", label:"Battle Standard Bearer", cost:25, bsb:true, only:"Thane" },
          { id:"mnt", type:"mount", label:"Mount", choices:[
            { label:"Oathstone", cost:25, key:"oath" },
            { label:"Shieldbearers", cost:25, key:"shieldbearers", only:"King" } ] }
        ] },

      { id:"runesmiths", name:"Runesmith", isCharacter:true, runesmith:true,
        access:["great weapon","light armour","medium armour","heavy armour","shield"],
        variants:[
          { name:"Runelord", points:150, magicBudget:100 },
          { name:"Runesmith", points:90, magicBudget:50 }
        ],
        options:[
          { id:"gw", type:"toggle", label:"Great weapon", cost:10 },
          { id:"arm", type:"choice", label:"Armour", choices:[
            { label:"Light armour", cost:9 },
            { label:"Medium armour", cost:18 },
            { label:"Heavy armour", cost:27 } ] },
          { id:"shield", type:"toggle", label:"Shield", cost:5 },
          { id:"mnt", type:"mount", label:"Mount", choices:[
            { label:"Anvil of Doom", cost:120, key:"anvil", only:"Runelord" } ] }
        ] },

      { id:"slayerlegend", name:"Slayer of Legend", isCharacter:true, slayerTattoos:true,
        access:["additional hand weapon","great weapon"],
        variants:[
          { name:"Daemon Slayer", points:140, magicBudget:100 },
          { name:"Dragon Slayer", points:70, magicBudget:50 }
        ],
        options:[
          { id:"wpn", type:"choice", label:"Weapon", choices:[
            { label:"Additional hand weapon", cost:5 },
            { label:"Great weapon", cost:15 } ] },
          { id:"upg", type:"choice", label:"Slayer upgrade", choices:[
            { label:"Killing Blow", cost:15 },
            { label:"Vampire Slayer", cost:15 },
            { label:"Beast Slayer", cost:25 },
            { label:"Skaven Slayer", cost:25 } ] },
          { id:"wards", type:"toggle", label:"Wards of Grimnir", cost:20 }
        ] },

      { id:"brewmaster", name:"Brewmaster", isCharacter:true,
        access:["great weapon","light armour","medium armour"],
        variants:[ { name:"Brewmaster", points:70, magicBudget:50 } ],
        options:[
          { id:"gw", type:"toggle", label:"Great weapon", cost:10 },
          { id:"arm", type:"choice", label:"Armour", choices:[
            { label:"Light armour", cost:3 },
            { label:"Medium armour", cost:9 } ] },
          { id:"mnt", type:"mount", label:"Mount", choices:[
            { label:"Beer Cart", cost:25, key:"beercart" } ] }
        ] },

      { id:"masterengineer", name:"Master Engineer", isCharacter:true,
        access:["great weapon","light armour","medium armour"],
        variants:[ { name:"Master Engineer", points:60, magicBudget:50 } ],
        options:[
          { id:"gw", type:"toggle", label:"Great weapon", cost:10 },
          { id:"rng", type:"multi", label:"Ranged weapons", max:3, choices:[
            { label:"Dwarfen pistol", cost:5 },
            { label:"Dwarfen brace of pistols", cost:7 },
            { label:"Dwarfen handgun", cost:7 } ] },
          { id:"arm", type:"choice", label:"Armour", choices:[
            { label:"Light armour", cost:3 },
            { label:"Medium armour", cost:9 } ] }
        ] },

      /* ---------------- special characters (fixed loadout) ---------------- */
      { id:"thorgrim", name:"Thorgrim Grudgebearer", isCharacter:true, isSpecialChar:true, mustBeGeneral:true,
        variants:[ { name:"Thorgrim Grudgebearer", points:500, magicBudget:0 } ], options:[],
        notes:"High King of Karaz-a-Karak. Carries the Axe of Grimnir, Armour of Skaldour, Dragon Crown of Karaz and the Great Book of Grudges (see stats). Must be the Army General; the Throne of Power grants Inspiring Presence (6)." },
      { id:"alrik", name:"Alrik Ranulfsson", isCharacter:true, isSpecialChar:true, mustBeGeneral:true,
        variants:[ { name:"Alrik Ranulfsson", points:345, magicBudget:0 } ], options:[],
        notes:"King of Karak Hirn. Rides Shieldbearers; carries the Axe of Retribution, Hrappi-klad, Kurgaz's Shield, Helm of Eagles and Karak-Hirn's Book of Grudges. Must be the Army General; alters the army list (see book)." },
      { id:"kazador", name:"Kazador Thunderhorn", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Kazador Thunderhorn", points:280, magicBudget:0 } ], options:[],
        notes:"King of Karak Azul. Carries the Hammer of Karak Azul, the Armour of the King of Karak Azul and the Thunderhorn." },
      { id:"belegar", name:"Belegar Ironhammer", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Belegar Ironhammer", points:290, magicBudget:0 } ], options:[],
        notes:"True King of the Eight Peaks. Heavy armour; carries the Hammer of Angrund and the Shield of Defiance. Revenge Incarnate: once per game may double his Attacks." },
      { id:"thorek", name:"Thorek Ironbrow", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Thorek Ironbrow", points:310, magicBudget:0 } ], options:[],
        notes:"Master Runelord of Karak Azul on an Anvil of Doom (War Machine). Carries Klad Brakak and Thorek's Rune Armour; Kraggi assists at the forge." },
      { id:"grombrindal", name:"Grombrindal, the White Dwarf", isCharacter:true, isSpecialChar:true, cannotBeGeneral:true,
        variants:[ { name:"Grombrindal", points:450, magicBudget:0 } ], options:[],
        notes:"The White Dwarf. Carries the Rune Axe of Grimnir, Armour of Glimril Scales, Rune Cloak of Valaya and Rune Helm of Zhufbar. Hidden/Disguised; may never be the Army General." },
      { id:"ungrim", name:"Ungrim Ironfist", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Ungrim Ironfist", points:325, magicBudget:0 } ], options:[],
        notes:"Last Slayer King of Karak Kadrin. Medium armour; carries the Axe of Dargo, the Slayer Crown and the Dragon Cloak of Fyrskar. Slayer King: alters where Slayers slot in the list." },
      { id:"garagrim", name:"Garagrim Ironfist", isCharacter:true, isSpecialChar:true, cannotBeGeneral:true,
        variants:[ { name:"Garagrim Ironfist", points:185, magicBudget:0 } ], options:[],
        notes:"War-mourner of Karak Kadrin. Carries the Axes of Kadrin. May never be the Army General." },
      { id:"bugman", name:"Josef Bugman", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Josef Bugman", points:185, magicBudget:0 } ],
        options:[ { id:"xbow", type:"toggle", label:"Dwarfen crossbow", cost:7 } ],
        notes:"Mysterious Master Brewer. Medium armour; carries Ol' Trustworthy and Bugman's Tankard. Must be accompanied by his Rangers (17 pts/model, bought separately). Scouts." },
      { id:"burlok", name:"Burlok Damminson", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Burlok Damminson", points:120, magicBudget:0 } ],
        options:[ { id:"gear", type:"mustChoose", label:"Wargear", choices:[
          { label:"Ingenious Constrictor Arm", cost:0 },
          { label:"Range Finding Optics & Rivet Gun", cost:5 } ] } ],
        notes:"Engineer Guildmaster. Carries the Furnace Hammer and Burlok's Armour." },
      { id:"grimm", name:"Grimm Burloksson", isCharacter:true, isSpecialChar:true,
        variants:[ { name:"Grimm Burloksson", points:95, magicBudget:0 } ], options:[],
        notes:"Upstart Master Engineer. Carries the Grudge-raker and the Cog Axe. Master of Accuracy: buffs a nearby unit's shooting each turn." }
    ],

    core:[
      { id:"warriors", name:"Warriors", perModel:true, basePoints:7, unitSize:[15,45],
        options:[
          { id:"eqp", type:"multi", label:"Equipment (at least one)", max:2, choices:[
            { label:"Shields", cost:1, per:"model" },
            { label:"Great weapons", cost:3, per:"model" } ] },
          { id:"cmd", type:"command", magicStandard:25 }
        ] },
      { id:"quarrellers", name:"Quarrellers", perModel:true, basePoints:12, unitSize:[10,30],
        options:[
          { id:"gw", type:"toggle", label:"Great weapons", cost:3, per:"model" },
          { id:"shd", type:"choice", label:"Shields/bucklers", choices:[
            { label:"Bucklers", cost:0.5, per:"model" },
            { label:"Shields", cost:1, per:"model" } ] },
          { id:"med", type:"toggle", label:"Medium armour", cost:1, per:"model" },
          { id:"cmd", type:"command", magicStandard:25 }
        ] },
      { id:"thunderers", name:"Thunderers", perModel:true, basePoints:12, unitSize:[10,30],
        options:[
          { id:"shd", type:"choice", label:"Shields/bucklers", choices:[
            { label:"Bucklers", cost:0.5, per:"model" },
            { label:"Shields", cost:1, per:"model" } ] },
          { id:"med", type:"toggle", label:"Medium armour", cost:1, per:"model" },
          { id:"pistols", type:"toggle", label:"Replace handguns with brace of Dwarfen pistols", cost:0 },
          { id:"cmd", type:"command", magicStandard:25 }
        ] },
      { id:"miners", name:"Miners", perModel:true, basePoints:11, unitSize:[10,30],
        options:[
          { id:"charges", type:"toggle", label:"Blasting charges", cost:15 },
          { id:"cart", type:"toggle", label:"Miner's Cart", cost:20 },
          { id:"drill", type:"toggle", label:"Replace great weapon with steam drill (Leader)", cost:10 },
          { id:"cmd", type:"command", magicStandard:25 }
        ] }
    ],

    special:[
      { id:"longbeards", name:"Longbeards", perModel:true, basePoints:14, unitSize:[10,30],
        options:[
          { id:"eqp", type:"multi", label:"Equipment (at least one)", max:2, choices:[
            { label:"Shields", cost:1.5, per:"model" },
            { label:"Great weapons", cost:3, per:"model" } ] },
          { id:"cmd", type:"command", magicStandard:50 }
        ] },
      { id:"ironbreakers", name:"Ironbreakers", perModel:true, basePoints:14, unitSize:[10,30],
        options:[
          { id:"bombs", type:"toggle", label:"Cinderblast bombs (Leader)", cost:5 },
          { id:"cmd", type:"command", magicStandard:50 }
        ] },
      { id:"trollslayers", name:"Troll Slayers", perModel:true, basePoints:8, unitSize:[10,30],
        options:[
          { id:"eqp", type:"multi", label:"Weapons", max:2, choices:[
            { label:"Additional hand weapons", cost:1, per:"model" },
            { label:"Great weapons", cost:3, per:"model" } ] },
          { id:"skirm", type:"toggle", label:"Upgrade to Skirmishers", cost:1, per:"model" },
          { id:"cmd", type:"command", magicStandard:25 }
        ] },
      { id:"rangers", name:"Rangers", perModel:true, basePoints:7, unitSize:[5,15],
        options:[
          { id:"eqp", type:"multi", label:"Weapons", max:3, choices:[
            { label:"Throwing axes", cost:2, per:"model" },
            { label:"Dwarfen crossbows", cost:3, per:"model" },
            { label:"Great weapons", cost:3, per:"model" } ] },
          { id:"shd", type:"toggle", label:"Shields", cost:1, per:"model" },
          { id:"med", type:"toggle", label:"Medium armour", cost:1, per:"model" },
          { id:"skirm", type:"toggle", label:"Upgrade to Skirmishers", cost:1, per:"model" },
          { id:"cmd", type:"command", magicStandard:25 }
        ] },
      { id:"deathroller", name:"Deathroller", perModel:false, basePoints:80, unitSize:[1,1] },
      { id:"firethrower", name:"Fire Thrower", perModel:false, basePoints:45, unitSize:[1,1],
        options:[ { id:"med", type:"toggle", label:"Medium armour", cost:2 } ] },
      { id:"boltthrower", name:"Bolt Thrower", perModel:false, basePoints:45, unitSize:[1,1],
        machineType:"bolt", engineeringRunes:50,
        options:[ { id:"la", type:"toggle", label:"Light armour (per crew)", cost:3 } ] },
      { id:"grudgethrower", name:"Grudge Thrower", perModel:false, basePoints:90, unitSize:[1,1],
        machineType:"grudge", engineeringRunes:50,
        options:[ { id:"la", type:"toggle", label:"Light armour (per crew)", cost:3 } ] },
      { id:"cannon", name:"Cannon", perModel:false, basePoints:90, unitSize:[1,1],
        machineType:"cannon", engineeringRunes:50,
        options:[ { id:"la", type:"toggle", label:"Light armour (per crew)", cost:3 } ] },
      { id:"gyrocopter", name:"Gyrocopter", perModel:false, basePoints:85, unitSize:[1,1],
        options:[ { id:"gun", type:"choice", label:"Replace steam gun", choices:[
          { label:"Brimstone gun", cost:0 },
          { label:"Clattergun", cost:0 } ] } ] }
    ],

    rare:[
      { id:"hammerers", name:"Hammerers", perModel:true, basePoints:18, unitSize:[10,30],
        options:[
          { id:"shd", type:"toggle", label:"Shields", cost:1.5, per:"model" },
          { id:"cmd", type:"command", magicStandard:75 }
        ] },
      { id:"irondrakes", name:"Irondrakes", perModel:true, basePoints:15, unitSize:[10,30],
        options:[
          { id:"bombs", type:"toggle", label:"Cinderblast bombs (Leader)", cost:5 },
          { id:"drake", type:"choice", label:"Replace drakegun (Leader)", choices:[
            { label:"Brace of drakefire pistols", cost:0 },
            { label:"Trollhammer torpedo", cost:15 } ] },
          { id:"cmd", type:"command", magicStandard:50 }
        ] },
      { id:"giantslayers", name:"Giant Slayers", perModel:true, basePoints:13, unitSize:[10,30],
        options:[
          { id:"eqp", type:"multi", label:"Weapons", max:2, choices:[
            { label:"Additional hand weapons", cost:1, per:"model" },
            { label:"Great weapons", cost:3, per:"model" } ] },
          { id:"skirm", type:"toggle", label:"Upgrade to Skirmishers", cost:1, per:"model" },
          { id:"cmd", type:"command", magicStandard:50 }
        ] },
      { id:"doomseekers", name:"Doomseekers", perModel:true, basePoints:35, unitSize:[3,6] },
      { id:"runeguardians", name:"Rune Guardians", perModel:true, basePoints:50, unitSize:[3,9],
        options:[
          { id:"wpn", type:"mustChoose", label:"Weapons", choices:[
            { label:"Additional hand weapons", cost:3, per:"model" },
            { label:"Great weapons", cost:9, per:"model" } ] },
          { id:"runes", type:"multi", label:"Guardian runes (up to two)", max:2, choices:[
            { label:"Rune of Cleaving", cost:3, per:"model" },
            { label:"Rune of Warding", cost:3, per:"model" },
            { label:"Rune of Fury", cost:5, per:"model" },
            { label:"Rune of Striking", cost:5, per:"model" },
            { label:"Rune of Stone", cost:6, per:"model" } ] }
        ] },
      { id:"organgun", name:"Organ Gun", perModel:false, basePoints:100, unitSize:[1,1],
        machineType:"organ", engineeringRunes:50,
        options:[ { id:"la", type:"toggle", label:"Light armour (per crew)", cost:3 } ] },
      { id:"flamecannon", name:"Flame Cannon", perModel:false, basePoints:100, unitSize:[1,1],
        machineType:"flame", engineeringRunes:50,
        options:[ { id:"la", type:"toggle", label:"Light armour (per crew)", cost:3 } ] },
      { id:"gyrobomber", name:"Gyrobomber", perModel:false, basePoints:140, unitSize:[1,1],
        options:[ { id:"gun", type:"choice", label:"Replace steam gun", choices:[
          { label:"Brimstone gun", cost:0 },
          { label:"Clattergun", cost:0 } ] } ] },
      { id:"thunderbarge", name:"Thunderbarge", perModel:false, basePoints:275, unitSize:[1,1] },
      { id:"grudgebreaker", name:"Grudgebreaker", perModel:false, basePoints:200, unitSize:[1,1] }
    ]
  },

  /* ============================== UNIT INFO ============================== */
  unitInfo: {
    lords:{ profile:[["King",3,7,4,4,5,3,4,4,10],["Thane",3,6,4,4,5,2,3,3,9]],
      eq:"Hand weapon", rules:"Ancestral Grudge, Gromril Armour, Magic Resistance (1), Relentless, Resolute, Royal Clansmen" },
    runesmiths:{ profile:[["Runelord",3,6,4,4,5,3,3,3,9],["Runesmith",3,5,4,4,4,2,2,2,9]],
      eq:"Hand weapon", rules:"Ancestral Grudge, Forgefire, Gromril Armour, Magic Resistance (2), Relentless, Resolute, Rune Lore" },
    slayerlegend:{ profile:[["Daemon Slayer",3,7,4,4,5,3,5,4,10],["Dragon Slayer",3,6,4,4,5,2,4,3,10]],
      eq:"Hand weapon", rules:"Ancestral Grudge, Daemon Slayer, Deathblow, Dragon Slayer, Magic Resistance (1), Relentless, Unbreakable" },
    brewmaster:{ profile:[["Brewmaster",3,4,4,4,5,2,1,2,9]],
      eq:"Hand weapon", rules:"Ancestral Grudge, Beer Casks, Magic Resistance (1), Relentless, Resolute" },
    masterengineer:{ profile:[["Master Engineer",3,4,4,4,4,2,2,2,9]],
      eq:"Hand weapon", rules:"Ancestral Grudge, Artillery Master, Entrenchment, Magic Resistance (1), Relentless, Resolute, Stand Back Sir!" },

    thorgrim:{ profile:[["Thorgrim",3,7,4,4,5,7,4,4,10],["Thronebearers",3,5,3,4,"-","-",3,4,"-"]],
      eq:"Axe of Grimnir, Armour of Skaldour, Dragon Crown of Karaz, Great Book of Grudges",
      rules:"Ancestral Grudge, Gromril Armour, High King, Magic Resistance (1), Relentless, Resolute, Royal Clansmen, The Throne of Power" },
    alrik:{ profile:[["Alrik Ranulfsson",3,7,4,4,5,3,4,4,10],["Shieldbearers",3,5,3,4,"-","-",2,2,9]],
      eq:"Axe of Retribution, Hrappi-klad, Kurgaz's Shield, Helm of Eagles, Karak-Hirn's Book of Grudges",
      rules:"Ancestral Grudge, Gromril Armour, Inspiring Presence (6), Lord of the Hold, Magic Resistance (1), Relentless, Resolute, Royal Clansmen" },
    kazador:{ profile:[["Kazador",3,7,4,4,5,3,4,4,10]],
      eq:"Hammer of Karak Azul, Armour of the King of Karak Azul, The Thunderhorn",
      rules:"Ancestral Grudge, Gromril Armour, Magic Resistance (1), Relentless, Resolute, Royal Clansmen" },
    belegar:{ profile:[["Belegar Ironhammer",3,8,4,4,5,3,4,4,10]],
      eq:"Hammer of Angrund, Shield of Defiance, heavy armour",
      rules:"Ancestral Grudge, Gromril Armour, Magic Resistance (1), Relentless, Revenge Incarnate, Royal Clansmen, Stubborn" },
    thorek:{ profile:[["Thorek Ironbrow",3,6,4,4,5,3,3,3,10],["Anvil of Doom","-","-","-","-",10,"-","-","-","-"],["Anvil Guard",3,5,3,4,4,1,2,1,9],["Kraggi",3,4,3,3,4,1,2,1,9]],
      eq:"Klad Brakak, Thorek's Rune Armour, heavy armour, shield",
      rules:"Ancestral Grudge, Anvil of Doom, Forgefire, Locus of Power, Magic Resistance (2), Rune Lore, Strike the Runes" },
    grombrindal:{ profile:[["Grombrindal",3,7,4,4,5,3,4,4,10]],
      eq:"Rune Axe of Grimnir, Armour of Glimril Scales, Rune Cloak of Valaya, Rune Helm of Zhufbar",
      rules:"Ancestral Grudge, Disguised, Hidden, Magic Resistance (1), Relentless, Unbreakable" },
    ungrim:{ profile:[["Ungrim Ironfist",3,8,4,4,5,3,5,4,10]],
      eq:"Axe of Dargo, The Slayer Crown, Dragon Cloak of Fyrskar, medium armour",
      rules:"Ancestral Grudge, Daemon Slayer, Deathblow, Gromril Armour, Magic Resistance (1), Relentless, Slayer King, Unbreakable" },
    garagrim:{ profile:[["Garagrim Ironfist",3,6,4,4,5,2,4,3,10]],
      eq:"Axes of Kadrin",
      rules:"Ancestral Grudge, Deathblow, Dragon Slayer, Magic Resistance (1), Relentless, The War-mourner, Unbreakable" },
    bugman:{ profile:[["Josef Bugman",3,6,5,4,5,2,4,3,9]],
      eq:"Ol' Trustworthy, Bugman's Tankard, medium armour",
      rules:"Ancestral Grudge, Bugman's Rangers, Gromril Armour, Liquid Fortification, Magic Resistance (1), Relentless, Resolute, Scouts, Stout Courage" },
    burlok:{ profile:[["Burlok Damminson",3,5,4,4,4,2,2,2,9]],
      eq:"Furnace Hammer, Burlok's Armour",
      rules:"Ancestral Grudge, Artillery Master, Entrenchment, Magic Resistance (1), Relentless, Resolute, Stand Back Sir!" },
    grimm:{ profile:[["Grimm Burloksson",3,4,5,4,4,2,2,2,9]],
      eq:"Grudge-raker, Cog Axe",
      rules:"Ancestral Grudge, Entrenchment, Magic Resistance (1), Master of Accuracy, Relentless, Resolute, Stand Back Sir!" },

    warriors:{ profile:[["Warrior",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, medium armour",
      rules:"Ancestral Grudge, Magic Resistance (1), Relentless, Resolute" },
    quarrellers:{ profile:[["Quarreller",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, Dwarfen crossbow, light armour",
      rules:"Ancestral Grudge, Magic Resistance (1), Relentless, Resolute" },
    thunderers:{ profile:[["Thunderer",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, Dwarfen handgun, light armour",
      rules:"Ancestral Grudge, Magic Resistance (1), Relentless, Resolute" },
    miners:{ profile:[["Miner",3,4,3,3,4,1,2,1,9]], eq:"Great weapon, medium armour, Blasting Charges, Steam Drill",
      rules:"Ancestral Grudge, Magic Resistance (1), Relentless, Resolute, Underground Advance" },

    longbeards:{ profile:[["Longbeard",3,5,3,4,4,1,2,1,9]], eq:"Hand weapon, heavy armour",
      rules:"Ancestral Grudge, Hatred, Magic Resistance (1), Old Grumblers, Relentless, Resolute" },
    ironbreakers:{ profile:[["Ironbreaker",3,5,3,4,4,1,2,1,9]], eq:"Hand weapon, heavy armour, shield, Cinderblast bombs",
      rules:"Ancestral Grudge, Gromril Armour, Magic Resistance (1), Relentless, Resolute, Shieldwall" },
    trollslayers:{ profile:[["Troll Slayer",3,4,3,3,4,1,3,1,10]], eq:"Hand weapon",
      rules:"Ancestral Grudge, Deathblow, Magic Resistance (1), Relentless, Skirmishers, Slayer, Unbreakable, Vanguard" },
    rangers:{ profile:[["Ranger",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, light armour",
      rules:"Ancestral Grudge, Hill Strider, Magic Resistance (1), Relentless, Resolute, Scouts" },
    deathroller:{ profile:[["Deathroller","*","-","-",5,4,3,"-","-","-"],["Driver","-",4,3,3,"-","-",2,1,9]], eq:"Hand weapon",
      rules:"Ancestral Grudge, Best Defence, Grinding Attack, Magic Resistance (1), Random Movement (2D6), Resolute" },
    firethrower:{ profile:[["Fire Thrower",3,4,3,3,4,2,2,2,9]], eq:"Hand weapon, fire thrower, light armour",
      rules:"Ancestral Grudge, Magic Resistance (1), Relentless, Resolute, Weapon Team" },
    boltthrower:{ profile:[["Bolt Thrower","-","-","-","-",7,3,"-","-","-"],["Crew",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, bolt thrower",
      rules:"Ancestral Grudge, Magic Resistance (1), Resolute" },
    grudgethrower:{ profile:[["Grudge Thrower","-","-","-","-",7,3,"-","-","-"],["Crew",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, stone thrower",
      rules:"Ancestral Grudge, Magic Resistance (1), Resolute" },
    cannon:{ profile:[["Cannon","-","-","-","-",7,3,"-","-","-"],["Crew",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, cannon",
      rules:"Ancestral Grudge, Magic Resistance (1), Resolute" },
    gyrocopter:{ profile:[["Gyrocopter","-","-","-",4,5,3,"-","-","-"],["Pilot","-",4,3,3,"-","-",2,1,9]], eq:"Hand weapon, steam gun",
      rules:"Ancestral Grudge, Dive Bomb, Fly (9), Magic Resistance (1), Quick Turn, Relentless, Resolute" },

    hammerers:{ profile:[["Hammerer",3,5,3,4,4,1,2,2,9]], eq:"Great weapon, heavy armour",
      rules:"Ancestral Grudge, Armour Piercing (1), King's Guard, Magic Resistance (1), Relentless, Resolute, Stubborn" },
    irondrakes:{ profile:[["Irondrake",3,5,3,4,4,1,2,1,9]], eq:"Hand weapon, drakegun, heavy armour",
      rules:"Ancestral Grudge, Gromril Armour, Immunity (Flaming Attacks), Magic Resistance (1), Relentless, Resolute" },
    giantslayers:{ profile:[["Giant Slayer",3,5,3,4,4,1,3,2,10]], eq:"Hand weapon",
      rules:"Ancestral Grudge, Deathblow, Giant Slayer, Magic Resistance (1), Relentless, Unbreakable, Vanguard" },
    doomseekers:{ profile:[["Doomseeker",3,5,3,4,4,2,3,"*",10]], eq:"Doomseeker axes",
      rules:"Ancestral Grudge, Deathblow, Magic Resistance (1), Relentless, Skirmishers, Slayer, Unbreakable, Wards of Grimnir" },
    runeguardians:{ profile:[["Rune Guardian",6,3,0,5,5,3,1,3,10]], eq:"Hand weapon, heavy armour",
      rules:"Animated Construct, Immunity (Poisoned Attacks)" },
    organgun:{ profile:[["Organ Gun","-","-","-","-",7,3,"-","-","-"],["Crew",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, organ gun",
      rules:"Ancestral Grudge, Magic Resistance (1), Resolute" },
    flamecannon:{ profile:[["Flame Cannon","-","-","-","-",7,3,"-","-","-"],["Crew",3,4,3,3,4,1,2,1,9]], eq:"Hand weapon, flame cannon",
      rules:"Ancestral Grudge, Magic Resistance (1), Resolute" },
    gyrobomber:{ profile:[["Gyrocopter","-","-","-",4,5,3,"-","-","-"],["Pilot","-",4,3,3,"-","-",2,1,9]], eq:"Hand weapon, steam gun",
      rules:"Ancestral Grudge, Bombing Run, Fly (9), Magic Resistance (1), Quick Turn, Relentless, Resolute" },
    thunderbarge:{ profile:[["Thunderbarge","-","-","-",6,6,8,"-","-","-"],["Crew","-",4,3,3,"-","-",2,1,9]], eq:"Hand weapon, Dwarfen handgun, cannon",
      rules:"Ancestral Grudge, Bombing Run, Disaster!, Fly (6), Magic Resistance (1), Unbreakable" },
    grudgebreaker:{ profile:[["Grudgebreaker","*",3,0,6,7,8,1,"*",10]], eq:"—",
      rules:"Animated Construct, Immunity (Poisoned Attacks), Magic Resistance (1), Steam-pressured Engine, Terror" }
  },

  /* ============================== ITEM DESCRIPTIONS ============================== */
  itemDesc: {
    "Hammer of Smednir":"Each Hit with this weapon is multiplied into D3 Hits.",
    "Red Axe of Karak Eight Peaks":"Against all Orcs, Goblins and Skaven, the wielder may re-roll To Hit and To Wound rolls and causes Terror.",
    "Kraggis' Ancestral Pickaxe":"Great weapon. The wielder has the Armour Piercing (1) and Underground Advance (see Miners) special rules.",
    "Hammer of Karak Drazh":"Attacks are resolved at +3 Initiative; any enemy suffering one or more unsaved Wounds is subject to Always Strikes Last until the end of the next Close Combat phase.",
    "Magnificent Armour of Borek Beetlebrow":"Heavy armour. Gives the wearer a Magical Ward (3+) against all attacks of Strength 6 or higher.",
    "Ever-Burning Helmet of Grungni":"Gives a 6+ armour save. All close combat attacks directed against the wearer must re-roll To Hit.",
    "Runic Bracers of Skavor":"Gives a 6+ armour save. The wearer gains the Regeneration (5+) special rule.",
    "Helmet of the Anvil":"Gives a 6+ armour save. In addition, the wearer's armour save cannot be worse than a 6+.",
    "Golden Bands of Grimnir":"+1 Wound and the Magic Resistance (3) special rule.",
    "Heavy Metal Ingot":"The wielder may re-roll failed armour saves and invulnerable (ward) save rolls of 1 in any turn they have not moved.",
    "Focal Lens of Morgrim":"The bearer and any unit they join gain +1 To Hit with missile weapons.",
    "Fiery Ring of Thori":"Gives the bearer a Strength 4 Breath Weapon with the Flaming Attacks special rule.",
    "Golden Sceptre of Norgrim":"The bearer and any unit they are with may re-roll 1s To Hit and To Wound in close combat.",
    "Runic Tablet of Thungni":"The bearer and any unit they join gain the Armour Piercing (1) special rule.",
    "Silver Horn of Vengeance":"One use. At the start of a friendly turn, the bearer and friendly units within 6\" gain Devastating Charge until the start of their next turn; afterwards the bearer and any unit joined cause Fear in all Elves for the rest of the game.",
    "Teardrop of Grungni":"One use. A missile attack with a 6\" range dealing D3 Strength 6 Hits; a lone target model must also halve its Movement until the start of your next turn.",
    "Healing Salve of Valaya":"One use. At the start of your turn the model recovers D3 Wounds up to its starting value.",
    "Resounding Gromril Horn":"One use. At the start of any of your turns, all friendly units within 12\" gain +1 Leadership for the turn.",
    "Banner of Lost Holds":"All models in the unit may re-roll failed To Wound rolls in close combat."
  },

  /* ============================== GLOSSARY ============================== */
  glossary: {
    "Ancestral Grudge":"Dwarfs have the Hatred special rule against Orcs, Goblins and Skaven.",
    "Deathblow":"If a model with this rule is killed by normal Close Combat Attacks, it immediately makes a single Attack back against the unit or model that killed it before being removed as a casualty.",
    "Gromril Armour":"Models with this rule add +1 to their armour save if they wear light, medium or heavy armour.",
    "Oath Stones":"A model with an Oathstone gains Magic Resistance (2). Its unit can never choose to flee as a charge reaction, cannot be disrupted, and may make Parry saves against attacks to its flanks and rear; a character with an Oathstone must always accept a challenge. However, a model on an Oathstone that fails a Break Test is removed as a casualty.",
    "Oathstone":"A model with an Oathstone gains Magic Resistance (2). Its unit can never choose to flee as a charge reaction, cannot be disrupted, and may make Parry saves to its flanks and rear; a character must always accept a challenge; a model that fails a Break Test is removed as a casualty.",
    "Relentless":"Units entirely composed of models with this rule do not need to pass a Leadership test in order to march, regardless of the proximity of enemy units.",
    "Resolute":"When taking Break tests, models with this rule count as having lost the combat with 1 point fewer than they actually have.",
    "Slayer":"Always Wound on a To Wound roll of 4+ in close combat (unless a lower result is needed); use the model's Strength for the armour save modifier. Giant/Dragon/Daemon Slayers add further rules.",
    "Giant Slayer":"Multiple Wounds (D3) when attacking Monstrous Infantry, Monstrous Beasts or Monstrous Cavalry.",
    "Dragon Slayer":"Has Giant Slayer; also Multiple Wounds (D3) when attacking Monstrous Creatures and Monsters.",
    "Daemon Slayer":"Has Dragon Slayer; in addition, any successful Magical Ward saves against the model's Attacks must be re-rolled.",
    "Wards of Grimnir":"Magical Ward (6+) against missile attacks and Magic Resistance (2).",
    "Dwarfen crossbow":"Range 30/36\", Strength 4, Ponderous.",
    "Dwarfen handgun":"Range 18/24\", Strength 5, Ponderous.",
    "Dwarfen pistol":"Range 9/12\", Strength 5, Multiple Shots (2)* and Quick Shot (*requires a brace).",
    "Forgefire":"The model and any unit they join gain the Armour Piercing (1) special rule.",
    "Rune Lore":"Runelords act as Level 4 Wizards and Runesmiths as Level 2 Wizards for channelling and dispelling. Each may attempt one of four Runes (Haste & Urgency, Hearth & Hold, Stone & Steel, Wrath & Ruin) at the start of each turn on a Leadership test; a unit can be under only one Rune at a time.",
    "Old Grumblers":"Longbeards have Immunity (Panic); friendly Dwarf units within 6\" may re-roll failed Panic tests.",
    "Shieldwall":"Models with this rule may re-roll failed Parry saves.",
    "Underground Advance":"Miners have Ambushers with special deployment: place a marker, scatter it, then emerge in contact; a misfire sends the unit to the Underground Mishap chart.",
    "King's Guard":"If the unit is joined by the Army General, it gains Immunity (Fear/Terror).",
    "Royal Clansmen":"You may upgrade one unit of Dwarf Warriors with heavy armour for +1.5 points/model for each King in your army.",
    "Artillery Master":"One war machine within 3\" of a Master Engineer may use his Ballistic Skill, or re-roll one artillery or scatter dice, each Shooting phase (not the bounce dice).",
    "Entrenchment":"Up to one war machine per Master Engineer may be entrenched (hard cover; -1 To Hit to chargers). Lost if it moves other than pivoting.",
    "Stand Back Sir!":"A model within 3\" of a war machine may take a Look Out Sir! roll as if near five models of its troop type; if passed the hit is resolved against the nearest friendly war machine.",
    "Beer Casks":"At the start of each turn the Brewmaster may grant one beer to himself and his unit (Bugman's XXXXXX = Mighty Blow (1); Dwarf Special Reserve = Immunity (Psychology); Troll Brew = Regeneration (6+)); on a roll of 1 the unit also suffers -1 WS/BS/I.",
    "Anvil of Doom":"A Runelord on an Anvil of Doom gains Magical Ward (4+) and Unbreakable, becomes a War Machine and part of the crew; if the Runelord is killed the whole Anvil is removed.",
    "Locus of Power":"For each friendly Anvil of Doom on the battlefield, add one dice to your dispel pool at the start of each Magic phase.",
    "Strike the Runes":"An Anvil-mounted Runelord may strike one of three Ancestor Runes (Grungni, Valaya, Grimnir) at the start of each turn on a Leadership test; a failed test rolls on the Failed Rune table.",
    "Best Defence":"The Deathroller has a 3+ armour save against all models attacking from the front.",
    "Grinding Attack":"In addition to normal Impact Hits when charging, the Deathroller inflicts D6 Impact Hits at the start of each close combat round; a roll of 6 triggers the Boiler Incident table.",
    "Dive Bomb":"Once per game, drop bombs on an enemy unit the Gyrocopter moved over; roll an artillery dice for the number of rear missile hits (a misfire deals one Wound to the Gyrocopter).",
    "Bombing Run":"During the Remaining Moves sub-phase, drop a Grudgebuster bomb on an enemy unit moved over (large template, scatter and damage as a stone thrower).",
    "Quick Turn":"The model may pivot on the spot like a Lone Model despite being a chariot.",
    "Steam-pressured Engine":"The Grudgebreaker uses Random Movement and Random Attacks with an Artillery dice (re-rollable unless a Misfire); a Misfire rolls on the Grudgebreaker Incident table.",
    "Disaster!":"If the Thunderbarge is destroyed it scatters 3D6\" and crashes; models under the large template suffer a Strength 6 hit.",
    "Thunderbarge Cannon":"A cannon that cannot fire grapeshot and may fire even if the Thunderbarge marches; a Destroyed! misfire deals D3 Wounds and disables the weapon.",
    "High King":"Thorgrim must be the Army General; if slain, all friendly Dwarf models gain Frenzy and one Hammerers unit may be taken as Special.",
    "The Throne of Power":"Adds +4 Wounds (in profile), Unit Strength 5, Line of Sight 2 and Inspiring Presence (6); Thorgrim gains no Look Out Sir! if he joins a unit.",
    "Lord of the Hold":"If Alrik is in your army he must be the Army General.",
    "Revenge Incarnate":"Once per game, at the start of a Close Combat phase, Belegar may double his Attacks for the turn.",
    "Slayer King":"If Ungrim is the Army General, Troll Slayers are Core and Giant Slayers are Special.",
    "The War-mourner":"Each Wound Garagrim inflicts counts double towards combat resolution; vs Toughness 5+ he has Multiple Wounds (D6). He may never be the Army General.",
    "Disguised":"The White Dwarf is Hidden; if revealed he stands his ground and acts as a lone character. He may never be the army General.",
    "Bugman's Rangers":"Josef Bugman must be accompanied by a unit of Rangers at 17 pts/model (Strength 4, great weapons, Dwarfen crossbows, medium armour, shields); he may never leave it.",
    "Liquid Fortification":"Roll a D6 each turn: 1 Bad Brew (Flammable), 2-4 Belligerent (Stubborn), 5-6 Leathered (+1 Toughness) to Bugman and any unit joined.",
    "Stout Courage":"Bugman and any unit he joins have Immunity (Fear/Terror) while he remains with the unit.",
    "Master of Accuracy":"Each Shooting phase Grimm may grant a friendly unit within 3\" one of: Artillery Adjustment, Increased Range (+6\"), or Superior Volley (+1 To Hit).",
    "Beast Slayer":"Each Wound the model inflicts counts double towards that round's Combat Resolution (excluding Overkill Wounds in a challenge).",
    "Vampire Slayer":"The model may re-roll failed rolls To Wound against enemies with Toughness 5 or higher.",
    "Skaven Slayer":"The model gains a number of Attacks equal to the number of enemy models in base contact with him.",
    "Guardian runes (up to two)":"Choose up to two: Rune of Cleaving (Armour Piercing (1) + Magical Attacks), Rune of Fury (+1 Attack + Magical Attacks), Rune of Striking (+1 Weapon Skill + Magical Attacks), Rune of Stone (+1 armour save), Rune of Warding (Magical Ward (6+)).",
    "Miner's Cart":"A Shrine drawn by a Draft Pony that cannot leave the unit; lets the unit use Blasting Charges every turn. If destroyed, models under the large template suffer a Strength 4 Hit with Armour Piercing (1) and Flaming Attacks.",
    "Doomseeker axes":"Range Combat, Strength as user, Impact Hits (D6) at the start of each round of close combat; close combat attacks against a Doomseeker suffer -1 To Hit.",
    "Blasting Charges":"One use. Range 6/9\", Strength 4, Armour Piercing (1), Flaming Attacks, Quick Shot.",
    "Cinderblast bombs":"Range 6/9\", Strength 5, Armour Piercing (1), Multiple Wounds (D3), Quick Shot; each Hit is multiplied into D3 Hits.",
    "Steam Drill":"Great weapon that adds +1 Strength; the unit may re-roll a failed arrival for its Ambushers special rule.",
    "drakegun":"Range 9/18\", Strength 5, Armour Piercing (1), Flaming Attacks, Multiple Shots (2), Quick Shot (non-physical).",
    "Trollhammer Torpedo":"Range 12/24\", Strength 8, Flaming Attacks, Multiple Wounds (D3), Slow to Fire.",
    "steam gun":"Breath Weapon, Strength 2, Armour Piercing (1); usable only in the Shooting phase.",
    "fire thrower":"A template Breath Weapon war-machine weapon.",
    "flame cannon":"Fire thrower; Range 6\", Strength 5, Flaming Attacks, Multiple Wounds (D3).",
    "Grudge-raker":"Range 15/30\", Strength 5, Armour Piercing (1), Dwarf-crafted, Multiple Shots (2D3).",
    "Cog Axe":"Hand weapon with Armour Piercing (1); on a hit vs a magic weapon, on a 5+ that weapon is destroyed.",
    "Dwarf-crafted":"A Dwarf-crafted missile weapon (no penalty for moving and shooting; see the weapon's profile).",
    "Slow to Fire":"The weapon may only fire every other turn.",
    "Rune of Cleaving":"Rune Guardian: gains the Armour Piercing (1) and Magical Attacks special rules.",
    "Rune of Fury":"Rune Guardian: gains +1 Attack and the Magical Attacks special rule.",
    "Rune of Striking":"Rune Guardian: gains +1 Weapon Skill and the Magical Attacks special rule.",
    "Rune of Stone":"Rune Guardian: gains +1 to its armour save.",
    "Rune of Warding":"Rune Guardian: gains the Magical Ward (6+) special rule."
  }
};
