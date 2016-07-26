const initialState = {id: "0", display: true};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
        case 'PLAY_VIDEO':
            return player
        case 'TOGGLE_PLAYER':
            return Object.assign({}, state, {
                display: player.display
            });
        default:

            return state
    }
}
export default player
