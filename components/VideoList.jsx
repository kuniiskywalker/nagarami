import React, { PropTypes } from 'react'
import SearchVideo from '../containers/SearchVideo'
import Video from './Video'

import {List, ListItem} from 'material-ui/List';

const VideoList = ({ videos, onPlayVideo }) => (
    <div>
        <SearchVideo />
        <List>
            {videos.map((video, i) =>
                <Video
                    key={video.id}
                    {...video}
                    onVideoPlayClick={() => onPlayVideo(video)}
                />
            )}
        </List>
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
