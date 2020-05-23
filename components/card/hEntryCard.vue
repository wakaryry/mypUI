<template>
	<view class="hec">
		<view class="hec-left">
			<view class="hec-left-title">
				<text class="hec-left-title-text">{{title}}</text>
				<myp-icon name="right" type="inverse" size="ll"></myp-icon>
			</view>
			<view class="hec-left-desc">
				<text class="hec-left-desc-text">{{desc}}</text>
			</view>
		</view>
		<view class="hec-right">
			<text class="hec-right-top">{{Date.now() | mypTimeParse('{m}月')}}</text>
			<text class="hec-right-bottom">{{Date.now() | mypTimeParse('{d}')}}</text>
		</view>
	</view>
</template>

<script>
	import filterMixin from '@/mypUI/myp-mixin/filterMixin.js'
	
	export default {
		mixins: [filterMixin],
		props: {
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.hec {
		background-color: $myp-text-color-second;
		border-radius: 16rpx;
		padding: 24rpx;
		flex-direction: row;
		justify-content: space-between;
		
		&-left {
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			
			&-title {
				flex-direction: row;
				align-items: center;
				
				&-text {
					color: #FFFFFF;
					font-size: 36rpx;
					line-height: 42rpx;
				}
			}
			&-desc {
				flex-direction: row;
				
				&-text {
					flex: 1;
					font-size: 28rpx;
					line-height: 36rpx;
					color: $myp-text-color-forth;
					overflow: hidden;
					text-overflow: ellipsis;
					/* #ifdef APP-NVUE */
					lines: 1;
					/* #endif */
					/* #ifndef APP-NVUE */
					white-space: nowrap;
					width: 100rpx;
					/* #endif */
				}
			}
		}
		
		&-right {
			width: 140rpx;
			flex-direction: column;
			align-items: center;
			
			&-top {
				font-size: 36rpx;
				line-height: 42rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
			
			&-bottom {
				font-size: 46rpx;
				line-height: 52rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
	}
</style>
