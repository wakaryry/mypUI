<template>
	<view :class="['myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius, 'myp-flex-'+direction, 'myp-justify-'+justify, 'myp-align-'+align, 'myp-wrap-'+wrap]" :style="boxStyle">
		<slot></slot>
	</view>
</template>

<script>
	// 我们不提供 myp-flex-item，因为 MP端自定义组件模式中flex:1是不起作用的
	export default {
		props: {
			direction: {
				type: String,
				default: 'row'
			},
			wrap: {
				type: String,
				default: 'nowrap'
			},
			justify: {
				type: String,
				default: 'start'
			},
			align: {
				type: String,
				default: 'center'
			},
			bgType: {
				type: String,
				default: ''
			},
			border: {
				type: String,
				default: 'none'
			},
			radius: {
				type: String,
				default: 'none'
			},
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>
