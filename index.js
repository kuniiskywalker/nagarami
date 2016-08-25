'use strict';

//追加モジュールの宣言
import fs from 'fs'
import electron from 'electron'
import storage from 'electron-json-storage'

import YoutubeClient from './utilities/YoutubeClient'

const {dialog} = require('electron');

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

//Node.js側とHTML側で通信をするモジュール
const ipcMain = electron.ipcMain;

//ShortCut
const globalShortcut = electron.globalShortcut;

// スコープとアクセストークン関係
const SCOPES = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner'
];

// API KEY
const APIKEY_PATH = __dirname + '/.credentials/apikey';

// OAuth 2.0 クライアント ID
const CREDENTIALS_PATH = __dirname + '/.credentials/client_secret.json';

const apikey = fs.readFileSync(APIKEY_PATH, "utf-8");

// プレイヤーウィンドウ
let playerWindow;

// 認証用ウィンドウ
let authWindow;

// コントローラーウィンドウ
let controllerWindow;

// youtube apiクライアント
let youtubeClient;

// 
let playerDisplayState = true;

// プレイヤーウィンドウ表示処理
const createPlayerWindow = (callback) => {
    if (playerWindow != null) {
        callback();
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
        frame: false,
        show: playerDisplayState
    });

    playerWindow.loadURL('file://' + __dirname + '/player.html');
    // playerWindow.openDevTools();
    playerWindow.on('closed', () => {
        playerWindow = null;
    });
    playerWindow.webContents.on("dom-ready", () => {
        callback();
    });
    playerWindow.setAlwaysOnTop(true);

    // プレイヤー内で外部リンクを踏んだ際の挙動を無効
    playerWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
    })
};

// 認証用ウィンドウ表示処理
const createAuthWindow = (callback) => {

    // 認証用URL取得
    const authUrl = youtubeClient.getAuthUrl(SCOPES);
    
    authWindow = new BrowserWindow({width: 800, height: 600});
    authWindow.loadURL(authUrl);
    authWindow.on('closed', () => {
        authWindow = null;
    });
    // 認証ウィンドウの読み込み完了後の処理
    authWindow.webContents.on("dom-ready", (e) => {
        callback();
    });
};

// コントローラーウィンドウ表示処理
const createControllerWindow = (callback) => {
    if (controllerWindow != null) {
        return;
    }
    controllerWindow = new BrowserWindow({width: 550, height: 720});
    controllerWindow.loadURL('file://' + __dirname + '/controller.html');
    // controllerWindow.openDevTools();
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
            resolve(data);
        });
    });
};

// 保存したtokenのチェック
const isEmptySavedToken = (token) => {
    if (
        !token ||
        Object.keys(token).length === 0 ||
        !token.access_token ||
        !token.refresh_token
    ) {
        return true;
    }
    return false;
};

// トークンを保存する
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

// 保存したtoken情報を削除
const removeSavedToken = () => {
    return new Promise((resolve, reject) => {
        storage.remove('token', function(error, data) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

// アプリケーション資格ファイルチェック
const getCredentials = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_PATH, 'utf-8', (err, text) => {

            if (err) {
                reject(err);
                return;
            }

            const credentials = JSON.parse(text);
            
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

// トークンの有効期限延長処理
const refreshToken = async() => {
    if(!youtubeClient.isTokenExpired()) {
        const token = await youtubeClient.refreshToken();
        youtubeClient.setToken(token);
        storeToken(token);
   }
};

// 再生プレイヤーの表示/非表示切替
const togglePlayer = () => {
    playerDisplayState = !playerDisplayState;
    if (playerWindow != null) {
        if (playerDisplayState === true) {
            playerWindow.show();
        } else {
            playerWindow.hide();
        }
    }
    controllerWindow.send('toggle-player', playerDisplayState);
}

// 起動時に呼ばれるイベント
app.on('ready', async () => {

    try {

        const credentials = await getCredentials();

        youtubeClient = new YoutubeClient(credentials);

        const token = await getSavedToken();

        // 認証済トークンを認証用オブジェクトにセット
        if (!isEmptySavedToken(token)) {
            youtubeClient.setToken(token);
        }
        createControllerWindow(() => {
            // コントローラーウィンドウが表示されたら再生プレイヤーの状態を送信
            controllerWindow.send('toggle-player', playerDisplayState);
        });

        // ショートカットキー：ctrl+qで再生プレイヤーの表示/非表示切替
        globalShortcut.register('ctrl+q', function() {
            togglePlayer();
        });

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

// 再生プレイヤーを表示
ipcMain.on('toggle-player', async(event) => {
    togglePlayer();
});

// 認証ページを開く
ipcMain.on('open-auth-page', (event, ...args) => {
    createAuthWindow(() => {});
});

// ログアウト
ipcMain.on('logout', async(event, ...args) => {
    try {

        await refreshToken();

        const token = await getSavedToken();

        // ログアウト処理
        await youtubeClient.logout(token.access_token);

        // 保存済みのトークンを削除
        await removeSavedToken();

        event.sender.send('authorization', false);
        
    } catch (error) {
        console.log(error);
        event.sender.send('authorization', false);
    }
});

// 自分のチャンネル一覧を取得
ipcMain.on('fetch-subscriptions', async(event, ...args) => {
    try {
        await refreshToken();
        const subscriptions = await youtubeClient.fetchSubscriptions(apikey);
        event.sender.send('fetch-subscriptions', subscriptions);
    } catch (error) {
        console.log(error);
    }
});

// 自分のプレイリスト取得
ipcMain.on('fetch-playlists', async(event, ...args) => {
    try {
        await refreshToken();
        const playlists = await youtubeClient.fetchPlaylists(apikey);
        event.sender.send('fetch-playlists', playlists);
    } catch (error) {
        console.log(error);
    }
});

// 動画を検索
ipcMain.on('search-video', async(event, args) => {
    try {
        await refreshToken();
        const videoIds = await youtubeClient.searchVideoId(apikey, args);
        const videos = await youtubeClient.searchVideo(apikey, videoIds.toString());
        event.sender.send('search-video', videos);
    } catch (error) {
        console.log(error);
    }
});

// 再生する動画を選択
ipcMain.on('play-video', (event, video) => {
    createPlayerWindow(() => {
        playerWindow.send('play-video', video);
    });
});

// 再生するプレイリストを選択
ipcMain.on('play-playlist', async(event, playlistId) => {
    try {
        await refreshToken();
        const videos = await youtubeClient.fetchPlaylistVideos(apikey, playlistId);
        createPlayerWindow(() => {
            playerWindow.send('play-playlist', videos);
        });
    } catch (error) {
        console.log(error);
    }
});

// 認証トークンをセット
ipcMain.on('set-token', async(event, code) => {
    try {

        // 入力コードからトークンを取得
        const token = await youtubeClient.getTokenByCode(code);

        // トークンを認証オブジェクトにセット
        youtubeClient.setToken(token);

        // トークンを保存
        await storeToken(token);

        event.sender.send('authorization', true);
    } catch (error) {
        console.log(error);
    }
});

// 認証チェック
ipcMain.on('check-authorization', async(event) => {
    try {
        await refreshToken();
        if (youtubeClient.isTokenExpired()) {
            event.sender.send('authorization', true);
        } else {
            event.sender.send('authorization', false);
        }
    } catch (error) {
        event.sender.send('authorization', false);
    }
});

