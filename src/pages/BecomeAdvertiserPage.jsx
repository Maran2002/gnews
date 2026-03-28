import { useState } from 'react'
import { Megaphone, Send, CheckCircle, Mail, User, Building2, Phone, MessageSquare } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'
import { submitContactForm } from '@/services/contactService'
import { APP_NAME } from '@/constants'

const EMPTY = { name: '', email: '', company: '', phone: '', message: '' }

export default function BecomeAdvertiserPage() {
  const seo = useSEO({
    title: 'Become an Advertiser',
    description: `Advertise on ${APP_NAME} and reach millions of engaged news readers.`,
    type: 'website',
  })

  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await submitContactForm(form)
      setSuccess(true)
      setForm(EMPTY)
    } catch (err) {
      setError(err?.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {seo}
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 text-red-600 rounded-full mb-4">
          <Megaphone size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Become an Advertiser</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
          Reach a highly engaged audience of news readers across India and the world.
          Fill in the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Why advertise */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Daily Readers', value: '50K+' },
          { label: 'News Categories', value: '9' },
          { label: 'Response Time', value: '< 24h' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {success ? (
          <div className="flex flex-col items-center py-10 text-center gap-3">
            <CheckCircle size={48} className="text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Thank you!</h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Your inquiry has been received. Our advertising team will contact you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full Name"
                icon={<User size={15} />}
                required
              >
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={inputCls}
                />
              </Field>

              <Field label="Email Address" icon={<Mail size={15} />} required>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className={inputCls}
                />
              </Field>

              <Field label="Company / Brand" icon={<Building2 size={15} />}>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className={inputCls}
                />
              </Field>

              <Field label="Phone Number" icon={<Phone size={15} />}>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field
              label="Message / Requirements"
              icon={<MessageSquare size={15} />}
              required
            >
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your advertising goals, target audience, budget range, etc."
                required
                className={`${inputCls} resize-none`}
              />
            </Field>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? 'Sending…' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const inputCls =
  'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition'

function Field({ label, icon, required, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}
