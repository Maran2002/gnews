import { Helmet } from 'react-helmet-async'
import { APP_NAME } from '@/constants'

/**
 * useSEO — returns a <Helmet> element that sets document <head> metadata.
 *
 * Switch from the old useEffect/document.title approach so that:
 *  1. Titles and meta descriptions are set in the React tree (SSR-ready).
 *  2. react-helmet-async batches and deduplicates all Helmet instances.
 *  3. Google can see unique per-page titles even before JS hydration
 *     when paired with a prerendering step.
 *
 * Usage:
 *   const seo = useSEO({ title: item.title, description: item.description })
 *   return <article>{seo} … </article>
 *
 * @param {{ title?: string, description?: string, image?: string, url?: string, type?: string }} opts
 * @returns {JSX.Element}
 */
export function useSEO({ title, description, image, url, type = 'article' } = {}) {
  const fullTitle = title
    ? `${title} | ${APP_NAME}`
    : `${APP_NAME} – Latest News & Headlines`

  const metaDesc =
    description ||
    `${APP_NAME} – Stay informed with the latest breaking news and headlines.`

  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
