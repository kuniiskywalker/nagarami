import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Controller from './containers/Controller'
import VisibleChannelList from './containers/VisibleChannelList'
import VisibleVideoList from './containers/VisibleVideoList'

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={VisibleChannelList} />
        <Route path="/channels" component={VisibleChannelList} />
        <Route path="/videos" component={VisibleVideoList} />
    </Route>
);
