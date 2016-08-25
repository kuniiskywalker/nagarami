import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { playVideo, playPlaylist, changeScreenSize } from './actions'
import Player from './containers/Player'

import createIpc, { send } from 'redux-electron-ipc';

// store
const ipc = createIpc({
  'play-video': playVideo,
  'play-playlist': playPlaylist
});
const store = createStore(todoApp, applyMiddleware(ipc));

// 状態変更を監視してコンソールに出力
store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <Player />
  </Provider>,
  document.getElementById('root')
);

store.dispatch(changeScreenSize(window.innerWidth, window.innerHeight));
