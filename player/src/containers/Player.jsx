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
            const iframe = e.target.a;
            iframe.style.position = "absolute";
            iframe.style.top = 0;
            iframe.style.right = 0;
        },
        onVideoPlay: (e) => {
            let iframe = e.target.a;
            iframe.contentWindow.document.querySelector('.video-ads').style.display = 'none'
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

const Player = ({id, width, height, nextVideoPlay, onReadyPlay, onVideoPlay}) => {
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
            onPlay={onVideoPlay}
        />
    }
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    nextVideoPlay: PropTypes.func.isRequired,
    onReadyPlay: PropTypes.func.isRequired,
    onVideoPlay: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)
