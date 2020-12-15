---
title: 输入框：myp-input
type: guide
order: 152
page: https://mypui.asnowsoft.cn/h5/#/pages/base/input
---

## Props

| Prop name         | Description                        | Type    | Values | Default      |
| ----------------- | ---------------------------------- | ------- | ------ | ------------ |
| format            | 自定义格式，每一段的长度:[3, 4, 4] | array   | -      | []           |
| separator         | 自定义格式的分割器                 | string  | -      | " "          |
| type              | input 的 type                      | string  | -      | "text"       |
| maxlength         | 最大输入                           | number  | -      | 140          |
| password          | 是否密码                           | boolean | -      | false        |
| icon              | 左侧图标                           | string  | -      | ''           |
| label             | 左侧 label 文字                    | string  | -      | ""           |
| value             | 值                                 | string  | -      | ""           |
| placeholder       | placeholder                        | string  | -      | "请输入内容" |
| indicator         | 右侧图标                           | string  | -      | ''           |
| valueAlign        | 文字排版                           | string  | -      | 'left'       |
| bgType            | 背景主题                           | string  | -      | ''           |
| height            | 高度主题                           | string  | -      | ''           |
| border            | 边框主题                           | string  | -      | 'bottom'     |
| radius            | 圆角主题                           | string  | -      | ''           |
| valueType         | 值颜色主题                         | string  | -      | ''           |
| valueSize         | 值尺寸主题                         | string  | -      | ''           |
| iconType          | 图标颜色主题                       | string  | -      | ''           |
| iconSize          | 图标尺寸主题                       | string  | -      | 'l'          |
| labelType         | label 颜色主题                     | string  | -      | ''           |
| labelSize         | label 尺寸主题                     | string  | -      | ''           |
| indicatorType     | 右侧图标颜色主题                   | string  | -      | ''           |
| indicatorSize     | 右侧图标尺寸主题                   | string  | -      | 'l'          |
| placeType         | placeholder 颜色主题               | string  | -      | 'place'      |
| placeSize         | placeholder 尺寸主题               | string  | -      | ''           |
| adjust            | 键盘 adjust-position 弹出方式      | boolean | -      | true         |
| confirmType       | confirm-type                       | string  | -      | 'done'       |
| iconStyle         | 图标样式                           | string  | -      | ''           |
| iconBoxStyle      | 图标外层样式                       | string  | -      | ''           |
| labelStyle        | label 样式                         | string  | -      | ""           |
| valueStyle        | 值样式                             | string  | -      | 'flex:1;'    |
| indicatorStyle    | 右侧图标样式                       | string  | -      | ''           |
| indicatorBoxStyle | 右侧图标外层样式                   | string  | -      | ''           |
| boxStyle          | 外层样式                           | string  | -      | ""           |
| space             | 内部各元素之间的空隙               | string  | -      | '12rpx'      |
| placeStyle        | placeholder 的样式                 | string  | -      | ''           |

## Events

| Event name           | Type      | Description |
| -------------------- | --------- | ----------- |
| focus                | undefined |
| blur                 | undefined |
| keyboardHeightChange | undefined |
| input                | undefined |
| formated             | undefined |
| confirm              | undefined |
| indicatorClicked     |           |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| label |             |          |
| extra |             |          |

---

