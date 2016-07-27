import React, { PropTypes } from 'react'

import {GridList, GridTile} from 'material-ui/GridList';

const Playlist = ({ id, title, description, thumbnail, onClick }) => (
    <GridTile
        key={id}
        title={title}
        subtitle={description}
        onClick={onClick}
    >
        <img src={thumbnail} />
    </GridTile>
)

Playlist.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Playlist