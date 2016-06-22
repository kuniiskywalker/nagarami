import React, { PropTypes } from 'react'
import createIpc, { send } from 'redux-electron-ipc';

class ChannelList extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(send('fetch-channels'));
    }
    render() {
        const { channels } = this.props
        return (
            <ul>
            {channels.map((channel, i) =>
                <li key={i}>
                <img src={channel.thumbnails.default.url} />
                </li>
            )}
            </ul>
        )
    }
}

ChannelList.propTypes = {
    channels: PropTypes.array.isRequired
}
export default ChannelList
