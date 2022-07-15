import request from '@/utils/request'
/**
 *
 * @param {string} mobile
 * @param {string} code
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *
 * @param {string} mobile
 * @returns Promise
 */

export const sendCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
