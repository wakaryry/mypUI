export default {
	methods: {
		mypShowToast(info, interval=null, finish=null, errorOptions=null) {
			const toastIns = this.$refs['myp-toast']
			if (toastIns) {
				toastIns.show(info, interval, finish, errorOptions)
			} else {
				const that = this
				setTimeout(()=>{
					that.$refs['myp-toast'].show(info, interval, finish, errorOptions)
				}, 0)
			}
		}
	}
}
