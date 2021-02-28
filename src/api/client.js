import req from '@/utils/mereq'
let baseUrl = "/client"
/**
 * 客户端列表
 * 
 */
export function getClientList(data) {
  return req.post(`${baseUrl}/queryPage`,data)
}
/**
 * 客户端详情
 * 
 */
export function getClientInfo(id) {
  return req.get(`${baseUrl}/query`,{id})
}
/**
 * 删除客户端
 * 
 */
export function deleteClient(id) {
  return req.get(`${baseUrl}/delete`,{id})
}
/**
 * 添加客户端
 * 
 */
export function insertClient(data) {
  return req.postJson(`${baseUrl}/add`,data)
}
/**
 * 客户端上下架
 * 
 */
export function changeStatus(params) {
  return req.post(`${baseUrl}/changeStatus`,params)
}

/**
 * 编辑客户端
 * 
 */
export function updateClient(data) {
  return req.postJson(`${baseUrl}/update`,data)
}