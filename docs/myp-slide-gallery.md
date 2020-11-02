---
title: 画廊/slide：myp-slide-gallery
type: guide
order: 68
---

## Props

| Prop name   | Description | Type           | Values | Default                                                                 |
| ----------- | ----------- | -------------- | ------ | ----------------------------------------------------------------------- |
| sliderId    |             | string\|number | -      | 1                                                                       |
| panOffset   |             | number         | -      | 80                                                                      |
| cardLength  |             | number         | -      | 1                                                                       |
| selectIndex |             | number         | -      | 0                                                                       |
| enableSwipe |             | boolean        | -      | true                                                                    |
| containerS  |             | object         | -      | {<br> position: 'relative',<br> width: 750,<br> height: 352<br>}        |
| cardS       |             | object         | -      | {<br> width: 360,<br> height: 300,<br> spacing: 0,<br> scale: 0.75<br>} |
| autoPlay    |             | boolean        | -      | false                                                                   |
| interval    |             | number\|string | -      | 1200                                                                    |

## Events

| Event name                      | Type      | Description |
| ------------------------------- | --------- | ----------- |
| wxcEpSliderPullMore             | undefined |
| wxcEpSliderCurrentIndexSelected | undefined |

## Slots

| Name      | Description | Bindings                                                      |
| --------- | ----------- | ------------------------------------------------------------- |
| default   |             | [<br> {<br> "name": "name",<br> "title": "binding"<br> }<br>] |
| pull-more |             |                                                               |

---
