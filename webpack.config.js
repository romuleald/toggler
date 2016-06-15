var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: [
        // 'babel-polyfill',
        './es6-init'
    ],
    output: {
        path: path.join(__dirname, 'scripts'),
        filename: 'bundle.js',
        publicPath: ''
    },
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    compact: false,
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]

};


