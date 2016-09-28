import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Controller from './containers/Controller';

import HomePage from './containers/HomePage';
import VideoPage from './containers/VideoPage';

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={HomePage} />
        <Route path="/video" component={VideoPage} />
    </Route>
);
