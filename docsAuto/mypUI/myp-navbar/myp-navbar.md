# myp-navbar

## Props

| Prop name      | Description              | Type    | Values | Default     |
| -------------- | ------------------------ | ------- | ------ | ----------- |
| lefts          | 左侧 item 集             | array   | -      | []          |
| title          | 标题                     | string  | -      | null        |
| icon           | 标题右侧图标             | string  | -      | null        |
| rights         | 右侧 item 集             | array   | -      | []          |
| bgType         | 背景主题                 | string  | -      | 'nav'       |
| border         | 边框主题                 | string  | -      | 'none'      |
| titleType      | 标题颜色主题             | string  | -      | 'nav-title' |
| titleSize      | 标题尺寸主题             | string  | -      | 'nav-title' |
| titleStyle     | 标题样式                 | string  | -      | ''          |
| iconType       | 标题图标颜色主题         | string  | -      | 'nav-title' |
| iconSize       | 标题图标尺寸主题         | string  | -      | 'nav-title' |
| iconStyle      | 标题图标样式             | string  | -      | ""          |
| itemIconType   | item 图标颜色主题        | string  | -      | 'nav-icon'  |
| itemIconSize   | item 图标尺寸主题        | string  | -      | 'nav-icon'  |
| itemIconStyle  | item 图标样式            | string  | -      | ""          |
| itemTextType   | item 文字颜色主题        | string  | -      | 'nav-item'  |
| itemTextSize   | item 文字尺寸主题        | string  | -      | 'nav-item'  |
| itemTextStyle  | item 文字样式            | string  | -      | ''          |
| height         | 自定义 px 高度           | number  | -      | 44          |
| includeStatus  | 是否包含状态栏           | boolean | -      | true        |
| isSeize        | 是否占位                 | boolean | -      | true        |
| fixed          | 是否 fixed 定位          | boolean | -      | true        |
| leftStyle      | lefts 整体样式           | string  | -      | ''          |
| leftBgType     | lefts 整体的背景主题     | string  | -      | ''          |
| leftItemStyle  | lefts 中 item 的样式     | string  | -      | ''          |
| rightStyle     | rights 整体样式          | string  | -      | ''          |
| rightBgType    | rights 整体背景主题      | string  | -      | ''          |
| rightItemStyle | rights 中 item 的样式    | string  | -      | ''          |
| centerStyle    | 中间 title 外层的样式    | string  | -      | ''          |
| boxStyle       | 外层样式                 | string  | -      | ''          |
| statusNavStyle | status 与 nav 的外层样式 | string  | -      | ''          |
| navStyle       | nav 的外层样式           | string  | -      | ''          |

## Events

| Event name   | Type      | Description |
| ------------ | --------- | ----------- |
| leftAction   | undefined |
| centerAction |           |
| rightAction  | undefined |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| title |             |          |
| right |             |          |
| extra |             |          |

---
