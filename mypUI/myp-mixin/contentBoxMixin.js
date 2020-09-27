import {getScreenHeight, getHeight} from '../utils/system.js'

export default {
	data() {
		return {
			mypExtra: 'status-nav'
		}
	},
	computed: {
		mypContentHeight() {
			let _height = getScreenHeight()
			if (_height === 0) {
				// try again
				_height = getScreenHeight()
			}
			const extraPx = getHeight(this.mypExtra)
			_height = _height - extraPx
			if (_height <= 0) {
				return 0
			}
			return _height
		},
		mypContentHeightStyle() {
			return `height:${this.mypContentHeight}px;`
		}
	}
}
