import request from '@/utils/request'
import req from '@/utils/mereq'
let baseUrl = "/client"
/**
 * 客户端列表
 * 
 */
export function getClientList(data) {
  return req.post(`${baseUrl}/queryPage`,data)
  /* return request({
    url: `${baseUrl}/queryPage`,
    method: 'post',
    data
  }) */
}
/**
 * 客户端详情
 * 
 */
export function getClientInfo(id) {
  return req.get(`${baseUrl}/query`,{id})
  /* return request({
    url: `${baseUrl}/query`,
    method: 'get',
    params: { id }
  }) */
}
/**
 * 删除客户端详情
 * 
 */
export function deleteClient(id) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'get',
    params: { id }
  })
}
/**
 * 添加客户端详情
 * 
 */
export function insertClient(data) {
  return req.postJson(`${baseUrl}/add`,data)
  /* return request({
    url: `${baseUrl}/add`,
    method: 'post',
    data
  }) */
}
/**
 * 检查在线状态
 * 
 */
export function changeStatus(params) {
  return req.post(`${baseUrl}/changeStatus`,params)
  /* return request({
    url: `${baseUrl}/checkOnline`,
    method: 'post',
    params
  }) */
}

/**
 * 编辑任务
 * 
 */
export function updateClient(data) {
  return req.postJson(`${baseUrl}/update`,data)
  /* return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data
  }) */
}