<template>
	<view class="hdc" :style="boxStyle">
		<view class="hdc-left">
			<image class="hdc-cover" src="/static/logo-dark.png" mode="aspectFill"></image>
			<view class="hdc-tag">
				<myp-icon name="triangle" type="inverse" size="s"></myp-icon>
				<text class="hdc-tag-text">1.6亿</text>
			</view>
		</view>
		<view class="hdc-right">
			<text class="hdc-title">【mypUI】最好最棒的UI库</text>
			<view class="hdc-author">
				<image class="hdc-author-av" src="/static/bear.jpg" mode="aspectFill"></image>
				<text class="hdc-author-name">语文数学天才</text>
				<myp-icon name="right" type="inverse" size="s"></myp-icon>
			</view>
			<view class="hdc-detail">
				<text class="hdc-detail-text">超级好用的组件库。具备核心，精准打击，不滥竽充数</text>
				<myp-icon name="right" type="inverse" size="s"></myp-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			boxStyle: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hdc {
		flex-direction: row;
		flex-wrap: nowrap;
		width: 750rpx;
		padding-left: 32rpx;
		padding-right: 40rpx;
		
		&-left {
			position: relative;
			width: 260rpx;
			height: 260rpx;
		}
		&-cover {
			width: 260rpx;
			height: 260rpx;
			border-radius: 8rpx;
		}
		&-tag {
			position: absolute;
			flex-direction: row;
			align-items: center;
			top: 8rpx;
			right: 8rpx;
			
			&-text {
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 30rpx;
			}
		}
		&-right {
			flex: 1;
			margin-left: 40rpx;
		}
		&-title {
			font-size: 36rpx;
			line-height: 50rpx;
			color: #FFFFFF;
			font-weight: 700;
		}
		&-author {
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			margin-top: 16rpx;
			
			&-av {
				width: 56rpx;
				height: 56rpx;
				border-radius: 30rpx;
			}
			&-name {
				font-size: 30rpx;
				line-height: 42rpx;
				color: #FFFFFF;
				margin-left: 24rpx;
				margin-right: 12rpx;
			}
		}
		&-detail {
			margin-top: 24rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			
			&-text {
				flex: 1;
				font-size: 24rpx;
				color: #DDDDDD;
				line-height: 36rpx;
			}
		}
	}
</style>
