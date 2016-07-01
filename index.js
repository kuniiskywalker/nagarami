'use strict';

//追加モジュールの宣言
import fs from 'fs'
import youtube from 'youtube-api'
import electron from 'electron'

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
        initAuth();
        authWindow.webContents.send('async-url', authUrl);
    });
};

// コントローラーウィンドウ表示処理
const createControllerWindow = () => {
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
        initMain();
    });
};

// 保存したtoken情報を取得
const getSavedToken = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, 'utf-8', (err, text) => {
            if (err) {
                reject(err);
                return;
            } else {
                const saved_tokens = JSON.parse(text);
                resolve(saved_tokens);
            }
        });
    });
};

//OAuth認証関係のスクリプト
function authorize(credentials) {
    let oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.installed.client_id,
        client_secret: credentials.installed.client_secret,
        redirect_url: credentials.installed.redirect_uris[0]
    });
    let authUrl = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    return new Promise((resolve, reject) => {
        getSavedToken()
            .then((saved_tokens) => {
                oauth.setCredentials({
                    access_token: saved_tokens.access_token,
                    refresh_token: saved_tokens.refresh_token,
                });
                resolve(oauth);
            })
            .catch((err) => {
                reject(authUrl, err);
                return;
            });
    });
};

// トークン取得関数
const newauthorize = (credentials, token, callback) => {
    let oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.installed.client_id,
        client_secret: credentials.installed.client_secret,
        redirect_url: credentials.installed.redirect_uris[0]
    });
    oauth.getToken(token, (err, token_info) => {
        if (err) {
            authWindow.webContents.send('message', "アクセストークンファイルが開けません");
            return;
        }
        oauth.setCredentials({
            access_token: token_info.access_token,
            refresh_token: token_info.refresh_token,
        });
        youtube.authenticate({
            type: "key",
            key: oauth,
        });
        // save token
        storeToken(token_info);
        callback();
    });
};

// メインウィンドウの初期処理
const initMain = () => {
    checkCredentialsFile()
        .then((content) => {
            return authorize(JSON.parse(content));
        })
        .then((oauth) => {
            return reauthorize(oauth)
                .then(() => {
                    afterAuthCallback();
                }, (e) => {
                    console.log(e);
                });
        }, (authUrl, err) => {
            createAuthWindow(authUrl);
        });
};

// 認証ウィンドウの初期処理
const initAuth = () => {
    checkCredentialsFile()
        .then((content) => {
            authorize(JSON.parse(content), () => {
                afterAuthCallback();
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

//OAuth認証関係のスクリプト
async function reauthorize(oauth) {
    // refresh token
    const refresh_tokens = await refreshToken(oauth);

    return new Promise((resolve, reject) => {
        try {
            // save token
            storeToken(refresh_tokens);

            // set refresh token
            oauth.setCredentials({
                access_token: refresh_tokens.access_token,
                refresh_token: refresh_tokens.refresh_token,
            });
            youtube.authenticate({
                type: "key",
                key: oauth,
            });
            resolve();
        } catch (e) {
            reject(e);
        }
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

// アクセストークンを保存する
const storeToken = (token) => {
    try {
        //fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('トークン保存場所：' + TOKEN_PATH);
};

// アプリケーション資格ファイルチェック
const checkCredentialsFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_PATH, 'utf-8', (err, text) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(text);
            }
        });
    });
}

// ログイン成功時に実行される関数
const afterAuthCallback = () => {
    setTimeout(() => {
        if (authWindow) {
            authWindow.close();
        }
    }, 500)
};

// 起動時に呼ばれるイベント
app.on('ready', () => {
    createControllerWindow();
});

// ウィンドウを閉じた時のイベント
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createControllerWindow();
    }
});

// 非同期プロセス通信

// 認証ウィンドウのトークン入力時のイベント
ipcMain.on('auth-window-input-token', (event, token) => {
    checkCredentialsFile()
        .then((content) => {
            newauthorize(JSON.parse(content), token, () => {
                afterAuthCallback();
            });
        })
        .catch((err) => {
            console.log(err);
        });
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
