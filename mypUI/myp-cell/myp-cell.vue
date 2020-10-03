<template>
	<view :class="['myp-cell', 'myp-flex-row', 'myp-align-center', 'myp-wrap-nowrap', 'myp-bg-'+bgType, 'myp-height-'+height, 'myp-radius-'+radius, 'myp-border-'+border]" :style="boxStyle" :hover-class="'myp-hover-'+hover" bubble="true" @tap.stop="toSelect">
		<myp-icon v-if="icon&&icon.length > 0" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="'margin-right:'+space+';'+iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<slot>
			<text v-if="title&&title.length>0" :class="['myp-color-'+titleType, 'myp-size-'+titleSize]" :style="'margin-right:'+space+';'+titleStyle">{{title}}</text>
			<text :class="['myp-cell-value', 'myp-flex-one', 'myp-lines-one', 'myp-color-'+valueType, 'myp-size-'+valueSize]" :style="valueStyle">{{value}}</text>
		</slot>
		<!-- custom right extra view -->
		<slot name="extra"></slot>
		<myp-icon v-if="indicator&&indicator.length>0" :name="indicator" :type="indicatorType" :size="indicatorSize" :iconStyle="indicatorStyle" :boxStyle="'margin-left:'+space+';'+indicatorBoxStyle" @iconClicked="toSelect"></myp-icon>
	</view>
</template>

<script>
	export default {
		props: {
			// 左侧图标
			icon: {
				type: String,
				default: ""
			},
			// 左侧标题
			title: {
				type: String,
				default: ""
			},
			// 具体/描述内容
			value: {
				type: String,
				default: ""
			},
			// 右侧图标
			indicator: {
				type: String,
				default: ""
			},
			// 背景主题
			bgType: {
				type: String,
				default: ''
			},
			// 标题颜色主题
			titleType: {
				type: String,
				default: 'text'
			},
			// 内容颜色主题
			valueType: {
				type: String,
				default: 'second'
			},
			// 左侧图标颜色主题
			iconType: {
				type: String,
				default: 'text'
			},
			// 右侧图标颜色主题
			indicatorType: {
				type: String,
				default: 'second'
			},
			// 标题尺寸主题
			titleSize: {
				type: String,
				default: 'base'
			},
			// 内容尺寸主题
			valueSize: {
				type: String,
				default: 's'
			},
			// 左侧图标尺寸主题
			iconSize: {
				type: String,
				default: "l"
			},
			// 右侧图标尺寸主题
			indicatorSize: {
				type: String,
				default: "l"
			},
			// 高度主题
			height: {
				type: String,
				default: 'l'
			},
			// 圆角主题
			radius: {
				type: String,
				default: 'base'
			},
			// 边框主题
			border: {
				type: String,
				default: ''
			},
			// hover点击效果
			hover: {
				type: String,
				default: 'bg'
			},
			// 文字与图标间距
			space: {
				type: String,
				default: '12rpx'
			},
			// 左侧图标样式
			iconStyle: {
				type: String,
				default: ''
			},
			// 右侧图标样式
			indicatorStyle: {
				type: String,
				default: ''
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			},
			// 标题样式
			titleStyle: {
				type: String,
				default: ''
			},
			// 内容样式
			valueStyle: {
				type: String,
				default: ''
			},
			// 左侧图标外层样式
			iconBoxStyle: {
				type: String,
				default: ''
			},
			// 右侧图标外层样式
			indicatorBoxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toSelect(e) {
				this.$emit("cellClicked")
				e.stopPropagation && e.stopPropagation()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-cell {
		padding-left: 32rpx;
		padding-right: 32rpx;
		
		&-value {
			text-align: right;
		}
	}
</style>
