import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'

const opts = {
    playerVars: {
        autoplay: 1,
        rel: 0,
        showinfo: 0
    }
};

const Player = ({id, width, height}) => {
    let param = Object.assign({}, opts, {
        width: width,
        height: height 
    });
     
    if (id) {
        return <YouTube videoId={id} opts={param} />
    }
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
}

export default Player
