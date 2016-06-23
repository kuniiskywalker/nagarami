import { connect } from 'react-redux'
import { playVideo } from '../actions'
import VideoList from '../components/VideoList'

function getVisibleTodos(videos, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return videos.map((video, i) => {
                return {
                    id: video.id.videoId,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnail: video.snippet.thumbnails.default.url
                }
            }).filter((element) => {
                return element.id != "" && element.id != undefined
            })
    }
}
function mapStateToProps(state) {
    return {
        videos: getVisibleTodos(state.videos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onVideoClick: (video) => {
            dispatch(playVideo(video));
        }
    }
}

const VisibleVideoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList)

export default VisibleVideoList
