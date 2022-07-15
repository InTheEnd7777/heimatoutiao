import storage from './storage'
const TK = 'HMTT'
export const getToken = () => {
  storage.get(TK)
}
export const setToken = (token) => {
  storage.set(TK, token)
}
export const removeToken = () => storage.remove(TK)
