const video = (state, action) => {
    switch (action.type) {
        case 'PREVIEW_VIDEO':
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                preview: !state.preview
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
        case 'PREVIEW_VIDEO':
            return state.map(t =>
                video(t, action)
            )
        default:
            return state
    }
}
export default videos
