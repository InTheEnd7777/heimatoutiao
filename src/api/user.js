import request from '@/utils/request'
import store from '@/store'
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

// 获取个人资料
export const getuserinfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
// 获取用户个人资料
export const Getuserprofile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 编辑个人资料
export const editinformation = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
}
// 编辑用户照片资料（头像、身份证照片）
export const updatePortrait = (photo) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
}
