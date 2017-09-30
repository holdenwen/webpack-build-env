const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: [
            'vue',
            'vue-router',
            'lodash',
            'axios',
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ['style-loader', 'css-loader', 'sass-loader'],
                        },
                    }
                }
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
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash:8]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash:8]'
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            // watch: true
        }),
        new HtmlWebpackPlugin({
            title: 'webpack environment demo',
            template: path.resolve(__dirname, '../src/assets/index.html'),
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
            _: 'lodash',
            Ax: 'axios',
        }),
    ],
    resolve: {
        alias: {
            // library pathes
            lodash: path.resolve(__dirname, '../node_modules/lodash'),
            axios: path.resolve(__dirname, '../node_modules/axios'),
            Assets: path.resolve(__dirname, '../src/assets'),
            // custom pathes
            Components: path.resolve(__dirname, '../src/components'),
            Configs: path.resolve(__dirname, '../src/configs'),
            Views: path.resolve(__dirname, '../src/views'),
        },
        extensions: ['.vue', '.js', '.css', '.scss', '.json'],
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',  // Dynamic imports
        path: path.resolve(__dirname, '../dist')
    },
};