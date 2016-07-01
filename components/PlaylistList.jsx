import React, { PropTypes } from 'react'
import SearchPlaylist from '../containers/SearchPlaylist'
import Playlist from './Playlist'

const PlaylistList = ({ playlists, onPlaylistClick }) => (
    <div>
        <SearchPlaylist />
        <ul>
            {playlists.map((playlist, i) =>
                <Playlist
                    key={playlist.id}
                    {...playlist}
                    onClick={() => onPlaylistClick(playlist.id)}
                />
            )}
        </ul>
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
    onPlaylistClick: PropTypes.func.isRequired
}
export default PlaylistList
