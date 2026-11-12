type EventParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: 'event', name: string, params?: EventParams) => void
  }
}

// Sends conversion events to whichever analytics tool is installed (GA4 via gtag or GTM's dataLayer).
// Until one is added to index.html this is a safe no-op.
export const trackEvent = (name: string, params: EventParams = {}) => {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params)
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params })
    }
  } catch {
    // Analytics must never break navigation.
  }
}
