#!/bin/bash
# ============================================================================
# Build the Android debug APK for the Warhammer Army Builder (macOS).
# Double-click in Finder (first time: right-click -> Open to clear Gatekeeper).
# Requires: Node.js, a JDK 17, and the Android SDK (install Android Studio once).
# Produces: mobile/android/app/build/outputs/apk/debug/app-debug.apk
# ============================================================================
set -e
cd "$(dirname "$0")/.."   # -> project root

echo "=== Warhammer Army Builder — Android APK build ==="
command -v npm >/dev/null 2>&1 || { echo "ERROR: install Node.js LTS from https://nodejs.org"; read -n1 -s; exit 1; }

echo "[1/2] Verifying engine…"
node scripts/test-engine.js

echo "[2/2] Building the APK (syncs web assets, Capacitor, then Gradle)…"
cd mobile
./build-android.command
