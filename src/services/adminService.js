import apiClient from './apiClient'

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function adminLogin(username, password) {
  const { data } = await apiClient.post('/admin/login', { username, password })
  return data // { token }
}

// ── Custom News CRUD ──────────────────────────────────────────────────────────

export async function getAdminNews() {
  const { data } = await apiClient.get('/admin/news')
  return data
}

export async function createNewsItem(payload) {
  const { data } = await apiClient.post('/admin/news', payload)
  return data
}

export async function updateNewsItem(id, payload) {
  const { data } = await apiClient.put(`/admin/news/${id}`, payload)
  return data
}

export async function deleteNewsItem(id) {
  await apiClient.delete(`/admin/news/${id}`)
}

// ── Contact Submissions ───────────────────────────────────────────────────────

export async function getContacts() {
  const { data } = await apiClient.get('/admin/contacts')
  return data
}

export async function markContactRead(id) {
  const { data } = await apiClient.patch(`/admin/contacts/${id}/read`)
  return data
}

export async function deleteContact(id) {
  await apiClient.delete(`/admin/contacts/${id}`)
}
