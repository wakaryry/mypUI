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

> 组件中对于主题的一些约定

在文档中，主题类的属性，我们都会说明，`xxxx主题`，比如 背景主题 颜色主题 尺寸主题。其它非主题类的，我们会说明为：`样式` 或者 `自定义xxxx`，比如 文字样式 自定义高度 自定义宽度。

在组件里面，您应该已经注意到了，我们的组件中存在：xxx xxxType xxxSize xxxStyle 这些非常规范与统一的属性。

- xxxType: 对应的是背景主题，或者文字颜色主题。背景主题对应 base.scss中的 `myp-bg`，颜色主题对应 base.scss 中的 `myp-color`；

- xxxSize: 对应的尺寸类的主题，具体看对应的属性语意，一般对应：`myp-size`(文字尺寸主题)

> 如何自定义主题变量的值

我们不建议您直接修改 `mypui.scss` 以及 `base.scss`。因为这不利于您的升级和维护。

我们建议您直接将 mypui.scss 中的变量全部复制到 uni.scss 中，然后在 uni.scss 中修改变量值。

> 如何增加主题变量


> 各端兼容
