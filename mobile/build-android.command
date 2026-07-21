#!/bin/bash
# build-android.command — one-click debug APK build (macOS), mirrors build-mac.command.
# Double-click in Finder, or run: bash build-android.command
#
# Prereqs (one-time): Node.js, a JDK 17, and the Android SDK.
#   Easiest: install Android Studio (bundles JDK 17 + SDK), open it once, let it
#   finish "SDK Components Setup", then run this script.
#
# Output: android/app/build/outputs/apk/debug/app-debug.apk
set -e
cd "$(dirname "$0")"

echo "==> 1/5  Installing npm deps (Capacitor)…"
[ -d node_modules ] || npm install

echo "==> 2/5  Syncing web assets from the desktop project…"
node sync-web.js

echo "==> 3/5  Ensuring native android project exists…"
[ -d android ] || npx cap add android

echo "==> 4/5  Capacitor sync…"
npx cap sync android

# The Android Gradle Plugin 8.2 requires JDK 17. If JAVA_HOME isn't already a
# 17+ JDK, try to find one (Android Studio's bundled JBR, then java_home).
is17plus() { [ -x "$1/bin/java" ] && "$1/bin/java" -version 2>&1 | grep -qE '"(17|18|19|20|21|22|23)'; }
if ! { [ -n "$JAVA_HOME" ] && is17plus "$JAVA_HOME"; }; then
  for CAND in \
    "/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
    "$HOME/Library/Java/JavaVirtualMachines/"*/Contents/Home; do
    if is17plus "$CAND"; then export JAVA_HOME="$CAND"; break; fi
  done
fi
if [ -z "$JAVA_HOME" ] || ! is17plus "$JAVA_HOME"; then
  if command -v /usr/libexec/java_home >/dev/null 2>&1; then
    J="$(/usr/libexec/java_home -v 17 2>/dev/null || true)"
    [ -n "$J" ] && export JAVA_HOME="$J"
  fi
fi
if [ -n "$JAVA_HOME" ] && is17plus "$JAVA_HOME"; then
  echo "    Using JDK: $JAVA_HOME ($("$JAVA_HOME/bin/java" -version 2>&1 | head -1))"
else
  echo "⚠️  No JDK 17 found. The build needs JDK 17 (the Android Gradle Plugin requires it)."
  echo "    Install Android Studio (bundles JDK 17 + the SDK), or: brew install --cask temurin@17"
  echo "    Then re-run, or set: export JAVA_HOME=\"/path/to/jdk17\""
fi

echo "==> 5/5  Gradle assembleDebug…"
cd android
chmod +x ./gradlew

# Tell Gradle where the Android SDK is. Use ANDROID_HOME/ANDROID_SDK_ROOT if set,
# else the standard macOS install location; write local.properties if we find it.
SDK_DIR="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Library/Android/sdk}}"
if [ -d "$SDK_DIR" ]; then
  if ! grep -qs '^sdk.dir=' local.properties 2>/dev/null; then
    echo "sdk.dir=$SDK_DIR" >> local.properties
    echo "    Wrote android/local.properties -> sdk.dir=$SDK_DIR"
  else
    echo "    Using SDK: $SDK_DIR"
  fi
else
  echo "⚠️  Android SDK not found at $SDK_DIR"
  echo "    Install it via Android Studio (Settings ▸ SDK Manager), then re-run."
  echo "    Or, if it's elsewhere:  export ANDROID_HOME=\"/path/to/Android/sdk\""
fi

./gradlew assembleDebug

APK="app/build/outputs/apk/debug/app-debug.apk"
echo ""
if [ -f "$APK" ]; then
  echo "✅ Built: $(cd "$(dirname "$APK")" && pwd)/$(basename "$APK")"
  echo "   Copy it to your phone and open it (enable 'Install unknown apps' for your file manager)."
else
  echo "⚠️  Build finished but APK not found at $APK — check the Gradle output above."
fi
