const playlists = (state = [], action) => {
    const { playlists } = action;
    switch (action.type) {
        case 'LOAD_PLAYLIST':
            return playlists
        default:
            return state
    }
}
export default playlists
