import { defineConfig } from 'vitepress'
import { getSidebarData, getNavData } from './utils/createSideBar.ts'


// https://vitepress.dev/reference/site-config
const BASE_URL = '/wing-note/'
export default defineConfig({
  base: BASE_URL,
  title: "Wing's Note",
  description: "前端",
  head: [
    ['link', { rel: 'icon', href: `${BASE_URL}/favicon.ico` }],
  ],
  themeConfig: {
    footer: {
      message: '未来可期',
      copyright: 'Copyright © 2024-present Evan You'
    },
    // https://vitepress.dev/reference/default-theme-config
    // siteTitle: 'Hello World',
    logo: '/logo.png',
    outline: {
      label: '页面导航'
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '常用网页导航', link: 'https://lwj-wing.gitee.io/wings-nav/' },
      ...getNavData()
    ],
    sidebar: {
      ...getSidebarData(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/lwj-wing/vite-note' }
    ],
    algolia: {
      appId: "3CJLJW7LI7",
      apiKey: "7af30568b55e6ef20782a354e0ee8ae0",
      indexName: "lwj-wing-gitee",
      // container: '### REPLACE ME WITH A CONTAINER (e.g. div) ###',
      // debug: false
    },
    editLink: {
      pattern: 'https://gitee.com/lwj-wing/wing-note/edit/master/:path',
      text: '在Gitee上编辑此页 '
    },
    lastUpdated: {
      text: '最后编辑时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
  }
})
