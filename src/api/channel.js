import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 *  获取我的列表
 * @returns promise
 */
export const getMychannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *  获取全部列表
 * @returns promise
 */
export const getALLchannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
const Tk = 'Tk'
export const getItem = () => storage.get(Tk)
export const setItem = (channel) => {
  storage.set(Tk, channel)
}
/**
 * 登录删除频道
 * @param {string|Number} target
 * @returns Promise
 */
export const delchannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {Number} id
 * @param {Number} seq
 * @returns Promise
 */
export const addchannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
