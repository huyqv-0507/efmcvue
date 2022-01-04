import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
import { parseJwt } from '../../../utilities/common'
import router from '../../../router'
import { setJwtToken } from '../../../utilities/cookie'

const accountRepository = RepositoryFactory.get('accountRepository')

export const actions = {
	// eslint-disable-next-line indent
	async login ({ commit, dispatch }, accountForm) {
		await accountRepository.login(accountForm).then(response => {
			if (!response.data.success) {
				commit('setError', '')
			} else {
				const accountJwt = parseJwt(response.data.data.token)

				commit('setJwtData', accountJwt)
				setJwtToken(response.data)
				router.push('/')

				dispatch('users/getUserInfo', null, { root: true })
			}
		}).catch((error) => {
			switch (error.response.status) {
				case 400:
					commit('setError', error.response.data.message)
					break

				default:
					commit('setError', 'Vui lòng kiểm tra kết nối mangj')
					break
			}
		})
	}
}
