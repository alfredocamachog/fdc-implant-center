import { useEffect, useId, useRef, useState } from 'react'
import type { Translations, Language } from '../translations'
import { trackEvent } from '../analytics'

interface WhatsAppPhone {
  id: string
  countryName: string
  display: string
  whatsappHref: string
}

interface FloatingCtaProps {
  t: Translations
  language: Language
  phones: WhatsAppPhone[]
}

const FLAGS: Record<string, string> = {
  mx: '/flags/mx-flag.png',
  us: '/flags/us-flag.svg',
}

// The number matching the page language is listed first; Spanish → Mexico, English → USA.
const PREFERRED_PHONE: Record<Language, string> = { es: 'mx', en: 'us' }

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" role="presentation" focusable="false">
    <path
      d="M16.004 3.003C9.38 3.003 4 8.385 4 15.006c0 2.668.768 5.184 2.222 7.374L4 28.997l7.06-2.197A11.946 11.946 0 0 0 16.004 27C22.627 27 28 21.617 28 15c0-6.627-5.373-11.997-11.996-11.997h0zm6.622 16.954c-.277.78-1.637 1.52-2.24 1.59-.602.07-1.155.332-3.865-.799-3.258-1.4-5.342-4.837-5.508-5.062-.166-.226-1.316-1.75-1.316-3.335s.833-2.365 1.128-2.695c.294-.33.648-.413.863-.413.215 0 .431.002.622.01.2.009.466-.075.73.555.277.666.946 2.295 1.03 2.46.083.165.138.357.03.582-.108.226-.162.357-.321.548-.16.19-.34.425-.486.571-.162.16-.33.334-.142.66.189.327.84 1.377 1.802 2.226 1.237 1.103 2.275 1.445 2.6 1.604.324.16.513.135.702-.08.189-.215.812-.95 1.028-1.276.215-.327.455-.274.76-.165.304.108 1.929.909 2.262 1.073.333.165.555.248.638.384.084.136.084.782-.193 1.563z"
      fill="currentColor"
    />
  </svg>
)

export default function FloatingCta({ t, language, phones }: FloatingCtaProps) {
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const firstOptionRef = useRef<HTMLAnchorElement | null>(null)
  const [open, setOpen] = useState(false)

  const preferredId = PREFERRED_PHONE[language]
  const orderedPhones = [...phones].sort((a, b) => Number(b.id === preferredId) - Number(a.id === preferredId))

  // Disclosure behaviour: focus the first option on open, close on Escape or outside click.
  useEffect(() => {
    if (!open) return
    firstOptionRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const toggle = () => {
    if (!open) trackEvent('whatsapp_open_chooser', { placement: 'floating' })
    setOpen(!open)
  }

  return (
    <div className={`floating-cta ${open ? 'is-open' : ''}`} ref={rootRef}>
      <div className="floating-cta__panel" id={panelId} hidden={!open}>
        <p className="floating-cta__title">{t.floatingCta.chooseTitle}</p>
        <ul className="floating-cta__options">
          {orderedPhones.map((phone, index) => (
            <li key={phone.id}>
              <a
                ref={index === 0 ? firstOptionRef : undefined}
                className="floating-cta__option"
                href={phone.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('whatsapp_click', { placement: 'floating', phone: phone.id })
                  setOpen(false)
                }}
              >
                <img className="floating-cta__flag" src={FLAGS[phone.id]} alt="" width={24} height={16} />
                <span className="floating-cta__option-text">
                  <span className="floating-cta__country">{phone.countryName}</span>
                  <span className="floating-cta__number">{phone.display}</span>
                </span>
                <span className="floating-cta__option-icon" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="floating-cta__toggle"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="floating-cta__icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" fill="currentColor" />
            </svg>
          ) : (
            <WhatsAppIcon />
          )}
        </span>
        {/* Visible label is also the accessible name; on small screens it is only visually hidden. */}
        <span className="floating-cta__label">{t.floatingCta.label}</span>
      </button>
    </div>
  )
}
