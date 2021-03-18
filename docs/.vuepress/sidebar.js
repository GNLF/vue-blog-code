const path = require("path")
const rootPath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const getSidebar = require('./util/initPage.js')

module.exports = {
    // 多模块的管控
    '/vue/': require('../vue/sidebar'),
    '/vuex/': getSidebar(rootPath+"/vuex"),
    '/vue-router/': getSidebar(rootPath+"/vue-router"),
    '/mockjs/': getSidebar(rootPath+"/mockjs"),
    '/catalogue/': require('../catalogue/sidebar'),
    '/html/': getSidebar(rootPath+"/html"),
    '/js/': getSidebar(rootPath+"/js"),
    '/node/': getSidebar(rootPath+"/node",true),
    '/uni-app/': getSidebar(rootPath+"/uni-app"),
    '/wx/': getSidebar(rootPath+"/wx"),
    '/article/': getSidebar(rootPath+"/article"),
    '/style-guide/': require('../style-guide/sidebar'),
    '/vue-api/': require('../vue-api/sidebar'),
    '/electron/': getSidebar(rootPath+"/electron"),
    '/koa/':  require('../koa/sidebar'),
    '/ts/': getSidebar(rootPath+"/ts"),
    '/vue3/': getSidebar(rootPath+"/vue3"),
}
