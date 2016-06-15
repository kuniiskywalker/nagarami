'use strict';

//追加モジュールの宣言
let fs = require('fs');
let readline = require('readline');
let youtube = require("youtube-api");

const electron = require('electron');

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

const Menu = electron.Menu;

const dialog = electron.dialog;

//Node.js側とHTML側で通信をするモジュール
const ipcMain = electron.ipcMain;

let result = "";    //認証時のコードを一時的に受ける関数

// //スコープとアクセストークン関係
let SCOPES = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtubepartner-channel-audit'
];
let TOKEN_PATH = './script-nodejs-quickstart.json';

let mainWindow;

let authWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
      mainWindow = null;
  });
  authWindow.close();
}

function createAuthWindow() {
  authWindow = new BrowserWindow({width: 800, height: 600});
  authWindow.loadURL('file://' + __dirname + '/auth.html');
  authWindow.openDevTools();
  authWindow.on('closed', function() {
      authWindow = null;
  });
}

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createAuthWindow();
  }
});

app.on('ready', function() {
  createAuthWindow();
});

// 非同期プロセス通信
ipcMain.on('async', function( event, args ){
	fs.readFile('./client_secret.json', function processClientSecrets(err, content) {
	  if (err) {
		  console.log('client_secret.jsonが見つかりません: ' + err);
		  return;
	  }

	  var test = args;

	  //認証時コードを受け取る
	  if(test == ""){
		  result = "";
	  } else {
		  result = test;
	  }
	  //認証後にメインスクリプトを実行
	  authorize(JSON.parse(content), afterAuthCallback);
	});
});

//OAuth認証関係のスクリプト
function authorize(credentials, callback) {
  let oauth = youtube.authenticate({
      type: "oauth"
    , client_id: credentials.installed.client_id
    , client_secret: credentials.installed.client_secret
    , redirect_url: credentials.installed.redirect_uris[0]
  });

  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth, callback);
    } else {
      callback(oauth);
      oauth.setCredentials(JSON.parse(token));
    }
  });
}

function getNewToken(oauth, callback) {
  var authUrl = oauth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  if(result == ""){
  	console.log("input code");
  	//HTML側へ認証要求とコード入力を促す
  	authWindow.webContents.send('async-url', authUrl );
  } else {
  	console.log("oauth");
    oauth.getToken(result, function(err, token) {
      if (err) {
  	  	authWindow.webContents.send('message', "アクセストークンファイルが開けません" );
        return;
      }
      oauth.setCredentials(token);
      storeToken(token);
      callback(oauth);
    });
  }
}

//アクセストークンを保存する
function storeToken(token) {
  try {
    //fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('トークン保存場所：' + TOKEN_PATH);
}

//ログイン成功時に実行される関数
function afterAuthCallback(auth) {
  createMainWindow();
}
