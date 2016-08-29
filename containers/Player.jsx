import { connect } from 'react-redux';
import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'

import { playNextVideoInPlaylist } from '../actions';

function mapStateToProps(state) {
    return state.player
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextVideoPlay: () => {
            dispatch(playNextVideoInPlaylist());
        }
    }
}

const opts = {
    playerVars: {
        autoplay: 1,
        rel: 0,
        showinfo: 0
    }
};

const Player = ({id, width, height, nextVideoPlay}) => {
    let param = Object.assign({}, opts, {
        width: width,
        height: height
    });

    if (id) {
        return <YouTube
            videoId={id}
            opts={param}
            onEnd={nextVideoPlay}
        />
    }
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    nextVideoPlay: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)
