import Cookies from 'js-cookie'

const jwtKey = 'jwt-key'
const firebaseKey = 'firebase-key'

export function getFirebaseToken () {
  return Cookies.get(firebaseKey)
}

export function setFirebaseToken (token) {
  return Cookies.set(firebaseKey, token)
}

export function removeFirebaseToken () {
  return Cookies.remove(firebaseKey)
}

export function getJwtToken () {
  return Cookies.get(jwtKey)
}

export function setJwtToken (token) {
  return Cookies.set(jwtKey, token)
}

export function removeJwtToken () {
  return Cookies.remove(jwtKey)
}
