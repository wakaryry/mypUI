# mypUI

**基于uniapp，快速开发nvue页面的组件库与工具集。一套代码实现mp/H5/app**

- 适用于`nvue`页面的组件与工具（app端对应weex，不再是webview）；
- 纯`flex`布局，符合`weex`规范；
- 规范与统一，确保代码质量和开发效率；
- 可配置主题；
- 细节开放到位，在好用和可灵活适配之间把握到位；
- request/router/share...各种工具集；
- 页面内容完全自己控制，移除掉了系统自带的navbar和tabbar，以及外层自动包裹的scroll；
- 页面排版更加灵活。遮罩层全屏覆盖。status/nav/xBar处理也非常灵活与方便；
- 精简`page.json`的配置，减少独立配置；
- 已在`Android`/`iOS`/`mp-wexin`/`mp-qq`/`mp-toutiao`上面有实际应用；

# wx与qq群

- wx：pptpdf  
- qq：382006503  
- qq群：306797275  
- wx群：加wx拉入群

# 使用

- 直接将`mypUI`放在项目根目录下；
- `loadingSrc`等公用静态资源直接使用了`/static/ui`下面的静态文件，没有使用网络图片，所以需要拷贝到自己的项目下（`/static/ui`这个路径还是需要保持一致的）；
- 使用了`全局css`，记得在`app.vue`里面引入`base.scss`：`@import '@/mypUI/base.scss';`；
- 如果需要使用`scss变量`，在`app.vue`里面全局引入是不起作用的，需要在需要使用的地方引入；
- 必须开启`easycom`配置，在`pages.json`下配置：
```json
"easycom": {
	"autoscan": true,
	"custom": {
		"myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue" // 匹配mypUI内的vue文件
	}
}
```
- 使用完全自控的开发方式：
```json
{
	"path": "pages/base/index",
	"style": {
		"disableScroll": true
	}
}
```
- 修改scss变量的值来适配您的UI；

# 体验

- 安装HBuilderX；
- 下载或者clone本UI库；
- 在HBuilderX里面打开或者导入；
- 运行到自己想要体验的平台即可；

# 说明

- 当时写这套`nvue`组件的时候，还没有任何一款`nvue`页面组件在开放或者售卖;
- 第一版的时候，其实是根据`weex-ui`改的。`scroll`是根据`mescroll`改的（当时`mescroll`还不是`mixin`的形式，现在`mescroll`和以前也大不相同了吧）;
- 不要盲目去适配一个组件，当一个组件的适配程度比较复杂的时候，宁愿重新写，也不去适配;

希望对你有用。

# 工具与申明

- [免费图片压缩](https://tinypng.com/)
- [免费图片托管](https://img.wenhairu.com/)
- [mescroll](https://ext.dcloud.net.cn/plugin?id=343)。我最开始的scroll刷新和加载更多处理参考了mescroll

如果您发现我们使用了您的`设计`或者`图片`资源，如有侵权，恳请告知，我们一定第一时间删除或者按照您的要求添加申明。

项目中的图片基本上来自于`百度图片`，以及`ui.cn`上面的设计。`ui.cn`上面的资源，我们会列出`设计者名单`以及`主页地址`。
