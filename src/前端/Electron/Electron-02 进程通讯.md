# Electron-02  进程通讯

## 进程通讯意义

> 值的注意的是：
上⽂中的 preload.js ，⽆法使⽤全部 Node 的 API，⽐如：不能使⽤ Node 中的 fs 模块，但主进程（main.js ）是可以的，这时就需要<font color="orange">进程通讯</font> 了。简单说：要让preload.js 通知 main.js 去调⽤ fs 模块去⼲活。

关于 Electron 进程通信，我们要知道：

* IPC 全称为： InterProcess Communication ，即：进程通信。
* IPC 是 Electron 中最为核⼼的内容，它是从 UI 调⽤原⽣ API 的唯⼀⽅法！
* Electron 中，主要使⽤ ipcMain 和 ipcRenderer 来定义“通道”，进⾏进程通信。

## 渲染进程➡️主进程（单项）

概述：在<font color="#2080f0">渲染器进程</font>中<font color='red'>在preload中 ipcRenderer.send('信道'('create-file'),参数)</font>发送消息;
在<font color="#2080f0">主进程</font>中使用<font color='red'>ipcMain.on('信道'('create-file'),createFile)</font>接收消息。
信道是产生的关键key

常⽤于： <font color="red">在Web中调用主进程的API</font>，例如下⾯的这个需求：
> 需求：点击按钮后，在⽤户的 D 盘创建⼀个 hello.txt ⽂件，⽂件内容来⾃于⽤户输⼊。

1. ⻚⾯中添加相关元素， render.js 中添加对应脚本

```html
<!-- index.html -->
<input id="content" type="text"><br><br>
<button id="btn">在⽤户的D盘创建⼀个hello.txt</button>
```

``` js
// render.js
const btn = document.getElementById('btn')
const content = document.getElementById('content')
btn.addEventListener('click',()=>{
 console.log(content.value)
 myAPI.saveFile(content.value)
})
```

2. `preload.js` 中使⽤ <font color='#2080f0'>ipcRenderer.send('信道',参数)</font>发送消息，与主进程通信。

> <font color='red'>ipcRenderer是electron中的的方法 </font>

```js
// preload.js
const {contextBridge,ipcRenderer} = require('electron')
contextBridge.exposeInMainWorld('myAPI',{
 /*******/
 saveFile(str){
  // 渲染进程给主进程发送⼀个消息
  ipcRenderer.send('create-file',str)
 }
})
```

3. 主进程中，在加载⻚⾯之前，使⽤ **<font color='red'>ipcMain.on('信道',回调)</font>**  配置对应回调函数，接收消息。

```js
// ⽤于创建窗⼝
function createWindow() {
  /**********/
  // 主进程注册对应回调
  ipcMain.on('create-file',createFile)
  // 加载⼀个本地⻚⾯
  win.loadFile(path.resolve(__dirname,'./pages/index.html'))
}
//创建⽂件
function createFile(event,data){
  fs.writeFileSync('D:/hello.txt',data)
}
```

## 主进程到➡️渲染进程(单项)

概述：<font color='#2080f0'>主进程</font>使⽤<font color='#2080f0'>win.webContents.send</font>发送消息, <font color='brown'>渲染进程</font>通过<font color='brown'>ipcRenderer.on</font>处理消息，常⽤于：<font color='red'>从主进程主动发送消息给渲染进程</font>，例如下⾯的这个需求：
> 需求：应⽤加载 6 秒钟后，主动给渲染进程发送⼀个消息，内容是：你好啊！

1. ⻚⾯中添加相关元素， render.js 中添加对应脚本

```js
window.onload = () => {
  myAPI.getMessage(logMessage)
}

function logMessage(_event, message) {
  console.log(message)
}
```

2. `preload.js`中使用<font color='#2080f0'>ipcRenderer.on('信道',()=>{})</font>接收消息，并配置回调函数。

```js
const {contextBridge,ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('myAPI',{
 /*******/
 getMessage: (callback) => {
    return ipcRenderer.on('message', callback);
 }
})
```

3. 主进程中，在合适的时候，使用<font color='brown'>win.webContents.send('信道', 数据)</font>发送消息。

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, // 窗⼝宽度
    height: 600, // 窗⼝⾼度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // 主进程连接preload
    }
  })

  setTimeout(() => {
    win.webContents.send('message', 'hello') // 向渲染进程发送消息()
  }, 6000)

  win.loadFile('./pages/index.html')
  // 打开 DevTools
  win.webContents.openDevTools()
}
```

## 渲染进程 ⬅️➡️ 主进程（双向）

概述：<font color='#2080f0'>渲染进程</font>通过<font color='#2080f0'>ipcRenderer.invoke</font> 发送消息，<font color='brown'>主进程</font>使⽤<font color='brown'>ipcMain.handle</font> 接收并处理消
息。

> 备注：`ipcRenderer.invoke()`的返回值是`Promise`实例。

常⽤于：<font color='red'>从渲染器进程调用主进程方法并等带结果</font>，例如下⾯的这个需求：

> 需求： 点击按钮从D盘读取hello.txt中的内容，并将结果呈现在页面上。

1. ⻚⾯中添加相关元素，`render.js` 中添加对应脚本

```html
<button id="btn2">读取根目录下hello.txt文件的内容</button>
<div id="contentLog"></div>
```

```js
const btn2 = document.getElementById('btn2')
const contentLog = document.getElementById('contentLog')

btn2.addEventListener('click', async() => {
  const data = await myAPI.readFile('hello.txt')
  contentLog.innerHTML = data
})
```

2. `preload.js` 中使⽤ <font color='#2080f0'>ipcRenderer.invoke('信道',参数)</font>  发送消息，与主进程通信。

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI',{
 /*******/
  readFile (path){
    return ipcRenderer.invoke('read-file') // 返回的是个Promise
  }
})
```

3.  主进程中，在加载⻚⾯之前，使⽤ <font color='brown'> ipcMain.handle('信道',回调)</font> 接收消息，并配置回
调函数。

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800, // 窗⼝宽度
    height: 600, // 窗⼝⾼度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // 主进程连接preload
    }
  })
  
  // ! 关键
  ipcMain.handle('read-file', readFile)

  win.loadFile('./pages/index.html')
  win.webContents.openDevTools()
}


function readFile(_event, src) {
  const srcPath = path.join(__dirname, src)
  if (fs.existsSync(srcPath)) {
    return fs.readFileSync(srcPath, 'utf-8')
  }
  return '文件不存在'
}

```













