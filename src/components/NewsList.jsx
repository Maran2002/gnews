import NewsCard from './NewsCard'
import AdSlot from './AdSlot'
import { SkeletonGrid } from './SkeletonCard'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'

/**
 * NewsList – renders the news grid with skeleton, error, and empty states.
 * Injects an in-feed ad every N cards.
 */
const AD_EVERY_N = 8

export default function NewsList({ items, loading, error, onRetry }) {
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (!items?.length) return <EmptyState />

  const rows = []
  items.forEach((item, idx) => {
    rows.push(<NewsCard key={item.id} item={item} />)
    if ((idx + 1) % AD_EVERY_N === 0 && idx + 1 < items.length) {
      rows.push(
        <div key={`ad-${idx}`} className="col-span-full">
          <AdSlot variant="in-feed" />
        </div>,
      )
    }
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {rows}
    </div>
  )
}
