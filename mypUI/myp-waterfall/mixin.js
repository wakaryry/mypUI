export default {
	props: {
		columnCount: {
			type: [String, Number],
			default: 'auto'
		},
		columnWidth: {
			type: [String, Number],
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
			return this.mypToPx(this.columnWidth)
		},
		columnGapPx() {
			return this.mypToPx(this.columnGap)
		},
		leftGapPx() {
			return this.mypToPx(this.leftGap)
		},
		rightGapPx() {
			return this.mypToPx(this.rightGap)
		}
	}
}
