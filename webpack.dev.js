const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = [merge(baseConfig.frontend, {
        plugins: [new LiveReloadPlugin()],
        devServer: {
            contentBase: path.join(__dirname, "bin"),
            index: 'index.html',
            compress: true,
            port: 9000,
            historyApiFallback: true
        }
    })]