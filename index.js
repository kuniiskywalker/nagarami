'use strict';

//追加モジュールの宣言
import fs from 'fs'
import apiClient from './utils/ApiClient'
import electron from 'electron'
import storage from 'electron-json-storage'

import nodeStatic from 'node-static'
import queryString from 'query-string'

let file = new nodeStatic.Server(__dirname);

let {dialog} = require('electron');

// アプリケーションをコントロールするモジュール
let app = electron.app;

// ウィンドウを作成するモジュール
let BrowserWindow = electron.BrowserWindow;

//Node.js側とHTML側で通信をするモジュール
let ipcMain = electron.ipcMain;

// スコープとアクセストークン関係
let SCOPES = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner'
];

// API KEY
let APIKEY_PATH = __dirname + '/.credentials/apikey';

// OAuth 2.0 クライアント ID
let CREDENTIALS_PATH = __dirname + '/.credentials/client_secret.json';

let apikey = fs.readFileSync(APIKEY_PATH, "utf-8");

// プレイヤーウィンドウ
let playerWindow;

// 認証用ウィンドウ
let authWindow;

// コントローラーウィンドウ
let controllerWindow;

// youtube apiクライアント
let api;

//
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(7170);

// プレイヤーウィンドウ表示処理
let createPlayerWindow = (callback) => {
    if (playerWindow != null) {
        callback();
        return;
    }
    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    let windowWidth = 420;
    let windowHeight = 320;

    playerWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: width - windowWidth,
        y: height - windowHeight,
        frame: false
    });
    playerWindow.loadURL('file://' + __dirname + '/player.html');
    playerWindow.on('closed', () => {
        playerWindow = null;
    });
    playerWindow.webContents.on("dom-ready", () => {
        callback();
    });
    playerWindow.setAlwaysOnTop(true);
};

// 認証用ウィンドウ表示処理
let createAuthWindow = (callback) => {

    // 認証用URL取得
    let authUrl = api.getAuthUrl(SCOPES);
    
    authWindow = new BrowserWindow({width: 800, height: 600});
    authWindow.loadURL(authUrl);
    authWindow.openDevTools();
    authWindow.on('closed', () => {
        authWindow = null;
    });
    // 認証ウィンドウの読み込み完了後の処理
    authWindow.webContents.on("dom-ready", (e) => {
        callback();
    });
};

// コントローラーウィンドウ表示処理
let createControllerWindow = (callback) => {
    if (controllerWindow != null) {
        return;
    }
    controllerWindow = new BrowserWindow({width: 800, height: 600});
    controllerWindow.loadURL('file://' + __dirname + '/controller.html');
    controllerWindow.openDevTools();
    controllerWindow.on('closed', () => {
        app.quit();
    });
    controllerWindow.webContents.on("dom-ready", () => {
        callback();
    });
};

// 保存したtoken情報を取得
let getSavedToken = () => {
    return new Promise((resolve, reject) => {
        storage.get('token', function(error, data) {
            if (error) {
                reject(error);
                return;
            }
            const saved_tokens = data;
            resolve(saved_tokens);
        });
    });
};

// アクセストークンを保存する
let storeToken = (token) => {
    return new Promise((resolve, reject) => {
        storage.set('token', token, function(error) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

// アプリケーション資格ファイルチェック
let getCredentials = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_PATH, 'utf-8', (err, text) => {

            if (err) {
                reject(err);
                return;
            }
            
            let credentials = JSON.parse(text);
            
            if (!credentials.web ||
                !credentials.web.client_id ||
                !credentials.web.client_secret ||
                !credentials.web.redirect_uris[0])
            {
                reject("[no credential file]");
                return;
            }
            
            resolve(credentials);
        });
    });
};

// 起動時に呼ばれるイベント
app.on('ready', async () => {

    try {

        let credentials = await getCredentials();
        
        api = new apiClient(credentials);

        // 認証オブジェクト取得
        let oauth = api.oauth;

        // get saved token
        let saved_tokens = await getSavedToken();

        if (Object.keys(saved_tokens).length === 0 && !saved_tokens.access_token) {

            createControllerWindow(() => {});
        } else {

            // 認証済トークンを認証用オブジェクトにセット
            oauth.setCredentials({
                access_token: saved_tokens.access_token
            });
            
            api.setOauth(oauth);

            createControllerWindow(() => {});
        }

    } catch(error) {
        console.log( error );
        dialog.showErrorBox("application error", "Please notify the kuniiskywalker@gmail.com");
        app.quit();
    }
});

// ウィンドウを閉じた時のイベント
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (playerWindow != null) {
    }
});

// 非同期プロセス通信

// Actions
ipcMain.on('show-player', async(event, ...args) => {
    if (playerWindow != null) {
        playerWindow.show();
        event.sender.send('show-player');
    }
});

ipcMain.on('hide-player', async(event, ...args) => {
    if (playerWindow != null) {
        playerWindow.hide();
        event.sender.send('hide-player');
    }
});

ipcMain.on('open-auth-page', (event, ...args) => {
    createAuthWindow(async() => {
        try {

            // 認証後のコールバックURL GETパラーメータからtokenをとりだす
            let url = authWindow.webContents.getURL();
            let search = url.replace(/(.+?\?)(.+)/, "$2");
            let parsed = queryString.parse(search);
            let token = parsed["code"];

            // 認証オブジェクト取得
            let oauth = api.oauth;

            let token_info = await api.getToken(token);

            oauth.setCredentials({
                access_token: token_info.access_token
            });

            api.setOauth(oauth);

            // save token
            await storeToken(token_info);

            authWindow.close();

        } catch (error) {
            console.log(error);
        }
    });
});

ipcMain.on('fetch-subscriptions', async(event, ...args) => {
    try {
        let subscriptions = await api.fetchSubscriptions(apikey);
        event.sender.send('fetch-subscriptions', subscriptions);
    } catch (error) {
        console.log(error);
    }
});
ipcMain.on('search-channel', async(event, q) => {
    try {
        let channels = await api.searchChannel(apikey, q);
        event.sender.send('search-channel', channels);
    } catch (error) {
        console.log(error);
    }
});
ipcMain.on('search-video', async(event, q) => {
    try {
        let videos = await api.searchVideo(apikey, q);
        event.sender.send('search-video', videos);
    } catch (error) {
        console.log(error);
    }
});
ipcMain.on('search-playlist', async(event, q) => {
    try {
        let playlist = await api.searchPlaylist(apikey, q);
        event.sender.send('search-playlist', playlist);
    } catch (error) {
        console.log(error);
    }
});
ipcMain.on('select-video', (event, video) => {
    createPlayerWindow(() => {
        playerWindow.send('play-video', video);
    });
});
