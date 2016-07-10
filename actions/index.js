export function fetchSubscription(event, subscriptions) {
    return {type: 'FETCH_SUBSCRIPTION', subscriptions}
}
export function searchChannel(event, channels) {
    return {type: 'SEARCH_CHANNEL', channels}
}
export function searchPlaylist(event, playlists) {
    return {type: 'SEARCH_PLAYLIST', playlists}
}
export function searchVideo(event, videos) {
    return {type: 'SEARCH_VIDEO', videos}
}
export function playVideo(event, video) {
    return {type: 'PLAY_VIDEO', player: {
        id: video.id
    }}
}
export function showPlayer(event) {
    return {type: 'SHOW_PLAYER'}
}
export function hidePlayer(event) {
    return {type: 'HIDE_PLAYER'}
}
export function previewVideo(videoId) {
    return {type: 'PREVIEW_VIDEO', id: videoId}
}