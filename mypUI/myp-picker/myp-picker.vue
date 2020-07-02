<template>
	<myp-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
		<slot name="header">
			<view :class="['myp-picker-header', 'myp-bg-'+headerBgType, 'myp-border-'+headerBorder, 'myp-radius-'+headerRadius]" :style="headerStyle">
				<text :class="['myp-color-'+cancelType, 'myp-size-'+cancelSize]" :style="cancelStyle" @tap="toCancel">{{cancelText}}</text>
				<text :class="['myp-picker-header-title', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
				<text :class="['myp-color-'+confirmType, 'myp-size-'+confirmSize]" :style="confirmStyle" @tap="toConfirm">{{confirmText}}</text>
			</view>
		</slot>
		<myp-picker-content :mode="mode" @inited="pickerInited" @change="selectChanged"></myp-picker-content>
	</myp-popup-always>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			mode: {
				type: String,
				default: 'date'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确认'
			},
			title: {
				type: String,
				default: ''
			},
			cancelType: {
				type: String,
				default: 'third'
			},
			cancelSize: {
				type: String,
				default: 'base'
			},
			cancelStyle: {
				type: String,
				default: ''
			},
			confirmType: {
				type: String,
				default: 'primary'
			},
			confirmSize: {
				type: String,
				default: 'base'
			},
			confirmStyle: {
				type: String,
				default: ''
			},
			titleType: {
				type: String,
				default: 'text'
			},
			titleSize: {
				type: String,
				default: 'base'
			},
			titleStyle: {
				type: String,
				default: ''
			},
			headerBorder: {
				type: String,
				default: 'bottom'
			},
			headerRadius: {
				type: String,
				default: 'top-base'
			},
			headerBgType: {
				type: String,
				default: 'inverse'
			},
			headerStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toConfirm() {
				this.$emit("confirm")
			},
			toCancel() {
				this.$emit("cancel")
			},
			pickerInited(val) {
				console.log(val)
			},
			selectChanged(val) {
				console.log(val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-picker {
		&-header {
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 100rpx;
			width: 750rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			
			&-title {
				flex: 1;
			}
		}
	}
</style>
