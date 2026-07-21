# Building installers (macOS, Windows, Android)

The app is one source of truth — the repo **root** `index.html`, `main.js`,
`preload.js`, and `data/*.js`. Three downstream targets each keep their **own copy**
of those files and go stale the moment you edit the originals:

| Target | Folder | Produces | Build tool |
|---|---|---|---|
| macOS | `mac-installer-build/` | `.dmg` | Electron + electron-builder |
| Windows | `windows-installer-build/` | `.exe` (NSIS) | Electron + electron-builder |
| Android | `mobile/www/` | `.apk`/`.aab` | Capacitor |

Current app version: **1.4.0** (`package.json` → `version`).

## Step 0 — ALWAYS sync first (the stale-snapshot trap)

The installer folders and `mobile/www/` are **snapshots**, not live references. If you
skip this, the build silently ships old code. From the repo root:

```bash
node scripts/sync-builds.js
```

This copies `index.html`, `main.js`, `preload.js` and every `data/*.js` into
`mac-installer-build/`, `windows-installer-build/`, and runs `mobile/sync-web.js`
(which also injects `mobile-init.js` into the mobile copy). It is idempotent — safe to
run any time.

## Step 1 — Verify before building

```bash
node --check data/*.js main.js preload.js   # syntax
node scripts/test-engine.js                 # engine harness (expect "PASS: N/N")
```

Only build once the harness passes.

## Step 2 — Bump the version (every build)

The version is stamped into the installer output filenames, so bump it for every build.
**This project's convention** (not standard semver):

- **major** change → bump the **middle** number, reset the last to 0: `1.4.0 → 1.5.0`
- **minor** change → bump the **last** number: `1.5.0 → 1.5.1`
- the first number is reserved (left alone by these rules)

Decide major vs minor, then set it everywhere at once (root + both installer folders):

```bash
node scripts/set-version.js 1.5.0     # pass the new version
```

Current version: **1.5.0**.

## Step 3 — Update the changelog + generate the Word version (every build)

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
   Both the `.md` entry and `docs/CHANGELOG-<version>.docx` are the release note for
   this installer. (Needs the `docx` devDependency — already in `package.json`.)

## Step 4 — Build on the target OS

electron-builder only builds for the OS it runs on (no cross-compiling here).

### macOS → `.dmg`
On a Mac, in `mac-installer-build/`:
```bash
# one-click:
open build-mac.command          # (Gatekeeper: right-click → Open the first time)
# or manually:
npm install
npm run dist:mac
```
Output: `mac-installer-build/dist/Warhammer Army Builder-<ver>-arm64.dmg` (Apple
Silicon) and `…-<ver>.dmg` (Intel). The app is **not code-signed**, so first launch is
right-click → Open to clear Gatekeeper. See `mac-installer-build/HOW-TO-BUILD.txt`.

### Windows → `.exe`
On a Windows PC, in `windows-installer-build/`:
```bat
build-win.bat
:: or manually:
npm install
npm run dist:win
```
Output: `windows-installer-build/dist/…Setup <ver>.exe` (NSIS, not one-click — lets the
user choose the install location).

### Android → `.apk`/`.aab`
Needs Android Studio / the Android SDK + Capacitor. From `mobile/`:
```bash
open build-android.command      # or: npx cap sync android && cd android && ./gradlew assembleDebug
```
`sync-builds.js` already refreshed `mobile/www/`; `cap sync` copies it into the native
project. See `mobile/README.md`.

## Release archive (Google Drive)

Built installers are archived in Google Drive, **one folder per version**, under the
release parent folder:
`https://drive.google.com/drive/folders/1oAcaeg8n7jFrSeGB0gQTxosfJoPAgmTh`

For each release, create a subfolder named after the version (e.g. `1.5.0`) and upload
that version's `docs/CHANGELOG-<version>.docx` plus the built `.dmg` / `.exe` / `.apk`.
**You do the Drive upload yourself.** (The `build-installers` skill can create the folder
+ upload via the Drive connector if you ever ask it to, but by default it just reminds
you.)

## One-click scripts (macOS)

Double-clickable `.command` files in `build/` (Gatekeeper: first time right-click → Open):

- **`build/release.command`** — the normal release button. It **asks major/minor**,
  **bumps the version** everywhere, **snapshots** the source into `releases/<version>/`,
  syncs, verifies, then builds **both** the `.dmg` and the `.apk`. It does **not** write
  the changelog.
- **`build/build-mac.command`** — DMG only, at the current version (no bump).
- **`build/build-android.command`** — APK only, at the current version (no bump).

### The release flow (matches how you work)

1. Make your changes (bug fixes, data, features) in Cowork.
2. Double-click **`build/release.command`**, answer `major`/`minor` → it bumps the version
   and builds the installers for everything you changed.
3. Come back to Claude and say **"create the changelog for `<new version>`"**. Claude runs
   `node scripts/diff-versions.js` (diffs `releases/<prev>` vs `releases/<new>`), writes the
   `CHANGELOG.md` entry, and generates `docs/CHANGELOG-<version>.docx`.
4. Upload the installers + `docs/CHANGELOG-<version>.docx` to a `<version>` folder in the
   Google Drive release archive.

Each version's exact source is kept in `releases/<version>/` (`index.html`, `main.js`,
`preload.js`, `data/*.js`) — that's what makes the "diff from the previous version"
possible without git. It isn't shipped in the installers.

The Windows `.exe` can't be built on a Mac — build it on a Windows PC from
`windows-installer-build/` (`build-win.bat`).

## Quick reference

Normal release (macOS): double-click **`build/release.command`** → answer major/minor →
it builds the DMG + APK. Then ask Claude to "create the changelog for <version>".

Under the hood, that one script runs:

```bash
node scripts/set-version.js <new>       # bump version everywhere (+ in-app badge)
node scripts/snapshot-version.js <new>  # record source in releases/<new>/
node scripts/sync-builds.js             # refresh installer folders + mobile/www
node scripts/test-engine.js             # verify (expect PASS: N/N)
npm install && npm run dist:mac         # -> dist/*.dmg
( cd mobile && ./build-android.command ) # -> mobile/android/.../app-debug.apk
```

Then Claude, for the changelog:

```bash
node scripts/diff-versions.js           # what changed vs the previous version
node scripts/make-changelog-docx.js     # -> docs/CHANGELOG-<version>.docx
```

Windows `.exe`: on a Windows PC, in `windows-installer-build/` run `build-win.bat`.

> Rule of thumb: **every** change to `index.html` or `data/` means re-run
> `node scripts/sync-builds.js` before building — the same discipline the mobile build
> has always needed.
