import { connect } from 'react-redux'
import PlaylistList from '../components/PlaylistList'
import createIpc, { send } from 'redux-electron-ipc';

function getVisibleTodos(playlists, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return playlists.map((playlist, i) => {
                return {
                    id: playlist.id.playlistId,
                    channelId: playlist.snippet.channelId,
                    title: playlist.snippet.channelTitle,
                    description: playlist.snippet.description,
                    thumbnail: playlist.snippet.thumbnails.default.url
                }
            }).filter((element) => {
                return element.id != "" && element.id != undefined
            })
    }
}
function mapStateToProps(state) {
    return {
        playlists: getVisibleTodos(state.playlists, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaylistClick: (playlistId) => {
            dispatch(send('select-playlist', playlistId));
        }
    }
}

const VisiblePlaylistList = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistList)

export default VisiblePlaylistList
