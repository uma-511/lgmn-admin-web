import axios from '@/libs/api.request'

export const getCustomerList = data => {
  return axios.request({
    url: '/customerApi/getCustomerList',
    method: 'post',
    data: data
  })
}
