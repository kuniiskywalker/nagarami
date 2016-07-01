import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import ChannelList from '../components/ChannelList'

function getVisibleTodos(channels, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return channels.map((channel, i) => {
                return {
                    id: channel.snippet.channelId,
                    title: channel.snippet.channelTitle,
                    thumbnail: channel.snippet.thumbnails.default.url
                }
            }).filter((element) => {
                return element.id != ""
            })
        //case 'SHOW_ALL':
        //    return channels.map((channel, i) => {
        //        const value = channel.snippet;
        //        return {
        //            id: value.resourceId.channelId,
        //            thumbnail: value.thumbnails.default.url
        //        }
        //    }).filter((element) => {
        //        return element.id != ""
        //    })
    }
}

const mapStateToProps = (state) => {
    return {
        channels: getVisibleTodos(state.channels, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {

    //dispatch(send('fetch-subscriptions'));
    
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
