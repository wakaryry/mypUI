import actions from './actions.js'
import mutations from './mutations.js'

const state = {
	hasLogedIn: false
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
