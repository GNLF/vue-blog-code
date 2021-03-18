# Node项目开机自启
> nodejs程序配置成windows-server服务,实现开机自启动
>

## 下载node-windows

```shell script
# 项目中安装
npm install node-windows --save  
# 全局安装
npm install node-windows -g 
```

## 项目根目录创建nw.js文件

```js
let Service = require('node-windows').Service;  
let EventLogger = require('node-windows').EventLogger;  
let log = new EventLogger(name);  
let svc = new Service({  
    name: 'Project Name',//项目服务名称  
    description: 'this is description',  // 项目描述
    script: require('path').join(__dirname,'app.js'),//要执行的node文件  
    wait: 2,//程序重启的时间间隔  
    grow: .5, //程序重启的时间增长值  
    maxRetries: 40 //60秒内最大重启次数  
});  
  
svc.on('install',function(){  
    svc.start();  
    log.info('install complete.');  
});  
  
svc.on('uninstall',function(){  
    log.info('Uninstall complete.');  
    log.warn('The service exists: ',svc.exists);  
});  
  
svc.on('alreadyinstalled',()=>{  
    log.error('This service is already installed.');  
});  
  
if(svc.exists) return svc.uninstall();  
  
svc.install();  
```

## 执行此脚本

```shell script
node nw.js
```

