import {getHeight} from '../utils/system.js'
// #ifndef APP-NVUE
import {getScreenHeight} from '../utils/system.js'
// #endif

export default {
	props: {
		showScrollbar: {
			type: Boolean,
			default: true
		},
		bgType: {
			type: String,
			default: 'page'
		},
		position: {
			type: String,
			default: 'static'
		},
		top: {
			type: String,
			default: '0'
		},
		bottom: {
			type: String,
			default: '0'
		},
		boxStyle: {
			type: String,
			default: ''
		},
		// #ifndef APP-NVUE
		// 补充高度
		extra: {
			type: String,
			default: 'status-nav'
		},
		// 设置了height，会直接使用height，忽略其它的计算
		height: {
			type: String,
			default: '0'
		}
		// #endif
	},
	computed: {
		mrBoxStyle() {
			let _style = ''
			if (this.position != 'absolute' && this.position != 'fixed') {
				// #ifdef APP-NVUE
				return this.boxStyle
				// #endif
				// #ifndef APP-NVUE
				return `height:${this.mypScrollHeight}px;` + this.boxStyle
				// #endif
			}
			if (this.top != '-1') {
				_style += 'top:' + getHeight(this.top) + 'px;'
			}
			if (this.bottom != '-1') {
				_style += 'bottom:' + getHeight(this.bottom) + 'px;'
			}
			return _style + this.boxStyle
		},
		// #ifndef APP-NVUE
		mypScrollHeight() {
			if (this.position === 'absolute' || this.position === 'fixed') {
				let h = getScreenHeight()
				if (this.top != '-1') {
					h -= getHeight(this.top)
				}
				if (this.bottom != '-1') {
					h -= getHeight(this.bottom)
				}
				return h
			}
			const heightPx = getHeight(this.height)
			if (heightPx !== 0) {
				return heightPx
			}
			const extraPx = getHeight(this.extra)
			const screenH = getScreenHeight()
			return screenH - extraPx
		}
		// #endif
	}
}
