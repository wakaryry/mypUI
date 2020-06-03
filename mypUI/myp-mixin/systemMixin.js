export default {
	methods: {
		mypGetPlatform() {
			const app = getApp({allowDefault: true})
			if (app.globalData.platform) {
				return app.globalData.platform
			}
			this.mypInitSystemInfo()
			return app.globalData.platform
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
