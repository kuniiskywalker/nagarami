import React, { PropTypes } from 'react'
import SearchVideo from '../containers/SearchVideo'
import Video from './Video'

const VideoList = ({ videos, onPlayVideo, onPreviewVideo }) => (
    <div>
        <SearchVideo />
        <ul>
            {videos.map((video, i) =>
                <Video
                    key={video.id}
                    {...video}
                    onVideoPlayClick={() => onPlayVideo(video)}
                    onVideoPreviewClick={() => onPreviewVideo(video.id)}
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
    onPlayVideo: PropTypes.func.isRequired,
    onPreviewVideo: PropTypes.func.isRequired
}
export default VideoList
