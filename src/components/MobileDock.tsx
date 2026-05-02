import type { Translations } from '../translations'
import type { ReactElement } from 'react'

const icons: Record<string, ReactElement> = {
  '#inicio': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1z" fill="currentColor" />
    </svg>
  ),
  '#servicios': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 4h3v4h-2.2a5 5 0 0 1-9.6 0H5V8h3z" fill="currentColor" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  '#metodologia': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.2v5.2l3.4 1.8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '#casos': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h4l1.4 2H19a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill="currentColor" />
    </svg>
  ),
  '#equipo': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
      <path d="M4 19a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1H4zM12 20v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1z" fill="currentColor" />
    </svg>
  ),
  '#contacto': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 8.5 12 13l7-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function MobileDock({ t, scrollTo }: { t: Translations; scrollTo: (id: string) => (e: React.MouseEvent) => void }) {
  return (
    <div className="mobile-dock" role="navigation" aria-label="Site sections">
      {t.navLinks.map((link) => (
        <button key={link.href} type="button" className="mobile-dock__item" onClick={scrollTo(link.href.slice(1))}>
          <span className="mobile-dock__icon" aria-hidden="true">
            {icons[link.href] ?? <span className="mobile-dock__dot" />}
          </span>
          <span className="mobile-dock__label">{link.label}</span>
        </button>
      ))}
    </div>
  )
}
