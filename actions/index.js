export function loadSubscription(event, subscriptions) {
    return {type: 'LOAD_SUBSCRIPTION', subscriptions}
}
export function loadChannel(event, channels) {
    return {type: 'LOAD_CHANNEL', channels}
}
export function loadPlaylist(event, playlists) {
    return {type: 'LOAD_PLAYLIST', playlists}
}
export function loadVideo(event, videos) {
    return {type: 'LOAD_VIDEO', videos}
}
export function playVideo(event, video) {
    return {type: 'PLAY_VIDEO', player: {
        id: video.id,
        title: video.title
    }}
}
