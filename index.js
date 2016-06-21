'use strict';

//追加モジュールの宣言
import fs from 'fs'
import youtube from 'youtube-api'

import electron from 'electron'

import { applyMiddleware, createStore } from 'redux';

// reducer
const counter = (state = {count: 0}, action) => {
    switch(action.type) {
  　 case 'INCREMENT_COUNTER':
        return {count: state.count + 1}　
  　 case 'DECREMENT_COUNTER':
        return {count: state.count - 1}
  　 default:
        return state
    }
}

// store
const myStore = createStore(counter);

// 状態変更を監視してコンソールに出力
myStore.subscribe(() => console.log(myStore.getState()))

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
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // メインウィンドウの読み込み完了後の処理
    mainWindow.webContents.on("dom-ready", () => {
        initMain();
        render();
    });
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

// 保存したtoken情報を取得
const getSavedToken = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, 'utf-8', (err, text) => {
            if(err) {
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
            resolve(oauth, saved_tokens);
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
      .then((oauth, saved_tokens) => {
          reauthorize(oauth, saved_tokens)
            .then(() => {
              afterAuthCallback();
            });
      }, (authUrl, err) => {
          createAuthWindow(authUrl);
      });
}

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
}

const render = () => {
  mainWindow.webContents.send("render", myStore.getState())
};

//OAuth認証関係のスクリプト
async function reauthorize(oauth, saved_tokens) {
    oauth.setCredentials({
        access_token: saved_tokens.access_token,
        refresh_token: saved_tokens.refresh_token,
    });

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
      } catch(e) {
          reject(e);
      }
    });
};

// refresh token
const refreshToken = (oauth) => {
  var promise = new Promise((resolve, reject) => {
      oauth.refreshAccessToken((err, tokens) => {
          if(err) {
              return reject(err);
          } else {
              resolve(tokens);
          }
      });
  });
  return promise;
}

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
            if(err) {
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
    // createMainWindow();
    setTimeout(() => {
      if (authWindow) {
          authWindow.close();
      }
      render();
    }, 500)
};

// 起動時に呼ばれるイベント
app.on('ready', () => {
    createMainWindow();
});

// ウィンドウを閉じた時のイベント
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
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

ipcMain.on("dispatch-store", (sender, e) => {
  console.log( e );
  myStore.dispatch(e);
  render();
});
