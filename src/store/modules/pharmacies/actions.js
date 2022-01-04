import { RepositoryFactory } from '../../../repositories/RepositoryFactory'

const pharmacyRepository = RepositoryFactory.get('pharmacyRepository')

export const actions = {
	async getPharmacies ({ commit, rootState }) {
		const ownerId = rootState.authentication.auth.jwtData.userId
		await pharmacyRepository.getPharmacies(ownerId).then(response => {
			commit('setPharmacies', response.data.data)
		}).catch(error => {
			commit('setPharmacies', null)
			console.log(error)
		})
	},
	createPharmacy ({ rootState, state }, pharmacy) {
		const ownerId = rootState.authentication.auth.jwtData.userId
		const address = `${pharmacy.addressDetail}, ${pharmacy.ward}, ${pharmacy.district}, ${pharmacy.province}.`
		const data = {
			userId: parseInt(ownerId),
			name: pharmacy.name,
			address: address,
			pharmacistGeneration: pharmacy.pharmacistGeneration === null
				? null
				: {
					count: pharmacy.pharmacistGeneration.count,
					userNameFormat: pharmacy.pharmacistGeneration.userNameFormat
				}
		}
		pharmacyRepository.createPharmacy(data).then(response => {
			state.pharmacies.push(response.data)
		}).catch(err => {
			console.log(err)
		})
	},
	setPharmacy ({ commit }, pharmacy) {
		commit('setPharmacy', pharmacy)
	}
}
