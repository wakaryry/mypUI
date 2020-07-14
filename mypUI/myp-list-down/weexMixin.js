export default {
	data() {
		return {
			// down
			mypDown: {
			},
			mypHasMore: true,
			mypCurrentPage: 0,  // start with 0. if > 0, it means data inited
			mypPrePage: 0,
			mypIsDownLoading: false,
			platform: ''
		}
	},
	created() {
		// config the down/up
		this.mypDown = Object.assign(this.down)
		this.platform = this.mypGetPlatform()
		setTimeout(()=>{
			this.$emit("inited")
		}, 0)
		if (this.autoUpdate) {
			const that = this
			setTimeout(() => {
				// to refresh data
				this.mypInitContentList()
			}, 10)
		}
	},
	methods: {
		mypScroll(e) {
			this.$emit("scroll", e)
		},
		mypRefresh() {
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage += 1
			this.mypIsDownLoading = true
			this.mypGetContentList()
		},
		// ref method: call when refresh/load success
		mypEndSuccess(hasMore=false) {
			this.mypHasMore = hasMore
			this.$refs['myp-refresher'] && this.$refs['myp-refresher'].cancel()
			this.mypIsDownLoading = false
		},
		// ref method: call when refresh/load fail
		mypEndError() {
			this.mypCurrentPage = this.mypPrePage
			this.$refs['myp-refresher'] && this.$refs['myp-refresher'].cancel()
			this.mypIsDownLoading = false
		},
		mypInitContentList() {
			this.mypPrePage = 0
			this.mypCurrentPage = 1
			this.mypIsDownLoading = true
			this.mypGetContentList()
		},
		mypGetContentList() {
			this.$emit('down')
		}
	}
}
