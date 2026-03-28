import { Router } from 'express'
import { refresh } from '../services/newsCache.js'
import { config } from '../config/index.js'

const router = Router()

/**
 * GET /api/cron/refresh
 * Triggered by Vercel Cron.
 * Protected by CRON_SECRET header.
 */
router.get('/refresh', async (req, res) => {
  const authHeader = req.headers.authorization

  // Vercel Cron sends "Bearer <token>"
  if (authHeader !== `Bearer ${config.cronSecret}`) {
    console.warn('[Cron] Unauthorized attempt to trigger refresh.')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  console.log('[Cron] Refresh triggered.')
  
  // Respond immediately to Vercel (so the function doesn't time out)
  // but continue the refresh in the "background" if the platform allows,
  // or wait if it's a short task.
  // On Vercel, the function closes when the response is sent.
  // So we MUST await here if we want it to finish.
  try {
    await refresh()
    return res.json({ message: 'Refresh successful.' })
  } catch (err) {
    console.error('[Cron] Refresh failed:', err.message)
    return res.status(500).json({ message: 'Refresh failed.' })
  }
})

export default router
