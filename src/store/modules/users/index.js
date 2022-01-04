import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state = () => ({
	user: {
		address: null,
		email: null,
		fullName: null,
		isLogin: null,
		loginFailedCount: null,
		phone: null,
		roleId: null,
		status: null,
		token: null,
		userId: null,
		userName: null
	}
})

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
