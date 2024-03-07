# js理论面试题

## 从url输入到页面展现到底发生了什么

* DNS解析，将域名解析成ip地址
* TCP连接，TCP三次握手
* 浏览器发送HTTP请求
* 服务器处理请求并返回HTTP报文
* 浏览器解析渲染页面
  1. 解析HTML，构建DOM树
  2. 解析CSS，生成CSS规则树
  3. 合并DOM树和CSS规则，生成render树
  4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
  5. 绘制render树（paint），绘制页面像素信息
* 断开连接，TCP四次挥手；



## TCP三次握手的过程

TCP握手协议

在TCP/IP协议中,TCP协议提供可靠的连接服务,采用三次握手建立一个连接.

第一次握手：建立连接时,客户端发送syn包(syn=j)到服务器,并进入SYN_SEND状态,等待服务器确认；

SYN：同步序列编号(Synchronize Sequence Numbers)

第二次握手：服务器收到syn包,必须确认客户的SYN（ack=j+1）,同时自己也发送一个SYN包（syn=k）,即SYN+ACK包,此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN＋ACK包,向服务器发送确认包ACK(ack=k+1),此包发送完毕,客户端和服务器进入ESTABLISHED状态,完成三次握手.


三次握手的步骤：（抽象派）

客户端：hello，你是server么？

服务端：hello，我是server，你是client么

客户端：yes，我是client


四次挥手的步骤：（抽象派）

主动方：我已经关闭了向你那边的主动通道了，只能被动接收了

被动方：收到通道关闭的信息

被动方：那我也告诉你，我这边向你的主动通道也关闭了

主动方：最后收到数据，之后双方无法通信



## 缓存

### **强制缓存**

强制缓存是指客户端请求后，会先访问缓存数据库看缓存是否存在，如果存在直接返回，不存在则请求真的服务器，响应后再存入数据库；可以造成强制缓存的字段是cache-control和expires；

* expires    是表示缓存到期时间，是绝对的时间（当前时间+缓存时间），http1.0的字段；
  1. expires由于是绝对时间，用户可以随意更改本地时间，达到缓存失效，或者由于时差的原因，也会导致失效；
  2. expires写法比较复杂，字符串多个空格或少个字母都会导致失效
* cache-control  是http1.1中增加的字段，表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求；cache-control是相对时间；cache-control常用的值：
  1. max-age：最大有效时间，单位s
  2. must-revalidate：
  3. no-cache：需要使用对比缓存来验证缓存数据
  4. no-store：真正意义上的不要缓存，所有内容都不走缓存，包括强制和协商；
  5. public：所有的内容都可以被缓存（包括客户端和代理服务器，如CDN）；
  6. private：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值；

一般设置：`cache-control:public,max-age=1000`



### **协商缓存**

浏览器先请求缓存数据库，返回一个缓存标识。之后浏览器拿这个标识和服务器通讯。如果缓存未失效，则返回 HTTP 状态码 304 表示继续使用，于是客户端继续使用缓存；如果失效，则返回新的数据和缓存规则，浏览器响应数据后，再把规则写入到缓存数据库。

协商缓存主要涉及两组header字段：Etag和if-none-match，last-modified和if-modified-since

**`Last-Modify`和`if-modified-since`**

浏览器第一次请求一个资源的时候，服务器返回的header中会加上`Last-Modify`，`Last-Modify`是一个时间标识该资源的最后修改时间，例如`Last-Modify: Thu,31 Dec 2037 23:59:59 GMT`。

当浏览器再次请求该资源时，request的请求头中会包含 `if-modified-since`，该值为缓存之前返回的`Last-Modify`。服务器收到`if-modified-since`后，根据资源的最后修改时间判断是否使用缓存。

如果使用缓存，则返回304，**并且不会返回资源内容，并且不会返回Last-Modify。**



**`Etag`和`If-None-Match`**

`Etag`/`If-None-Match`存储的是文件唯一标识（一般是hash生成的），ETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据浏览器上的`If-None-Match`值来判断是否命中缓存 。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。



Etag的优先级要高于last-modify



### **缓存的位置**

* memory cache   内存中的缓存，首先查找内存之后再查找硬盘，关闭浏览器或tab时存储到硬盘里面
* disk cache  硬盘缓存，会严格根据http头信息中的各类字段来判断哪些资源可以缓存，读取速度虽然比memory cache慢但是比网络请求快
* service worker 与上述两种不同，前端可以自己使用service worker，通过f12 ==》 application  ==》 cache storage查找到，这个缓存是永久性的，关闭tab或浏览器下次打开依然存在，只有手动调用`cache.delete(resource)`或者容量超过限制才被清空

缓存查找的优先级（由上到下查找）：

1. service workder
2. memory cache
3. disk cache
4. 网络请求



浏览器发起请求时：

![image](http://notecdn.hrhe.cn/images/%E7%BC%93%E5%AD%98%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AF%B7%E6%B1%82.png)



浏览器再次请求时：

![image](http://notecdn.hrhe.cn/images/%E7%BC%93%E5%AD%98%E6%B5%8F%E8%A7%88%E5%99%A8%E5%86%8D%E6%AC%A1%E8%AF%B7%E6%B1%82.png)()



**缓存的优点**

* 减少冗余的数据传输
* 减少服务器负担
* 加快客户端加载网页的速度



参考文献：

* [一文读懂前端缓存](https://juejin.cn/post/6844903747357769742)
* [前端面试常见的浏览器缓存（强缓存、协商缓存），代码实操](https://juejin.cn/post/7083178636852854792)




## Proxy与Object.defineProperty的优劣对比?

Proxy的优势如下:

* Proxy可以直接监听对象而非属性
* Proxy可以直接监听数组的变化
* Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
* Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

`Object.defineProperty`的优势如下:

* 兼容性好,支持IE9



## 前端常见攻击方式

* XSS攻击  ---- 跨站脚本攻击，向页面中插入恶意脚本执行
* CSRF攻击  ---  跨站请求伪造，冒充用户发送请求
* Sql注入  ---- 在用户输入框输入sql命令进行攻击
* html脚本注入



## 前端常用跨域方案

* JSONP跨域（本质是js调用）
* CORS 后台配置
* postMessage 两个window之间的跨域解决方案
* Nginx 反向代理

跨域是浏览器做出的安全限制，必须同协议、同域名、同端口否则会被浏览器block



## 什么是Virtual dom

用javascript对象结构表示dom树的结构；然后用这个树构建一个真正的DOM树，插到文档当中，当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树的差异，把所记录的差异应用到所构建的真正的dom树上，视图就更新了。virtual dom本质上就是在js和dom之间做了一个缓存；



## 前端网站常规优化方案

优化策略：减少请求次数、减小资源大小、提高响应和加载速度、优化资源加载时机、优化加载方式

* 合并、压缩、混淆html/css/js文件（webpack实现，减小资源大小）
* Nginx开启Gzip，进一步压缩资源（减小资源大小）
* 图片资源使用CDN加速（提高加载速度）
* 符合条件的图标做base64处理（减小资源大小）
* 样式表放首部、js放尾部（js单线程，会阻塞页面，资源加载方式）
* 设置缓存（强缓存和协商缓存，提高加载速度）
* link或者src添加rel属性，设置prefetch或preload可预加载资源（加载时机）
* 如果使用了ui组件库，采用按需加载（减小资源大小）
* SPA项目，通过import或者require做路由按需加载（减小资源大小）
* 服务端渲染SSR，加快首屏渲染，利于SEO
* 页面使用骨架屏，提高首页加载速度
* 使用JPEG 2000, JPEG XR, and WebP的图片格式来代替现有的jpeg和png，该页面图片较多时，这点作用非常明显
* 使用图片懒加载-lazyload