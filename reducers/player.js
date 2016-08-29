const initialState = {id: "0", display: true, width: 0, height: 0, playlist: [], playlistIndex: 0};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
        case 'CHANGE_SCREEN_SIZE':
            return Object.assign({}, state, {
                width: player.width - 16,
                height: player.height - 16
            });
        case 'PLAY_VIDEO':
            return Object.assign({}, state, player);
        case 'PLAY_PLAYLIST':
            return Object.assign({}, state, {
                id: player.id,
                playlistIndex: player.playlistIndex,
                playlist: player.playlist
            });
        case 'PLAY_NEXT_VIDEO_IN_PLAYLIST':
            if (state.playlist.length === 0) {
                return {
                    id: state.id,
                    playlistIndex: state.playlistIndex
                };
            }
            const playlistIndex = state.playlistIndex + 1;
            if (state.playlist.length === playlistIndex) {
                return {
                    id: state.id,
                    playlistIndex: state.playlistIndex
                };
            }
            const videoId = state.playlist[playlistIndex];
            return Object.assign({}, state, {
                id: videoId,
                playlistIndex: state.playlistIndex + 1
            });
        case 'TOGGLE_PLAYER':
            return Object.assign({}, state, {
                display: player.display
            });
        default:
            return state
    }
}
export default player
