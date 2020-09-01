export default {
	methods: {
		// #ifdef APP-NVUE
		mypResetLoadMore() {
			this.$refs['myp-scroller'].resetLoadmore()
		},
		mypScroll(e) {
			this.$emit("scroll", e)
		},
		mypMoreLoad() {
			if (!this.mypUp.use) {
				return
			}
			if (this.useLoading) {
				return
			}
			this.mypLoad()
		},
		mypRefresh() {
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage = 1
			if (this.down.use) {
				this.mypIsDownLoading = true
			}
			this.mypGetContentList('refresh')
		},
		mypLoad() {
			if (!this.up.use) return;
			if (this.mypIsDownLoading) {
				if (this.platform === 'ios') {
					this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['myp-loader'] && that.$refs['myp-loader'].cancel()
				}, 0)
				return
			}
			if (this.mypIsUpLoading) {
				return
			}
			if (!this.mypHasMore) {
				if (this.platform === 'ios') {
					this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['myp-loader'] && that.$refs['myp-loader'].cancel()
				}, 0)
				return
			}
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage += 1
			
			if (this.up.use) {
				this.mypIsUpLoading = true
			}
			this.mypGetContentList('load')
		},
		mypReload() {
			if (!this.up.use) return;
			if (this.mypIsDownLoading) {
				if (this.platform === 'ios') {
					this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
					return
				}
				const that = this
				setTimeout(()=>{
					that.$refs['myp-loader'] && that.$refs['myp-loader'].cancel()
				}, 0)
				return
			}
			if (this.mypIsUpLoading) {
				return
			}
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage = 1
			
			if (this.up.use) {
				this.mypIsUpLoading = true
			}
			this.mypGetContentList('load')
		},
		// default has no more
		// ref method: call when refresh/load success
		mypEndSuccess(hasMore=false) {
			this.mypHasMore = hasMore
			if (this.mypIsDownLoading) {
				this.$refs['myp-refresher'] && this.$refs['myp-refresher'].cancel()
				this.mypIsDownLoading = false
				// 重置 loadMore 
				this.mypResetLoadMore()
			}
			if (this.mypIsUpLoading) {
				this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
				this.mypIsUpLoading = false
				// 重置 loadMore
				// this.mypResetLoadMore()
			}
		},
		// ref method: call when refresh/load fail
		mypEndError() {
			this.mypCurrentPage = this.mypPrePage
			if (this.mypIsDownLoading) {
				this.$refs['myp-refresher'] && this.$refs['myp-refresher'].cancel()
				this.mypIsDownLoading = false
			}
			if (this.mypIsUpLoading) {
				this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
				this.mypIsUpLoading = false
			}
		},
		mypInitContentList() {
			this.mypPrePage = 0
			this.mypCurrentPage = 1
			if (this.down.use) {
				this.mypIsDownLoading = true
			}
			this.mypGetContentList('refresh')
		},
		mypGetContentList(type='refresh') {
			if (type === 'refresh') {
				this.$emit('down')
			} else {
				this.$emit('up')
			}
		}
		// #endif
	}
}
