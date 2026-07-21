#!/usr/bin/env node
/* Set the app version across every package.json that a build reads, so the version
   shows up in the installer output filenames (electron-builder stamps ${version}).
   Usage:  node scripts/set-version.js 1.5.0
   Project versioning: first number reserved; a "major" change (this project's term)
   bumps the MIDDLE number (X.Y.0), a "minor" change bumps the LAST number (X.Y.Z). */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const TARGETS = ["package.json", "mac-installer-build/package.json", "windows-installer-build/package.json"];

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
// also the in-app version badge (APP_VERSION const in index.html)
{
  const p = path.join(ROOT, "index.html");
  const before = fs.readFileSync(p, "utf8");
  const after = before.replace(/(APP_VERSION\s*=\s*")\d+\.\d+\.\d+(")/, `$1${v}$2`);
  if (after !== before) { fs.writeFileSync(p, after); changed++; console.log(`  ✓ index.html APP_VERSION → ${v}`); }
  else console.log(`  · index.html APP_VERSION unchanged`);
}
console.log(`Set version to ${v} in ${changed} file(s). Now run: node scripts/sync-builds.js`);
