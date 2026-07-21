/* ============================================================================
   THE 8 LORES OF MAGIC — shared spell data (Warhammer 9th Edition 3.0 rulebook,
   Mathias Eliasson). Registered as window.COMMON_LORES so EVERY army can resolve
   spell data for any standard Lore a wizard is allowed to use.

   IMPORTANT: this file does NOT grant access to a lore — each army book still
   restricts which Lores its wizards may pick via the unit's `lores: [...]` list.
   It only provides the spell data "ready when needed". A book-specific lore in a
   book's own `spellLores` takes precedence over the entry here.

   Spell shape: { name, lvl (0 = signature), cast, type, range, effect }.
   ========================================================================== */
window.COMMON_LORES = {
  "Fire": {
    attribute: { name: "Kindleflame", text: `All Lore of Fire spells have Flaming Attacks. If a spell hits an enemy unit already hit by a Lore of Fire spell this Magic phase, it inflicts an extra D3 Strength 4 hits.` },
    spells: [
      { name: "Fireball", lvl: 0, cast: 6, type: "Magic missile", range: `30"`, effect: `D6 Strength 4 hits.` },
      { name: "Cascading Fire-Cloak", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `Remains in play. Each enemy unit in base contact with the target suffers 2D6 Strength 4 hits at the end of each Magic phase.` },
      { name: "Breathe Fire", lvl: 1, cast: 6, type: "Direct damage (Breath)", range: "Breath", effect: `Caster makes a Breath Weapon attack (may be cast in combat); all models hit suffer a Strength 4 hit.` },
      { name: "Flaming Sword of Rhuin", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `Target (except mounts) gets +1 To Wound with all attacks and gains Magical + Flaming Attacks.` },
      { name: "Fires of U'Zhul", lvl: 2, cast: 6, type: "Magic missile", range: `18"`, effect: `D6 Strength 5 hits.` },
      { name: "Sweltering Heat", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `Remains in play. Target rolls an extra D6 (discard highest) when it charges/pursues/flees, and suffers D6 Strength 3 hits each Magic phase.` },
      { name: "The Burning Head", lvl: 2, cast: 9, type: "Direct damage", range: `18" line`, effect: `12" line; each model in the way suffers a Strength 4 hit; casualties cause a Panic test.` },
      { name: "Fiery Blast", lvl: 3, cast: 9, type: "Direct damage", range: `24"`, effect: `Small round template; all models under it suffer a Strength 4 hit.` },
      { name: "Piercing Bolts of Burning", lvl: 3, cast: 10, type: "Magic missile", range: `30"`, effect: `D3 Strength 5 hits; each hit pierces ranks like a Bolt Thrower.` },
      { name: "Fulminating Flame Cage", lvl: 3, cast: 11, type: "Hex", range: `24"`, effect: `D6 Strength 4 hits now; if the unit moves/flees/pursues, every model takes a Strength 4 hit.` },
      { name: "Conflagration of Doom", lvl: 4, cast: 12, type: "Direct damage", range: `30"`, effect: `D6 Strength 4 hits, then escalating extra D6 hits (2+, 3+, 4+ …) until you fail.` },
      { name: "Flame Storm", lvl: 4, cast: 13, type: "Direct damage", range: `18"`, effect: `Small round template that then moves D6"; all models touched suffer a Strength 4 hit.` },
      { name: "Magma Storm", lvl: 4, cast: 15, type: "Vortex", range: "Small template", effect: `Remains in play. Any model touched suffers a Strength 5 hit with Multiple Wounds (D3).` }
    ]
  },
  "Metal": {
    attribute: { name: "Metallic Attraction", text: `+1 to cast if the majority of the target unit has a close-combat armour save of 4+ or better (excluding Natural Armour).` },
    spells: [
      { name: "Glittering Robe", lvl: 0, cast: 5, type: "Augment", range: `18"`, effect: `Target gains a 6+ armour save.` },
      { name: "Searing Doom", lvl: 1, cast: 5, type: "Magic missile", range: `24"`, effect: `D3 hits, Ignores Armour + Flaming; To Wound = target's unmodified armour save (no save = can't be wounded).` },
      { name: "Law of Gold", lvl: 1, cast: 6, type: "Hex", range: `24"`, effect: `Reveal the unit's Magic Items; nominate one — on 1-4 it is disabled this turn, on 5+ for the game.` },
      { name: "Plague of Rust", lvl: 1, cast: 6, type: "Hex", range: `24"`, effect: `Target's armour save (excl. Natural) lowered by 1 for the rest of the game; stacks.` },
      { name: "Commandment of Brass", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `War Machine/Chariot cannot move; war machine / artillery cannot shoot.` },
      { name: "Silver Arrows of Arha", lvl: 2, cast: 7, type: "Magic missile", range: `24"`, effect: `2D6 Strength 3 hits with Armour Piercing (1).` },
      { name: "Enchanted Blades of Aiban", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `Target (except mounts) gains +1 To Hit, Armour Piercing (1) and Magical Attacks.` },
      { name: "Gehenna's Golden Hounds", lvl: 3, cast: 8, type: "Direct damage", range: `12"`, effect: `Single model (even in a unit): D6 Strength 4 hits ("Look Out Sir!" can't be used).` },
      { name: "Transmutation of Lead", lvl: 3, cast: 9, type: "Hex", range: `24"`, effect: `Target suffers -1 To Hit, -1 Movement and -1 Initiative.` },
      { name: "The Gilded Cage", lvl: 3, cast: 11, type: "Hex", range: `24"`, effect: `Unengaged target becomes Unbreakable, cannot move and counts as impassable terrain.` },
      { name: "Meteoric Ironclad", lvl: 4, cast: 13, type: "Augment", range: `18"`, effect: `Target gains the Magical Ward (4+) special rule.` },
      { name: "Quicksilver Swords", lvl: 4, cast: 13, type: "Augment", range: `18"`, effect: `Target gains Ignores Armour Saves and Magical Attacks.` },
      { name: "Final Transmutation", lvl: 4, cast: 15, type: "Direct damage", range: `18"`, effect: `Each model rolls a D6 per Wound on its profile; each 5+ is a Wound that Ignores Armour Saves and Regeneration.` }
    ]
  },
  "Life": {
    attribute: { name: "Lifebloom", text: `When a Lore of Life spell is successfully cast, the Wizard (or a friendly model within 6") recovers a single Wound lost earlier in the battle.` },
    spells: [
      { name: "Earth Blood", lvl: 0, cast: 5, type: "Augment", range: `18"`, effect: `Target gains Regeneration (6+).` },
      { name: "Shield of Thorns", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `Remains in play. Enemies who fail To Hit the target in close combat suffer a Strength 3 hit.` },
      { name: "Awakening of the Wood", lvl: 1, cast: 6, type: "Direct damage", range: `24"`, effect: `D6 Strength 4 hits (2D6 if the target is within 6" of a forest).` },
      { name: "The Cloak of Dain", lvl: 1, cast: 7, type: "Augment", range: `18"`, effect: `Ignore the first D3 hits the target suffers each Shooting and Close Combat phase.` },
      { name: "Flesh to Stone", lvl: 2, cast: 7, type: "Augment", range: `18"`, effect: `Target gains +1 Toughness.` },
      { name: "Leaf Fall", lvl: 2, cast: 7, type: "Augment (aura)", range: `6"`, effect: `Missile attacks at affected units suffer -1 To Hit.` },
      { name: "Gift of Life", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `Single model recovers D3 Wounds lost earlier in the battle.` },
      { name: "Throne of Vines", lvl: 3, cast: 8, type: "Augment", range: "Self", effect: `Remains in play. Upgrades the caster's other Lore of Life spells (Earth Blood Regen 5+, +2 T, etc.).` },
      { name: "Barkskin", lvl: 3, cast: 9, type: "Augment", range: `18"`, effect: `Target gains Flammable and Natural Armour (5+).` },
      { name: "Mistress of the Marsh", lvl: 3, cast: 9, type: "Hex", range: `24"`, effect: `All movement by the target counts as moving through marshland.` },
      { name: "Paranoth's Pathway", lvl: 4, cast: 10, type: "Conveyance", range: `18"`, effect: `Target is moved to any point within 12" of its position.` },
      { name: "Regrowth", lvl: 4, cast: 11, type: "Augment", range: `24"`, effect: `Target recovers D6+1 Wounds' worth of models slain earlier in the battle.` },
      { name: "The Dwellers Below", lvl: 4, cast: 15, type: "Direct damage", range: `18"`, effect: `Large round template; each model passes a Strength test per Wound or suffers a Wound that Ignores Armour Saves and Regeneration.` }
    ]
  },
  "Beasts": {
    attribute: { name: "Wildheart", text: `+1 to cast if the target(s) contain a War Beast, Cavalry, Monstrous Beast/Cavalry/Creature, Monster, Chariot, Swarm or Beastman.` },
    spells: [
      { name: "Wyssan's Wildform", lvl: 0, cast: 5, type: "Augment", range: `18"`, effect: `Target re-rolls failed To Wound rolls in close combat.` },
      { name: "The Flock of Doom", lvl: 1, cast: 5, type: "Magic missile", range: `24"`, effect: `3D6 Strength 2 hits.` },
      { name: "The Ox Stands", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `Target gains Immunity (Psychology) and Stubborn.` },
      { name: "Pann's Impenetrable Pelt", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `Target gains Natural Armour (6+) (cannot be lowered below 6+ while in effect).` },
      { name: "The Eagle's Cry", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `Target takes a Panic test; if passed it suffers -2 Movement.` },
      { name: "Hunter's Moons", lvl: 2, cast: 7, type: "Augment (aura)", range: `12"`, effect: `Affected units gain Swiftstride and may re-roll failed charge/pursuit rolls.` },
      { name: "The Vengeful Hood", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `Target gains Magical Ward (6+) in close combat; each Ward save of 6 wounds the attacker (Ignores Armour).` },
      { name: "The Curse of Anraheir", lvl: 3, cast: 9, type: "Hex", range: `30"`, effect: `Target suffers -1 To Hit and treats all terrain as Dangerous Terrain.` },
      { name: "The Savage Beast of Horros", lvl: 3, cast: 10, type: "Augment", range: `18"`, effect: `A Character/Monstrous Creature/Monster (incl. the Wizard) gains +3 Strength and +3 Attacks.` },
      { name: "The Beast Cowers", lvl: 3, cast: 11, type: "Hex", range: `24"`, effect: `Wildheart-type models in the target suffer -1 Attack and cannot voluntarily move.` },
      { name: "The Amber Spear", lvl: 4, cast: 12, type: "Magic missile", range: `30"`, effect: `Single Strength 7 hit, Ignores Armour + Multiple Wounds (D6), pierces ranks like a bolt thrower.` },
      { name: "The Wolf Hunts", lvl: 4, cast: 13, type: "Conveyance", range: `18"`, effect: `Target moves toward the nearest visible enemy using Random Movement (2D6).` },
      { name: "Merciw's Monstrous Regiment", lvl: 4, cast: 15, type: "Augment", range: `18"`, effect: `Target gains +1 Strength, Toughness and Attacks.` }
    ]
  },
  "Heavens": {
    attribute: { name: "Fantastic Foresight", text: `On a successful cast, roll a D6; on 4+ the Wizard may re-roll one dice (casting result or hits) while casting further spells this Magic phase.` },
    spells: [
      { name: "Harmonic Convergence", lvl: 0, cast: 6, type: "Augment", range: `18"`, effect: `Target re-rolls all To Hit, To Wound and armour save rolls of 1.` },
      { name: "Azure Blades", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `Remains in play. Enemy units in base contact with the target suffer 3D6 Strength 3 hits each Magic phase.` },
      { name: "Star Tides Ebb", lvl: 1, cast: 5, type: "Hex (area)", range: `24"`, effect: `Non-Heavens spells within range suffer -2 to cast.` },
      { name: "Cerulean Shield", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `Target gains Magical Ward (4+) against non-magical missile attacks.` },
      { name: "Sign of Amul", lvl: 2, cast: 6, type: "Augment", range: "Self", effect: `You may re-roll any one of your dice until your next Magic phase.` },
      { name: "Crystal Prison", lvl: 2, cast: 8, type: "Hex", range: `24"`, effect: `Remains in play. Lock an enemy character: cannot be harmed, but cannot move/shoot/fight/cast.` },
      { name: "Portent of Doom", lvl: 2, cast: 8, type: "Hex", range: `24"`, effect: `Target must re-roll all 6's when rolling To Hit, To Wound and armour saves.` },
      { name: "The Sapphire Arch", lvl: 3, cast: 8, type: "Conveyance", range: `24"`, effect: `Target is removed and re-emerges anywhere at the start of your next Magic phase.` },
      { name: "Storm of Cronos", lvl: 3, cast: 9, type: "Direct damage", range: `18"`, effect: `Each enemy unit within 18" of the front arc suffers D6 Strength 4 hits.` },
      { name: "Urannon's Thunderbolt", lvl: 3, cast: 9, type: "Magic missile", range: `24"`, effect: `D6 Strength 5 hits with Lightning Attacks.` },
      { name: "Comet of Casandora", lvl: 4, cast: 12, type: "Summoning (area)", range: `36"`, effect: `Place a marker; it strikes on a 4-6, dealing 2D6 Strength 4 hits within 2D6" (grows each turn).` },
      { name: "Chain Lightning", lvl: 4, cast: 13, type: "Direct damage", range: `24"`, effect: `D6 Strength 5 Lightning hits, then chains to further units within 6" (escalating roll).` },
      { name: "Thorsen's Thunderstorm", lvl: 4, cast: 15, type: "Vortex", range: "Small template", effect: `Remains in play. Any model touched suffers a Strength 4 hit with Lightning Attacks.` }
    ]
  },
  "Light": {
    attribute: { name: "Focus Energy", text: `If the caster is not in combat and has not moved this turn, +1 to cast. Lore of Light damage gets +1 To Wound against Daemons, Undead and Vampires.` },
    spells: [
      { name: "Shem's Burning Gaze", lvl: 0, cast: 5, type: "Magic missile", range: `24"`, effect: `D6 Strength 4 hits with Flaming Attacks.` },
      { name: "Dazzling Brightness", lvl: 1, cast: 6, type: "Hex", range: `24"`, effect: `Target's Movement is halved and it suffers -1 Weapon Skill and Ballistic Skill.` },
      { name: "Healing Energy", lvl: 1, cast: 6, type: "Augment", range: `36"`, effect: `Single model recovers 1 Wound lost earlier in the battle.` },
      { name: "Pha's Protection", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `All attacks against the target suffer -1 To Hit; non-BS shooting must roll 4+ to fire.` },
      { name: "Birona's Timewarp", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `Target's Movement is doubled and it gains Swiftstride (can exceed M10).` },
      { name: "The Claw of Apek", lvl: 2, cast: 8, type: "Direct damage", range: `18"`, effect: `Single model: D6 attacks at WS4, Strength 4, Ignores Armour, as close combat attacks.` },
      { name: "The Speed of Light", lvl: 2, cast: 8, type: "Augment", range: `18"`, effect: `Target gains Always Strikes First.` },
      { name: "Cleansing Flare", lvl: 3, cast: 9, type: "Direct damage", range: `12"`, effect: `Each enemy unit within 12" of the front arc suffers D6 Strength 5 hits.` },
      { name: "Light of Battle", lvl: 3, cast: 9, type: "Augment", range: `18"`, effect: `Target rallies if fleeing and auto-passes all Leadership tests (incl. Break).` },
      { name: "Banishment", lvl: 3, cast: 9, type: "Magic missile", range: `24"`, effect: `2D6 hits at Strength 4 + the number of nearby Light Wizards (each adds +2 to the cost).` },
      { name: "Net of Amyntok", lvl: 4, cast: 10, type: "Hex", range: `24"`, effect: `When the target moves/shoots/casts it takes D6 Strength 4 hits and must pass a Strength test or fail the action.` },
      { name: "Time Amok", lvl: 4, cast: 14, type: "Augment", range: `18"`, effect: `Target may make all its shooting or close combat attacks twice this turn.` },
      { name: "Pillar of Radiance", lvl: 4, cast: 15, type: "Direct damage", range: `24"`, effect: `Large round template; all models under it suffer a Strength 4 hit.` }
    ]
  },
  "Shadow": {
    attribute: { name: "Steed of Shadows", text: `After successfully casting a Shadow spell, the caster may immediately make a Fly move equal to 10 minus its Line of Sight value.` },
    spells: [
      { name: "Melkoth's Mystifying Miasma", lvl: 0, cast: 5, type: "Hex", range: `24"`, effect: `Reduce the target's WS, BS, Initiative OR Movement (your choice) by D3 (min 1).` },
      { name: "Creeping Darkness", lvl: 1, cast: 5, type: "Magic missile", range: `24"`, effect: `2D6 Strength 1 hits with Ignores Armour Saves.` },
      { name: "The Enfeebling Foe", lvl: 1, cast: 6, type: "Hex", range: `24"`, effect: `Remains in play. All models in the target have -1 Strength (min 1).` },
      { name: "Cloak of Midnight", lvl: 1, cast: 6, type: "Augment", range: `18"`, effect: `Missile attacks against the target hit only on a natural 6; scatter templates always scatter.` },
      { name: "Horn of Andar", lvl: 2, cast: 7, type: "Hex (aura)", range: `12"`, effect: `Affected units suffer -1 Leadership.` },
      { name: "The Withering", lvl: 2, cast: 7, type: "Hex", range: `24"`, effect: `Remains in play. All models in the target have -1 Toughness (min 1).` },
      { name: "The Dance of Despair", lvl: 2, cast: 8, type: "Hex", range: `24"`, effect: `Remains in play. Target must move straight forward using Random Movement (2D6).` },
      { name: "Crown of Taidron", lvl: 3, cast: 9, type: "Direct damage (aura)", range: `12"`, effect: `Each affected unit suffers D6 Strength 4 hits.` },
      { name: "Unseen Lurker", lvl: 3, cast: 10, type: "Augment", range: `18"`, effect: `Units can only draw Line of Sight to the target within 8".` },
      { name: "Bridge of Shadows", lvl: 3, cast: 12, type: "Conveyance", range: `12"`, effect: `Target is moved to any position within 18" of its original position.` },
      { name: "Okkam's Mindrazor", lvl: 4, cast: 12, type: "Augment", range: `18"`, effect: `Target (except mounts) gains Magical Attacks and uses Leadership instead of Strength to Wound in close combat.` },
      { name: "The Penumbral Pendulum", lvl: 4, cast: 13, type: "Direct damage", range: `18" line`, effect: `18" line directly ahead; each model in the way suffers a Strength 10 hit with Multiple Wounds (D3).` },
      { name: "Pit of Shades", lvl: 4, cast: 15, type: "Direct damage", range: `24"`, effect: `Small round template; each model rolls a D6 per Wound — on 4+ suffers a Wound that Ignores Armour Saves and Regeneration.` }
    ]
  },
  "Death": {
    attribute: { name: "Life Leeching", text: `On a successful cast, roll a D6 per unsaved Wound caused this turn; each 6+ adds a dice to your power pool (max +3 per spell).` },
    spells: [
      { name: "Dark Hand of Death", lvl: 0, cast: 6, type: "Magic missile", range: `18"`, effect: `D6 Strength 3 hits with Ignores Armour Saves.` },
      { name: "Death Dealer", lvl: 1, cast: 5, type: "Augment", range: `18"`, effect: `Target gains Fear; slain models may make an extra Attack.` },
      { name: "The Caress of Laniph", lvl: 1, cast: 6, type: "Direct damage", range: `12"`, effect: `Single model takes D6 Strength tests; each failure is a Wound that Ignores Armour Saves.` },
      { name: "Spirit Leech", lvl: 1, cast: 7, type: "Hex", range: `18"`, effect: `Single Monster/Monstrous Creature/character: Leadership contest, -1 S/-T per point you win by (for the battle).` },
      { name: "The Choking Foe", lvl: 2, cast: 8, type: "Hex", range: `24"`, effect: `Remains in play. Each Magic phase the target takes a Leadership test, suffering a Wound (Ignores Armour) per point failed (cumulative -1).` },
      { name: "Wind of Death", lvl: 2, cast: 8, type: "Magic missile", range: `18"`, effect: `2D6 Strength 4 hits.` },
      { name: "Drain Life", lvl: 2, cast: 9, type: "Direct damage (aura)", range: `12"`, effect: `Each affected unit suffers D6 Strength 2 hits (Ignores Armour); each To Wound 6 restores a Wound to the caster.` },
      { name: "Scythe of Shyish", lvl: 3, cast: 9, type: "Direct damage", range: `18"`, effect: `Each model in the unit's front rank suffers a Strength 5 hit ("Look Out Sir!" allowed).` },
      { name: "Doom and Darkness", lvl: 3, cast: 10, type: "Hex", range: `24"`, effect: `Remains in play. Target suffers -3 Leadership.` },
      { name: "Ashes and Dust", lvl: 3, cast: 11, type: "Direct damage", range: `18"`, effect: `Small round template; each model rolls a D6 per Wound — on 4+ suffers a Wound (Ignores Armour & Regen).` },
      { name: "The Fate of Bjuna", lvl: 4, cast: 12, type: "Direct damage", range: `12"`, effect: `Remains in play. Single model takes hits equal to its current Wounds each Magic phase, wounding on 4+ (Ignores Armour).` },
      { name: "Soulblight", lvl: 4, cast: 12, type: "Hex", range: `24"`, effect: `Target suffers -1 Strength and -1 Toughness (min 1).` },
      { name: "The Purple Sun of Xereus", lvl: 4, cast: 15, type: "Vortex", range: "Small template", effect: `Remains in play. Each model touched rolls a D6 per Wound — on 4+ suffers a Wound (Ignores Armour & Regen).` }
    ]
  }
};
