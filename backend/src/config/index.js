import 'dotenv/config'

export const config = {
  port: parseInt(process.env.PORT, 10),
  serverSourceName: process.env.SERVER_SOURCE_NAME,
  expectedClientSource: process.env.EXPECTED_CLIENT_SOURCE,
  allowedOrigins: (process.env.ALLOWED_ORIGINS)
    .split(',')
    .map((o) => o.trim()),
  feedRefreshMinutes: parseInt(process.env.FEED_REFRESH_MINUTES, 10),

  // Admin
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  
  // Database & Vercel
  mongodbUri: process.env.MONGODB_URI,
  cronSecret: process.env.CRON_SECRET,
}

// ── Validation ────────────────────────────────────────────────────────────────
if (!config.mongodbUri) {
  throw new Error('CONFIG ERROR: MONGODB_URI is not defined in .env file.')
}
if (!config.cronSecret) {
  console.warn('[Config] WARNING: CRON_SECRET is not defined. Cron refresh will be insecure.')
}
