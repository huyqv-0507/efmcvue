export const mutations = {
	setPharmacies (state, pharmacies) {
		if (pharmacies.length !== 0) {
			state.pharmacies = pharmacies.map(pharmacy => {
				return {
					pharmacyId: pharmacy.pharmacyId,
					name: pharmacy.name,
					address: pharmacy.address,
					dateCreated: pharmacy.dateCreated,
					status: pharmacy.status,
					userPharmacies: pharmacy.userPharmacies.map(userPharmacy => {
						return {
							userPharmacyId: userPharmacy.userPharmacyId,
							ownerId: userPharmacy.ownerId,
							ownerName: userPharmacy.ownerName,
							pharmacistId: userPharmacy.pharmacistId,
							pharmacistName: userPharmacy.pharmacistName,
							status: userPharmacy.status
						}
					})
				}
			})
		} else {
			state.pharmacies.length = 0
		}
	},
	setPharmacy (state, pharmacy) {
		state.pharmacy = {
			pharmacyId: pharmacy.pharmacyId,
			name: pharmacy.name,
			address: pharmacy.address,
			dateCreated: pharmacy.dateCreated,
			status: pharmacy.status,
			userPharmacies: pharmacy.userPharmacies.map(userPharmacy => {
				return {
					userPharmacyId: userPharmacy.userPharmacyId,
					ownerId: userPharmacy.ownerId,
					ownerName: userPharmacy.ownerName,
					pharmacistId: userPharmacy.pharmacistId,
					pharmacistName: userPharmacy.pharmacistName,
					status: userPharmacy.status
				}
			})
		}
		console.log('p', state.pharmacy)
	}
}
