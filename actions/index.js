// IPCで登録チャンネル一覧をうけとるアクション
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

// IPCで検索したチャンネル一覧をうけとるアクション
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

// IPCで検索したプレイリストうけとるアクション
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

// IPCで検索したプレイリストうけとるアクション
export function searchVideo(event, videos) {
    return {type: 'SEARCH_VIDEO', videos: videos}
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
export function startPreviewVideo(videoId, thumbnail) {
    return {type: 'START_PREVIEW_VIDEO', id: videoId, thumbnail: thumbnail}
}
export function stopPreviewVideo(videoId, thumbnail) {
    return {type: 'STOP_PREVIEW_VIDEO', id: videoId, thumbnail: thumbnail}
}
export function authorization(event, is_logged_in) {
    return {type: 'AUTHORIZATION', auth: {
        is_logged_in: is_logged_in
    }}
}

export function setSearchConditions(condition) {
    return {type: 'SET_SEARCH_CONDITIONS', searchConditions: condition}
}