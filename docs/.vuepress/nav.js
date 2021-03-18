module.exports = [
    {text: '首页', link: '/'},
    {
        text: '前端基础',
        items: [
            {text: '全站开发', link: '/html/'},
            {text: 'JavaScript', link: '/js/'},
            {text: 'TypeScript', link: '/ts/'},
        ]
    },
    {
        text: '前端框架',
        items: [
            {
                text: 'Vue全家桶',
                items: [
                    {text: 'Vue', link: '/vue/'},
                    {text: 'Vuex', link: '/vuex/'},
                    {text: 'VueRouter', link: '/vue-router/'},
                    {text: 'Vue风格指南', link: '/style-guide/'},
                    {text: 'VueAPI', link: '/vue-api/'}
                ]
            },
            {
                text: 'Vue3',
                items: [
                    {text: 'Vue3', link: '/vue3/'},
                ]
            }
        ]
    },
    {
        text: '移动端',
        items: [
            {text: 'Uni-App', link: '/uni-app/'},
            {text: '微信小程序', link: '/wx/'}
        ]

    },
    {
        text: '后端',
        items: [
            {text: 'Node', link: '/node/'},
            {text: 'Koa', link: '/koa/'},
            {text: 'Mock', link: '/mockjs/'},
            {text: 'ELectron', link: '/eLectron/'}
        ]
    },
    {text: '文章收集', link: '/article/'},
    {text: 'Gitee', link: 'https://gitee.com/gnlf/blog'}
]
