/**
 * News service – all news-related API calls go through here.
 * Components must never call apiClient directly.
 */
import apiClient from './apiClient'

/**
 * Fetch paginated news feed.
 * @param {number} page - 1-based page number
 * @param {number} limit - items per page
 * @param {string} category - category key ('all' fetches everything)
 * @returns {Promise<{ items: NewsItem[], total: number, page: number, totalPages: number }>}
 */
export async function getNews(page = 1, limit = 12, category = 'all') {
  const params = { page, limit }
  if (category && category !== 'all') params.category = category

  const { data } = await apiClient.get('/news', { params })
  return data
}

/**
 * Fetch a single news item by ID.
 * @param {string} id
 * @returns {Promise<NewsItem>}
 */
export async function getNewsById(id) {
  const { data } = await apiClient.get(`/news/${id}`)
  return data
}

/**
 * Fetch news items by category (used by RelatedArticles).
 * @param {string} category - category key ('india', 'world', etc.)
 * @param {number} limit - max items to fetch
 * @returns {Promise<{ items: NewsItem[], total: number }>}
 */
export async function getNewsByCategory(category, limit = 8) {
  return getNews(1, limit, category)
}
