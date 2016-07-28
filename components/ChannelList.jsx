import React, { PropTypes } from 'react'
import SearchKeywordTextField from './SearchKeywordTextField'
import Channel from './Channel'

import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24
    }
};

const ChannelList = ({ channels, onSearchChannel, onChannelClick }) => (
    <div style={styles.root}>
        <SearchKeywordTextField onSearch={onSearchChannel} placeholder="search channel" />
        <GridList
            cellHeight={200}
            style={styles.gridList}
        >
            {channels.map((channel, i) =>
                <Channel
                    key={channel.id}
                    {...channel}
                    onClick={() => onChannelClick(channel.id)}
                />
            )}
        </GridList>
    </div>
)

ChannelList.propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onSearchChannel: PropTypes.func.isRequired,
    onChannelClick: PropTypes.func.isRequired
}
export default ChannelList
