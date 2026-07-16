'use client'

import { useEffect } from 'react'

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref']

export default function UTMTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const utmData: Record<string, string> = {}
    let hasUTM = false

    for (const key of UTM_PARAMS) {
      const value = params.get(key)
      if (value) {
        utmData[key] = value
        hasUTM = true
      }
    }

    if (hasUTM) {
      // Store UTM params in sessionStorage for the current visit
      sessionStorage.setItem('utm_params', JSON.stringify(utmData))
      // Also store first-touch attribution in localStorage (persists)
      if (!localStorage.getItem('utm_first_touch')) {
        localStorage.setItem('utm_first_touch', JSON.stringify({
          ...utmData,
          landing_page: window.location.pathname,
          timestamp: new Date().toISOString(),
        }))
      }
      // Always update last-touch attribution
      localStorage.setItem('utm_last_touch', JSON.stringify({
        ...utmData,
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString(),
      }))
    }

    // Track referrer if no UTM present
    if (!hasUTM && document.referrer && !document.referrer.includes(window.location.hostname)) {
      const referrerData = {
        referrer: document.referrer,
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem('referrer_data', JSON.stringify(referrerData))
      if (!localStorage.getItem('utm_first_touch')) {
        localStorage.setItem('utm_first_touch', JSON.stringify(referrerData))
      }
    }
  }, [])

  return null
}

/**
 * Utility: get stored UTM params to attach to form submissions
 */
export function getStoredUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const session = sessionStorage.getItem('utm_params')
    const firstTouch = localStorage.getItem('utm_first_touch')
    const lastTouch = localStorage.getItem('utm_last_touch')
    return {
      ...(session ? JSON.parse(session) : {}),
      _first_touch: firstTouch || '',
      _last_touch: lastTouch || '',
    }
  } catch {
    return {}
  }
}
