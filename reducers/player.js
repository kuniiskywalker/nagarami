const initialState = {id: "0", title: "test"};

const player = (state = initialState, action) => {
    const { player } = action;
    switch (action.type) {
        case 'PLAY_VIDEO':
            return player
        default:

            return state
    }
}
export default player
