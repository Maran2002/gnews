import { Shield, Cookie, X } from 'lucide-react'
import { useConsent } from '@/context/ConsentContext'

/**
 * CookieConsent — GDPR/CCPA compliant consent banner.
 *
 * Appears as a fixed bottom bar when consent is pending.
 * Ads do NOT load until "Accept All" is clicked.
 *
 * LocalStorage key: 'gnews_consent' ('accepted' | 'rejected')
 */
export default function CookieConsent() {
  const { isPending, acceptAll, reject } = useConsent()

  if (!isPending) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
    >
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
          {/* Icon + text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
              <Cookie size={16} className="text-white" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-white mb-1">We use cookies &amp; similar technologies</p>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                GNews uses cookies to personalise content, serve relevant ads, and analyse traffic.
                By clicking <strong>"Accept All"</strong> you consent to our use of cookies
                in accordance with our{' '}
                <a href="/privacy" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                  Privacy Policy
                </a>{' '}
                and IAB TCF v2.3 standards. You can reject non-essential cookies at any time.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              id="consent-reject"
              onClick={reject}
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
              aria-label="Reject non-essential cookies"
            >
              <X size={13} />
              Reject
            </button>
            <button
              id="consent-accept"
              onClick={acceptAll}
              className="flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm"
              aria-label="Accept all cookies"
            >
              <Shield size={13} />
              Accept All
            </button>
          </div>
        </div>

        {/* GDPR/CCPA footnote */}
        <div className="px-5 pb-4 text-[10px] text-gray-500 leading-relaxed border-t border-gray-800 pt-3">
          This consent is required under GDPR (EU), CCPA (California), and IAB TCF v2.3 standards.
          Your choice is stored locally and can be changed via our{' '}
          <a href="/privacy" className="text-gray-400 hover:text-gray-300 underline underline-offset-1">
            Privacy Policy
          </a>
          .{' '}
          We do not sell your personal information.
        </div>
      </div>
    </div>
  )
}
