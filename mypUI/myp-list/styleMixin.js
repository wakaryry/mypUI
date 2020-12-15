import {getHeight} from '../utils/system.js'
// #ifndef APP-NVUE
import {getScreenHeight} from '../utils/system.js'
// #endif
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin("dom")
// #endif

export default {
	props: {
		/**
		 * 是否显示scrollbar
		 */
		showScrollbar: {
			type: Boolean,
			default: true
		},
		/**
		 * 背景主题
		 */
		bgType: {
			type: String,
			default: 'page'
		},
		/**
		 * 定位
		 */
		position: {
			type: String,
			default: 'static'
		},
		/**
		 * 定位的top
		 */
		top: {
			type: String,
			default: '0'
		},
		/**
		 * 定位的bottom
		 */
		bottom: {
			type: String,
			default: '0'
		},
		/**
		 * 外层样式
		 */
		boxStyle: {
			type: String,
			default: ''
		},
		// #ifndef APP-NVUE
		/**
		 * 需要从屏幕高度减去的高度
		 */
		extra: {
			type: String,
			default: 'status-nav'
		},
		/**
		 * 设置了height，会直接使用height，忽略其它的计算
		 */
		height: {
			type: String,
			default: '0'
		},
		// #endif
		/**
		 * 是否颠倒列表
		 */
		reverse: {
			type: Boolean,
			default: false
		}
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
	},
	data() {
		return {
			// #ifndef APP-NVUE
			mypCurrentView: null,
			mypScrollTop: 0
			// #endif
		}
	},
	methods: {
		mypScrollToBottom() {
			// #ifdef APP-NVUE
			const ref = this.$refs['myp-list-bottom']
			dom.scrollToElement(ref, {offset: 0, animated: true})
			// #endif
			// #ifndef APP-NVUE
			this.mypCurrentView = 'myp-list-bottom'
			// #endif
		},
		mypScrollToTop() {
			// #ifdef APP-NVUE
			const ref = this.$refs['myp-list-top']
			dom.scrollToElement(ref, {offset: 0, animated: true})
			// #endif
			// #ifndef APP-NVUE
			this.mypCurrentView = 'myp-list-top'
			// #endif
		},
		mypScrollToElement(ref, options={offset: 0, animated: true}) {
			// #ifdef APP-NVUE
			dom.scrollToElement(ref, options)
			// #endif
			// #ifndef APP-NVUE
			this.mypCurrentView = null
			if (this.mypScrollTop === ref) {
				this.mypScrollTop = ref + 0.1
			} else {
				this.mypScrollTop = ref
			}
			// #endif
		}
	}
}
