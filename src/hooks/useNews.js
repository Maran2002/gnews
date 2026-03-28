import { useState, useEffect, useCallback } from 'react'
import { getNews } from '@/services/newsService'
import { DEFAULT_PAGE_SIZE } from '@/constants'

/**
 * Hook for fetching a paginated news list.
 * @param {string} category
 * @param {number} initialPage
 */
export function useNews(category = 'all', initialPage = 1) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNews = useCallback(async (pg, cat) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getNews(pg, DEFAULT_PAGE_SIZE, cat)
      setItems(data.items ?? [])
      setTotalPages(data.totalPages ?? 1)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    fetchNews(1, category)
  }, [category, fetchNews])

  const goToPage = useCallback(
    (pg) => {
      setPage(pg)
      fetchNews(pg, category)
    },
    [category, fetchNews],
  )

  return { items, page, totalPages, loading, error, goToPage }
}
