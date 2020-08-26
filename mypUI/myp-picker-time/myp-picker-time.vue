<template>
	<myp-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
		<slot name="header">
			<view :class="['myp-picker-header', 'myp-bg-'+headerBgType, 'myp-border-'+headerBorder, 'myp-radius-'+headerRadius]" :style="headerStyle">
				<text :class="['myp-color-'+cancelType, 'myp-size-'+cancelSize]" :style="cancelStyle" @tap="toCancel">{{cancelText}}</text>
				<text :class="['myp-picker-header-title', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
				<text :class="['myp-color-'+confirmType, 'myp-size-'+confirmSize]" :style="confirmStyle" @tap="toConfirm">{{confirmText}}</text>
			</view>
		</slot>
		<myp-picker-time-content :mode="mode" :value="value" :useCurrent="useCurrent" :start="start" :end="end" :includeBefore="includeBefore" :includeAfter="includeAfter" :range="range" :bgType="bgType" :textType="textType" :textSize="textSize" :height="height" :itemHeight="itemHeight" :boxStyle="boxStyle" :itemStyle="itemStyle" :textStyle="textStyle" :indicatorStyle="indicatorStyle" :rangeType="rangeType" :rangeSize="rangeSize" :rangeStyle="rangeStyle" :rangeBoxStyle="rangeBoxStyle" @inited="pickerInited" @change="pickerChanged"></myp-picker-time-content>
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
			},
			// content about
			// value, not index of column
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			useCurrent: {
				type: Boolean,
				default: false
			},
			// 表示年份year的开始或者小时hour的开始
			start: {
				type: String,
				default: "1970"
			},
			end: {
				type: String,
				default: new Date().getFullYear() + ''
			},
			// 仅仅只是用在带年份选择的mode上
			includeBefore: {
				type: Boolean,
				default: true
			},
			includeAfter: {
				type: Boolean,
				default: true
			},
			range: {
				type: String,
				default: '-'
			},
			// styles
			bgType: {
				type: String,
				default: 'inverse'
			},
			textType: {
				type: String,
				default: 'text'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			height: {
				type: String,
				default: '500rpx'
			},
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			itemStyle: {
				type: String,
				default: ''
			},
			textStyle: {
				type: String,
				default: ''
			},
			indicatorStyle: {
				type: String,
				default: ''
			},
			rangeType: {
				type: String,
				default: 'text'
			},
			rangeSize: {
				type: String,
				default: 'base'
			},
			rangeStyle: {
				type: String,
				default: ''
			},
			rangeBoxStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				result: null
			}
		},
		methods: {
			toConfirm() {
				this.$emit("confirm", this.result)
			},
			toCancel() {
				this.$emit("cancel")
			},
			pickerInited(val) {
				// console.log(val)
				this.result = JSON.parse(JSON.stringify(val))
			},
			pickerChanged(val) {
				// console.log(val)
				this.result = JSON.parse(JSON.stringify(val))
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
