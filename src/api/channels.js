import request from '@/utils/request'
export function getChannel () {
  return request({
    url: '/channels'
  })
}
