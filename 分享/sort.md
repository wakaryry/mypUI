js arr 的sort方法，是原地排序。

排序规则需要定义:

```js
const a = [1, 4, 2, 10, 8]

a.sort((a, b) => {
	// 从小到大。 不能使用 return a < b 之类的
	return a - b
})

a.sort((a, b) => {
	// 从大到小。 不能使用 return a > b 之类的
	return b - a
})

```
