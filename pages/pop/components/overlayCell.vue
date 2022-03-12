<template>
	<view class="cf">
		<view class="cf-bg">
			<image src="/static/imgs/bg-white.jpg" class="cf-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="cf-title-bg">
			<image class="cf-title-bg-cover" src="/static/imgs/bg-slice.png" mode="aspectFit"></image>
		</view>
		<view class="cf-title">
			<text class="cf-title-text">Overlay</text>
			<image class="cf-title-hint" src="/static/imgs/drop.png" mode="aspectFit"></image>
		</view>
		<view class="cf-left">
			<image src="/static/imgs/bed.png" class="cf-left-bg" mode="aspectFit"></image>
		</view>
		<view class="cf-body">
			<view bubble="true" class="cf-item" v-for="(item,idx) in items" :key="idx" @tap="toSelect(item)">
				<view class="cf-item-bg">
					<image src="/static/imgs/box.png" class="cf-item-bg-cover" mode="aspectFit"></image>
				</view>
				<view class="cf-item-tl">
					<image src="/static/imgs/top-left.png" class="cf-item-tl-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-br">
					<image src="/static/imgs/bottom-right.png" class="cf-item-br-bg" mode="aspectFit"></image>
				</view>
				<view class="cf-item-title">
					<text class="cf-item-title-text" v-for="(char,index) in item.title" :key="index">{{char}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{name: 'normal', title: ['是','通','用'], type: 'overlay', options: {canAutoClose: false, hasBg: false}},
					{name: 'auto', title: ['自','关','闭'], type: 'overlay', options: {canAutoClose: true, hasBg: false}},
					{name: 'bg', title: ['设','背','景'], type: 'overlay', options: {canAutoClose: true, hasBg: true}}
				]
			}
		},
		methods: {
			toSelect(val) {
				this.$emit("select", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cf {
		position: relative;
		width: 750rpx;
		height: 422rpx;
		overflow: hidden;
		
		&-bg {
			width: 750rpx;
			height: 422rpx;
			overflow: hidden;
			
			&-cover {
				width: 750rpx;
				height: 422rpx;
			}
		}
		&-title {
			position: absolute;
			flex-direction: row;
			align-items: center;
			left: 375rpx;
			top: 30rpx;
			transform: translateX(-50%);
			
			&-bg {
				position: absolute;
				left: 375rpx;
				top: 20rpx;
				transform: translateX(-50%);
				
				&-cover {
					width: 260rpx;
					height: 130rpx;
				}
			}
			&-text {
				font-size: 52rpx;
				line-height: 80rpx;
				color: #FFFFFF;
			}
			&-hint {
				width: 70rpx;
				height: 100rpx;
			}
		}
		&-body {
			position: absolute;
			right: 25rpx;
			width: 540rpx;
			top: 140rpx;
			flex-direction: row;
			justify-content: space-between;
		}
		&-item {
			position: relative;
			
			&-bg {
				&-cover {
					width: 150rpx;
					height: 274rpx;
				}
			}
			&-tl {
				position: absolute;
				top: 0;
				left: 0;
				
				&-bg{
					width: 60rpx;
					height: 57rpx;
				}
			}
			&-br {
				position: absolute;
				right: 0;
				bottom: 0;
				
				&-bg {
					width: 60rpx;
					height: 57rpx;
				}
			}
			&-title {
				position: absolute;
				width: 150rpx;
				height: 274rpx;
				left: 0;
				top: 0;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				&-text {
					font-size: 48rpx;
					font-weight: 600;
					color: #729aa1;
					line-height: 66rpx;
				}
			}
		}
		&-left {
			position: absolute;
			bottom: 0;
			left: 0;
			
			&-bg {
				width: 320rpx;
				height: 320rpx;
			}
		}
	}
</style>
