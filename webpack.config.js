let webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
let path=require('path');

let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:{
        "mongoqp":"./src",
        "mongoqp.min":"./src"
    },
    mode:"none",
    output:{
        path: path.resolve(__dirname,"./lib/"),
        filename:"[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [{loader:'ts-loader',
				options:{
					configFile: 'webpack.tsconfig.json'
				}}]
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
            ecma:8,
            ie8:false,
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

};