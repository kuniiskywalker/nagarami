import { connect } from 'react-redux'
import PlaylistList from '../components/PlaylistList'
import createIpc, { send } from 'redux-electron-ipc';

function mapStateToProps(state) {
    return {
        playlists: state.playlists
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
