import {getPx} from '../utils/system.js'

export default {
	props: {
		columnCount: {
			type: [String, Number],
			default: 'auto'
		},
		columnWidth: {
			type: String,
			default: 'auto'
		},
		columnGap: {
			type: String,
			default: '0'
		},
		leftGap: {
			type: String,
			default: '0'
		},
		rightGap: {
			type: String,
			default: '0'
		}
	},
	computed: {
		columnWidthPx() {
			if (this.columnWidth === 'auto') {
				return 'auto'
			}
			return getPx(this.columnWidth)
		},
		columnGapPx() {
			return getPx(this.columnGap)
		},
		leftGapPx() {
			return getPx(this.leftGap)
		},
		rightGapPx() {
			return getPx(this.rightGap)
		}
	}
}
