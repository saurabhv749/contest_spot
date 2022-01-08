const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
            path: path.join(__dirname,'/build'),
            filename: 'bundle.js'
         },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:{loader:'babel-loader'},
                exclude:/node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type:'asset/resource'
            }
        ]
    },
    plugins:[ new htmlWebpackPlugin({
        template: './src/index.html',
        inject:'body',
        minify:true
    }) ,
    new MiniCssExtractPlugin({
        filename:'ext-style.css'
    })
],
    optimization: {
        minimizer: [  
            new CssMinimizerPlugin(),
             new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                      comments: false,
                    }
                  } 
                }) 
        ]
      }
}