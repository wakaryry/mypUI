# myp-picker-content

## Props

| Prop name      | Description | Type   | Values | Default                                                                                                                                                                                                                                                                                                |
| -------------- | ----------- | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selections     |             | array  | -      | []                                                                                                                                                                                                                                                                                                     |
| labelProps     |             | object | -      | {<br> s1: {<br> label: 'name',<br> value: 'id'<br> },<br> s2: {<br> label: 'name',<br> value: 'id',<br> // the tag is for to get s2 selections in s1<br> tag: "c"<br> },<br> s3: {<br> label: 'name',<br> value: 'id',<br> // the tag is for to get get s3 in selections in s2<br> tag: "a"<br> }<br>} |
| mode           |             | string | -      | "s1"                                                                                                                                                                                                                                                                                                   |
| value          |             | array  | -      | [0,0,0,0,0,0,0]                                                                                                                                                                                                                                                                                        |
| bgType         |             | string | -      | 'inverse'                                                                                                                                                                                                                                                                                              |
| textType       |             | string | -      | 'text'                                                                                                                                                                                                                                                                                                 |
| textSize       |             | string | -      | 'base'                                                                                                                                                                                                                                                                                                 |
| height         |             | string | -      | '500rpx'                                                                                                                                                                                                                                                                                               |
| itemHeight     |             | string | -      | '100rpx'                                                                                                                                                                                                                                                                                               |
| boxStyle       |             | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| itemStyle      |             | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| textStyle      |             | string | -      | ''                                                                                                                                                                                                                                                                                                     |
| indicatorStyle |             | string | -      | ''                                                                                                                                                                                                                                                                                                     |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| inited     | undefined |
| change     | undefined |

---
