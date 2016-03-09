'user restrict'
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'public/script/web'),
    entry: {
        webpack: './webpack.js'
    },
    output: {
        path: path.join(__dirname, 'public/script/web'),
        filename: './[name]-bundle.js'
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
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common-bundle.js')
    ]
}
