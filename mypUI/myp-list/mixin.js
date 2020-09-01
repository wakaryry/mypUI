// 通过mescroll来的，当时mescroll是一个 new function对象
// 因为想灵活的控制高度以及方便快速调用，特意改成了mixin形式
export default {
	data() {
		return {
			// #ifdef APP-NVUE
			platform: '',
			// #endif
			// #ifndef APP-NVUE
			mypScrollable: true,
			mypDownHeight: 0,
			mypStartPoint: null,
			mypLastPoint: null,
			mypTheScrollHeight: 0,  // scroll content height
			mypTheScrollTop: 0,  // 记录滚动条的位置，并不是用来重置scrolltop
			mypStartTop: 0,  // 记录开始时滚动条的位置
			mypInTouchend: false,
			mypPreScrollY: 0,
			// 节流设置
			mypFps: 40,  // 1s内屏幕刷新的频数
			mypMoveTime: 0,
			mypMoveTimeDiff: 0,
			mypScrollTopDeviation: 100,  // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
			mypIsMoveDown: false,
			mypDownMoveType: 0,
			mypIsDownReset: false,  // 下拉刷新，是否显示重置的过渡动画
			// #endif
			mypIsDownLoading: false,  // 是否正在下拉刷新中
			mypIsUpLoading: false,  // 是否正在上提加载
			// down
			mypDown: {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,  // 下拉的距离小于offset时,改变下拉区域高度比例;0-1,越小,越难拉
				outRate: 0.2  // 下拉的距离大于offset时,改变下拉区域高度比例;0-1,越小,越难拉
			},
			// up
			mypUp: {
				use: true,
				offset: 80
			},
			mypHasMore: true,
			// u need to manage the page-state yourself, we do not manage the page-state for u
			mypCurrentPage: 0,  // start with 0. if > 0, it means data inited
			mypPrePage: 0
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
			} else if (this.mypTheScrollTop === this.mypStartTop) {  // 到顶/左/右/底的滑动事件
				const isScrollUp = this.mypGetPoint(e).y - this.mypStartPoint.y < 0;  // 和起点比,移动的距离,大于0向下拉,小于0向上拉
				// 上滑 && 检查并触发上拉
				isScrollUp && this.mypTriggerUpScroll();
			}
		},
		// scrollview滚动事件
		mypScroll(e) {
			this.$emit('scroll', e)
			this.mypTheScrollTop = e.detail.scrollTop
			this.mypTheScrollHeight = e.detail.scrollHeight
			
			// 向上滑还是向下滑动
			const isScrollUp = e.detail.scrollTop - this.mypPreScrollY > 0;
			this.mypPreScrollY = e.detail.scrollTop;
			
			// 上滑 && 检查并触发上拉
			isScrollUp && this.mypTriggerUpScroll();
		},
		// 进入下拉区域的那一刻
		mypDownInOffset() {
			this.mypScrollable = false
			this.mypIsDownReset = false
			this.mypIsDownLoading = false
		},
		// 超出下拉区域的那一刻
		mypDownOutOffset() {
			this.mypScrollable = false
			this.mypIsDownReset = false
			this.mypIsDownLoading = false
		},
		// 正在下拉的回调
		mypOnDownMoving(rate, downHeight) {
			
		},
		mypRefresh() {
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage = 1
			this.mypGetContentList('refresh')
		},
		mypLoad() {
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage += 1
			this.mypGetContentList('load')
		},
		mypReload() {
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage = 1
			this.mypGetContentList('load')
		},
		mypInitContentList() {
			this.mypPrePage = 0
			this.mypCurrentPage = 1
			this.mypGetContentList('refresh')
		},
		mypGetContentList(type='refresh') {
			if (type === 'refresh') {
				this.$emit('down')
			} else {
				this.$emit('up')
			}
		},
		// 刷新
		mypTriggerDownScroll() {
			this.mypScrollable = true
			this.mypIsDownReset = true
			this.mypIsDownLoading = true
			this.mypDownHeight = this.mypDown.offset
			this.mypRefresh()
		},
		mypEndDownScroll() {
			this.mypScrollable = true
			this.mypIsDownReset = true
			this.mypIsDownLoading = false
			this.mypDownHeight = 0
		},
		// 加载更多
		mypTriggerUpScroll() {
			if (this.mypIsDownLoading || this.mypIsUpLoading || !this.mypHasMore || !this.mypUp.use) return;
			let canUp = false
			// we should check if reached bottom
			if (this.mypGetScrollBottom() <= this.mypUp.offset) {  // 到底部
				canUp = true;  // 标记可上拉
			}
			if (!canUp) return;
			this.mypIsUpLoading = true
			this.mypLoad()
		},
		mypEndUpScroll() {
			this.mypIsUpLoading = false
		},
		mypEndSuccess(hasMore=true) {
			this.mypHasMore = hasMore
			if (this.mypIsDownLoading) {
				this.mypEndDownScroll()
			}
			if (this.mypIsUpLoading) {
				this.mypEndUpScroll()
			}
		},
		// 下拉刷新/上提加载，失败之后使用
		mypEndError() {
			// reback the current page
			this.mypCurrentPage = this.mypPrePage
			if (this.mypIsDownLoading) {
				this.mypEndDownScroll()
			}
			if (this.mypIsUpLoading) {
				this.mypEndUpScroll()
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
		mypGetScrollBottom() {
			// important!
			// if u want to use this mixin, u must supply a mypScrollHeight in your props or computed or data
			let contentHeight = this.mypScrollHeight
			if (this.mypTheScrollHeight > 0) {
				contentHeight = this.mypTheScrollHeight
			}
			return contentHeight - this.mypTheScrollTop - this.mypScrollHeight
		}
		// #endif
	}
}
