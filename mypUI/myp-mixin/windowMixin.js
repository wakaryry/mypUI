export default {
	methods: {
		mypGetWindowHeight() {
			const app = getApp({allowDefault: true})
			let _height = 0
			// we could cache system info into globalData, then minus the call of uni.getSystemInfo
			if (app.globalData.windowHeight) {
				_height = app.globalData.windowHeight
			} else {
				try{
					const info = uni.getSystemInfoSync()
					_height = info.windowHeight
					// cache into globalData
					app.globalData.windowHeight = _height
				}catch(e){
					//TODO handle the exception
				}
			}
			return _height
		},
		mypGetScreenHeight() {
			const app = getApp({allowDefault: true})
			let _height = 0
			// we could cache system info into globalData, then minus the call of uni.getSystemInfo
			if (app.globalData.screenHeight) {
				_height = app.globalData.screenHeight
			} else {
				try{
					const info = uni.getSystemInfoSync()
					_height = info.screenHeight
					// cache into globalData
					app.globalData.screenHeight = _height
				}catch(e){
					//TODO handle the exception
				}
			}
			return _height
		},
		mypGetStatusBarHeight() {
			const app = getApp({allowDefault: true})
			if (app.globalData.statusBarHeight) {
				return app.globalData.statusBarHeight || 0
			}
			try{
				const info = uni.getSystemInfoSync()
				app.globalData.statusBarHeight = info.statusBarHeight || 0
				return info.statusBarHeight || 0
			}catch(e){
				//TODO handle the exception
			}
			return 0
		}
	}
}
