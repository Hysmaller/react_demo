var webpack = require('webpack');
var path = require('path');
var ServerConfig = require("./webpack.server");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var baseConfig = {
    entry: {},
    output:{
        path:__dirname,
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.(scss|css)$/,
                include: __dirname,
                loader: 'style!css!sass'
            }
        ]
    },

    devServer:ServerConfig,
    plugins:[
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM:"react-dom"
        }),
    ]
};

var pages = [
    {
        chunkName:"demo",
        path:path.join( __dirname , '/src/js/index.jsx')
    }
];


pages.map(function ( file , index ) {
    baseConfig.entry[ file.chunkName] = [ file.path ];
    baseConfig.plugins.push( new HtmlWebpackPlugin({
        template:"./server.template.html",
        filename:file.chunkName + ".html",
        chunks:[ file.chunkName ]
    }));
});



module.exports = baseConfig;