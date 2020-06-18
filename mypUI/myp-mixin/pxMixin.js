export default {
	methods: {
		mypToPx(val) {
			const a = parseInt(val)
			const isNeg = (a < 0)
			if (typeof val === 'number') {
				return uni.upx2px(val) * (isNeg ? -1 : 1)
			}
			if (val.indexOf('rpx') >= 0) {
				return uni.upx2px(a) * (isNeg ? -1 : 1)
			}
			if (val.indexOf('upx') >= 0) {
				return uni.upx2px(a) * (isNeg ? -1 : 1)
			}
			if (val.indexOf('px') >= 0) {
				return a * (isNeg ? -1 : 1)
			}
			return uni.upx2px(a) * (isNeg ? -1 : 1)
		}
	}
}
