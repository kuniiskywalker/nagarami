import youtube from 'youtube-api'

function YoutubeClient (credentials) {
    this.oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        redirect_url: credentials.redirect_uri
    });
}

// tokenの有効性チェック
YoutubeClient.prototype.isTokenExpired = function() {

    const oauth = this.oauth;

    const thisCreds = oauth.credentials;

    if (!thisCreds.access_token && !thisCreds.refresh_token) {
        return false;
    }

    const expiryDate = thisCreds.expiry_date;
    const isTokenExpired = expiryDate ? expiryDate <= (new Date()).getTime() : false;

    if (thisCreds.access_token && !isTokenExpired) {
        return true;
    }
    return false;
}

// トークン取得
YoutubeClient.prototype.getTokenByCode = function(code) {
    return new Promise((resolve, reject) => {
        this.oauth.getToken(code, (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}

// トークンをリフレッシュ
YoutubeClient.prototype.refreshToken = function() {
    return new Promise((resolve, reject) => {
        this.oauth.refreshAccessToken((err, token, response) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}

// トークンをセット
YoutubeClient.prototype.setToken = function(token) {
    this.oauth.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expiry_date: token.expiry_date
    });
    youtube.authenticate({
        type: "key",
        key: this.oauth
    });
}

// ログアウト
YoutubeClient.prototype.logout = function(access_token) {
    return new Promise((resolve, reject) => {
        this.oauth.revokeToken(access_token, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

// 認証用URL取得
YoutubeClient.prototype.getAuthUrl = function(scope) {
    return this.oauth.generateAuthUrl({
        access_type: 'offline',
        scope: scope
    });
}

// 自分のチャンネル一覧を取得
YoutubeClient.prototype.fetchSubscriptions = function(apikey) {
    return new Promise((resolve, reject) => {
        youtube.subscriptions.list({
            part: 'snippet',
            mine: true,
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
}

// チャンネル検索
YoutubeClient.prototype.searchChannel = function(apikey, q) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'snippet',
            q: q,
            type: 'channel',
            order: 'date',
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
}

// 動画検索
YoutubeClient.prototype.searchVideo = function(apikey, q, order) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'snippet',
            q: q,
            type: 'video',
            order: order,
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
}

// プレイリスト検索
YoutubeClient.prototype.searchPlaylist = function(apikey, q) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'snippet',
            q: q,
            type: 'playlist',
            order: 'date',
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
}

// チャンネル動画取得
YoutubeClient.prototype.fetchChannelVideo = function(apikey, channelId) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'snippet',
            channelId: channelId,
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
}

module.exports = YoutubeClient