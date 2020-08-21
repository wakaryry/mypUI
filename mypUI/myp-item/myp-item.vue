<template>
	<view :class="['myp-item', 'myp-bg-'+bgType, 'myp-border-'+border, 'myp-radius-'+radius]" :hover-class="'myp-hover-'+hover" :style="boxStyle" bubble="true" @tap="toSelect">
		<myp-icon v-if="isIcon&&icon" :name="icon" :type="iconType" :size="iconSize" :iconStyle="iconStyle" :boxStyle="iconBoxStyle" @iconClicked="toSelect"></myp-icon>
		<text v-if="!isIcon&&icon" :class="['myp-color-'+iconType, 'myp-size-'+iconSize]" :style="iconStyle">{{icon}}</text>
		<text :class="['myp-color-'+textType, 'myp-size-'+textSize]" :style="'margin-top:'+space+';'+textStyle">{{text}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ''
			},
			isIcon: {
				type: Boolean,
				default: true
			},
			text: {
				type: String,
				default: ''
			},
			space: {
				type: String,
				default: '12rpx'
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
			hover: {
				type: String,
				default: 'opacity'
			},
			iconType: {
				type: String,
				default: 'text'
			},
			iconSize: {
				type: String,
				default: 'll'
			},
			iconStyle: {
				type: String,
				default: ''
			},
			iconBoxStyle: {
				type: String,
				default: ''
			},
			textType: {
				type: String,
				default: 'second'
			},
			textSize: {
				type: String,
				default: 'base'
			},
			textStyle: {
				type: String,
				default: ''
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			toSelect() {
				this.$emit("itemClicked")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myp-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
