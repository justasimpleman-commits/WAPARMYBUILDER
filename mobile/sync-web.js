#!/usr/bin/env node
/*
 * sync-web.js — copy the desktop app's web assets into mobile/www/.
 *
 * The mobile build reuses the EXACT same index.html + data files as the
 * Electron desktop app (one source of truth, per CLAUDE.md). Run this before
 * every Capacitor build so the phone app matches the desktop app.
 *
 *   node sync-web.js
 *
 * Layout it produces (mirrors the desktop project so index.html's relative
 * "data/..." <script src> paths resolve unchanged):
 *
 *   www/index.html      (copied from ../index.html — already references mobile-init.js)
 *   www/data/*.js       (copied from ../data/*.js)
 *   www/mobile-init.js  (copied from ../mobile-init.js — ONE shared source of truth)
 *
 * main.js / preload.js (Electron-only) are intentionally NOT copied — the page
 * feature-detects window.armyAPI and falls back to IndexedDB in the WebView.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..");        // desktop project root
const DST = path.resolve(__dirname, "www");        // capacitor web dir

// Data files the page loads via <script src="data/..."> (mirrors index.html).
const DATA_FILES = [
  "lores-common.js",
  "rules-common.js",
  "special-rules-common.js",
  "common-items.js",
  "chaos-dwarfs.js",
  "grand-cathay.js",
  "daemons-of-chaos.js",
  "beastmen.js",
  "ogre-kingdoms.js",
  "orcs-and-goblins.js",
  "skaven.js",
  "high-elves.js",
  "dark-elves.js",
  "tomb-kings.js",
  "vampire-counts.js",
  "bretonnia.js",
  "wood-elves.js",
  "dwarfs.js",
];

fs.mkdirSync(path.join(DST, "data"), { recursive: true });

let copied = 0;
function copy(from, to) {
  if (!fs.existsSync(from)) {
    console.error("  ! missing source: " + path.relative(SRC, from));
    process.exitCode = 1;
    return;
  }
  fs.copyFileSync(from, to);
  copied++;
}

// data files -> www/data/
for (const f of DATA_FILES) copy(path.join(SRC, "data", f), path.join(DST, "data", f));

// mobile-init.js -> www/mobile-init.js (single shared source; self-gates on
// viewport, and always activates under Capacitor).
copy(path.join(SRC, "mobile-init.js"), path.join(DST, "mobile-init.js"));

// index.html -> www/index.html, injecting the mobile-only script once.
const idxSrc = path.join(SRC, "index.html");
if (fs.existsSync(idxSrc)) {
  let html = fs.readFileSync(idxSrc, "utf8");
  // Look for the actual <script src="mobile-init.js"> tag — NOT a bare substring,
  // so an unrelated mention of the filename (e.g. in a CSS comment) can't trick
  // us into skipping the injection.
  if (!/<script[^>]+src=["']mobile-init\.js["']/.test(html)) {
    const tag = '<script src="mobile-init.js"></script>\n</body>';
    if (html.includes("</body>")) html = html.replace("</body>", tag);
    else html += "\n" + '<script src="mobile-init.js"></script>\n';
  }
  fs.writeFileSync(path.join(DST, "index.html"), html, "utf8");
  copied++;
} else {
  console.error("  ! missing source: index.html");
  process.exitCode = 1;
}

console.log(`sync-web: wrote ${copied}/${DATA_FILES.length + 2} files into www/ (data/ + index.html + mobile-init.js)`);
