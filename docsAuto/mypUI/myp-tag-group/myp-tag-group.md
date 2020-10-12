# myp-tag-group

## Props

| Prop name           | Description                                                  | Type    | Values | Default |
| ------------------- | ------------------------------------------------------------ | ------- | ------ | ------- |
| items               | 标签群内容                                                   | array   | -      | []      |
| value               | 当前选中值                                                   | array   | -      | []      |
| limits              | 限制最大选择数。0 表示不限制                                 | number  | -      | 0       |
| leastOne            | limits 为 1 时是否允许取消当前选择，也就是是否允许一个也不选 | boolean | -      | false   |
| column              | 每一行多少个 tag。0 表示动态宽度，其余就是等宽               | number  | -      | 0       |
| rowSpace            | 标签之间的竖向距离                                           | string  | -      | '16rpx' |
| columnSpace         | 标签之间的横向距离                                           | string  | -      | '16rpx' |
| updatedTime         | 强制刷新，重新生成数据                                       | number  | -      | 0       |
| disabled            | 是否全部禁用                                                 | boolean | -      | false   |
| textLabel           | 文字内容的字段                                               | string  | -      | null    |
| valueLabel          | 唯一值的字段                                                 | string  | -      | null    |
| disabledLabel       | 禁用的字段                                                   | string  | -      | null    |
| bgType              | 背景主题                                                     | string  | -      | ''      |
| border              | 边框主题                                                     | string  | -      | 'none'  |
| radius              | 圆角主题                                                     | string  | -      | 'none'  |
| boxStyle            | 外层样式                                                     | string  | -      | ''      |
| dyBoxStyle          | column 为 0 时，标签群的样式                                 | string  | -      | ''      |
| tagBgType           | tag 的背景主题                                               | string  | -      | ''      |
| tagSelectedBgType   | 选中时 tag 的背景主题                                        | string  | -      | ''      |
| tagTextType         | tag 的文字颜色主题                                           | string  | -      | ''      |
| tagSelectedTextType | 选中时 tag 的文字颜色主题                                    | string  | -      | ''      |
| tagTextSize         | tag 的文字尺寸主题                                           | string  | -      | ''      |
| tagHeight           | tag 的高度主题                                               | string  | -      | ''      |
| tagBorder           | tag 的边框主题                                               | string  | -      | 'all'   |
| tagSelectedBorder   | 选中时 tag 的边框主题                                        | string  | -      | 'all'   |
| tagRadius           | tag 的圆角主题                                               | string  | -      | 'base'  |
| tagSpace            | tag 的左右 padding                                           | string  | -      | '16rpx' |
| textStyle           | tag 的文字样式                                               | string  | -      | ''      |
| selectedTextStyle   | 选中时 tag 的文字样式                                        | string  | -      | ''      |
| disabledTextStyle   | 禁用时 tag 的文字样式                                        | string  | -      | ''      |
| tagStyle            | tag 的外层样式                                               | string  | -      | ''      |
| selectedTagStyle    | 选中时 tag 的外层样式                                        | string  | -      | ''      |
| disabledTagStyle    | 禁用时 tag 的外层样式                                        | string  | -      | ''      |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| overed     |           |
| input      | undefined |
| change     | undefined |

---
