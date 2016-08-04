import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Controller from './containers/Controller';

import HomePage from './containers/HomePage';
import ChannelPage from './containers/ChannelPage';
import PlaylistPage from './containers/PlaylistPage';
import VideoPage from './containers/VideoPage';

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/channel" component={ChannelPage} />
        <Route path="/playlist" component={PlaylistPage} />
        <Route path="/video" component={VideoPage} />
    </Route>
);
