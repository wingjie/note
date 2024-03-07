# 插件推荐

## number-precision

数字精度处理函数

**Install**

```bash
npm install number-precision --save
```

**Use**

```js
NP.strip(num) // 可以直接写公式，计算出精度数, 也可以第二个参数保留多少位，不会有四舍五入
NP.plus(num1, num2, num3, ...)   // 加
NP.minus(num1, num2, num3, ...)  // 减
NP.times(num1, num2, num3, ...)  // 乘
NP.divide(num1, num2, num3, ...) // 除
NP.round(num, ratio)  // 可以解决toFixed四舍五入出错的问题
```

