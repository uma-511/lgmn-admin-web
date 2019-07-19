import axios from '@/libs/api.request'

export const rolePermissionList = data => {
  return axios.request({
    url: '/rolepermission/rolepermissionlist',
    method: 'post',
    data: data
  })
}

export const permissionList = data => {
  return axios.request({
    url: '/rolepermission/permissionlist',
    method: 'post',
    data: data
  })
}

export const addRolePermission = data => {
  return axios.request({
    url: '/rolepermission/addrolepermission',
    method: 'post',
    data: data
  })
}

export const deleteRolePermission = data => {
  return axios.request({
    url: '/rolepermission/deleterolepermission',
    method: 'post',
    data: data
  })
}
