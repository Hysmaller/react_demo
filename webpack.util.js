/**
 * Created by huangyu on 2017/2/14.
 */

// 获取本机的ip

module.exports.getIPAddress=function (){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
};

//端口号
module.exports.port = 8088;


