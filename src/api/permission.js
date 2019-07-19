import axios from '@/libs/api.request'

export const permissionPage = data => {
  return axios.request({
    url: '/permission/permissionpage',
    method: 'post',
    data: data
  })
}

export const addPermission = data => {
  return axios.request({
    url: '/permission/addpermission',
    method: 'post',
    data: data
  })
}

export const updatePermission = data => {
  return axios.request({
    url: '/permission/updatepermission',
    method: 'post',
    data: data
  })
}

export const deletePermission = data => {
  return axios.request({
    url: '/permission/deletepermission',
    method: 'post',
    data: data
  })
}
