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
            return videos.map((video, i) => {
                return {
                    id: video.id.videoId,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnail: video.snippet.thumbnails.default.url,
                    preview: false
                }
            }).filter((element) => {
                return element.id != "" && element.id != undefined
            })
        case 'PREVIEW_VIDEO':
            return state.map(t =>
                video(t, action)
            )
        default:
            return state
    }
}
export default videos
