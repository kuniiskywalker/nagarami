const {ipcRenderer} = require('electron');

var webview_wrapper = document.getElementById("webview_wrapper");

// create_new_webview_instanse
var webview = document.createElement("webview");
webview.id = "foo";
webview.setAttribute("src", "https://www.youtube.com");
webview.setAttribute("preload", "inject.js");

const isYoutubeMovieUrl = (url) => {
    return url.match(/https:\/\/www\.youtube\.com\/watch/).length > 0;
}

// append new_webview
webview_wrapper.appendChild(webview);
webview.addEventListener("dom-ready", function(){ 

    const reloadButton = document.getElementById('reload');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const playButton = document.getElementById('play');
    const showButton = document.getElementById('show');
    const hideButton = document.getElementById('hide');

    require('electron-context-menu')({
        window: webview,
        prepend: (params, browserWindow) => [{
            label: 'ながら見る',
            visible: isYoutubeMovieUrl(params.linkURL),
            click: (e) => {
                ipcRenderer.send('play-video', params.linkURL);
            }
        }]
    });
    // 更新ボタンをクリックしたらwebviewをリロードする
    reloadButton.addEventListener('click', () => {
        webview.reload();
    });

    // 戻るボタンをクリックしたらwebviewを戻る
    backButton.addEventListener('click', () => {
        webview.goBack();
    });

    // 進むボタンをクリックしたらwebviewを進ませる
    forwardButton.addEventListener('click', () => {
        webview.goForward();
    });

    // 再生ボタンをクリックしたら再生中の動画をナガラミウィンドウで再生
    playButton.addEventListener('click', () => {
        const url = webview.src;
        if (isYoutubeMovieUrl(url)) {
            webview.executeJavaScript("window.document.querySelector('video').pause()")
            ipcRenderer.send('play-video', url);
        }
    });

    // 進むボタンをクリックしたらwebviewを進ませる
    showButton.addEventListener('click', () => {
        ipcRenderer.send('show-player');
    });

    // 戻るボタンをクリックしたらwebviewを進ませる
    hideButton.addEventListener('click', () => {
        ipcRenderer.send('hide-player');
    });
});
