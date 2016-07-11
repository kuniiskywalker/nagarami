import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { fetchSubscription, searchChannel, searchPlaylist, searchVideo, showPlayer, hidePlayer, authorization } from './actions'

import createIpc, { send } from 'redux-electron-ipc';

import { Router, hashHistory } from 'react-router';
import routes from './routes';

// store
const ipc = createIpc({
  'fetch-subscriptions': fetchSubscription,
  'search-channel': searchChannel,
  'search-playlist': searchPlaylist,
  'search-video': searchVideo,
  'show-player': showPlayer,
  'hide-player': hidePlayer,
  'authorization': authorization
});
const store = createStore(todoApp, applyMiddleware(ipc));

// 状態変更を監視してコンソールに出力
store.subscribe(() => console.log(store.getState()))

// 
store.dispatch(send('check-authorization'));

render(
    <Provider store={store}>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
);
