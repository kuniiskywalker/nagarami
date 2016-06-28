import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { loadChannels, loadVideos } from './actions'

import createIpc, { send } from 'redux-electron-ipc';

import { Router, hashHistory } from 'react-router';
import routes from './routes';

// store
const ipc = createIpc({
  'load-channels': loadChannels,
  'load-videos': loadVideos
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
