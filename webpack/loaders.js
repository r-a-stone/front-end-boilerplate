import config from './config';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import path from "path";

export const JSLoader = {
    test: config.patterns.js,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
};

export const StyleLoader = {
    test: config.patterns.styles,
    use: ExtractTextPlugin.extract( {
        fallback: 'style-loader',
        use: [
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: ( () => {
                        switch ( process.env.NODE_ENV ) {
                            case "production":
                            case "staging":
                                return '[hash:base64:10]';
                            default:
                                return '[local]__[hash:base64:5]';
                        }
                    } )()
                }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: "sass-loader"
            }, {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        path.join( config.paths.src, 'Sass', '_functions.scss' ),
                        path.join( config.paths.src, 'Sass', '_variables.scss' ),
                        path.join( config.paths.src, 'Sass', '_mixins.scss' )
                    ]
                }
            } ]
    } )
};

export const ImageLoader = {
    test: config.patterns.images,
    exclude: /node_modules/,
    loader: 'file-loader',
    options: {
        emitFile: true,
        outputPath: 'images/',
        publicPath: '/images/',
        name: '[name].[ext]?[hash]'
    }
};


export const FontLoader = {
    test: config.patterns.fonts,
    exclude: /node_modules/,
    loader: 'file-loader',
    options: {
        emitFile: true,
        outputPath: 'fonts/',
        publicPath: '/fonts/',
        name: '[hash].[ext]'
    }
};