---
title: 倒计时：myp-countdown
type: guide
order: 209
page: http://mypui.asnowsoft.cn/h5/#/pages/base/countdown
---

## Props

| Prop name          | Description                                  | Type   | Values | Default       |
| ------------------ | -------------------------------------------- | ------ | ------ | ------------- |
| time               | 目标时间戳                                   | number | -      | 1600000000000 |
| interval           | 计时周期                                     | number | -      | 1000          |
| tpl                | 内容显示格式                                 | string | -      | '{h}:{m}:{s}' |
| bgType             | 背景主题                                     | string | -      | 'none'        |
| border             | 边框主题                                     | string | -      | ''            |
| radius             | 圆角主题                                     | string | -      | ''            |
| itemBgType         | item 的背景主题                              | string | -      | ''            |
| itemBorder         | item 的边框主题                              | string | -      | ''            |
| itemRadius         | item 的圆角主题                              | string | -      | 's'           |
| itemTextType       | item 的文字颜色主题                          | string | -      | 'text'        |
| itemTextSize       | item 的文字尺寸主题                          | string | -      | 'l'           |
| itemHeight         | item 的高度主题                              | string | -      | 'base'        |
| itemWidth          | item 的宽度。0 时会有左右各 24rpx 的 padding | string | -      | '0'           |
| indicatorTextType  | 分隔符的颜色主题                             | string | -      | 'text'        |
| indicatorTextSize  | 分隔符的尺寸主题                             | string | -      | 'l'           |
| indicatorWidth     | 分隔符的宽度                                 | string | -      | '60rpx'       |
| boxStyle           | 外层样式                                     | string | -      | ''            |
| itemBoxStyle       | item 外层样式                                | string | -      | ''            |
| indicatorBoxStyle  | 分隔符的外层样式                             | string | -      | ''            |
| itemTextStyle      | item 的文字样式                              | string | -      | ''            |
| indicatorTextStyle | 分隔符的文字样式                             | string | -      | ''            |

## Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| completed  |      |

---

**示范**

```html
<myp-countdown bgType="error" itemBgType="none" itemTextType="inverse" indicatorTextType="inverse" radius="base"></myp-countdown>
<myp-countdown :time="(new Date('2021-06-07')).getTime()" tpl="{d}天"></myp-countdown>
<myp-countdown :time="(new Date('2021-06-07')).getTime()" tpl="{d}天{h}时{m}分{s}秒"></myp-countdown>
```

**结果**

![myp-countdown](/images/doc/countdown.jpeg)
