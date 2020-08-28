<template>
	<view :class="['myp-title', 'myp-bg-'+bgType, 'myp-height-'+height]" :style="boxStyle" :hover-class="'myp-hover-'+hover">
		<view class="myp-title-left" :style="leftStyle" bubble="true" @tap="leftClicked">
			<myp-icon v-if="leftIcon1&&leftIcon1.length>0" :name="leftIcon1" :type="leftIcon1Type" :size="leftIcon1Size" :style="leftIcon1Style" :mode="leftIcon1Mode" @iconClicked="leftClicked"></myp-icon>
			<text :class="['myp-size-'+title1Size, 'myp-color-'+title1Type]" :style="mrTitle1Style">{{title1}}</text>
			<myp-icon v-if="leftIcon2&&leftIcon2.length>0" :name="leftIcon2" :type="leftIcon2Type" :size="leftIcon2Size" :style="leftIcon2Style" :mode="leftIcon2Mode" @iconClicked="leftClicked"></myp-icon>
		</view>
		<view class="myp-title-center" :style="centerStyle" bubble="true" @tap="centerClicked">
			<myp-icon v-if="centerIcon1&&centerIcon1.length>0" :name="centerIcon1" :type="centerIcon1Type" :size="centerIcon1Size" :style="centerIcon1Style" :mode="centerIcon1Mode" @iconClicked="centerClicked"></myp-icon>
			<text :class="['myp-size-'+title2Size, 'myp-color-'+title2Type]" :style="mrTitle2Style">{{title2}}</text>
			<myp-icon v-if="centerIcon2&&centerIcon2.length>0" :name="centerIcon2" :type="centerIcon2Type" :size="centerIcon2Size" :style="centerIcon2Style" :mode="centerIcon2Mode" @iconClicked="centerClicked"></myp-icon>
		</view>
		<view class="myp-title-right" :style="rightStyle" bubble="true" @tap="rightClicked">
			<myp-icon v-if="rightIcon1&&rightIcon1.length>0" :name="rightIcon1" :type="rightIcon1Type" :size="rightIcon1Size" :style="rightIcon1Style" :mode="rightIcon1Mode" @iconClicked="rightClicked"></myp-icon>
			<text :class="['myp-size-'+title3Size, 'myp-color-'+title3Type]" :style="mrTitle3Style">{{title3}}</text>
			<myp-icon v-if="rightIcon2&&rightIcon2.length>0" :name="rightIcon2" :type="rightIcon2Type" :size="rightIcon2Size" :style="rightIcon2Style" :mode="rightIcon2Mode" @iconClicked="rightClicked"></myp-icon>
			<slot></slot>
		</view>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			title1: {
				type: String,
				default: ''
			},
			title2: {
				type: String,
				default: ''
			},
			title3: {
				type: String,
				default: ''
			},
			leftIcon1: {
				type: String,
				default: ''
			},
			leftIcon2: {
				type: String,
				default: ''
			},
			centerIcon1: {
				type: String,
				default: ''
			},
			centerIcon2: {
				type: String,
				default: ''
			},
			rightIcon1: {
				type: String,
				default: ''
			},
			rightIcon2: {
				type: String,
				default: ''
			},
			// icon-text-icon 之间的space
			space: {
				type: String,
				default: '12rpx'
			},
			height: {
				type: String,
				default: 'l'
			},
			// 增加hover只是方便你当作cell使用
			hover: {
				type: String,
				default: 'none'
			},
			bgType: {
				type: String,
				default: ''
			},
			title1Type: {
				type: String,
				default: ''
			},
			title1Size: {
				type: String,
				default: ''
			},
			title1Style: {
				type: String,
				default: ''
			},
			title2Type: {
				type: String,
				default: ''
			},
			title2Size: {
				type: String,
				default: ''
			},
			title2Style: {
				type: String,
				default: ''
			},
			title3Type: {
				type: String,
				default: ''
			},
			title3Size: {
				type: String,
				default: ''
			},
			title3Style: {
				type: String,
				default: ''
			},
			leftIcon1Type: {
				type: String,
				default: ''
			},
			leftIcon1Size: {
				type: String,
				default: ''
			},
			leftIcon1Style: {
				type: String,
				default: ''
			},
			leftIcon1Mode: {
				type: String,
				default: 'aspectFill'
			},
			leftIcon2Type: {
				type: String,
				default: ''
			},
			leftIcon2Size: {
				type: String,
				default: ''
			},
			leftIcon2Style: {
				type: String,
				default: ''
			},
			leftIcon2Mode: {
				type: String,
				default: 'aspectFill'
			},
			centerIcon1Type: {
				type: String,
				default: ''
			},
			centerIcon1Size: {
				type: String,
				default: ''
			},
			centerIcon1Style: {
				type: String,
				default: ''
			},
			centerIcon1Mode: {
				type: String,
				default: 'aspectFill'
			},
			centerIcon2Type: {
				type: String,
				default: ''
			},
			centerIcon2Size: {
				type: String,
				default: ''
			},
			centerIcon2Style: {
				type: String,
				default: ''
			},
			centerIcon2Mode: {
				type: String,
				default: 'aspectFill'
			},
			rightIcon1Type: {
				type: String,
				default: ''
			},
			rightIcon1Size: {
				type: String,
				default: ''
			},
			rightIcon1Style: {
				type: String,
				default: ''
			},
			rightIcon1Mode: {
				type: String,
				default: 'aspectFill'
			},
			rightIcon2Type: {
				type: String,
				default: ''
			},
			rightIcon2Size: {
				type: String,
				default: ''
			},
			rightIcon2Style: {
				type: String,
				default: ''
			},
			rightIcon2Mode: {
				type: String,
				default: 'aspectFill'
			},
			boxStyle: {
				type: String,
				default: ''
			},
			leftStyle: {
				type: String,
				default: ''
			},
			centerStyle: {
				type: String,
				default: ''
			},
			rightStyle: {
				type: String,
				default: ''
			}
		},
		computed: {
			mrTitle1Style() {
				let style = ''
				if (this.title1 && this.title1.length > 0) {
					if (this.leftIcon1 && this.leftIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.leftIcon2 && this.leftIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title1Style
			},
			mrTitle2Style() {
				let style = ''
				if (this.title2 && this.title2.length > 0) {
					if (this.centerIcon1 && this.centerIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.centerIcon2 && this.centerIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title2Style
			},
			mrTitle3Style() {
				let style = ''
				if (this.title3 && this.title3.length > 0) {
					if (this.rightIcon1 && this.rightIcon1.length > 0) {
						style += `margin-left:${this.space};`
					}
					if (this.rightIcon2 && this.rightIcon2.length > 0) {
						style += `margin-right:${this.space};`
					}
				}
				return style + this.title3Style
			}
		},
		methods: {
			leftClicked() {
				this.$emit("leftClicked")
			},
			centerClicked() {
				this.$emit("centerClicked")
			},
			rightClicked() {
				this.$emit("rightClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-title {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
		&-left {
			flex-direction: row;
			align-items: center;
		}
		
		&-center {
			flex-direction: row;
			align-items: center;
		}
		
		&-right {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
