import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '@/constants'

/**
 * CategoryTabs – horizontal scrolling tab strip.
 * @param {string} activeCategory - currently active category key
 */
export default function CategoryTabs({ activeCategory = 'all' }) {
  const navigate = useNavigate()

  function handleSelect(key) {
    navigate(key === 'all' ? '/' : `/category/${key}`)
  }

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex gap-2 min-w-max px-1">
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === activeCategory
          return (
            <button
              key={cat.key}
              onClick={() => handleSelect(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 ${
                isActive
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
              }`}
              aria-pressed={isActive}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
