import mongoose from 'mongoose'
import { config } from './index.js'

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  try {
    if (!config.mongodbUri) {
      throw new Error('MONGODB_URI is missing from configuration.')
    }
    const conn = await mongoose.connect(config.mongodbUri)
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`[Database] Error: ${error.message}`)
    // On Vercel, we might not want to exit the process, but locally we should.
    if (!process.env.VERCEL) {
      process.exit(1)
    }
  }
}
