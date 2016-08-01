import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'

const opts = {
    width: '400',
    height: '300',
    playerVars: {
        autoplay: 1,
        rel: 0,
        showinfo: 0
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