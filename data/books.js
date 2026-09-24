/* Army-book registry — the ONE list of bundled books.
   The page loads only this file up front; a book's data file is fetched (plain
   <script> tag, works from file://) the first time that army is chosen. The Army
   dropdown, the test harness and the mobile build all read this list, so adding a
   book = write data/<id>.js + add one line here. `name` must match the book's own
   `name` field (the harness checks it). */
window.BOOK_INDEX = [
  { id: "chaos-dwarfs",     name: "Chaos Dwarfs",     file: "data/chaos-dwarfs.js" },
  { id: "grand-cathay",     name: "Grand Cathay",     file: "data/grand-cathay.js" },
  { id: "daemons-of-chaos", name: "Daemons of Chaos", file: "data/daemons-of-chaos.js" },
  { id: "beastmen",         name: "Beastmen",         file: "data/beastmen.js" },
  { id: "ogre-kingdoms",    name: "Ogre Kingdoms",    file: "data/ogre-kingdoms.js" },
  { id: "orcs-and-goblins", name: "Orcs & Goblins",   file: "data/orcs-and-goblins.js" },
  { id: "skaven",           name: "Skaven",           file: "data/skaven.js" },
  { id: "high-elves",       name: "High Elves",       file: "data/high-elves.js" },
  { id: "dark-elves",       name: "Dark Elves",       file: "data/dark-elves.js" },
  { id: "tomb-kings",       name: "Tomb Kings",       file: "data/tomb-kings.js" },
  { id: "vampire-counts",   name: "Vampire Counts",   file: "data/vampire-counts.js" },
  { id: "bretonnia",        name: "Bretonnia",        file: "data/bretonnia.js" },
  { id: "wood-elves",       name: "Wood Elves",       file: "data/wood-elves.js" },
  { id: "dwarfs",           name: "Dwarfs",           file: "data/dwarfs.js" },
  { id: "lizardmen",        name: "Lizardmen",        file: "data/lizardmen.js" },
  { id: "estalia",          name: "Estalia",          file: "data/estalia.js" }
];
