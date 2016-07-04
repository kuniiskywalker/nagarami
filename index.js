'use strict';

//追加モジュールの宣言
import fs from 'fs'
import youtube from 'youtube-api'
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

// 取得したトークンの保存先
let TOKEN_PATH = __dirname + '/.credentials/script-nodejs-quickstart.json';

let apikey = fs.readFileSync(APIKEY_PATH, "utf-8");

// プレイヤーウィンドウ
let playerWindow;

// 認証用ウィンドウ
let authWindow;

// コントローラーウィンドウ
let controllerWindow;

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
let createAuthWindow = (authUrl) => {
    authWindow = new BrowserWindow({width: 800, height: 600});
    authWindow.loadURL(authUrl);
    authWindow.openDevTools();
    authWindow.on('closed', () => {
        authWindow = null;
    });
    // 認証ウィンドウの読み込み完了後の処理
    authWindow.webContents.on("dom-ready", async (e) => {

        try {

            let url = authWindow.webContents.getURL();
            let search = url.replace(/(.+?\?)(.+)/, "$2");
            let parsed = queryString.parse(search);
            let token = parsed["code"];

            // 認証オブジェクト取得
            let oauth = await getOauth();

            let token_info = await getToken(oauth, token);

            oauth.setCredentials({
                access_token: token_info.access_token,
                refresh_token: token_info.refresh_token
            });
            youtube.authenticate({
                type: "key",
                key: oauth
            });

            // save token
            await storeToken(token_info);

            authWindow.close();

        } catch (error) {
            console.log(error);
        }

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

//OAuth認証関係のスクリプト
let getOauth = () => {
    return new Promise((resolve, reject) => {
        getCredentials()
            .then((credentials) => {
                let oauth = youtube.authenticate({
                    type: "oauth",
                    client_id: credentials.web.client_id,
                    client_secret: credentials.web.client_secret,
                    redirect_url: credentials.web.redirect_uris[0]
                });
                resolve(oauth);
            }, (error) => {
                reject(error);
            });
    });
};

let getToken = (oauth, token) => {
    return new Promise((resolve, reject) => {
        oauth.getToken(token, (err, token_info) => {
            if (err) {
                reject("アクセストークンファイルが開けません");
                return;
            }
            resolve(token_info);
        });
    });
};

//// refresh token
//let refreshToken = (oauth) => {
//    var promise = new Promise((resolve, reject) => {
//        oauth.refreshAccessToken((err, tokens) => {
//            if (err) {
//                return reject(err);
//            } else {
//                resolve(tokens);
//            }
//        });
//    });
//    return promise;
//};

// アプリケーション資格ファイルチェック
let getCredentials = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_PATH, 'utf-8', (err, text) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(JSON.parse(text));
            }
        });
    });
};

// 認証用URL取得
let getAuthUrl = (oauth) => {
    return oauth.generateAuthUrl({
        //access_type: 'offline',
        scope: SCOPES
    });
};

// 起動時に呼ばれるイベント
app.on('ready', async () => {

    try {

        // 認証オブジェクト取得
        let oauth = await getOauth();

        // get saved token
        let saved_tokens = await getSavedToken();

        if (Object.keys(saved_tokens).length === 0) {

            createControllerWindow(() => {});
        } else {

            // 認証済トークンを認証用オブジェクトにセット
            oauth.setCredentials({
                access_token: saved_tokens.access_token
            });

            //// トークンのリフレッシュ
            //let refresh = await refreshToken(oauth);
            //
            //// 認証用オブジェクトにリフレッシュしたトークンをセット
            //oauth.setCredentials({
            //    access_token: refresh.access_token
            //});
            //
            youtube.authenticate({
                type: "key",
                key: oauth
            });
            //
            //// save token
            //await storeToken(refresh);

            createControllerWindow(() => {});
        }

    } catch(error) {
        console.log( error );
        dialog.showErrorBox("application error", "Please notify the kuniiskywalker@gmail.com");
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

ipcMain.on('open-auth-page', async(event, ...args) => {
    try {
        // 認証オブジェクト取得
        let oauth = await getOauth();

        // 認証用URL取得
        let authUrl = getAuthUrl(oauth);

        createAuthWindow(authUrl);
    } catch(error) {
        console.log(error);
    }
});

ipcMain.on('fetch-subscriptions', (event, ...args) => {
    youtube.subscriptions.list({
        part: 'snippet',
        mine: true,
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('fetch-subscriptions', result.items);
    });
});
ipcMain.on('search-channel', (event, q) => {
    youtube.search.list({
        part: 'snippet',
        q: q,
        type: 'channel',
        order: 'date',
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('search-channel', result.items);
    });
});
ipcMain.on('search-video', (event, q) => {
    youtube.search.list({
        part: 'snippet',
        q: q,
        type: 'video',
        order: 'date',
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('search-video', result.items);
    });
});
ipcMain.on('search-playlist', (event, q) => {
    youtube.search.list({
        part: 'snippet',
        q: q,
        type: 'playlist',
        order: 'date',
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('search-playlist', result.items);
    });
});
ipcMain.on('select-video', (event, video) => {
    createPlayerWindow(() => {
        playerWindow.send('play-video', video);
    });
});
