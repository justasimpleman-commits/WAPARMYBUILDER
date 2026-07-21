#!/bin/bash
# ============================================================================
# One-click: create the installers for everything currently in the repo.
# Double-click in Finder (first time: right-click -> Open to clear Gatekeeper).
#
# It asks major/minor, BUMPS the version, snapshots this version's source (so the
# changelog can be diffed later), then builds the macOS .dmg AND the Android .apk.
#
# The changelog is NOT written here — after this finishes, go back to Claude and
# say "create the changelog for <new version>". Claude diffs the previous version's
# snapshot against this one and writes CHANGELOG.md + docs/CHANGELOG-<v>.docx.
#
# Requires: Node.js. For the .apk also: JDK 17 + Android SDK (Android Studio).
# Windows .exe is built separately on a Windows PC (windows-installer-build/).
# ============================================================================
set -e
cd "$(dirname "$0")/.."   # -> project root

echo "=== Warhammer Army Builder — create installers (macOS: .dmg + .apk) ==="
command -v npm >/dev/null 2>&1 || { echo "ERROR: install Node.js LTS from https://nodejs.org"; read -n1 -s; exit 1; }

cur=$(node -p "require('./package.json').version")
echo "Current version: $cur"
printf "Is this a MAJOR (middle number) or MINOR (last number) change? [major/minor]: "
read kind
IFS='.' read -r X Y Z <<< "$cur"
case "$kind" in
  maj*|MAJ*|M) Y=$((Y+1)); Z=0 ;;
  min*|MIN*|m|"") Z=$((Z+1)) ;;
  *) echo "Unrecognised '$kind' — treating as minor."; Z=$((Z+1)) ;;
esac
new="$X.$Y.$Z"
echo "==> New version: $new"

node scripts/set-version.js "$new"
node scripts/snapshot-version.js "$new"    # record this version's source for changelog diffing
echo "==> Syncing build targets…"
node scripts/sync-builds.js
echo "==> Verifying engine…"
node scripts/test-engine.js

echo ""
echo "=== [1/2] Building macOS .dmg (first run downloads Electron, ~100 MB)… ==="
npm install
npm run dist:mac

echo ""
echo "=== [2/2] Building Android .apk… ==="
( cd mobile && ./build-android.command ) || echo "⚠️  APK build did not complete — see output above (needs JDK 17 + Android SDK)."

echo ""
echo "============================================================"
echo "✅ Built version $new (bumped from $cur)."
echo "   DMG → dist/  ($(ls -1 dist/*.dmg 2>/dev/null | head -1))"
echo "   APK → mobile/android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "   NEXT: go back to Claude and say:  \"create the changelog for $new\""
echo "   Claude will diff releases/$cur → releases/$new, write CHANGELOG.md +"
echo "   docs/CHANGELOG-$new.docx, then you upload the installers + that .docx"
echo "   to a '$new' folder in the Google Drive release archive."
echo "============================================================"
echo "Press any key to close."
read -n1 -s
