module.exports = {
    entry: {
        "controller": "./controller.jsx",
        "player": "./player.jsx"
    },
    output: {
        path: './build/',
        filename: "[name].js"
    },
    target: 'atom',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};