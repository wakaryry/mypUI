# myp-list-chat

## Props

| Prop name      | Description | Type    | Values | Default                                                                              |
| -------------- | ----------- | ------- | ------ | ------------------------------------------------------------------------------------ |
| showScrollbar  |             | boolean | -      | true                                                                                 |
| bgType         |             | string  | -      | 'page'                                                                               |
| position       |             | string  | -      | 'static'                                                                             |
| top            |             | string  | -      | '0'                                                                                  |
| bottom         |             | string  | -      | '0'                                                                                  |
| boxStyle       |             | string  | -      | ''                                                                                   |
| useLoading     |             | boolean | -      | false                                                                                |
| loadMoreOffset |             | number  | -      | 60                                                                                   |
| autoUpdate     |             | boolean | -      | false                                                                                |
| down           |             | object  | -      | {<br> use: true,<br> offset: uni.upx2px(140),<br> inRate: 0.8,<br> outRate: 0.2<br>} |
| up             |             | object  | -      | {<br> use: true,<br> offset: 80<br>}                                                 |

## Events

| Event name | Type      | Description |
| ---------- | --------- | ----------- |
| scroll     | undefined |
| down       |           |
| up         |           |
| inited     |           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
