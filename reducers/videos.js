const videos = (state = [], action) => {
    const { videos } = action;
    switch (action.type) {
        case 'SEARCH_VIDEO':
            return videos
        default:
            return state
    }
}
export default videos
