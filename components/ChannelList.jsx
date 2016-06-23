import React, { PropTypes } from 'react'
//import createIpc, { send } from 'redux-electron-ipc';
import Channel from './Channel'

const ChannelList = ({ channels, onChannelClick }) => (
    <ul>
    {channels.map((channel, i) =>
            <Channel
                key={channel.id}
        {...channel}
                onClick={() => onChannelClick(channel.id)}
            />
    )}
    </ul>
)

ChannelList.propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onChannelClick: PropTypes.func.isRequired
}
export default ChannelList
