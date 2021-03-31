import req from '@/utils/mereq'

let baseUrl = "/api/admin"

export function login(data) {
  return req.postJson(`${baseUrl}/login`, data)
}

export function getInfo(token) {
  return req.get('/api/admin/info', {
    token
  })
}

export function logout() {
  return req.post(`${baseUrl}/exit`)
}