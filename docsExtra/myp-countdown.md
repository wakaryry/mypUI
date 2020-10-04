
**示范**

```html
<myp-countdown bgType="error" itemBgType="none" itemTextType="inverse" indicatorTextType="inverse" radius="base"></myp-countdown>
<myp-countdown :time="(new Date('2021-06-07')).getTime()" tpl="{d}天"></myp-countdown>
<myp-countdown :time="(new Date('2021-06-07')).getTime()" tpl="{d}天{h}时{m}分{s}秒"></myp-countdown>
```

**结果**

![myp-countdown](/images/doc/countdown.jpeg)
