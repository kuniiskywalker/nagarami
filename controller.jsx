import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { loadSubscription, loadChannel, loadPlaylist, loadVideo, loadVideoInPlaylist } from './actions'

import createIpc, { send } from 'redux-electron-ipc';

import { Router, hashHistory } from 'react-router';
import routes from './routes';

// store
const ipc = createIpc({
  'load-subscription': loadSubscription,
  'load-channel': loadChannel,
  'load-playlist': loadPlaylist,
  'load-video': loadVideo,
  'load-video-in-playlist': loadVideoInPlaylist
});
const store = createStore(todoApp, applyMiddleware(ipc));

// 状態変更を監視してコンソールに出力
store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
