---
title: tabbar：myp-tabbar
type: guide
order: 101
---

## Props

| Prop name      | Description | Type           | Values | Default                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ----------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| includeXBar    |             | boolean        | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| overrideXBar   |             | boolean        | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| xBarBgType     |             | string         | -      | ''                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| xBarStyle      |             | string         | -      | ''                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| tabs           |             | array          | -      | []                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| tabStyle       |             | object         | -      | {<br> iconStyle: 'font-size: 20px;color: #333232;',<br> selectedIconStyle: 'font-size: 20px;color: #01A9F0;',<br> titleStyle: '',<br> selectedTitleStyle: '',<br> boxStyle: '',<br> itemStyle: '',<br> height: 50, // px<br> badgeStyle: '',<br> badgeTextStyle: '',<br> dotStyle: '',<br> // we use it to help to position the badge or dot<br> iconBoxWidth: '46px',<br> image: null,<br> imageStyle: '',<br> imageBoxStyle: '',<br>} |
| includeStatus  |             | boolean        | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| includeNav     |             | boolean        | -      | true                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| duration       |             | number\|string | -      | 300                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| timingFunction |             | string         | -      | 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'                                                                                                                                                                                                                                                                                                                                                                                                  |
| top            |             | number\|string | -      | 0                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| selected   | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| tabs    |             |          |

---
