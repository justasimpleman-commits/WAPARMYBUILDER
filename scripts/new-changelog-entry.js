#!/usr/bin/env node
/* Insert a dated skeleton entry at the top of CHANGELOG.md for a version, unless
   one already exists. Used by build/release.command before you fill in the notes.
   Usage: node scripts/new-changelog-entry.js 1.5.1 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const v = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(v || "")) { console.error("usage: node scripts/new-changelog-entry.js X.Y.Z"); process.exit(1); }

const p = path.join(ROOT, "CHANGELOG.md");
let s = fs.readFileSync(p, "utf8");
if (new RegExp("^##\\s*\\[" + v.replace(/\./g, "\\.") + "\\]", "m").test(s)) {
  console.log(`CHANGELOG.md already has an entry for ${v} — leaving it as is.`);
  process.exit(0);
}
const today = new Date().toISOString().slice(0, 10);
const entry = `## [${v}] — ${today}\n\n### Added\n- \n\n### Changed\n- \n\n### Fixed\n- \n\n`;
const m = /^##\s*\[/m.exec(s);
if (m) s = s.slice(0, m.index) + entry + s.slice(m.index);
else s = s.replace(/\s*$/, "\n\n") + entry;
fs.writeFileSync(p, s);
console.log(`Inserted a skeleton CHANGELOG.md entry for ${v} (${today}). Fill in the notes.`);
