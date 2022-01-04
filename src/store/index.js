import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authentication from './modules/authentication/index'
import users from './modules/users/index'
import pharmacies from './modules/pharmacies/index'
import countries from './modules/countries'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	modules: {
		authentication,
		users,
		pharmacies,
		countries
	},
	strict: debug,
	plugins: debug ? [createLogger(), createPersistedState()] : []
})
