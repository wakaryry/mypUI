---
title: 搜索框：myp-search
type: guide
order: 161
page: https://mypui.asnowsoft.cn/h5/#/pages/base/search
---

## Props

| Prop name     | Description                                             | Type           | Values | Default                                   |
| ------------- | ------------------------------------------------------- | -------------- | ------ | ----------------------------------------- |
| value         | 值                                                      | string\|number | -      | ''                                        |
| icon          | 图标                                                    | string         | -      | 'search'                                  |
| placeholder   | placeholder                                             | string         | -      | "输入内容开始搜索"                        |
| position      | 内容位置：left/center                                   | string         | -      | 'left'                                    |
| focus         | 是否 focus                                              | boolean        | -      | false                                     |
| adjust        | 键盘弹出方式：adjust-position                           | boolean        | -      | true                                      |
| confirmType   | confirm-type                                            | string         | -      | 'search'                                  |
| fixIcon       | 是否固定图标。position 为 left 时可以将 icon 固定在左侧 | boolean        | -      | false                                     |
| iconTextSpace | 图标与文字的间距                                        | string         | -      | '12rpx'                                   |
| bgType        | 背景色主题                                              | string         | -      | ''                                        |
| valueType     | 内容颜色主题                                            | string         | -      | 'text'                                    |
| placeIconType | placeholder 显示时图标的颜色主题                        | string         | -      | 'place'                                   |
| iconType      | 图标的颜色主题                                          | string         | -      | 'text'                                    |
| placeType     | placeholder 的颜色主题                                  | string         | -      | 'place'                                   |
| height        | 高度主题                                                | string         | -      | 'base'                                    |
| border        | 边框主题                                                | string         | -      | 'all'                                     |
| radius        | 圆角主题                                                | string         | -      | 'll'                                      |
| space         | 左右 padding                                            | string         | -      | '32rpx'                                   |
| valueSize     | 内容的尺寸主题                                          | string         | -      | ''                                        |
| iconSize      | 图标的尺寸主题                                          | string         | -      | 'l'                                       |
| placeSize     | placeholder 的尺寸主题                                  | string         | -      | ''                                        |
| boxStyle      | 外层样式                                                | string         | -      | 'padding-left:32rpx;padding-right:32rpx;' |
| iconStyle     | 图标样式                                                | string         | -      | ''                                        |
| placeStyle    | placeholder 的样式                                      | string         | -      | ''                                        |
| valueBoxStyle | 内容的外层样式                                          | string         | -      | ''                                        |
| valueStyle    | 内容的样式                                              | string         | -      | ''                                        |
| placeBoxStyle | placeholder 的外层样式                                  | string         | -      | ''                                        |

## Events

| Event name           | Type      | Description |
| -------------------- | --------- | ----------- |
| input                | undefined |
| confirm              | undefined |
| focus                | undefined |
| blur                 | undefined |
| keyboardHeightChange | undefined |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| extra |             |          |

---

