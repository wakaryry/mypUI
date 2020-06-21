import systemMixin from './systemMixin.js'
import pxMixin from './pxMixin.js'

export default {
	mixins: [systemMixin, pxMixin],
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
				return app.globalData.windowHeight
			}
			this.mypInitSystemInfo()
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
		},
		mypGetHeight(val) {
			if (val === 'status') {
				return this.mypGetStatusBarHeight()
			}
			if (val === 'nav') {
				return this.mypGetNavHeight()
			}
			if (val === 'status-nav' || val === 'nav-status') {
				return this.mypGetStatusBarHeight() + this.mypGetNavHeight()
			}
			if (val === 'x') {
				return this.mypGetXBarHeight()
			}
			if (typeof val === 'string' && (val.startsWith('status') || val.startsWith('nav'))) {
				const arr = val.split('-')
				let h = 0
				for (const i in arr) {
					const t = arr[i]
					if (t === 'status') {
						h += this.mypGetStatusBarHeight()
					} else if (t === 'nav') {
						h += this.mypGetNavHeight()
					} else {
						h += this.mypToPx(t)
					}
				}
				return h
			}
			if (typeof val === 'string' && val.startsWith('x')) {
				const arr = val.split('-')
				let h = 0
				for (const i in arr) {
					const t = arr[i]
					if (t === 'x') {
						h += this.mypGetXBarHeight()
					} else {
						h += this.mypToPx(t)
					}
				}
				return h
			}
			return this.mypToPx(val)
		}
	}
}
