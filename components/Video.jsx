import React, { PropTypes } from 'react';

import {GridList, GridTile} from 'material-ui/GridList';

import numeral from 'numeral';

const Video = ({ id, title, thumbnail, description, viewCount, onPlayVideoClick, onStartPreviewVideoHover, onStopPreviewVideoHover }) => (
    <GridTile
        key={id}
        title={title}
        subtitle={<span>視聴回数 {numeral(viewCount).format('0,0')} 回</span>}
        onClick={onPlayVideoClick}
        onMouseOver={onStartPreviewVideoHover}
        onMouseOut={onStopPreviewVideoHover}
    >
    <img src={thumbnail} />
    </GridTile>
)

Video.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
    onPlayVideoClick: PropTypes.func.isRequired,
    onStartPreviewVideoHover: PropTypes.func.isRequired,
    onStopPreviewVideoHover: PropTypes.func.isRequired
}

export default Video