import windowMixin from './windowMixin.js'
import pxMixin from './pxMixin.js'

export default {
	data() {
		return {
			mypHasStatus: true,
			mypNavHeight: 44,
			mypTabHeight: 0,
			mypSupportXBar: true,
			mypExtra: '0px'
		}
	},
	mixins: [windowMixin, pxMixin],
	computed: {
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
			const xBarHeight = this.mypSupportXBar ? this.mypGetXBarHeight() : 0
			return _height - this.mypNavHeight - this.mypTabHeight - this.mypExtraPx - xBarHeight
		},
		mypContentHeightStyle() {
			return `height:${this.mypContentHeight}px;`
		},
		mypExtraPx() {
			return this.mypToPx(this.mypExtra)
		}
	}
}
