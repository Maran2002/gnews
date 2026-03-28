/**
 * Admin routes — protected by requireAdmin middleware.
 *
 * POST    /api/admin/login             — authenticate, returns JWT
 * GET     /api/admin/news              — list custom news items
 * POST    /api/admin/news              — create custom news item
 * PUT     /api/admin/news/:id          — update custom news item
 * DELETE  /api/admin/news/:id          — delete custom news item
 * GET     /api/admin/contacts          — list contact submissions
 * PATCH   /api/admin/contacts/:id/read  — mark contact as read
 * DELETE  /api/admin/contacts/:id      — delete contact submission
 */
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { config } from '../config/index.js'
import { requireAdmin } from '../middleware/authMiddleware.js'
import { NewsItem } from '../models/NewsItem.js'
import { Contact } from '../models/Contact.js'

const router = Router()

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (username !== config.adminUsername || password !== config.adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }
  const token = jwt.sign({ role: 'admin', username }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  })
  return res.json({ token })
})

// ── Custom News CRUD ──────────────────────────────────────────────────────────

router.get('/news', requireAdmin, async (_req, res) => {
  try {
    const items = await NewsItem.find({ isCustom: true }).sort({ publishedAt: -1 })
    return res.json(items)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.post('/news', requireAdmin, async (req, res) => {
  const { title, description, content, imageUrl, category, sourceUrl, sourceName, link } = req.body || {}
  if (!title?.trim() || !link?.trim() || !sourceName?.trim()) {
    return res.status(400).json({ message: 'title, link and sourceName are required.' })
  }

  const id = crypto.randomBytes(8).toString('hex')
  const newItem = new NewsItem({
    id,
    title: title.trim(),
    description: description || '',
    content: content || description || '',
    imageUrl: imageUrl || null,
    category: category || 'india',
    source: { name: sourceName.trim(), url: sourceUrl || '' },
    publishedAt: new Date().toISOString(),
    link: link.trim(),
    isCustom: true,
  })

  try {
    await newItem.save()
    return res.status(201).json(newItem)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.put('/news/:id', requireAdmin, async (req, res) => {
  try {
    const item = await NewsItem.findOne({ id: req.params.id })
    if (!item) return res.status(404).json({ message: 'Item not found.' })

    const { title, description, content, imageUrl, category, sourceUrl, sourceName, link } = req.body || {}
    
    if (title) item.title = title.trim()
    if (description !== undefined) item.description = description
    if (content !== undefined) item.content = content
    if (imageUrl !== undefined) item.imageUrl = imageUrl
    if (category) item.category = category
    if (link) item.link = link.trim()
    
    if (sourceName || sourceUrl !== undefined) {
      item.source = {
        name: sourceName?.trim() || item.source?.name,
        url: sourceUrl ?? item.source?.url,
      }
    }

    await item.save()
    return res.json(item)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.delete('/news/:id', requireAdmin, async (req, res) => {
  try {
    const result = await NewsItem.deleteOne({ id: req.params.id })
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Item not found.' })
    return res.json({ message: 'Deleted.' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// ── Contact Submissions ───────────────────────────────────────────────────────

router.get('/contacts', requireAdmin, async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return res.json(contacts)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.patch('/contacts/:id/read', requireAdmin, async (req, res) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id })
    if (!contact) return res.status(404).json({ message: 'Not found.' })

    contact.read = true
    await contact.save()
    return res.json(contact)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.delete('/contacts/:id', requireAdmin, async (req, res) => {
  try {
    const result = await Contact.deleteOne({ id: req.params.id })
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found.' })
    return res.json({ message: 'Deleted.' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

export default router
