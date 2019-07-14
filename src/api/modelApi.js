import axios from '@/libs/api.request'

export const getModelAllList = data => {
  return axios.request({
    url: '/modelApi/getModelAllList',
    method: 'post',
    data: data
  })
}
