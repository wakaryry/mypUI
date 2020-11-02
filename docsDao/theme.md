---
title: 主题配置
type: guide
order: 4
---

mypUI 是基于主题配置的组件库，在快速配置与开发的同时，给予了您足够便捷的个性化能力。

了解 mypUI 的主题配置是非常有用的：

- 1. 加快您熟悉 mypUI；
- 2. 知道具备哪些可配置项；
- 3. 熟悉base.scss中可用的class；
- 4. 提供了一个组件库比较成熟的主题变量；

我们主要从以下几个方面来讲主题与主题配置：

- 主题变量的分类与设计；
- 主题变量与base.scss的对应，以及base.scss的解析；
- 组件中对于主题的一些约定；
- 如何自定义主题变量的值；
- 如何增加主题变量；
- 各端兼容；

> 主题变量的分类与设计

我们的主题变量的定义都在 mypui.scss 文件中，主要包含：

- 主题色；
- 特殊色；
- 多级文本色；
- 特殊语意文本色；
- 通用背景色；
- 特殊语意背景色；
- 边框色；
- 边框宽度；
- 高度；
- 字体大小；
- 字体行高；
- 圆角大小；
- 上下间距；
- 左右间距；
- 特殊语意下透明度；
- 导航栏相关的主题配置；

具体如下：

```scss
// 
// 主题色：通常一个APP在设计稿上，主题色一般是 3色或者4色。过多的色彩不仅混乱，而且不好管理与维护
// 
$myp-color-primary: #8F9CFF;  // 主要主题色，通常是设计稿中的主体色彩
$myp-color-success: #8FDAFF;  // 成功主题色，通常用于表征：安全的/通过的/成功的
$myp-color-warning: #FFD666;  // 警告主题色，通常用于表征：提示/警告/有风险/需要注意
$myp-color-error: #FF9090;  // 错误主题色，通常用于表征：有危险/谨慎操作/错误

//
// 特殊色：有时候我们会碰到一些主题之外的特殊色，我们开放了一个 自定义色彩作为补充，也提供了一个特殊语意的（链接色）
//
$myp-color-custom: #4A5061;  // 自定义的主题色，作为补充
$myp-color-link: #0273F1;  // 特殊的链接色，有时候文字中的特殊提示可能不是主题色，特殊的链接色可以用来作为特殊的文字提示

//
// 多级文本色：提供四级文本色以及一个反色。反色通常用于深色背景
//
$myp-text-color: #333232;  // 一级文本色，也是主要文本色，用于显示与阅读
$myp-text-color-inverse: #FFFFFF;  // 反色
$myp-text-color-second: #666464;  // 二级文本色，一般用于描述/提示
$myp-text-color-third: #999696;  // 三级文本色，辅助色
$myp-text-color-forth: #CCC8C8;  // 四级文本色，辅助色

// 
// 特殊语意文本色：提供了 占位字符串以及禁用时的文本颜色
//
$myp-text-color-place: #CCC8C8;  // 占位符的颜色
$myp-text-color-disabled: #CCC8C8;  // 禁用时文本颜色。用得少，一般禁用时使用opacity

//
// 通用背景色：提供了反色、通用页面色、浅色、暗色背景色设置
//
$myp-bg-color-inverse: #FFFFFF;  // 反色背景
$myp-bg-color-page: #FAFAFA;  // 通用页面背景色
$myp-bg-color-light: #F3F4F5;  // 浅色背景色
$myp-bg-color-dark: #F1F1F1;  // 暗色背景色

//
// 特殊语意背景色：hover时的背景色以及mask的背景色
//
$myp-bg-color-hover: #F1F1F1;  // hover时的背景色
$myp-bg-color-hover-dark: rgba(0, 0, 0, 0.8);  // hover时的暗色
$myp-bg-color-mask: rgba(0, 0, 0, 0.2);  // 浅色遮罩
$myp-bg-color-mask-dark: rgba(0, 0, 0, 0.8);  // 暗色遮罩

//
// 边框色：提供了浅/暗主题以及反色
//
$myp-border-color: #F7F5F5;  // 通用边框色
$myp-border-color-light: #F7F5F5;  // 浅色
$myp-border-color-dark: #EBEBEB;  // 暗色
$myp-border-color-inverse: #FFFFFF;  // 反色

//
// 边框宽度：方便不同端设置不同的宽度
//
/* #ifdef APP-NVUE */
$myp-border-width: 1px;
/* #endif */
/* #ifndef APP-NVUE */
$myp-border-width: 1px;
/* #endif */

//
// 高度：
//
$myp-height-ss: 40rpx;  // ss
$myp-height-s: 60rpx;  // s
$myp-height-base: 80rpx;  // base
$myp-height-l: 100rpx;  // l
$myp-height-ll: 120rpx;  // ll

//
// 字体大小
//
$myp-font-size-ss: 24rpx;  // ss
$myp-font-size-s: 28rpx;  // s
$myp-font-size-base: 30rpx;  // base
$myp-font-size-l: 32rpx;  // l
$myp-font-size-ll: 36rpx;  // ll

//
// 字体行高
//
$myp-lh-ss: 34rpx;  // ss
$myp-lh-s: 40rpx;  // s
$myp-lh-base: 42rpx;  // base
$myp-lh-l: 45rpx;  // l
$myp-lh-ll: 50rpx;  // ll

//
// 圆角大小
//
$myp-border-radius-ss: 4rpx;  // ss
$myp-border-radius-s: 6rpx;  // s
$myp-border-radius-base: 12rpx;  // base
$myp-border-radius-l: 24rpx;  // l
$myp-border-radius-ll: 60rpx;  // ll

//
// 上下间距
//
$myp-space-ss: 6rpx;  // ss
$myp-space-s: 12rpx;  // s
$myp-space-base: 16rpx;  // base
$myp-space-l: 24rpx;  // l
$myp-space-ll: 32rpx;  // ll

//
// 左右间距
//
$myp-wing-ss: 12rpx;  // ss
$myp-wing-s: 24rpx;  // s
$myp-wing-base: 32rpx;  // base
$myp-wing-l: 36rpx;  // l
$myp-wing-ll: 40rpx;  // ll

//
// 特殊语意下的透明度
//
$myp-opacity-disabled: 0.5;  // 禁用时透明度
$myp-opacity-hover: 0.5;  // 透明度变化效果的hover

//
// 导航栏相关的主题配置
//
$myp-nav-title-color: #000000;  // 导航栏的标题色
$myp-nav-title-size: 16px;  // 导航栏标题字体大小
$myp-nav-icon-color: #4C4C4C;  // 导航栏item的icon颜色
$myp-nav-icon-size: 20px;  // 导航栏item的icon字体大小
$myp-nav-item-color: #4C4C4C;  // 导航栏item的文字颜色
$myp-nav-item-size: 14px;  // 导航栏item的文字大小
$myp-nav-bg-color: #FFFFFF;  // 导航栏的背景色
```

<p class="tip">对于主题值里面的单位，rpx还是px，取决于您自己。我们默认提供了rpx单位，您可以使用px单位</p>

> 主题变量与base.scss的对应，以及base.scss的解析

base.scss 中定义的class，基本上已经足够支撑大多数的设计。熟悉它里面与主题的对应关系以及有哪些内容，对于快速开发，以及减少css代码的书写，与减少包体积来说是十分重要的。

我们的组件库内部依赖全局样式`base.scss`，而且我们的组件里面很少用到别的样式。我们尽量在复用base.scss的样式，这对于小程序等需要分包的端来说是比较重要的，能够最大程度减少包体积。我自己本人也在用mypUI做项目，我们会一直全方面优化mypUI。也正是因为我不是为了框架而出框架，我更多的是项目的体验与实战，所以mypUI才会真的一直越做越好。

`base.scss`中提供了 flex布局、背景主题、颜色主题、字体大小主题、行高主题、高度主题、间距主题、文字省略、边框主题、圆角主题、遮罩主题、hover主题等各方面class。

具体的对应关系您应该查阅`base.scss`里面的内容。

`base.scss`绝对足够支撑大多数业务与设计，而且我们的组件库就是基于`base.scss`的。

很多人不知道主题类的设置到底有哪些值，其实具体有哪些值，取决于 `base.scss`，以及您是否添加了一些自定义的主题等。

这些设置值对应为：

- 边框主题：myp-border 下的class；
- 背景色主题：myp-bg 下的class；
- 颜色主题：myp-color 下的class；
- 文字尺寸主题：myp-size 下的class；
- ...

具体的内容您应该去看 `base.scss`。您只有了解了 主题与样式 的对应关系才能更好的使用 `mypUI`。

> 组件中对于主题的一些约定

在文档中，主题类的属性，我们都会说明，`xxxx主题`，比如 背景主题 颜色主题 尺寸主题。其它非主题类的，我们会说明为：`样式` 或者 `自定义xxxx`，比如 文字样式 自定义高度 自定义宽度。

在组件里面，您应该已经注意到了，我们的组件中存在：xxx xxxType xxxSize xxxStyle 这些非常规范与统一的属性。

- xxxType: 对应的是背景主题，或者文字颜色主题。背景主题对应 base.scss中的 `myp-bg`，颜色主题对应 base.scss 中的 `myp-color`；

- xxxSize: 对应的尺寸类的主题，具体看对应的属性语意，一般对应：`myp-size`(文字尺寸主题)

> 如何自定义主题变量的值

我们不建议您直接修改 `mypui.scss` 以及 `base.scss`。因为这不利于您的升级和维护。

我们建议您直接将 mypui.scss 中的变量全部复制到 uni.scss 中，然后在 uni.scss 中修改变量值。

> 如何增加主题变量

我们不建议您直接在mypUI.scss以及base.scss中增加变量和相关的class。

您应该在uni.scss中增加变量，然后增加一个新的对应的class样式文件，并且在app.vue里面引入这个样式文件。

> 各端兼容

为了兼容各端的统一开发，以及单个开发某个端时的便利性，我们为需要兼容考虑的某些端提供了兼容scss样式文件。比如 `mp.scss` 和 `h5.scss`。

如果您需要编译到这些平台，您应该条件引入这些样式：

```html
<style lang="scss">
	@import '@/mypUI/base.scss';
	/* #ifdef MP */
	@import '@/mypUI/mp.scss';
	/* #endif */
	/* #ifdef H5 */
	@import '@/mypUI/h5.scss';
	/* #endif */
</style>
```

需要编译到多端的时候，记得查看兼容平台相应的样式中的优先级。如果需要在样式中个性化，需要考虑优先级问题。

比如H5中：

```html
<style lang="scss">
.myp-border {
	&-all {
		border-width: $myp-border-width !important;
		border-style: solid !important;
		border-color: $myp-border-color !important;
	}
}
</style>
```

因为`h5.scss`中全局样式兼容的时候存在 `!important`，优先级高。所以如果您需要覆盖，记得在自己的样式里面加 `!important`。

为什么会需要添加优先级：

```css
/*
// 这是uni自动嵌入的样式，这些样式会直接嵌入到 组件/页面；
// 这些样式的优先级非常高，比任何在 app.vue 里面引入的全局 style/class 也要高，毕竟这些样式是直接在组件文件下的；
// 为了使 全局css 生效，我们 得给涉及到 这些属性的样式 设置 !important；
// 而且，在 style 中个性化配置的时候也需要加 !important，否则无法生效；
*/

view,
swiper-item,
scroll-view {
  display:-webkit-box;
  display:-webkit-flex;
  display:flex;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
  -webkit-flex-direction:column;
          flex-direction:column;
  -webkit-flex-shrink: 0;
          flex-shrink: 0;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
          flex-grow: 0;
  -webkit-flex-basis: auto;
          flex-basis: auto;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
          align-items: stretch;
  -webkit-align-content: flex-start;
          align-content: flex-start;
}
view,
image,
input,
scroll-view,
swiper,
swiper-item,
text,
textarea,
video {
  position: relative;
  border: 0px solid #000000;
  box-sizing: border-box;
}
swiper-item {
  position: absolute;
}
```
