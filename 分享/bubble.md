`bubble`为`true`，只是非自定义组件下的`bubble`有效，里面包含了自定义组件的话，事件在自定义组件上，依然会被该自定义的组件拦截。

Android端app必须设置`bubble`才能在该元素以及他包含的元素里面进行事件响应，否则会被最上层的组件拦截，默认是无法穿透的。

不过iOS和mp/h5默认是穿透的。

如果需要拦截，可以使用 `@tap.stop.prevent="xxx"` 形式。

```js
xxx(e) {
	e.stopPropagation && e.stopPropagation()
}
```
