import { RepositoryFactory } from '../../../repositories/RepositoryFactory'

const accountRepository = RepositoryFactory.get('accountRepository')

export const actions = {
	getUserInfo ({ commit, rootState }) {
		const userId = rootState.authentication.auth.jwtData.userId
		accountRepository.getUserInfo(userId).then(response => {
			if (response.status === 200) {
				commit('setUserInfo', response.data.data)
			}
		}).catch((error) => {
			console.error(error)
		})
	}
}
