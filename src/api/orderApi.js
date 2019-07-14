import axios from '@/libs/api.request'

export const add = data => {
  return axios.request({
    url: '/orderApi/add',
    method: 'post',
    data: data
  })
}

export const edit = data => {
  return axios.request({
    url: '/orderApi/update',
    method: 'post',
    data: data
  })
}
