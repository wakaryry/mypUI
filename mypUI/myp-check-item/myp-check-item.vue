<template>
	<view bubble="true" @tap="toSelect">
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
			}
		},
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
