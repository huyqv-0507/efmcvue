import request from '../utilities/request'

export default {
	getPharmacies (ownerId, status) {
		if (!status) {
			return request({
				method: 'GET',
				url: `/pharmacies/${ownerId}`
			})
		} else {
			return request({
				method: 'GET',
				url: `/pharmacies/${ownerId}?status=${status}`
			})
		}
	},
	createPharmacy (data) {
		console.log('data', data)
		return request({
			method: 'POST',
			url: '/pharmacies',
			data: {
				userId: data.userId,
				name: data.name,
				address: data.address,
				pharmacistGeneration: data.pharmacistGeneration == null
					? null
					: {
						count: data.pharmacistGeneration.count,
						userNameFormat: data.pharmacistGeneration.userNameFormat
					}
			}
		})
	},
	getPharmacy (pharmacyId, status) {
		return request({
			method: 'GET',
			url: `/pharmacies/pharmacy-detail/${pharmacyId}/${status}`
		})
	}
}
