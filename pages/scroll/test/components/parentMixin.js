export default {
	data() {
		return {
			mypPageId: 'circle_home',
			mypHeaderHeight: uni.upx2px(168), // 不包含tabs
			mypTabsHeight: uni.upx2px(80), // 30 + 50
			mypAllHeight: uni.upx2px(248)
		}
	},
	methods: {
		mypHandleRefresh(ref) {
			const refresher = this.$refs['myp-refresher']
			ref &&ref.toRefresh(refresher, (val) => {
				val && val.cancel()
			}, (val) => {
				val && val.cancel()
			})
		},
		mypHandleParentScroll(e) {
		},
		mypSetScrollRef(ref) {
			ref && ref.setScrollRef(this.mypAllHeight)
		}
	}
}
