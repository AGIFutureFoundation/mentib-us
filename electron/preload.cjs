/* Mentib DeepMatch — Electron preload.
   Minimal bridge; the app is fully self-contained so nothing is exposed
   beyond a version ping. */
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("mentibDesktop", {
  isDesktop: true,
  platform: process.platform,
  version: "1.0.0"
});
