module.exports = {
    entry: './public/script/web/webpack.js',
    output: {
        filename: './public/script/web/webpack-bundle.js'
    },
    devtool: 'source-map',
    module: {
        preloaders: [
            { test: /\.js$/, exclude: /node_modules/, loader:'jshint-loader' }
        ],
        loaders: [
            { test: /.css$/, loaders: ['style', 'css'] },
            { test: /\.html$/, loader: 'raw' }
        ]
    }
}
