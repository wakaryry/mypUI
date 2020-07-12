import { getProvinceCity, getProvinceCityArea, getCities, getCityAreas } from '@/api/common.js'

const state = {
	// province-city
	pcs: [],
	pcas: [],
	isLoadingPcs: false,
	isLoadingPcas: false,
	cities: [],
	// 根据键值对保存的area信息,code为key
	areas: {},
	isLoadingCities: false
}

const mutations = {
	set_pcs: (state, cts) => {
		state.pcs = cts || []
	},
	set_is_loading_pcs: (state, cityLoading) => {
		state.isLoadingPcs = cityLoading
	},
	set_pcas: (state, cas) => {
		state.pcas = cas || []
	},
	set_is_loading_pcas: (state, cityLoading) => {
		state.isLoadingPcas = cityLoading
	},
	set_cities: (state, cts) => {
		state.cities = cts || []
	},
	add_areas: (state, info) => {
		state.areas[info.city_code] = info.areas || []
	},
	set_is_loading_cities: (state, loading) => {
		state.isLoadingCities = loading
	}
}

const actions = {
	provinceCity({commit}) {
		return new Promise((resolve, reject) => {
			commit('set_is_loading_pcs', true)
			getProvinceCity().then(response => {
				commit('set_pcs', response.results)
				commit('set_is_loading_pcs', false)
				resolve()
			}).catch(err => {
				commit('set_is_loading_pcs', false)
				reject(err)
			})
		})
	},
	provinceCityArea({commit}) {
		return new Promise((resolve, reject) => {
			commit('set_is_loading_pcas', true)
			getProvinceCityArea().then(response => {
				commit('set_pcas', response.results)
				commit('set_is_loading_pcas', false)
				resolve()
			}).catch(err => {
				commit('set_is_loading_pcas', false)
				reject(err)
			})
		})
	},
	commonCities({commit}) {
		commit('set_is_loading_cities', true)
		return new Promise((resolve, reject) => {
			getCities().then(response => {
				commit("set_cities", response.results)
				commit('set_is_loading_cities', false)
				resolve()
			}).catch(err => {
				commit('set_is_loading_cities', false)
				reject(err)
			})
		})
	},
	commonCityAreas({commit}, info) {
		return new Promise((resolve, reject) => {
			getCityAreas(info).then(response => {
				commit("add_areas", {
					city_code: info.code,
					areas: response.results
				})
				resolve(response.results)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
