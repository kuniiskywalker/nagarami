import React, { PropTypes } from 'react';

import VisibleVideoListSort from './VisibleVideoListSort';

import VisibleVideoList from './VisibleVideoList';

const VideoPage = ({}) => (
    <div>
        <div style={{marginBottom: '5px'}}>
            <VisibleVideoListSort />
        </div>
        <VisibleVideoList />
    </div>
)

export default VideoPage