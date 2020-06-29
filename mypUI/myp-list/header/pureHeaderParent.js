export default {
	data() {
		return {
			// #ifdef APP-NVUE
			mypListId: 'head_swiper_list',
			// #endif
			mypHeaderHeight: uni.upx2px(168), // 不包含tabs
			mypTabsHeight: uni.upx2px(80), // 30 + 50
			mypAllHeight: uni.upx2px(248),
			// #ifndef APP-NVUE
			mypChildScrollable: false,
			mypParentScrollable: true,
			mypParentScrollTop: 0
			// #endif
		}
	},
	methods: {
		// #ifdef APP-NVUE
		mypSetScrollRef(ref) {
			ref && ref.setScrollRef(this.mypAllHeight)
		},
		// #endif
		mypHandleParentScroll(e) {
			// #ifndef APP-NVUE
			const scrollTop = e.detail.scrollTop
			if (scrollTop >= this.mypAllHeight - 8) {
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
			// #endif
		},
		// #ifndef APP-NVUE
		mypChildTouchMove(downHeight) {
			// console.log("move", downHeight)
			let dh = downHeight
			if (downHeight >= this.mypAllHeight) {
				dh = this.mypAllHeight
			}
			if (downHeight <= 0) {
				dh = 0
			}
			// console.log(this.parentScrollable, this.childScrollable)
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
	}
}
