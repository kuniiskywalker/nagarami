const initialState = {id: "0", display: true, width: 0, height: 0, playlist: [], playlistIndex: 0};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
        case 'TOGGLE_PLAYER':
            return Object.assign({}, state, {
                display: player.display
            });
        default:
            return state
    }
}
export default player
