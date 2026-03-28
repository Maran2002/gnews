import { Inbox } from 'lucide-react'

export default function EmptyState({ message = 'No news found for this category.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <Inbox size={48} className="text-gray-300 mb-4" strokeWidth={1.5} />
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Nothing here yet</h2>
      <p className="text-sm text-gray-500 max-w-sm">{message}</p>
    </div>
  )
}
