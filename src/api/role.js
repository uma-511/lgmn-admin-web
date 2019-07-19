import axios from '@/libs/api.request'

export const rolePage = data => {
  return axios.request({
    url: '/role/rolepage',
    method: 'post',
    data: data
  })
}

export const addRole = data => {
  return axios.request({
    url: '/role/addrole',
    method: 'post',
    data: data
  })
}

export const updateRole = data => {
  return axios.request({
    url: '/role/updaterole',
    method: 'post',
    data: data
  })
}

export const deleteRole = data => {
  return axios.request({
    url: '/role/deleterole',
    method: 'post',
    data: data
  })
}
