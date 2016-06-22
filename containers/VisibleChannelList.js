import { connect } from 'react-redux'
import ChannelList from '../components/ChannelList'

function getVisibleTodos(channels, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return channels.map((channel, i) => { return channel.snippet })
        case 'SHOW_COMPLETED':
            return channels.filter(channel => channel.completed)
        case 'SHOW_ACTIVE':
            return channels.filter(channel => !channel.completed)
    }
}
function mapStateToProps(state) {
    return {
        channels: getVisibleTodos(state.channels, state.visibilityFilter)
    }
}
const VisibleChannelList = connect(mapStateToProps)(ChannelList)
export default VisibleChannelList
