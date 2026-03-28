/**
 * GNews Backend — Express server
 */
import express from 'express'
import cors from 'cors'
import { config } from './src/config/index.js'
import { validateClient } from './src/middleware/validateClient.js'
import { connectDB } from './src/config/db.js'

// Routes
import newsRouter from './src/routes/news.js'
import adminRouter from './src/routes/admin.js'
import contactRouter from './src/routes/contact.js'
import cronRouter from './src/routes/cron.js'

const app = express()

// ── Database ──────────────────────────────────────────────────────────────────
// Connect to MongoDB Atlas (handled asynchronously here)
connectDB()

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development and Vercel domains
      if (!origin || config.allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: Origin "${origin}" not allowed`))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-Client-Source', 'Authorization'],
  }),
)

app.use(express.json())

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── API routes ────────────────────────────────────────────────────────────────
// Public / Cron
app.use('/api/cron', cronRouter)

// Protected / Client
app.use('/api/news', validateClient, newsRouter)
app.use('/api/admin', validateClient, adminRouter)
app.use('/api/contact', validateClient, contactRouter)

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message)
  res.status(500).json({ message: 'Internal server error.' })
})

// ── Start (Only if not in Vercel) ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`[Server] GNews backend running on http://localhost:${config.port}`)
  })
}

// Export for Vercel Serverless Functions
export default app
