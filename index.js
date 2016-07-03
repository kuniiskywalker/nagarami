'use strict';

//追加モジュールの宣言
import fs from 'fs'
import youtube from 'youtube-api'
import electron from 'electron'
import storage from 'electron-json-storage'

const {dialog} = require('electron');

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

//Node.js側とHTML側で通信をするモジュール
const ipcMain = electron.ipcMain;

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

const apikey = fs.readFileSync(APIKEY_PATH, "utf-8");

// プレイヤーウィンドウ
let playerWindow;

// 認証用ウィンドウ
let authWindow;

// コントローラーウィンドウ
let controllerWindow;

// プレイヤーウィンドウ表示処理
const createPlayerWindow = (callback) => {
    if (playerWindow != null) {
        callback();
        return;
    }
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    const windowWidth = 420;
    const windowHeight = 320;

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
const createAuthWindow = (authUrl) => {
    authWindow = new BrowserWindow({width: 800, height: 600});
    authWindow.loadURL('file://' + __dirname + '/auth.html');
    authWindow.openDevTools();
    authWindow.on('closed', () => {
        authWindow = null;
    });
    // 認証ウィンドウの読み込み完了後の処理
    authWindow.webContents.on("dom-ready", () => {
        //initAuth();
        authWindow.webContents.send('async-url', authUrl);
    });
};

// コントローラーウィンドウ表示処理
const createControllerWindow = (callback) => {
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
const getSavedToken = () => {
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
const storeToken = (token) => {
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
                    client_id: credentials.installed.client_id,
                    client_secret: credentials.installed.client_secret,
                    redirect_url: credentials.installed.redirect_uris[0]
                });
                resolve(oauth);
            }, (error) => {
                reject(error);
            });
    });
};

// トークン取得関数
async function newauthorize(token) {

    try {
        // 認証ファイル情報取得
        const credentials = await getCredentials();

        let oauth = youtube.authenticate({
            type: "oauth",
            client_id: credentials.installed.client_id,
            client_secret: credentials.installed.client_secret,
            redirect_url: credentials.installed.redirect_uris[0]
        });

        const token_info = await getToken(oauth, token);
        
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
        
    } catch (error) {
        console.log(error);
        authWindow.webContents.send('message', "アクセストークンファイルが開けません");
        return;
    }
};

const getToken = (oauth, token) => {
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

// refresh token
const refreshToken = (oauth) => {
    var promise = new Promise((resolve, reject) => {
        oauth.refreshAccessToken((err, tokens) => {
            if (err) {
                return reject(err);
            } else {
                resolve(tokens);
            }
        });
    });
    return promise;
};

// アプリケーション資格ファイルチェック
const getCredentials = () => {
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
}

// 起動時に呼ばれるイベント
app.on('ready', async () => {

    try {

        // 認証オブジェクト取得
        const oauth = await getOauth();

        // get saved token
        const saved_tokens = await getSavedToken();

        if (Object.keys(saved_tokens).length === 0) {

            let authUrl = oauth.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            createAuthWindow(authUrl);
        } else {

            // 認証済トークンを認証用オブジェクトにセット
            oauth.setCredentials({
                access_token: saved_tokens.access_token,
                refresh_token: saved_tokens.refresh_token
            });

            // トークンのリフレッシュ
            const refresh = await refreshToken(oauth);

            // 認証用オブジェクトにリフレッシュしたトークンをセット
            oauth.setCredentials({
                access_token: refresh.access_token,
                refresh_token: refresh.refresh_token
            });

            youtube.authenticate({
                type: "key",
                key: oauth
            });

            // save token
            await storeToken(refresh);

            createControllerWindow(() => {
                if (authWindow != null) {
                    authWindow.close();
                }
            });
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

//app.on('activate', () => {
//    if (mainWindow === null) {
//        createControllerWindow();
//    }
//});

// 非同期プロセス通信

// 認証ウィンドウのトークン入力時のイベント
ipcMain.on('auth-window-input-token', async (event, token) => {
    
    try {

        // 認証オブジェクト取得
        const oauth = await getOauth();

        const token_info = await getToken(oauth, token);

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

        createControllerWindow(() => {
            if (authWindow != null) {
                authWindow.close();
            }
        });

    } catch (error) {
        console.log(error);
    }
});

// Actions
ipcMain.on('fetch-subscriptions', (event, ...args) => {
    youtube.subscriptions.list({
        part: 'snippet',
        mine: true,
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('load-subscription', result.items);
    });
});
ipcMain.on('fetch-videos', (event, channelId) => {
    youtube.search.list({
        part: 'snippet',
        channelId: channelId,
        order: 'date',
        maxResults: 50,
        key: apikey
    }, function (a, result, response) {
        event.sender.send('load-video', result.items);
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
        event.sender.send('load-channel', result.items);
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
        event.sender.send('load-video', result.items);
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
        event.sender.send('load-playlist', result.items);
    });
});
ipcMain.on('select-video', (event, video) => {
    createPlayerWindow(() => {
        playerWindow.send('play-video', video);
    });
});
