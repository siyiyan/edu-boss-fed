/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request'
// 查询资源分类列表
export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
