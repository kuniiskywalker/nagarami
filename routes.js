import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Controller from './containers/Controller'
import Login from './containers/Login'
import VisibleChannelList from './containers/VisibleChannelList'
import VisiblePlaylistList from './containers/VisiblePlaylistList'
import VisibleVideoList from './containers/VisibleVideoList'

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/channels" component={VisibleChannelList} />
        <Route path="/playlist" component={VisiblePlaylistList} />
        <Route path="/videos" component={VisibleVideoList} />
    </Route>
);
