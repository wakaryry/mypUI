<template>
	<view :class="['myp-border-'+border, 'myp-radius-'+radius, 'myp-bg-'+bgType]" :style="boxStyle" :hover-class="'myp-hover-'+hover" bubble="true" @tap="toSelect">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 唯一值/返回的内容
			value: {
				type: [Number, String],
				default: ''
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			// 边框主题
			border: {
				type: String,
				default: ''
			},
			// 圆角主题
			radius: {
				type: String,
				default: ''
			},
			// 背景主题
			bgType: {
				type: String,
				default: ''
			},
			// hover效果
			hover: {
				type: String,
				default: 'opacity'
			},
			// 外层样式
			boxStyle: {
				type: String,
				default: ''
			}
		},
		inject: ['mypCheck'],
		methods: {
			toSelect() {
				if (this.disabled) {
					return
				}
				this.mypCheck.toSelect(this.value)
			}
		}
	}
</script>

<style>
</style>
