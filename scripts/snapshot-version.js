#!/usr/bin/env node
/* Snapshot the current app source into releases/<version>/ so a later changelog can
   diff "previous version vs new version" without git.
   Usage: node scripts/snapshot-version.js [version]   (defaults to package.json version)
   Snapshots the behaviour-defining source: index.html, mobile-init.js, css/, js/, data/. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const v = process.argv[2] || require(path.join(ROOT, "package.json")).version;
if (!/^\d+\.\d+\.\d+$/.test(v)) { console.error("bad version: " + v); process.exit(1); }

const dst = path.join(ROOT, "releases", v);
let n = 0;
["index.html", "mobile-init.js"].forEach(f => {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) { fs.mkdirSync(dst, { recursive: true }); fs.copyFileSync(src, path.join(dst, f)); n++; }
});
["css", "js", "data"].forEach(dir => {
  const from = path.join(ROOT, dir); if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.join(dst, dir), { recursive: true });
  fs.readdirSync(from).filter(f => /\.(js|css)$/.test(f)).forEach(f => {
    fs.copyFileSync(path.join(from, f), path.join(dst, dir, f)); n++;
  });
});
console.log(`Snapshotted ${n} source files into releases/${v}/`);
