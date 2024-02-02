const commonWebpackConfig = require('./webpack.common.js');
const path = require('path');

module.exports = {
    ...commonWebpackConfig,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'js/rush_hour_bundle.[id].js',
        chunkFilename: 'js/rush_hour_chunk[name].[contenthash].js',
        clean: true,
    },
    stats: {
        all: false,
        assets: true,
        assetsSort: "!size",
        errors: true,
        builtAt: false,
    },
};
