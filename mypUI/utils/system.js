function _getSystemInfo() {
	const info = uni.getSystemInfoSync()
	const app = getApp({
		allowDefault: true
	})

	app.globalData.screenHeight = info.screenHeight
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
	if (app.globalData.safeTop > 0 && app.globalData.statusBarHeight === 0) {
		app.globalData.statusBarHeight = app.globalData.safeTop
	}

	app.globalData.platform = info.platform
	app.globalData.brand = info.brand
	app.globalData.model = info.model
}

export function initSystemInfo() {
	try {
		_getSystemInfo()
	} catch (e) {
		_getSystemInfo()
	}
}

export function getPlatform() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.platform) {
		return app.globalData.platform
	}
	initSystemInfo()
	return app.globalData.platform
}

export function getNavbarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.navHeight) {
		return app.globalData.navHeight
	}
	app.globalData.navHeight = 44
	return app.globalData.navHeight
}

export function getWindowHeight() {
	try{
		return uni.getSystemInfoSync().windowHeight
	}catch(e){
		try{
			return uni.getSystemInfoSync().windowHeight
		}catch(e){
			return 0
		}
	}
}

export function getScreenHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.screenHeight) {
		return app.globalData.screenHeight
	}
	initSystemInfo()
	return app.globalData.screenHeight
}

export function getStatusBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.statusBarHeight) {
		return app.globalData.statusBarHeight
	}
	if (!app.globalData.platform || app.globalData.platform.length === 0) {
		initSystemInfo()
	}
	return app.globalData.statusBarHeight
}

export function getXBarHeight() {
	const app = getApp({
		allowDefault: true
	})
	if (app.globalData.safeBottom) {
		return app.globalData.safeBottom
	}
	if (!app.globalData.platform || app.globalData.platform.length === 0) {
		initSystemInfo()
	}
	return app.globalData.safeBottom
}

export function getPx(val) {
	if (typeof val === 'number') {
		return uni.upx2px(val)
	}
	const a = parseInt(val)
	if (val.indexOf('rpx') >= 0) {
		return uni.upx2px(a)
	}
	if (val.indexOf('upx') >= 0) {
		return uni.upx2px(a)
	}
	if (val.indexOf('px') >= 0) {
		return a
	}
	return uni.upx2px(a)
}

export function getHeight(val) {
	if (val === 'status') {
		return getStatusBarHeight()
	}
	if (val === 'nav') {
		return getNavbarHeight()
	}
	if (val === 'status-nav' || val === 'nav-status') {
		return getStatusBarHeight() + getNavbarHeight()
	}
	if (val === 'x') {
		return getXBarHeight()
	}
	if (typeof val === 'string' && (val.startsWith('status') || val.startsWith('nav') || val.startsWith('x'))) {
		const arr = val.split('-')
		let h = 0
		for (const i in arr) {
			const t = arr[i]
			if (t === 'status') {
				h += getStatusBarHeight()
			} else if (t === 'nav') {
				h += getNavbarHeight()
			} else if (t === 'x') {
				h += getXBarHeight()
			} else {
				h += getPx(t)
			}
		}
		return h
	}
	return getPx(val)
}
