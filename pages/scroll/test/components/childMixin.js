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
			inited: false,
			currentPage: 0,
			hasMore: true,
			isDownLoading: false,
			isUpLoading: false,
			// #ifndef APP-NVUE
			startPoint: null,
			lastPoint: null,
			fps: 40,
			moveTime: 0,
			moveTimeDiff: 0,
			downHeight: 0,
			scrollTopDeviation: 100,
			theScrollTop: 0
			// #endif
		}
	},
	created() {
		const that = this
		if (this.index === 0 && this.current === 0 && !this.inited) {
			setTimeout(()=>{
				that.inited = true
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
			if (newV === this.index && !this.inited) {
				this.inited = true
				this.toRefresh()
			}
		}
	},
	methods: {
		toRefresh(ref, sucH,  failH) {
			// u must override it to do your refresh logic
		},
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
		// #ifndef APP-NVUE
		onTouchStart(e) {
			if (!this.scrollable) return;
			this.startPoint = this.getPoint(e)
			this.startTop = this.theScrollTop || 0
			this.lastPoint = this.startPoint
			this.inTouchend = false
		},
		onTouchMove(e) {
			if (!this.scrollable) return;
			if (!this.startPoint) return;
			const t = new Date().getTime();
			if (this.moveTime && t - this.moveTime < this.moveTimeDiff) {
				return;
			} else {
				this.moveTime = t
				this.moveTimeDiff = 1000 / this.fps
			}
			const scrollTop = this.theScrollTop
			const currentPoint = this.getPoint(e)
			const moveY = currentPoint.y - this.startPoint.y
			// console.log(scrollTop)
			// 往下拉
			if (moveY > 0 && !this.inTouchend && (scrollTop <= 0 || (scrollTop <= this.scrollTopDeviation && scrollTop === this.startTop))) {
				const diff = currentPoint.y - this.lastPoint.y
				this.downHeight += diff
				// console.log('hello')
				this.$emit("move", this.downHeight)
			}
			this.lastPoint = currentPoint
		},
		onTouchEnd(e) {
			if (!this.scrollable) return;
			const dh = this.downHeight
			this.inTouchend = true
			this.downHeight = 0 // clear
			this.$emit("end", dh)
		},
		onScroll(e) {
			// console.log('child scroll')
			this.theScrollTop = e.detail.scrollTop
		},
		getPoint(e) {
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
