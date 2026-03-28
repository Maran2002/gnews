import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Admin token required.' })
  }

  try {
    const token = authHeader.slice(7)
    req.admin = jwt.verify(token, config.jwtSecret)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired admin token.' })
  }
}
