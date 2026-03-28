import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ArrowLeft } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'
import { getNews } from '@/services/newsService'
import NewsList from '@/components/NewsList'
import Pagination from '@/components/Pagination'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import apiClient from '@/services/apiClient'

async function searchNews(q, page, limit) {
  const { data } = await apiClient.get('/news/search', { params: { q, page, limit } })
  return data
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const seo = useSEO({ title: q ? `Search: "${q}"` : 'Search', type: 'website' })

  const fetch = useCallback(async (query, pg) => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await searchNews(query, pg, DEFAULT_PAGE_SIZE)
      setItems(data.items ?? [])
      setTotal(data.total ?? 0)
      setTotalPages(data.totalPages ?? 1)
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    fetch(q, 1)
  }, [q, fetch])

  function goToPage(pg) {
    setPage(pg)
    fetch(q, pg)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {seo}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 mb-5 transition-colors"
      >
        <ArrowLeft size={15} /> Back to headlines
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <Search size={20} className="text-red-600" />
        <h1 className="text-2xl font-bold text-gray-900">
          {q ? `Results for "${q}"` : 'Search'}
        </h1>
      </div>

      {!loading && !error && q && (
        <p className="text-sm text-gray-500 mb-6">
          {total} result{total !== 1 ? 's' : ''} found
        </p>
      )}

      <NewsList
        items={items}
        loading={loading}
        error={error}
        onRetry={() => fetch(q, page)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  )
}
