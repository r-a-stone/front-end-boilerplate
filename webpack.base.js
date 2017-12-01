const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');

module.exports = {
    frontend: {
        name: 'frontend',
        target: 'web',
        entry: path.join(config.paths.src, "assets", "javascript", "entry.js"),
        output: {
            path: path.join(config.paths.bin, 'assets'),
            publicPath: config.paths.www,
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
                                        path.join(__dirname, 'node_modules', 'include-media', 'dist', '_include-media.scss'),
                                        path.join(config.paths.src, 'assets', 'sass', 'abstract', '_functions.scss'),
                                        path.join(config.paths.src, 'assets', 'sass', 'abstract', '_variables.scss'),
                                        path.join(config.paths.src, 'assets', 'sass', 'abstract', '_mixins.scss'),
                                        path.join(config.paths.src, 'assets', 'sass', 'abstract', '_layout.scss')
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
                fileName: path.join(config.paths.bin, 'manifest.json'),
                publicPath: config.paths.www
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
                    from: path.join(config.paths.src, 'assets', 'images'),
                    to: path.join(config.paths.bin, 'assets', 'images')
                }
            ]),
            new KssWebpackPlugin({
                source: path.join(config.paths.src, 'assets'),
                destination: path.join(config.paths.bin, 'styleguide')
            })
        ]
    }
};