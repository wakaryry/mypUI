---
title: 按钮：myp-button
type: guide
order: 150
---

## Props

| Prop name     | Description | Type    | Values | Default                  |
| ------------- | ----------- | ------- | ------ | ------------------------ |
| bgType        |             | string  | -      | ''                       |
| text          |             | string  | -      | ''                       |
| icon          |             | string  | -      | ''                       |
| icon2         |             | string  | -      | ''                       |
| loading       |             | boolean | -      | false                    |
| loadingSrc    |             | string  | -      | '/static/ui/loading.gif' |
| height        |             | string  | -      | 'l'                      |
| hover         |             | string  | -      | 'opacity'                |
| radius        |             | string  | -      | 'base'                   |
| border        |             | string  | -      | 'all'                    |
| disabled      |             | boolean | -      | false                    |
| highlight     |             | boolean | -      | false                    |
| space         |             | string  | -      | '12rpx'                  |
| textType      |             | string  | -      | ''                       |
| textSize      |             | string  | -      | ''                       |
| iconMode      |             | string  | -      | 'aspectFill'             |
| iconType      |             | string  | -      | ''                       |
| iconSize      |             | string  | -      | 'l'                      |
| icon2Mode     |             | string  | -      | 'aspectFill'             |
| icon2Type     |             | string  | -      | ''                       |
| icon2Size     |             | string  | -      | 'l'                      |
| boxStyle      |             | string  | -      | ''                       |
| textStyle     |             | string  | -      | ''                       |
| iconBoxStyle  |             | string  | -      | ''                       |
| iconStyle     |             | string  | -      | ''                       |
| icon2BoxStyle |             | string  | -      | ''                       |
| icon2Style    |             | string  | -      | ''                       |
| loadingWidth  |             | string  | -      | '36rpx'                  |
| loadingHeight |             | string  | -      | '36rpx'                  |

## Events

| Event name    | Type | Description |
| ------------- | ---- | ----------- |
| buttonClicked |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| extra   |             |          |

---

myp-button 非常可爱有趣，提供了 文字/按钮/图标 等样式的交互hover能力，还有 disabled/highlight/loading 等状态。

主要特色如下：

- 支持快捷配置与细节配置（正如其它组件一样，mypUI在高效与细节之间做得非常优秀）；
- 支持loading效果；
- 支持disabled/highlight状态；
- 支持 图标-文字-图标 三段式组合设置；
- 支持 border/radius，等；

## 使用

```html
<myp-button text="手机号登陆" bgType="primary" border="none" radius="ll" @buttonClicked="toPhoneLogin"></myp-button>
```

<p class="tip">我们建议您优先使用主题配置，不要老想着个性化style设置。只有在主题设置不能满足要求的时，才使用style的配置。</p>

myp-button 的配置属性比较多，其实也很简单。毕竟命名规则都是一致的。我们只需要知道 myp-button 是 `icon-text-icon2` 形式的设计即可。

myp-button 是 `flex-direction:row` 的形式。其props如下：

- 盒子类：`bgType` `height(s/l之类)` `radius` `border` `disabled` `highlight` `hover` `space` `boxStyle`

- text：`text` `textType` `textSize` `textStyle`

- icon：`icon` `iconMode` `iconType` `iconSize` `iconStyle` `iconBoxStyle`

- icon2：`icon2` `icon2Mode` `icon2Type` `icon2Size` `icon2Style` `icon2BoxStyle`

- loading：`loading` `loadingSrc` `loadingWidth` `loadingHeight`

- 事件：`@buttonClicked`

- 默认插槽
