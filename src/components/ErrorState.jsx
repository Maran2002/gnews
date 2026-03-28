import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <AlertTriangle size={48} className="text-amber-400 mb-4" strokeWidth={1.5} />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  )
}
