const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
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
            }
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
    ],
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
};