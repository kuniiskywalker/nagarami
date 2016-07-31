import React, { PropTypes } from 'react'

import VisibleSearchFormSort from '../containers/VisibleSearchFormSort'

import VisibleVideoList from '../containers/VisibleVideoList'

const SearchVideoList = ({}) => (
    <div>
        <VisibleSearchFormSort />
        <VisibleVideoList />
    </div>
)

export default SearchVideoList