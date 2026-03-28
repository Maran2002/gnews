import { useEffect, useRef } from 'react'
import { useConsent } from '@/context/ConsentContext'

/**
 * AdSlot — Google AdSense ad unit with GDPR/CCPA consent gate.
 *
 * Rules:
 *  1. Ads NEVER load before the user has consented (hasConsented === true).
 *  2. Each slot is pushed only once (useRef guard — React StrictMode safe).
 *  3. Fixed min-height containers prevent Cumulative Layout Shift (CLS).
 *
 * Usage:
 *   <AdSlot variant="banner"  adSlot="1234567890" />
 *   <AdSlot variant="in-article" adSlot="0987654321" />
 *   <AdSlot variant="sidebar" adSlot="1122334455" />
 *
 * Replace adClient and each adSlot value with your real AdSense IDs.
 * Publisher ID: set VITE_ADSENSE_CLIENT in your .env file.
 */

const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-PLACEHOLDER'

/** Fixed dimensions to prevent CLS — must match AdSense ad unit sizes */
const VARIANTS = {
  banner: {
    className: 'w-full',
    style: { minHeight: 90, display: 'block' },
    format: 'horizontal',
    fullWidthResponsive: true,
    label: 'Advertisement — Leaderboard',
  },
  'in-article': {
    className: 'w-full',
    style: { minHeight: 250, display: 'block' },
    format: 'fluid',
    layout: 'in-article',
    fullWidthResponsive: true,
    label: 'Advertisement — In Article',
  },
  sidebar: {
    className: 'w-full',
    style: { minHeight: 600, display: 'block' },
    format: 'auto',
    fullWidthResponsive: false,
    label: 'Advertisement — Sidebar',
  },
}

export default function AdSlot({ variant = 'banner', adSlot = '', className = '' }) {
  const { hasConsented } = useConsent()
  const pushed = useRef(false)
  const insRef = useRef(null)

  const config = VARIANTS[variant] || VARIANTS.banner

  useEffect(() => {
    // Do not push if user has not consented, or if already pushed
    if (!hasConsented || pushed.current) return
    // Do not push if no real ad slot is configured
    if (!adSlot || adSlot === '') return

    try {
      pushed.current = true
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.warn('[AdSlot] adsbygoogle push failed:', err.message)
    }
  }, [hasConsented, adSlot])

  // If not consented, show placeholder to preserve layout space
  if (!hasConsented) {
    return (
      <div
        className={`w-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-lg text-gray-300 text-[10px] font-medium ${className}`}
        style={config.style}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-lg ${className}`}
      style={{ minHeight: config.style.minHeight }}
      aria-label={config.label}
      role="complementary"
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={config.format}
        {...(config.layout ? { 'data-ad-layout': config.layout } : {})}
        {...(config.fullWidthResponsive
          ? { 'data-full-width-responsive': 'true' }
          : {})}
      />
    </div>
  )
}
