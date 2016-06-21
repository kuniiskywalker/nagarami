import React from 'react'
import ReactDOM from 'react-dom';
import electron from 'electron'
import Root from './Root.js'

// IPC通信を行う
const ipcRenderer = electron.ipcRenderer;

const rootDOM = document.getElementById("root");

ipcRenderer.on("render", (sender, state) => {
  ReactDOM.render(React.createElement(Root, state), rootDOM);
});
