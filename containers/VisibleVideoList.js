import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import createIpc, { send } from 'redux-electron-ipc';
import { previewVideo } from '../actions'

function mapStateToProps(state) {
    return {
        videos: state.videos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlayVideo: (video) => {
            dispatch(send('select-video', video));
        },
        onPreviewVideo: (videoId) => {
            dispatch(previewVideo(videoId));
        }
    }
}

const VisibleVideoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList)

export default VisibleVideoList
