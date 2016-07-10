import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'

const opts = {
    width: '120',
    height: '90',
    playerVars: {
        autohide: 1,
        controls: 0,
        autoplay: 1,
        iv_load_policy: 3,
        rel: 0
    }
};

const _onReady = (event) => {
    event.target.mute();
}

const PreviewPlayer = ({id, onPause}) => (
    <YouTube
        videoId={id}
        opts={opts}
        onReady={_onReady}
        onPause={onPause}
    />
)

PreviewPlayer.propTypes = {
    id: PropTypes.string.isRequired,
    onPause: PropTypes.func.isRequired
}

export default PreviewPlayer