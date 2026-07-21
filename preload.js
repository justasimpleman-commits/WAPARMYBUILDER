"use strict";
/* ============================================================================
   Preload bridge. Exposes a minimal, promise-based `window.armyAPI` to the
   renderer. The renderer feature-detects this object: when absent (plain
   browser / file://) it falls back to localStorage + Blob downloads.
   ========================================================================== */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("armyAPI", {
  isDesktop: true,

  // named-army library (stored in the OS user-data folder)
  listArmies: () => ipcRenderer.invoke("library:list"),
  loadArmy: (file) => ipcRenderer.invoke("library:load", file),
  saveArmy: (name, data) => ipcRenderer.invoke("library:save", { name, data }),
  deleteArmy: (file) => ipcRenderer.invoke("library:delete", file),

  // native file dialogs
  saveJson: (defaultName, data) => ipcRenderer.invoke("file:saveJson", { defaultName, data }),
  openJson: () => ipcRenderer.invoke("file:openJson"),
  saveText: (defaultName, text) => ipcRenderer.invoke("file:saveText", { defaultName, text }),

  // menu -> renderer events
  onMenu: (channel, cb) => {
    const valid = ["menu:save", "menu:saveAs", "menu:open", "menu:library", "menu:exportText"];
    if (valid.includes(channel)) ipcRenderer.on(channel, () => cb());
  }
});
