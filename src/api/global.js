import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

export const PostWithAuth = (action, data) => {
  return axios.request({
    url: action,
    method: 'post',
    data: data,
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  })
}

export const excel = (action, data) => {
  return axios.request({
    url: action,
    method: 'post',
    responseType: 'blob',
    data: data,
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  })
}
