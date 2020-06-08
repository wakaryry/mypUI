import request from '@/common/request.js'

export function thumbAlbum(data) {
	return request.request({
		url: '/album/thumb',
		method: 'POST',
		data: data,
		toggle: true
	})
}

export function cancelThumbAlbum(data) {
	return request.request({
		url: '/album/cancel_thumb',
		method: 'POST',
		data: data,
		toggle: true
	})
}

export function getAlbumList(data) {
	return request.request({
		url: '/album/list',
		method: 'GET',
		data: data,
		toggle: true
	})
}
