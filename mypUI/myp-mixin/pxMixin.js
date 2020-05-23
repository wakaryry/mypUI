export default {
	methods: {
		//
		// 默认是rpx/upx
		// 使用：在computed里面对某个prop/data进行px化，为了正确监听到数据，我们可以这样：
		// heightPx() { const a = this.height; return this.mypToPx(this.height); }
		// 而不是直接使用：heightPx() { return this.mypToPx(this.height); }
		//
		mypToPx(val) {
			if (typeof val === 'number') {
				return uni.upx2px(val)
			}
			if (val.indexOf('rpx') >= 0) {
				return uni.upx2px(parseInt(val))
			}
			if (val.indexOf('upx') >= 0) {
				return uni.upx2px(parseInt(val))
			}
			if (val.indexOf('px') >= 0) {
				return parseInt(val)
			}
			return uni.upx2px(parseInt(val))
		}
	}
}
