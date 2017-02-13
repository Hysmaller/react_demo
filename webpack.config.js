var webpack = require('webpack');
var path = require('path');

var serverConfig = {
    port:'8080', //端口号
    ip:''
};

var baseConfig = {
    entry:"./main.js",
    output:{
        path:'__dirname',
        filename:"bundle.js"
    },
    module:{
        loaders:[
            {test:/\.js$/,loader:'babel',exclude:/node_modules/},
            {test:/\.css$/,loader:'style!css!autoprefixer'},
            {test:/\.scss$/,loader:'style!css!sass?sourceMap'}
        ]
    }

};

//这里是配置服务器，包括热加载

baseConfig.devServer = {
    contentBase:path.join(__dirname),
    hot:true,
    host:serverConfig.ip || '127.0.0.1',
    inline:true,
    port:serverConfig.port,
    stats:{
        colors:true,
        cache:false,
        exclude:[/node_modules[\\\/]]/]
    }
};

module.exports = baseConfig;