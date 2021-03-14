import req from '@/utils/mereq'

export function login(data) {
  return req.postJson('/api/admin/login',data)
}

export function getInfo(token) {
  return req.get('/api/admin/info',{ token })
}

export function logout() {
  return req.post('/api/admin/exit')
}
