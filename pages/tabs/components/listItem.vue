<template>
	<view class="liv-box">
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
	import mypIcon from '@/mypUI/myp-icon/index.vue'
	import mypButton from '@/mypUI/myp-button/index.vue'
	
	export default {
		components: {
			mypIcon,
			mypButton
		},
		props: {
			item: {
				type: Object,
				default: ()=>{
					return {}
				}
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
	@import '@/m.scss';
	
	.liv {
		&-box {
			position: relative;
			width: 750rpx;
		}
		&-body {
			background-color: #FFFFFF;
			border-radius: 32rpx;
			height: 300rpx;
			margin-left: 32rpx;
			margin-right: 32rpx;
			flex-direction: column;
			align-items: center;
			&-title {
				margin-top: 92rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: $m-text-color;
			}
			&-desc {
				font-size: 26rpx;
				line-height: 62rpx;
				color: $m-text-color-third;
			}
		}
		&-logo {
			position: absolute;
			top: 0;
			width: 750rpx;
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
