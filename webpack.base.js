const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    frontend: {
        name: 'frontend',
        target: 'web',
        entry: path.join(__dirname, "src", "assets", "javascript", "entry.js"),
        output: {
            path: path.join(__dirname, 'bin', 'assets'),
            publicPath: '/assets/',
            filename: "[chunkhash].js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }, {
                    test: /\.(scss|css)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            }, {
                                loader: "sass-loader",
                                options: {
                                    includePaths: [
                                        path.join(__dirname, 'node_modules', 'include-media', 'dist'),
                                        path.join(__dirname, 'node_modules', 'normalize-scss', 'sass')
                                    ]
                                }
                            }, {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: [
                                        path.join(__dirname, 'src', 'assets', 'sass', '_functions.scss'),
                                        path.join(__dirname, 'src', 'assets', 'sass', '_variables.scss'),
                                        path.join(__dirname, 'src', 'assets', 'sass', '_mixins.scss')
                                    ]
                                }
                            }
                        ]
                    })
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({title: 'Front End Boilerplate', template: 'src/template.html', filename: '../index.html'}),
            new ManifestPlugin({
                fileName: path.join(__dirname, 'bin', 'manifest.json'),
                publicPath: '/assets/'
            }),
            new WebpackCleanupPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: process.env.NODE_ENV
                }
            }),
            new ExtractTextPlugin('[hash].css'),
            new webpack
                .optimize
                .CommonsChunkPlugin({
                    name: "common",
                    minChunks: function (module) {
                        return module.context && module
                            .context
                            .indexOf("node_modules") !== -1;
                    }
                }),
            new webpack
                .optimize
                .CommonsChunkPlugin({name: "manifest", minChunks: Infinity}),
            new CopyWebpackPlugin([
                {
                    from: 'src/assets/images/',
                    to: 'images/'
                }
            ])
        ]
    }
};