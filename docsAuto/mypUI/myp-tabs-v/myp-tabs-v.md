# myp-tabs-v

## Props

| Prop name       | Description                                                                                                                                            | Type    | Values | Default      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------------ |
| items           | tabs 内容                                                                                                                                              | array   | -      | []           |
| value           | 当前 index                                                                                                                                             | number  | -      | 0            |
| textLabel       | 文字内容的字段                                                                                                                                         | string  | -      | null         |
| scrollSize      | scroll 的自定义高度                                                                                                                                    | string  | -      | '750rpx'     |
| justify         | center 或者 end 的时候，请注意 items 的数量不要超过总尺寸                                                                                              | string  | -      | 'flex-start' |
| textSize        | 文字尺寸主题                                                                                                                                           | string  | -      | ''           |
| activeTextSize  | 当前项文字尺寸主题                                                                                                                                     | string  | -      | ''           |
| bgType          | 背景主题                                                                                                                                               | string  | -      | ''           |
| textType        | 文字颜色主题                                                                                                                                           | string  | -      | ''           |
| activeTextType  | 当前项文字颜色主题                                                                                                                                     | string  | -      | ''           |
| height          | tab 项的自定义高度。0 的时候，自适应高度                                                                                                               | string  | -      | '80rpx'      |
| width           | tab 项的自定义宽度                                                                                                                                     | string  | -      | '120rpx'     |
| top             | 顶部空白占位                                                                                                                                           | string  | -      | '0'          |
| bottom          | 底部空白占位                                                                                                                                           | string  | -      | '0'          |
| hasIndicator    | 是否有指示器                                                                                                                                           | boolean | -      | true         |
| indicatorType   | 指示器背景主题                                                                                                                                         | string  | -      | ''           |
| indicatorWidth  | 指示器自定义宽度                                                                                                                                       | string  | -      | '4rpx'       |
| indicatorHeight | 指示器自定义高度。0 的时候动态高度，自适应高度                                                                                                         | string  | -      | '40rpx'      |
| indicatorRadius | 指示器自定义圆角                                                                                                                                       | string  | -      | '4rpx'       |
| indicatorLeft   | 指示器与左侧的距离                                                                                                                                     | string  | -      | '6rpx'       |
| boxStyle        | 外层样式。也是 scroll 的样式                                                                                                                           | string  | -      | ''           |
| textStyle       | 文字样式                                                                                                                                               | string  | -      | ''           |
| activeTextStyle | 当前项的文字样式                                                                                                                                       | string  | -      | ''           |
| itemStyle       | tab 项的样式                                                                                                                                           | string  | -      | ''           |
| activeItemStyle | 当前 tab 项的样式                                                                                                                                      | string  | -      | ''           |
| indicatorStyle  | 指示器的样式                                                                                                                                           | string  | -      | ''           |
| updateTime      | 通过改变该值触发位置的重新计算。<br>主要是为了兼容各大平台位置获取的时机问题。<br>在弹层里面，items 能够很快拿到，<br>但是不一定位置信息就可以立马拿到 | number  | -      | 0            |
| delay           | 延迟获取元素内容，<br>只影响 mounted 里面的调用，<br>-1 表示不延迟。<br>其他情况使用 updateTime                                                        | number  | -      | -1           |
| hoverTop        | indicator 是否在最上层                                                                                                                                 | boolean | -      | false        |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| change     | undefined |

## Slots

| Name      | Description | Bindings |
| --------- | ----------- | -------- |
| indicator |             |          |

---
