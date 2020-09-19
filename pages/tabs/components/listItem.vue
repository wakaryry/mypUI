<template>
	<view class="liv-box" :style="boxStyle">
		<view style="height: 68rpx;"></view>
		<view class="liv-body">
			<text class="liv-body-title">{{item.title}}</text>
			<text class="liv-body-desc">{{item.intro}}</text>
			<myp-button border="bottom" :text="item.hint || '预览效果'" height="base" radius="none" boxStyle="width:500rpx;" @buttonClicked="tapped"></myp-button>
		</view>
		<view class="liv-logo">
			<image class="liv-logo-image" src="/static/mypuiBg.png" mode="aspectFill"></image>
		</view>
		<view class="liv-logo">
			<view class="liv-logo-body">
				<myp-icon :name="item.icon" type="inverse" size="ll"></myp-icon>
				<text class="liv-logo-text">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
			},
			boxStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			tapped() {
				this.$emit("selected")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.liv {
		&-box {
			position: relative;
			width: 628rpx;
		}
		&-body {
			background-color: #FFFFFF;
			border-radius: 32rpx;
			height: 300rpx;
			flex-direction: column;
			align-items: center;
			border-width: $myp-border-width;
			border-color: rgba($color: $myp-color-error, $alpha: 0.2); // $myp-border-color-light;
			border-style: solid;
			
			&-title {
				margin-top: 92rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: $myp-text-color;
			}
			&-desc {
				font-size: 26rpx;
				line-height: 62rpx;
				color: $myp-text-color-third;
			}
		}
		&-logo {
			position: absolute;
			left: 0;
			top: 0;
			width: 628rpx;
			flex-direction: row;
			justify-content: center;
			
			&-image {
				width: 363rpx;
				height: 136rpx;
			}
			&-body {
				width: 363rpx;
				height: 136rpx;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
			&-text {
				margin-left: 12rpx;
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
