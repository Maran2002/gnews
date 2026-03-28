/**
 * rssParser.js — Parse raw RSS XML into normalized NewsItems.
 *
 * Uses rss-parser with extended namespace support for:
 *   - media:content / media:thumbnail (images)
 *   - content:encoded (full article HTML)
 *   - dc:creator (author)
 */
import Parser from 'rss-parser'
import { fetchFeedXML } from './feedFetcher.js'
import { normalizeItem } from '../utils/normalizer.js'

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
      ['content:encoded', 'content:encoded'],
      ['dc:creator', 'dc:creator'],
    ],
  },
})

/**
 * Fetch and parse a single RSS feed.
 * @param {{ url, sourceName, sourceUrl, defaultCategory }} feed
 * @returns {Promise<NewsItem[]>} normalized items
 */
export async function parseFeed(feed) {
  const xml = await fetchFeedXML(feed.url)
  const parsed = await parser.parseString(xml)
  return (parsed.items || []).map((item) => normalizeItem(item, feed))
}

export async function parseAllFeeds(feeds) {
  const results = await Promise.allSettled(feeds.map((feed) => parseFeed(feed)))

  const allItems = []
  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value)
    } else {
      console.warn(`[RSS] Failed to fetch "${feeds[idx].sourceName}":`, result.reason?.message)
    }
  })

  return allItems
}
