import React, { PropTypes } from 'react';

import Video from './Video';

import {GridList} from 'material-ui/GridList';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24
    }
};

const VideoList = ({ videos, onPlayVideo, onStartPreviewVideo, onStopPreviewVideo }) => (
    <div style={styles.root}>
        <GridList
            cellHeight={200}
            style={styles.gridList}
        >
            {videos.map((video, i) =>
                <Video
                    key={video.id}
                    {...video}
                    onPlayVideoClick={() => onPlayVideo(video)}
                    onStartPreviewVideoHover={() => onStartPreviewVideo(video.id, video.thumbnail)}
                    onStopPreviewVideoHover={() => onStopPreviewVideo(video.id)}
                />
            )}
        </GridList>
    </div>
)
VideoList.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onPlayVideo: PropTypes.func.isRequired,
    onStartPreviewVideo: PropTypes.func.isRequired,
    onStopPreviewVideo: PropTypes.func.isRequired
}
export default VideoList
