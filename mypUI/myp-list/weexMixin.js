export default {
	data() {
		return {
			// down
			mypDown: {
				use: true
			},
			// up
			mypUp: {
				use: true
			},
			mypHasMore: true,
			mypCurrentPage: 0,  // start with 0. if > 0, it means data inited
			mypPrePage: 0,
			mypIsDownLoading: false,
			mypIsUpLoading: false
		}
	},
	created() {
		// config the down/up
		this.mypDown = Object.assign(this.down)
		this.mypUp = Object.assign(this.up)
		// emit this 会在mp端报错，且不建议
		// this.$emit("inited", this)
		// 注意：如果直接emit，外部监听到inited的时候，还不能通过ref获取到实例
		// this.$emit("inited")
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
			this.mypCurrentPage = 1
			if (this.down.use) {
				this.mypIsDownLoading = true
			}
			this.mypGetContentList('refresh')
		},
		mypLoad() {
			if (!this.up.use) return;
			if (this.mypIsDownLoading) {
				this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
				return
			}
			if (this.mypIsUpLoading) {
				return
			}
			if (!this.mypHasMore) {
				this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
				return
			}
			this.mypPrePage = this.mypCurrentPage
			this.mypCurrentPage += 1
			
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
			}
			if (this.mypIsUpLoading) {
				this.$refs['myp-loader'] && this.$refs['myp-loader'].cancel()
				this.mypIsUpLoading = false
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
	}
}
