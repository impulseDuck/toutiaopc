import requset from '@/utils/request'
export function getContent (params) {
  return requset({
    url: '/articles',
    params
  })
}
