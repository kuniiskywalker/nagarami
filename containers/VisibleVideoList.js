import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import createIpc, { send } from 'redux-electron-ipc';
import { startPreviewVideo, stopPreviewVideo } from '../actions'

function mapStateToProps(state) {
    return {
        videos: state.videos
    }
}

let previewTimerId = 0;

const setPreviewVideoTimer = (thumbnail, num, callback) => {
    previewTimerId = setTimeout(() => {
        if (num > 3) {
            num = 1;
        }
        const imgPath = thumbnail.match(/(.+)\/(.+)\.(.+)/);
        const newImg = imgPath[1] + '/' + num + '.' + imgPath[3];
        callback(newImg);
        setPreviewVideoTimer(thumbnail, ++num, callback);
    }, 1000);
}

const clearPreviewVideoTimer = () => {
    if(previewTimerId) {
        clearTimeout(previewTimerId);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlayVideo: (video) => {
            dispatch(send('select-video', video));
        },
        onStartPreviewVideo: (videoId, thumbnail) => {
            clearPreviewVideoTimer();
            setPreviewVideoTimer(thumbnail, 1, (newImg) => {
                dispatch(startPreviewVideo(videoId, newImg));
            });
        },
        onStopPreviewVideo: (videoId, thumbnail) => {
            clearPreviewVideoTimer();
            dispatch(stopPreviewVideo(videoId, thumbnail));
        }
    }
}

const VisibleVideoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList)

export default VisibleVideoList
