import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Controller from './components/Controller'

import SearchList from './containers/SearchList'

//import VisibleChannelList from './containers/VisibleChannelList'
//import VisiblePlaylistList from './containers/VisiblePlaylistList'
//import VisibleVideoList from './containers/VisibleVideoList'
//import VisibleSubscriptionList from './containers/VisibleSubscriptionList'

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={SearchList} />
    </Route>
);
