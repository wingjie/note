# Webpack 插件推荐

## @svgr/webpack

引入svg文件，直接当作组件使用



## @pmmmwh/react-refresh-webpack-plugin

热重载，react开发页面刷新速度更快，还可以优化错误显示到页面上

```bash
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```



## dotenv-webpack

添加.env环境文件



## webpackbar

优化进度条显示



## markdown to html

* remark-breaks 处理换行添加br
* remark-html  markdown to html

```bash
pnpm add remark remark-breaks remark-html remark-loader html-loader -D
```

```bash
module.exports = {
	module: {
		rules: [
          {
            test: /\.md$/,
            use: [
              {
                loader: "html-loader",
              },
              {
                loader: "remark-loader",
                options: {
                  remarkOptions: {
                    plugins: [RemarkHTML, RemarkBreaks],
                  },
                },
              },
            ],
          },
		]
	}
}
```

