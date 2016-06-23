import React, { PropTypes } from 'react'

const Channel = ({ onClick, thumbnail }) => (
    <li
        onClick={onClick}
    >
    <img src={thumbnail} />
    </li>
)

Channel.propTypes = {
    onClick: PropTypes.func.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default Channel