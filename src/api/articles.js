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
// 获取新闻详情
export const getNewsDetails = (articleId, timestamp) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    params: {
      timestamp
    }
  })
}
// 关注用户
export const Followusers = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export const NoFollowusers = (target) => {
  return request({
    method: 'DELETE',

    url: `/v1_0/user/followings/${target}`
  })
}
/**
 *
 * @param {*} target  收藏的目标文章id
 * @returns promise
 */
// 收藏文章
export const Favoritearticles = (target) => {
  return request({
    url: '/v1_0/article/collections',
    headers: { target }
  })
}
/**
 *
 * @param {*} target  取消收藏的文章
 * @returns
 */
// 取消文章收藏
export const unfavoritearticle = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
    data: target
  })
}
/**
 *
 * @param {*} target  integer 点赞的文章id
 * @returns
 */
// 点赞文章
export const Likethearticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
}
// 取消点赞
export const Cancelarticlelike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    data: { target },
    method: 'DELETE'
  })
}
// 获取评论
export const getreviews = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}
// 获取评论的评论
export const getreviewsPL = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}
// 对评论进行评论
export const Commentreply = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
// 对文章或者评论
export const articlescomments = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
// 对评论点赞
export const Replytolikes = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target }
  })
}
