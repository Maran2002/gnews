import { useParams } from 'react-router-dom'
import { useSEO } from '@/hooks/useSEO'
import { useNews } from '@/hooks/useNews'
import NewsList from '@/components/NewsList'
import CategoryTabs from '@/components/CategoryTabs'
import Pagination from '@/components/Pagination'
import { CATEGORIES } from '@/constants'

export default function CategoryFeedPage() {
  const { type } = useParams()
  const categoryLabel =
    CATEGORIES.find((c) => c.key === type)?.label ?? type

  const seo = useSEO({
    title: `${categoryLabel} News`,
    description: `Latest ${categoryLabel} news aggregated from top RSS sources.`,
    type: 'website',
  })

  const { items, page, totalPages, loading, error, goToPage } = useNews(type)

  return (
    <div>
      {seo}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{categoryLabel}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Latest {categoryLabel.toLowerCase()} stories from trusted RSS sources.
        </p>
      </div>

      <div className="mb-5">
        <CategoryTabs activeCategory={type} />
      </div>

      <NewsList
        items={items}
        loading={loading}
        error={error}
        onRetry={() => goToPage(page)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  )
}
