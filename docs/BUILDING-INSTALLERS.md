# Releasing (web app + Android)

The app is a static web page: the repo **root** `index.html`, `mobile-init.js`,
`css/`, `js/` and `data/`. There is nothing to build for the web — pushing to GitHub
publishes it through GitHub Pages. The only packaged target left is Android:

| Target | Folder | Produces | Build tool |
|---|---|---|---|
| Web | repo root | — (served as-is) | GitHub Pages |
| Android | `mobile/www/` | `.apk`/`.aab` | Capacitor |

(The Electron macOS/Windows installers were removed when the app became web-only.)

## Step 0 — ALWAYS sync the Android copy first

`mobile/www/` is a **snapshot**, not a live reference. If you skip this, the APK
silently ships old code. From the repo root:

```bash
node mobile/sync-web.js
```

It mirrors `index.html`, `mobile-init.js`, `css/`, `js/` and `data/` into
`mobile/www/` (removing files that no longer exist). Idempotent — safe to run any time.

## Step 1 — Verify before releasing

```bash
node --check data/*.js js/*.js mobile-init.js   # syntax
node scripts/test-engine.js                     # engine harness (expect "PASS: N/N")
```

Only release once the harness passes.

## Step 2 — Bump the version (every release)

**This project's convention** (not standard semver):

- **major** change → bump the **middle** number, reset the last to 0: `1.4.0 → 1.5.0`
- **minor** change → bump the **last** number: `1.5.0 → 1.5.1`
- the first number is reserved (left alone by these rules)

```bash
node scripts/set-version.js 1.5.1     # package.json + the in-app badge (APP_VERSION in js/core.js)
```

## Step 3 — Update the changelog + generate the Word version

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

## Step 4 — Android `.apk`/`.aab`

Needs Android Studio / the Android SDK + Capacitor. From `mobile/`:
```bash
open build-android.command      # or: npx cap sync android && cd android && ./gradlew assembleDebug
```
See `mobile/README.md`.

## Release archive (Google Drive)

Releases are archived in Google Drive, **one folder per version**, under the
release parent folder:
`https://drive.google.com/drive/folders/1oAcaeg8n7jFrSeGB0gQTxosfJoPAgmTh`

For each release, create a subfolder named after the version (e.g. `1.5.1`) and upload
that version's `docs/CHANGELOG-<version>.docx` plus the built `.apk`.
**You do the Drive upload yourself.**

## One-click scripts (macOS)

Double-clickable `.command` files in `build/` (Gatekeeper: first time right-click → Open):

- **`build/release.command`** — the normal release button. It **asks major/minor**,
  **bumps the version**, **snapshots** the source into `releases/<version>/`, syncs
  `mobile/www`, verifies, then builds the `.apk`. It does **not** write the changelog.
- **`build/build-android.command`** — APK only, at the current version (no bump).

### The release flow

1. Make your changes and push them (the web app updates via GitHub Pages).
2. Double-click **`build/release.command`**, answer `major`/`minor`.
3. Come back to Claude and say **"create the changelog for `<new version>`"**. Claude runs
   `node scripts/diff-versions.js`, writes the `CHANGELOG.md` entry, and generates
   `docs/CHANGELOG-<version>.docx`.
4. Upload the `.apk` + `docs/CHANGELOG-<version>.docx` to a `<version>` folder in the
   Google Drive release archive.

Each version's exact source is kept in `releases/<version>/` (`index.html`,
`mobile-init.js`, `css/`, `js/`, `data/`) — that's what makes the "diff from the
previous version" possible without git.

Under the hood, `release.command` runs:

```bash
node scripts/set-version.js <new>       # bump version (+ in-app badge)
node scripts/snapshot-version.js <new>  # record source in releases/<new>/
node mobile/sync-web.js                 # refresh mobile/www
node scripts/test-engine.js             # verify (expect PASS: N/N)
( cd mobile && ./build-android.command ) # -> mobile/android/.../app-debug.apk
```
