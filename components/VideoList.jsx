import React, { PropTypes } from 'react'
import SearchKeywordTextField from './SearchKeywordTextField'
import Video from './Video'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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

const VideoList = ({ videos, onSearchVideo, onPlayVideo, onStartPreviewVideo, onStopPreviewVideo }) => (
    <div style={styles.root}>
        <SearchKeywordTextField onSearch={onSearchVideo} />
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
    onSearchVideo: PropTypes.func.isRequired,
    onPlayVideo: PropTypes.func.isRequired,
    onStartPreviewVideo: PropTypes.func.isRequired,
    onStopPreviewVideo: PropTypes.func.isRequired
}
export default VideoList
