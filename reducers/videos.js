const videos = (state = [], action) => {
    const { videos } = action;
    switch (action.type) {
        case 'LOAD_VIDEO':
            return videos
        default:
            return state
    }
}
export default videos
