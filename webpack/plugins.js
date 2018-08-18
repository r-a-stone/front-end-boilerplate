import path from "path";
import config from './config';
import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import WebpackCleanupPlugin from "webpack-cleanup-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import ImageminPlugin from "imagemin-webpack-plugin";
import LiveReloadPlugin from "webpack-livereload-plugin";

export const LiveReload = new LiveReloadPlugin();

export const Define = new webpack.DefinePlugin({
    "process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")}
});

export const AssetManifest = new ManifestPlugin({
    fileName: path.join(config.paths.bin, 'asset-manifest.json'),
    publicPath: config.paths.www
});

export const Clean = new WebpackCleanupPlugin({
    exclude: [
        "Images/**/*",
        "Fonts/**/*"
    ],
});

export const ExportCSS = new ExtractTextPlugin('[chunkhash].css');

export const CommonChunk = new webpack.optimize.CommonsChunkPlugin({
    name: "common",
    filename: '[chunkhash].js',
    minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
    }
});

export const ImageMin = new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    pngquant: {
        quality: '95-100'
    }
});

export const UglifyJS = new webpack.optimize.UglifyJsPlugin((() => {
    switch (process.env.NODE_ENV) {
        case "production":
            return {
                sourceMap: false,
                mangle: true
            };
        case "staging":
            return {
                sourceMap: true,
                mangle: true
            };
        default:
            return {
                sourceMap: true,
                mangle: false
            };
    }
})());