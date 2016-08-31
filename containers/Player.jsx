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
        },
        onReadyPlay: (e) => {
            e.target.a.style.position = "absolute";
            e.target.a.style.top = 0;
            e.target.a.style.right = 0;
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

const Player = ({id, width, height, nextVideoPlay, onReadyPlay}) => {
    let param = Object.assign({}, opts, {
        width: "100%",
        height: "100%"
    });
    if (id) {
        return <YouTube
            videoId={id}
            opts={param}
            onEnd={nextVideoPlay}
            onReady={onReadyPlay}
        />
    }
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    nextVideoPlay: PropTypes.func.isRequired,
    onReadyPlay: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)
