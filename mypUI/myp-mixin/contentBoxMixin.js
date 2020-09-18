import {getPx, getScreenHeight, getStatusBarHeight, getNavbarHeight, getXBarHeight} from '../utils/system.js'

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
	computed: {
		mypContentHeight() {
			let _height = getScreenHeight()
			if (_height === 0) {
				// try again
				_height = getScreenHeight()
			}
			if (!this.mypIncludeStatus) {
				_height = _height - getStatusBarHeight()
			}
			if (!this.mypIncludeNav) {
				_height = _height - getNavbarHeight()
			}
			if (!this.mypIncludeXBar) {
				_height = _height - getXBarHeight()
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
			return getPx(this.mypExtra)
		}
	}
}
