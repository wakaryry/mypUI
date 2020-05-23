import Vuex from 'vuex'
import Vue from 'vue'

import getters from './getters.js'

// modules
import user from './user/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user
	},
	getters
})

export default store
