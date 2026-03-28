import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageList(page, totalPages)

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-10 flex-wrap"
      aria-label="Pagination"
    >
      <PageBtn
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        label="Previous page"
      >
        <ChevronLeft size={16} />
      </PageBtn>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="px-3 py-1.5 text-sm text-gray-400 select-none">
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            onClick={() => onPageChange(p)}
            active={p === page}
            label={`Page ${p}`}
          >
            {p}
          </PageBtn>
        ),
      )}

      <PageBtn
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        label="Next page"
      >
        <ChevronRight size={16} />
      </PageBtn>
    </nav>
  )
}

function PageBtn({ children, onClick, disabled, active, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`min-w-9 h-9 px-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-colors
        ${active ? 'bg-red-600 text-white' : ''}
        ${!active && !disabled ? 'text-gray-700 hover:bg-gray-100' : ''}
        ${disabled ? 'text-gray-300 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (current > 3) pages.push('…')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p)
  }
  if (current < total - 2) pages.push('…')
  pages.push(total)
  return pages
}
