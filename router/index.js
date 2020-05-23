import routers from './router.js'

export function navigateTo(name, options={}) {
	const url = getRouterUrl(name, options)
	uni.navigateTo({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

export function redirectTo(name, options={}) {
	const url = getRouterUrl(name, options)
	uni.redirectTo({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

export function relaunch(name, options={}) {
	const url = getRouterUrl(name, options)
	uni.reLaunch({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

export function switchTab(name, options={}) {
	const url = getRouterUrl(name, options)
	uni.switchTab({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

function getRouterUrl(name, options) {
	let _url = routers[name]
	const _keys = Object.keys(options || {})
	const _params = []
	for (const i in _keys) {
		const theKey = _keys[i]
		const _item = theKey + '=' + options[theKey]
		_params.push(_item)
	}
	if (_params && _params.length > 0) {
		_url += '?' + _params.join('&')
	}
	return _url
}

export default {
	navigateTo,
	redirectTo,
	relaunch,
	switchTab
}
