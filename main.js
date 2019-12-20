const { app, BrowserWindow } = require('electron')

function createWindow() {
	let win = new BrowserWindow({
		width: 800,
		height: 200,
		webPreferences: {
			nodeIntegration: true
		}
	})
	win.loadFile('index.html')
}

app.on('ready',createWindow)
