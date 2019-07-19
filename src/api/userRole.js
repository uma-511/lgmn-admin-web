import axios from '@/libs/api.request'

export const userRoleList = data => {
  return axios.request({
    url: '/userrole/userrolelist',
    method: 'post',
    data: data
  })
}

export const roleList = data => {
  return axios.request({
    url: '/userrole/rolelist',
    method: 'post',
    data: data
  })
}

export const addUserRole = data => {
  return axios.request({
    url: '/userrole/adduserrole',
    method: 'post',
    data: data
  })
}

export const deleteUserRole = data => {
  return axios.request({
    url: '/userrole/deleteuserrole',
    method: 'post',
    data: data
  })
}
