import request from '@/common/request.js'

export function getProvinceCity() {
	return request.request({
		url: '/helper/pc',
		method: 'GET',
		authType: 'None'
	})
}

export function getProvinceCityArea() {
	return request.request({
		url: '/helper/pca',
		method: 'GET',
		authType: 'None'
	})
}

export function getCities() {
	return request.request({
		url: '/helper/cities',
		method: 'GET',
		authType: 'None'
	})
}

export function getProvinces() {
	return request.request({
		url: '/city/find_all_provinces',
		method: 'GET',
		authType: 'None'
	})
}

export function getProvinceCities(data) {
	return request.request({
		url: '/city/query_cities_by_province_code',
		method: 'GET',
		data: data,
		authType: 'None'
	})
}

export function getCityAreas(data) {
	return request.request({
		url: '/city/query_areas_by_city_code',
		method: 'GET',
		data: data,
		authType: 'None'
	})
}
