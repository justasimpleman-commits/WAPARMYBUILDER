"use strict";
/* ============================================================================
   Chaos Dwarfs Army Builder — Electron main process.

   Responsibilities:
     - Create the application window and load index.html.
     - Provide a small, safe IPC API (see preload.js) for:
         * an in-app "library" of named armies stored in the OS user-data dir,
         * Save As / Open native file dialogs (.json),
         * exporting the text list to a chosen file (.txt).
   No business logic lives here — the renderer (index.html) owns the rules.
   ========================================================================== */

const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = fs.promises;

/* ---- where the named-army library lives (per-OS user data dir) ---- */
function libraryDir() {
  return path.join(app.getPath("userData"), "armies");
}
async function ensureLibrary() {
  await fsp.mkdir(libraryDir(), { recursive: true });
  return libraryDir();
}
/* Filesystem-safe filename for a library entry. The display name is stored
   inside the file, so the filename only needs to be unique & valid. */
function safeFile(name) {
  const base = String(name || "untitled")
    .replace(/[^a-z0-9\-_ ]/gi, "_")
    .trim()
    .slice(0, 80) || "untitled";
  return base + ".json";
}

/* =============================== window ================================= */
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1380,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#1b1410",
    title: "Warhammer Army Builder",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(buildMenu());
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* =============================== menu =================================== */
/* A trimmed menu; the File items just message the renderer, which already
   owns the buttons, so menu + buttons stay in sync. */
function buildMenu() {
  const isMac = process.platform === "darwin";
  const send = (channel) => () => win && win.webContents.send(channel);
  const template = [
    ...(isMac ? [{ role: "appMenu" }] : []),
    {
      label: "File",
      submenu: [
        { label: "Save", accelerator: "CmdOrCtrl+S", click: send("menu:save") },
        { label: "Save As…", accelerator: "CmdOrCtrl+Shift+S", click: send("menu:saveAs") },
        { label: "Open…", accelerator: "CmdOrCtrl+O", click: send("menu:open") },
        { label: "Library…", accelerator: "CmdOrCtrl+L", click: send("menu:library") },
        { type: "separator" },
        { label: "Export text list…", click: send("menu:exportText") },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" }
      ]
    },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    { role: "windowMenu" }
  ];
  return Menu.buildFromTemplate(template);
}

/* ============================ IPC: library ============================== */
ipcMain.handle("library:list", async () => {
  const dir = await ensureLibrary();
  const files = (await fsp.readdir(dir)).filter((f) => f.endsWith(".json"));
  const out = [];
  for (const f of files) {
    try {
      const raw = await fsp.readFile(path.join(dir, f), "utf8");
      const data = JSON.parse(raw);
      out.push({
        file: f,
        name: data.name || f.replace(/\.json$/, ""),
        savedAt: data.savedAt || null,
        points: data.points ?? null,
        limit: data.limit ?? null
      });
    } catch (_) {
      /* skip unreadable / malformed files */
    }
  }
  out.sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));
  return out;
});

ipcMain.handle("library:load", async (_e, file) => {
  const dir = await ensureLibrary();
  const raw = await fsp.readFile(path.join(dir, path.basename(file)), "utf8");
  return JSON.parse(raw);
});

ipcMain.handle("library:save", async (_e, { name, data }) => {
  const dir = await ensureLibrary();
  const file = safeFile(name);
  await fsp.writeFile(path.join(dir, file), JSON.stringify(data, null, 2), "utf8");
  return { ok: true, file };
});

ipcMain.handle("library:delete", async (_e, file) => {
  const dir = await ensureLibrary();
  await fsp.rm(path.join(dir, path.basename(file)), { force: true });
  return { ok: true };
});

/* ========================= IPC: file dialogs =========================== */
ipcMain.handle("file:saveJson", async (_e, { defaultName, data }) => {
  const res = await dialog.showSaveDialog(win, {
    title: "Save army",
    defaultPath: safeFile(defaultName),
    filters: [{ name: "Army file", extensions: ["json"] }]
  });
  if (res.canceled || !res.filePath) return { ok: false };
  await fsp.writeFile(res.filePath, JSON.stringify(data, null, 2), "utf8");
  return { ok: true, path: res.filePath };
});

ipcMain.handle("file:openJson", async () => {
  const res = await dialog.showOpenDialog(win, {
    title: "Open army",
    properties: ["openFile"],
    filters: [{ name: "Army file", extensions: ["json"] }]
  });
  if (res.canceled || !res.filePaths.length) return { ok: false };
  const raw = await fsp.readFile(res.filePaths[0], "utf8");
  return { ok: true, data: JSON.parse(raw), path: res.filePaths[0] };
});

ipcMain.handle("file:saveText", async (_e, { defaultName, text }) => {
  const res = await dialog.showSaveDialog(win, {
    title: "Export list",
    defaultPath: defaultName || "army-list.txt",
    filters: [{ name: "Text", extensions: ["txt"] }]
  });
  if (res.canceled || !res.filePath) return { ok: false };
  await fsp.writeFile(res.filePath, text, "utf8");
  return { ok: true, path: res.filePath };
});
