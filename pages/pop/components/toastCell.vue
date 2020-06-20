<template>
	<view class="ct">
		<view class="ct-bg">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOiW0.jpg" class="ct-bg-cover" mode="aspectFill"></image>
		</view>
		<view class="ct-foot">
			<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YTWDS.png" class="ct-foot-cover" mode="aspectFill"></image>
		</view>
		<view class="ct-title">
			<text v-for="(item,idx) in ['T','o','a','s','t']" :key="idx" class="ct-title-text">{{item}}</text>
		</view>
		<view v-for="(item,idx) in items" :key="idx" :class="['ct-'+item.class]">
			<view v-if="item.type==='notify'" class="ct-item-title" bubble="true" @tap="toToast(item)">
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
				<text class="ct-item-title-text">{{item.title}}</text>
			</view>
			<view v-else class="ct-item-title" bubble="true" @tap="toToast(item)">
				<text class="ct-item-title-text">{{item.title}}</text>
				<image src="https://cdn.img.wenhairu.com/images/2020/05/23/YOvLH.png" class="ct-item-hint" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{name: 'notifyTop', class: 'notify-one', type: 'notify', title: '滑出-top', options: {pos: 'top', offset: '0'}},
					{name: 'notifyBottom', class: 'notify-two', type: 'notify', title: '滑出-bottom', options: {pos: 'bottom', offset: 'x'}},
					{name: 'notifyTopOffset', class: 'notify-three', type: 'notify', title: '滑出-offset', options: {pos: 'top', offset: 'status-nav-100rpx'}},
					{name: 'notifyCenter', class: 'notify-four', type: 'notify', title: '滑出-center', options: {pos: 'top-center', offset: '0'}},
					{name: 'notifyCenterOffset', class: 'notify-five', type: 'notify', title: '滑出-center-offset', options: {pos: 'bottom-center', offset: '-100rpx'}},
					{name: 'toastCenter', class: 'toast-one', type: 'toast', title: '弹出-center', options: {type: 'warning', text: '前方有危险', mode: 'big'}},
					{name: 'toastOffset', class: 'toast-two', type: 'toast', title: '弹出-offset', options: {type: 'error', text: '高能！高能！禁止前进', mode: 'big', pos: 'top', offset: 'status-nav-60px'}},
					{name: 'toastTop', class: 'toast-three', type: 'toast', title: '弹出-top', options: {type: 'success', text: '欢迎来到mypUI，敌人还有3s到达战场', pos: 'top', offset: 'status-nav-60px'}},
					{name: 'toastBottom', class: 'toast-four', type: 'toast', title: '弹出-bottom', options: {type: 'success', text: '欢迎来到mypUI，敌人还有3s到达战场', pos: 'bottom', offset: 'x-60px'}},
					{name: 'notice', class: 'toast-five', type: 'notice', title: 'notice'}
				]
			}
		},
		methods: {
			toToast(val) {
				this.$emit("toast", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';
	
	.ct {
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
		
		&-foot {
			position: absolute;
			left: 375rpx;
			bottom: 0;
			transform: translateX(-50%);
			
			&-cover {
				width: 700rpx;
				height: 261rpx;
			}
		}
		&-title {
			position: absolute;
			left: 375rpx;
			top: 4rpx;
			transform: translateX(-50%);
			width: 42rpx;
			flex-direction: column;
			align-items: center;
			
			&-text {
				font-size: 32rpx;
				line-height: 42rpx;
				color: #FFFFFF;
				font-weight: 700;
			}
		}
		&-notify {
			&-one {
				position: absolute;
				left: 40rpx;
				top: 30rpx;
			}
			&-two {
				position: absolute;
				left: 40rpx;
				top: 110rpx;
			}
			&-three {
				position: absolute;
				left: 40rpx;
				top: 190rpx;
			}
			&-four {
				position: absolute;
				left: 40rpx;
				top: 270rpx;
			}
			&-five {
				position: absolute;
				left: 40rpx;
				top: 350rpx;
			}
		}
		&-toast {
			&-one {
				position: absolute;
				right: 40rpx;
				top: 30rpx;
				flex-direction: column;
				align-items: flex-end;
			}
			&-two {
				position: absolute;
				right: 40rpx;
				top: 110rpx;
				flex-direction: column;
				align-items: flex-end;
			}
			&-three {
				position: absolute;
				right: 40rpx;
				top: 190rpx;
				flex-direction: column;
				align-items: flex-end;
			}
			&-four {
				position: absolute;
				right: 40rpx;
				top: 270rpx;
				flex-direction: column;
				align-items: flex-end;
			}
			&-five {
				position: absolute;
				right: 40rpx;
				top: 350rpx;
				flex-direction: column;
				align-items: flex-end;
			}
		}
		&-item {
			&-title {
				flex-direction: row;
				align-items: center;
				
				&-text {
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 46rpx;
				}
			}
			&-hint {
				width: 50rpx;
				height: 70rpx;
			}
			&-desc {
				&-text {
					width: 200rpx;
					font-size: 26rpx;
					line-height: 36rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
