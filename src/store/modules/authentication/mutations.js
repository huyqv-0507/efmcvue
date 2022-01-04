export const mutations = {
	setJwtData (state, jwtData) {
		state.auth = {
			isAuth: true,
			jwtData: {
				userId: jwtData.UserId,
				userName: jwtData.UserName
			}
		}
	},
	setError (state, message) {
		state.error.message = message
	}
}
