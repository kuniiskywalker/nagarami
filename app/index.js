'use strict';

//追加モジュールの宣言
// let fs = require('fs');
// let readline = require('readline');
// let google = require('googleapis');
// let googleAuth = require('google-auth-library');

const electron = require('electron');

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

const Menu = electron.Menu;

const dialog = electron.dialog;

//Node.js側とHTML側で通信をするモジュール
// const ipcMain = electron.ipcMain;

// //google apps関係
// let scriptId = 'ここにAPI導入時に発行されるIDを入力';
// let script = google.script('v1');
// let result = "";    //認証時のコードを一時的に受ける関数

// //スコープとアクセストークン関係
// let SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// let TOKEN_PATH = './omikuji/script-nodejs-quickstart.json';

let mainWindow;

let settingsWindow;

let menuTemplate = [{
  label: 'MyApp',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click: function() { showAboutDialog(); } },
    { type: 'separator' },
    { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: function() { showSettingsWindow(); }  },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() { app.quit(); }  }
  ]
}];
let menu = Menu.buildFromTemplate(menuTemplate);

function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: 'About This App',
    detail: 'This app was created by @dotinstall'
  });
}

function showSettingsWindow() {
  settingsWindow = new BrowserWindow({width: 600, height: 400});
  settingsWindow.loadURL('file://' + __dirname + '/settings.html');
  settingsWindow.webContents.openDevTools();
  settingsWindow.show();
  settingsWindow.on('closed', function() {
    settingsWindow = null;
  });
}

function createMainWindow() {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
      mainWindow = null;
  });
}

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
  }
});

app.on('ready', function() {
  createMainWindow();
});

// ipcMain.on('ping', (event, arg1, arg2, arg3) => {
//     console.log('Ping', arg1, arg2, arg3); // eslint-disable-line no-console
//     event.sender.send('pong', arg1, arg2, arg3);
// });

// // 非同期プロセス通信
// ipcMain.on('async', function( event, args ){
//   debugger;
// 	fs.readFile('./omikuji/client_secret.json', function processClientSecrets(err, content) {
// 	  if (err) {
// 		console.log('client_secret.jsonが見つかりません: ' + err);
// 		return;
// 	  }
//
// 	  var test = args;
//
// 	  //認証時コードを受け取る
// 	  if(test == ""){
// 		result = "";
// 	  }else{
// 		result = test;
// 	  }
//
// 	  //認証後にメインスクリプトを実行
// 	  authorize(JSON.parse(content), callAppsScript);
// 	});
//
// });
//
// //OAuth認証関係のスクリプト
// function authorize(credentials, callback) {
//   var clientSecret = credentials.installed.client_secret;
//   var clientId = credentials.installed.client_id;
//   var redirectUrl = credentials.installed.redirect_uris[0];
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
//
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }
//
//
// //新しいアクセストークンを取得する
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//
//   if(result == ""){
// 	console.log("input code");
// 	//HTML側へ認証要求とコード入力を促す
// 	mainWindow.webContents.send('async-url', authUrl );
//   }else{
// 	console.log("oauth");
//     oauth2Client.getToken(result, function(err, token) {
//       if (err) {
// 		mainWindow.webContents.send('message', "アクセストークンファイルが開けません" );
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   }
// }
//
// //アクセストークンを保存する
// function storeToken(token) {
//   try {
//     //fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('トークン保存場所：' + TOKEN_PATH);
// }
//
// //Execution APIを叩くスクリプト
// function callAppsScript(auth) {
//
//   script.scripts.run({
//     auth: auth,
//     resource: {
//       function: 'omikuji'
//     },
//     scriptId: scriptId
//   }, function(err, resp) {
//     if (err) {
//       //APIの実行に失敗した場合
//       console.log('api exection error: ' + err);
//       return;
//     }
//     if (resp.error) {
//       //APIの実行結果としてエラーが返ってきた場合
//       var error = resp.error.details[0];
//       console.log('script message: ' + error.errorMessage);
//       console.log('stack trace:');
//
//       if (error.scriptStackTraceElements) {
//         //エラー内容をトレースする
//         for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
//           var trace = error.scriptStackTraceElements[i];
//           console.log('\t%s: %s', trace.function, trace.lineNumber);
//         }
//       }
//     } else {
//       //APIの実行結果を受け取って表示する
//       var unsei = resp.response.result;
// 	　　mainWindow.webContents.send('message', unsei );
//     }
//
//   });
// }
