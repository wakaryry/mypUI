import {getHeight} from '../utils/system.js'

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
		}
	},
	computed: {
		mrBoxStyle() {
			let _style = ''
			if (this.position != 'absolute' || this.position != 'fixed') {
				return this.boxStyle
			}
			if (this.top != '-1') {
				_style += 'top:' + getHeight(this.top) + 'px;'
			}
			if (this.bottom != '-1') {
				_style += 'bottom:' + getHeight(this.bottom) + 'px;'
			}
			return _style + this.boxStyle
		}
	}
}
