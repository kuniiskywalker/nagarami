import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Controller from './components/Controller'

import SearchVideoList from './components/SearchVideoList'

export default (
    <Route path="/" component={Controller}>
        <IndexRoute component={SearchVideoList} />
    </Route>
);
