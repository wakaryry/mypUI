<template>
	<view class="myp-down-content" :style="{height: height + 'rpx'}" @touchstart="downTouchstart" @touchmove="downTouchmove" @touchend="downTouchend">
		<view class="myp-loading-wrapper" :style="mrStyle">
			<slot name="down"></slot>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	// 用于下拉拉出内容，最常用的可以是下拉拉出刷新，下拉拉出更多等
	// 比如下拉拉出头部内容，微信首页形式下拉等
	// 可以扩展横向拉出；可以扩展down slot的高度变化，起始为0，不断提高高度
	// 可以包裹scroll，通过enableScroll可以控制scroll是否允许滚动
	let startY, moveY, windowHeight = 500,
		platform;
	let timeDiff = 0;
	let touchending;
	export default {
		props: {
			//距离顶部距离，单位rpx
			top: {
				type: Number,
				default: 0
			},
			// 下拉拉出的高度门槛，放开之后依然可以自动打开内容. rpx
			offset: {
				type: Number,
				default: 100
			},
			// 总高度rpx
			height: {
				type: Number,
				default: 500
			},
			// 下拉内容区的高度rpx
			downHeight: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				downDeviation: 0, //下偏移量
				downTransitionDuration: 0, //回弹过渡时间
				openReady: false, //进入拉出准备状态，超过偏移量offset就进入准备状态，准备状态下放开下拉，会继续打开下拉内容
				opened: false, // 进入拉出状态
			};
		},
		created() {
			uni.getSystemInfo({
				success: function(e) {
					platform = e.platform;
					windowHeight = e.windowHeight;
				}
			})
		},
		computed: {
			offsetPx() {
				return uni.upx2px(this.offset)
			},
			downHeightPx() {
				return uni.upx2px(this.downHeight)
			},
			mrStyle() {
				let _style = "height:" + this.downDeviation + 'px;'
				_style += 'transition-duration:' + this.downTransitionDuration + 'ms;'
				return _style
			}
		},
		methods: {
			downTouchstart(e) {
				touchending = false;
				this.downTransitionDuration = 0;
				startY = e.touches[0].pageY;
			},
			downTouchmove(e) {
				if (touchending) {
					return;
				}
				// 0.4 is rate. 越小越难拉
				moveY = (e.touches[0].pageY - startY) * 0.4;
				if (moveY >= 0) {
					if (this.opened) {
						this.downDeviation = this.downHeightPx + moveY;
						this.$emit('pullingDown', this.downHeightPx + moveY);
						return
					} else {
						this.downDeviation = moveY;
						this.$emit('pullingDown', moveY);
					}
					// this.downDeviation = moveY;
					// 您可能需要设置scrollable为false
					//this.$emit('pullingDown', moveY);
				}
				if (moveY >= this.offsetPx && this.openReady === false) {
					this.openReady = true;
				} else if (moveY < this.offsetPx && this.openReady === true) {
					this.openReady = false;
				}
				if (platform === 'ios' && e.touches[0].pageY > windowHeight + 10) {
					this.downTouchend();
				}
			},
			downTouchend() {
				touchending = true;
				if (moveY === 0) {
					return;
				}
				this.downTransitionDuration = 300;
				if (moveY >= this.offsetPx) {
					setTimeout(()=>{
						this.startPulldown();
					}, 40)
					// this.startPulldown();
				} else {
					setTimeout(()=>{
						this.endPulldown()
					}, 40)
					//this.downDeviation = 0;
				}

				if (this.openReady === true) {
					this.openReady = false;
				}
				//修复下拉一点回弹后页面无法滚动的bug
				// 你可能需要通过这个通知修改scrollable等
				this.$emit('ended', {});
				startY = moveY = 0;
			},
			//开启下拉
			startPulldown() {
				if (+new Date() - timeDiff < 100) {
					return;
				}
				timeDiff = +new Date();
				this.opened = true;
				this.downDeviation = this.downHeightPx;
				this.$emit('opened', {});
			},
			//结束下拉刷新
			endPulldown() {
				this.opened = false;
				this.downDeviation = 0;
				//this.$emit('setEnableScroll', true);
			},
		}
	}
</script>

<style>
	.myp-down-content {
		flex-direction: column;
	}

	/* 下拉拉出部分 */
	.myp-loading-wrapper {
		height: 0;
		transition-property: height;
		transition-duration: 300ms;
		transition-timing-function: ease-in;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
</style>
