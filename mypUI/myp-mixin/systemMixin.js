export default {
	methods: {
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
		mypInitSystemInfo() {
			try{
				this._getSystemInfo()
			}catch(e){
				//TODO handle the exception
				this._getSystemInfo()
			}
		},
		_getSystemInfo() {
			const info = uni.getSystemInfoSync()
			const app = getApp({allowDefault: true})
			
			app.globalData.screenHeight = info.screenHeight
			app.globalData.windowHeight = info.windowHeight
			app.globalData.statusBarHeight = info.statusBarHeight || 0
			
			if (info.safeAreaInsets) {
				app.globalData.safeTop = info.safeAreaInsets.top
				app.globalData.safeBottom = info.safeAreaInsets.bottom
			} else {
				if (info.safeArea) {
					app.globalData.safeTop = info.safeArea.top
					app.globalData.safeBottom = info.screenHeight - info.safeArea.bottom
				} else {
					app.globalData.safeTop = 0
					app.globalData.safeBottom = 0
				}
			}
			if (app.globalData.safeTop > 0 && app.globalData.statusBarHeight===0) {
				app.globalData.statusBarHeight = app.globalData.safeTop
			}
			
			app.globalData.platform = info.platform
			app.globalData.brand = info.brand
			app.globalData.model = info.model
		}
	}
}
