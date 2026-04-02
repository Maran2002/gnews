import { parseAllFeeds } from './rssParser.js'
import { RSS_FEEDS } from '../constants/feeds.js'
import { NewsItem } from '../models/NewsItem.js'

// ── Internal Helper ───────────────────────────────────────────────────────────

/**
 * Fetches all RSS feeds on the fly and merges them with Custom DB news.
 * Returning a freshly parsed array sorted by publishedAt.
 */
async function getAllNews() {
  try {
    // Isolate DB query so its failure doesn't block RSS feeds
    const customItemsPromise = NewsItem.find({ isCustom: true }).lean().catch(err => {
      console.warn('[Cache] Could not fetch custom DB news (DB offline/timeout):', err.message)
      return []
    })

    const [rssItems, customItems] = await Promise.all([
      parseAllFeeds(RSS_FEEDS),
      customItemsPromise
    ])

    // Merge and sort in-memory (descending by publishedAt)
    return [...rssItems, ...customItems].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (err) {
    console.error('[Cache] getAllNews failed:', err.message)
    return []
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function getPaginatedNews({ page = 1, limit = 12, category = 'all' }) {
  try {
    let items = await getAllNews()

    if (category !== 'all') {
      items = items.filter(item => item.category === category)
    }

    const total = items.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const skip = (safePage - 1) * limit

    const paginatedItems = items.slice(skip, skip + limit)

    return { items: paginatedItems, total, page: safePage, totalPages }
  } catch (err) {
    console.error('[Cache] getPaginatedNews failed:', err.message)
    return { items: [], total: 0, page: 1, totalPages: 1 }
  }
}

export async function searchNews({ q = '', page = 1, limit = 12 }) {
  const lower = q.toLowerCase().trim()
  if (!lower) return { items: [], total: 0, page: 1, totalPages: 0 }

  try {
    let items = await getAllNews()
    
    // In-memory case-insensitive search matching the old MongoDB $or query
    items = items.filter(item => 
      (item.title && item.title.toLowerCase().includes(lower)) ||
      (item.description && item.description.toLowerCase().includes(lower)) ||
      (item.source?.name && item.source.name.toLowerCase().includes(lower)) ||
      (item.category && item.category.toLowerCase().includes(lower))
    )

    const total = items.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const skip = (safePage - 1) * limit

    const paginatedItems = items.slice(skip, skip + limit)

    return { items: paginatedItems, total, page: safePage, totalPages, query: q }
  } catch (err) {
    console.error('[Cache] searchNews failed:', err.message)
    return { items: [], total: 0, page: 1, totalPages: 1, query: q }
  }
}

export async function getItemById(id) {
  try {
    // Find item dynamically from the fresh feeds or DB custom news
    const items = await getAllNews()
    const item = items.find(item => item.id === id)
    return item || null
  } catch (err) {
    return null
  }
}

export async function getLastRefreshedAt() {
  // We fetch directly on request, so data is always 'fresh' to the current time, 
  // though Edge Cache controls the actual age.
  return new Date().toISOString()
}
