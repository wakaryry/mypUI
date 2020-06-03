import systemMixin from './systemMixin.js'

export default {
	mixins: [systemMixin],
	methods: {
		mypGetNavHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.navHeight) {
				return app.globalData.navHeight
			}
			app.globalData.navHeight = 44
			return app.globalData.navHeight
		},
		mypGetWindowHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.windowHeight) {
				console.log('zero:', app.globalData.windowHeight)
				return app.globalData.windowHeight
			}
			console.log('first:', app.globalData.windowHeight)
			this.mypInitSystemInfo()
			console.log('second:', app.globalData.windowHeight)
			return app.globalData.windowHeight
		},
		mypGetScreenHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.screenHeight) {
				return app.globalData.screenHeight
			}
			this.mypInitSystemInfo()
			return app.globalData.screenHeight
		},
		mypGetStatusBarHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.statusBarHeight) {
				return app.globalData.statusBarHeight
			}
			if (!app.globalData.platform || app.globalData.platform.length === 0) {
				this.mypInitSystemInfo()
			}
			return app.globalData.statusBarHeight
		},
		mypGetXBarHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.safeBottom) {
				return app.globalData.safeBottom
			}
			if (!app.globalData.platform || app.globalData.platform.length === 0) {
				this.mypInitSystemInfo()
			}
			return app.globalData.safeBottom
		}
	}
}
