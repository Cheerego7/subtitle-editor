import path, { join } from "node:path";
import { app, BrowserWindow } from "electron";
import { registerIpcHandlers } from "./ipc";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 678,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false,
    },
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 13,
      y: 13,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (__DEV__) {
    await mainWindow.loadURL(RENDERER_URL);
    mainWindow.webContents.openDevTools();
  }
  else {
    await mainWindow.loadFile(join(__dirname, "..", "renderer", "index.html"));
  }
}

app.whenReady().then(async () => {
  registerIpcHandlers();
  await createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
