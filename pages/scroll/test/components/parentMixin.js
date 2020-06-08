export default {
	data() {
		return {
			pageId: 'circle_home',
			headerHeight: uni.upx2px(168), // 不包含tabs
			tabsHeight: uni.upx2px(80), // 30 + 50
			allHeight: uni.upx2px(248),
			childScrollable: false,
			parentScrollable: true,
			parentScrollTop: 0
		}
	},
	methods: {
		mypHandleRefresh(ref) {
			// #ifdef APP-NVUE
			const refresher = this.$refs['myp-refresher']
			ref &&ref.refresh(refresher, (val) => {
				val && val.cancel()
			}, (val) => {
				val && val.cancel()
			})
			// #endif
		},
		mypHandleParentScroll() {
			// #ifdef APP-NVUE
			const offsetY = e.contentOffset.y
			// console.log(offsetY)
			let pg = -offsetY / this.allHeight
			if (pg >= 1) {
				this.titleVisible = false
			} else {
				this.titleVisible = true
			}
			// #endif
			// #ifndef APP-NVUE
			const scrollTop = e.detail.scrollTop
			let spg = scrollTop / this.allHeight
			if (spg >= 1) {
				this.titleVisible = false
			} else {
				this.titleVisible = true
			}
			if (scrollTop >= this.allHeight) {
				this.parentScrollable = false
				if (this.parentScrollTop === this.allHeight) {
					this.parentScrollTop = this.allHeight + 0.1
				} else {
					this.parentScrollTop = this.allHeight
				}
				this.childScrollable = true
			} else {
				this.parentScrollable = true
				this.childScrollable = false
			}
			// #endif
		},
		// #ifdef APP-NVUE
		mypSetScrollRef(ref) {
			ref && ref.setScrollRef(this.allHeight)
		},
		// #endif
		// #ifndef APP-NVUE
		mypChildTouchMove(downHeight) {
			// console.log("move", downHeight)
			let dh = downHeight
			if (downHeight >= this.allHeight) {
				dh = this.allHeight
			}
			if (downHeight <= 0) {
				dh = 0
			}
			// console.log(this.parentScrollable, this.childScrollable)
			dh = this.allHeight - dh
			// 限制10px移动距离，否则不动
			// 一次性全部打开
			if (downHeight > 10) {
				this.parentScrollable = true
				this.childScrollable = false
				setTimeout(()=>{
					this.parentScrollTop = 0
				}, 0)
			}
		},
		mypChildTouchEnd(downHeight) {
			// console.log("end", downHeight)
		},
		// #endif
	}
}
