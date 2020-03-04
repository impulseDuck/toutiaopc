import axios from 'axios'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 公共的请求头地址
axios.interceptors.request.use(function (config) {
  // 成功执行第一个function
  const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
  // 失败执行第二个function
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 成功执行

  return response.data ? response.data : {}
}, function (error) {
  // 失败执行
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
