---
title: 分割器：myp-divider
type: guide
order: 210
page: http://mypui.asnowsoft.cn/h5/#/pages/base/divider
---

## Props

| Prop name | Description    | Type    | Values | Default   |
| --------- | -------------- | ------- | ------ | --------- |
| vertical  | 是否竖向       | boolean | -      | false     |
| bgType    | 分割线背景主题 | string  | -      | 'border'  |
| boxBgType | 外层背景主题   | string  | -      | 'inverse' |
| boxBg     | 外层背景色     | string  | -      | ''        |
| bg        | 分割线背景色   | string  | -      | ''        |
| left      | 分割线左侧间距 | string  | -      | '0'       |
| right     | 分割线右侧间距 | string  | -      | '0'       |
| width     | 分割线宽度     | string  | -      | '1px'     |
| height    | 分割线高度     | string  | -      | '1px'     |

---

其实就是 竖向的线 或者 横向的线。

**示范**

```html
<myp-divider></myp-divider>

<myp-divider left="32rpx" right="32rpx"></myp-divider>

<myp-divider bgType="error" left="32rpx" right="32rpx"></myp-divider>

<myp-divider bgType="error" :vertical="true" width="1px" height="80rpx" left="32rpx" right="32rpx"></myp-divider>
```

**结果**

![myp-divider](/images/doc/divider.jpeg)
