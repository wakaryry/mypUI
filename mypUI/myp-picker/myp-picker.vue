<template>
	<myp-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
		<slot name="header">
			<view :class="['myp-picker-header', 'myp-bg-'+headerBgType, 'myp-border-'+headerBorder, 'myp-radius-'+headerRadius]" :style="headerStyle">
				<text :class="['myp-color-'+cancelType, 'myp-size-'+cancelSize]" :style="cancelStyle" @tap="toCancel">{{cancelText}}</text>
				<text :class="['myp-picker-header-title', 'myp-color-'+titleType, 'myp-size-'+titleSize]" :style="titleStyle">{{title}}</text>
				<text :class="['myp-color-'+confirmType, 'myp-size-'+confirmSize]" :style="confirmStyle" @tap="toConfirm">{{confirmText}}</text>
			</view>
		</slot>
		<myp-picker-content :mode="mode" :selections="selections" :labelProps="labelProps" :value="value" :bgType="bgType" :textType="type" :textSize="size" :height="height" :itemHeight="itemHeight" :boxStyle="boxStyle" :itemStyle="itemStyle" :textStyle="textStyle" :indicatorStyle="indicatorStyle" @inited="pickerInited" @change="pickerChanged"></myp-picker-content>
	</myp-popup-always>
</template>

<script>
	export default {
		props: {
			// 是否打开/显示
			show: {
				type: Boolean,
				default: false
			},
			// s1/s2/s3
			mode: {
				type: String,
				default: 'date'
			},
			// 左侧取消文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 右侧确认文字
			confirmText: {
				type: String,
				default: '确认'
			},
			// 中间标题
			title: {
				type: String,
				default: ''
			},
			// 取消文字颜色主题
			cancelType: {
				type: String,
				default: 'third'
			},
			// 取消文字尺寸主题
			cancelSize: {
				type: String,
				default: 'base'
			},
			// 取消文字样式
			cancelStyle: {
				type: String,
				default: ''
			},
			// 确认文字颜色主题
			confirmType: {
				type: String,
				default: 'primary'
			},
			// 确认文字尺寸主题
			confirmSize: {
				type: String,
				default: 'base'
			},
			// 确认文字样式
			confirmStyle: {
				type: String,
				default: ''
			},
			// 标题颜色主题
			titleType: {
				type: String,
				default: 'text'
			},
			// 标题尺寸主题
			titleSize: {
				type: String,
				default: 'base'
			},
			// 标题样式
			titleStyle: {
				type: String,
				default: ''
			},
			// 头部的边框主题
			headerBorder: {
				type: String,
				default: 'bottom'
			},
			// 头部的圆角主题
			headerRadius: {
				type: String,
				default: 'top-base'
			},
			// 头部的背景主题
			headerBgType: {
				type: String,
				default: 'inverse'
			},
			// 头部样式
			headerStyle: {
				type: String,
				default: ''
			},
			// 值，不是索引
			value: {
				type: Array,
				default: ()=>{
					return [0,0,0,0,0,0,0]
				}
			},
			// content的背景色主题
			bgType: {
				type: String,
				default: 'inverse'
			},
			// content的文字颜色主题
			textType: {
				type: String,
				default: 'text'
			},
			// content的文字尺寸主题
			textSize: {
				type: String,
				default: 'base'
			},
			// content的自定义高度
			height: {
				type: String,
				default: '500rpx'
			},
			// 选择item的自定义高度
			itemHeight: {
				type: String,
				default: '100rpx'
			},
			// content的外层样式
			boxStyle: {
				type: String,
				default: ''
			},
			// 选择item的外层样式
			itemStyle: {
				type: String,
				default: ''
			},
			// 选择item的文字样式
			textStyle: {
				type: String,
				default: ''
			},
			// content的indicator-style
			indicatorStyle: {
				type: String,
				default: ''
			},
			// 可选择内容
			selections: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 自定义的相应内容对应字段
			labelProps: {
				type: Object,
				default: () => {
					return {
						s1: {
							label: 'name',
							value: 'id'
						},
						s2: {
							label: 'name',
							value: 'id',
							// the tag is for to get s2 selections in s1
							tag: "c"
						},
						s3: {
							label: 'name',
							value: 'id',
							// the tag is for to get get s3 in selections in s2
							tag: "a"
						}
					}
				}
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
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
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
