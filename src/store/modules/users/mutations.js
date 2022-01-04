export const mutations = {
	setUserInfo (state, userData) {
		state.user = {
			address: userData.address,
			email: userData.email,
			fullName: userData.fullName,
			isLogin: userData.isLogin,
			loginFailedCount: userData.loginFailedCount,
			phone: userData.phone,
			roleId: userData.roleId,
			status: userData.status,
			token: userData.token,
			userId: userData.userId,
			userName: userData.userName
		}
	}
}
