import axios from '@/libs/api.request'

export const getProductAllList = data => {
  return axios.request({
    url: '/productApi/getProductAllList',
    method: 'post',
    data: data
  })
}
