# myp-tabs-h

## Props

| Prop name       | Description                                                                                                                                            | Type    | Values | Default      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------------ |
| items           | tabs 内容                                                                                                                                              | array   | -      | []           |
| value           | 当前 index                                                                                                                                             | number  | -      | 0            |
| last            | 联动时需要。因为 scroll 的过程中，current 就会发生变化，<br>我们需要用另外一个来记录                                                                   | number  | -      | 0            |
| textLabel       | 文字内容的字段                                                                                                                                         | string  | -      | null         |
| offset          | 联动时 swiper 的偏移量。px. swiperScroll dx                                                                                                            | number  | -      | 0            |
| swiperWidth     | swiper 的宽度。联动时需要                                                                                                                              | string  | -      | '750rpx'     |
| isTap           | 是否是点击 tab。不联动时一直设置为 true                                                                                                                | boolean | -      | false        |
| justify         | center 或者 end 的时候，请注意 items 的数量不要超过总尺寸                                                                                              | string  | -      | 'flex-start' |
| scrollSize      | scroll 的自定义宽度                                                                                                                                    | string  | -      | '750rpx'     |
| textSize        | 文字的尺寸主题                                                                                                                                         | string  | -      | ''           |
| activeTextSize  | 当前项文字的尺寸主题                                                                                                                                   | string  | -      | ''           |
| bgType          | 背景主题                                                                                                                                               | string  | -      | ''           |
| textType        | 文字颜色主题                                                                                                                                           | string  | -      | ''           |
| activeTextType  | 当前项的文字颜色主题                                                                                                                                   | string  | -      | ''           |
| height          | 自定义高度                                                                                                                                             | string  | -      | '80rpx'      |
| width           | tab 项的宽度。0 的时候，自适应宽度                                                                                                                     | string  | -      | '120rpx'     |
| left            | 左侧空白占位                                                                                                                                           | string  | -      | '0'          |
| right           | 右侧空白占位                                                                                                                                           | string  | -      | '0'          |
| space           | 各个 tab 之间的间隙                                                                                                                                    | string  | -      | '0px'        |
| border          | 边框主题                                                                                                                                               | string  | -      | 'none'       |
| hasIndicator    | 是否有底下指示器                                                                                                                                       | boolean | -      | true         |
| indicatorType   | 指示器的背景主题                                                                                                                                       | string  | -      | 'primary'    |
| indicatorWidth  | 指示器的自定义宽度。0 的时候动态宽度，自适应宽度                                                                                                       | string  | -      | '80rpx'      |
| indicatorHeight | 指示器的自定义高度                                                                                                                                     | string  | -      | '4rpx'       |
| indicatorRadius | 指示器的自定义圆角                                                                                                                                     | string  | -      | '4rpx'       |
| boxStyle        | 外层样式，也是 scroll 的样式                                                                                                                           | string  | -      | ''           |
| tabsStyle       | tabs 的内容样式                                                                                                                                        | string  | -      | ''           |
| textStyle       | 文字样式                                                                                                                                               | string  | -      | ''           |
| activeTextStyle | 当前项的文字样式                                                                                                                                       | string  | -      | ''           |
| itemStyle       | tab 项的样式                                                                                                                                           | string  | -      | ''           |
| activeItemStyle | 当前项的 tab 样式                                                                                                                                      | string  | -      | ''           |
| indicatorStyle  | 指示器的样式                                                                                                                                           | string  | -      | ''           |
| updateTime      | 通过改变该值触发位置的重新计算。<br>主要是为了兼容各大平台位置获取的时机问题。<br>在弹层里面，items 能够很快拿到，<br>但是不一定位置信息就可以立马拿到 | number  | -      | 0            |
| delay           | 延迟获取元素内容，<br>只影响 mounted 里面的调用，<br>-1 表示不延迟。<br>其他情况使用 updateTime                                                        | number  | -      | -1           |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| change     | undefined |

## Slots

| Name      | Description | Bindings |
| --------- | ----------- | -------- |
| indicator |             |          |

---
