import request from '@/utils/request'
import storage from '@/utils/storage'

export const getsousuojianyi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
export const getsearchresults = (page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      q
    }
  })
}
const val = 'val'
export const getfanfan = () => storage.get(val)
export const setfanfan = (channel) => {
  storage.set(val, channel)
}
export const removefanfan = () => storage.remove(val)
