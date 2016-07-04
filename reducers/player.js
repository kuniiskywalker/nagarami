const initialState = {id: "0", display: true};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
        case 'PLAY_VIDEO':
            return player
        case 'SHOW_PLAYER':
            return Object.assign({}, state, {
                display: true
            });
        case 'HIDE_PLAYER':
            return Object.assign({}, state, {
                display: false
            })
        default:

            return state
    }
}
export default player
