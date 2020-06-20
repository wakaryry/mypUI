export default {
	methods: {
		mypShowLoading(info) {
			const loadingIns = this.$refs['myp-loading']
			if (loadingIns) {
				loadingIns.show(info)
			} else {
				const that = this
				setTimeout(()=>{
					that.$refs['myp-loading'].show(info)
				}, 0)
			}
		},
		mypHideLoading() {
			const loadingIns = this.$refs['myp-loading']
			loadingIns && loadingIns.hide()
		}
	}
}
