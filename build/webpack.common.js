const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    // publicPath: ''
                }),
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
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:8].css',
            disable: false,
            allChunks: true,
        }),
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'  // Specify the common bundle's name
        }),
        // https://webpack.js.org/guides/caching/#extracting-boilerplate
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'  // Differ from vender's codes
        }),
        // https://webpack.js.org/plugins/provide-plugin/
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
    ],
    resolve: {
        alias: {
            lodash: path.resolve(__dirname, '../node_modules/lodash'),
        },
        extensions: ['.vue', '.js', '.css', 'scss', 'json'],
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',  // Dynamic imports
        path: path.resolve(__dirname, '../dist')
    },
};