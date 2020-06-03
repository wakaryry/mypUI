import windowMixin from './windowMixin.js'

export default {
	mixins: [windowMixin],
	props: {
		supportXBar: {
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
			const h = this.mypGetXBarHeight()
			return `height: ${h}px;` + this.xBarStyle
		}
	}
}
