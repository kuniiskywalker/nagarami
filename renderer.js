const {ipcRenderer} = require('electron');

var webview_wrapper = document.getElementById("webview_wrapper");
webview_wrapper.removeChild(webview_wrapper.lastChild);

// create_new_webview_instanse
var webview = document.createElement("webview");
webview.id = "foo";
webview.setAttribute("src", "https://www.youtube.com");
webview.setAttribute("preload", "inject.js");

// append new_webview
webview_wrapper.appendChild(webview);
webview.addEventListener("dom-ready", function(){ 
    require('electron-context-menu')({
        window: webview,
        prepend: (params, browserWindow) => [{
            label: 'ながら見る',
            visible: params.linkURL.match(/https:\/\/www\.youtube\.com\/watch/).length > 0,
            click: (e) => {
                ipcRenderer.send('playVideo', params.linkURL);
            }
        }]
    });
});
