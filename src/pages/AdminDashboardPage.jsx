import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Newspaper, LogOut, Plus, Pencil, Trash2, CheckCheck,
  Mail, RefreshCw, X, Save, LayoutDashboard, ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import {
  getAdminNews, createNewsItem, updateNewsItem, deleteNewsItem,
  getContacts, markContactRead, deleteContact,
} from '@/services/adminService'
import { CATEGORIES, APP_NAME } from '@/constants'
import { formatDate } from '@/utils/formatters'

// ── Tab constants ─────────────────────────────────────────────────────────────
const TABS = [
  { key: 'news', label: 'Custom News', icon: Newspaper },
  { key: 'contacts', label: 'Advertiser Contacts', icon: Mail },
]

const NEWS_CATEGORIES = CATEGORIES.filter((c) => c.key !== 'all')

const EMPTY_FORM = {
  title: '', description: '', content: '', imageUrl: '',
  category: 'india', sourceName: '', sourceUrl: '', link: '',
}

export default function AdminDashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('news')

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <LayoutDashboard size={18} className="text-red-600" />
            {APP_NAME} Admin
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {tab === 'news' && <NewsPanel />}
        {tab === 'contacts' && <ContactsPanel />}
      </div>
    </div>
  )
}

// ── News Panel ────────────────────────────────────────────────────────────────

function NewsPanel() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | { mode: 'add'|'edit', item? }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await getAdminNews())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete(id) {
    if (!window.confirm('Delete this news item?')) return
    await deleteNewsItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function handleSaved(item, mode) {
    if (mode === 'add') {
      setItems((prev) => [item, ...prev])
    } else {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
    }
    setModal(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Custom News <span className="text-gray-400 font-normal text-sm ml-1">({items.length})</span>
        </h2>
        <button
          onClick={() => setModal({ mode: 'add' })}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={15} />
          Add Article
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="w-6 h-6 border-2 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No custom news items yet. Add one to get started.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Source</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-red-500 truncate block max-w-xs"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="capitalize text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500">{item.source?.name}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {formatDate(item.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => setModal({ mode: 'edit', item })}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <NewsModal
          mode={modal.mode}
          item={modal.item}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}

// ── News Modal (Add / Edit) ───────────────────────────────────────────────────

function NewsModal({ mode, item, onClose, onSaved }) {
  const [form, setForm] = useState(
    mode === 'edit' && item
      ? {
          title: item.title || '',
          description: item.description || '',
          content: item.content || '',
          imageUrl: item.imageUrl || '',
          category: item.category || 'india',
          sourceName: item.source?.name || '',
          sourceUrl: item.source?.url || '',
          link: item.link || '',
        }
      : EMPTY_FORM,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'add') {
        const created = await createNewsItem(form)
        onSaved(created, 'add')
      } else {
        const updated = await updateNewsItem(item.id, form)
        onSaved(updated, 'edit')
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 z-10">
          <h2 className="font-semibold text-gray-900 text-base">
            {mode === 'add' ? 'Add Article' : 'Edit Article'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <ModalField label="Title" required>
            <input name="title" value={form.title} onChange={handleChange} required className={inputCls} placeholder="Article headline" />
          </ModalField>

          <ModalField label="Original Article Link" required>
            <input name="link" value={form.link} onChange={handleChange} required className={inputCls} placeholder="https://publisher.com/article" />
          </ModalField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ModalField label="Source Name" required>
              <input name="sourceName" value={form.sourceName} onChange={handleChange} required className={inputCls} placeholder="The Hindu" />
            </ModalField>
            <ModalField label="Source URL">
              <input name="sourceUrl" value={form.sourceUrl} onChange={handleChange} className={inputCls} placeholder="https://thehindu.com" />
            </ModalField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ModalField label="Category">
              <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </ModalField>
            <ModalField label="Image URL">
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputCls} placeholder="https://…/image.jpg" />
            </ModalField>
          </div>

          <ModalField label="Summary / Description">
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} placeholder="Brief article summary" />
          </ModalField>

          <ModalField label="Full Content (HTML or plain text)">
            <textarea name="content" value={form.content} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} placeholder="Full article body (optional)" />
          </ModalField>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors"
            >
              {loading ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
              {mode === 'add' ? 'Publish' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Contacts Panel ────────────────────────────────────────────────────────────

function ContactsPanel() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setContacts(await getContacts())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleMarkRead(id) {
    const updated = await markContactRead(id)
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)))
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this contact submission?')) return
    await deleteContact(id)
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  const unread = contacts.filter((c) => !c.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Advertiser Contacts{' '}
          {unread > 0 && (
            <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unread} new
            </span>
          )}
        </h2>
        <button
          onClick={load}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="w-6 h-6 border-2 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No inquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-xl border shadow-sm transition-all ${
                !c.read ? 'border-red-200' : 'border-gray-100'
              }`}
            >
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!c.read && (
                    <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" aria-label="Unread" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.email} {c.company && `· ${c.company}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-xs text-gray-400 hidden sm:block">{formatDate(c.createdAt)}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${expanded === c.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {expanded === c.id && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                    <span><strong>Email:</strong> {c.email}</span>
                    {c.company && <span><strong>Company:</strong> {c.company}</span>}
                    {c.phone && <span><strong>Phone:</strong> {c.phone}</span>}
                    <span><strong>Received:</strong> {new Date(c.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {c.message}
                  </div>
                  <div className="flex gap-2">
                    {!c.read && (
                      <button
                        onClick={() => handleMarkRead(c.id)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <CheckCheck size={12} />
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const inputCls =
  'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition bg-white'

function ModalField({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}
