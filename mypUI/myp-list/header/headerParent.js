// 通过mescroll来的，当时mescroll是一个 new function对象
// 因为想灵活的控制高度以及方便快速调用，特意改成了mixin形式
export default {
	data() {
		return {
			// #ifdef APP-NVUE
			mypListId: 'head_swiper_list',
			// #endif
			// header
			mypHeaderHeight: uni.upx2px(168), // 不包含tabs
			mypTabsHeight: uni.upx2px(80), // 30 + 50
			mypAllHeight: uni.upx2px(248),
			// #ifndef APP-NVUE
			mypChildScrollable: false,
			mypParentScrollTop: 0,
			// scroll/refresh
			mypParentScrollable: true,
			mypDownHeight: 0,
			mypStartPoint: null,
			mypLastPoint: null,
			mypTheScrollHeight: 0,  // scroll content height
			mypTheScrollTop: 0,  // 记录滚动条的位置，并不是用来重置scrolltop
			mypStartTop: 0,  // 记录开始时滚动条的位置
			mypInTouchend: false,
			// 节流设置
			mypFps: 40,  // 1s内屏幕刷新的频数
			mypMoveTime: 0,
			mypMoveTimeDiff: 0,
			mypScrollTopDeviation: 100,  // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
			mypIsDownLoading: false,  // 是否正在下拉刷新中
			// down
			mypDown: {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,  // 下拉的距离小于offset时,改变下拉区域高度比例;0-1,越小,越难拉
				outRate: 0.2  // 下拉的距离大于offset时,改变下拉区域高度比例;0-1,越小,越难拉
			},
			mypIsMoveDown: false,
			mypDownMoveType: 0,
			mypIsDownReset: false  // 下拉刷新，是否显示重置的过渡动画
			// #endif
		}
	},
	// #ifndef APP-NVUE
	computed: {
		mypMrScrollContentStyle() {
			let _style = 'position: relative;'
			_style += this.mypIsDownReset ? 'transition-property: transform; transition-duration: 300ms;' : ''
			_style += this.mypDownHeight > 0 ? `transform: translateY(${this.mypDownHeight}px);` : ''
			return _style
		},
		mypMrRefreshStyle() {
			return 'position: absolute; transform: translateY(-100%); left:0;'
		},
		mypCouldUnLash() {
			return this.mypDownHeight >= (this.mypDown.offset || 80)
		},
		mypDownRate() {
			return this.mypDownHeight / (this.mypDown.offset || 80)
		}
	},
	// #endif
	methods: {
		// #ifdef APP-NVUE
		mypSetScrollRef(ref) {
			ref && ref.setScrollRef(this.mypAllHeight)
		},
		// #endif
		mypHandleRefresh(ref) {
			// #ifdef APP-NVUE
			const refresher = this.$refs['myp-refresher']
			ref &&ref.toRefresh(refresher, (val) => {
				val && val.cancel()
			}, (val) => {
				val && val.cancel()
			})
			// #endif
			// #ifndef APP-NVUE
			uni.$emit("swiperScrollRefresh")
			// #endif
		},
		// #ifndef APP-NVUE
		// 手指开始触摸屏幕
		mypTouchstartEvent(e) {
			// if (!this.down.use) return;
			this.mypStartPoint = this.mypGetPoint(e)
			this.mypStartTop = this.mypTheScrollTop || 0
			this.mypLastPoint = this.mypStartPoint
			this.mypInTouchend = false
		},
		// 手指在屏幕上滑动
		// 注意：是手指位置的变化触发的。在scroll中，手指拖动scroll滚动，其实手指位置不变，scroll的滚动是不会触发touchmove的
		mypTouchmoveEvent(e) {
			if (!this.mypDown.use) return;
			if (!this.mypStartPoint) return;
			// 限制/节流，可以使用时间，也可以使用高度
			// 小于节流时间,则不处理
			const t = new Date().getTime();
			if (this.mypMoveTime && t - this.mypMoveTime < this.mypMoveTimeDiff) {
				return;
			} else {
				this.mypMoveTime = t
				this.mypMoveTimeDiff = 1000 / this.mypFps
			}
			const scrollTop = this.mypTheScrollTop
			const currentPoint = this.mypGetPoint(e)
			const moveY = currentPoint.y - this.mypStartPoint.y
			
			// (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
			// scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
			if (moveY > 0 && (scrollTop <= 0 || (scrollTop <= this.mypScrollTopDeviation && scrollTop === this.mypStartTop))) {
				// 是否可以下拉
				if (!this.mypInTouchend && !this.mypIsDownLoading && !this.mypIsUpLoading) {
					let diff = currentPoint.y - this.mypLastPoint.y;  // 和上次比,移动的距离 (大于0向下,小于0向上)
					
					// 下拉距离  < 指定距离
					if (this.mypDownHeight < this.mypDown.offset) {
						if (this.mypDownMoveType !== 1) {
							this.mypDownMoveType = 1;  // 加入标记,保证只执行一次
							this.mypDownInOffset()  // 进入指定距离范围内那一刻的回调,只执行一次
							this.mypIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
						}
						this.mypDownHeight += diff * this.mypDown.inRate;  // 越往下,高度变化越小
					
					// 下拉距离 >= 指定距离
					} else {
						if (this.mypDownMoveType !== 2) {
							this.mypDownMoveType = 2;  // 加入标记,保证只执行一次
							this.mypDownOutOffset();  // 下拉超过指定距离那一刻的回调,只执行一次
							this.mypIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
						}
						if (diff > 0) {  // 向下拉
							this.mypDownHeight += Math.round(diff * this.mypDown.outRate);  // 越往下,高度变化越小
						} else {  // 向上收
							this.mypDownHeight += diff;  // 向上收回高度,则向上滑多少收多少高度
						}
					}
					
					const rate = this.mypDownHeight / this.mypDown.offset; // 下拉区域当前高度与指定距离的比值
					this.mypOnDownMoving(rate, this.mypDownHeight)  // 下拉过程中的回调,一直在执行
				}
			}
			this.mypLastPoint = currentPoint
		},
		// 手指移开屏幕
		mypTouchendEvent(e) {
			// if (!this.down.use) return;
			// 如果下拉区域高度已改变,则需重置回来
			if (this.mypIsMoveDown) {
				if (this.mypDownHeight >= this.mypDown.offset) {
					// 符合触发刷新的条件
					this.mypTriggerDownScroll()
				} else {
					// 不符合的话 则重置
					this.mypDownHeight = 0;
					this.mypEndDownScroll()
				}
				this.mypDownMoveType = 0;
				this.mypIsMoveDown = false;
			}
		},
		// scrollview滚动事件
		mypScroll(e) {
			this.mypTheScrollTop = e.detail.scrollTop
			this.mypTheScrollHeight = e.detail.scrollHeight
			this.mypHandleParentScroll(e)
		},
		mypHandleParentScroll(e) {
			const scrollTop = e.detail.scrollTop
			// 缓冲8px
			if (scrollTop >= this.mypAllHeight - 8) {
				// #ifdef H5
				if (!this.mypParentScrollable) return;
				if (this.mypParentScrollTop === this.mypAllHeight) {
					this.mypParentScrollTop = this.mypAllHeight + 0.1
				} else {
					this.mypParentScrollTop = this.mypAllHeight
				}
				setTimeout(()=>{
					this.mypParentScrollable = false
					this.mypChildScrollable = true
				}, 0)
				return
				// #endif
				this.mypParentScrollable = false
				if (this.mypParentScrollTop === this.mypAllHeight) {
					this.mypParentScrollTop = this.mypAllHeight + 0.1
				} else {
					this.mypParentScrollTop = this.mypAllHeight
				}
				this.mypChildScrollable = true
			} else {
				this.mypParentScrollable = true
				this.mypChildScrollable = false
			}
		},
		// 进入下拉区域的那一刻
		mypDownInOffset() {
			this.mypParentScrollable = false
			this.mypIsDownReset = false
			this.mypIsDownLoading = false
		},
		// 超出下拉区域的那一刻
		mypDownOutOffset() {
			this.mypParentScrollable = false
			this.mypIsDownReset = false
			this.mypIsDownLoading = false
		},
		// 正在下拉的回调
		mypOnDownMoving(rate, downHeight) {
			
		},
		// 刷新
		mypTriggerDownScroll() {
			this.mypParentScrollable = true
			this.mypIsDownReset = true
			this.mypIsDownLoading = true
			this.mypDownHeight = this.mypDown.offset
			this.mypHandleRefresh()
		},
		mypEndDownScroll() {
			this.mypParentScrollable = true
			this.mypIsDownReset = true
			this.mypIsDownLoading = false
			this.mypDownHeight = 0
		},
		mypEndSuccess() {
			if (this.mypIsDownLoading) {
				this.mypEndDownScroll()
			}
		},
		// 下拉刷新/上提加载，失败之后使用
		mypEndError() {
			if (this.mypIsDownLoading) {
				this.mypEndDownScroll()
			}
		},
		mypGetPoint(e) {
			if (!e) {
				return {
					x: 0,
					y: 0
				}
			}
			if (e.touches && e.touches[0]) {
				return {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY
				}
			} else if (e.changedTouches && e.changedTouches[0]) {
				return {
					x: e.changedTouches[0].pageX,
					y: e.changedTouches[0].pageY
				}
			} else {
				return {
					x: e.clientX,
					y: e.clientY
				}
			}
		},
		// for child-back event
		mypChildTouchMove(downHeight) {
			// console.log("move", downHeight)
			let dh = downHeight
			if (downHeight >= this.mypAllHeight) {
				dh = this.mypAllHeight
			}
			if (downHeight <= 0) {
				dh = 0
			}
			// console.log(this.Scrollable, this.childScrollable)
			dh = this.mypAllHeight - dh
			// 限制10px移动距离，否则不动
			// 一次性全部打开
			if (downHeight > 10) {
				this.mypParentScrollable = true
				this.mypChildScrollable = false
				setTimeout(()=>{
					this.mypParentScrollTop = 0
				}, 0)
			}
		},
		mypChildTouchEnd(downHeight) {
			// console.log("end", downHeight)
		}
		// #endif
	},
	onLoad() {
		// #ifndef APP-NVUE
		const that = this
		uni.$on("swiperScrollRefreshSuc", ()=>{
			that.mypEndSuccess()
		})
		uni.$on("swiperScrollRefreshErr", ()=>{
			that.mypEndError()
		})
		// #endif
	},
	onUnload() {
		// #ifndef APP-NVUE
		uni.$off("swiperScrollRefreshSuc")
		uni.$off("swiperScrollRefreshErr")
		// #endif
	}
}

