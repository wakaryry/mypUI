export default {
	props: {
		// #ifdef APP-NVUE
		parentId: {
		    type: String,
		    default: ''
		},
		// #endif
		// #ifndef APP-NVUE
		scrollable: {
			type: Boolean,
			default: false
		},
		// #endif
		current: {
			type: Number,
			default: 0
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			mypInited: false,
			mypCurrentPage: 0,
			mypHasMore: true,
			mypIsDownLoading: false,
			mypIsUpLoading: false,
			// #ifndef APP-NVUE
			mypStartPoint: null,
			mypLastPoint: null,
			mypFps: 40,
			mypMoveTime: 0,
			mypMoveTimeDiff: 0,
			mypDownHeight: 0,
			mypScrollTopDeviation: 100,
			mypTheScrollTop: 0
			// #endif
		}
	},
	created() {
		const that = this
		if (this.index === 0 && this.current === 0 && !this.mypInited) {
			setTimeout(()=>{
				that.mypInited = true
				that.toRefresh()
			}, 30)
		}
		// 非app端swiper里面ref获取不到，采用互相通信
		// #ifndef APP-NVUE
		uni.$on("swiperScrollRefresh", ()=>{
			that.toRefresh()
		})
		// #endif
	},
	destroyed() {
		uni.$off("swiperScrollRefresh")
	},
	watch: {
		current(newV) {
			if (newV === this.index && !this.mypInited) {
				this.mypInited = true
				this.toRefresh()
			}
		}
	},
	methods: {
		// #ifdef APP-NVUE
		setScrollRef(height) {
		    if (this.$refs['myp-list'].setSpecialEffects) {
		        this.$refs['myp-list'].setSpecialEffects({
		            id: this.parentId,
		            headerHeight: height
		        })
		    }
		},
		// #endif
		toRefresh(ref, sucH,  failH) {
			// u must override it to do your refresh logic
		},
		mypStart(val) {
			// 加载数据之前的前置设置
			let cp = 1
			if (val === 'refresh') {
				cp = 1
			} else {
				cp = this.mypCurrentPage + 1
			}
			if (cp > 1 && !this.mypHasMore) {
				this.mypIsUpLoading = false
				return false
			}
			if (cp === 1) {
				this.mypIsDownLoading = true
			} else {
				this.mypIsUpLoading = true
			}
			return cp
		},
		mypEndSuccess(cp, hasMore, ref, sucH) {
			// 数据加载成功
			this.mypCurrentPage = cp
			this.mypHasMore = hasMore || false
			if (cp === 1) {
				ref && sucH && sucH(ref)
				// #ifndef APP-NVUE
				uni.$emit("swiperScrollRefreshSuc")
				// #endif
				this.mypIsDownLoading = false
			} else {
				this.mypIsUpLoading = false
			}
		},
		mypEndError(cp, ref, failH) {
			// 数据加载失败
			if (cp === 1) {
				ref && failH && failH(ref)
				// #ifndef APP-NVUE
				uni.$emit("swiperScrollRefreshErr")
				// #endif
				this.mypIsDownLoading = false
			} else {
				this.mypIsUpLoading = false
			}
		},
		// #ifndef APP-NVUE
		mypOnTouchStart(e) {
			if (!this.scrollable) return;
			this.mypStartPoint = this.mypGetPoint(e)
			this.mypStartTop = this.mypTheScrollTop || 0
			this.mypLastPoint = this.mypStartPoint
			this.mypInTouchend = false
		},
		mypOnTouchMove(e) {
			if (!this.scrollable) return;
			if (!this.mypStartPoint) return;
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
			// console.log(scrollTop)
			// 往下拉
			if (moveY > 0 && !this.mypInTouchend && (scrollTop <= 0 || (scrollTop <= this.mypScrollTopDeviation && scrollTop === this.mypStartTop))) {
				const diff = currentPoint.y - this.mypLastPoint.y
				this.mypDownHeight += diff
				// console.log('hello')
				this.$emit("move", this.mypDownHeight)
			}
			this.mypLastPoint = currentPoint
		},
		mypOnTouchEnd(e) {
			if (!this.scrollable) return;
			const dh = this.mypDownHeight
			this.mypInTouchend = true
			this.mypDownHeight = 0 // clear
			this.$emit("end", dh)
		},
		mypOnScroll(e) {
			// console.log('child scroll')
			this.mypTheScrollTop = e.detail.scrollTop
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
		}
		// #endif
	}
}
