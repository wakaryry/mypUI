---
title: 遮罩层：myp-overlay
type: guide
order: 258
page: /static/h5/#/pages/pop/index
---

## Props

| Prop name      | Description                  | Type    | Values | Default                 |
| -------------- | ---------------------------- | ------- | ------ | ----------------------- |
| show           | 是否打开                     | boolean | -      | false                   |
| hasAnimation   | 是否有动画                   | boolean | -      | true                    |
| duration       | 动画周期                     | number  | -      | 400                     |
| timingFunction | 动画函数                     | array   | -      | ['ease-in', 'ease-out'] |
| bgType         | 背景主题                     | string  | -      | 'mask'                  |
| bg             | 自定义背景色                 | string  | -      | ''                      |
| canAutoClose   | 点击之后是否自动关闭 overlay | boolean | -      | true                    |
| left           | 与屏幕左侧距离               | string  | -      | '0'                     |
| top            | 与屏幕顶部距离               | string  | -      | '0'                     |
| right          | 与屏幕右侧距离               | string  | -      | '0'                     |
| bottom         | 与屏幕底部距离               | string  | -      | '0'                     |
| boxStyle       | 外层样式。比如设置 z-index   | string  | -      | ''                      |

## Events

| Event name      | Type      | Description |
| --------------- | --------- | ----------- |
| overlayClicked  | undefined |
| overlayClicking | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
