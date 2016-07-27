import React, { PropTypes } from 'react'
import SearchKeywordTextField from './SearchKeywordTextField'
import Playlist from './Playlist'

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

const PlaylistList = ({ playlists, onSearchPlaylist, onPlaylistClick }) => (
    <div style={styles.root}>
        <SearchKeywordTextField onSearch={onSearchPlaylist} />
        <GridList
            cellHeight={200}
            style={styles.gridList}
        >
            {playlists.map((playlist, i) =>
                <Playlist
                    key={playlist.id}
                    {...playlist}
                    onClick={() => onPlaylistClick(playlist.id)}
                />
            )}
        </GridList>
    </div>
)
PlaylistList.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        channelId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onSearchPlaylist: PropTypes.func.isRequired,
    onPlaylistClick: PropTypes.func.isRequired
}
export default PlaylistList
