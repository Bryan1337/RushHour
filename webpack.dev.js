const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonWebpackConfig = require('./webpack.common.js');
const path = require('path');

module.exports = {
    ...commonWebpackConfig,
    entry: [
        '@babel/polyfill',
        'react-refresh/runtime',
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
        disableHostCheck: true,
        port: 1337,
        hot: true,
    },
    plugins: [
        ...commonWebpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ]
};
