module.exports = {
    plugins: {
        'postcss-preset-env': {
            browsers: 'last 2 versions'
        },
        'postcss-pxtorem': {
            rootValue: 16,
            unitPrecision: 5,
            propList: [
                'font',
                'font-size',
                'line-height',
                'letter-spacing',
                'margin',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left'
            ],
            replace: true,
            mediaQuery: false,
        },
        'cssnano': {
            preset: 'default'
        }
    }
};