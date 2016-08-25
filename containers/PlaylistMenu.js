import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';

import PlaylistList from '../components/PlaylistList';

//import { setSearchChannelId } from '../actions';

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPlaylists: () => {
            dispatch(send('fetch-playlists'));
        },
        onPlaylistClick: (playlistId) => {
            if (!playlistId) {
                return false;
            }
            dispatch(send('play-playlist', playlistId));
            
        }
    }
}

const PlaylistMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistList)

export default PlaylistMenu
