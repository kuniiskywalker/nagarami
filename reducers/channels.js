const channels = (state = [], action) => {
    const { channels } = action;
    switch (action.type) {
        case 'LOAD_CHANNEL':
            return channels
        default:
            return state
    }
}
export default channels
