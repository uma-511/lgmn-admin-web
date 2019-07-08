import axios from '@/libs/api.request'

export const PostWithAuth = (action, data) => {
  return axios.request({
    url: action,
    method: 'post',
    data: data,
    headers: {
      Authorization: 'Bearer ' + data.token
    }
  })
}
