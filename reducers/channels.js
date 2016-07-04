const channels = (state = [], action) => {
    const { channels } = action;
    switch (action.type) {
        case 'SEARCH_CHANNEL':
            return channels
        default:
            return state
    }
}
export default channels
