export function loadChannels(event, channels) {
    return {type: 'LOAD_CHANNEL', channels}
}
export function loadVideos(event, videos) {
    return {type: 'LOAD_VIDEO', videos}
}
export function playVideo(event, video) {
    return {type: 'PLAY_VIDEO', player: {
        id: video.id,
        title: video.title
    }}
}