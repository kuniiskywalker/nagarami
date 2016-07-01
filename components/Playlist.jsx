import React, { PropTypes } from 'react'

const Playlist = ({ onClick, title, description, thumbnail }) => (
    <li
        onClick={onClick}
    >
        {title}
        {description}
        <img src={thumbnail} />
    </li>
)

Playlist.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default Playlist