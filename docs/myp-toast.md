---
title: toast提示：myp-toast
type: guide
order: 252
---

## Props

| Prop name    | Description | Type           | Values | Default            |
| ------------ | ----------- | -------------- | ------ | ------------------ |
| interval     |             | number\|string | -      | 2000               |
| needMask     |             | boolean        | -      | false              |
| maskType     |             | string         | -      | 'mask'             |
| maskStyle    |             | string         | -      | ''                 |
| contentStyle |             | string         | -      | ''                 |
| iconType     |             | string         | -      | 'inverse'          |
| iconSize     |             | string         | -      | 'll'               |
| iconStyle    |             | string         | -      | ''                 |
| bigIconStyle |             | string         | -      | 'font-size:60rpx;' |
| textType     |             | string         | -      | 'inverse'          |
| textSize     |             | string         | -      | 'base'             |
| textStyle    |             | string         | -      | ''                 |

---

myp-toast 是非常优秀的一个 toast 组件。

- 支持 toast 内容显示在不同的位置；
- 支持 toast 设置图标/文字/内容/背景色，以及大小等样式；
- 支持统一配置，支持个性化配置；
- 提供便捷的mixin，支持拿来即用，什么都不需要配置；

## 使用

```html
<template>
  <view>
    <myp-toast ref="myp-toast"></myp-toast>
  </view>
</template>

<script>
  import toastMixin from '@/mypUI/myp-mixin/toastMixin.js'
  export default {
    mixins: [toastMixin],
    methods: {
      toShowToast() {
        this.mypShowToast({
          text: '发布成功',
          type: 'success',
          mode: 'big'
        })
      }
    }
  }
</script>
```

