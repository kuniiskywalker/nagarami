import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import * as actions from './actions'
import App from './components/App'

// import electron from 'electron'

// reducer
// import rootReducer from './reducers/index.js'

// store
const initialState = {};
const store = createStore(todoApp, initialState);

// 状態変更を監視してコンソールに出力
store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
