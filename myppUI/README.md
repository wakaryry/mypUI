# myppUI是什么

`myppUI`是`mypUI`的衍生UI，主要是为了：

- 基于或者有别于`mypUI`的一些细化UI；
- 定制化的一些落地组件，开箱即用的组件，方便拿来就用；
- 大量的细化组件，为设计软件提供基础；
- 大部分UI不适合放入一个通用的组件库里面，单独存放比较合适，不过为了配合`easycom`，以及区别开来，以`mypp-`开头；

# easycom配置

## myppUI

```json
"easycom": {
	"autoscan": true,
	"custom": {
		"mypp-(.*)": "@/myppUI/$1/$1.vue" // 匹配myppUI内的vue文件
	}
}
```

## mypUI

```json
"easycom": {
	"autoscan": true,
	"custom": {
		"myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue" // 匹配mypUI内的vue文件
	}
}
```

## mypUI with myppUI
```json
"easycom": {
	"autoscan": true,
	"custom": {
		"myp-(.*)": "@/mypUI/myp-$1/myp-$1.vue", // 匹配mypUI内的vue文件
		"mypp-(.*)": "@/myppUI/$1/$1.vue" // 匹配myppUI内的vue文件
	}
}
```
