const fs = require('fs')
const path = require('path')
const {
  frontendLinks,
  sidebar
} = require('./utils/createSideBar');
const createREADME = require('./utils/createREADME')

const resolve = (...args) => {
  return path.resolve(__dirname, ...args)
}

// 生成首页README.md的目录
createREADME('frontend')

const BASE_URL = process.argv.includes('--gitee') ? '/vite-note/' : '/';

module.exports = {
  base: BASE_URL,
  title: '前端学习圈',
  description: 'vitePress生成的博客网站',
  head: [
    ['link', {
      rel: 'icon',
      type: "image/x-icon",
      href: `${BASE_URL}favicon.ico`
    }],
    ['link', {
      rel: 'manifest',
      href: `${BASE_URL}manifest.json`
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: `${BASE_URL}icons/apple-touch-icon-152x152.png`
    }],
    ['link', {
      rel: 'mask-icon',
      href: `${BASE_URL}icons/safari-pinned-tab.svg`,
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: `${BASE_URL}icons/msapplication-icon-144x144.png`
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }],
    ['script', {}, fs.readFileSync(resolve('./share/hm.js'), 'utf-8')]
  ],
  themeConfig: {
    repo: 'https://gitee.com/hnys/vite-note',
    repoLabel: 'Gitee',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '在Gitee上编辑此页',
    lastUpdated: '上次更新：', // 前缀使用
    algolia: {
      // apiKey: '5afb4b8f5b191b92841aed8afa044013',
      // indexName: 'wing_h-note',
      apiKey: '75033b31cce2d60aef3adfe4df1dbb4c',
      indexName: 'wing_h-web'
    },
    nav: [{
        text: 'React',
        link: '/src/frontend/React/'
      },
      {
        text: 'Vue',
        link: '/src/frontend/Vue/'
      },
      {
        text: 'node',
        link: '/src/frontend/node/'
      },
      {
        text: 'git',
        link: '/src/frontend/other-note/git'
      },
      {
        text: 'frontend',
        items: frontendLinks
      },
      {
        text: '友情链接',
        items: [{
            text: '个人封装组件文档',
            link: 'https://lwj-wing.gitee.io/vue3-ant-dome-dos/#/readme/form'
          },
          {
            text: '个人博客站',
            link: 'https://blog.hrhe.cn'
          }
        ]
      }
    ],
    sidebarDepth: 2, //仅支持h2和h3标题
    sidebar
  }
}