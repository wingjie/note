# 路由处理程序、Server Action

## 路由处理程序

在app文件夹下创建文件，一般来说都会在app文件下创建一个api的文件夹`app/api/**/route.ts`

例子：

- df
  - Sd


app/api/**/route.ts

```ts
export async function GET(request: Request) {}
export async function POST(request: Request) {}
```

### 动态路由

跟page一样可以使用`app/**/[id]/router.ts`

```ts
// app/item/[slug]/route.ts

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug // 'a', 'b', or 'c'
}
```

### 获取请求头数据

```ts
import { headers } from 'next/headers'
 
export async function GET(request: Request) {
  const headersList = await headers()
  const referer = headersList.get('referer')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { referer: referer },
  })
}
```

### [Cookies](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cookies)

```ts
import { cookies } from 'next/headers'
 
export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
```

### [设置为缓存](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching)

```ts
export const dynamic = 'force-static'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
```

> 其他受支持的HTTP方法也不会被缓存，即使它们与同一文件中的GET方法旁边放置。

### [获取路径上Query参数](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters)

```ts
import { type NextRequest } from 'next/server'
 
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello
}
```

### [获取Body参数](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body)

```ts
export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ res })
}
```

...

## Server Action

操作在**服务器**上的异步函数，在文件的顶部标记`use server`，和路由处理程序的区别是server action 不用使用fetch进行请求，而是像普通函数直接引入调用即可。

创建

```ts
'use server'
 
export async function create() {}
```

使用

```ts
'use client'
 
import { create } from './actions'
 
export function Button() {
  return <button onClick={() => create()}>Create</button>
}
```

在server action中跳转路由的方法

```ts
import { redirect } from 'next/navigation';

export async function POST() {
  // 执行你的操作，如数据处理等
  // 例如：处理表单提交

  // 在操作完成后进行重定向
  redirect('/thank-you');  // 重定向到新的页面
}
```



## 路由拦截(Middleware)

用app同目录下的`middleware.ts`来定义中间件

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// 匹配到一下配置的路径才会走middleware这个方法
export const config = {
  // matcher: '/about/:path*',
  matcher: ['/about/:path*', '/dashboard/:path*'],

}
```



## 集成lowdb增加和删除

> 操作json文件

安装

```shell
npm i lowdb
```

创建文件

```ts
import { JSONFilePreset } from 'lowdb/node'
const db = await JSONFilePreset('db.json', { posts: [] })
```

文件写入数据

```ts
const post = { id: 1, title: 'lowdb is awesome', views: 100 }
await db.update(({ posts }) => posts.push(post))
```

获取数据

```ts
const data = db.data.posts
```

