const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')

let mainWindow

let playerWindow

let playCurrentTime = 0

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
        if (playerWindow != null) {
            playerWindow.close()
        }
    })
    return mainWindow
}

app.on('ready', () => {
  createWindow()
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

const createPlayerWindow = (url, time=0) => {
    playCurrentTime = time;
    if (playerWindow != null) {
        playerWindow.loadURL(url);
        return false
    }
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    const windowWidth = 426
    const windowHeight = 240
    playerWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: width - windowWidth,
        y: height - windowHeight,
        frame: false
    })
    playerWindow.loadURL(url)
    playerWindow.on('closed', () => {
      playerWindow = null;
    })
    playerWindow.webContents.on("dom-ready", () => {
        playerWindow.webContents.insertCSS('#top{margin: 5px!important; width: 100%;} #page-manager{margin: 0px!important} #meta{display:none} #info{display:none} #page-manager{margin: 0px} #masthead-container{display:none} #container{display:none} #related{display:none!important} #comments{display:none!important}')
        
        playerWindow.webContents.executeJavaScript("document.querySelector('video').currentTime = " + playCurrentTime + ";")
    })
    playerWindow.setAlwaysOnTop(true)

    playerWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault()
    })
}

ipcMain.on('play-video', (event, video) => {
    createPlayerWindow(video)
});

ipcMain.on('resume-video', (event, video, time) => {
    createPlayerWindow(video, time)
});

ipcMain.on('show-player', (event, video) => {
    if (playerWindow) {
        playerWindow.show()
        mainWindow.send('showed-player')
    }
});

ipcMain.on('hide-player', async(event) => {
    if (playerWindow) {
        playerWindow.hide()
        mainWindow.send('hidden-player')
    }
});

ipcMain.on('close-player', async(event) => {
    if (playerWindow) {
        playerWindow.close()
    }
});

if (require('electron-squirrel-startup')) return;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
 
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }
 
  const ChildProcess = require('child_process');
  const path = require('path');
 
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
 
  const spawn = function(command, args) {
    let spawnedProcess, error;
 
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}
 
    return spawnedProcess;
  };
 
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
 
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus
 
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers
 
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);
 
      setTimeout(app.quit, 1000);
      return true;
 
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
 
      app.quit();
      return true;
  }
};
