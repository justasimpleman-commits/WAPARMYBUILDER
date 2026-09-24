#!/usr/bin/env node
/* Set the app version in package.json and the in-app badge (APP_VERSION in js/core.js).
   Usage:  node scripts/set-version.js 1.5.0
   Project versioning: first number reserved; a "major" change (this project's term)
   bumps the MIDDLE number (X.Y.0), a "minor" change bumps the LAST number (X.Y.Z). */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const TARGETS = ["package.json"];

const v = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(v || "")) {
  console.error("usage: node scripts/set-version.js X.Y.Z   (e.g. 1.5.0)");
  process.exit(1);
}
let changed = 0;
TARGETS.forEach(rel => {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log(`  · ${rel} not present — skipped`); return; }
  const before = fs.readFileSync(p, "utf8");
  const after = before.replace(/("version":\s*")\d+\.\d+\.\d+(")/, `$1${v}$2`);
  if (after !== before) { fs.writeFileSync(p, after); changed++; console.log(`  ✓ ${rel} → ${v}`); }
  else console.log(`  · ${rel} unchanged (already ${v}?)`);
});
// also the in-app version badge (APP_VERSION const in js/core.js)
{
  const p = path.join(ROOT, "js", "core.js");
  const before = fs.readFileSync(p, "utf8");
  const after = before.replace(/(APP_VERSION\s*=\s*")\d+\.\d+\.\d+(")/, `$1${v}$2`);
  if (after !== before) { fs.writeFileSync(p, after); changed++; console.log(`  ✓ js/core.js APP_VERSION → ${v}`); }
  else console.log(`  · js/core.js APP_VERSION unchanged`);
}
console.log(`Set version to ${v} in ${changed} file(s). Now run: node mobile/sync-web.js`);
