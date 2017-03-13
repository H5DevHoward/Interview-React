const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.base.config');

const htmlFiles = glob.sync('*.html');
const htmlPlugins = htmlFiles.map((file, i) =>
    new HtmlWebpackPlugin({
        filename: path.basename(file),
        template: file,
        inject: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    })
);

config.plugins = (config.plugins || []).concat([
    ...htmlPlugins,
    new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '..'),
        verbose: true,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"',
        },
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
        },
    }),
    new CopyWebpackPlugin([
        {
            from: './',
        },
    ], {
        ignore: [
            'style/**/*',
            'script/**/*',
            'data.json',
        ],
    }),
]);

module.exports = config;
