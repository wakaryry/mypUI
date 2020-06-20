export default {
	methods: {
		mypToPx(val) {
			if (typeof val === 'number') {
				return uni.upx2px(val)
			}
			const a = parseInt(val)
			if (val.indexOf('rpx') >= 0) {
				return uni.upx2px(a)
			}
			if (val.indexOf('upx') >= 0) {
				return uni.upx2px(a)
			}
			if (val.indexOf('px') >= 0) {
				return a
			}
			return uni.upx2px(a)
		}
	}
}
