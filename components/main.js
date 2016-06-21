import React from 'react'
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/index.js'
import Root from './Root.js'

import electron from 'electron'

// IPC通信を行う
var ipcRenderer = electron.ipcRenderer;

// let store = createStore(rootReducer)
const rootDOM = document.getElementById("root");

ipcRenderer.on("render", (sender, state) => {
  ReactDOM.render(React.createElement(Root, state), rootDOM);
});

// ReactDOM.render(
//     <Provider store={store}>
//         <Root />
//     </Provider>,
//     document.querySelector('#root')
// )
