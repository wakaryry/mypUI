<template>
	<view class="pb">
		<view class="pb-title">
			<text class="pb-title-text">题都城南庄</text>
		</view>
		<text class="pb-one">去年今日此门中，</text>
		<text class="pb-two">人面桃花相映红。</text>
		<text class="pb-three">人面不知何处去，</text>
		<text class="pb-four">桃花依旧笑春风。</text>
		<text class="pb-label">【出处】</text>
		<text class="pb-author">唐五代-崔护</text>
		<text class="pb-label">【注释】</text>
		<text class="pb-desc">这是一首情意真挚的抒情诗。崔护考进士末中，清明节独游长安城郊南庄，走到一处桃花盛开的农家门前，一位秀美的姑娘出来热情地接待了他，彼此留下了难忘的印象。第二年清明节再来时，院门紧闭，姑娘不知在何处，只有桃花依旧迎着春风盛开，情态增人惆怅。</text>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	
	
	.pb {
		background-color: $myp-color-primary;
		width: 750rpx;
		height: 1000rpx;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;
		padding-left: 32rpx;
		padding-right: 32rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		align-items: center;
		
		&-title {
			width: 686rpx;
			height: 80rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
			
			&-text {
				font-size: 36rpx;
				color: #FFFFFF;
				font-weight: 600;
			}
		}
		&-one {
			margin-top: 40rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		&-two {
			margin-top: 16rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		&-three {
			margin-top: 16rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		&-four {
			margin-top: 16rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		&-label {
			margin-top: 24rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 46rpx;
			font-weight: 600;
		}
		&-author {
			margin-top: 16rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
		&-desc {
			margin-top: 24rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 42rpx;
		}
	}
</style>
