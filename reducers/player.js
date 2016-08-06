const initialState = {id: "0", display: true, width: 0, height: 0};

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
        case 'TOGGLE_PLAYER':
            return Object.assign({}, state, {
                display: player.display
            });
        default:
            return state
    }
}
export default player
