#!/bin/bash
# ============================================================================
# One-click release: bump the version and snapshot the source for the changelog.
# The web app itself needs no build — push to GitHub and Pages serves index.html.
# Double-click in Finder (first time: right-click -> Open to clear Gatekeeper).
#
# The changelog is NOT written here — after this finishes, go back to Claude and
# say "create the changelog for <new version>". Claude diffs the previous version's
# snapshot against this one and writes CHANGELOG.md + docs/CHANGELOG-<v>.docx.
#
# Requires: Node.js.
# ============================================================================
set -e
cd "$(dirname "$0")/.."   # -> project root

echo "=== Warhammer Army Builder — release ==="
command -v node >/dev/null 2>&1 || { echo "ERROR: install Node.js LTS from https://nodejs.org"; read -n1 -s; exit 1; }

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

echo "==> Verifying engine…"
node scripts/test-engine.js
node scripts/set-version.js "$new"
node scripts/snapshot-version.js "$new"    # record this version's source for changelog diffing

echo ""
echo "============================================================"
echo "✅ Version $new (bumped from $cur). Commit and push to publish it."
echo ""
echo "   NEXT: go back to Claude and say:  \"create the changelog for $new\""
echo "   Claude will diff releases/$cur → releases/$new and write CHANGELOG.md +"
echo "   docs/CHANGELOG-$new.docx."
echo "============================================================"
echo "Press any key to close."
read -n1 -s
