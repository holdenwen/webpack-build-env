const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: [
            'lodash',
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loder',
                    'css-loaer'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            // watch: true
        }),
        new HtmlWebpackPlugin({
            title: 'webpack environment demo'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' // Specify the common bundle's name.
        }),
        new ProvidePlugin({
            lodash: 'lodash'
        }),
    ],
    output: {
        filename: '[name]-[chunkhash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
};