import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Clock, BookOpen, Zap, Quote } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'
import { getNewsById } from '@/services/newsService'
import { formatDate, stripHtml, readingTime } from '@/utils/formatters'
import ErrorState from '@/components/ErrorState'
import AdSlot from '@/components/AdSlot'
import RelatedArticles from '@/components/RelatedArticles'
import { APP_NAME } from '@/constants'

// ── Article Skeleton ──────────────────────────────────────────────────────────
function ArticleSkeleton() {
  return (
    <article className="max-w-3xl mx-auto animate-pulse" aria-busy="true" aria-label="Loading article">
      {/* Back link placeholder */}
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />

      {/* Category badge */}
      <div className="h-5 w-20 bg-gray-200 rounded-full mb-3" />

      {/* Title */}
      <div className="space-y-2 mb-4">
        <div className="h-7 bg-gray-200 rounded w-full" />
        <div className="h-7 bg-gray-200 rounded w-5/6" />
        <div className="h-7 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Meta row */}
      <div className="flex gap-4 mb-6">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>

      {/* Hero image */}
      <div className="h-64 sm:h-80 bg-gray-200 rounded-xl mb-6" />

      {/* TL;DR box */}
      <div className="h-24 bg-gray-100 rounded-xl mb-6" />

      {/* Body paragraphs */}
      <div className="space-y-3">
        {[100, 90, 95, 85, 92, 75, 88].map((w, i) => (
          <div key={i} className={`h-4 bg-gray-200 rounded`} style={{ width: `${w}%` }} />
        ))}
      </div>
    </article>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NewsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setItem(null)

    getNewsById(id)
      .then((data) => { if (!cancelled) setItem(data) })
      .catch((err) => {
        if (!cancelled)
          setError(err?.response?.data?.message || 'Could not load this article.')
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id])

  // SEO — renders into <head> via HelmetProvider (now properly wired in App.jsx)
  const seo = useSEO({
    title: item?.title,
    description: item?.description ? stripHtml(item.description).slice(0, 155) : undefined,
    image: item?.imageUrl,
    type: 'article',
  })

  if (loading) return <ArticleSkeleton />
  if (error) return <ErrorState message={error} onRetry={() => navigate(0)} />

  const { title, content, description, imageUrl, category, source, publishedAt, link, editorialNote, tldr } = item
  const bodyHtml = content || description || ''
  const mins = readingTime(bodyHtml)

  // Inject in-article ad after the first paragraph for best viewability
  const injectInArticleAd = (html) => {
    const firstClose = html.indexOf('</p>')
    if (firstClose === -1) return html
    const cutAt = firstClose + 4 // after </p>
    const AD_MARKER = '__AD_MARKER__'
    return html.slice(0, cutAt) + AD_MARKER + html.slice(cutAt)
  }

  const markedHtml = injectInArticleAd(bodyHtml)
  const [beforeAd, afterAd] = markedHtml.split('__AD_MARKER__')

  return (
    <article className="max-w-3xl mx-auto">
      {seo}

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 flex-wrap">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        {category && (
          <>
            <Link
              to={`/category/${category}`}
              className="hover:text-red-600 transition-colors capitalize"
            >
              {category}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span className="text-gray-600 line-clamp-1 max-w-xs" aria-current="page">
          {title}
        </span>
      </nav>

      {/* ── Category badge ─────────────────────────────────────────────────── */}
      {category && (
        <Link
          to={`/category/${category}`}
          className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize mb-3 hover:bg-red-200 transition-colors"
        >
          {category}
        </Link>
      )}

      {/* ── Title ──────────────────────────────────────────────────────────── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
        {title}
      </h1>

      {/* ── Meta row (source · date · reading time) ────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6 text-sm text-gray-500">
        {source?.name && (
          <span className="font-medium text-gray-700">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                {source.name}
              </a>
            ) : (
              source.name
            )}
          </span>
        )}
        {publishedAt && (
          <time className="flex items-center gap-1" dateTime={publishedAt}>
            <Clock size={13} aria-hidden="true" />
            {formatDate(publishedAt)}
          </time>
        )}
        <span className="flex items-center gap-1 text-gray-400">
          <BookOpen size={13} aria-hidden="true" />
          {mins} min read
        </span>
      </div>

      {/* ── Hero image ─────────────────────────────────────────────────────── */}
      {imageUrl && (
        <figure className="mb-6 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full max-h-96 object-cover"
            loading="eager"
          />
        </figure>
      )}

      {/* ── TL;DR Quick Summary ────────────────────────────────────────────── */}
      {tldr && (
        <aside
          className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
          aria-label="Quick summary"
        >
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
            <Zap size={15} aria-hidden="true" />
            Quick Summary (TL;DR)
          </div>
          <p className="text-sm text-blue-800 leading-relaxed">{tldr}</p>
        </aside>
      )}

      {/* ── Article body (first part, before in-article ad) ────────────────── */}
      {beforeAd && (
        <div
          className="prose prose-gray prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: beforeAd }}
        />
      )}

      {/* ── In-article ad — 3 of 3 max slots ──────────────────────────────── */}
      {bodyHtml && (
        <div className="my-6">
          <AdSlot variant="in-article" adSlot="6239641370" />
        </div>
      )}

      {/* ── Article body (second part, after in-article ad) ────────────────── */}
      {afterAd ? (
        <div
          className="prose prose-gray prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: afterAd }}
        />
      ) : (
        // Fallback: if body had no paragraphs, render full body without split
        !beforeAd && bodyHtml && (
          <div
            className="prose prose-gray prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )
      )}

      {/* ── GNews Editorial Note ───────────────────────────────────────────── */}
      {editorialNote && (
        <aside
          className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl"
          aria-label="GNews editorial note"
        >
          <div className="flex items-center gap-2 text-gray-600 font-semibold text-xs uppercase tracking-wide mb-2">
            <Quote size={13} aria-hidden="true" />
            GNews Editorial
          </div>
          <p className="text-sm text-gray-600 leading-relaxed italic">{editorialNote}</p>
        </aside>
      )}

      {/* ── Source attribution ─────────────────────────────────────────────── */}
      <aside className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <p>
          <strong>Attribution:</strong> This content is sourced from{' '}
          <strong>{source?.name || 'the original publisher'}</strong>. It is aggregated via RSS
          and displayed here for informational purposes only. {APP_NAME} does not claim
          ownership of this content.
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-semibold text-amber-900 hover:underline"
          >
            Read the original article <ExternalLink size={13} aria-hidden="true" />
          </a>
        )}
      </aside>

      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to headlines
        </Link>
      </div>

      {/* ── Related Articles ───────────────────────────────────────────────── */}
      {category && (
        <RelatedArticles category={category} currentId={id} />
      )}
    </article>
  )
}
