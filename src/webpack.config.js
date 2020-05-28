const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const path = require('path')

const bundle = {
    entry: path.join(__dirname, '/main.jsx'),
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../public/assets'),
        filename: 'js/bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.jsx$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.scss|.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader?url=false'
            },
            {
                loader: 'sass-loader'
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    config: {
                        path: 'postcss.config.js'
                    }
                }
            }
            ]
        }
        ]

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                WEBPACK: true
            }
        })
    ]
}


module.exports = [bundle]