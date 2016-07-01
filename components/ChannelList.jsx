import React, { PropTypes } from 'react'
import SearchChannel from '../containers/SearchChannel'
import Channel from './Channel'

const ChannelList = ({ channels, onChannelClick }) => (
    <div>
        <SearchChannel />
        <ul>
            {channels.map((channel, i) =>
                <Channel
                    key={channel.id}
                    {...channel}
                    onClick={() => onChannelClick(channel.id)}
                />
            )}
        </ul>
    </div>
)

ChannelList.propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onChannelClick: PropTypes.func.isRequired
}
export default ChannelList
