import { useEffect, useId, useRef, useState } from 'react'
import type { Translations } from '../translations'
import { trackEvent } from '../analytics'

interface AboutLetterProps {
  t: Translations
}

/**
 * Bio preview for the About section plus the full "letter from the doctor" in a modal:
 * portrait on one side, the letter (pull quote, international chips, signature) on the other.
 */
export default function AboutLetter({ t }: AboutLetterProps) {
  const { letter, title, subtitle, eyebrow } = t.about
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [open, setOpen] = useState(false)

  const show = () => {
    dialogRef.current?.showModal()
    bodyRef.current?.scrollTo({ top: 0 })
    setOpen(true)
    trackEvent('about_letter_open', {})
  }
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => setOpen(false)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  // Lock page scroll behind the letter.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <p className="about__subtitle">{subtitle}</p>
      <div className="about__lead">
        <p className="about__intro">{letter.paragraphs[0]}</p>
        <button type="button" className="about__read" onClick={show} aria-haspopup="dialog">
          <span className="about__read-text">
            <span className="about__read-label">{letter.readMore}</span>
            <span className="about__read-hint">{letter.readMoreHint}</span>
          </span>
          <svg className="about__read-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="letter"
        aria-labelledby={titleId}
        onClick={(e) => {
          // Click on the backdrop (outside the sheet) closes it.
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="letter__sheet">
          <figure className="letter__portrait">
            <img src="/dr-fernando.webp" alt={letter.photoAlt} width={900} height={990} decoding="async" />
            <figcaption>
              <span className="letter__portrait-name">{letter.signature}</span>
              <span className="letter__portrait-role">{subtitle}</span>
              <span className="letter__portrait-place">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                  <circle cx="12" cy="10" r="2.3" />
                </svg>
                {letter.location}
              </span>
            </figcaption>
          </figure>

          <div className="letter__body" ref={bodyRef}>
            <button type="button" className="letter__close" onClick={close} aria-label={letter.close}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <p className="eyebrow">{eyebrow}</p>
            <h2 id={titleId} className="letter__title">
              {title}
            </h2>
            <p className="letter__subtitle">{subtitle}</p>

            <div className="letter__text">
              {letter.paragraphs.map((paragraph, index) => {
                if (index === letter.quoteIndex) {
                  return (
                    <blockquote className="letter__quote" key={index}>
                      <p>{paragraph}</p>
                    </blockquote>
                  )
                }
                return (
                  <div key={index}>
                    <p className={index === 0 ? 'letter__lead' : undefined}>{paragraph}</p>
                    {index === 1 ? (
                      <div className="letter__experiences">
                        <p className="letter__experiences-title">{letter.experiencesTitle}</p>
                        <ul>
                          {letter.experiences.map((item) => (
                            <li key={item.name}>
                              <strong>{item.name}</strong>
                              <span>{item.place}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>

            {/* Closes the letter with the same brand lockup as the header. */}
            <footer className="letter__sign">
              <img src="/logo-header.webp" alt="" className="letter__sign-logo" width={160} height={160} decoding="async" />
              <span className="letter__sign-text">
                <span className="letter__sign-title">{t.brand.title}</span>
                <span className="letter__sign-tagline">{t.brand.tagline}</span>
              </span>
            </footer>
          </div>
        </div>
      </dialog>
    </>
  )
}
