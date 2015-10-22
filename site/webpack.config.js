'user restrict'
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'public/script/web'),
    entry: {
        webpack: './webpack.js',
        webpack2: './webpack2.js',
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
    }
}
