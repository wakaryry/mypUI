import windowMixin from './windowMixin.js'
import pxMixin from './pxMixin.js'

export default {
	data() {
		return {
			mypIncludeStatus: false,
			mypIncludeNav: false,
			mypTabHeight: 0,
			mypIncludeXBar: true,
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
			if (!this.mypIncludeStatus) {
				_height = _height - this.mypGetStatusBarHeight()
			}
			if (!this.mypIncludeNav) {
				_height = _height - this.mypGetNavHeight()
			}
			if (!this.mypIncludeXBar) {
				_height = _height - this.mypGetXBarHeight()
			}
			_height = _height - this.mypTabHeight - this.mypExtraPx
			if (_height <= 0) {
				return 0
			}
			return _height
		},
		mypContentHeightStyle() {
			return `height:${this.mypContentHeight}px;`
		},
		mypExtraPx() {
			return this.mypToPx(this.mypExtra)
		}
	}
}
