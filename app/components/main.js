import React from 'react'
// import createIpc, { send } from 'redux-electron-ipc';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/index.js'
import Root from './Root.js'
// import { pingActionCreator, pongActionCreator } from '../actions/counter'

// const ipc = createIpc({
//     'pong': pongActionCreator, // receive a message
// });

let store = createStore(rootReducer)
// let store = createStore(rootReducer, applyMiddleware(ipc));

// store.dispatch(send('ping', 'redux', 'electron', 'ipc'));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.querySelector('#root')
)
