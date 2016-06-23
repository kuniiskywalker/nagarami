import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import ChannelList from '../components/ChannelList'

function getVisibleTodos(channels, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return channels.map((channel, i) => {
                const value = channel.snippet;
                return {
                    id: value.resourceId.channelId,
                    thumbnail: value.thumbnails.default.url
                }
            }).filter((element) => {
                return element.id != ""
            })
        case 'SHOW_COMPLETED':
            return channels.filter(channel => channel.completed)
        case 'SHOW_ACTIVE':
            return channels.filter(channel => !channel.completed)
    }
}

const mapStateToProps = (state) => {
    return {
        channels: getVisibleTodos(state.channels, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {

    dispatch(send('fetch-channels'));
    
    return {
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
