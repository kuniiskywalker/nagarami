import React, { PropTypes } from 'react'

const Channel = ({ onClick, title, thumbnail }) => (
    <li
        onClick={onClick}
    >
    {title}
    <img src={thumbnail} />
    </li>
)

Channel.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default Channel