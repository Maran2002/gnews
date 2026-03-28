import { createContext, useContext, useState, useCallback } from 'react'

/**
 * ConsentContext — manages GDPR/CCPA cookie consent state.
 *
 * Consent is stored in localStorage under the key 'gnews_consent'.
 * Value is either 'accepted' or 'rejected'.
 *
 * Ads and tracking scripts must check `hasConsented` before initializing.
 */

const CONSENT_KEY = 'gnews_consent'

const ConsentContext = createContext(null)

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => localStorage.getItem(CONSENT_KEY))

  /** User clicked "Accept All" */
  const acceptAll = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }, [])

  /** User clicked "Reject" */
  const reject = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }, [])

  /** True only when user has explicitly accepted */
  const hasConsented = consent === 'accepted'

  /** True when user has not yet made a choice */
  const isPending = consent === null

  return (
    <ConsentContext.Provider value={{ consent, hasConsented, isPending, acceptAll, reject }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>')
  return ctx
}
