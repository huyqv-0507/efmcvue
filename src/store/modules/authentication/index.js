import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state = () => ({
	auth: {
		isAuth: false,
		jwtData: null
	},
	error: {
		message: ''
	}
})

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
