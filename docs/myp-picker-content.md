---
title: 选择内容：myp-picker-content
type: guide
order: 165
page: https://mypui.asnowsoft.cn/h5/#/pages/picker/index
---

## Props

| Prop name      | Description        | Type   | Values | Default                                                                                                                                                                                                                                                                                                |
| -------------- | ------------------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mode           | ['s3', 's2', 's1'] | string | -      | "s1"                                                                                                                                                                                                                                                                                                   |
| value          | 值，不是索引       | array  | -      | [0,0,0,0,0,0,0]                                                                                                                                                                                                                                                                                        |
| updateTime     | 用户手动初始化数据 | number | -      | 0                                                                                                                                                                                                                                                                                                      |
| bgType         | 背景主题           | string | -      | 'inverse'                                                                                                                                                                                                                                                                                              |
| textType       | 选择项文字颜色主题 | string | -      | 'text'                                                                                                                                                                                                                                                                                                 |
| textSize       | 选择项文字尺寸主题 | string | -      | 'base'                                                                                                                                                                                                                                                                                                 |
| height         | 自定义的高度       | string | -      | '500rpx'                                                                                                                                                                                                                                                                                               |
| itemHeight     | 选择项自定义的高度 | string | -      | '100rpx'                                                                                                                                                                                                                                                                                               |
| boxStyle       | 外层样式           | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| itemStyle      | 选择项的外层样式   | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| textStyle      | 选择项的文字样式   | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| indicatorStyle | indicator-style    | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| selections     | 选择的内容         | array  | -      | []                                                                                                                                                                                                                                                                                                     |
| labelProps     | 对应选择内容的字段 | object | -      | {<br> s1: {<br> label: 'name',<br> value: 'id'<br> },<br> s2: {<br> label: 'name',<br> value: 'id',<br> // the tag is for to get s2 selections in s1<br> tag: "c"<br> },<br> s3: {<br> label: 'name',<br> value: 'id',<br> // the tag is for to get get s3 in selections in s2<br> tag: "a"<br> }<br>} |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| inited     | undefined |
| change     | undefined |

---
