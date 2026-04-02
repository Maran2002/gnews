import { Link } from 'react-router-dom'
import { Clock, ExternalLink, Newspaper } from 'lucide-react'
import { formatDate, truncate, stripHtml } from '@/utils/formatters'

export default function NewsCard({ item }) {
  const { id, title, description, imageUrl, category, source, publishedAt } = item
  const cleanDescription = stripHtml(description)

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Thumbnail */}
      <Link to={`/news/${id}`} aria-label={title} tabIndex={-1}>
        <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover img-lazy group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Newspaper size={48} strokeWidth={1} />
            </div>
          )}
          {category && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
              {category}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        {source?.name && (
          <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
            {source.name}
          </span>
        )}

        <h2 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          <Link to={`/news/${id}`} className="hover:text-red-600 transition-colors">
            {title}
          </Link>
        </h2>

        {cleanDescription && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {truncate(cleanDescription, 100)}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
          <time
            className="flex items-center gap-1 text-xs text-gray-400"
            dateTime={publishedAt}
          >
            <Clock size={11} />
            {formatDate(publishedAt)}
          </time>

          {source?.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
              aria-label={`Visit ${source.name}`}
            >
              Source <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
