export default {
	computed: {
		// u need to override it
		timelineTitle() {
			return '我家孩子在使用小学通学习，推荐朋友们也用起来'
		},
		// u need to override it
		timelineQuery() {
			return ''
		},
		timelineImage() {
			return ''
		}
	},
	onShareTimeline() {
		if (!this.timelineImage || this.timelineImage.length <= 0) {
			return {
				title: this.timelineTitle,
				query: this.timelineQuery
			}
		}
		return {
			title: this.timelineTitle,
			query: this.timelineQuery,
			imageUrl: this.timelineImage
		}
	}
}
