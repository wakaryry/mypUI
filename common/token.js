const AccessKey = "access"
const AccessTimeKey = "access_time"
const RefreshKey = "refresh"
const RefreshTimeKey = "refresh_time"

const AccessExpireTime = 43180000 // 12h-20s
const RefreshExpireTime = 2588400000 // 30d-1h

// we can not hold it in this since it may null when we first got it, so it coule always be null
// it shows it calls before app inited
// the file is loaded, then app inited
// const app = getApp({allowDefault: true})

export function isAccessExpired() {
	const app = getApp({allowDefault: true})
	const nowTime = Date.now()
	if (!app.globalData.access || !app.globalData.accessTime) {
		return true
	}
	if (nowTime - app.globalData.accessTime < AccessExpireTime) {
		return false
	}
	return true
}

export function isRefreshExpired() {
	const app = getApp({allowDefault: true})
	const nowTime = Date.now()
	if (!app.globalData.refresh || !app.globalData.refreshTime) {
		return true
	}
	if (nowTime - app.globalData.refreshTime < RefreshExpireTime) {
		return false
	}
	return true
}

export function retrieveTokenInfo() {
	const app = getApp({allowDefault: true})
	try {
		const _access = uni.getStorageSync(AccessKey)
		if (_access) {
			app.globalData.access = _access
		}
		const _accessTime = uni.getStorageSync(AccessTimeKey)
		if (_accessTime) {
			app.globalData.accessTime = _accessTime * 1
		}
		const _refresh = uni.getStorageSync(RefreshKey)
		if (_refresh) {
			app.globalData.refresh = _refresh
		}
		const _refreshTime = uni.getStorageSync(RefreshTimeKey)
		if (_refreshTime) {
			app.globalData.refreshTime = _refreshTime * 1
		}
	} catch (e) {
		// TODO: error
	}
}

export function updateAccess(access) {
	const app = getApp({allowDefault: true})
	if (access) {
		const time = Date.now()
		app.globalData.access = access
		app.globalData.accessTime = time
		uni.setStorage({
			key: AccessKey,
			data: access,
			fail: (e) => {
				// TODO
			}
		})
		uni.setStorage({
			key: AccessTimeKey,
			data: time,
			fail: (e) => {
				// TODO
			}
		})
	} else {
		app.globalData.access = null
		app.globalData.accessTime = null
		uni.removeStorage({
			key: AccessKey,
			fail: (e) => {
				// TODO
			}
		})
		uni.removeStorage({
			key: AccessTimeKey,
			fail: (e) => {
				// TODO
			}
		})
	}
}

export function updateAccessRefresh(access, refresh) {
	const app = getApp({allowDefault: true})
	const time = Date.now()
	if (access) {
		app.globalData.access = access
		app.globalData.accessTime = time
		uni.setStorage({
			key: AccessKey,
			data: access,
			fail: (e) => {
				// TODO
			}
		})
		uni.setStorage({
			key: AccessTimeKey,
			data: time,
			fail: (e) => {
				// TODO
			}
		})
	} else {
		app.globalData.access = null
		app.globalData.accessTime = null
		uni.removeStorage({
			key: AccessKey,
			fail: (e) => {
				// TODO
			}
		})
		uni.removeStorage({
			key: AccessTimeKey,
			fail: (e) => {
				// TODO
			}
		})
	}
	if (refresh) {
		app.globalData.refresh = refresh
		app.globalData.refreshTime = time
		uni.setStorage({
			key: RefreshKey,
			data: refresh,
			fail: (e) => {
				// TODO
			}
		})
		uni.setStorage({
			key: RefreshTimeKey,
			data: time,
			fail: (e) => {
				// TODO
			}
		})
	} else {
		app.globalData.refresh = null
		app.globalData.refreshTime = null
		uni.removeStorage({
			key: RefreshKey,
			fail: (e) => {
				// TODO
			}
		})
		uni.removeStorage({
			key: RefreshTimeKey,
			fail: (e) => {
				// TODO
			}
		})
	}
}
