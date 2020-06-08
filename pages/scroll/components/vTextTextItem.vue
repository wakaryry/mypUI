<template>
	<view bubble="true" class="vtt" :style="boxStyle" @tap="toSelect">
		<view class="vtt-top" :style="topStyle">
			<text class="vtt-top-text" :style="topTextStyle">{{top}}</text>
			<view class="vtt-badge" :style="badgeStyle">
				<text class="vtt-badge-text" :style="badgeTextStyle"></text>
			</view>
		</view>
		<view :style="{height: space}"></view>
		<text class="vtt-bottom-text" :style="bottomTextStyle">{{bottom}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: [String, Number],
				default: ''
			},
			bottom: {
				type: [String, Number],
				default: ''
			},
			topStyle: {
				type: String,
				default: ''
			},
			topTextStyle: {
				type: String,
				default: ''
			},
			bottomTextStyle: {
				type: String,
				default: ''
			},
			space: {
				type: String,
				default: '6rpx'
			},
			badgeStyle: {
				type: String,
				default: ''
			},
			badgeTextStyle: {
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
				this.$emit("select")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vtt {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		&-top {
			position: relative;
		}
		&-badge {
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>
