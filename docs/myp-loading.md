---
title: 加载中：myp-loading
type: guide
order: 253
---

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| maskClicked | undefined |

---

myp-loading 同样很帅气。主要用来做 loading 等待状态的提示。用于等待数据 或者 限制用户操作 等。

- 支持 loading 显示在不同的位置；
- 支持 loading 设置图标/文字/背景色，以及大小等样式；
- 支持遮罩层；
- 支持统一配置，支持个性化配置；
- 提供便捷的mixin，支持拿来即用，什么都不需要配置；

## 使用

```html
<template>
  <view>
    <myp-loading ref="myp-loading"></myp-loading>
  </view>
</template>

<script>
  import loadingMixin from '@/mypUI/myp-mixin/loadingMixin.js'
  export default {
    mixins: [loadingMixin],
    methods: {
      toShowLoading() {
        this.mypShowLoading({needMask: true})
      },
      toHideLoading() {
        this.mypHideLoading()
      }
    }
  }
</script>
```

loading 与 toast 不同，loading 打开之后，必须自己在合适的时候 关闭，否则她会一直存在。

