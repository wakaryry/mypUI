---
title: 时间选择：myp-picker-time
type: guide
order: 160
---

## Props

| Prop name      | Description | Type    | Values | Default                       |
| -------------- | ----------- | ------- | ------ | ----------------------------- |
| show           |             | boolean | -      | false                         |
| mode           |             | string  | -      | 'date'                        |
| cancelText     |             | string  | -      | '取消'                        |
| confirmText    |             | string  | -      | '确认'                        |
| title          |             | string  | -      | ''                            |
| cancelType     |             | string  | -      | 'third'                       |
| cancelSize     |             | string  | -      | 'base'                        |
| cancelStyle    |             | string  | -      | ''                            |
| confirmType    |             | string  | -      | 'primary'                     |
| confirmSize    |             | string  | -      | 'base'                        |
| confirmStyle   |             | string  | -      | ''                            |
| titleType      |             | string  | -      | 'text'                        |
| titleSize      |             | string  | -      | 'base'                        |
| titleStyle     |             | string  | -      | ''                            |
| headerBorder   |             | string  | -      | 'bottom'                      |
| headerRadius   |             | string  | -      | 'top-base'                    |
| headerBgType   |             | string  | -      | 'inverse'                     |
| headerStyle    |             | string  | -      | ''                            |
| value          |             | array   | -      | [0,0,0,0,0,0,0]               |
| useCurrent     |             | boolean | -      | false                         |
| start          |             | string  | -      | "1970"                        |
| end            |             | string  | -      | new Date().getFullYear() + '' |
| includeBefore  |             | boolean | -      | true                          |
| includeAfter   |             | boolean | -      | true                          |
| range          |             | string  | -      | '-'                           |
| bgType         |             | string  | -      | 'inverse'                     |
| textType       |             | string  | -      | 'text'                        |
| textSize       |             | string  | -      | 'base'                        |
| height         |             | string  | -      | '500rpx'                      |
| itemHeight     |             | string  | -      | '100rpx'                      |
| boxStyle       |             | string  | -      | ''                            |
| itemStyle      |             | string  | -      | ''                            |
| textStyle      |             | string  | -      | ''                            |
| indicatorStyle |             | string  | -      | ''                            |
| rangeType      |             | string  | -      | 'text'                        |
| rangeSize      |             | string  | -      | 'base'                        |
| rangeStyle     |             | string  | -      | ''                            |
| rangeBoxStyle  |             | string  | -      | ''                            |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| confirm    | undefined |
| cancel     |           |

## Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| header |             |          |

---
