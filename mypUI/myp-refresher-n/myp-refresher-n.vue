<template>
	<refresh class="myp-refresher" @refresh="onRefresh" @pullingdown="onPullingDown" :display="refreshing ? 'show' : 'hide'">
		<view class="myp-cycle-container" ref="cycle">
			<view class="myp-u-cover myp-u-c1" ref="cover1">
				<view class="myp-u-cover-cycle myp-u-cover1"></view>
			</view>
			<view class="myp-u-cover myp-u-c2" ref="cover2">
				<view class="myp-u-cover-cycle" ref="cover-cycle"></view>
			</view>
		</view>
		<image class="myp-arrow-down" ref="arrow" :src="downIcon" mode="aspectFill"></image>
		<text class="myp-u-txt">{{ refresherText }}</text>
	</refresh>
</template>

<script>
	// 
	// 注意：iOS-app中，scroll的内容不足一个scroll的高度（也就是scroll无法滚动的时候），无法触发下拉刷新和上提加载
	// list中无此问题
	//
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	const bindingX = uni.requireNativePlugin('bindingx');
	// #endif
	
	import {getPlatform} from '../utils/system.js'
	
	const HEIGHT_RPX = 140
	const HEIGHT = uni.upx2px(140)

	export default {
		props: {
			// 对应的list/scroll的ref
			scrollerRef: String,
			// 超时时间。0表示不会超时
			maxTime: {
				type: Number,
				default: 0
			},
			// 下拉文字提示
			mainText: {
				type: String,
				default: '下拉触发刷新...'
			},
			// 满足是否刷新时文字提示
			pullingText: {
				type: String,
				default: '释放即可刷新...'
			},
			// 刷新时文字提示
			refreshingText: {
				type: String,
				default: '正在努力加载...'
			},
			// 下拉的图标
			downIcon: {
				type: String,
				default: '/static/ui/down.png'
			}
		},
		data() {
			return {
				refreshing: false,
				couldUnLash: false,
				isAndroid: false
			};
		},
		computed: {
			refresherText() {
				return this.refreshing ? this.refreshingText : this.pText;
			},
			pText() {
				return this.couldUnLash ? this.pullingText : this.mainText;
			}
		},
		created() {
			const system = getPlatform()
			this.isAndroid = system === 'android';
			this.animationBinding();
		},
		beforeDestroy() {
			this.bindingsDestroy();
		},
		methods: {
			onRefresh(event) {
				// console.log('on refresh')
				// onRefresh means holding the refresh-component when u are not pulling the refresher
				// 在onRefresh阶段，再次下拉不会二次触发onRefresh，不需要做保护
				this.$emit('refresh', event);
				this.refreshing = true;
				this.cycleGoRound();
				if (this.maxTime <= 0) return;
				this.timeoutSto && clearTimeout(this.timeoutSto);
				const that = this
				this.timeoutSto = setTimeout(() => {
					that.$emit('timeout');
					that.cancel();
				}, this.maxTime);
			},
			/**
			 * 取消 refreshing
			 */
			cancel() {
				this.refreshing = false;
				this.timeoutSto && clearTimeout(this.timeoutSto);
				this.roundingDestroy();
			},
			/**
			 * 下拉事件. when pulling from bottom to up for load more, it will also be called
			 */
			onPullingDown(event) {
				// console.log('on puling down')
				// it means the refresh-component is pulling-down
				this.$emit('pullingDown', event);
				// TODO:
				// console.log(event.pullingDistance)
				let pd = event.pullingDistance // * (this.isAndroid ? -1 : 1);
				// console.log(pd)
				// 暂时未开放下拉多少可以触发释放下拉的回掉
				pd > (this.isAndroid ? HEIGHT+140 : HEIGHT) ? (this.couldUnLash = true) : (this.couldUnLash = false);
				//console.log(this.couldUnLash)
				if (this.refreshing && pd < 20) {
					this.timeoutSto && clearTimeout(this.timeoutSto);
					this.refreshing = false;
					this.roundingDestroy();
				}
			},
			/**
			 * 注册 bindingx
			 */
			animationBinding() {
				setTimeout(() => {
					const scroller = this.$parent.$refs[this.scrollerRef].ref;
					const cover2 = this.$refs['cover2'].ref;
					const coverCycle = this.$refs['cover-cycle'].ref;
					const bindingResult = bindingX.bind({
							eventType: 'scroll',
							anchor: scroller,
							props: [{
									element: cover2,
									property: 'transform.rotateZ',
									expression: 'y>-140?(y%75/150*-360):156'
								},
								{
									element: coverCycle,
									property: 'opacity',
									expression: 'y<-75 ?1:0'
								}
							]
						},
						e => {}
					);
					this.bindingToken = bindingResult.token;
				}, 300);
			},
			/**
			 * 旋转动作
			 */
			cycleGoRound() {
				// if (this.isAndroid) return;
				let cycle = this.$refs['cycle'].ref;
				this.arrowShow(false);
				if (!cycle) {
					return;
				}
				// console.log('cycle')
				const roundingResult = bindingX.bind({
						eventType: 'timing',
						props: [{
							element: cycle,
							property: 'transform.rotateZ',
							expression: 't*0.72'
						}]
					},
					e => {}
				);
				this.roundingToken = roundingResult.token;
			},
			/**
			 * 箭头显隐控制
			 */
			arrowShow(_show = true) {
				const arrow = this.$refs['arrow'];
				arrow &&
					animation.transition(
						arrow, {
							styles: {
								opacity: _show ? 1 : 0,
								transform: _show ? 'scale(1)' : 'scale(0.5)'
							},
							duration: 300,
							delay: 0
						},
						() => {}
					);
			},
			/**
			 * 完整 bindingx 销毁
			 */
			bindingsDestroy() {
				if (this.bindingToken !== 0) {
					bindingX &&
						bindingX.unbind({
							eventType: 'scroll',
							token: this.bindingToken
						});
					this.bindingToken = 0;
				}
				this.roundingDestroy();
			},
			/**
			 * 旋转 bindingx 销毁
			 */
			roundingDestroy() {
				if (this.roundingToken !== 0) {
					bindingX &&
						bindingX.unbind({
							eventType: 'timing',
							token: this.roundingToken
						});
					this.roundingToken = 0;
				}
				this.arrowShow(true);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myp-refresher {
		height: 140rpx;
		width: 750rpx;
		flex-direction: row;
		justify-content: center;
		padding-top: 50rpx;
	}

	.myp-cycle-container {
		position: relative;
		width: 60rpx;
		height: 60rpx;
	}
	
	.myp-u {
		&-cover {
			position: absolute;
			width: 30rpx;
			height: 60rpx;
			top: 0;
			// background-color: #ffffff;
			overflow: hidden;
			right: 0;
			&-cycle {
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				right: 0;
				top: 0;
				border-width: 2rpx;
				border-color: #666666;
				border-style: solid;
				border-radius: 30rpx;
				opacity: 0;
			}
		}
		&-cover1 {
			opacity: 1;
		}
		&-c1 {
			z-index: 1;
		}
		&-c2 {
			z-index: 2;
			transform-origin: left center;
			transform: rotateZ(0deg);
		}
	}
	.myp-indicator {
		margin-right: 20rpx;
		height: 60rpx;
		width: 60rpx;
		color: #666666;
	}

	.myp-arrow-down {
		position: relative;
		top: 15rpx;
		left: -45rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.myp-u-txt {
		font-size: 24rpx;
		line-height: 40rpx;
		color: #999999;
		margin-top: 10rpx;
		margin-left: 10rpx;
		height: 40rpx;
		lines: 1;
	}
</style>
