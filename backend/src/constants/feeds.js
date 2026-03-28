/**
 * RSS feed registry.
 * Each feed declares its URL, publisher info, and default category
 * (used as fallback when the feed item carries no <category> tag).
 */
export const RSS_FEEDS = [
  {
    url: 'https://www.thehindu.com/news/national/feeder/default.rss',
    sourceName: 'The Hindu',
    sourceUrl: 'https://www.thehindu.com',
    defaultCategory: 'india',
  },
  {
    url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    sourceName: 'Times of India',
    sourceUrl: 'https://timesofindia.indiatimes.com',
    defaultCategory: 'world',
  },
  {
    url: 'http://feeds.feedburner.com/ndtvnews-latest',
    sourceName: 'NDTV',
    sourceUrl: 'https://www.ndtv.com',
    defaultCategory: 'india',
  },
  {
    url: 'https://indianexpress.com/feed/',
    sourceName: 'Indian Express',
    sourceUrl: 'https://indianexpress.com',
    defaultCategory: 'india',
  },
  {
    url: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms',
    sourceName: 'Economic Times',
    sourceUrl: 'https://economictimes.indiatimes.com',
    defaultCategory: 'business',
  },
]

/**
 * Maps raw RSS <category> strings → our standard category keys.
 * Matching is case-insensitive, first-match wins.
 */
export const CATEGORY_MAP = [
  { keywords: ['national', 'india', 'politics', 'delhi', 'government', 'election'], key: 'india' },
  { keywords: ['world', 'international', 'global', 'foreign'], key: 'world' },
  { keywords: ['business', 'economy', 'finance', 'market', 'stocks', 'sensex', 'nifty', 'rupee', 'gdp'], key: 'business' },
  { keywords: ['technology', 'tech', 'gadgets', 'internet', 'ai', 'startup', 'apps'], key: 'technology' },
  { keywords: ['sports', 'cricket', 'football', 'tennis', 'ipl', 'fifa', 'olympics'], key: 'sports' },
  { keywords: ['entertainment', 'bollywood', 'movies', 'film', 'celebrity', 'music', 'ott'], key: 'entertainment' },
  { keywords: ['health', 'medical', 'disease', 'hospital', 'wellness', 'covid'], key: 'health' },
  { keywords: ['science', 'space', 'isro', 'nasa', 'environment', 'climate', 'research'], key: 'science' },
]
