import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import ChannelList from '../components/ChannelList'

const mapStateToProps = (state) => {
    return {
        channels: state.channels
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChannel: (keyword) => {
            dispatch(send('search-channel', keyword));
        },
        onChannelClick: (id) => {
            dispatch(send('fetch-videos', id));
        }
    }
}


const VisibleChannelList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelList)

export default VisibleChannelList
