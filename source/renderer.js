const {ipcRenderer} = require('electron')

var webview_wrapper = document.getElementById("webview_wrapper")

// create_new_webview_instanse
var webview = document.createElement("webview")
webview.id = "youtube"
webview.setAttribute("src", "https://www.youtube.com")
webview.setAttribute("preload", "inject.js")

const isYoutubeMovieUrl = (url) => {
    return url.match(/https:\/\/www\.youtube\.com\/watch/).length > 0
}

// append new_webview
webview_wrapper.appendChild(webview)
webview.addEventListener("dom-ready", function(){ 

    const homeButton = document.getElementById('home')
    const reloadButton = document.getElementById('reload')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    const playButton = document.getElementById('play')
    const showButton = document.getElementById('show')
    const hideButton = document.getElementById('hide')
    const closeButton = document.getElementById('close')

    require('electron-context-menu')({
        window: webview,
        prepend: (params, browserWindow) => [{
            label: 'ながら見る',
            visible: isYoutubeMovieUrl(params.linkURL),
            click: (e) => {
                ipcRenderer.send('play-video', params.linkURL);
            }
        }]
    })

    homeButton.addEventListener('click', () => {
        webview.setAttribute("src", "https://www.youtube.com")
    })

    reloadButton.addEventListener('click', () => {
        webview.reload()
    })

    backButton.addEventListener('click', () => {
        webview.goBack()
    })

    forwardButton.addEventListener('click', () => {
        webview.goForward()
    })

    playButton.addEventListener('click', () => {
        const url = webview.src
        if (isYoutubeMovieUrl(url)) {
            webview.executeJavaScript("window.document.querySelector('video').pause()")
            webview.executeJavaScript(
                `time: window.document.querySelector('video').currentTime`,
                false,
                function(time){
                    ipcRenderer.send('resume-video', url, time)
                }
            )
        }
    })

    showButton.addEventListener('click', () => {
        ipcRenderer.send('show-player')
    })

    hideButton.addEventListener('click', () => {
        ipcRenderer.send('hide-player')
    })

    closeButton.addEventListener('click', () => {
        ipcRenderer.send('close-player')
    })
})
