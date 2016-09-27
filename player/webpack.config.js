module.exports = {
    entry: {
        "player": "./src/index.jsx"
    },
    output: {
        path: './public/assets/js/',
        filename: "bundle.js"
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