'use strict';

//追加モジュールの宣言
let fs = require('fs');
let youtube = require("youtube-api");

const electron = require('electron');

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

//Node.js側とHTML側で通信をするモジュール
const ipcMain = electron.ipcMain;

let result = "";    //認証時のコードを一時的に受ける関数

// //スコープとアクセストークン関係
let SCOPES = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtubepartner'
];

// API KEY
let APIKEY_PATH = './config/apikey';

// OAuth 2.0 クライアント ID
let CREDENTIALS_PATH = './config/client_secret.json';

// 取得したトークンの保存先
let TOKEN_PATH = './config/script-nodejs-quickstart.json';

// メインウィンドウ
let mainWindow;

// 認証用ウィンドウ
let authWindow;

// メインウィンドウ表示処理
const createMainWindow = (auth) => {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.webContents.on("dom-ready", () => {
      render()
    });
};

const render = () => {
    let apikey = fs.readFileSync(APIKEY_PATH, "utf-8")
    // youtube.videos.list({part: 'id', chart: 'mostPopular', key: apikey}, function (a, result, response) {
    //    console.log(result.items);
    // });
    // youtube.channels.list({part: 'id', mine: true, key: apikey}, function (a, result, response) {
    //    console.log(result);
    // });

    youtube.subscriptions.list({part: 'snippet', mine: true, maxResults: 50, key: apikey}, function (a, result, response) {
       let aa = result.items.map((value, key) => {return value.snippet})
       console.log( aa )
    });

    mainWindow.webContents.send('render', youtube.getConfig());
};

// 認証用ウィンドウ表示処理
const createAuthWindow = () => {
    authWindow = new BrowserWindow({width: 800, height: 600});
    authWindow.loadURL('file://' + __dirname + '/auth.html');
    authWindow.openDevTools();
    authWindow.on('closed', function () {
        authWindow = null;
    });
};

//OAuth認証関係のスクリプト
const authorize = (credentials, callback) => {
    let oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.installed.client_id,
        client_secret: credentials.installed.client_secret,
        redirect_url: credentials.installed.redirect_uris[0]
    });
    // 既に認証済トークンファイルがあるかチェック
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth, callback);
        } else {
            let token_info = JSON.parse(token)
            oauth.setCredentials({
              access_token: token_info.access_token,
              refresh_token: token_info.refresh_token,
            });
            youtube.authenticate({
                type: "key",
                key: oauth,
            });
            callback();
        }
    });
};

// トークン取得関数
const getNewToken = (oauth, callback) => {
    let authUrl = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    if (result == "") {
        console.log("input code");
        //HTML側へ認証要求とコード入力を促す
        authWindow.webContents.send('async-url', authUrl);
    } else {
        console.log("oauth");
        oauth.getToken(result, function (err, token_info) {
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
            storeToken(token_info);
            callback();
        });
    }
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
const checkCredentialsFile = (callback) => {
    fs.readFile(CREDENTIALS_PATH, function processClientSecrets(err, content) {
        if (err) {
            console.log('client_secret.jsonが見つかりません: ' + err);
            return;
        }
        callback(content);
    });
};

// ログイン成功時に実行される関数
const afterAuthCallback = () => {
    createMainWindow();
    setTimeout(() => {
      if (authWindow) {
          authWindow.close();
      }
    }, 500)
};



app.on('ready', function () {
    createAuthWindow();
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createAuthWindow();
    }
});

// 非同期プロセス通信

// メインウィンドウ読み込み完了後イベント
ipcMain.on('load', function () {
    checkCredentialsFile(function (content) {
        authorize(JSON.parse(content), afterAuthCallback);
    });
});

// メインウィンドウトークン入力時のイベント
ipcMain.on('auth', function (event, token) {
    checkCredentialsFile(function (content) {
        //認証時コードを受け取る
        result = (token)? token: "";

        //認証後にメインスクリプトを実行
        authorize(JSON.parse(content), afterAuthCallback);
    });
});
