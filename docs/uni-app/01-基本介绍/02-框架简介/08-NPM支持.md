# NPM支持

uni-app支持使用**npm**安装第三方包。

此文档要求开发者们对**npm**有一定的了解，因此不会再去介绍**npm**的基本功能。如若之前未接触过**npm**，请翻阅[NPM官方文档](https://docs.npmjs.com/getting-started/what-is-npm)进行学习。

**初始化npm工程**

若项目之前未使用npm管理依赖（项目根目录下无package.json文件），先在项目根目录执行命令初始化npm工程：

```shell
npm init -y
```

**安装依赖**

在项目根目录执行命令安装npm包：

```shell
npm install packageName --save
```

**使用**

安装完即可使用npm包，js中引入npm包：

```js
import package from 'packageName'
const package = require('packageName')
```

**注意**

- 为多端兼容考虑，建议优先从 [uni-app插件市场](https://ext.dcloud.net.cn/) 获取插件。直接从 npm 下载库很容易只兼容H5端。
- 非 H5 端不支持使用含有 dom、window 等操作的 vue 组件和 js 模块，安装的模块及其依赖的模块使用的 API 必须是 uni-app 已有的 [API](https://uniapp.dcloud.io/api/README)（兼容小程序 API），比如：支持[高德地图微信小程序 SDK](https://www.npmjs.com/package/amap-wx)。类似[jQuery](https://www.npmjs.com/package/jquery) 等库只能用于H5端。
- node_modules 目录必须在项目根目录下。
- 支持安装 mpvue 组件，但npm方式不支持小程序自定义组件（如 wxml格式的vant-weapp），使用小程序自定义组件请参考：[小程序组件支持](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)。
- 关于ui库的获取，详见[多端UI库](https://ask.dcloud.net.cn/article/35489)