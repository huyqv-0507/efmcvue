import AccountRepository from './AccountRepository'
import PharmacyRepository from './PharmacyRepository'
import CountryRepository from './CountryRepository'

const repositoryFactories = {
	accountRepository: AccountRepository,
	pharmacyRepository: PharmacyRepository,
	countryRepository: CountryRepository
}

export const RepositoryFactory = {
	get: name => repositoryFactories[name]
}
