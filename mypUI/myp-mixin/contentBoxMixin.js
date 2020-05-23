//
// 不只是用在scroll/list上面
// 因为我们去掉了最外层的scroll包裹层,我们在需要固定高度包裹的地方包裹
// 
// 用于计算contentBox的高度
//

import iPhoneXMixin from './iPhoneXMixin.js'
import windowMixin from './windowMixin.js'

export default {
	data() {
		return {
			mypHasStatus: true,
			mypNavHeight: 44,
			mypTabHeight: 0,
			// supportXBar为true,表示考虑xBar的情况; tabbar以及默认白色背景色的xBar不需要再做其它;
			// false表示不考虑xBar,内容铺满;
			mypSupportXBar: true,
			// number is rpx, string could be rpx or px: 80/80rpx/40px
			mypExtra: 0
		}
	},
	mixins: [iPhoneXMixin, windowMixin],
	computed: {
		// 计算属性,响应式的.而不是在created直接计算
		mypContentHeight() {
			let _height = this.mypGetScreenHeight()
			if (_height === 0) {
				// try again
				_height = this.mypGetScreenHeight()
			}
			if (this.mypHasStatus) {
				_height = _height - this.mypGetStatusBarHeight()
			}
			if (_height === 0) {
				return 0
			}
			const isIPhoneX = this.mypGetIsIPhoneX()
			const xBarHeight = isIPhoneX && this.mypSupportXBar ? 34 : 0  // 34px
			return _height - this.mypNavHeight - this.mypTabHeight - this.mypExtraPx - xBarHeight
		},
		mypContentHeightStyle() {
			return `height:${this.mypContentHeight}px;`
		},
		mypExtraPx() {
			if (typeof this.mypExtra === 'number') {
				return uni.upx2px(this.mypExtra)
			}
			if (this.mypExtra.indexOf('rpx') >= 0) {
				return uni.upx2px(parseInt(this.mypExtra))
			} else if (this.mypExtra.indexOf('px') >= 0) {
				return parseInt(this.mypExtra)
			} else {
				return uni.upx2px(parseInt(this.mypExtra))
			}
		}
	}
}
