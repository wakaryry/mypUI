export default {
	methods: {
		toPage(val) {
			this.headVisible = false
		},
		toShowHead() {
			this.headVisible = true
		},
		toHideHead() {
			this.headVisible = false
		},
		toHanderLogin() {
			this.toShowLoginPop(true)
		},
		toError(err) {
			this.mypShowToast(err)
		},
		toDetail(val) {
		},
		toUser(val) {
		},
		toComment(val) {
			this.toDetail(val)
		},
		toShare(val) {
			this.toDetail(val)
		},
		toMoreComment(val) {
			this.toDetail(val)
		},
		toFootUser(e) {
			e && e.stopPropagation && e.stopPropagation()
		},
		toShareCircle(e) {
			e && e.stopPropagation && e.stopPropagation()
			// #ifdef MP
			this.mypShowToast({
				text: '点击右上角分享',
				mode: 'big',
				type: 'success',
				bgType: 'dark'
			})
			// #endif
		},
		toFootJoin() {
			
		},
		toPubAlbum() {
			
		}
	}
}
