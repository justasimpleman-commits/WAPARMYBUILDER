#!/bin/bash
# ============================================================================
# Build the macOS installer (.dmg) for the Warhammer Army Builder.
# Double-click this file in Finder, or run it from a terminal.
# (First double-click may need: right-click -> Open, to clear Gatekeeper.)
# Requires Node.js (https://nodejs.org). Produces dist/*.dmg.
# ============================================================================
set -e
cd "$(dirname "$0")/.."   # build script lives in build/, run from project root

echo "=== Warhammer Army Builder — macOS installer build ==="

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: Node.js / npm not found. Install Node.js LTS from https://nodejs.org and try again."
  echo "Press any key to close."; read -n 1 -s; exit 1
fi

echo "[1/3] Verifying engine + syncing build targets…"
node scripts/test-engine.js
node scripts/sync-builds.js

echo "[2/3] Installing dependencies (first run downloads Electron, ~100 MB)…"
npm install

echo "[3/3] Building the .dmg with electron-builder…"
npm run dist:mac

echo ""
echo "Done. Your installer is in the 'dist' folder:"
ls -1 dist/*.dmg 2>/dev/null || echo "  (look in the dist/ folder)"
echo ""
echo "Press any key to close."
read -n 1 -s
