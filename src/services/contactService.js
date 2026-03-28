import apiClient from './apiClient'

export async function submitContactForm(payload) {
  const { data } = await apiClient.post('/contact', payload)
  return data // { message }
}
