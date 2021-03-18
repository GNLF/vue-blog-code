// .vuepress/config.js
const path = require('path')
module.exports = {
    title: '前端笔记',
    description: '凉风',
    base: '/blog/',
    dest: './pages',
    port: '9988',
    head: [
        ['link', {rel: 'icon', href: '/icon.png'}],
        ['script', {src: '/js/clicklove.js'}],
        ['script', {src: '/js/baiduStatistic.js'}]
    ],
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/active-header-links',
        ['vuepress-plugin-comment',
            {
              choosen: 'valine',
              options: {
                el: '#valine-vuepress-comment',
                appId: '8XMEYy2PBLdzb92SUx0lVair-9Nh9j0Va',
                appKey: 'p53xyneNUCh5LYcsLdhbgFI0',
                placeholder: '快来评论吧^_^',
                recordIP: true,
                avatar: 'wavatar',
                meta:['nick','mail'],
                requiredFields:['nick']
              }
            },
            // {
            //     choosen: 'gitalk',
            //     options: {
            //         clientID: 'a73261a0bfe5f7b8a579',
            //         clientSecret: 'aafb801ef25e72772464331ad44ffd95a765e653',
            //         repo: 'GNLF',
            //         owner: 'GNLF',
            //         admin: ['GNLF'],
            //         distractionFreeMode: false
            //     }
            // }
        ],
        [
            '@vuepress/plugin-register-components',
            {
                components: [ // 全局注册CanvasNest组件
                    {
                        name: 'canvas-nest',
                        path: path.resolve(__dirname, './components/CanvasNest.vue')
                    }
                ]
            }
        ],
        require('./plugins/musicPlayer/index'),
        [
            'vuepress-plugin-helper-live2d', {
            live2d: {
                // 是否启用(关闭请设置为false)(default: true)
                enable: true,
                // 模型名称(default: hibiki)>>>取值请参考：
                // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                model: 'shizuku',
                display: {
                    position: "right", // 显示位置：left/right(default: 'right')
                    width: 135, // 模型的长度(default: 135)
                    height: 300, // 模型的高度(default: 300)
                    hOffset: 65, //  水平偏移(default: 65)
                    vOffset: 0, //  垂直偏移(default: 0)
                },
                mobile: {
                    show: false // 是否在移动设备上显示(default: false)
                },
                react: {
                    opacity: 0.8 // 模型透明度(default: 0.8)
                }
            }
        }
        ]
    ],
    themeConfig: {
        logo: '/icon.png',
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 2,
        smoothScroll: true,
        author: 'GN_凉风',
        record: '',
        startYear: '2020',
        lastUpdated: '上次更新',
        repo: 'https://github.com/GNLF/blog',
        repoLabel: 'GitHub',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '在GitHub上编辑此页'
    },
    markdown: {
        lineNumbers: true
    }
}
