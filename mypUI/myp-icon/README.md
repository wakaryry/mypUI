# myp-icon

> icon组件。CSS字体图标组件。同时支持本地和网络图片

### 规则

- 一般搭配其它组件使用，常用于其它组件内的`icon`图标或者图片；
- 也可以直接用作于图片展示；

### 定制

- `icon`的`name`定义在`type.js`里面；
- 更换`icon`需要更新组件下引入的`字体文件`；
- 然后替换掉`type.js`里面的`icon`对图标进行更换或者定制；

> 考虑到替换图标的麻烦，我们提供了一个自动从`css`中生成`type.js`中`icon`名称与`unicode值`的`Python脚本`。

## 使用

### 可配置参数

| Prop      | Type   | Required  | Default   | Description  |
|-------------|------------|--------|--------|-----|
| name | String |  | right | icon的名字，或者图片地址。图片会自动识别 |
| type | String | 否 | | 主题配置，设置icon的颜色。可以取`inverse`/`text`/`primary`/`success`/`warning`/`error`。默认对应颜色`class`为`myp-color-`，也是`myp-color-text` |
| size | String | 否 | l | 字体icon大小设置。可以取`ss`/`s`/`base`/`l`/`ll`。默认对应的`class`为`myp-size-l` |
| mode | String | 否 | aspectFit | 当`name`为图片路径时，可以为图片设置显示的`mode`，具体值对应`uni`中`image`组件的`mode` |
| iconStyle | String | 否 | | 为字体和图片提供额外的样式，更加灵活的定制，比如限制图片的大小，或者更改icon的大小、颜色等 |
| boxStyle | String | 否 | | 对组件最外层进行样式定制 |

- `iconStyle`可以覆盖所有的`icon`或者图片样式；
- `boxStyle`可以对组件最外层的包裹层设置样式；

### slot
> 无

### 事件回掉
| Event     | Params   | Description  |
|--------|--------|-----|
| iconClicked | name | 点击触发，返回参数是 组件中的 `name` |

### 示例与结果

```
<myp-icon name="phone"></myp-icon>
```

## 其它
组件内`utils`文件夹提供了一个自动处理`CSS`为`JS`变量的脚本，需要在`Python`环境下运行。

使用该脚本可以快速替换原有`icon`数据。

> 注意：

替换原`icon`时不仅要记得修改`type.js`，也要修改`index.vue`中的字体文件的路径。
