import React, { PropTypes } from 'react'
import SearchVideo from '../containers/SearchVideo'
import Video from './Video'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
    }
};

const VideoList = ({ videos, onPlayVideo }) => (
    <div style={styles.root}>
        <SearchVideo />
        <GridList
            cellHeight={200}
            style={styles.gridList}
            >
            {videos.map((video, i) =>
                <Video
                    key={video.id}
                    {...video}
                    onVideoPlayClick={() => onPlayVideo(video)}
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
    onPlayVideo: PropTypes.func.isRequired
}
export default VideoList
