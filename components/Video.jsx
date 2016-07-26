import React, { PropTypes } from 'react'
import PreviewPlayer from './PreviewPlayer'

import {GridList, GridTile} from 'material-ui/GridList';

const Video = ({ id, title, thumbnail, description, onPlayVideoClick, onStartPreviewVideoHover, onStopPreviewVideoHover }) => (
    <GridTile
    key={id}
    title={title}
    subtitle={description}
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
    onPlayVideoClick: PropTypes.func.isRequired,
    onStartPreviewVideoHover: PropTypes.func.isRequired,
    onStopPreviewVideoHover: PropTypes.func.isRequired
}

export default Video