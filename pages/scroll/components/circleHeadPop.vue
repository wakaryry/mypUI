<template>
	<myp-popup :show="show" pos="top" height="713" @overlayClicked="toCancel">
		<view class="chp">
			<image src="/static/circle-bg.png" class="chp-bg" mode="aspectFill"></image>
			<view class="chp-body">
				<myp-navbar bgType="none" :fixed="false">
					<view class="chp-nav-title" slot="title">
						<text class="chp-nav-title-text" @tap.stop="toCancel">欢迎光临</text>
						<myp-icon name="down" type="inverse" @iconClicked="toCancel"></myp-icon>
					</view>
				</myp-navbar>
				<view style="height: 8rpx;"></view>
				<myp-input v-model="search" inputType="inverse" border="none" radius="ll" action="search" actionType="inverse" height="base" placeholder="圈子内容搜索" space="20rpx" boxStyle="padding-left:40rpx;padding-right:20rpx;background-color: rgba(255,255,255,0.10);margin-left:75rpx;width:600rpx;" @rightAction="toSearch"></myp-input>
				<view class="chp-items">
					<view class="chp-item" v-for="(item,idx) in apps" :key="idx">
						<app-item :item="item" space="16rpx" boxStyle="width:238rpx;" iconStyle="border-radius:0;border-width:0;background-color:transparent;width:110rpx;height:110rpx" textStyle="color:#FFFFFF;font-size:24rpx;line-height:33rpx;" @select="toSelect"></app-item>
					</view>
				</view>
			</view>
			<view class="chp-close">
				<myp-icon name="rows" type="inverse" iconStyle="font-size:46rpx;" @iconClicked="toCancel"></myp-icon>
			</view>
		</view>
	</myp-popup>
</template>

<script>
	import appItem from './appItem.vue'
	
	export default {
		components: {
			appItem
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			apps: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		data() {
			return {
				search: ''
			}
		},
		methods: {
			toCancel() {
				this.$emit("cancel")
			},
			toSelect(val) {
				this.$emit("select", val)
			},
			toSearch() {
				
			}
		}
	}
</script>

<style lang="scss">
	.chp {
		width: 750rpx;
		height: 713rpx;
		background-color: transparent;
		position: relative;
		
		&-bg {
			width: 750rpx;
			height: 713rpx;
		}
		&-body {
			position: absolute;
			left: 0;
			top: 0;
			width: 750rpx;
			background-color: transparent;
		}
		&-nav {
			&-title {
				flex-direction: row;
				justify-content: center;
				align-items: center;
				
				&-text {
					font-size: 16px;
					line-height: 25rpx;
					color: #FFFFFF;
					margin-right: 8rpx;
				}
			}
		}
		&-items {
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 18rpx;
			margin-top: 51rpx;
		}
		&-item {
			margin-bottom: 30rpx;
		}
		&-close {
			position: absolute;
			left: 375rpx;
			bottom: 10rpx;
			transform: translateX(-50%);
		}
	}
</style>
