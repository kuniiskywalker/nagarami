import React, { PropTypes } from 'react'

const Video = ({ onClick, title, thumbnail }) => (
    <li
        onClick={onClick}
    >
        {title}
        <img src={thumbnail} />
    </li>
)

Video.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default Video