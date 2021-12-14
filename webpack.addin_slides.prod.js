const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
    mode: 'production',
    entry: {
        podium: './src/index_podium.js',
        leaderboard: './src/index_leaderboard.js',
        participants: './src/index_participants.js',
        emoji: './src/index_emoji_overlay.js',
        // columnChart: './src/components/shared/charts/columnChart.js'
    },
    output: {
        path: path.resolve(__dirname, 'build_addin_slides'),
        filename: 'quiz_[name].bundle.js',
    },
    optimization: {
        // runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/addin_templates/podium.html",
            inject: true,
            chunks: ['podium', 'vendor'],
            filename: "./podium.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/addin_templates/leaderboard.html",
            inject: true,
            chunks: ['leaderboard', 'vendor'],
            filename: "./leaderboard.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/addin_templates/participants.html",
            inject: true,
            chunks: ['participants', 'vendor'],
            filename: "./participants.html"
        }),
        new HtmlWebPackPlugin({
            template: "./src/addin_templates/emoji.html",
            inject: true,
            chunks: ['emoji', 'vendor'],
            filename: "./emoji.html"
        }),
        // new HtmlWebPackPlugin({
        //     template: "./src/components/shared/charts/index.html",
        //     inject: true,
        //     filename: "./podium.html"
        // }),
    ]
});
