@echo off
REM ==========================================================================
REM  Build the Windows installer (.exe) for the Warhammer Army Builder.
REM  Double-click this file, or run it from a Command Prompt.
REM  Requires Node.js (https://nodejs.org). Produces dist\*.exe.
REM ==========================================================================
cd /d "%~dp0.."

echo === Warhammer Army Builder - Windows installer build ===

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js / npm not found. Install Node.js LTS from https://nodejs.org and try again.
  pause
  exit /b 1
)

echo [1/2] Installing dependencies ^(first run downloads Electron, ~100 MB^)...
call npm install
if errorlevel 1 ( echo npm install failed. & pause & exit /b 1 )

echo [2/2] Building the .exe installer with electron-builder...
call npm run dist:win
if errorlevel 1 ( echo Build failed. & pause & exit /b 1 )

echo.
echo Done. Your installer is in the "dist" folder:
dir /b dist\*.exe 2>nul
echo.
pause
