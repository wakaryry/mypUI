<template>
	<view bubble="true" class="vit" :style="boxStyle" @tap="toSelect">
		<view class="vit-top" :style="topStyle">
			<myp-icon :name="top" :type="topType" :size="topSize" :iconStyle="topIconStyle" @iconClicked="toSelect"></myp-icon>
			<view class="vit-badge" :style="badgeStyle">
				<text class="vit-badge-text" :style="badgeTextStyle">{{badge}}</text>
			</view>
		</view>
		<view :style="{height: space}"></view>
		<text class="vit-bottom-text" :style="bottomTextStyle">{{bottom}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				type: String,
				default: ''
			},
			bottom: {
				type: [String, Number],
				default: ''
			},
			badge: {
				type: [String, Number],
				default: ''
			},
			topStyle: {
				type: String,
				default: ''
			},
			topType: {
				type: String,
				default: ''
			},
			topSize: {
				type: String,
				default: ''
			},
			topIconStyle: {
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
	.vit {
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
