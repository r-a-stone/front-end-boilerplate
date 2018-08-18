import path from "path";

export default {
    patterns: {
        js: /\.(js|jsx)$/,
        styles: /\.(scss|css)$/,
        images: /.*\/Images\/.*\.(jpe?g|png|gif|svg)$/,
        fonts: /.*\/Fonts\/.*\.(eot|svg|ttf|woff|woff2)$/,
    },
    paths: {
        src: path.join( __dirname, '..', 'resources' ),
        bin: path.join( __dirname, '..', 'assets' ),
        www: 'assets/'
    }
};