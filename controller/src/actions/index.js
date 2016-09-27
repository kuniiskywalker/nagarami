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

// IPCで登録プレイリストをうけとるアクション
export function fetchPlaylists(event, playlists) {
    const data = playlists.map((playlist, i) => {
        return {
            id: playlist.id,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            thumbnail: playlist.snippet.thumbnails.default.url
        }
    }).filter((element) => {
        return element.id != "" && element.id != undefined
    })
    return {type: 'FETCH_PLAYLIST', playlists: data};
}

//// IPCで検索したチャンネル一覧をうけとるアクション
//export function searchChannel(event, channels) {
//    const data = channels.map((channel, i) => {
//        return {
//            id: channel.snippet.channelId,
//            title: channel.snippet.channelTitle,
//            thumbnail: channel.snippet.thumbnails.high.url
//        }
//    }).filter((element) => {
//        return element.id != ""
//    })
//    return {type: 'SEARCH_CHANNEL', channels: data}
//}
//
//// IPCで検索したプレイリストうけとるアクション
//export function searchPlaylist(event, playlists) {
//    const data = playlists.map((playlist, i) => {
//        return {
//            id: playlist.id.playlistId,
//            channelId: playlist.snippet.channelId,
//            title: playlist.snippet.channelTitle,
//            description: playlist.snippet.description,
//            thumbnail: playlist.snippet.thumbnails.default.url
//        }
//    }).filter((element) => {
//        return element.id != "" && element.id != undefined
//    })
//    return {type: 'SEARCH_PLAYLIST', playlists: data}
//}

// IPCで検索したプレイリストうけとるアクション
export function searchVideo(event, videos) {
    const data = videos.map((video, i) => {
        return {
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            description: video.snippet.description,
            viewCount: video.statistics.viewCount,
            likeCount: video.statistics.likeCount || '0',
            dislikeCount: video.statistics.dislikeCount || '0'
        }
    }).filter((element) => {
        return element.id != "" && element.id != undefined
    })
    return {type: 'SEARCH_VIDEO', videos: data}
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
export function authorization(event, isLoggedIn) {
    return {type: 'AUTHORIZATION', auth: {
        isLoggedIn: isLoggedIn
    }}
}
export function setSearchKeyword(keyword) {
    return {type: 'SET_SEARCH_KEYWORD', searchConditions: {
        channelId: "",
        keyword: keyword
    }}
}
export function setSearchChannelId(channelId) {
    return {type: 'SET_SEARCH_CHANNEL_ID', searchConditions: {
        channelId: channelId,
        keyword: "",
        sort: "date"
    }}
}
export function setSearchSort(sort) {
    return {type: 'SET_SEARCH_SORT', searchConditions: {
        sort: sort
    }}
}