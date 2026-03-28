/**
 * Format an ISO date string to a human-readable relative or absolute form.
 */
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Truncate text to a given character length.
 */
export function truncate(text, maxLength = 120) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '…' : text
}

/**
 * Strip HTML tags from a string (useful for RSS description fields).
 */
export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Estimate reading time for a block of HTML or plain text.
 * Assumes an average reading speed of 200 words per minute.
 * @param {string} html
 * @returns {number} minutes (minimum 1)
 */
export function readingTime(html = '') {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
