# React面试

1. [https://zhuanlan.zhihu.com/p/143570474](https://zhuanlan.zhihu.com/p/143570474)



## fiber

由于render函数递归执行，如果项目变得庞大后，会有卡顿，`requestIdleCallback`可以利用浏览器的业余时间，把任务分成一个个的小任务，然后利用浏览器空闲时间来做diff，如果当前有任务来了，比如用户的点击或者动画，会先执行，然后空闲后，回到当前任务继续执行未完成的任务；



### Fiber的描述
React Fiber 是 React 的一个重新实现的核心算法，旨在改进其对于大型和复杂应用程序的性能。

React Fiber 架构的主要目标是实现增量式渲染，使得在渲染大型组件树时，React 可以将渲染过程拆分成多个较小的步骤，每一步骤都可以被打断或者中止，从而可以让应用程序更加灵敏和响应。

### 老版本的渲染问题
在传统的 React 渲染模型中，React 会从根组件开始，一直递归渲染整个组件树，直到完成所有的渲染操作。如果组件树非常大或者组件的渲染耗时很长，那么这个渲染过程会非常缓慢，甚至会导致浏览器卡顿或者崩溃。

### Fiber解决的问题
React Fiber 的实现方式是通过将渲染过程拆分成一系列的小任务，然后将这些任务分散在多个帧中进行处理。在每一帧中，React Fiber 会尽可能多地处理这些小任务，然后将控制权交还给浏览器，让浏览器有足够的时间处理用户的输入和其他操作。这种方式可以有效地避免应用程序的卡顿和崩溃。

React Fiber 架构还支持 React 的异步渲染功能，这意味着可以将优先级高的任务优先处理，而不是等待所有的任务都完成后再开始渲染。这样可以提高应用程序的响应速度，同时还能确保组件的渲染顺序是正确的。

总的来说，React Fiber 架构是 React 的一个重要升级，它可以使得 React 应用程序更加灵活、高效和响应。

### Fiber带来了什么

* 增量渲染
* 为不同的任务分配优先极
* 更新时能暂停、终止、复用渲染任务
* 并发 



### fiber数据结构

fiber遍历过程：自上而下，自左至右；

先找子元素 -> 再找兄弟元素 -> 再找父元素；

### fiber结构

```ts
export type Fiber = {|
  // 1. fiber节点自身状态相关
  pendingProps: any,
  memoizedProps: any,
  updateQueue: mixed,
  memoizedState: any,

  // 2. fiber节点副作用(Effect)相关
  flags: Flags,
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,
  nextEffect: Fiber | null,
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,
|};
```





## redux面试相关

### redux由以下组件组成：

Action：这是一个用来描述发生了什么事情的对象；

Reducer：这是一个确定状态将如何变化的地方

Store：整个程序的状态/对象树保存在Store中；

### 解释reducer的作用

reducers是纯函数，它规定应用程序的状态怎样因响应Action而改变，reducers通过接受先前的状态和action来工作，然后它返回一个新的状态，它根据操作的类型确定需要执行哪种更新，然后返回新的值，如果不需要完成任务，它会返回原来的状态；

### Store在redux中的意义是什么

Store是一个javascript对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器，应用程序的整个状态/对象树保存在单一存储中，因此，redux非常简单且是可预测的，我们可以将中间件传递到store来处理数据，并记录改变存储状态的各种操作，所有操作都通过reducer返回一个新状态；

### Redux与Flux有何不同？

1. Flux的Store包含状态和更改逻辑，Redux中Store和更改逻辑是分开的；
2. flux中有多个store，redux只有一个store；
3. flux中所有store都互不影响且是平级的，redux带有分层reducer的单一store；
4. flux有单一调度器，redux没有调度器的概念；
5. flux中react组件订阅store，



## react18

1. react18放弃对ie11的支持，需要使用ie要退回到react17
2. render引入并发模式的渲染，可以render多个节点了，引入react-dom中的createRoot，卸载时也需要`root.unmount()`了，使用旧的api时会看到警告提示
3. react18删除了关于内存泄漏的警告错误，在18之前useEffect中更新state状态，实际上没有造成内存泄漏，是因为被垃圾回收了，18中删除了这个错误
4. react18之前返回值必须为null，undefined则抛出错误，18之后不会再检查undefined错误了（但是在react18的dts文件还是会检查）
5. 在react18之前suspence组件必须要使用fallback，否则查找上一个suspence组件，考虑到不好调试的原因更新后则不会再查找上一个suspence组件

### 新的API

**useId**

支持同一个组件在客户端和服务端生成相同的唯一的 ID，避免 `hydration` 的不兼容，这解决了在 `React 17` 及 `17` 以下版本中已经存在的问题。因为我们的服务器渲染时提供的 `HTML` 是`无序的`，`useId` 的原理就是每个 `id` 代表该组件在组件树中的层级结构。

```tsx
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};
```

**useSyncExternalStore**   

一般是第三方管理库使用，日常业务中不需要关注，可以到官网了解



**useInsertionEffect**  

与useEffect和useLayoutEffect相同，这个在useLayoutEffect之前注入，详细可以到官网了解





### Concurrent Mode

react17中就可以通过一些试验性的api开启，CM本身并不是一个功能，而是一个底层设计；



 并发模式可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复`阻塞渲染`限制。在 `Concurrent` 模式中，`React` 可以同时更新多个状态。

通俗易懂是指：react18将react17从`同步不可中断更新`变成了`异步可中断更新`



开启并发模式需要使用`createRoot().render`方式渲染 ；

在react17当中的实验性功能里面，开启并发模式就开启了并发更新，在react18更新之后，官方策略进行了调整，不再依赖开启并发模式来开启并发更新，需要手动开启并发更新，开启并发更新需要使用react18新的api；新api有`useDeferredValue` 和 `useTransition`

**useTransition**

```tsx
import React, { useState, useEffect, useTransition } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null));
    });
  }, []);
  return (
    <>
      {list.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

被startTransition包裹的setState触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占



**useDeferredValue**

```tsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    setList(new Array(10000).fill(null));
  }, []);
  // 使用了并发特性，开启并发更新
  const deferredList = useDeferredValue(list);
  return (
    <>
      {deferredList.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

两个方法不同于，`useTransition`是用来包装方法的，`useDeferredValue`是用来包装值的



参考资料：[React18 新特性解读 & 完整版升级指南](https://juejin.cn/post/7094037148088664078)