import { defineConfig } from 'vitepress'
import { getSidebarData, getNavData } from './utils/createSideBar.ts'


// https://vitepress.dev/reference/site-config
const BASE_URL = ''
export default defineConfig({
  base: BASE_URL,
  title: "Wing's Note",
  description: "前端",
  head: [
    ['link', { rel: 'icon', href: `${BASE_URL}/favicon.ico` }],
  ],
  themeConfig: {
    returnToTopLabel: '回到顶部',
    footer: {
      message: 'The future is promising',
      copyright: 'Copyright © 2024-present Evan You'
    },
    // https://vitepress.dev/reference/default-theme-config
    // siteTitle: 'Hello World',
    logo: '/logo.png',
    outline: {
      label: '页面导航'
    },
    nav: [
      // { text: '主页', link: '/' },
      // { text: '常用网页导航', link: 'https://lwj-wing.gitee.io/wings-nav/' },
      { text: 'Vue', link: '/src/前端/Vue/' },
      { text: 'Typescript', link: '/src/前端/Typescript/' },
      { text: 'Javascript', link: '/src/前端/Javascript/' },
      { text: 'html5', link: '/src/前端/html5/' },
      ...getNavData()
    ],
    sidebar: {
      ...getSidebarData(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/lwj-wing/wing-note' }
    ],
    algolia: {
      appId: "1T4K79VFIO",
      apiKey: "60ebd08be62bc5689e6fb2b2b45c4551",
      indexName: "blogs_note",
    },
    editLink: {
      pattern: 'https://gitee.com/lwj-wing/vite-note/edit/master/:path',
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
