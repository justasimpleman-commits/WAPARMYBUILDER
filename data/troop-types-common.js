/* ============================================================================
   Troop Types from the 9th Edition 3.11 rulebook ("The Game of Fantasy
   Battles" — Troop Types chapter, pp.71-76, plus the War Machines chapter,
   pp.77-78, which the War Machines troop type points to).

   Every army-book unit profile carries a TROOP TYPE line, e.g.
   "Infantry (Character, Dark Elf)" or "Chariot (Armour Save 6+)". Books store
   that line verbatim as `unitInfo[id].troop`; the engine strips the
   parenthetical and resolves the base type here via troopDef() (singular or
   plural: "War Beast" → "War Beasts"), so the troop type on a unit's detail
   popup, a mount's profile and the game-mode card is clickable into these rules.

   TEXT IS TRANSCRIBED VERBATIM FROM THE RULEBOOK — do not paraphrase or
   summarise. Paragraphs are separated by blank lines; bold sub-headers are
   written as **Sub-heading**; a bullet list is one paragraph of "• " lines.
   ========================================================================== */
(function () {
  window.COMMON_TROOP_TYPES = {
    "Troop Types":
`In most cases it will be fairly obvious which troop type category a model falls into, but as troop type is essentially an extension of the characteristic profile, you'll find that information in the relevant Warhammer Armies book. Most units in Warhammer conform to one of the following types.

**Characters**

In addition to their troop type, some models might also be noted as being characters. We're not going to worry about characters here, however – characters are such a powerful and important part of Warhammer that they have a chapter all to themselves later in the book.

**Complete Ranks**

There are multiple instances where the rules will mention a "complete rank of models". What constitutes as a complete rank of models varies for each troop type, and is specified for each of them in this chapter. Note that if the unit has an incomplete rear rank, but that rear rank still has the minimum number of required models according to its troop type, that rank still counts as being complete.

**Unit Strength & Line of Sight**

The values listed in this chapter are the default for each troop type. However, there may be some exceptions to this in the various Warhammer Armies book.

**Models and Base Sizes**

Each model should be mounted on a base to determine the width and depth of the unit. Each troop type has different generally approved base sizes, which are listed in each army book. War machines however, may choose to either be mounted on a base, or be placed on the board as is.

In some cases, you might be using a model that requires a larger base than described. This is completely fine, as long as you try to keep it as close as possible to the normal approved base sizes. However, you may never have a base size that is smaller than the approved base sizes listed.`,

    "Infantry":
`The following rules apply to Infantry:

**Ranks**

A unit of Infantry is required to be five or more models wide in order to have a complete rank.

**Supporting Attacks**

An Infantry model may make up to one supporting attack.

**Unit Strength**

Infantry have a Unit Strength of 1.

**Line of Sight**

Infantry have a Line of Sight value of 1.`,

    "Monstrous Infantry":
`The following rules apply to Monstrous Infantry:

**Ranks**

A unit of Monstrous Infantry is required to be three or more models wide in order to have a complete rank. In addition, their fighting rank is three models rather than five.

**Supporting Attacks**

A Monstrous Infantry model may make up to three supporting attacks.

**Special Rules**

Monstrous Infantry are subject to the following special rules:

• Fear

**Unit Strength**

Monstrous Infantry have a Unit Strength of 2.

**Line of Sight**

Monstrous Infantry have a Line of Sight value of 2.`,

    "Cavalry":
`The following rules apply to Cavalry:

**Split Profile**

Although a cavalry model has two sets of characteristics, one for the rider and one for the mount, it is treated in all respects as a single model – the rider cannot dismount. When moving, the cavalry model always uses the Movement characteristic of the mount, and never that of the rider.

The rider and mount use their own Weapon Skill, Strength, Initiative and Attacks characteristics when they attack. Each can attack any opponent that the cavalry model is in base contact with.

The mount's Leadership is never used, unless a spell or special rule states otherwise.

If the rider has a missile weapon, they always use their own Ballistic Skill, rather than that of their mount.

When attacking a Cavalry model, always use the highest Weapon Skill, Toughness and Wounds value from either the rider or the mount.

If the rider and the mount both have armour saves or invulnerable saves these may be combined as normal.

Any equipment or magic items the model might otherwise have only apply to the rider, not the mount (unless specified).

Unless specified, any effect that would modify the model's characteristics or their dice rolls affect both the rider and mount.

In some cases, you may find Cavalry models that do not have a split profile. The model counts as mounted for the purpose of using certain weapons, as described in the Weapons and Armour chapter.

**Ranks**

A unit of Cavalry is required to be five or more models wide in order to have a complete rank.

**Supporting Attacks**

A Cavalry model can make one supporting attack from the rider. Mounts are not allowed to make supporting attacks. Cavalry without a split profile can make up to one supporting attack.

**Special Rules**

Cavalry are subject to the following special rules:

Any special rules listed for Cavalry units only apply to the rider, unless they specifically mention the mount. There are, however, a few exceptions. If either the rider or the mount has one of the following special rules, then the whole model has it:

• Always Strikes Last
• Ambushers
• Berserk Rage (see Frenzy)
• Ethereal
• Fast Cavalry
• Fear
• Fly (*)
• Immunity (*)
• Regeneration (*)
• Scouts
• Stupidity
• Stubborn
• Terror
• Vanguard

**Terrain**

Cavalry have to take Dangerous Terrain tests if they march, charge, flee or pursue over anything other than open ground or hills – see Battlefield Terrain for more details.

**Unit Strength**

Cavalry have a Unit Strength of 2.

**Line of Sight**

Cavalry have a Line of Sight value of 2.`,

    "Monstrous Cavalry":
`All the Cavalry rules apply to Monstrous Cavalry. In addition, the following rules apply:

**Ranks**

A unit of Monstrous Cavalry is required to be three or more models wide in order to have a complete rank. In addition, their fighting rank is three models rather than five.

**Supporting Attacks**

A Monstrous Cavalry model can make one supporting attack from the rider. Mounts are not allowed to make supporting attacks. Monstrous Cavalry without a split profile can make up to three supporting attacks.

**Special Rules**

Monstrous Cavalry are subject to the following special rules:

• Fear

**Unit Strength**

Monstrous Cavalry have a Unit Strength of 3.

**Line of Sight**

Monstrous Cavalry have a Line of Sight value of 3.`,

    "Swarms":
`The following rules apply to Swarms:

**Ranks**

A unit of Swarms is required to be three or more models wide in order to have a complete rank.

In addition, their fighting rank is three models rather than five.

**Supporting Attacks**

A Swarm model may make up to five supporting attacks.

**Special Rules**

Swarms are subject to the following special rules:

• Expendable
• Independent
• Unstable
• Vanguard

Any Swarm base that is hit by a template attack suffers Multiple Wounds (D6) rather than 1.

**Unit Strength**

Swarms have a Unit Strength of 3.

**Line of Sight**

Swarms have a Line of Sight value of 0.`,

    "War Beasts":
`The following rules apply to War Beasts:

**Ranks**

A unit of War Beasts is required to be five or more models wide in order to have a complete rank.

**Supporting Attacks**

A War Beast model may make up to one supporting attack.

**Special Rules**

War Beasts are subject to the following special rules:

• Expendable
• Independent
• Vanguard

**Character Mount**

Some characters can ride War Beasts, in which case the model uses the rules for Cavalry.

**Unit Strength**

War Beasts have a Unit Strength of 1.

**Line of Sight**

War Beasts have a Line of Sight value of 1.`,

    "Monstrous Beasts":
`The following rules apply to Monstrous Beasts:

**Ranks**

A unit of Monstrous Beasts is required to be three or more models wide in order to have a complete rank. In addition, their fighting rank is three models rather than five.

**Supporting Attacks**

A Monstrous Beast model may make up to three supporting attacks.

**Special Rules**

Monstrous Beasts are subject to the following special rules:

• Fear
• Independent

**Character Mount**

Some characters can ride Monstrous Beasts, in which case the model uses the rules for Monstrous Cavalry.

**Unit Strength**

Monstrous Beasts have a Unit Strength of 2.

**Line of Sight**

Monstrous Beasts have a Line of Sight value of 2.`,

    "Monstrous Creatures":
`The following rules apply to Monstrous Creatures:

**Special Rules**

Monstrous Creatures are subject to the following special rules:

• Independent
• Stomp (D3)
• Terror

**Character Mount**

Some characters can ride Monstrous Creatures. If a character has a ridden Monstrous Creature, the whole model is treated as having the troop type Monstrous Creature and thus follows all the rules for both characters and Monstrous Creature models including the Split Profile rules for Cavalry. A character on a ridden Monstrous Creature cannot join other units.

**Unit Strength**

Monstrous Creatures have a Unit Strength of 4. Ridden Monstrous Creatures add the number of riders to their Unit Strength.

**Line of Sight**

Monstrous Creatures have a Line of Sight value of 3. Ridden Monstrous Creatures have a Line of Sight value of 4.`,

    "Monsters":
`The following rules apply to Monsters:

**Special Rules**

Monsters are subject to the following special rules:

• Independent
• Stomp (D6)
• Terror

**Split Profile**

Ridden Monsters follow all the Split Profile rules for Cavalry. The riders can shoot and cast magic missiles in 360° around them, rather than only firing at targets within their front arc. However; any artillery weapons can only fire in the model's forward arc as normal, unless specified. Any crew member that chooses to fire an artillery weapon cannot fire their own weapon in the same turn.

**Armour Saves**

Many Monsters have an armour save detailed in their army list entry, which is combined with any armour the riders might have.

**Character Mount**

Some Characters can ride Monsters. If a character has a ridden Monster, the whole model is treated as having the troop type Monster and thus follows all the rules for both characters and Monster models including the Split Profile rules above. A character on a ridden Monster cannot join other units.

If the Monster includes any riders in addition to the character, their armour saves are ignored when calculating the overall armour save of the model – only the character's own armour save is used.

**Unit Strength**

Monsters have a Unit Strength of double their original starting number of Wounds. Ridden Monsters add the number of riders to their Unit Strength.

**Line of Sight**

Monsters have a Line of Sight value of 5.`,

    "Chariots":
`The following rules apply to Chariots:

**Split Profile**

All the Split Profile rules for Cavalry rules apply to Chariots. In addition, the following rules apply:

When moving, the chariot model always uses its own Movement characteristic. However, it may not pivot on the spot like other lone models without Reforming.

Unlike cavalry, chariot mounts can only fight enemies to the front.

The riders can shoot and cast magic missiles in 360° around them, rather than only firing at targets within their front arc. However; any artillery weapons can only fire in the model's forward arc as normal, unless specified. Any crew member that chooses to fire an artillery weapon cannot fire their own weapon in the same turn.

**Armour Saves**

Many chariots have an armour save detailed in their army list entry, which is combined with any armour the crew might have.

**Character Mount**

Some characters can ride chariots. If a character has taken a chariot as a mount, the whole model is treated as having the troop type 'Chariot' and follows all the rules for both characters and chariot models. If the chariot includes any crew in addition to the character, their armour saves are ignored when calculating the overall armour save of the model – only the character's own armour save is used.

**Ranks**

A unit of Chariots is required to be three or more models wide in order to have a complete rank. In addition, their fighting rank is three models rather than five.

**Supporting Attacks**

Chariots cannot make supporting attacks. However, Chariots in the second rank add +D3 Impact Hits to the chariots in the first rank.

**Special Rules**

Chariots are subject to the following special rules:

• Impact Hits (D6)

Some chariots are equipped with scythes which add +1 Impact Hits. This will be specified in their entry.

Just as with cavalry, we assume that special rules that apply to the mounts do not normally also apply to the chariot or its crew, and vice versa. Remember though that there are exceptions, as detailed under the rules for cavalry.

**Terrain**

Chariots have to take Dangerous Terrain tests if they march, charge, flee or pursue over anything other than open ground or hills – see Battlefield Terrain for more details.

**Unit Strength**

Chariots have a Unit Strength equal to their starting number of Wounds (unless specified) and add the number of additional crew and/or mounts purchased to their Unit Strength.

**Line of Sight**

Chariots have a Line of Sight value of 2.`,

    "Shrines":
`The following rules apply to Shrines:

**Split Profile**

All the Split Profile rules for Cavalry rules apply to Shrines. In addition, the following rules apply:

Unlike most other units, a shrine may join other units of Infantry (except Skirmishers) following the rules for Characters and Units in the characters chapter. However, they may choose in which rank they wish to be placed, rather than being required to being in the front rank.

When moving, the shrine model uses its own Movement characteristic.

The riders can shoot and cast magic missiles in 360° around them, rather than only firing at targets within their front arc.

**Armour Saves**

Some shrines have an armour save detailed in their army list entry, which is combined with any armour the crew might have.

**Character Mount**

Some characters can be mounted upon shrines. If a character has taken a shrine as a mount, the whole model is treated as having the troop type 'Shrine' and follows all the rules for both characters and Shrine models. If the Shrine includes any crew in addition to the character, their armour saves are ignored when calculating the overall armour save of the model – only the character's own armour save is used.

**Terrain**

Shrines have to take Dangerous Terrain tests if they march, charge, flee or pursue over anything other than open ground or hills.

**Unit Strength**

Shrines have a Unit Strength equal to their starting number of Wounds.

**Line of Sight**

Shrines have a Line of Sight value of 1.`,

    "War Machines":
`The following rules apply to War Machines:

**Special Rules**

War Machines are subject to the following special rules:

• Cumbersome
• Move or Fire

Unless specified, any special rules a war machine might have apply to both the war machine and the crew. For further information on war machines, see the War Machines chapter.

**Unit Strength**

War machines have a Unit Strength equal to their current number of crew.

**Line of Sight**

War machines have a Line of Sight value of 1.

**War Machines (chapter, pp.77-78)**

War machine models that do not have bases do not use the usual convention of measuring to the model's base. When measuring to and from the war machine, measure to or from the body of the machine, by which we mean the central part of the chassis or the weapon itself.

**Split Profile**

War machines have two profiles, one for the war machine itself, and one for the crew.

You always use the Movement, Weapon Skill, Ballistic Skill, Strength, Wounds, Initiative, Attacks and Leadership of the crew. The Toughness of the war machine is used against ranged attacks and the majority Toughness of the crew is used against close combat attacks. The crew's armour save (if any) is used against both ranged and close combat attacks. Once all the crew are slain, the war machine is removed as a casualty.

Any Characteristic tests are resolved against the characteristics value of the crew.

**The Crew**

A war machine unit comprises the machine itself, plus its crew. As the crew aren't really a combat unit, per se, we ignore them for most gaming purposes, treating the war machine itself as the extent of the unit. Once all the crew have been removed, the war machine itself is removed from play. Similarly, if the war machine is removed as a casualty, all remaining crew are also removed. All crew should be placed within 1" of the war machine.

The crew cannot be charged, attacked or otherwise affected separately from their war machine – if they are found to be blocking movement or line of sight, the controlling player simply alters their position, just as you would for any other battlefield marker or counter.

**Movement**

The war machine can move using the rules for lone models. Use the crew's Movement characteristic to determine how far the war machine can move. Remember that all distances are measured from the war machine model itself – move the war machine and then place the crew within 1" of it.

War machines can never charge or march. If charged, a war machine can only choose to Hold. If forced to flee (because of a failed Break test for example) the war machine is destroyed.

War machines treat all terrain other than open ground and hills as Impassable Terrain. That said, a war machine is permitted to deploy in a building or terrain, but if it does, it cannot move during the game except to pivot on the spot.

**Charging a War Machine**

Even though some war machines do not have bases, units charging a war machine must still attempt to 'close the door' to align to the centre of the war machine's body.

**Shooting at War Machines**

When shooting at a war machine (including spells and template attacks), resolve the attack as normal, using the Toughness value of the war machine. The crew's armour save is still used to attempt to prevent any wounds inflicted.

In case the crew of the war machine is made up of models with different profiles, such as a character or other unique crew model; allocate the hits between the crew as you would for shooting at characters in a unit (see the Characters and Units part of the characters chapter).

**Shooting with War Machines**

When firing a war machine's weapon, ranges are measured from the muzzle of the gun (in the case of a cannon, volley gun or similar) or the crossbar (in the case of a stone thrower or similar catapult). If your war machine is particularly unusual and does not have any of these features, you should choose a suitable point from which you will measure all your shooting attacks, so long as you are consistent.

Line of sight is always taken from the chosen firing point (i.e. its muzzle or crossbar, in the same way as for its range). Unlike other lone models, pivoting the war machine during the Movement phase counts as moving for war machines, and thus they cannot fire in turns they do so. Before you fire the war machine, pivot it to face your chosen target in the Shooting phase so the war machine faces it directly in a straight line – note that the target must be within the war machine's forward arc as normal.

For war machine weapons that require Ballistic Skill, use the highest Ballistic Skill amongst the crew to resolve the shot.

**War Machines in Close Combat**

Enemies charging a War Machine lose all charge bonuses (including bonus from special rules).

At the start of the Close Combat phase, before any blows are struck, the player whose unit(s) are attacking the war machine must choose models worth up to Unit Strength 10 who will fight in the combat. This is regardless of the number of units that are fighting the war machine. Note that you may always allocate a minimum of one model to fight, regardless of their actual Unit Size.

All models chosen for the fight are considered to be in base contact with the war machine. Models that are in base contact with other enemies cannot be chosen to attack the war machine. If a war machine has crew with two or more different profiles, you must choose how you wish you allocate your attacks against them.

The combat is otherwise resolved normally. In particular, casualties are taken from the 'back' of the unit as normal. All surviving crew models fight as normal using their Weapon Skill, Strength, Initiative and Attacks. Enemy models strike against the crew normally, resolving their attacks against the crew's Weapon Skill and Toughness. The crew can then take any saves they might have.

A war machine does not have any flanks or a rear for the purposes of combat results. If a war machine manages to win its combat, it is not allowed to pursue and restrains pursuit automatically. The crew always hold their ground. If the war machine loses the combat and fails its Break test it is destroyed.

**War Machines and Leadership**

If a war machine fails a Panic or Terror test, it does not flee, but it cannot shoot in their next Shooting phase. However, this does not prevent the crew clearing various misfire results.`
  };
})();
