import req from '@/utils/mereq'

export function login(data) {
  return req.postJson('/admin/login',data)
}

export function getInfo(token) {
  return req.get('/admin/info',{ token })
}

export function logout() {
  return req.post('/admin/exit')
}
