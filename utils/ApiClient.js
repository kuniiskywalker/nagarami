import youtube from 'youtube-api'

function ApiClient (credentials) {
    this.oauth = youtube.authenticate({
        type: "oauth",
        client_id: credentials.web.client_id,
        client_secret: credentials.web.client_secret,
        redirect_url: credentials.web.redirect_uris[0]
    });
}

ApiClient.prototype.setOauth = function(oauth) {
    this.oauth = oauth;
    youtube.authenticate({
        type: "key",
        key: oauth
    });
}

//
ApiClient.prototype.getToken = function(token) {
    return new Promise((resolve, reject) => {
        this.oauth.getToken(token, (err, token_info) => {
            if (err) {
                reject("アクセストークンファイルが開けません");
                return;
            }
            resolve(token_info);
        });
    });
};

// 認証用URL取得
ApiClient.prototype.getAuthUrl = function(scope) {
    return this.oauth.generateAuthUrl({
        //access_type: 'offline',
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
            
            
            console.log(result);
            console.log(response);

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
