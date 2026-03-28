import { parseAllFeeds } from './rssParser.js'
import { RSS_FEEDS } from '../constants/feeds.js'
import { NewsItem } from '../models/NewsItem.js'

let isRefreshing = false

// ── Public API ───────────────────────────────────────────────────────────────

export async function getPaginatedNews({ page = 1, limit = 12, category = 'all' }) {
  const query = category === 'all' ? {} : { category }
  
  try {
    const total = await NewsItem.countDocuments(query)
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const skip = (safePage - 1) * limit

    const items = await NewsItem.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)

    return { items, total, page: safePage, totalPages }
  } catch (err) {
    console.error('[Cache] getPaginatedNews failed:', err.message)
    return { items: [], total: 0, page: 1, totalPages: 1 }
  }
}

export async function searchNews({ q = '', page = 1, limit = 12 }) {
  const lower = q.toLowerCase().trim()
  if (!lower) return { items: [], total: 0, page: 1, totalPages: 0 }

  const query = {
    $or: [
      { title: { $regex: lower, $options: 'i' } },
      { description: { $regex: lower, $options: 'i' } },
      { 'source.name': { $regex: lower, $options: 'i' } },
      { category: { $regex: lower, $options: 'i' } },
    ],
  }

  try {
    const total = await NewsItem.countDocuments(query)
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const skip = (safePage - 1) * limit

    const items = await NewsItem.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)

    return { items, total, page: safePage, totalPages, query: q }
  } catch (err) {
    console.error('[Cache] searchNews failed:', err.message)
    return { items: [], total: 0, page: 1, totalPages: 1, query: q }
  }
}

export async function getItemById(id) {
  try {
    return await NewsItem.findOne({ id })
  } catch (err) {
    return null
  }
}

export async function getLastRefreshedAt() {
  try {
    const lastItem = await NewsItem.findOne().sort({ updatedAt: -1 })
    return lastItem ? lastItem.updatedAt.toISOString() : null
  } catch (err) {
    return null
  }
}

// ── Internal ─────────────────────────────────────────────────────────────────

export async function refresh() {
  if (isRefreshing) return
  isRefreshing = true

  console.log('[Cache] Refreshing feeds…')
  const start = Date.now()

  try {
    const freshItems = await parseAllFeeds(RSS_FEEDS)
    
    // Bulk upsert items
    const operations = freshItems.map((item) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true,
      },
    }))

    if (operations.length > 0) {
      const result = await NewsItem.bulkWrite(operations)
      console.log(`[Cache] Refresh complete — ${result.upsertedCount} new, ${result.modifiedCount} updated (${Date.now() - start}ms)`)
    } else {
      console.log(`[Cache] No items fetched from feeds.`)
    }
  } catch (err) {
    console.error('[Cache] Refresh failed:', err.message)
  } finally {
    isRefreshing = false
  }
}

// Removed: startScheduler and syncCustomNews (handled by Vercel Cron and DB persistence)
