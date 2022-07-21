import request from '@/utils/request'
export const getNewList = (channelid, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelid,
      timestamp
    }
  })
}
export const getNewsDetails = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
