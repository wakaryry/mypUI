export default {
	methods: {
		mypShowToast(info, interval=null, finish=null) {
			const toastIns = this.$refs['myp-toast']
			if (toastIns) {
				toastIns.showToast(info, interval, finish)
			} else {
				const that = this
				setTimeout(()=>{
					that.$refs['myp-toast'].showToast(info, interval, finish)
				}, 0)
			}
		}
	}
}
