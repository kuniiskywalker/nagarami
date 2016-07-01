import React, { PropTypes } from 'react'
import SearchVideo from '../containers/SearchVideo'
import Video from './Video'

const VideoList = ({ videos, onVideoClick }) => (
    <div>
        <SearchVideo />
        <ul>
            {videos.map((video, i) =>
                <Video
                    key={video.id}
                    {...video}
                    onClick={() => onVideoClick(video)}
                />
            )}
        </ul>
    </div>
)
VideoList.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onVideoClick: PropTypes.func.isRequired
}
export default VideoList
