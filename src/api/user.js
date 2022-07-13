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
