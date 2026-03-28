/**
 * Contact / Become an Advertiser form submission.
 * POST /api/contact
 */
import { Router } from 'express'
import crypto from 'crypto'
import { Contact } from '../models/Contact.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, company, phone, subject, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'name, email and message are required.' })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' })
  }

  const entry = new Contact({
    id: crypto.randomBytes(8).toString('hex'),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company?.trim() || '',
    phone: phone?.trim() || '',
    subject: subject?.trim() || '',
    message: message.trim(),
  })

  try {
    await entry.save()
    return res.status(201).json({ message: 'Thank you! We will get back to you shortly.' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

export default router
