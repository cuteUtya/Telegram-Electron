const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,

        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true
        },
    })

    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow()
})