import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Controller from './components/Controller'
import VisibleChannelList from './containers/VisibleChannelList'
import VisiblePlaylistList from './containers/VisiblePlaylistList'
import VisibleVideoList from './containers/VisibleVideoList'
import VisibleSubscriptionList from './containers/VisibleSubscriptionList'

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={VisibleVideoList} />
        <Route path="/channels" component={VisibleChannelList} />
        <Route path="/playlist" component={VisiblePlaylistList} />
        <Route path="/videos" component={VisibleVideoList} />
        <Route path="/subscriptions" component={VisibleSubscriptionList} />
    </Route>
);
