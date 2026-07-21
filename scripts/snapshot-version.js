#!/usr/bin/env node
/* Snapshot the current app source into releases/<version>/ so a later changelog can
   diff "previous version vs new version" without git.
   Usage: node scripts/snapshot-version.js [version]   (defaults to package.json version)
   Snapshots the behaviour-defining source: index.html, main.js, preload.js, data/*.js. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const v = process.argv[2] || require(path.join(ROOT, "package.json")).version;
if (!/^\d+\.\d+\.\d+$/.test(v)) { console.error("bad version: " + v); process.exit(1); }

const dst = path.join(ROOT, "releases", v);
fs.mkdirSync(path.join(dst, "data"), { recursive: true });
let n = 0;
["index.html", "main.js", "preload.js"].forEach(f => {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(dst, f)); n++; }
});
fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")).forEach(f => {
  fs.copyFileSync(path.join(ROOT, "data", f), path.join(dst, "data", f)); n++;
});
console.log(`Snapshotted ${n} source files into releases/${v}/`);
