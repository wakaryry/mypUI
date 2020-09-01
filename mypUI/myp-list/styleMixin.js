import xBarMixin from '../myp-mixin/xBarMixin.js'
import pxMixin from '../myp-mixin/pxMixin.js'

export default {
	mixins: [xBarMixin, pxMixin],
	props: {
		showScrollbar: {
			type: Boolean,
			default: true
		},
		includeStatus: {
			type: Boolean,
			default: false
		},
		includeNav: {
			type: Boolean,
			default: false
		},
		tabHeight: {
			type: Number,
			default: 0 // px
		},
		// 补充高度
		extra: {
			type: [Number, String],
			default: 0
		},
		// 设置了height，会直接使用height，忽略其它的计算
		height: {
			type: [Number, String],
			default: '0'
		},
		useFlex: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '750rpx'
		},
		// foot悬浮在scroll之上，滚动到底部时，foot可能遮挡住scroll的内容，我们给scroll加一个底部空白高度
		footToken: {
			type: String,
			default: '0px'  // 占位的高度
		},
		boxStyle: {
			type: String,
			default: ''
		},
		scrollStyle: {
			type: String,
			default: ''
		},
		bgType: {
			type: String,
			default: 'page'
		},
		hasFoot: {
			type: Boolean,
			default: false
		},
		// 我们通过footBottom来设置bottom的距离
		footBottom: {
			type: String,
			default: '0px'
		},
		footStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		mypScrollHeight() {
			if (this.useFlex) return 0;
			if (this.heightPx !== 0) {
				return this.heightPx
			}
			let _height = this.mypGetScreenHeight()
			if (_height === 0) {
				_height = this.mypGetScreenHeight()
			}
			if (!this.includeStatus) {
				_height = _height - this.mypGetStatusBarHeight()
			}
			if (!this.includeNav) {
				_height = _height - this.mypGetNavHeight()
			}
			if (!this.includeXBar) {
				_height = _height - this.mypGetXBarHeight()
			} else if (this.includeXBar && !this.overrideXBar) {
				_height = _height - this.mypGetXBarHeight()
			}
			_height = _height - this.tabHeight - this.extraPx
			if (_height <= 0) {
				return 0
			}
			return _height
		},
		heightPx() {
			return this.mypToPx(this.height)
		},
		widthPx() {
			return this.mypGetHeight(this.width)
		},
		mrScrollStyle() {
			if (this.useFlex) {
				return `width:${this.widthPx}px;`+this.scrollStyle
			}
			return `width:${this.widthPx}px;height:${this.mypScrollHeight}px;`+this.scrollStyle
		},
		extraPx() {
			return this.mypGetHeight(this.extra)
		},
		mrFootStyle() {
			let bt = this.mypToPx(this.footBottom)
			if (this.includeXBar&&this.hasFoot) {
				const xh = this.mypGetXBarHeight()
				bt = bt + xh
			}
			return this.footStyle + 'bottom:' + bt + 'px;'
		}
	}
}
