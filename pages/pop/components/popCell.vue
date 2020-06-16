<template>
	<view class="co">
		<view class="co-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOl0d.png" class="co-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="co-body">
			<text class="co-body-title">弹层  X  物语</text>
			<text class="co-body-desc">非常精细灵活的弹层，方向/动画/offset...</text>
			<view class="co-actions">
				<view class="co-items" v-for="(item,idx) in items" :key="idx">
					<text class="co-item" v-for="it in item" :key="it.value" @tap="toPop(it.value)">{{it.name}}</text>
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
					[{value: 'top', name: '上'}, {value: 'topOffset', name: '距'}, {value: 'topLeft', name: '左'}, {value: 'topRight', name: '右'}],
					[{value: 'bottom', name: '下'}, {value: 'bottomOffset', name: '距'}, {value: 'bottomLeft', name: '左'}, {value: 'bottomRight', name: '右'}],
					[{value: 'left', name: '左'}, {value: 'leftOffset', name: '距'}, {value: 'leftTop', name: '上'}, {value: 'leftBottom', name: '下'}],
					[{value: 'right', name: '右'}, {value: 'rightOffset', name: '距'}, {value: 'rightTop', name: '上'}, {value: 'rightBottom', name: '下'}],
					[{value: 'center', name: '中'}, {value: 'centerBottom', name: '下'}, {value: 'centerScale', name: '变'}]
				]
			}
		},
		methods: {
			toPop(val) {
				this.$emit("pop", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	.co {
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
		
		&-body {
			position: absolute;
			width: 680rpx;
			flex-direction: column;
			align-items: center;
			left: 375rpx;
			top: 211rpx;
			transform: translate(-50%, -50%);
			
			&-title {
				font-size: 52rpx;
				color: #FFFFFF;
				line-height: 80rpx;
				font-weight: 600;
			}
			&-desc {
				font-size: 32rpx;
				color: #FFFFFF;
				line-height: 45rpx;
			}
		}
		&-actions {
			flex-direction: row;
			justify-content: center;
			flex-wrap: nowrap;
		}
		&-items {
			flex-direction: column;
			align-items: center;
			border-left-width: 1px;
			border-left-color: #FFFFFF;
		}
		&-item {
			margin-left: 12rpx;
			margin-right: 12rpx;
			font-size: 30rpx;
			line-height: 42rpx;
			color: #FFFFFF;
			width: 40rpx;
			text-align: center;
		}
	}
</style>
