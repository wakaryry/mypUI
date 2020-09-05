import router from '@/router/router.js'

export default {
	data() {
		return {
			// judge if from-share and the shared-platform
			fromShare: null
		}
	},
	computed: {
		// u need to override it
		shareTitle() {
			return '我分享给你的一个好东西,打开看看吧'
		},
		// u need to override it
		sharePath() {
			return {
				page: '', // name in router
				params: ''
			}
		}
	},
	onLoad(options) {
		if (options.fromShare) {
			this.fromShare = options.fromShare
			// 因为navHelper里面也有对left的修改
			// 所以这个mixin要放在navHelper的后面
			this.leftIcons = [{icon:'home'}]
		}
	},
	onShareAppMessage() {
		let path = router[this.sharePath.page] || ''
		if (!path || path.length <= 5) {
			return
		}
		const params = this.sharePath.params
		if (params && params.length > 2) {
			path += '?' + params
		}
		return {
			title: this.shareTitle,
			path: path
		}
	},
	methods: {
		navLeftAction(i) {
			if (this.fromShare) {
				return
			}
			this.toNavBackOne()
		}
	}
}
