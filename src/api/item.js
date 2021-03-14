import req from '@/utils/mereq'
let baseUrl = "/api/item"
/**
 * 项目日志列表
 * 
 */
export function getItemList(data) {
  return req.post(`${baseUrl}/queryPage`,data)
}
/**
 * 查看项目日志详情
 * 
 */
export function getItemInfo(id) {
  return req.get(`${baseUrl}/query`,{id})
}
/**
 * 删除项目日志
 * 
 */
export function deleteItem(id) {
    return req.get(`${baseUrl}/delete`,{id})
}
/**
 * 添加项目日志详情
 * 
 */
export function insertItem(data) {
  return req.postJson(`${baseUrl}/add`,data)
}

/**
 * 项目日志上下线
 * 
 */
export function changeStatus(params) {
  return req.post(`${baseUrl}/changeStatus`,params)
}

/**
 * 编辑项目日志
 * 
 */
export function updateItem(data) {
  return req.postJson(`${baseUrl}/update`,data)
}