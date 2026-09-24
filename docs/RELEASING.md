# Releasing

The app is a static web page: the repo **root** `index.html`, `mobile-init.js`,
`css/`, `js/` and `data/`. There is nothing to build — pushing to GitHub publishes
it through GitHub Pages. (The Electron desktop installers and the Capacitor Android
build were removed when the app became web-only.)

## Step 1 — Verify

```bash
node --check data/*.js js/*.js mobile-init.js   # syntax
node scripts/test-engine.js                     # engine harness (expect "PASS: N/N")
```

## Step 2 — Bump the version

**This project's convention** (not standard semver):

- **major** change → bump the **middle** number, reset the last to 0: `1.4.0 → 1.5.0`
- **minor** change → bump the **last** number: `1.5.0 → 1.5.1`
- the first number is reserved (left alone by these rules)

```bash
node scripts/set-version.js 1.5.1       # package.json + the in-app badge (APP_VERSION in js/core.js)
node scripts/snapshot-version.js 1.5.1  # record this version's source in releases/1.5.1/
```

`build/release.command` (double-click on macOS) does steps 1–2: asks major/minor,
runs the tests, bumps the version and snapshots the source.

## Step 3 — Changelog + Word version

1. See what changed since the previous version (Claude does this):
   ```bash
   node scripts/diff-versions.js     # diffs releases/<prev> vs releases/<new>
   ```
   Then add an entry to **`CHANGELOG.md`** at the top, under a new
   `## [<version>] — <YYYY-MM-DD>` heading, grouped into `### Added` / `### Changed` /
   `### Fixed`, describing those changes in plain language.
2. Generate the Word (.docx) copy of that entry:
   ```bash
   node scripts/make-changelog-docx.js        # → docs/CHANGELOG-<version>.docx
   ```
   (Needs the `docx` devDependency — `npm install` once.)

## Step 4 — Publish

Commit and push; GitHub Pages serves the new version. Optionally archive
`docs/CHANGELOG-<version>.docx` in the Google Drive release folder
(`https://drive.google.com/drive/folders/1oAcaeg8n7jFrSeGB0gQTxosfJoPAgmTh`, one
subfolder per version).

Each version's exact source is kept in `releases/<version>/` (`index.html`,
`mobile-init.js`, `css/`, `js/`, `data/`) — that's what makes the "diff from the
previous version" possible without git.
