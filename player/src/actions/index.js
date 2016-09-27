export function playVideo(event, video) {
    return {type: 'PLAY_VIDEO', player: {
        id: video.id,
        playlist: ""
    }}
}
export function playPlaylist(event, videos) {
    let videoIds = videos.map((video, i) => {
        return video.snippet.resourceId.videoId
    })
    const playlistIndex = 0;
    const videoId = videoIds[playlistIndex];
    return {type: 'PLAY_PLAYLIST', player: {
        id: videoId,
        playlistIndex: playlistIndex,
        playlist: videoIds
    }}
}
export function playNextVideoInPlaylist(event, playlistIndex) {
    return {type: 'PLAY_NEXT_VIDEO_IN_PLAYLIST'}
}