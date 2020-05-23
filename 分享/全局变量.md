在使用的过程中，我的全局js 变量在app端总是被重置。在ios和Android上面都有过测试。在mp和H5上可以正常使用。

```
export const tokenInfo = {
	access: null,
	accessTime: null,
	refresh: null,
	refreshTime: null
}
```

我从storage中获取保存的aceess/refresh等信息，然后放入tokenInfo中，接下来我就利用tokenInfo进行请求测试，接下来的请求中往往第一个请求能够获取到tokenInfo，第二个请求获取tokenInfo的时候每一个item就都是空了。

我有一个 请求库，请求库需要用到这个 tokenInfo，每一次请求都会检测 tokenInfo 是否过期，过期就刷新token，或者终止请求等。

因为vuex中的actions引入了这个请求库，所以我暂时没有把 tokenInfo放入 vuex中，只是 用了 一个全局的js文件来存储。

莫非我要放弃所有的actions，然后把 tokenInfo 放在 vuex中？

而 store 在工具类 js中隔离，无法互通。

# 总结
- 全局js变量，在nvue中不可用，会被重置；
- store/vuex在非mixin或者页面的js中不可用，取出来的值都是初始值；
- 使用getApp共享全局变量；

