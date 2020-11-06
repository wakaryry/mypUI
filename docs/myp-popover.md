---
title: 气泡：myp-popover
type: guide
order: 105
page: http://mypui.asnowsoft.cn/h5/#/pages/nav/popover
---

## Props

| Prop name     | Description | Type    | Values | Default                                                                                                                                                                                                                                  |
| ------------- | ----------- | ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttons       |             | array   | -      | () => {<br> []<br>}                                                                                                                                                                                                                      |
| position      |             | object  | -      | {<br> x: 0, // x>0 是从左开始，x<0 是从右开始<br> y: 0 // y>0 是距离顶部，y<0 是距离底部<br>}                                                                                                                                            |
| arrowPosition |             | object  | -      | {<br> pos: 'top', // arrow in which side<br> x: 0, // when pos is top/bottom, distance to left/right. x>=0 is to left; x<0 is to right<br> y: 0 // when pos is left/right, distance to top/bottom. y>=0 is to top; y<0 is to bottom<br>} |
| coverBg       |             | string  | -      | ''                                                                                                                                                                                                                                       |
| hasAnimation  |             | boolean | -      | true                                                                                                                                                                                                                                     |
| textStyle     |             | string  | -      | ''                                                                                                                                                                                                                                       |

## Events

| Event name  | Type      | Description |
| ----------- | --------- | ----------- |
| itemClicked | undefined |

---

