import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Controller from './containers/Controller';

import VideoPage from './containers/VideoPage';

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={VideoPage} />
        <Route path="/video" component={VideoPage} />
    </Route>
);
