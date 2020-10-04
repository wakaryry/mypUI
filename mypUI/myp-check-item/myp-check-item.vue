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
			disabled: {
				type: Boolean,
				default: false
			},
			border: {
				type: String,
				default: ''
			},
			radius: {
				type: String,
				default: ''
			},
			bgType: {
				type: String,
				default: ''
			},
			hover: {
				type: String,
				default: 'opacity'
			},
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
