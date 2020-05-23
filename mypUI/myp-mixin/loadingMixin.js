export default {
	data() {
		return {
			// we use mypLoading, so we can not use mypLoading as props in other vue file now
			mypLoading: false
		}
	},
	methods: {
		mypShowLoading() {
			this.mypLoading = true
		},
		mypHideLoading() {
			this.mypLoading = false
		}
	}
}
