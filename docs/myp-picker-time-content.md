---
title: 时间内容：myp-picker-time-content
type: guide
order: 163
page: https://mypui.asnowsoft.cn/h5/#/pages/picker/index
---

## Props

| Prop name      | Description                                                                                                                            | Type    | Values | Default                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ----------------------------- |
| mode           | ['date'/年月日, 'dateTime'/年月日时分, 'yearMonth'/年月, <br>'time'/时分, 'dateRange'/年月日, 'yearMonthRange'/年月, 'timeRange'/时分] | string  | -      | "date"                        |
| value          | 值，不是索引                                                                                                                           | array   | -      | [0,0,0,0,0,0,0]               |
| useCurrent     | 是否使用当前时间                                                                                                                       | boolean | -      | false                         |
| start          | 年份 year 的开始                                                                                                                       | string  | -      | "1970"                        |
| end            | 年份 year 的结束                                                                                                                       | string  | -      | new Date().getFullYear() + '' |
| includeBefore  | 是否允许以前的时间，仅仅只是用在带年份选择的 mode 上                                                                                   | boolean | -      | true                          |
| includeAfter   | 是否允许未来的时间                                                                                                                     | boolean | -      | true                          |
| range          | 范围选择分隔符                                                                                                                         | string  | -      | '-'                           |
| bgType         | 背景色主题                                                                                                                             | string  | -      | 'inverse'                     |
| textType       | 选择项的文字颜色主题                                                                                                                   | string  | -      | 'text'                        |
| textSize       | 选择项的文字尺寸主题                                                                                                                   | string  | -      | 'base'                        |
| height         | 自定义高度                                                                                                                             | string  | -      | '500rpx'                      |
| itemHeight     | 选择项的自定义高度                                                                                                                     | string  | -      | '100rpx'                      |
| boxStyle       | 外层样式                                                                                                                               | string  | -      | ''                            |
| itemStyle      | 选择项的外层样式                                                                                                                       | string  | -      | ''                            |
| textStyle      | 选择项的文字样式                                                                                                                       | string  | -      | ''                            |
| indicatorStyle | indicator-style                                                                                                                        | string  | -      | ''                            |
| rangeType      | 范围分隔符的颜色主题                                                                                                                   | string  | -      | 'text'                        |
| rangeSize      | 范围分隔符的尺寸主题                                                                                                                   | string  | -      | 'base'                        |
| rangeBoxStyle  | 范围分隔符的外层样式                                                                                                                   | string  | -      | ''                            |
| rangeStyle     | 范围分隔符的样式                                                                                                                       | string  | -      | ''                            |
| updateTime     | 强制刷新数据                                                                                                                           | number  | -      | 0                             |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| inited     | undefined |
| change     | undefined |

---
