# Webpack原理

webpack是一个javascript静态模块打包器，当webpack处理应用程序时，它会递归的创建一个依赖关系图，其中包含应用程序的每个模块，然后将所有的模块打包成一个或多个bundle



## 作用：

（1）打包：可以把多个JavaScript文件打包成一个文件，减少服务器压力和下载带宽；

（2）转换：把扩展语言转换成普通的JavaScript语言，让浏览器识别更顺利运行；

（3）优化：前端变的越来越复杂后，性能也会遇到各种问题，webpack肩负起优化和提升的责任；



## 打包原理：

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行转换,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 转换完所有模块后,得到了每个模块被转换后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。





## 配置webpack

```js
module.exports = {
    // 配置打包选项  development开发环境
    mode: 'dev',   // production 生产环境
    // 指定入口文件：要打包的文件
    entry: './src/js/index.js',
    // 指定输出文件：打包之后的文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.min.js'
    },
    // 配置资源的加载器 loader
    module: {
        rules: [
        // 配置js的加载器（把ES6转化为ES3/5代码）
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            //打包除这个文件之外的文件
            exclude: path.join(__dirname, './node_modules'),
            //打包包括的文件
            include: path.join(__dirname, './src')
        },
        // 配置css的加载器
        {
            // 匹配.css结尾的文件
            test: /\.css$/,
            // 配置css文件的加载器,处理顺序：从右向左
            use: ['style-loader', 'css-loader']
        },
        // 配置less的加载器
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }
        ]
    },
    // 配置插件
    plugins: [
        new CleanWebpackPlugin(),
        // 动态生成html
        new HtmlWebpackPlugin({
            title: '测试标题',
            template: 'index.html'
        })
    ],
    // 配置实时预览环境
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 5000
    }
}
```

`mode`  配置环境是开发环境还是生产环境

`entry`   指定入口文件

`output`   指定输出文件

`module`    模块

`rules`    配置js的加载器

`loader`   模块转换器

`plugins`   扩展插件





## 开发一个loader

针对每个文件类型，`loader`是支持以数组的形式配置多个的，因此当`Webpack`在转换该文件类型的时候，会按顺序链式调用每一个`loader`，前一个`loader`返回的内容会作为下一个`loader`的入参。因此`loader`的开发需要遵循一些规范，比如返回值必须是标准的`JS`代码字符串，以保证下一个`loader`能够正常工作，同时在开发上需要严格遵循“单一职责”，只关心`loader`的输出以及对应的输出。

`loader`函数中的`this`上下文由`webpack`提供，可以通过`this`对象提供的相关属性，获取当前`loader`需要的各种信息数据，事实上，这个`this`指向了一个叫`loaderContext`的`loader-runner`特有对象。有兴趣的小伙伴可以自行阅读源码。

```js
module.exports = function(source) {
    const content = doSomeThing2JsString(source);
    
    // 如果 loader 配置了 options 对象，那么this.query将指向 options
    const options = this.query;
    
    // 可以用作解析其他模块路径的上下文
    console.log('this.context');
    
    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    this.callback(null, content);
    // or return content;
}
```



## 编写一个plugin

需要实现一个apply方法

```js
//webpack配置文件 
plugins: [
 new FileWebpackPlugin({
   author: "HBF"
 })
]

//file-webpack-plugin.js
class FileWebpackPlugin {
 constructor(options){
     //接受参数
    this.options = options
    console.log('options', options); //sy-log
 }
//compiler:webpack实例 
 apply(compiler) {
      // 定义插件执行的时机（异步） 
        compiler.hooks.emit.tapAsync('FileWebpackPlugin', (compilation, callback)=>{
            const packFilesLen = Object.keys(compilation.assets).length
            let content = `本次构建结果统计：\n\r生成文件数量：${packFilesLen}个;\n\r`;
            if(this.options.author){
                content += `执行者：${this.options.author};\n\r`;
            }
            for (let filename in compilation.assets) {
                content += `文件名称：${filename}，文件大小：${compilation.assets[filename].size()};\n\r`;
            }
            compilation.assets['file.txt'] = {
                source: function(){
                    return content
                },
                size: function(){
                    return 1024
                }
            }
            callback()
        })

      //compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => { 
      // console.log("开始了");
      //});
 } 
}
module.exports = FileWebpackPlugin;
```

在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation，它们是 Plugin 和 Webpack 之间的桥梁。 Compiler 和 Compilation 的含义如下：

* Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
* Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

compiler事件钩子:

![img](https://img-blog.csdnimg.cn/20190823144604249.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MjI4NDQy,size_16,color_FFFFFF,t_70)

compilation事件钩子:

![img](https://img-blog.csdnimg.cn/20190823144625964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MjI4NDQy,size_16,color_FFFFFF,t_70)



参考资料：[webpack原理（二）自定义plugin](https://blog.csdn.net/qq_36228442/article/details/100037165)



## webpack有哪些常⻅的Loader

- `file-loader`：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- `url-loader`：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- `source-map-loader`：加载额外的 Source Map ⽂件，以⽅便断点调试
- `image-loader`：加载并且压缩图⽚⽂件
- `babel-loader`：把 ES6 转换成 ES5
- `css-loader`：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- `style-loader`：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。
- `eslint-loader`：通过 ESLint 检查 JavaScript 代码

## webpack 常见的plugin有哪些

- `ProvidePlugin`：自动加载模块，代替require和import
- `html-webpack-plugin`可以根据模板自动生成html代码，并自动引用css和js文件
- `extract-text-webpack-plugin` 将js文件中引用的样式单独抽离成css文件
- `DefinePlugin` 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
- `HotModuleReplacementPlugin` 热更新
- `css-minimizer-webpack-plugin` 不同组件中重复的css可以快速去重
- `webpack-bundle-analyzer` 一个webpack的bundle文件分析工具，将bundle文件以可交互缩放的treemap的形式展示。
- `compression-webpack-plugin` 生产环境可采用gzip压缩JS和CSS
- `happypack`：通过多进程模型，来加速代码构建
- `clean-wenpack-plugin` 清理每次打包下没有使用的文件
- `speed-measure-webpack-plugin`:可以看至U每个Loader和Plugin执行耗时（整个扌丁包耗时、每个Plugin和 Loader 耗时）

