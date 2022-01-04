import { RepositoryFactory } from '../../../repositories/RepositoryFactory'

const countryRepository = RepositoryFactory.get('countryRepository')

export const actions = {
  getProvinces ({ commit }) {
    countryRepository.getProvinces().then(response => {
      commit('setProvinces', response.data)
    }).catch(error => {
      commit('setProvinces', [])
      console.log(error)
    })
  },
  getDistricts ({ commit }, provinceId) {
    countryRepository.getDistricts(provinceId).then(response => {
      commit('setDistricts', response.data)
    }).catch(error => {
      commit('setDistricts', [])
      console.log(error)
    })
  },
  getWards ({ commit }, districtId) {
    countryRepository.getWards(districtId).then(response => {
      commit('setWards', response.data)
    }).catch(error => {
      commit('setWards', [])
      console.log(error)
    })
  }
}
