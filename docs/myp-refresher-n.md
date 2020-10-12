---
title: 刷新：myp-refresher-n
type: guide
order: 301
---

## Props

| Prop name      | Description               | Type   | Values | Default               |
| -------------- | ------------------------- | ------ | ------ | --------------------- |
| scrollerRef    | 对应的 list/scroll 的 ref | string | -      |                       |
| maxTime        | 超时时间。0 表示不会超时  | number | -      | 0                     |
| mainText       | 下拉文字提示              | string | -      | '下拉触发刷新...'     |
| pullingText    | 满足是否刷新时文字提示    | string | -      | '释放即可刷新...'     |
| refreshingText | 刷新时文字提示            | string | -      | '正在努力加载...'     |
| downIcon       | 下拉的图标                | string | -      | '/static/ui/down.png' |

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| refresh     | undefined |
| pullingDown | undefined |

---

