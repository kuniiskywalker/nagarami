const initialState = {id: "0", display: true, width: 0, height: 0, playlist: [], playlistIndex: 0};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
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
                return state;
            }
            const playlistIndex = state.playlistIndex + 1;
            if (state.playlist.length === playlistIndex) {
                return state;
            }
            const videoId = state.playlist[playlistIndex];
            return Object.assign({}, state, {
                id: videoId,
                playlistIndex: state.playlistIndex + 1
            });
        default:
            return state
    }
}
export default player
