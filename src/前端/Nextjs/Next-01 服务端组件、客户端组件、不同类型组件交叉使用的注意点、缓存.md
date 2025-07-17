# 服务端组件、客户端组件、不同类型组件交叉使用的注意点、缓存

## 服务端组件

### 特性

- 默认创建的组件是服务端组件
- 只会在服务端渲染

### 优点

- **数据获取快**：服务器组件允许您将数据获取移至服务器，更靠近数据源。这可以通过减少获取渲染所需的数据的时间以及客户需要提出的请求数来提高性能。
- **安全性高**：服务器组件允许您在服务器上保留敏感的数据和逻辑，例如令牌和API键，而不会将其暴露于客户端的风险。
- **缓存机制**：通过在服务器上渲染，可以根据后续请求和跨用户重复使用结果。通过减少每个请求上完成的渲染和数据获取量，这可以提高性能并降低成本。
- **性能好**：服务器组件提供其他工具来优化基线性能。例如，如果从完全由客户端组件组成的应用程序开始，则将UI的非**相互作用片段移**至服务器组件可以减少所需的客户端JavaScript的量。这对互联网或功能强大的设备较低的用户是有益的，因为浏览器的客户端JavaScript较少可下载，解析和执行。
- **搜索引擎优化和社交网络共享性**：渲染的HTML可以由搜索引擎机器人使用来索引您的页面和社交网络机器人，以生成页面的社交卡预览。
- **流传输：**服务器组件允许您将渲染工作分为块，并在准备就绪时将其流式传输到客户端。这允许用户更早地查看页面的部分，而无需等待整个页面在服务器上渲染。

### 限制

1. 不能使用react hooks

2. 不能有交互事件（点击事件...）

3. 不能使用浏览器的API

4. 使用类组件（class）

> **注意**：除此之外要尽可能的使用服务点组件

#### 数据获取

  使用fetch函数直接获取

> V15版本之前默认是缓存，V15改为默认不缓存

####  server-only

为了防止客户端组件被客户端组件使用的情况，如果他们意外将这些模块之一导入到客户端组件中，我们可以使用仅使用服务器的软件包为其他开发人员带来构建时间错误。

要使用仅服务器，请首先安装软件包：

```shell
npm install server-only
```

然后将软件包导入包含仅服务器代码的任何模块：

app/server-component.tsx

```tsx
import 'server-only'
 
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}
```

### 引入第三方包

渊源：第三方包组件中可能没有声明`use client`且使用了客户端才能使用的hook、浏览器API...，直接引入到服务端组件导致报错

可以包装依赖于自己的客户端组件中仅限客户端功能的第三方组件

app/carousel.tsx

```tsx
'use client'
 
import { Carousel } from 'acme-carousel'
 
export default Carousel
```

这样在打包的时候就会被打包到客户端组件中

现在，可以使用<Carousel />直接在服务器组件中

app/page.tsx

```tsx
import Carousel from './carousel'
 
export default function Page() {
  return (
    <div>
      <p>View pictures</p>
 
      {/*  Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  )
}
```

### 服务器渲染策略

| 组件     | Route (app) |                             区别                             |                 表现                 |
| -------- | :---------: | :----------------------------------------------------------: | :----------------------------------: |
| 静态渲染 |     ○ /     |                        默认为静态渲染                        | 在**打包**和**重新验证**时候进行渲染 |
| 动态渲染 |   ƒ /home   | 使用动态函数（[Dynamic APIs](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-apis)）、未被缓存的接口 |      在**路由请求**时候进行渲染      |



#### 静态渲染（默认）

在**打包**和**重新验证**时候进行渲染，适用于例如静态博客文章或产品页面时，静态渲染很有用。

在组件中导出`revalidate`变量会清除缓存后内容会更新

```tsx
export const revalidate = 10 // 超过10秒会清除一下缓存，在下次进行请求后内容会更新
```

#### 动态渲染

在**路由请求**时候进行渲染，使用了**动态函数（[Dynamic APIs](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-apis)）**或者使用了**未被缓存的接口**会自动更换动态渲染

在组件顶部导出声明`export const dynamic = 'force-dynamic'`

## 客户端组件

- 在组件的顶部加上`“use client”`
- 也会在服务端执行一遍，为了生成初始化的内容直接给到客户端
- 在打包的时候也会执行

客户端组件想获取到环境变量需要在环境变量前加上`NEXT_PUBLIC` process.env.NEXT_PUBLIC_API_KEY,

## 不同类型组件交叉使用的注意点

##### 服务端组件可以直接引入客户端组件

##### 客户端组件中使用服务端组件（一般别这么干）

将服务器组件作为道具传递给客户端组件

app/server-component.tsx(本页上方)

app/client-component.tsx

```tsx
'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

app/page.tsx

```tsx
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

## 缓存

### fetch

fetch会命中两种缓存：**默认缓存**和**记忆缓存**

```tsx
fetch(url, {
  cache: 'no-store' // 在v15版本默认，不进行缓存
})
```

退出记忆缓存的方法

```ts
const { signal } = new AbortController()
fetch(url, { signal })
```

在next.config.mjs

```mjs
const nextConfig = {
	...
  logging: {
  	fullUrl: true // 请求打印日志
  }
}

export default nextConfig
```

#### 重新验证

1. 基于时间的重新验证

- 写在请求中

   ```tsx
   fetch('https://...', {next: {revalidate: 3600}}) // 以秒为单位
   ```

- 写在文件的顶部

   ```tsx
   export const revalidate = 3600
   ```

2. 按需重新验证

写在路由程序中或者server action 中

- 基于路径

  ```ts
  'use server'
  import { revalidatePath } from 'next/cache'
  export async function createPost() {
    // fetch('/post')的请求 或 路径localhost:3030/post的页面会被重新验证
    revalidatePath('/posts')
  }
  ```

- 基于标签

  ```ts
  'use server'
   
  import { revalidateTag } from 'next/cache'
   
  export async function createPost() {
    // Invalidate all data tagged with 'posts' in the cache
    revalidateTag('posts')
  }
  
  // const data = await fetch('https://api.vercel.app/blog', {
  //   next: { tags: ['posts'] },
  // }) 会被重新验证
  
  ```


### 缓存的四种类型

| 方法                                                         | 解释                                                         | 用途                        | 期间                     | 清除方式                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------- | ------------------------ | ------------------------------------------------------------ |
| [Router Cache](https://nextjs.org/docs/app/building-your-application/caching#client-side-router-cache)路由器缓存 | 缓存在客户端，通过link导航的方式才会被缓存                   | 减少服务器上的导航请求      | 用户会话或基于时间的会话 | 页面刷新的时候会清除缓存                                     |
| 全路由缓存                                                   | HTML和服务端组件有效载荷（<font color='red'>**静态渲染的路由**</font>） | 降低渲染成本并提高性能      | 持续（可以重新验证）     | 变为动态渲染组件                                             |
| 请求记忆                                                     | 函数的返回值，是一个React功能                                | 在React组件树中重复使用数据 | 每次重新生命周期         | const { signal } = new AbortController() fetch(url, { signal }) |
| 数据缓存                                                     | Data                                                         | 跨用户请求和部署存储数据    | 持续（可以重新验证）     | 服务端                                                       |

### 主动退出缓存

以上四种缓存的**主动**退出方式

1. 路由器缓存

有效期：静态渲染缓存有效期是5分钟，动态渲染缓存有效期是30秒。

使用`router.refresh`

```tsx
import { useRouter } from 'next/navigation'
export default function RootLayout({children}) {
	const router = useRouter()
  return (
  	<div>
    	<nav>
      	<span onClick={
            () => {
              router.push('/news')
              router.refresh()
            }
          }>
        	跳转
        </span>
      </nav>
      {children}
    </div>
  )
}
```
封装自动刷新页面的组件app/components/navigation-events.tsx

```tsx
'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
 
  useEffect(() => {
    router.refresh()
  }, [pathname, searchParams])
 
  return null
}
```
将其导入到布局中。app/layout.tsx

```tsx
import { Suspense } from 'react'
import { NavigationEvents } from './components/navigation-events'
 
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
 
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  )
}
```

2. 全路由缓存

在组件顶部导出声明`dynamic`

```tsx
export const dynamic = 'force-dynamic'
```

3. 请求记忆(request-memoization)

以自动记忆具有相同URL和选项的请求。这是一个React功能

```tsx
const { signal } = new AbortController() fetch(url, { signal })
```

4. 数据缓存

```tsx
fetch(url, {
  cache: 'no-store' // 在v15版本默认，不进行缓存
})
```



