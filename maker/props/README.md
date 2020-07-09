# 用途

根据规则自动生成与管理`props`。

# 原因

在开发组件库的时候，需要开放大量的属性，甚至添加一个字段，就要为这个字段再次添加大量的属性。

# 规则

## 字段
提供字段的方式有几种：

- `raw`中的字段会直接成为`props`属性，不会进行任何的拼接；
- `common`中的字段，其实就是`rules`包含`type` `size` `style`，不考虑状态；
- `state_common`中的字段，其实就是`rules`包含`type` `size` `style`，而且也会考虑状态；
- `state`为字段的状态，可以有全局状态，可以有局部状态，局部覆盖全局。状态会拼接字段形成属性；
- 字段中可以包含`state`、`pre`、`rules`字段，分别表示状态，前置拼接字段，以及最终应用到的类别；
- 字段的拼接规则是`preLabelStateRule`，也就是会对`pre-label-state-rule`按照驼峰式拼接；

> `rules`其实就是标志，方便知道应用于什么方面，比如`type`就是背景色或者颜色，都是主题控制的，`size`就是尺寸大小，`style`就是`css style`。

## 类型与默认值

- `title-String-xyz`就是`title: {type: String, default: 'xyz'}`;
- `title`表示`title-String-`，也就是`title: {type: String, default: ''}`;
- `title-`或者`title-xxx`，也就是`title-String-`或者`title-String-xxx`;

类型与默认值可以放在哪里？

- 字段下的`type`字段；
- 字段下的`default`字段；
- 字段下的`rules`字段；
- 不提供复杂的类型与默认值的规则，因为写法复杂之后，反而花费的时间会更长；

# 添加特殊默认值

因为拼接的字段，默认值基本上是不一样的，这个时候我们在字段中直接配置默认值很麻烦，而且很复杂，因为拼接的字段可能是由`state/pre/rules`共同决定，而默认值的话就不可能只有一个。

这种情况怎么办？

我们提供一个`special`字段，该字段的作用就是给特定的`prop`提供特定的默认值。

比如：

```json
"special": {
    "titleDisabledType": "place"
}
```

通过`special`字段，我们的适配性大大提供，并且方便了修改以及添加字段等，不会因为我们直接修改了原Vue文件，而无法保证添加或者修改时还能保持以前的默认值。
