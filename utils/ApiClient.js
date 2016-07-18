import youtube from 'youtube-api'

function ApiClient (credentials) {
    this.oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        redirect_url: credentials.redirect_uri
    });
}

// tokenの有効性チェック
ApiClient.prototype.isTokenExpired = function() {

    var oauth = this.oauth;

    var thisCreds = oauth.credentials;

    if (!thisCreds.access_token && !thisCreds.refresh_token) {
        return false;
    }

    var expiryDate = thisCreds.expiry_date;
    var isTokenExpired = expiryDate ? expiryDate <= (new Date()).getTime() : false;

    if (thisCreds.access_token && !isTokenExpired) {
        return true;
    }
    return false;
}

// トークン取得
ApiClient.prototype.getTokenByCode = function(code) {
    return new Promise((resolve, reject) => {
        this.oauth.getToken(code, (err, token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};

// トークンをリフレッシュ
ApiClient.prototype.refreshToken = function() {
    return new Promise((resolve, reject) => {
        this.oauth.refreshAccessToken((err, token, response) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};

// トークンをセット
ApiClient.prototype.setToken = function(token) {
    this.oauth.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expiry_date: token.expiry_date
    });
    youtube.authenticate({
        type: "key",
        key: this.oauth
    });
};

// ログアウト
ApiClient.prototype.logout = function(access_token) {
    return new Promise((resolve, reject) => {
        this.oauth.revokeToken(access_token, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

// 認証用URL取得
ApiClient.prototype.getAuthUrl = function(scope) {
    return this.oauth.generateAuthUrl({
        access_type: 'offline',
        scope: scope
    });
}

// 自分のチャンネル一覧を取得
ApiClient.prototype.fetchSubscriptions = function(apikey) {
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
ApiClient.prototype.searchChannel = function(apikey, q) {
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
};

// 動画検索
ApiClient.prototype.searchVideo = function(apikey, q) {
    return new Promise((resolve, reject) => {
        youtube.search.list({
            part: 'snippet',
            q: q,
            type: 'video',
            order: 'date',
            maxResults: 50,
            key: apikey
        }, function (a, result, response) {
            resolve(result.items);
        });
    });
};

// プレイリスト検索
ApiClient.prototype.searchPlaylist = function(apikey, q) {
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
};

module.exports = ApiClient
