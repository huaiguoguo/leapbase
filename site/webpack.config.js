module.exports = {
    entry: {
        webpack: './public/script/web/webpack.js',
        webpack2: './public/script/web/webpack2.js',
    },
    output: {
        filename: './public/script/web/[name]-bundle.js'
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
