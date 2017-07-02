const path = require('path');

module.exports = {
    entry: './app/assets/javascripts/app.ts',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'app/assets/javascripts/'),  
        filename: 'bundle.js',
        publicPath: '/app/assets/javascript/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}