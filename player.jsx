import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { playVideo } from './actions'
import PlayerApp from './components/PlayerApp'

import createIpc, { send } from 'redux-electron-ipc';

// store
const ipc = createIpc({
  'play-video': playVideo
});
const store = createStore(todoApp, applyMiddleware(ipc));

// 状態変更を監視してコンソールに出力
store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <PlayerApp />
  </Provider>,
  document.getElementById('root')
);
