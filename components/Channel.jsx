import React, { PropTypes } from 'react'

import {GridList, GridTile} from 'material-ui/GridList';

const Channel = ({ id, title, thumbnail, onClick }) => (
    <GridTile
        key={id}
        title={title}
        onClick={onClick}
    >
    <img src={thumbnail} />
    </GridTile>
)

Channel.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Channel