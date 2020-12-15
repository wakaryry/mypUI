# myp-input-one

## Props

| Prop name       | Description                            | Type    | Values | Default                                                                  |
| --------------- | -------------------------------------- | ------- | ------ | ------------------------------------------------------------------------ |
| value           | 值                                     | string  | -      | ''                                                                       |
| maxlength       | 最大长度。4/5/6                        | number  | -      | 4                                                                        |
| password        | 是否密码                               | boolean | -      | false                                                                    |
| cursor          | 是否带有光标                           | boolean | -      | false                                                                    |
| focus           | 是否 focus                             | boolean | -      | false                                                                    |
| mode            | middle-中间线, bottom-下划线, box-方框 | string  | -      | "middle"                                                                 |
| adjust          | adjust-position 控制                   | boolean | -      | true                                                                     |
| width           | 自定义 height/width                    | string  | -      | '100rpx'                                                                 |
| space           | 间隙                                   | string  | -      | '12rpx'                                                                  |
| dotStyle        | password 时圆点的样式                  | string  | -      | 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;' |
| lineStyle       | middle 或 bottom 时线条的样式          | string  | -      | 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'  |
| activeLineStyle | 当前输入框线条的样式                   | string  | -      | ''                                                                       |
| cursorStyle     | 光标的样式                             | string  | -      | 'width:1px;height:42rpx;background-color:#8F9CFF;'                       |
| valueStyle      | 值的样式                               | string  | -      | 'font-size:70rpx;font-weight:700;color:#000000;'                         |
| boxStyle        | 外层样式                               | string  | -      | ''                                                                       |
| itemStyle       | 输入框样式                             | string  | -      | ''                                                                       |
| activeItemStyle | 当前输入框的样式                       | string  | -      | ''                                                                       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| input      | undefined |
| finish     | undefined |

---
