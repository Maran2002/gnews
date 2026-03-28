/**
 * Axios instance for Frontend → Backend communication.
 *
 * Identity: X-Client-Source header (VITE_CLIENT_SOURCE_NAME)
 *
 * ⚠️  This file must NEVER reference RSS feed identity (User-Agent / X-Server-Source).
 *      RSS identity is a backend-only concern and must not appear in frontend code.
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Source': import.meta.env.VITE_CLIENT_SOURCE_NAME,
  },
})

// ── Request interceptor ────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response interceptor ───────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('auth_token')
      // Redirect to login if you add auth later
    }

    if (status === 403) {
      console.error('[API] Forbidden – insufficient permissions')
    }

    if (status >= 500) {
      console.error('[API] Server error:', error.response?.data?.message || 'Unknown server error')
    }

    return Promise.reject(error)
  },
)

export default apiClient
