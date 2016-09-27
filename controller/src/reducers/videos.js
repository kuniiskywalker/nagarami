
const video = (state, action) => {
    switch (action.type) {
        case 'START_PREVIEW_VIDEO':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                thumbnail: action.thumbnail
            })
        case 'STOP_PREVIEW_VIDEO':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                thumbnail: action.thumbnail
            })
        default:
            return state
    }
}

const videos = (state = [], action) => {
    const { videos } = action;
    switch (action.type) {
        case 'SEARCH_VIDEO':
            return videos
        case 'START_PREVIEW_VIDEO':
        case 'STOP_PREVIEW_VIDEO':
            return state.map(t =>
                video(t, action)
            )
        default:
            return state
    }
}
export default videos
