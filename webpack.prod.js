const commonWebpackConfig = require('./webpack.common.js');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
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
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015',
                css: true,
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
};
