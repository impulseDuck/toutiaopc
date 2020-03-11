import request from '@/utils/request'
export function getMaterial (params) {
  return request({
    url: '/user/images', // 请求地址
    params
  })
}
