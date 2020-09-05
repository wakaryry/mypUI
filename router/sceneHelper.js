export default {
	data() {
		return {
			// judge if from scene, i.e from scaning qr-code
			fromScene: false
		}
	},
	onLoad(options) {
		if (options.scene) {
			this.fromScene = true
			// from scene: add to-home icon
			this.leftIcons = [{icon:'home'}]
		}
	},
	methods: {
		navLeftAction(i) {
			if (this.fromScene) {
				return
			}
			this.toNavBackOne()
		}
	}
}
