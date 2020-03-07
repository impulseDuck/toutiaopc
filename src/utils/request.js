import axios from 'axios'
import router from '@/router'
// 当处理大数字类型时，超出最大的安全范围，后面尾数会默认显示为0.这时候需要用到json-bigint的包
import JSONBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 公共的请求头地址

// transformResponse是axios的一个数组，数组中可以写多个处理函数
// 后端数据=>transformResponse=>axios的响应拦截之前
axios.defaults.transformResponse = [function (data) {
  // 用json-bigint来转化
  // 这里判断，data为空就不能转化
  return data ? JSONBig.parse(data) : {}
}]

// token
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
