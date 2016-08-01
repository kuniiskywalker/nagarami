import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import createIpc, { send } from 'redux-electron-ipc';
import { startPreviewVideo, stopPreviewVideo } from '../actions';

function mapStateToProps(state) {
    return {
        videos: state.videos
    }
}

const previewThumbnailNum = 3;

const previewAnimationInterval = 1000;

let previewTimerId = 0;

let defaultThumbnail;

const setPreviewVideoTimer = (thumbnail, num, callback) => {
    if (num > previewThumbnailNum) {
        num = 1;
    }
    const imgPath = thumbnail.match(/(.+)\/(.+)\.(.+)/);
    const newImg = imgPath[1] + '/' + num + '.' + imgPath[3];
    callback(newImg);
    previewTimerId = setTimeout(() => {
        setPreviewVideoTimer(thumbnail, ++num, callback);
    }, previewAnimationInterval);
}

const clearPreviewVideoTimer = () => {
    if(previewTimerId) {
        clearTimeout(previewTimerId);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onSearchVideo: (keyword, sort) => {
        //    dispatch(send('search-video', {
        //        keyword: keyword,
        //        sort: sort
        //    }));
        //},
        onPlayVideo: (video) => {
            dispatch(send('select-video', video));
        },
        onStartPreviewVideo: (videoId, thumbnail) => {
            defaultThumbnail = thumbnail;
            clearPreviewVideoTimer();
            setPreviewVideoTimer(thumbnail, 1, (newImg) => {
                dispatch(startPreviewVideo(videoId, newImg));
            });
        },
        onStopPreviewVideo: (videoId) => {
            clearPreviewVideoTimer();
            dispatch(stopPreviewVideo(videoId, defaultThumbnail));
        }
    }
}

const VisibleVideoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList)

export default VisibleVideoList
