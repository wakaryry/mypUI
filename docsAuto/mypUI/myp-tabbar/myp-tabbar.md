# myp-tabbar

## Props

| Prop name      | Description | Type    | Values | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------- | ----------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tabs           |             | array   | -      | []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| tabStyle       |             | object  | -      | {<br> iconStyle: 'font-size: 20px;color: #333232;',<br> selectedIconStyle: 'font-size: 20px;color: #01A9F0;',<br> titleStyle: '',<br> selectedTitleStyle: '',<br> boxStyle: '',<br> tabsStyle: '',<br> itemStyle: '',<br> height: 50, // px<br> badgeStyle: '',<br> badgeTextStyle: '',<br> dotStyle: '',<br> // we use it to help to position the badge or dot<br> iconBoxWidth: '46px',<br> image: null,<br> imageStyle: '',<br> imageBoxStyle: '',<br> imageWidthXBar: false<br>} |
| duration       |             | number  | -      | 300                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| timingFunction |             | string  | -      | 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| top            |             | string  | -      | '0'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| isSeize        |             | boolean | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| considerXBar   |             | boolean | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| xBarBgType     |             | string  | -      | 'inverse'                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| xBarStyle      |             | string  | -      | ''                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| tabClicked | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| bg      |             |          |
| tabs    |             |          |

---
