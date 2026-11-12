import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import type { Translations } from '../translations'

// Outline icons on a shared 24px grid; stroke styling comes from CSS so they stay consistent.
const icons: Record<string, ReactElement> = {
  '#inicio': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 10.5 12 3.8l8.5 6.7" />
      <path d="M5.5 9v10.2a.8.8 0 0 0 .8.8H10v-5.5h4V20h3.7a.8.8 0 0 0 .8-.8V9" />
    </svg>
  ),
  '#sobre-mi': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6s6.3 2 7.2 5.6" />
    </svg>
  ),
  '#servicios': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3.5c-2.6 0-4.2 2-3.8 4.9.3 2.2 1.4 3.6 1.8 5.8.5 2.5.7 6.3 2.2 6.3 1.4 0 1.6-3 2.2-4.9.4-1 1-1.5 1.6-1.5s1.2.5 1.6 1.5c.6 1.9.8 4.9 2.2 4.9 1.5 0 1.7-3.8 2.2-6.3.4-2.2 1.5-3.6 1.8-5.8.4-2.9-1.2-4.9-3.8-4.9-1.8 0-2.8.9-4 .9s-2.2-.9-4-.9z" />
    </svg>
  ),
  '#instalaciones': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V9.5L12 4l8 5.5V20" />
      <path d="M3 20h18" />
      <path d="M12 9.5v5M9.5 12h5" />
    </svg>
  ),
  '#casos': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="m4 17 4.8-4.3 3.2 2.8 3-2.5 5 4" />
    </svg>
  ),
  '#contacto': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </svg>
  ),
}

const fallbackIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
)

interface MobileDockProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

export default function MobileDock({ t, scrollTo }: MobileDockProps) {
  const [active, setActive] = useState(t.navLinks[0]?.href ?? '')

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = t.navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [t.navLinks])

  return (
    <nav className="mobile-dock" aria-label={t.navigation.sectionsLabel}>
      {t.navLinks.map((link) => {
        const isActive = link.href === active
        return (
          <a
            key={link.href}
            href={link.href}
            className={`mobile-dock__item ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'location' : undefined}
            onClick={scrollTo(link.href.slice(1))}
          >
            <span className="mobile-dock__icon" aria-hidden="true">
              {icons[link.href] ?? fallbackIcon}
            </span>
            <span className="mobile-dock__label">{link.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
