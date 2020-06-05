export default {
	data() {
		return {
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
			mypScrollTopDeviation: 100,  // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
			mypIsDownLoading: false,  // 是否正在下拉刷新中
			mypIsUpLoading: false,  // 是否正在上提加载
			mypHeader: {
				use: true,
				offset: 80,  // 下拉偏移量的某个临界值
				inRate: 0.8,
				outRate: 0.2
			},
			mypIsHeaderMoveDown: false,  // 记录最后一下touchmove中header是往上还是往下
			mypIsHeaderMoveUp: false,  // 记录最后一下touchmove中header是往上还是往下
			mypHeaderIsAutoMoving: false,  // 是否处于打开/关闭的滚动动画之中.也就是header并不是全关或者全开的情况
			// down
			mypDown: {
				use: true,
				offset: uni.upx2px(140),
				inRate: 0.8,  // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
				outRate: 0.2  // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
			},
			mypIsMoveDown: false,
			mypDownMoveType: 0,
			mypIsDownReset: false,  // 下拉刷新，是否显示重置的过渡动画
			// up
			mypUp: {
				use: true,
				offset: 80
			},
			mypHasMore: true,
			// u need to manage the page-state yourself, we do not manage the page-state for u
			mypCurrentPage: 0,  // start with 0. if > 0, it means data inited
			mypPrePage: 0,
			mypHeaderOpened: true,
			mypHoverVisible: false
		}
	},
	computed: {
		mypMoveTimeDiff() {
			return 1000 / this.mypFps
		},
		mypHeaderDownRate() {
			if (this.headerHeightPx === 0) return 0;
			return this.mypMrDownHeight / this.headerHeightPx
		},
		mypCouldUnLash() {
			return this.mypDownHeight >= (this.mypDown.offset || 80)
		},
		mypDownRate() {
			return this.mypDownHeight / (this.mypDown.offset || 80)
		},
		mypMrDownHeight() {
			if (this.mypHeader.use) {
				if (this.mypHeaderOpened) {
					return this.headerHeightPx + this.mypDownHeight
				}
			}
			return this.mypDownHeight
		}
	},
	methods: {
		// 每一次touchstart都要保证header要么全开，要么全关，其它情况无效
		// 手指开始触摸屏幕
		mypTouchstartEvent(e) {
			// if (!this.down.use) return;
			this.mypStartPoint = this.mypGetPoint(e)
			this.mypStartTop = this.mypTheScrollTop || 0
			this.mypLastPoint = this.mypStartPoint
			this.mypInTouchend = false
		},
		// TODO: 整理
		// 手指在屏幕上滑动
		// 注意：是手指位置的变化触发的。在scroll中，手指拖动scroll滚动，其实手指位置不变，scroll的滚动是不会触发touchmove的
		mypTouchmoveEvent(e) {
			// if (!this.mypDown.use) return; // 因为不使用刷新也需要打开/关闭header
			if (!this.mypStartPoint) return;
			// 限制/节流，可以使用时间，也可以使用高度
			// 小于节流时间,则不处理
			const t = new Date().getTime();
			if (this.mypMoveTime && t - this.mypMoveTime < this.mypMoveTimeDiff) {
				return;
			} else {
				this.mypMoveTime = t
			}
			const scrollTop = this.mypTheScrollTop
			const currentPoint = this.mypGetPoint(e)
			// 整体手指触摸过程中的移动距离
			const moveY = currentPoint.y - this.mypStartPoint.y
			const diff = currentPoint.y - this.mypLastPoint.y;  // 和上次比,移动的距离 (大于0向下,小于0向上)
			
			// (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
			// scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
			if (moveY > 0 && (scrollTop <= 0 || (scrollTop <= this.mypScrollTopDeviation && scrollTop === this.mypStartTop))) {
				// 是否可以下拉
				if (!this.mypInTouchend && !this.mypIsDownLoading && !this.mypIsUpLoading) {
					// 头部存在的情况
					if (this.mypHeader.use) {
						// 头部打开的情况下
						if (this.mypHeaderOpened) {
							// 打开时，往下拉，考虑下拉刷新
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
						} else {
							// 头部关闭的情况下
							// 关闭时，往下拉，考虑打开头部
							// 下拉距离  < 指定距离
							if (this.mypDownHeight < this.mypHeader.offset) {
								if (diff >= 0) {
									this.mypIsHeaderMoveDown = true
									this.mypIsHeaderMoveUp = false
								} else {
									this.mypIsHeaderMoveUp = true
									this.mypIsHeaderMoveDown = false
								}
								this.mypDownHeight += diff * this.mypHeader.inRate;  // 越往下,高度变化越小
							// 下拉距离 >= 指定距离
							} else {
								const refreshDown = this.mypDownHeight - this.mypHeader.offset
								// 考虑刷新的情况
								// 下拉距离  < 指定距离
								if (refreshDown < this.mypDown.offset) {
									if (this.mypDownMoveType !== 1) {
										this.mypDownMoveType = 1;  // 加入标记,保证只执行一次
										this.mypDownInOffset()  // 进入指定距离范围内那一刻的回调,只执行一次
										this.mypIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
									}
								// 下拉距离 >= 指定距离
								} else {
									if (this.mypDownMoveType !== 2) {
										this.mypDownMoveType = 2;  // 加入标记,保证只执行一次
										this.mypDownOutOffset();  // 下拉超过指定距离那一刻的回调,只执行一次
										this.mypIsMoveDown = true;  // 标记下拉区域高度改变,在touchend重置回来
									}
								}
								const rate = refreshDown / this.mypDown.offset; // 下拉区域当前高度与指定距离的比值
								this.mypOnDownMoving(rate, refreshDown)  // 下拉过程中的回调,一直在执行
								if (diff > 0) {  // 向下拉
									this.mypDownHeight += Math.round(diff * this.mypHeader.outRate);  // 越往下,高度变化越小
								} else {  // 向上收
									this.mypDownHeight += diff;  // 向上收回高度,则向上滑多少收多少高度
								}
							}
							if (diff >= 0) {
								this.mypIsHeaderMoveDown = true
								this.mypIsHeaderMoveUp = false
							} else {
								this.mypIsHeaderMoveUp = true
								this.mypIsHeaderMoveDown = false
							}
						}
					// 没有头部的情况
					} else {
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
			}
			// 往上移
			// 刷新的不用考虑往上移
			// 只需要考虑header往上移的情况
			if (moveY < 0) {
				if (this.mypHeader.use) {
					if (this.mypHeaderOpened) {
						// 打开时，考虑往上移动的关闭
						// 下拉距离  < 指定距离
						if (Math.abs(this.mypDownHeight) < this.mypHeader.offset) {
							if (diff > 0) {
								this.mypDownHeight += diff * this.mypHeader.inRate;  // 越往下,高度变化越小
							} else {
								this.mypDownHeight += diff;  // 向上收回高度,则向上滑多少收多少高度
							}
						// 下拉距离 >= 指定距离
						} else {
							if (diff > 0) {  // 向下拉
								this.mypDownHeight += Math.round(diff * this.mypHeader.outRate);  // 越往下,高度变化越小
							} else {  // 向上收
								this.mypDownHeight += diff;  // 向上收回高度,则向上滑多少收多少高度
							}
						}
						if (diff >= 0) {
							this.mypIsHeaderMoveDown = true
							this.mypIsHeaderMoveUp = false
						} else {
							this.mypIsHeaderMoveUp = true
							this.mypIsHeaderMoveDown = false
						}
						// const rate = this.mypDownHeight / this.mypDown.offset; // 下拉区域当前高度与指定距离的比值
						// this.mypOnDownMoving(rate, this.mypDownHeight)  // 下拉过程中的回调,一直在执行
					}
				}
			}
			this.mypLastPoint = currentPoint
		},
		// 手指移开屏幕
		mypTouchendEvent(e) {
			// 存在头部的时候
			if (this.mypHeader.use) {
				// 先考虑刷新，再考虑是否只是打开/关闭头部
				if (this.mypHeaderOpened) {
					// 如果刷新组件有出现过
					if (this.mypIsMoveDown) {
						// 符合刷新要求
						if (this.mypDownHeight >= this.mypDown.offset) {
							this.mypTriggerDownScroll()
						// 不符合刷新要求
						} else {
							// 不符合刷新要求，打开/关闭头部
							this.mypToggleHeader()
						}
						this.mypDownMoveType = 0;
						this.mypIsMoveDown = false;
					// 刷新组件没有位置变化
					} else {
						this.mypToggleHeader()
					}
				// 头部关闭的情况下
				} else {
					// 如果刷新组件有出现过
					if (this.mypIsMoveDown) {
						if (this.mypDownHeight >= this.headerHeightPx + this.mypDown.offset) {
							console.log('open and refresh')
							this.mypTriggerDownScroll()
						} else {
							this.mypToggleHeader()
						}
						this.mypDownMoveType = 0;
						this.mypIsMoveDown = false;
					} else {
						this.mypToggleHeader()
						// 考虑上提加载
						if (this.mypTheScrollTop === this.mypStartTop) {  // 到顶/左/右/底的滑动事件
							console.log('load more')
							const isScrollUp = this.mypGetPoint(e).y - this.mypStartPoint.y < 0;  // 和起点比,移动的距离,大于0向下拉,小于0向上拉
							console.log('hello', isScrollUp)
							// 上滑 && 检查并触发上拉
							isScrollUp && this.mypTriggerUpScroll();
						}
					}
				}
			// 没有头部的时候
			} else {
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
			}
		},
		mypToggleHeader() {
			const offset = Math.abs(this.mypDownHeight)
			// 满足关闭/打开的边界条件
			if (offset >= this.mypHeader.offset) {
				this.mypToggleHeaderByDirection()
			} else {
				this.mypToggleHeaderByHeight()
			}
		},
		mypToggleHeaderByDirection() {
			if (this.mypIsHeaderMoveDown) {
				console.log('offset down')
				this.mypOpenHeader()
			} else if (this.mypIsHeaderMoveUp) {
				console.log('offset up')
				this.mypCloseHeader()
			} else {
				this.mypToggleHeaderByHeight()
			}
		},
		mypToggleHeaderByHeight() {
			// 根据最终剩余的高度来判断打开/关闭
			if (this.mypMrDownHeight >= this.mypHeader.offset) {
				console.log('distance down')
				this.mypOpenHeader()
			} else {
				console.log('distance up')
				this.mypCloseHeader()
			}
		},
		mypOpenHeader() {
			this.mypIsDownReset = true
			this.mypIsHeaderMoveDown = false
			this.mypIsHeaderMoveUp = false
			// reset
			this.mypHeaderOpened = true
			this.mypDownHeight = 0
			this.mypScrollable = false
		},
		mypCloseHeader() {
			this.mypIsDownReset = true
			this.mypIsHeaderMoveDown = false
			this.mypIsHeaderMoveUp = false
			// 重置。 解决滚动后，再次刷新，再次关闭header后不能触发加载更多的问题
			this.mypTheScrollHeight = 0
			// reset
			this.mypHeaderOpened = false
			this.mypDownHeight = 0
			this.mypScrollable = true
		},
		// scrollview滚动事件
		mypScroll(e) {
			this.$emit('scroll', e)
			this.mypTheScrollTop = e.detail.scrollTop
			this.mypTheScrollHeight = e.detail.scrollHeight
			
			this.mypToggleHover(e)
			
			// 向上滑还是向下滑动
			const isScrollUp = e.detail.scrollTop - this.mypPreScrollY > 0;
			this.mypPreScrollY = e.detail.scrollTop;
			
			// 上滑 && 检查并触发上拉
			isScrollUp && this.mypTriggerUpScroll();
		},
		mypToggleHover(e) {
			if (this.hasHover) {
				if (e.detail.scrollTop >= this.hoverScrollTopPx + this.hoverHeightPx) {
					// show hover
					if (!this.mypHoverVisible) {
						this.noWeexHoverAni = `height:${this.hoverHeightPx}px;`
						this.mypHoverVisible = true
					}
				} else {
					// hide hover
					if (this.mypHoverVisible) {
						this.noWeexHoverAni = 'height: 0px;'
						this.mypHoverVisible = false
					}
				}
			}
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
		// 刷新
		mypTriggerDownScroll() {
			if (this.mypHeader.use) {
				this.mypScrollable = false
				this.mypHeaderOpened = true
			} else {
				this.mypScrollable = true
			}
			this.mypIsDownReset = true
			this.mypIsDownLoading = true
			this.mypDownHeight = this.mypDown.offset
			this.mypRefresh()
		},
		mypRefresh() {
			// refresh/downScroll callback. here to refresh data...
			// you need to override this method
		},
		mypEndDownScroll() {
			if (this.mypHeader.use) {
				this.mypScrollable = false
				this.mypHeaderOpened = true
			} else {
				this.mypScrollable = true
			}
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
		mypLoad() {
			// loadmore/upScroll callback. here to load more data
			// you need to override this method
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
	}
}
