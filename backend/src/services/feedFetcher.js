/**
 * feedFetcher.js — HTTP client for fetching external RSS feeds.
 *
 * Identity: SERVER_SOURCE_NAME (via config.serverSourceName)
 * Used as User-Agent / X-Server-Source when calling external RSS endpoints.
 *
 * ⚠️  This identity is backend-only.
 *      It must NEVER be sent to the frontend or included in API responses.
 */
import axios from 'axios'
import { config } from '../config/index.js'

const rssHttpClient = axios.create({
  timeout: 12000,
  headers: {
    // Server → RSS feed identity
    'User-Agent': config.serverSourceName,
    'X-Server-Source': config.serverSourceName,
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
})

/**
 * Fetch raw XML string from an RSS feed URL.
 * @param {string} url
 * @returns {Promise<string>} raw XML
 */
export async function fetchFeedXML(url) {
  const response = await rssHttpClient.get(url, { responseType: 'text' })
  return response.data
}
