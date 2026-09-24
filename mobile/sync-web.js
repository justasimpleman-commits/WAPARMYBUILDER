#!/usr/bin/env node
/*
 * sync-web.js — copy the web app into mobile/www/ for the Capacitor build.
 *
 * The mobile build reuses the EXACT same page as the web app (one source of truth,
 * per CLAUDE.md). Run this before every Capacitor build so the phone app matches.
 *
 *   node mobile/sync-web.js
 *
 * Layout it produces (mirrors the project root so index.html's relative paths
 * resolve unchanged):
 *
 *   www/index.html      (copied from ../index.html — already references mobile-init.js)
 *   www/mobile-init.js  (copied from ../mobile-init.js — ONE shared source of truth)
 *   www/css/ www/js/ www/data/   (every .css / .js file, mirrored; stale files removed)
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..");        // project root
const DST = path.resolve(__dirname, "www");        // capacitor web dir
const DIRS = ["css", "js", "data"];

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

// css/, js/, data/ -> www/<dir>/ (files no longer in the source are removed)
for (const dir of DIRS) {
  const from = path.join(SRC, dir), to = path.join(DST, dir);
  fs.mkdirSync(to, { recursive: true });
  const files = fs.readdirSync(from).filter(f => /\.(js|css)$/.test(f));
  for (const f of fs.readdirSync(to)) if (!files.includes(f)) fs.unlinkSync(path.join(to, f));
  for (const f of files) copy(path.join(from, f), path.join(to, f));
}

// mobile-init.js -> www/mobile-init.js (self-gates on viewport; always active under Capacitor)
copy(path.join(SRC, "mobile-init.js"), path.join(DST, "mobile-init.js"));

// index.html -> www/index.html, injecting the mobile script once if it is missing.
const idxSrc = path.join(SRC, "index.html");
if (fs.existsSync(idxSrc)) {
  let html = fs.readFileSync(idxSrc, "utf8");
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

console.log(`sync-web: wrote ${copied} files into www/ (index.html, mobile-init.js, ${DIRS.join("/, ")}/)`);
