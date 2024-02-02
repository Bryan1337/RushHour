const webpack = require('webpack');
const commonWebpackConfig = require('./webpack.common.js');
const path = require('path');

module.exports = {
    ...commonWebpackConfig,
    entry: [
        '@babel/polyfill',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'js/sst_web_presentations_bundle.[name].js',
        chunkFilename: 'js/sst_web_presentations_chunk.[name].js',
    },
    mode: 'development',
    devtool: 'source-map',
    watchOptions: {
        ignored: [
            '**/node_modules',
            '**/assets/**'
        ],
        followSymlinks: true,
        aggregateTimeout: 200,
    },
    devServer: {
        historyApiFallback: true,
        port: 13338,
        hot: true,
    },
    plugins: [
        ...commonWebpackConfig.plugins,
    ]
};