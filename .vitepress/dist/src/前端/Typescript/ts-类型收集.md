# 类型收集

## React.forwordRef类型

```ts
interface RsRefForwardingComponent<T extends React.ElementType, P = unknown> {
  <As extends React.ElementType = T>(
    props: React.PropsWithChildren<ReplaceProps<As, WithAsProps<As> & P>>,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  displayName?: string;
}
```

**Use**

```ts
const Button: RsRefForwardingComponent<'button', ButtonProps> = React.forwardRef(props, ref) => {};
```





## 安全的Omit

解决掉omit没有其他属性的问题

```ts
declare type Convert<T> = {
  [K in keyof T]: string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K;
};

/**
 * @description 消除 [x:string]:any
 */
declare type Keys<T extends { [x: string]: any; [x: number]: any }> = Convert<T> extends {
  [_ in keyof T]: infer U;
}
  ? U
  : never;

declare type SafeOmit<T, K extends string | number | symbol> = Exclude<Keys<T>, K> extends keyof T
  ? Pick<T, Exclude<Keys<T>, K>>
  : {};
```

