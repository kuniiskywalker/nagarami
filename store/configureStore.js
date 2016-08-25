import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createIpc, { send } from 'redux-electron-ipc';
import rootReducer from '../reducers';

import { fetchSubscription, fetchPlaylists, searchVideo, togglePlayer, authorization } from '../actions'

const logger = createLogger({
    level: 'info',
    collapsed: true,
});

const router = routerMiddleware(hashHistory);

const enhancer = compose(
    applyMiddleware(thunk, router, logger),
    window.devToolsExtension ? window.devToolsExtension() : noop => noop
);

// store
const ipc = createIpc({
    'fetch-subscriptions': fetchSubscription,
    'fetch-playlists': fetchPlaylists,
    'search-video': searchVideo,
    'toggle-player': togglePlayer,
    'authorization': authorization
});


export default function configureStore(initialState) {
    const store = createStore(rootReducer, applyMiddleware(ipc), enhancer);
    //const store = createStore(rootReducer, initialState, enhancer);

    //if (module.hot) {
    //    module.hot.accept('../reducers', () =>
    //            store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    //    );
    //}

    return store;
}