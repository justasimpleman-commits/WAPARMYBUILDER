# CLAUDE.md — Warhammer Army Builder

A **static web app** for Warhammer 9th Edition 3.0 (Mathias Eliasson's unofficial
ruleset), hosted on GitHub Pages. It lets a player assemble an army, calculates
points, enforces the list-building rules, saves/loads armies (browser library or
`.json` files), shares an army as a link, and exports the list. There is no build
step: open `index.html` (works from `file://`) or serve the folder. On a phone the
same page switches to a drawer layout (`mobile-init.js`). (It used to be an Electron
desktop app with a Capacitor Android build; both were removed — there is no
`main.js`/`preload.js`/`mobile/` any more.)

Multiple army books are bundled (Chaos Dwarfs, Grand Cathay, Daemons of Chaos,
Beastmen, Ogre Kingdoms, Orcs & Goblins, Skaven, High Elves, Dark Elves, Tomb
Kings, Vampire Counts, Bretonnia, Wood Elves, Dwarfs, Lizardmen, Estalia) and chosen
from the **Army** dropdown in the header;
switching armies clears the roster (no confirm — it is an undo step). Each army nominates exactly one character as its **Army General** (radio
on each character entry; any character is eligible, exactly one required —
enforced in validation, shown with ★ in the summary and `[General]` in export).

## Architecture: engine + data

The app is a generic **engine** driven by **data files**. Adding another army
book means writing a new data file and adding one line to `data/books.js`; for books that
fit the existing systems the engine never needs to change. (Genuinely new mechanics
get a *generic, data-driven* hook rather than per-book logic — e.g. Vampiric
Powers, Virtues, the Undead `requireWizardLore` validator, and the High Elf
Elven-Honour `cond` system (an honour shown-but-disabled when the chosen mount
forbids it) plus choice-gated mounts (`requiresChoice` on a mount choice — a mount
that only unlocks under its honour) are engine features toggled by data fields, see
SCHEMA.md. Don't key engine logic on a book's option ids or unit ids.)

Repository layout: `index.html`, `mobile-init.js` and `package.json` at the
**root**; styles in **`css/`**, the engine in **`js/`**, the data layer in
**`data/`**, docs in **`docs/`**, dev/test scripts in **`scripts/`**, release
script in **`build/`**.

- **`index.html`** — markup only (header, three columns, the two modal shells),
  `css/app.css`, and plain `<script src>` tags (work from `file://`, no CORS, no
  bundler): the common data files, `data/books.js`, then the engine files in order.
- **`js/`** — the engine, split by concern. Classic scripts share one global scope,
  so the files see each other's top-level functions/`let`s exactly like the old
  single inline script did; only start-up code (in `app.js`, loaded last) runs at
  load time.
  - `core.js` — the book registry handles + `loadBook`, global state (`state`,
    `generalUid`, `uidc`, `D`), `blankEntry`/`addUnit`/`removeEntry`, and the
    mutation path `update()` with undo/redo and dirty tracking (see "Mutations,
    undo & rendering").
  - `engine.js` — pure rules, no DOM: points, budgets, wizard levels, items, runes,
    option gating (`optionActive`), `reconcileEntry`, validation (`entryErrors`,
    `collectIssues`), `describe`/`entryLoadout`, `migrateEntry`.
  - `rules.js` — rule/equipment lookup (`ruleDef`, `ruleExact`, `equipDef`) and
    `tokensToHTML`.
  - `modals.js` — the modal shells, `openItemPicker`, the rune picker, unit/mount
    detail popups, `toast`.
  - `roster.js` — `render()`, catalogue, bars, entry cards, options, magic, spells,
    summary, validation panel.
  - `storage.js` — library (IndexedDB/localStorage), `.json` files, autosave draft,
    share links, text export.
  - `app.js` — `switchArmy`, header controls, event wiring, `start()`.
- **`data/books.js`** — `window.BOOK_INDEX`, the **only list of books**
  (`{id, name, file}`), in dropdown order. The page loads nothing but this up
  front; `loadBook(id)` injects the book's `<script>` the first time that army is
  chosen, so a visitor downloads one book, not all sixteen. All books register into
  `window.ARMY_BOOKS` keyed by `id`; the engine selects the active one as `D`
  (default `chaos-dwarfs`) and `switchArmy(id)` swaps it (a promise; synchronous
  when the book is already loaded). The test harness and `scripts/sweep.js` also
  read this registry.
- **`data/chaos-dwarfs.js`**, **`data/grand-cathay.js`**, **`data/daemons-of-chaos.js`**,
  **`data/beastmen.js`**, **`data/ogre-kingdoms.js`**, **`data/orcs-and-goblins.js`**,
  **`data/skaven.js`**, **`data/high-elves.js`**, **`data/dark-elves.js`**, **`data/tomb-kings.js`**,
  **`data/vampire-counts.js`**, **`data/bretonnia.js`**, **`data/wood-elves.js`**,
  **`data/dwarfs.js`**, **`data/lizardmen.js`**, **`data/estalia.js`** — pure
  data. Each does
  `(window.ARMY_BOOKS = window.ARMY_BOOKS || {})["<id>"] = {…}` with an `id` field.
  The three Undead/Bretonnia books exercise the engine's army-specific systems:
  Vampiric Powers + Bloodlines (VC), Virtues with duplicate-cost escalation
  (Bretonnia), and the `requireWizardLore` Undead validators (VC Necromancy /
  TK Nehekhara Hierophant). Wood Elves add **Forest Spites** (a `multiPickCategories`
  magic-item category) and the generic `magicCatsOnly` unit field (tree characters may
  spend their budget on Spites only). Lizardmen use the same pair of hooks twice:
  **Blessed Spawnings** and **Disciplines of the Old Ones** are both
  `multiPickCategories`, and `magicCatsOnly` keeps each model on exactly one of them
  (the Slann sees Disciplines, everyone else sees Blessed Spawnings) — the engine
  stores all multi-picks in the single `entry.gifts` array, so a model must never see
  two multi-pick categories at once. See SCHEMA.md → "Army-specific systems".
- **`rules-common.js`** — `window.COMMON_RULES`: rulebook equipment & command
  rules transcribed **verbatim** from the 9th Ed 3.0 rulebook (Close Combat
  Weapons / Missile Weapons / Armour pp.79-81; Command p.87) — hand/great/paired
  weapons, spear, halberd (Polearm), pike, lances, light/medium/heavy armour,
  shield, buckler, barding, the missile weapons (incl. Greatbow, Blowpipe),
  Leader/Musician/Standard Bearer. A plain "bow" in the army books is the
  rulebook's Longbow, so `bow` maps onto the Longbow entry (no invented stats).
  Universal special rules (Poisoned Attacks, Armour Piercing, …) are NOT
  duplicated here — they live in COMMON_SPECIAL_RULES. The clickable Equipment
  line on the unit-detail screen resolves each token via `equipDef`: an exact
  glossary / COMMON_SPECIAL_RULES / COMMON_RULES hit, else an **exact-phrase**
  match in `EQUIP_ALIASES` (e.g. "two hand weapons" → Additional Hand Weapons).
  It deliberately does NOT substring-match, so a named magic item embedded in an
  `eq` line ("Bow of Avelorn", "The Lion's Shield", "Star Lance", "Morning Star
  of Fracasse") is not mis-linked to a generic weapon/armour — such items are
  only clickable when the book defines them in its own `glossary`. The per-option
  `i` buttons (controlled labels) use `ruleDef`, which keeps the looser
  `EQUIP_REGEX` substring matching plus a glossary-substring fallback.
  `tokensToHTML(str,resolver)` builds both the Equipment and Special-rules
  clickable lines.
- **`special-rules-common.js`** — `window.COMMON_SPECIAL_RULES`: the core
  rulebook's *universal special rules* glossary (Fear, Terror, Frenzy, Hatred,
  Stubborn, Unbreakable, Fast Cavalry, Vanguard, Skirmishers, Fly, Magic
  Resistance, Impact Hits, Immunity, …) transcribed **verbatim** from the 9th Ed
  3.0 rulebook (pp.57-69) — full rule text, not summaries; bold sub-headers from
  the book are written `**like this**` and `ruleTextHTML` renders paragraphs +
  bold. These are printed on unit profiles in every book but defined only
  in the core rules; the engine renders each recognised rule name in a unit's
  Special-rules line as a **clickable word** (`rulesToHTML` + `ruleExact`) that
  opens its definition. A profile parenthetical (e.g. `Fly (8)`, `Immunity
  (Psychology)`) is stripped to the base name for lookup but kept in the display.
- **`common-items.js`** — `window.COMMON_ITEM_DESC`: descriptions of the common
  (core-rulebook) magic items, shared across all books so they aren't duplicated
  per file. The engine resolves an item's text via `itemDescOf()`: the book's own
  `itemDesc` first, then this shared map.
- **`lores-common.js`** — the 8 standard Lores of Magic (Fire, Beasts, Metal,
  Light, Life, Heavens, Shadow, Death) as `window.COMMON_LORES`. The engine resolves
  a wizard's lore via `loreData()`: a book's own `spellLores` wins, else COMMON_LORES.
  Each book still restricts which lores its wizards may pick via the unit `lores:[…]`
  list (e.g. Chaos Dwarfs never list Life). These are the single source of truth for points, options,
  caps, magic items, profiles, rules, item descriptions and spell lores. Saved
  armies are namespaced by `id`; loading a file for another bundled book switches
  to it.
- **`docs/SCHEMA.md`** — documents every field in the data file. Read it before
  editing data or adding a book.
- **`docs/DATA-MAPPING.md`** — the extraction playbook: maps each section of a source
  army-book PDF to where it goes in the data files, with the pdftotext technique,
  the clickable-token rules, and verification steps. **Always read it before any
  data work** — extracting, auditing, or editing any `data/` file or adding a book.
  It is the companion to SCHEMA.md (which is the field reference): SCHEMA.md says
  what a field *means*, DATA-MAPPING.md says what to pull from the PDF and where it
  goes. Don't touch the data layer without reading it first.
- **`reference/`** — source material, not shipped in the build: the army-book and
  rulebook PDFs (`reference/Army books/`) used to audit data, plus
  `reference/Chaos-Dwarfs-Stats-and-Logic.docx`, a printable stats + logic
  reference (title page, logic section, per-unit profiles, magic-item tables).
- **`build/release.command`** — runs the tests, bumps the version and snapshots the
  source for the changelog (see `docs/RELEASING.md`). The web app itself needs no
  build — pushing to GitHub publishes it via Pages.
- **`gen-doc.js`** (in the scratch/outputs area, not the project folder) — the
  Node script that builds the .docx. It reads points/options/caps from
  `chaos-dwarfs.js`; statlines and rule text are transcribed in the script.

## Data model (see SCHEMA.md for the full reference)

- `composition` — category caps as fractions (Characters 0.35, Core min 0.25,
  Special 0.50, Rare 0.25, single-unit 0.25).
- `duplicateCaps` — Special/Rare duplicate limits by game size.
- `magicItems` / `commonMagicItems` — six categories each; `common:true` ⇒ may be
  taken in multiples (shown with `*`); `only:` restricts to a variant or keyword.
- `units.{characters,core,special,rare}` — unit entries. Key fields:
  `perModel`+`basePoints` (regiments) or flat `basePoints` (single models);
  `variants` (characters, with `points`/`wizardLevel`/`magicBudget`);
  `unitSize:[min,max]` where `max:null` means open-ended ("10+") and the whole
  field `null` means no stated size; `options:[...]`.
- Option types: `choice` (≤1), `mustChoose` (exactly 1), `toggle`, `multi`
  (`max`, or `repeatable` counter), `command` (Leader/Musician/Standard +
  `magicStandard` budget), `mount`. Cost `per:"model"` scales with count;
  `per:"flat"` (default) is added once. Command costs are fixed in the engine
  (Leader +5, Musician +5, Standard +10). A mount's own upgrades are gated with
  `requiresMount:"key"|[…]` (matched against the chosen `mount` choice's `key`):
  hidden and uncharged until that mount is selected (Bretonnia Pegasus/Royal
  Hippogryph, Chaos Dwarf Great/Bale Taurus & Lammasu).
- `unitInfo` — `{id:{profile,eq,rules}}` for the detail popup.
- `itemDesc` — `{name: effect}` for the magic-item info popup.
- `glossary` — `{rule: definition}`; in the detail popup any rule name in a
  unit's `rules` string that matches a glossary key (or a core
  COMMON_SPECIAL_RULES / COMMON_RULES name) is rendered as a clickable word that
  opens its definition.
- `spellLores` — `{lore:{attribute,spells:[{name,lvl,cast,type,range,effect}]}}`.
  `lvl:0` is the signature spell.

## Rules the engine enforces

Category caps; 25% single-unit cost limit; duplicate Special/Rare caps by game
size; special characters unique; army-wide magic-item uniqueness (common `*` items
exempt); one item per category per model; per-character magic-item budgets;
Expendable Core needs a non-Expendable Core unit; slave units ≤ Hobgoblin
Cutthroat/Archer units; exactly one Army General; **equipment access** — a magic
weapon/armour that *is* a mundane type (`requiresAccess`: heavy armour, shield, heavy
lance, longbow, gut-plate…) only for a character whose `access` list (base equipment +
buyable options) includes that type (armour tiered light⊂medium⊂heavy; items with no
mundane type are open to all). The picker shows such items disabled ("needs Shield")
and every typed item carries a type badge (`itemEquipType`); `test-engine.js` audits
every book's `access` lists against equipment/options.

**Validation is data, then view.** `collectIssues()` (engine) returns
`{errs:[{msg,uid}], warns:[…]}`; `uid` names the roster entry an issue is about
(null for army-wide ones — for a duplicate/uniqueness clash it is the last offending
entry). `renderValidation()` renders an issue with a uid as a clickable row
(`.vmsg.link`) that calls `scrollToEntry(uid)`, which unfolds that card/category
and scrolls to it (and closes the mobile drawer).

**One option gate.** `optionActive(e,u,o)` decides whether an option is live
(`requires.unit`, `noGod`, `requiresMount`, `requiresChoice`, a variant-only
`toggle`'s `only`). `entryPoints`, the entry card, `describe()` (export) and the
loadout popup all use it, so a hidden option is never charged or exported.
`reconcileEntry(e)` runs at the start of every `render()` and keeps each entry
legal: drops illegal mounts, mount/choice-gated upgrades, illegal magic items/gifts/
powers (`reconcileMagic`), a lore that is no longer offered and over-cap or
too-high spells (`reconcileSpells` — a model that stops being a wizard loses its
lore). Render functions do **not** mutate entries; put any such normalisation here.

**Unit size is clamped, not just validated.** The model stepper/input in
`renderEntry` cannot go below `unitSize[0]` or above `unitSize[1]` (open-ended max
`null` stays unbounded; no `unitSize` ⇒ min 1). Validation still flags sizes too.

**Magic items are chosen from a modal picker, not dropdowns.** Each slot shows a
**Choose…** button (or the current pick, which re-opens the list); the button
opens `openItemPicker` — a single shared modal listing the whole category with each
item's description inline. The `i` button next to a slot shows **only the chosen
item(s)** (`openChosenInfoRows`). `pickerGroups` builds the legal, grouped item
list (by God for `godSections` books, else one army group, plus Common). In the
picker, items are shown but **disabled** when unpickable: in a single-pick list,
once one item is selected the rest lock until it is deselected; in a multi-pick
list (gifts, Vampiric Powers), items costing more than the points left lock until
you free up budget. Each picker takes a `remaining(sel)` function so the headroom
reflects everything else the model has already spent. The same picker drives
per-category slots, arcane sub-slots, multi-pick gifts, Vampiric Powers, Virtues,
the BSB Magic Standard, and a unit Standard Bearer's banner.

**Arcane Items → three sub-slots.** Arcane Items render as **Relic**, **Charm**,
**Staff** slots (one pick each, max three arcane items), Wizards only. The
subtype is derived in `arcaneType(name)` from the first word of `D.itemDesc[name]`
(books open every arcane description with "Relic./Charm./Staff."), with
`ARCANE_TYPE_FALLBACK` for rulebook common items and a "Relic" default for the few
untyped ones. Picks live in `entry.magic` under keys `"Arcane Items:<Type>"`;
`migrateEntry()` upgrades older single-key saves.

Magic standards: only the BSB (no points limit, charged outside the magic-item
budget, stored in `entry.magicStd`) or a unit's Standard Bearer (within the
unit's banner budget).

**Spells.** A wizard knows its lore's **signature spell(s)** and its **lore
attribute** automatically (free, locked in the UI, excluded from the pick limit),
then chooses **`wizardLevel`** more (i.e. as many spells as its level), **plus one
per extra-spell magic item it carries** (`bonusSpells(e)` sums the `extraSpells:N`
field over the model's chosen items — `e.magic`, `e.gifts`, `e.magicStd`; the
Spell Familiar has `extraSpells:1`). So `cap = wizardLevel + bonusSpells(e)`.
`entry.spells` stores only the chosen non-signature spells and is trimmed to `cap`
(removing the granting item drops the extra pick); `knownSpells(e)` returns
signatures + chosen (used for export, alongside the attribute). A chosen spell's
**level may not exceed the wizard's level** (a level-1 wizard can only pick
level-1 spells); `renderSpells` disables higher-level spells and drops any stored
picks above the level. An item flagged `extraSignatures:N` (the Arcane Familiar,
`extraSignatures:1`) adds a **separate** picker — N signature spells chosen from
any of the eight Winds of Magic (`windSignatures()` flattens `COMMON_LORES`' lvl-0
spells), stored in `entry.sigSpells`, not counted against the wizard-level cap;
`bonusSignatures(e)` sums the field and `knownSpells` appends the picks (trimmed to
the bonus so removing the item drops them).
`wizardLevel(e,u)` = base profile/unit level, raised to a choice option's
`wizLevel` if one is selected (e.g. the Daemon Prince and greater daemons buy
their level via a `choice`, not a flat profile level), +1 if the Daemonsmith
"Wizard" upgrade is taken, +1 for the "Additional Wizard Level" option — but an
option flagged `noGod:[…]` is ignored when the model's god matches, so **Khornate
Daemons cannot become Wizards** (the Daemon Prince / Exalted Daemon `wizlvl`
upgrade is hidden and uncharged once Khorne alignment is chosen). A wizard with
level 0 shows no lore/spell picker.

**Mount profiles.** Mounts are stat/rule-heavy, so they reuse the **same picker as
magic items** (`openItemPicker`, single-select): the entry card shows a "Choose…"
`pickBtn` (just the chosen mount's name + cost — no inline statline on the card),
and clicking it opens `openMountPicker`, a thin wrapper that feeds each mount to
`openItemPicker` as an item whose `html` is the **compact unit entity**
(`mountEntityHTML`: profile table + clickable equipment + clickable special-rules
line, NOT expanded). Tick one mount and the rest lock; OK confirms, Cancel closes,
nothing ticked ⇒ no mount. `openItemPicker` renders an item's raw `html` when
present (else the escaped text desc). Tapping a rule/weapon inside opens it in the
second window above — `tokensToHTML` adds `event.stopPropagation()` so a rule
click doesn't also toggle the row. `mountProfile(label)` matches the mount name —
the label or its parenthetical creature — exactly against any `unitInfo` profile
row, so mounts that are also units reuse their stats; mounts that aren't units are
added as dedicated `unitInfo` entries (keys prefixed `mount_`). A choice may also
carry its own `prof`/`rules` (via `mountChoiceData`).

**Two option-UI patterns (consolidated).** Anything that is a *choice among
several options* — magic items, mounts, `choice`/`mustChoose`, `multi`, Vampiric
Powers, Virtues, and an auto-grouped run of upgrade toggles — uses the **modal
picker** (`openItemPicker`): a "Choose…" `pickBtn` opens a screen listing every
option with its rule text (or, for mounts, its full profile via `mountEntityHTML`)
inline, and the `i` button (`pickInfoBtn`) then shows **only the chosen** pick.
Anything that is a *single yes/no* — a lone `toggle`, a command role — stays an
inline checkbox with a single-rule `i` (`mkRuleInfoBtn`→`openRuleInfo`). Quantity
`repeatable` multis stay a `+/–` stepper.

Picker modes (all `openItemPicker`): `multi:true` (+ optional `maxPicks`) for
multi-select; `radio:true` (+ `requireOne` for `mustChoose`) for single-select
that swaps the pick directly instead of locking the alternatives. `choice`/
`mustChoose` render via `radio`; `multi` and the grouped-toggle picker via `multi`.

**Auto-grouped upgrades.** `renderOptions` collapses a contiguous run of **3+
plain add-on toggles** (`isPlainToggle`: a `toggle` with no `only`/`bsb`/`requires`/
`requiresMount`/`noGod`/`oncePerArmy`/`limitByUnit`) into ONE "Upgrades" multi-pick
picker (`renderToggleGroup`) so rule-heavy upgrade blocks (e.g. the Kolossus) read
on one screen instead of many `i` buttons. Each toggle keeps its own boolean in
`e.opts`, so points/validation/save are unchanged. Specially-gated toggles and
runs shorter than 3 stay inline checkboxes.

The info button is a round italic "i" (`.info`, via `mkRuleInfoBtn` /
`pickInfoBtn`) showing the single fixed rule or the *chosen* pick. (`mkAllInfoBtn`
/ `openOptionRules` — the old "≣" all-options list for dropdowns — remain defined
for reference but are no longer used now that the picker shows every option's
rule inline.)
`ruleDef(label)` resolves a label to a definition: the active book's `glossary`
wins, then `window.COMMON_SPECIAL_RULES` (**`special-rules-common.js`** —
universal special rules), then `window.COMMON_RULES` (**`rules-common.js`** —
rulebook weapon/armour/command rules), matched by exact name or keyword.

**Clickable special rules & equipment.** In the unit (and mount) detail popup
both the Equipment line and the Special-rules line are rendered by
`tokensToHTML(str, resolver)`: it splits on `, ; .`, and for each token calls the
resolver to decide if it is a known rule. The Special-rules line uses `ruleExact`
(strict exact-name lookup — glossary, COMMON_SPECIAL_RULES, COMMON_RULES; no regex
fallback); the Equipment line uses `equipDef` (the same exact lookup plus
`EQUIP_REGEX`, but no loose glossary-substring fallback, so free text like
"Fixed items: …" isn't mis-wrapped). Known tokens become `.ruleword` `<span>`s
that call `openRuleInfo`; unknown free text stays plain. A trailing parenthetical
(`Fly (8)`, `Natural Armour (6+)`, `light armour (Handlers)`) is stripped for the
lookup but kept in the display. Clicking a token opens its
definition in a **second, stacked window** (`openModal2`/`#modal2Bg`,
z-index 110) so the unit-detail (stats) window stays open underneath rather than
being replaced — the definitions are deliberately *not* expanded inline on the
stats card, which would make rule-heavy units unreadable.

## Conventions & gotchas

- **Data must match the source PDFs.** Statlines, points, options and item costs
  were transcribed and then audited line-by-line against the army book and
  rulebook. Don't invent values (an earlier bug fabricated unit sizes for Zealots
  and Devastators). If you change data, re-check it against the PDFs in the
  workspace.
- **Single source of truth is `chaos-dwarfs.js`.** The .docx generator reads
  points/options from it; statlines in `gen-doc.js` and `unitInfo` are duplicated
  transcriptions — keep them consistent if profiles ever change.
- Description/effect strings use **backtick** template literals (text contains
  both apostrophes and `"` inch marks).
- Paths in the workspace shell contain a space ("Army builder") — always quote.

## Mutations, undo & rendering

- **Every roster change goes through `update(fn)`** (core.js): it snapshots the
  roster, runs `fn`, calls `render()`, and — if the roster actually changed — pushes
  the old snapshot on the undo stack (cap 100) and clears redo. Event handlers are
  written `onclick=()=>update(()=>{ e.count=… })`; don't mutate state and call
  `render()` directly (that change can't be undone). View-only state (collapse
  carets, catalogue search) just calls `render()`/`renderCatalog()`.
- Snapshots are `{uidc, generalUid, state}` without each entry's `collapsed`; undo
  keeps the current fold state. Undo/redo: the ↶ ↷ header buttons, Ctrl/⌘+Z and
  Ctrl/⌘+Shift+Z / Ctrl+Y (ignored while typing in a field or with a modal open), and
  the "Undo" button on the toast after removing a unit or clearing the army
  (`removeEntry`, `clearArmy` — no confirm dialogs; undo is the safety net).
  Switching books and loading an army (file, library, shared link) are undo steps
  too, with no confirm: snapshots record the active book (`restoreSnapshot` calls
  `activateBook`), and these whole-army steps (`update(fn,{meta:true})` /
  `pushHistory(before,meta)`) also restore the save name/file, saved-state and
  limit (`saveMeta`/`restoreMeta`). Deleting a library army shows an Undo toast
  instead of a confirm.
- **Dirty tracking:** `markSaved()` records the roster + points limit as saved
  (after Save, Save to file, or any load); `isDirty()` compares. The status line shows
  "● unsaved changes", the tab title gets a "●" and `beforeunload` warns (the only
  unsaved-work prompt — loads don't ask, they are undoable).
- **`render()` is incremental.** It reconciles entries, then: the catalogue DOM is
  rebuilt only when the book, search text or collapse state changes (otherwise
  `refreshCatalog` just updates each row's badge); roster cards are cached per entry
  object with a signature (entry JSON + General flag + points) and only changed
  cards are rebuilt, then `patchChildren` moves/inserts the minimum. The cache is
  dropped when the army's make-up changes (an entry's options can depend on other
  units via `requires.unit`). Summary, bars and validation are small and redrawn.
- **Catalogue:** a search box filters units (name or character profile names, all
  categories expanded while searching). Each row's badge shows how many are in the
  army (`×2`), Special/Rare duplicates against the game-size cap (`2/3`, amber at the
  cap, red over it), and a special character already taken is greyed out with its
  **+** disabled.
- **Points limit:** free input plus a presets dropdown (1000–4000; "Custom" when the
  value isn't a preset).

## Save / load

- The library lives in **IndexedDB** (`cd-army-builder` db, `armies`
  store) via `libSave/libAll/libGet/libDelete`, with a localStorage fallback and
  legacy-localStorage read (Safari blocks localStorage on `file://`, which is why
  the old localStorage-only library silently failed). `.json` save/open use
  Blob download / file input.
- Army JSON: `{ app, version, army, name, savedAt, limit, points, uidc,
  generalUid, state }`. `applyArmy()` (async — it may need to load the book first)
  runs `migrateEntry()` on load. The storage keys keep their old `cd-`/
  `chaos-dwarfs-` names so existing saves keep loading — don't rename them.
- Autosave draft: the roster is mirrored to localStorage (debounced) and restored
  on the next visit with a Discard/Dismiss notice; the draft records whether it was
  dirty.
- **Share link** (`shareArmy`): the army is packed into the URL fragment
  `#army=<code>` — nothing is uploaded. Each entry is stored as its difference from
  `blankEntry(cat,id)` (`packEntry`/`unpackEntry`; a default entry is just
  `{c,i}`), the payload `{v,a:army,l:limit,n:name,g:generalIndex,s:[…]}` is
  deflate-raw compressed with `CompressionStream` and base64url-encoded (`z`
  prefix; `j` = plain JSON fallback). Opening such a URL (at start-up, or via
  `hashchange` in an open tab) loads the army unsaved, suggests its name for the
  first Save, and strips the fragment. Links made from `file://` only work on that
  machine; share from the hosted site. Start-up order: restored draft, then a
  shared link opened over it as an undo step (undo returns to the draft) →
  default army.

## Phone layout

`mobile-init.js` (root, loaded last by `index.html`) is the narrow-screen layout: it
activates when the viewport is ≤ 820px and **moves** (not clones) `#catalog` into a
left drawer, `.col.validation` into a right drawer and the `.actions` toolbar into a
☰ menu, so `render()` keeps filling them by id. The header controls, the
undo/redo buttons and the points total move into two compact header rows. Crossing
back to a wide window reloads the page. Anything added to the header, the action bar
or the validation panel must keep working after being moved.

## Verifying changes (no browser/GUI needed)

Syntax-check, then run the engine under a minimal DOM stub in Node. **`scripts/test-engine.js`**
(run it from the project root) implements exactly this: `global.window = global`;
a stub `document` (`getElementById`, `createElement`, `createTextNode`,
`createComment`, `addEventListener`) with elements exposing `innerHTML`,
`classList`, `appendChild`, `value`, `onclick/onchange`; it `eval`s the common
files named in `index.html` + every book in `data/books.js` (they assign into
`window.ARMY_BOOKS`), concatenates the `js/*.js` files in `index.html`'s order and
`eval`s them as one script with an appended `Object.assign(globalThis,{…})` exposing
internals (`entryPoints`, `render`, `spentMagic`, `update`, `undo`, `collectIssues`,
`packEntry`, a `state` getter, …). `location`/`history`/`addEventListener` are
stubbed so `start()` runs. It smoke-renders every book and asserts point maths,
validation, the army-specific systems, the book registry, undo/redo, dirty tracking,
option gating, share-link round-trips and catalogue search. Add new cases here when
you touch the engine. IndexedDB isn't available in Node — test the
storage fallback by stubbing `localStorage` and leaving `indexedDB` undefined.

```bash
node --check data/*.js js/*.js mobile-init.js
node scripts/test-engine.js   # DOM-stub harness (the js/ engine is eval'd inside it)
```

Always include point-math checks, validation checks, and the new feature's logic;
a good smoke test is running `render()` once per bundled book without throwing.
For UI changes, also load the page in the pre-installed Chromium (Playwright) and
check for console errors — at desktop width and at phone width (the drawer layout).
Render the .docx and view a page or two when changing the document.

## Tone / working style for this project

User prefers concise, direct answers with minimal formatting. They care about
correctness against the source books — verify, don't assume. This is a personal
hobby project, not a Webstar deliverable, so corporate branding does not apply.
