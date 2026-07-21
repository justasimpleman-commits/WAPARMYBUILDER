#!/usr/bin/env node
/* Show what changed between two version snapshots (for writing the changelog).
   Usage:
     node scripts/diff-versions.js               # newest two snapshots
     node scripts/diff-versions.js 1.5.0 1.6.0   # explicit
   Prints a unified diff of releases/<prev> vs releases/<new>. */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const relDir = path.join(ROOT, "releases");
const vers = fs.existsSync(relDir) ? fs.readdirSync(relDir).filter(d => /^\d+\.\d+\.\d+$/.test(d)) : [];
vers.sort((a, b) => { const A = a.split(".").map(Number), B = b.split(".").map(Number); return A[0] - B[0] || A[1] - B[1] || A[2] - B[2]; });
let prev = process.argv[2], cur = process.argv[3];
if (!cur) cur = vers[vers.length - 1];
if (!prev) prev = vers[vers.length - 2];
if (!prev || !cur) { console.error("Need two version snapshots to diff. Found: " + (vers.join(", ") || "none") + "\nRun a release first so releases/ has snapshots."); process.exit(1); }
console.log(`# Source changes ${prev} -> ${cur}\n`);
try {
  const out = execSync(`diff -ru "releases/${prev}" "releases/${cur}"`, { cwd: ROOT, maxBuffer: 1e8 }).toString();
  console.log(out || "(no differences)");
} catch (e) { console.log(e.stdout ? e.stdout.toString() : "(diff reported changes but produced no output)"); }
