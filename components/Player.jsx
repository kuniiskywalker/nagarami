import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 1
    }
};

const Player = ({id}) => (
    <YouTube
        videoId={id}
        opts={opts}
    />
)

Player.propTypes = {
    id: PropTypes.string.isRequired
}

export default Player