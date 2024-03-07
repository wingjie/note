import{_ as a,c as n,o as e,d as s}from"./app.8aafc8a7.js";const m='{"title":"Webpack \u63D2\u4EF6\u63A8\u8350","description":"","frontmatter":{},"headers":[{"level":2,"title":"@svgr/webpack","slug":"svgr-webpack"},{"level":2,"title":"@pmmmwh/react-refresh-webpack-plugin","slug":"pmmmwh-react-refresh-webpack-plugin"},{"level":2,"title":"dotenv-webpack","slug":"dotenv-webpack"},{"level":2,"title":"webpackbar","slug":"webpackbar"},{"level":2,"title":"markdown to html","slug":"markdown-to-html"}],"relativePath":"src/frontend/Webpack/webpack\u63D2\u4EF6.md","lastUpdated":1694679260694}',t={},p=s(`<h1 id="webpack-\u63D2\u4EF6\u63A8\u8350" tabindex="-1">Webpack \u63D2\u4EF6\u63A8\u8350 <a class="header-anchor" href="#webpack-\u63D2\u4EF6\u63A8\u8350" aria-hidden="true">#</a></h1><h2 id="svgr-webpack" tabindex="-1">@svgr/webpack <a class="header-anchor" href="#svgr-webpack" aria-hidden="true">#</a></h2><p>\u5F15\u5165svg\u6587\u4EF6\uFF0C\u76F4\u63A5\u5F53\u4F5C\u7EC4\u4EF6\u4F7F\u7528</p><h2 id="pmmmwh-react-refresh-webpack-plugin" tabindex="-1">@pmmmwh/react-refresh-webpack-plugin <a class="header-anchor" href="#pmmmwh-react-refresh-webpack-plugin" aria-hidden="true">#</a></h2><p>\u70ED\u91CD\u8F7D\uFF0Creact\u5F00\u53D1\u9875\u9762\u5237\u65B0\u901F\u5EA6\u66F4\u5FEB\uFF0C\u8FD8\u53EF\u4EE5\u4F18\u5316\u9519\u8BEF\u663E\u793A\u5230\u9875\u9762\u4E0A</p><div class="language-bash"><pre><code><span class="token function">npm</span> <span class="token function">install</span> -D @pmmmwh/react-refresh-webpack-plugin react-refresh
</code></pre></div><h2 id="dotenv-webpack" tabindex="-1">dotenv-webpack <a class="header-anchor" href="#dotenv-webpack" aria-hidden="true">#</a></h2><p>\u6DFB\u52A0.env\u73AF\u5883\u6587\u4EF6</p><h2 id="webpackbar" tabindex="-1">webpackbar <a class="header-anchor" href="#webpackbar" aria-hidden="true">#</a></h2><p>\u4F18\u5316\u8FDB\u5EA6\u6761\u663E\u793A</p><h2 id="markdown-to-html" tabindex="-1">markdown to html <a class="header-anchor" href="#markdown-to-html" aria-hidden="true">#</a></h2><ul><li>remark-breaks \u5904\u7406\u6362\u884C\u6DFB\u52A0br</li><li>remark-html markdown to html</li></ul><div class="language-bash"><pre><code><span class="token function">pnpm</span> <span class="token function">add</span> remark remark-breaks remark-html remark-loader html-loader -D
</code></pre></div><div class="language-bash"><pre><code>module.exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	module: <span class="token punctuation">{</span>
		rules: <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            test: /<span class="token punctuation">\\</span>.md$/,
            use: <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                loader: <span class="token string">&quot;html-loader&quot;</span>,
              <span class="token punctuation">}</span>,
              <span class="token punctuation">{</span>
                loader: <span class="token string">&quot;remark-loader&quot;</span>,
                options: <span class="token punctuation">{</span>
                  remarkOptions: <span class="token punctuation">{</span>
                    plugins: <span class="token punctuation">[</span>RemarkHTML, RemarkBreaks<span class="token punctuation">]</span>,
                  <span class="token punctuation">}</span>,
                <span class="token punctuation">}</span>,
              <span class="token punctuation">}</span>,
            <span class="token punctuation">]</span>,
          <span class="token punctuation">}</span>,
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,14),c=[p];function r(o,l,i,u,d,k){return e(),n("div",null,c)}var b=a(t,[["render",r]]);export{m as __pageData,b as default};
