import path from 'path';
import config from './webpack/config';
import resolve from './webpack/resolve';
import * as loaders from './webpack/loaders';
import * as plugins from './webpack/plugins';

const webpackCommonConfig = {
    target: 'web',
    devtool: 'source-map',
    entry: path.join( config.paths.src, "index.js" ),
    output: {
        path: path.join( config.paths.bin ),
        publicPath: config.paths.www,
        filename: "[chunkhash].js"
    },
    resolve,
    module: {
        rules: [
            loaders.JSLoader,
            loaders.StyleLoader,
            loaders.FontLoader,
            loaders.ImageLoader
        ]
    },
    plugins: [
        plugins.Define,
        plugins.AssetManifest,
        plugins.Clean,
        plugins.CommonChunk,
        plugins.ExportCSS,
        plugins.CommonChunk
    ]
};

const webpackDevelopmentConfig = {
    ...webpackCommonConfig,
    plugins: [
        ...webpackCommonConfig.plugins,
        plugins.LiveReload
    ]
};

const webpackStagingConfig = {
    ...webpackCommonConfig
};

const webpackProductionConfig = {
    ...webpackCommonConfig,
    devtool: false
};

export default ( () => {
    switch ( process.env.NODE_ENV ) {
        case 'production':
            return webpackProductionConfig;
        case 'staging':
            return webpackStagingConfig;
        default:
            return webpackDevelopmentConfig;
    }
} )();