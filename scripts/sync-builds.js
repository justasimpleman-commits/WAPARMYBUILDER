#!/usr/bin/env node
/* Sync the app source (index.html, main.js, preload.js, data/*.js) from the repo
   root into every downstream build target so none ships stale code:
     - mac-installer-build/      (Electron .dmg snapshot)
     - windows-installer-build/  (Electron .exe/NSIS snapshot)
     - mobile/www/               (Capacitor / Android — via mobile/sync-web.js)
   Run from anywhere: `node scripts/sync-builds.js`. Idempotent.
   ALWAYS run this after editing index.html or any data/ file, before building. */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const APP_FILES = ["index.html", "main.js", "preload.js"];
const INSTALLER_DIRS = ["mac-installer-build", "windows-installer-build"];

function copy(src, dst) { fs.copyFileSync(src, dst); }

function syncInstaller(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) { console.log(`  · ${dir} not present — skipped`); return; }
  APP_FILES.forEach(f => copy(path.join(ROOT, f), path.join(base, f)));
  const dataDst = path.join(base, "data");
  fs.mkdirSync(dataDst, { recursive: true });
  const dataFiles = fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js"));
  dataFiles.forEach(f => copy(path.join(ROOT, "data", f), path.join(dataDst, f)));
  console.log(`  ✓ ${dir}: ${APP_FILES.length} app files + ${dataFiles.length} data files`);
}

console.log("Syncing build targets from repo root…");
INSTALLER_DIRS.forEach(syncInstaller);

// mobile has its own sync (injects mobile-init.js into index.html)
try {
  const out = execSync("node mobile/sync-web.js", { cwd: ROOT }).toString().trim();
  console.log(`  ✓ mobile/www: ${out.split("\n").pop()}`);
} catch (e) {
  console.log(`  · mobile/www: sync-web.js not run (${e.message.split("\n")[0]})`);
}
console.log("Done. Now build on the target OS (see docs/BUILDING-INSTALLERS.md).");
