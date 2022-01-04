import axios from 'axios'
export default {
  getProvinces () {
    return axios.get('https://vapi.vnappmob.com/api/province')
  },
  getDistricts (provinceId) {
    return axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
  },
  getWards (districtId) {
    return axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
  }
}
