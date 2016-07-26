export function fetchSubscription(event, subscriptions) {
    const data = subscriptions.map((channel, i) => {
        const value = channel.snippet;
        return {
            id: value.resourceId.channelId,
            thumbnail: value.thumbnails.high.url,
            title: value.title
        }
    }).filter((element) => {
        return element.id != ""
    })
    return {type: 'FETCH_SUBSCRIPTION', subscriptions: data}
}
export function searchChannel(event, channels) {
    const data = channels.map((channel, i) => {
        return {
            id: channel.snippet.channelId,
            title: channel.snippet.channelTitle,
            thumbnail: channel.snippet.thumbnails.high.url
        }
    }).filter((element) => {
        return element.id != ""
    })
    return {type: 'SEARCH_CHANNEL', channels: data}
}
export function searchPlaylist(event, playlists) {
    const data = playlists.map((playlist, i) => {
        return {
            id: playlist.id.playlistId,
            channelId: playlist.snippet.channelId,
            title: playlist.snippet.channelTitle,
            description: playlist.snippet.description,
            thumbnail: playlist.snippet.thumbnails.default.url
        }
    }).filter((element) => {
        return element.id != "" && element.id != undefined
    })
    return {type: 'SEARCH_PLAYLIST', playlists: data}
}
export function searchVideo(event, videos) {
    const data = videos.map((video, i) => {
        return {
            id: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails.high.url,
            preview: false
        }
    }).filter((element) => {
        return element.id != "" && element.id != undefined
    })
    return {type: 'SEARCH_VIDEO', videos: data}
}
export function playVideo(event, video) {
    return {type: 'PLAY_VIDEO', player: {
        id: video.id
    }}
}
export function togglePlayer(event, display) {
    return {type: 'TOGGLE_PLAYER', player: {
        display: display 
    }}
}
export function previewVideo(videoId) {
    return {type: 'PREVIEW_VIDEO', id: videoId}
}
export function authorization(event, is_logged_in) {
    return {type: 'AUTHORIZATION', auth: {
        is_logged_in: is_logged_in
    }}
}