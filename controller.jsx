import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

import configureStore from './store/configureStore'

import { send } from 'redux-electron-ipc';

import injectTapEventPlugin from "react-tap-event-plugin";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// 状態変更を監視してコンソールに出力
//store.subscribe(() => console.log(store.getState()))

// 
store.dispatch(send('check-authorization'));

// tap event
injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
