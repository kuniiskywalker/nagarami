'use strict';

//追加モジュールの宣言
import fs from 'fs'
import apiClient from './utils/ApiClient'
import electron from 'electron'
import storage from 'electron-json-storage'

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

// 保存したtoken情報を削除
let removeSavedToken = () => {
    return new Promise((resolve, reject) => {
        storage.remove('token', function(error, data) {
            if (error) {
                reject(error);
                return;
            }
            const saved_tokens = "";
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
            
            if (!credentials.installed ||
                !credentials.installed.client_id ||
                !credentials.installed.client_secret ||
                !credentials.installed.redirect_uris[0])
            {
                reject("[no credential file]");
                return;
            }

            resolve({
                "client_id": credentials.installed.client_id,
                "client_secret": credentials.installed.client_secret,
                "redirect_uri": credentials.installed.redirect_uris[0]
            });
        });
    });
};

// ログインチェック
let checkToken = (token) => {
    if (
        !token ||
        Object.keys(token).length === 0 ||
        !token.access_token ||
        !token.expiry_date
    ) {
        return false;
    }

    // 有効期限チェック
    let now = parseInt( new Date() /1000 );
    if (now >= token.expiry_date) {
        return false;
    }

    return true;
}

// 起動時に呼ばれるイベント
app.on('ready', async () => {

    try {

        let credentials = await getCredentials();
        
        api = new apiClient(credentials);

        // 認証オブジェクト取得
        let oauth = api.oauth;

        // get saved token
        let token = await getSavedToken();

        // 認証済トークンを認証用オブジェクトにセット
        if (checkToken(token)) {
            oauth.setCredentials({
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                expiry_date: token.expiry_date
            });
            api.setOauth(oauth);
        }
        createControllerWindow(() => {});
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

// 再生プレイヤーを表示
ipcMain.on('show-player', async(event, ...args) => {
    if (playerWindow != null) {
        playerWindow.show();
        event.sender.send('show-player');
    }
});

// 再生プレイヤーを非表示
ipcMain.on('hide-player', async(event, ...args) => {
    if (playerWindow != null) {
        playerWindow.hide();
        event.sender.send('hide-player');
    }
});

// 認証ページを開く
ipcMain.on('open-auth-page', (event, ...args) => {
    createAuthWindow(() => {});
});

// ログアウト
ipcMain.on('logout', async(event, ...args) => {
    try {
        
        // 保存済みのトークンを取得
        let token = await getSavedToken();

        // ログアウト処理
        await api.logout(token);

        // 保存済みのトークンを削除
        await removeSavedToken();

        event.sender.send('authorization', false);
        
    } catch (error) {
        console.log(error);
    }
});

// 自分のチャンネル一覧を取得
ipcMain.on('fetch-subscriptions', async(event, ...args) => {
    try {
        let subscriptions = await api.fetchSubscriptions(apikey);
        event.sender.send('fetch-subscriptions', subscriptions);
    } catch (error) {
        console.log(error);
    }
});

// チャンネルを検索
ipcMain.on('search-channel', async(event, q) => {
    try {
        let channels = await api.searchChannel(apikey, q);
        event.sender.send('search-channel', channels);
    } catch (error) {
        console.log(error);
    }
});

// 動画を検索
ipcMain.on('search-video', async(event, q) => {
    try {
        let videos = await api.searchVideo(apikey, q);
        event.sender.send('search-video', videos);
    } catch (error) {
        console.log(error);
    }
});

// プレイリストを検索
ipcMain.on('search-playlist', async(event, q) => {
    try {
        let playlist = await api.searchPlaylist(apikey, q);
        event.sender.send('search-playlist', playlist);
    } catch (error) {
        console.log(error);
    }
});

// 再生する動画を選択
ipcMain.on('select-video', (event, video) => {
    createPlayerWindow(() => {
        playerWindow.send('play-video', video);
    });
});

// 認証トークンをセット
ipcMain.on('set-token', async(event, code) => {
    try {

        // 認証オブジェクト取得
        let oauth = api.oauth;

        let token = await api.getToken(code);
        
        oauth.setCredentials({
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expiry_date: token.expiry_date
        });

        api.setOauth(oauth);
        
        // save token
        await storeToken(token);

        event.sender.send('authorization', true);
    } catch (error) {
        console.log(error);
    }
});

// 認証チェック
ipcMain.on('check-authorization', async (event) => {
    try {

        // get saved token
        let token = await getSavedToken();
        
        let is_logged_in = await checkToken(token);

        event.sender.send('authorization', is_logged_in);
    } catch (error) {
        console.log(error);
    }
});
