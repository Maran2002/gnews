import crypto from 'crypto'
import { CATEGORY_MAP } from '../constants/feeds.js'

// ── Editorial templates keyed by category (6 per category for uniqueness) ────
const EDITORIAL_TEMPLATES = {
  india: [
    'This national story reflects ongoing developments within India\'s political and social landscape that GNews is tracking closely.',
    'GNews is following this India-focused story as it continues to evolve across multiple regions and communities.',
    'This report highlights a significant domestic development that our editors have flagged as high-interest for Indian readers.',
    'Our editorial team has curated this story given its direct relevance to India\'s governance, society, and daily life.',
    'GNews editors surfaced this story from verified Indian news sources for its potential policy and civic impact.',
    'This article captures a developing situation within India that our desk believes merits sustained reader attention.',
  ],
  world: [
    'GNews is monitoring this international story as it unfolds across global news networks.',
    'This developing world story has cross-border implications that our team continues to evaluate for broader context.',
    'Our editors have surfaced this story from global feeds due to its geopolitical relevance and international significance.',
    'GNews flagged this international report for the scope of its potential impact on global affairs and diplomacy.',
    'This story represents a key international development that our world desk has been actively tracking.',
    'Our editorial team selected this global report for its ability to illustrate shifting dynamics in world politics.',
  ],
  business: [
    'This business and finance story has notable implications for markets and investors that GNews is tracking.',
    'GNews highlighted this economic report for its potential impact on India\'s financial sector and broader economy.',
    'Our editors flagged this business development for its relevance to ongoing market movements and investor sentiment.',
    'GNews has curated this report from financial news sources for its insight into commercial trends and market dynamics.',
    'This story was surfaced by our business desk for its signal value to traders, entrepreneurs, and policy observers.',
    'Our editors selected this economic update for its bearing on consumer prices, employment, and fiscal planning.',
  ],
  technology: [
    'This technology story reflects a notable shift in the digital and innovation landscape tracked by GNews.',
    'GNews is following this tech development for its potential industry-wide implications and consumer impact.',
    'Our editors selected this story for its relevance to the rapidly evolving technology sector and startup ecosystem.',
    'GNews curated this report for readers who follow AI, software, and emerging platform trends closely.',
    'This article captures a structural change in the tech industry that our desk believes will have lasting consequences.',
    'Our technology desk selected this piece for its insight into how innovation is reshaping products and services.',
  ],
  sports: [
    'GNews is covering this sports story as it generates significant public interest across major platforms.',
    'This sports update has been selected by our editors for its relevance to current tournaments and events.',
    'Our sports desk flagged this story given its impact on standings, upcoming fixtures, and athlete performance.',
    'GNews curated this sports report from verified news sources for fans following live coverage and results.',
    'This story was elevated by our editors for its significance to competitive outcomes and sporting milestones.',
    'Our desk selected this sports update because of its resonance with fans across cricket, football, and beyond.',
  ],
  entertainment: [
    'This entertainment story has sparked considerable reader engagement, prompting GNews to feature it prominently.',
    'GNews\'s editors curated this piece from the world of film, music, and celebrity culture for its cultural resonance.',
    'Our entertainment desk highlighted this story for its broad cultural relevance and audience appeal.',
    'GNews selected this report for readers following developments in Bollywood, OTT, and mainstream entertainment.',
    'This article was surfaced by our editors for its entertainment value and insight into the media industry.',
    'Our desk curated this story from entertainment feeds for its ability to capture a moment in popular culture.',
  ],
  health: [
    'GNews is covering this health story for its public interest value and potential wellbeing impact.',
    'Our editors flagged this medical or wellness story given its relevance to ongoing health discourse.',
    'This health-related report has been curated by GNews for its practical significance to readers\' daily lives.',
    'GNews selected this story for readers interested in public health policies, medical research, and wellness advice.',
    'Our health desk surfaced this article for its timeliness and its relevance to prevention and treatment trends.',
    'This report was highlighted by our editors for the clarity with which it communicates complex health information.',
  ],
  science: [
    'This science or environment story represents a noteworthy development that GNews is following with great interest.',
    'GNews curated this science report for its significance to ongoing research, discovery, and environmental policy.',
    'Our editors selected this story for its relevance to scientific progress, space exploration, and climate awareness.',
    'GNews flagged this science story for its potential to reshape how we understand natural systems and technology.',
    'This report was surfaced by our science desk for its contribution to ongoing discourse in research and innovation.',
    'Our editors highlighted this piece for readers who follow ISRO, NASA, climate research, and emerging sciences.',
  ],
  general: [
    'GNews has curated this story from trusted RSS sources for its broad public interest value.',
    'Our editors selected this report as part of GNews\'s commitment to balanced, multi-source news coverage.',
    'This story was surfaced by GNews for its relevance to current events and sustained reader interest.',
    'Our editorial team flagged this piece as a noteworthy development worth tracking across news cycles.',
    'GNews curated this article for readers looking for clear, timely coverage of important current affairs.',
    'Our desk selected this story from verified publishers for its informational value and broad audience relevance.',
  ],
}

// ── "Why This Matters" suffixes keyed by category ─────────────────────────────
const WHY_SUFFIXES = {
  india:         'Understanding this event is key to following India\'s evolving domestic agenda.',
  world:         'Its ripple effects are likely to be felt across multiple regions and international institutions.',
  business:      'Investors and consumers alike should watch how this shapes financial decision-making ahead.',
  technology:    'This development could redefine standards and expectations across the digital industry.',
  sports:        'The outcome of this story will shape the competitive landscape for the season ahead.',
  entertainment: 'Cultural moments like this reflect and influence broader societal tastes and values.',
  health:        'Being informed about this can help readers make better personal health decisions.',
  science:       'Advances like this often take years to reach mainstream impact — but the trajectory starts here.',
  general:       'Staying informed helps readers engage thoughtfully with the events shaping their world.',
}

/**
 * Generate a stable 16-char hex ID from a URL/guid string.
 */
export function generateId(link) {
  return crypto.createHash('sha256').update(link || String(Date.now())).digest('hex').slice(0, 16)
}

/**
 * Resolve the best available image URL from a parsed RSS item.
 * Priority: media:content → media:thumbnail → enclosure → first <img> in HTML
 */
export function extractImage(item) {
  const mediaContent = item['media:content'] || item.mediaContent
  if (mediaContent?.$ ?.url) return mediaContent.$.url
  if (typeof mediaContent === 'string') return mediaContent

  const mediaThumbnail = item['media:thumbnail'] || item.mediaThumbnail
  if (mediaThumbnail?.$ ?.url) return mediaThumbnail.$.url

  if (item.enclosure?.url) return item.enclosure.url

  const html = item.content || item.description || ''
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] || null
}

/**
 * Map raw RSS category strings → our standard category key.
 * Falls back to feedDefaultCategory.
 */
export function resolveCategory(rawCategories = [], feedDefaultCategory = 'india') {
  for (const raw of rawCategories) {
    const lower = raw.toLowerCase()
    for (const { keywords, key } of CATEGORY_MAP) {
      if (keywords.some((kw) => lower.includes(kw))) return key
    }
  }
  return feedDefaultCategory
}

/**
 * Build a deterministic, GNews-authored editorial sentence for a news item.
 * Uses category + item id to pick from 6 unique templates.
 *
 * @param {{ id: string, category: string, source: { name: string } }} item
 * @returns {string}
 */
export function buildEditorialNote(item) {
  const cat = item.category || 'general'
  const templates = EDITORIAL_TEMPLATES[cat] || EDITORIAL_TEMPLATES.general
  // Use last 2 hex chars of id for stable, distributed index selection
  const idxByte = parseInt(item.id.slice(-2), 16) // 0–255
  const template = templates[idxByte % templates.length]
  const source = item.source?.name || 'a trusted publisher'
  return `${template} Originally reported by ${source}.`
}

/**
 * Build a short TL;DR summary for an article.
 * Uses stripped description + a "why this matters" suffix keyed by category.
 * Entirely deterministic — no external API needed.
 *
 * @param {{ id: string, category: string, description: string }} item
 * @returns {string}
 */
export function buildTldr(item) {
  const cat = item.category || 'general'
  // Strip HTML tags from description
  const plainDesc = (item.description || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Take up to 200 chars of the description for the summary
  const summary = plainDesc.length > 200
    ? plainDesc.slice(0, 197).trimEnd() + '…'
    : plainDesc

  const why = WHY_SUFFIXES[cat] || WHY_SUFFIXES.general

  if (!summary) return why
  return `${summary} ${why}`
}

export function normalizeItem(item, feed) {
  const link = item.link || item.guid || ''
  const id = generateId(link)

  const rawCategories = Array.isArray(item.categories) ? item.categories : []
  const category = resolveCategory(rawCategories, feed.defaultCategory)

  const normalized = {
    id,
    title: (item.title || '').trim(),
    description: item.description || item.contentSnippet || '',
    content: item['content:encoded'] || item.content || item.description || '',
    imageUrl: extractImage(item),
    category,
    source: {
      name: feed.sourceName,
      url: feed.sourceUrl,
    },
    publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    link,
  }

  // Attach GNews editorial note — signals curated value to Google
  normalized.editorialNote = buildEditorialNote(normalized)

  // Attach TL;DR — quick summary with "why this matters" context
  normalized.tldr = buildTldr(normalized)

  return normalized
}
