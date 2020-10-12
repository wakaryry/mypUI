# myp-drawer

## Props

| Prop name    | Description                      | Type   | Values | Default                                                                                               |
| ------------ | -------------------------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------- |
| pos          | 出现位置                         | string | -      | 'bottom'                                                                                              |
| bgType       | 内容背景主题                     | string | -      | 'none'                                                                                                |
| duration     | 打开/关闭的动画周期              | number | -      | 300                                                                                                   |
| overlay      | 遮罩层的整体设置                 | object | -      | {<br> timingFunction: ['ease-in', 'ease-out'],<br> duration: 300,<br> bg: '',<br> bgType: 'mask'<br>} |
| height       | 内容高度.0 为自适应.1 为全屏高度 | string | -      | '0'                                                                                                   |
| extra        | 从 height 高度减去的高度         | string | -      | '0'                                                                                                   |
| standout     | 内容露出的高度                   | string | -      | '0'                                                                                                   |
| leftOffset   | 内容左侧偏移量，-1 表示居中      | string | -      | '-1'                                                                                                  |
| rightOffset  | 内容右侧偏移量，-1 表示居中      | string | -      | '-1'                                                                                                  |
| bottomOffset | 内容底部偏移量，-1 表示居中      | string | -      | '-1'                                                                                                  |
| topOffset    | 内容顶部偏移量，-1 表示居中      | string | -      | '-1'                                                                                                  |
| width        | 内容的宽度                       | string | -      | '750rpx'                                                                                              |
| animation    | 打开/关闭动画                    | object | -      | {<br> timingFunction: 'ease-in-out'<br>}                                                              |
| left         | 遮罩左侧偏移量                   | string | -      | '0'                                                                                                   |
| top          | 遮罩顶部偏移量                   | string | -      | '0'                                                                                                   |
| right        | 遮罩右侧偏移量                   | string | -      | '0'                                                                                                   |
| bottom       | 遮罩底部偏移量                   | string | -      | '0'                                                                                                   |
| boxStyle     | 内容外层样式                     | string | -      | ''                                                                                                    |

## Events

| Event name     | Type      | Description |
| -------------- | --------- | ----------- |
| overlayClicked | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| overlay |             |          |
| default |             |          |

---
