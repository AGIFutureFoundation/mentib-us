/* Mentib DeepMatch — Electron main process.
   Wraps the same static web app (index.html) as a native desktop app,
   making it interoperable across macOS, Windows, and Linux. */
const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1120,
    height: 860,
    minWidth: 480,
    minHeight: 640,
    title: "Mentib DeepMatch",
    backgroundColor: "#0b0e14",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // open external links (site/github) in the system browser, not in-app
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
