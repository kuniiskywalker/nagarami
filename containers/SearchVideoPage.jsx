import React, { PropTypes } from 'react';

import VisibleSearchFormSort from './VisibleSearchFormSort';

import VisibleVideoList from './VisibleVideoList';

const SearchVideoList = ({}) => (
    <div>
        <div style={{marginBottom: '5px'}}>
            <VisibleSearchFormSort />
        </div>
        <VisibleVideoList />
    </div>
)

export default SearchVideoList