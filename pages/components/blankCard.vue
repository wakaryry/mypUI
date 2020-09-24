<template>
	<view class="bc">
		<myp-icon :name="icon" type="third" iconStyle="font-size: 50px; width:60px;height:60px;"></myp-icon>
		<text class="myp-color-third bc-desc">{{desc}}</text>
		<myp-button :text="btn" border="all-dark" radius="ll" boxStyle="width: 180rpx; height: 32px;" @buttonClicked="toAction"></myp-button>
		<view style="height: 32px;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: 'solid-shop-car'
			},
			desc: {
				type: String,
				default: '您的购物车还没有商品'
			},
			btn: {
				type: String,
				default: '去购物'
			}
		},
		methods: {
			toAction() {
				this.$emit("action")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bc {
		height: 240px;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		
		&-desc {
			font-size: 14px;
			line-height: 20px;
			margin-top: 16px;
			margin-bottom: 16px;
		}
	}
</style>
