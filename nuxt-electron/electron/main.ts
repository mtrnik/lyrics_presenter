import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
    const browserWindow = new BrowserWindow()
    browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL ?? '')
    browserWindow.webContents.openDevTools()
})
