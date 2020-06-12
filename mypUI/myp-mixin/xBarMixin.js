import windowMixin from './windowMixin.js'

export default {
	mixins: [windowMixin],
	props: {
		// 是否需要考虑xBar，默认需要考虑
		// 是否包含了xBar的区域
		includeXBar: {
			type: Boolean,
			default: true
		},
		// xBar的处理了方式，false表示xBar有独立占位，true表示xBar被内容遮挡
		overrideXBar: {
			type: Boolean,
			default: true
		},
		xBarBgType: {
			type: String,
			default: ''
		},
		xBarStyle: {
			type: String,
			default: ''
		}
	},
	computed: {
		mypXBarStyle() {
			return this.mypXBarHeightStyle + this.xBarStyle
		},
		mypXBarHeightStyle() {
			const h = this.mypGetXBarHeight()
			return `height: ${h}px;`
		}
	}
}
