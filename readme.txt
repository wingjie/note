vitepress目前中文文件名打包会出问题，可以修改下：
node_modules/vitepress/dist/client/app/utils.js
增加第12行：pagePath = decodeURIComponent(pagePath)