// IPC通信を行う
var ipcRenderer = require('electron').ipcRenderer;

// 非同期に通信を行う
(function () {
    // 非同期通信の結果を受けたときのコールバック
    ipcRenderer.on('async-reply', function (event, arg) {
        alert(arg);
    });

    //authURLを受け取り、inputboxで入力させる
    ipcRenderer.on('async-url', function (event, arg) {
        var html = "<b><a href='" + arg + "' target='_blank'>こちらをクリック</a></b>して、認証用コードを取得し、送信して下さい。"
        document.getElementById("authman").innerHTML = html;
    });

    //各種雑多なメッセージを受け取る
    ipcRenderer.on('message', function (event, arg) {
        alert(arg);
    });

    // // メインプロセスに引数を送信
    // ipcRenderer.send('auth-window-load');
})();

function gcodeinput() {
    var values = document.getElementById("inputman").value;
    //validation処理
    if (values == "") {
        alert("コードが空ですよ");
        return;
    }

    // メインプロセスに引数を送信
    ipcRenderer.send('auth-window-input-token', values);
}
