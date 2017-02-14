/**
 * Created by huangyu on 2017/2/13.
 */
var path = require('path');

var config = require("./config.json");

var serverConfig = {
    contentBase:path.join( __dirname ),
    hot:true,
    host:config.ip || '127.0.0.1',
    inline:true,
    port:config.port,
    stats:{
        colors:true,
        cache:false,
        exclude:[/node_modules[\\\/]]/]
    }
};

module.exports = serverConfig;

