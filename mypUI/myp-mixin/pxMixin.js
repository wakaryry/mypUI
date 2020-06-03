export default {
	methods: {
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
