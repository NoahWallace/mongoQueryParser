let webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
let path=require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:{
        "mongoqp":"./src",
        "mongoqp.min":"./src"
    },
    output:{
        path:"./lib/",
        filename:"[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins:[
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, './lib/cached_uglify/'),
            include: /\.min\.js$/,
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['dist', 'lib'], {
            root: __dirname + '/',
            verbose: true,
            dry: false
        })
    ],
    ts:{
        configFileName:"webpack.tsconfig.json"
    }
};