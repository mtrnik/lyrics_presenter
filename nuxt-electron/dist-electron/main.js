var import_electron = require("electron");
import_electron.app.whenReady().then(() => {
  const browserWindow = new import_electron.BrowserWindow();
  browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL ?? "");
  browserWindow.webContents.openDevTools();
});
