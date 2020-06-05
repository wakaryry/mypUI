import xBarMixin from '../myp-mixin/xBarMixin.js'
import pxMixin from '../myp-mixin/pxMixin.js'

export default {
	mixins: [xBarMixin, pxMixin],
	props: {
		hasStatus: {
			type: Boolean,
			default: true
		},
		tabHeight: {
			type: Number,
			default: 0 // px
		},
		navHeight: {
			type: Number,
			default: 44 // px
		},
		supportXBar: {
			type: Boolean,
			default: true
		},
		extra: {
			type: [Number, String],
			default: 0
		},
		// 设置了height，会直接使用height，忽略其它的计算
		height: {
			type: [Number, String],
			default: '0'
		},
		width: {
			type: String,
			default: '750rpx'
		},
		// foot悬浮在scroll之上，滚动到底部时，foot可能遮挡住scroll的内容，我们给scroll加一个底部空白高度
		// 会自动加上xBar的高度
		footToken: {
			type: String,
			default: '0px'  // 占位的高度
		},
		// foot对于xBar的处理：不根据scroll的supportXBar处理，因为可能scroll不考虑xBar，但是foot依然考虑
		footSupportXBar: {
			type: Boolean,
			default: true
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
		footStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		mypScrollHeight() {
			if (this.heightPx !== 0) {
				return this.heightPx
			}
			let _height = this.mypGetScreenHeight()
			if (_height === 0) {
				_height = this.mypGetScreenHeight()
			}
			if (this.hasStatus) {
				_height = _height - this.mypGetStatusBarHeight()
			}
			if (_height === 0) {
				return 0
			}
			const xBarHeight = this.supportXBar ? this.mypGetXBarHeight() : 0
			return _height - this.navHeight - this.tabHeight - this.extraPx - xBarHeight
		},
		heightPx() {
			return this.mypToPx(this.height)
		},
		mrScrollStyle() {
			return `width:${this.width};height:${this.mypScrollHeight}px;`+this.scrollStyle
		},
		extraPx() {
			return this.mypToPx(this.extra)
		}
	}
}
