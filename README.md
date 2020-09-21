# mypUI qq群号：`306797275`

**第一个高效且强悍的nvue开源组件库。做最好、最顺手的nvue组件库**

- 适用于`nvue`页面的组件与工具（app端对应weex，不再是webview）；
- 纯`flex`布局，符合`weex`规范（兼容Vue页面只需要加几个display:flex即可）；
- 规范与统一，确保代码质量和开发效率；
- 可配置主题；
- 细节开放到位，在好用和可灵活适配之间把握到位；
- request/router/share...各种工具集；
- 页面内容完全自己控制，移除掉了系统自带的navbar和tabbar，以及外层自动包裹的scroll；
- 页面排版更加灵活。遮罩层全屏覆盖。status/nav/xBar处理也非常灵活与方便；
- 精简`page.json`的配置，减少独立配置；
- 已在`Android`/`iOS`/`mp-wexin`/`mp-qq`/`mp-toutiao`等上面有实际应用；

mypUI 是基于 uniapp 的一套组件库与工具集，可以 **高效且规范** 地开发出 uniapp 支持的各端应用（APP/各家小程序/H5/快应用）。兼容 nvue 页面 和 vue 页面。nvue 页面对应的 app端 依托 weex 编译为原生，具备良好的性能与体验。mypUI 绝对能为您带来 **稳定、高效、规范** 的开发体验。



# 2.0全面来袭

## 2.0重点解决什么问题

我们一直在轻量化以及解耦内部的组件以及依赖，2.0我们几乎移除了内部依赖的所有mixin，改为更加独立和轻便的utils function。

同时，2.0版本特别为 APP端 优化，充分利用 APP端 布局的便捷性以及高度决策的便捷性，统一采用自适应高度，为 APP端 移除掉了1.x中引入的高度决策系统。2.0中的list你只需要理解 `flex:1` 就好。

不过，因为移除了以前为了 MP端 而引入的内容，现在的 2.0版中的 list还不能在 MP/H5中使用。预计一个星期之后升级就可以了。

**需要同时考虑 MP/APP/H5 的朋友请继续使用 1.x 版本。**

# 找到代码与我们

- [mypUI-github](https://github.com/wakaryry/mypUI) 欢迎star

- 1.x分支代码 [mypUI-1.x](https://github.com/wakaryry/mypUI/tree/1.x)

- [mypUI-uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=2190) 需要您的好评

- [mypUI-文档开源地址](https://github.com/wakaryry/mypui-doc)

- [mypUI-文档线上地址](https://mypui.asnowsoft.cn)

- [mypUI-1.x文档线上地址](https://mypui.asnowsoft.cn/v1)

- npm地址：[https://www.npmjs.com/package/@mypui/myp-ui](https://www.npmjs.com/package/@mypui/myp-ui)

- 作者wx：`pptpdf`

- 作者qq：`382006503`

- 欢迎加入wx群和qq群。wx群请加wx，qq群请加qq群号：`306797275`

> 强烈建议加入wx与qq群，获取更多mypUI的动态与帮助

# 快速体验

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
- [字体文件转base64](https://transfonter.org/)
- [mescroll](https://ext.dcloud.net.cn/plugin?id=343)。我最开始的scroll刷新和加载更多处理参考了mescroll

如果您发现我们使用了您的`设计`或者`图片`资源，如有侵权，恳请告知，我们一定第一时间删除或者按照您的要求添加申明。

项目中的图片基本上来自于`百度图片`，以及`ui.cn`上面的设计。`ui.cn`上面的资源，我们会列出`设计者名单`以及`主页地址`。
