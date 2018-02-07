const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const ipcMain = electron.ipcMain;

const path = require('path')
const url = require('url')

let mainWindow

// プレイヤーウィンドウ
let playerWindow

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
}

app.on('ready', createWindow)

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

// プレイヤーウィンドウ表示処理
const createPlayerWindow = (url) => {
    if (playerWindow != null) {
        playerWindow.loadURL(url);
        return;
    }
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    const windowWidth = Math.ceil(width * 0.25);
    const windowHeight = Math.ceil(height * 0.3);

    playerWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: width - windowWidth,
        y: height - windowHeight,
        frame: false
    });

    playerWindow.loadURL(url);
    playerWindow.on('closed', () => {
        playerWindow = null;
    });
    playerWindow.webContents.on("dom-ready", () => {
        playerWindow.webContents.insertCSS('#top{margin: 5px!important; width: 100%;} #page-manager{margin: 0px!important} #meta{display:none} #info{display:none} #page-manager{margin: 0px} #masthead-container{display:none} #container{display:none} #related{display:none!important} #comments{display:none!important}')
        // playerWindow.webContents.executeJavaScript("document.querySelector('#page-manager').style.margin = '0px';");
    });
    playerWindow.setAlwaysOnTop(true);

    // プレイヤー内で外部リンクを踏んだ際の挙動を無効
    playerWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
    })

    playerWindow.on('closed', function () {
        playerWindow = null
    })
};

// 再生する動画を選択
ipcMain.on('playVideo', (event, video) => {
    createPlayerWindow(video);
});

