import React, { PropTypes } from 'react'

const Channel = ({ handleChannelClick, title, thumbnail }) => (
    <li
        onClick={handleChannelClick}
    >
    {title}
        <img src={thumbnail} />
    </li>
)

Channel.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    handleChannelClick: PropTypes.func.isRequired
}

export default Channel