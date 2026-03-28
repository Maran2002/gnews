/**
 * validateClient.js — Middleware to verify frontend identity.
 *
 * Checks that every API request carries the X-Client-Source header
 * matching EXPECTED_CLIENT_SOURCE from env.
 *
 * This ensures only the GNews frontend (or trusted clients)
 * can call the backend API.
 */
import { config } from '../config/index.js'

export function validateClient(req, res, next) {
  const clientSource = req.headers['x-client-source']

  if (!clientSource) {
    return res.status(403).json({ message: 'Missing X-Client-Source header.' })
  }

  if (clientSource !== config.expectedClientSource) {
    return res.status(403).json({ message: 'Unrecognized client source.' })
  }

  next()
}
