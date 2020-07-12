import Vuex from 'vuex'
import Vue from 'vue'

import getters from './getters.js'

// modules
import user from './user/index.js'
import common from './common/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		common
	},
	getters
})

export default store
