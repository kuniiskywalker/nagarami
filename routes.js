import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Controller from './components/Controller';

import Dashboard from './containers/Dashboard';
import SearchVideoPage from './containers/SearchVideoPage';

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={Dashboard} />
        <Route path="/search" component={SearchVideoPage} />
    </Route>
);
