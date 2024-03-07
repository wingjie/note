# React常用插件
## react配置eslint地址

rules中的值0、1、2分别表示不开启检查、警告、错误。

[https://www.jianshu.com/p/f8d2ef372adf](https://www.jianshu.com/p/f8d2ef372adf)

官网：[https://eslint.bootcss.com/docs/rules/](https://eslint.bootcss.com/docs/rules/)

常用的eslint配置：

```json
"quotes": [2, "single"], //单引号
"semi": 0, //不强制使用分号
"no-var": 0, //对var警告
"eol-last": 1, // 末尾添加一行
"spaced-comment": 2, //注释风格要不要有空格什么的
"space-before-blocks": 2,  // if function等的大括号之前需要有空格
"space-infix-ops": 2,
"no-irregular-whitespace": 2, //不规则的空白不允许
"no-trailing-spaces": 2, //一行结束后面有空格就发出警告
"array-bracket-spacing": ["error","always"], // 数组前后需要有空格
"object-curly-spacing": ["error","always"], // 对象前后需要有空格
"space-infix-ops": "error", // 要求操作符前面需要有空格
"switch-colon-spacing": "error", // 要求switch里冒号需要前后空格
"space-before-function-paren": ["error", "never"] // 要求函数名前后需要有空格,never表示(前不需要空格
```

react配置

```js
{
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",
   "extends": [
    	"react-app",
    	"eslint:recommended",
    	"plugin:react/recommended"
     ],
    "rules": {
    "comma-dangle": [2, 'never'], //对象字面量项尾不能有逗号
    "no-console": 0,

    "react/default-props-match-prop-types": 2, // 有默认值的属性必须在propTypes中指定
    "react/no-array-index-key": 2, // 禁止index作为key值
    "react/no-children-prop": 2, // 禁止使用children作为prop
    "react/no-direct-mutation-state": 2, // 禁止直接this.state = 方式修改state 必须使用setState
    "react/no-multi-comp": 2, // 一个文件只能存在一个组件
    "react/no-set-state": 2, // 不必要的组件改写成无状态组件
    "react/no-string-refs": 2, // 禁止字符串的ref
    "react/no-unescaped-entities": 2, // 禁止'<', '>'等单标签
    "react/no-unknown-property": 2, // 禁止未知的DOM属性
    "react/no-unused-prop-types": 2, // 禁止未使用的prop参数
    "react/prefer-es6-class": 2, // 强制使用es6 extend方法创建组件
    "react/require-default-props": 2, // 非require的propTypes必须制定默认值
    "react/self-closing-comp": 2, // 没有children的组件和html必须使用自闭和标签
    "react/sort-comp": 2, // 对组件的方法排序
    "react/sort-prop-types": 2, // 对prop排序
    "react/style-prop-object": 2, // 组件参数如果是style，value必须是object

    "react/jsx-boolean-value": 2, // 属性值为true的时候，省略值只写属性名
    "react/jsx-closing-bracket-location": 2, // 强制闭合标签的位置
    "react/jsx-closing-tag-location": 2, // 强制开始标签闭合标签位置
    "react/jsx-equals-spacing": 2, // 属性赋值不允许有空格
    "react/jsx-first-prop-new-line": 2, // 只有一个属性情况下单行
    "react/jsx-key": 2, // 强制遍历出来的jsx加key
    "react/jsx-max-props-per-line": [2, { "maximum": 2 }], // 每行最多几个属性
    "react/jsx-no-comment-textnodes": 2, // 检查jsx注释
    "react/jsx-no-duplicate-props": 2, // 检查属性名重名
    "react/jsx-no-target-blank": 2, // 检查jsx是否被引入和使用
    "react/jsx-no-undef": 2, // 检查jsx引用规范
    "react/jsx-pascal-case": 2, // 检查jsx标签名规范
  }
}
```



其他的eslint项配置：

* [https://www.cnblogs.com/nklong/p/7233631.html](https://www.cnblogs.com/nklong/p/7233631.html) 
* [https://www.cnblogs.com/toward-the-sun/p/6258152.html](https://www.cnblogs.com/toward-the-sun/p/6258152.html)

### Parsing error: Unexpected token =

原因：开发环境与ESLint当前的解析功能不兼容

解决方案：使用`babel-eslint`解析（如没有可以使用npm安装）

```js
module.exports = {
    "parser": "babel-eslint",
    "rules": {}
}
```

注意：

* 配置.eslintrc.js的属性名属性加双引号，否则保存不会自动格式化；



### 禁止检查eslint

```js
// 单行注释，放在行尾
// eslint-disable-line

//多行注释
componentDidMount: {
    /* eslint-disable */
    ....
    /* eslint-disable */
}

// 文件注释
/* eslint-disable */
```

更多禁止检测查看：[https://eslint.bootcss.com/docs/user-guide/configuring](https://eslint.bootcss.com/docs/user-guide/configuring)



## styled-components

样式插件，通过组件的形式写样式

样式例子

```tsx
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  
  ${({theme}) => theme.media.md} {
  	max-width: 100%;
  }
  
  &:focus {
  	background: #000;
  }
`;

const TomatoButton = styled(Button)<{show?: boolean}>`
  color: tomato;
  border-color: tomato;
  ${({show, theme}) => 
	show
		? `${theme.media.md} {
			padding: 0 16px;
		}`
		: `
			padding: 0 10px;
			${theme.media.md} {
				border: 1px solid gray;
			}
		`
   }
`;

<Button primary></Button>
```

```ts
const Thing = styled.div.attrs(() => ({tabIndex: 0}))`
  &:hover {
    color: red; // <Thing> when hovered
  }
`
```



&&表示 优先级提升

```tsx
const Thing = styled.div`
   && {
     color: blue;
   }
 `

// 全局样式
 const GlobalStyle = createGlobalStyle`
   div${Thing} {
     color: red;
   }
 `

 render(
   <React.Fragment>
     <!-- 只需要平行放即可，不需要包裹children -->
     <GlobalStyle />
     <Thing>
       I'm blue, da ba dee da ba daa
     </Thing>
   </React.Fragment>
 )
```

aniamations

```ts
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>&lt; 💅🏾 &gt;</Rotate>
);
```

主题：[https://styled-components.com/docs/advanced](https://styled-components.com/docs/advanced)

```tsx
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}

// Define what props.theme will look like
const theme = {
  main: "mediumseagreen"
};

render(
  <div>
    <Button>Normal</Button>

    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);
```

获取theme

```ts
// class 组件
import { withTheme } from 'styled-components'

class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme)
    // ...
  }
}

export default withTheme(MyComponent)

// 函数组件
import { useTheme } from 'styled-components'

const MyComponent = () => {
  const theme = useTheme()

  console.log('Current theme: ', theme)
  // ...
}
```





## css in js

官网：[https://emotion.sh/docs/introduction](https://emotion.sh/docs/introduction)

安装：`yarn add @emotion/core`

简单的例子：

```jsx
/** @jsx jsx */
import {css, jsx} from '@emotion/core'
const color = 'white'
render(
	<div css={css`
		padding: 32px;
		color: black;
		&:hover {
			color: ${color};
		}
        button {}  // 后代
	`}>
        hover to change color
    </div>
)
```



也可以写在一个对象里面，之后使用变量

```jsx
import {css} from 'emotion'
const styles = {
    root: css`
        font-size: 30px;
        &:hover {}
    `
}
function App(){
    return <h1 className={styles.root} />
}
```





## mock接口请求

文档地址：[mock](https://github.com/nuysoft/Mock/wiki/Mock.mock())

安装：`npm i mockjs`

1. 创建mock.js 文件

   ```js
   import Mock from 'mockjs'
   Mock.mock('/list', 'get', {
     "object|2-4": {
       "110000": "北京市",
       "120000": "天津市",
       "130000": "河北省",
       "140000": "山西省"
     }
   })
   ```

2. 之后在入口文件直接引入该文件即可，mock会拦截到请求，并输出结果



## 使用msw + faker.js

* [msw](https://mswjs.io/)
* [faker](https://fakerjs.dev/)

### 配置msw

1. 创建msw `npx msw init public/ -S `，会在public文件夹下生成mockServiceWorker.js文件

2. 创建src/mocks/browser.js 文件

   ```js
   import { setupWorker } from 'msw';
   import * as handlers from './handlers';
   
   export const worker = setupWorker(...Object.values(handlers));
   ```

   创建src/mocks/handlers文件

   ```js
   import { rest } from 'msw';
   
   export const getLogin = rest.get('/login', (req, res, ctx) => {
     return res(
       ctx.json({
         username: 'wing',
         firstName: 'John'
       })
     )
   });
   ```

3. 在入口文件引入browser并启动

   ```js
   // 注意判断开发环境才启动
   if(process.env.NODE_ENV === 'development') {
       const {worker} = require('./mocks/browser')
       worker.start()
   }
   ```

### 配置数据模型

1. 安装依赖 `npm i @mswjs/data @faker-js/faker -D`

2. 创建models.js

   ```js
   import { primaryKey } from '@mswjs/data'
   import { faker } from '@faker-js/faker'
   
   export const StudentModel = {
     id: primaryKey(() => faker.random.numeric(16).toString()),
     firstName: () => faker.name.firstName(),
     lastName: () => faker.name.lastName(),
     age: () => faker.datatype.number({ min: 18, max: 69 }),
     email: () => faker.internet.email(),
     phone: () => faker.phone.phoneNumber(('+7 (###) ###-##-##')),
     city: () => faker.address.cityName(),
     company: () => faker.company.companyName(),
     avatar: () => faker.image.avatar(),
     information: () => faker.lorem.words(10),
   }
   ```

3. 创建db.js

   ```js
   import { factory } from '@mswjs/data'
   import { StudentModel } from './models'
   
   export const db = factory({
     student: StudentModel
   })
   ```

4. 修改handlers

   ```js
   import { rest } from 'msw';
   import { db } from './db'
   
   export const getLogin = rest.get('/login', (req, res, ctx) => {
     return res(ctx.json(db.student.create()))
   });
   ```


### 简单封装

前面的配置已经完成了，这个教程是用于项目封装一个更方便的

1. 创建mocks/brower.ts

   ```ts
   import { setupWorker } from 'msw';
   import handlers from './handlers';
   import { flattenDeep } from 'lodash'
   
   /**
    * { obj: {val: 1}, obj2: {val: 2}}  ==> 1,2
    */
   export const worker = setupWorker(
     ...flattenDeep(
       Object.values(handlers).map(i => [...Object.values(i)])
     )
   );
   ```

2. 创建mocks/db.ts

   ```ts
   import _ from 'lodash';
   import { factory } from '@mswjs/data'
   import { FactoryAPI } from '@mswjs/data/lib/glossary'
   
   const r = require.context('./models', true, /models\.ts/);
   
   const db = r.keys().reduce((acc, key) => {
     const dbName = key.match(/\/(.*)\/models/);
     if (!dbName) return acc;
     return {
       ...acc,
       [_.camelCase(dbName[1])]: r(key),
     }
   }, {})
   
   // db注册不能嵌套，扁平化注册db
   const flatDbs = Object.keys(db).reduce((acc, key) => {
     Object.keys(db[key]).forEach(cKey => {
       // 获取名字为：文件夹名+models名字
       acc[key + cKey] = db[key][cKey]
     })
     return acc;
   }, {})
   
   export default factory(flatDbs) as FactoryAPI<Record<string, any>>;
   ```

3. 创建mocks/handlers.ts

   ```ts
   import _ from 'lodash';
   
   const r = require.context('./models', true, /index\.ts/);
   const handlers = r.keys().reduce((acc, key) => {
     const handleName = key.match(/\/(.*)\/index/);
     if (!handleName) return acc;
     return {
       ...acc,
       [_.camelCase(handleName[1])]: r(key),
     }
   }, {})
   
   export default handlers;
   ```

4. 前面三个文件夹创建之后一定可以写接口了

   创建mocks/models/Detail/models.ts

   ```ts
   import { primaryKey } from '@mswjs/data'
   import { faker } from '@faker-js/faker'
   
   export const Student = {
     id: primaryKey(() => faker.random.numeric(16).toString()),
     firstName: () => faker.name.firstName(),
     lastName: () => faker.name.lastName()
   }
   ```

   创建mocks/models/Detail/index.ts

   ```ts
   import { rest } from 'msw';
   import dbs from '@mocks/db'
   
   export const getLogin = rest.get('/login', (req, res, ctx) => {
     return res(ctx.json(dbs.trackingStudent.create()))
   });
   ```

   





## 路由缓存插件

1. 安装：`yarn add react-router-cache-route`
2. 可用的组件
CacheRoute：支持Route的所有属性
* `when` 决定何时使用缓存功能，可选值为[forward,back, always]，默认为forward；
* `className`   给包裹组件添加自定义样式；


CacheSwitch：使用CacheRoute时不能使用Switch中，必须使用CacheSwitch；

3. 额外的生命周期：
使用CacheRoute的组件将会得到一个名为`cacheLifecycles`的属性，里面包含两个额外的生命周期的注入函数`didCache`和`didRecover`，分别用在组件被缓存和被恢复时；
```jsx
class List extends Component {
    constructor(props, ...args){
        super(props, ...args)
        props.cacheLifecycles.didCache(this.componentDidCache)
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    componentDidCache => {}
    componentDidRecover = () => {}
}
```



## 路由懒加载

安装：`npm i react-loadable`

```jsx
import Loadable from 'react-loadable';
const Loading = <div>加载中</div>
const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
  // delay: 300,
  // timeout: 10000, 
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
```



```jsx
function Loading(props) {
    if(props.error) {
        // 当加载loader失败时
        return <div>网络错误，<button onClick={props.retry}>重新加载</button></div>
    } 
    else if  (props.timedOut){ 
    	// 当加载超时
        return <div>加载超时 <button onClick={props.retry}>重新加载</button></div>
    } 
    else if(props.pastDelay) {
        // 当加载小于delay时
        // delay默认为200, 可以通过传入Loadble的属性修改delay
        return <div>Loading...</div>
    } 
    if {
        return null
    }
}
```







## 滚动插件

1. 安装：npm i react-scroll
2. 官网：[https://github.com/fisshy/react-scroll](https://github.com/fisshy/react-scroll)
2. 基础使用：
（1）滚动方法
```jsx
import Scroll from 'react-scroll'
var scroll = Scroll.animateScroll;

// 滚动到顶部
scroll.scrollToTop(options)

// 滚动到底部
scroll.scrollToBottom(options)

// 滚动到指定位置
scroll.scrollTo(100, options)

// 滚动更多像素
scroll.scrollMore(10, options)

// 滚动到元素
var Element = Scroll.Element;
var scroller = Scroll.scroller;
<Element name='myScrollToElement'></Element>
scroller.scrollTo('myScrollToElement', options)
```
（2）Link的使用
```jsx
import {Link} from 'react-scroll'
<Link
    activeclass=''
    to='' // 填写name名字, 在块标签上面写name会滚动到对应位置
    spy={true} // 使链接选择滚动到目标位置
    smooth={true} // 添加滚动动画
    duration={300} // 延时
    offset={-160} // 距离头部距离 element + -160的像素
/>
```



## 组件或图片懒加载

>  可以为图片或者组件提供懒加载功能，当滚动条滚动到该图片上方时才会去加载图片，可以更合理去加载资源，也可以设置高度来在未加载时预留出位置；

安装：`react-lazyload`

1. 基本使用

   ```jsx
   import React from 'react'
   import LazyLoad from 'react-lazyload'
   function App(){
       return (
           Array.from({length: 15}).map(() => {
               <LazyLoad height={200}>
                   <img /> // 也可以放组件
               </LazyLoad>
           })
       )
   }
   ```

   ![image-20200417110903782](http://notecdn.hrhe.cn/images/react_常用插件-01.png)

   可以通过f12查看控制台是否懒加载成功

2. props

   * `height`：设置占位符的高度，也可以通过css设置；
   * `once`：只加载一次，之后再不检测滚动事件，对于图像或简单组件很有用
   * `offset`：组件位于视口下方的距离，如果

3. 工具函数

   * `forceChec`   手动重新触发检查视口中的元素， 当LazyLoad组件进入视口而没有调整大小或滚动事件时很有用，例如，当组件的容器被隐藏然后可见时。

     ```jsx
     import forceCheck from 'react-lazyload'
     forceCheck() // 在生命周期调用
     ```

   * `forceVisible` 强制组件显示，无论该元素在视口中是否可见

     ```jsx
     import { forceVisible } from 'react-lazyload';
     forceVisible();
     ```

教程地址：[https://github.com/twobin/react-lazyload](https://github.com/twobin/react-lazyload)



## React动画

1. 安装：`npm i react-transition-group`
2. 引入
```jsx
import {CSSTransition} from 'react-transition-group'
```
3. 属性
* `in` 开头
* `timeout` 动画的时间
* `appear`  一加载就执行
* `classNames`   起的变量名称
* `unmountOnExit`用完了以后DOM消失
* `onEnter`   进入时的钩子函数，就一个参数el
* `onEnter`, `onEntering`, `onEntered`, `onExit`, `onExiting`, `onExited` 钩子函数


```jsx
<CSSTransition
    in={flag}
    timeout={2000}
    appear
    classNames='fade'
    unmountOnExit
    onEnter={el => el.style.color='red'}
>
    {/* 一定要空一个div出来不写任何东西,上面的fade会直接将类名放到这个div上面 */}
    <div>
        <div>hello</div>
    </div>
</CSSTransition>
```
4. 类名
* `fade.enter`    进入时的类名
* `fade.enter-active`   进入时执行的类名
* `fade.exit`    离开时的类名
* `fade.exit-active`   离开时执行的类名
* `fade.appear-active`   看情况opacity就不加，要是运动类的必须加上最后的位置；
* `enter-done` 动画完成时



5. `TransitionGroup`，如果多个动画特效，需要用该组件包裹
```jsx
<TransitionGroup key={index}>
    <CSSTransition>
    </CSSTransition>
</TransitionGroup>
```
可以使用react-motion代替： [https://www.jianshu.com/p/82552ce3803a](https://www.jianshu.com/p/82552ce3803a)

## 其他插件
* [面板可以随意拖放的插件](https://github.com/tomkp/react-split-pane)
* [classnames动态设置class](https://github.com/JedWatson/classnames) 动态class设置方便
* [SVG图标库](https://github.com/FortAwesome/react-fontawesome)
* [图片裁剪工具](https://github.com/react-cropper/react-cropper) 方便框选大小，头像经常使用
* [memoize-one](https://github.com/alexreardon/memoize-one) 对于react函数组件特别方便，记忆函数相同参数时，将直接返回上一次的执行结果
* [mitt](https://github.com/developit/mitt) eventBus 事件监听
* [yup](https://github.com/jquense/yup) 表单参数校验
* [formik](https://formik.org/) 表单校验工具



## Yup配合formik校验表单

地址：[https://codesandbox.io/s/github/formik/formik/tree/master/examples/with-material-ui?file=/index.js:0-1817](https://codesandbox.io/s/github/formik/formik/tree/master/examples/with-material-ui?file=/index.js:0-1817)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

ReactDOM.render(<WithMaterialUI />, document.getElementById('root'));
```







## react-query

react-query v3 版本文档：[https://react-query-v3.tanstack.com/quick-start](https://react-query-v3.tanstack.com/quick-start)

常用的工具函数

get请求用useQuery，其他请求用useMutation

### useQuery

https://react-query.tanstack.com/reference/useQuery

以下列出常用的功能，更多高级功能请查阅官方文档

```tsx
import { useQuery } from 'react-query'

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export default function(){
    //  填写的监听值改变会重新触发请求
    // 以下演示常用的功能
    const {
        data,
        isLoading,
        refetch, // 手动查询
    } = useQuery<ResponseData>(['fetchKey' ...deps], fetchUsers, {
        enabled: true, // 是否自动发起请求
        retry: true, // 失败是否重新尝试 boolean | number， 填写number表示重新尝试次数
        onSuccess: ()=>{}, // 成功回调
        onError: () => {}, // 失败回调
        select: (data) => data, // 重新格式化返回的data
        initialData: [], // 初始值
    })
}
```

### useMutation

其他请求使用useMutation

```jsx
import { useMutation } from 'react-query'

export defualt function(){
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery(['todos'], getTodos)

  // Mutations
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['todos'])
    },
  })
  return <button onClick={()=>mutation.mutate({title: '1234'})}></button>
}
```

简单使用例子

```tsx
function addPerson(data) {
    return request.post('/person')
}
function useAddPerson() {
    return useMutation(async (data: Data) => {
        const { data } = await addPerson(data);
        return data
    })
}
function Person() {
    const addPersonFetch = useAddPerson();
    
    const handleSubmit = useCallback(async function() {
        await addPersonFetch.mutateAsync(data, {
            onSuccess(rsp) {
                console.log(rsp)
            }
        })
    }, [])
}
```





## Echarts 插件

* [echarts-for-react](https://github.com/hustcc/echarts-for-react) 简单的封装echarts，react直接使用
* [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud)   使用词云



## 生成二维码

```bash
npm install qrcode.react
```

```js
import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

ReactDOM.render(
  <QRCodeSVG value="https://reactjs.org/" />,
  document.getElementById('mountNode')
);
```



## @ebay/nice-modal-react

官方文档：[https://github.com/eBay/nice-modal-react](https://github.com/eBay/nice-modal-react)

model的hook钩子

```jsx
import NiceModal from '@ebay/nice-modal-react';
ReactDOM.render(
  <React.StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

搭配其他的modal使用

```jsx
import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export default NiceModal.create(({ name }) => {
  // Use a hook to manage the modal state
  const modal = useModal();
  return (
    <Modal
      title="Hello Antd"
      onOk={() => modal.hide()}
      visible={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      Hello {name}!
    </Modal>
  );
});
```



注册使用

```jsx
import NiceModal from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

// If use by id, need to register the modal component.
// Normally you create a modals.js file in your project
// and register all modals there.
NiceModal.register('my-antd-modal', MyAntdModal);

function App() {
  const showAntdModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show('my-antd-modal', { name: 'Nate' })
  };
  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
    </div>
  );
}
```

不用注册

```jsx
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

function App() {
  const showAntdModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show('my-antd-modal')
  };
  return (
    <div className="app">
      <h1>Nice Modal Examples</h1>
      <div className="demo-buttons">
        <button onClick={showAntdModal}>Antd Modal</button>
      </div>
      <MyAntdModal id="my-antd-modal" name="Nate" />
    </div>
  );
}
```

其他方式

```tsx
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MyAntdModal from './my-antd-modal'; // created by above code

NiceModal.register('my-antd-modal', MyAntdModal);
//...
// if use with id, need to register it first
const modal = useModal('my-antd-modal');
// or if with component, no need to register
const modal = useModal(MyAntdModal);

//...
modal.show({ name: 'Nate' }); // show the modal
modal.hide(); // hide the modal
//...
```

