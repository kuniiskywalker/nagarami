import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';
import VideoListSort from '../components/VideoListSort';

import { setSearchSort } from '../actions';

function mapStateToProps(state) {
    return state.searchConditions
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue(val) {
            dispatch(setSearchSort(val));
            if (!this.keyword && !this.channelId) {
                return false;
            }
            dispatch(send('search-video', {
                channelId: this.channelId,
                keyword: this.keyword,
                sort: val
            }));
        }
    }
}

const VisibleVideoListSort = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoListSort)

export default VisibleVideoListSort
