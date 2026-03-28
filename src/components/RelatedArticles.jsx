import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Newspaper } from 'lucide-react'
import { getNews } from '@/services/newsService'
import { formatDate, truncate, stripHtml } from '@/utils/formatters'

/**
 * RelatedArticles — shows 3 articles from the same category.
 * Excludes the current article by ID.
 *
 * @param {{ category: string, currentId: string }} props
 */
export default function RelatedArticles({ category, currentId }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!category) return

    let cancelled = false
    setLoading(true)

    getNews(1, 8, category)
      .then(({ items }) => {
        if (!cancelled) {
          const related = (items || [])
            .filter((item) => item.id !== currentId)
            .slice(0, 3)
          setArticles(related)
        }
      })
      .catch(() => {
        if (!cancelled) setArticles([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [category, currentId])

  if (loading) {
    return (
      <div className="mt-10" aria-label="Loading related articles">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
              <div className="h-32 bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!articles.length) return null

  return (
    <section className="mt-10" aria-label="Related articles">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-600 rounded-full inline-block" aria-hidden="true" />
        More from <span className="capitalize ml-1">{category}</span>
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {articles.map((item) => {
          const cleanDesc = stripHtml(item.description || '')
          return (
            <article
              key={item.id}
              className="group rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Thumbnail */}
              <Link to={`/news/${item.id}`} aria-label={item.title} tabIndex={-1}>
                <div className="relative h-32 bg-gray-100 overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Newspaper size={32} strokeWidth={1} />
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-3 flex flex-col flex-1 gap-1.5">
                {item.source?.name && (
                  <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
                    {item.source.name}
                  </span>
                )}

                <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-3">
                  <Link
                    to={`/news/${item.id}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>

                {cleanDesc && (
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                    {truncate(cleanDesc, 80)}
                  </p>
                )}

                <div className="mt-auto pt-2 border-t border-gray-50">
                  <time
                    className="flex items-center gap-1 text-[10px] text-gray-400"
                    dateTime={item.publishedAt}
                  >
                    <Clock size={10} />
                    {formatDate(item.publishedAt)}
                  </time>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
