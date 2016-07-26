import React, { PropTypes } from 'react'
import PreviewPlayer from './PreviewPlayer'

import {GridList, GridTile} from 'material-ui/GridList';

const Video = ({ id, title, thumbnail, description, onVideoPlayClick }) => (
    <GridTile
    key={id}
    title={title}
    subtitle={description}
    onClick={onVideoPlayClick}
    >
    <img src={thumbnail} />
    </GridTile>
)

Video.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onVideoPlayClick: PropTypes.func.isRequired
}

export default Video