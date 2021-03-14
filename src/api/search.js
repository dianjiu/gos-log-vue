import req from '@/utils/mereq'
// let baseUrl = "/file"
let baseUrl = "/api/logs"
/**
 * 查找日志文件
 * 
 */
export function getSearchFile(data) {
  return req.postFile(`${baseUrl}/query`,data)
}

/**
 * 查找客户端列表
 */
export function getClientList(data) {
  return req.post(`${baseUrl}/queryClients`,data)
}

/**
 * 查找客户端列表
 */
 export function getItemList(data) {
  return req.post(`${baseUrl}/queryItems`,data)
}