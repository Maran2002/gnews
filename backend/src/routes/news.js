import { Router } from 'express'
import { getPaginatedNews, getItemById, getLastRefreshedAt, searchNews } from '../services/newsCache.js'

const router = Router()

// GET /api/news/search?q=query&page=1&limit=12
router.get('/search', async (req, res) => {
  const q = req.query.q || ''
  const page = Math.max(1, parseInt(req.query.page, 10) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12))
  try {
    const data = await searchNews({ q, page, limit })
    return res.json(data)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// GET /api/news/meta
router.get('/meta', async (_req, res) => {
  try {
    const { total } = await getPaginatedNews({ page: 1, limit: 1 })
    const lastRefreshedAt = await getLastRefreshedAt()
    return res.json({ total, lastRefreshedAt })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// GET /api/news?page=1&limit=12&category=all
router.get('/', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12))
  const category = req.query.category || 'all'
  try {
    const data = await getPaginatedNews({ page, limit, category })
    return res.json(data)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// GET /api/news/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await getItemById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Article not found.' })
    return res.json(item)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

export default router
