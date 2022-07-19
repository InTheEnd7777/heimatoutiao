import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
request.interceptors.request.use(
  (config) => {
    // console.log(config, '执行')
    const token = store.state.user.token
    // 每次请求前携带token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
