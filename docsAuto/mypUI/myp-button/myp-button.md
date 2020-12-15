# myp-button

## Props

| Prop name     | Description                                | Type    | Values | Default                  |
| ------------- | ------------------------------------------ | ------- | ------ | ------------------------ |
| bgType        | 背景主题                                   | string  | -      | ''                       |
| text          | 文字内容                                   | string  | -      | ''                       |
| icon          | 左侧图标                                   | string  | -      | ''                       |
| icon2         | 右侧图标                                   | string  | -      | ''                       |
| loading       | 是否为 loading 状态                        | boolean | -      | false                    |
| loadingSrc    | loading 状态时显示的图片                   | string  | -      | '/static/ui/loading.gif' |
| height        | 高度主题                                   | string  | -      | 'l'                      |
| hover         | 点击时的 hover 效果: opacity/bg/bg-opacity | string  | -      | 'opacity'                |
| radius        | 圆角主题                                   | string  | -      | 'base'                   |
| border        | 边框主题                                   | string  | -      | ''                       |
| disabled      | 是否为禁用状态。禁用时不可点击             | boolean | -      | false                    |
| highlight     | 是否为高亮状态                             | boolean | -      | false                    |
| space         | 文字与图标之间的间距                       | string  | -      | '12rpx'                  |
| textType      | 文字颜色主题                               | string  | -      | 'text'                   |
| textSize      | 文字尺寸主题                               | string  | -      | 'base'                   |
| iconType      | 左侧图标颜色主题                           | string  | -      | 'text'                   |
| iconSize      | 左侧图标尺寸主题                           | string  | -      | 'l'                      |
| icon2Type     | 右侧图标颜色主题                           | string  | -      | 'text'                   |
| icon2Size     | 右侧图标尺寸主题                           | string  | -      | 'l'                      |
| boxStyle      | 外层样式                                   | string  | -      | ''                       |
| textStyle     | 文字样式                                   | string  | -      | ''                       |
| iconBoxStyle  | 左侧图标外层样式                           | string  | -      | ''                       |
| iconStyle     | 左侧图标样式                               | string  | -      | ''                       |
| icon2BoxStyle | 右侧图标外层样式                           | string  | -      | ''                       |
| icon2Style    | 右侧图标样式                               | string  | -      | ''                       |
| loadingWidth  | loading 图标的宽度                         | string  | -      | '36rpx'                  |
| loadingHeight | loading 图标的高度                         | string  | -      | '36rpx'                  |

## Events

| Event name    | Type | Description |
| ------------- | ---- | ----------- |
| buttonClicked |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| extra   |             |          |

---
