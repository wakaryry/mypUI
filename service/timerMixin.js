export default {
	data() {
		return {
			seconds: 0,
			timer: null
		}
	},
	methods: {
		makeTimer() {
			this.seconds = 60
			const that = this
			this.timer = setInterval(function() {
				if (that.seconds >= 1) {
					that.seconds = that.seconds - 1
				} else {
					that.seconds = 0
					clearInterval(that.timer)
					that.timer = null
				}
			}, 1000)
		}
	},
	onUnload() {
		this.timer && clearInterval(this.timer)
	}
}
