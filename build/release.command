#!/bin/bash
# ============================================================================
# One-click release: bump the version, snapshot the source, build the Android .apk.
# The web app itself needs no build — push to GitHub and Pages serves index.html.
# Double-click in Finder (first time: right-click -> Open to clear Gatekeeper).
#
# It asks major/minor, BUMPS the version, snapshots this version's source (so the
# changelog can be diffed later), then builds the Android .apk.
#
# The changelog is NOT written here — after this finishes, go back to Claude and
# say "create the changelog for <new version>". Claude diffs the previous version's
# snapshot against this one and writes CHANGELOG.md + docs/CHANGELOG-<v>.docx.
#
# Requires: Node.js. For the .apk also: JDK 17 + Android SDK (Android Studio).
# ============================================================================
set -e
cd "$(dirname "$0")/.."   # -> project root

echo "=== Warhammer Army Builder — release (web + Android .apk) ==="
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
echo "==> Syncing mobile/www…"
node mobile/sync-web.js
echo "==> Verifying engine…"
node scripts/test-engine.js

echo ""
echo "=== Building Android .apk… ==="
( cd mobile && ./build-android.command ) || echo "⚠️  APK build did not complete — see output above (needs JDK 17 + Android SDK)."

echo ""
echo "============================================================"
echo "✅ Built version $new (bumped from $cur)."
echo "   APK → mobile/android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "   NEXT: go back to Claude and say:  \"create the changelog for $new\""
echo "   Claude will diff releases/$cur → releases/$new, write CHANGELOG.md +"
echo "   docs/CHANGELOG-$new.docx, then you upload the .apk + that .docx"
echo "   to a '$new' folder in the Google Drive release archive."
echo "============================================================"
echo "Press any key to close."
read -n1 -s
