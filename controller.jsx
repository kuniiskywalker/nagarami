import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import todoApp from './reducers'
import { fetchSubscription, searchChannel, searchPlaylist, searchVideo, togglePlayer, authorization } from './actions'

import createIpc, { send } from 'redux-electron-ipc';

import { Router, hashHistory } from 'react-router';
import routes from './routes';

import injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// store
const ipc = createIpc({
  'fetch-subscriptions': fetchSubscription,
  'search-channel': searchChannel,
  'search-playlist': searchPlaylist,
  'search-video': searchVideo,
  'toggle-player': togglePlayer,
  'authorization': authorization
});
const store = createStore(todoApp, applyMiddleware(ipc));

// 状態変更を監視してコンソールに出力
//store.subscribe(() => console.log(store.getState()))

// 
store.dispatch(send('check-authorization'));

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
