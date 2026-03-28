export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3" role="status" aria-label={label}>
      <div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}
