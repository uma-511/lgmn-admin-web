import axios from '@/libs/api.request'

export const getLabelFormatAllList = data => {
  return axios.request({
    url: '/labelFormatApi/getLabelFormatAllList',
    method: 'post',
    data: data
  })
}

export const add = data => {
  return axios.request({
    url: '/labelFormatApi/add',
    method: 'post',
    data: data
  })
}
