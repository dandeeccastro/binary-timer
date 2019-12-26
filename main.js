const { app, BrowserWindow } = require('electron')
const stylesheet = require('./config.js')

function createWindow() {
	let win = new BrowserWindow({
		width: 800,
		height: 200,
		backgroundColor: stylesheet.style.default.BACKGROUND_COLOR,
		webPreferences: {
			nodeIntegration: true,
		}
	})
	win.loadFile('index.html')
}

app.on('ready',createWindow)
