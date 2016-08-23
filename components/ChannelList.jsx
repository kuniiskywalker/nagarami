import React, { PropTypes } from 'react'
//import createIpc, { send } from 'redux-electron-ipc';
import Channel from './Channel'

const ChannelList = ({ subscriptions }) => (
    <ul>
    {subscriptions.map((subscription, i) =>
        <Channel
            key={subscription.id}
            {...subscription}
            handleChannelClick={() => {}}
        />
    )}
    </ul>
)

ChannelList.propTypes = {
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired
}
export default ChannelList
