/**
 * 角色相关请求模块
 */

import request from '@/utils/request'

export const getRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
// 添加或更新角色
export const createOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
// 获取角色ID
export const getRoleById = (id: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
// 给用户分配角色
export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
// 查询用户角色
export const getUserRoles = (userId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
