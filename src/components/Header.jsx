import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Newspaper } from 'lucide-react'
import { APP_NAME, CATEGORIES } from '@/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function handleSearch(e) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    setMenuOpen(false)
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xl font-bold text-red-600 tracking-tight shrink-0"
          >
            <Newspaper size={22} strokeWidth={2.5} />
            {APP_NAME}
          </Link>

          {/* Desktop category nav */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto flex-1 justify-center">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.key}
                to={cat.key === 'all' ? '/' : `/category/${cat.key}`}
                end={cat.key === 'all'}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Inline search (desktop) */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-1">
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search news…"
                  className="w-52 h-8 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
                />
                <button
                  type="submit"
                  className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Submit search"
                >
                  <Search size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600"
                  aria-label="Close search"
                >
                  <X size={17} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Open search"
              >
                <Search size={18} />
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news…"
              className="flex-1 h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
            />
            <button
              type="submit"
              className="px-3 h-9 bg-red-600 text-white rounded-lg text-sm font-medium"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setMenuOpen(false)
                  navigate(cat.key === 'all' ? '/' : `/category/${cat.key}`)
                }}
                className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
