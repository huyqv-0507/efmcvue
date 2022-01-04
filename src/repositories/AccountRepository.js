import request from '../utilities/request'

export default {
	login (accountData) {
		const account = {
			userName: accountData.userName,
			password: accountData.password
		}
		return request({
			method: 'POST',
			url: 'users/login',
			data: account
		})
	},
	getUserInfo (userId) {
		return request({
			method: 'GET',
			url: `users/${userId}`
		})
	}
}
