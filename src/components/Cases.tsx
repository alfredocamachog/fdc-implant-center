import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { Translations } from '../translations'
import { trackEvent } from '../analytics'

type Case = Translations['cases']['cards'][number]

interface CasesProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))

// Data keeps labels like "Patient: Jose"; the collage shows just the value.
const stripLabel = (text: string) => text.replace(/^[^:]{1,20}:\s*/, '')
const stripCheck = (text: string) => text.replace(/^✔️\s*/, '')

const small = (src: string) => src.replace(/\.webp$/, '-600.webp')
const srcSet = (src: string) => `${small(src)} 600w, ${src} 1200w`

const Icon = ({ d, className }: { d: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ICON = {
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  close: 'M6 6l12 12M18 6L6 18',
  arrow: 'M4 12h15m-5-5 5 5-5 5',
  photos: 'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5zM4.5 16l4.5-4 3.5 3 3-2.5 4 3.5',
}

const CheckList = ({ items }: { items: readonly string[] }) =>
  items.length ? (
    <ul className="case-review__list">
      {items.map((item) => (
        <li key={item}>{stripCheck(item)}</li>
      ))}
    </ul>
  ) : null

const CaseStory = ({ card }: { card: Case }) => {
  const { overview, results } = card.modal
  return (
    <>
      <h4 className="case-review__lead">{overview.title}</h4>
      {overview.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}

      <h5>{overview.upperTitle}</h5>
      {overview.upperDescription ? <p>{overview.upperDescription}</p> : null}
      <CheckList items={overview.upperPoints} />

      <h5>{overview.lowerTitle}</h5>
      {overview.lowerDescription ? <p>{overview.lowerDescription}</p> : null}
      <CheckList items={overview.lowerPoints} />

      <div className="case-review__results">
        <h5>{results.title.replace(/:$/, '')}</h5>
        {results.intro ? <p>{results.intro}</p> : null}
        <CheckList items={results.points} />
      </div>

      <h5>{results.whyTitle}</h5>
      {results.whyPoints.length === 1 ? <p>{results.whyPoints[0]}</p> : <CheckList items={results.whyPoints} />}

      {'chooseUsTitle' in results && results.chooseUsTitle ? (
        <>
          <h5>{results.chooseUsTitle}</h5>
          <CheckList items={results.chooseUsPoints} />
        </>
      ) : null}
    </>
  )
}

export default function Cases({ t, scrollTo }: CasesProps) {
  const c = t.cases
  const cards = c.cards
  const baseId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const [caseIndex, setCaseIndex] = useState<number | null>(null)
  const [photo, setPhoto] = useState(0)
  // Sensitive photos stay blurred until the visitor chooses to see them.
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set())
  const toggleReveal = (src: string) =>
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(src)) next.delete(src)
      else next.add(src)
      return next
    })

  const current = caseIndex === null ? null : cards[caseIndex]
  const photoTotal = current?.images.length ?? 0
  const isHidden = !!current && current.images[photo].sensitive && !revealed.has(current.images[photo].src)

  const open = (i: number) => {
    setCaseIndex(i)
    setPhoto(cards[i].cover)
    dialogRef.current?.showModal()
    trackEvent('case_review_open', { case: cards[i].id })
  }

  const close = () => dialogRef.current?.close()

  const goCase = (delta: number) => {
    if (caseIndex === null) return
    const next = (caseIndex + delta + cards.length) % cards.length
    setCaseIndex(next)
    setPhoto(0)
    panelRef.current?.scrollTo({ top: 0 })
    dialogRef.current?.scrollTo({ top: 0 })
  }

  const stepPhoto = useCallback(
    (delta: number) => setPhoto((p) => (photoTotal ? (p + delta + photoTotal) % photoTotal : 0)),
    [photoTotal],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepPhoto(1)
      if (e.key === 'ArrowLeft') stepPhoto(-1)
    }
    const onClose = () => setCaseIndex(null)
    dialog.addEventListener('keydown', onKey)
    dialog.addEventListener('close', onClose)
    return () => {
      dialog.removeEventListener('keydown', onKey)
      dialog.removeEventListener('close', onClose)
    }
  }, [stepPhoto])

  // Lock page scroll behind the viewer.
  useEffect(() => {
    if (caseIndex === null) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [caseIndex])

  // Keep the active thumbnail in view.
  useEffect(() => {
    const thumb = thumbsRef.current?.children[photo] as HTMLElement | undefined
    thumb?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [photo, caseIndex])

  const onBook = (e: React.MouseEvent) => {
    trackEvent('case_review_book', { case: current?.id ?? '' })
    close()
    scrollTo('contacto')(e)
  }

  return (
    <section className="section cases" id="casos" aria-labelledby={`${baseId}-title`}>
      <header className="cases__heading">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id={`${baseId}-title`}>{c.title}</h2>
        </div>
        {c.intro ? <p>{c.intro}</p> : null}
      </header>

      <ul className="cases__collage">
        {cards.map((card, i) => {
          const cover = card.images[card.cover].src
          return (
            <li key={card.id} className="case-tile">
              <button
                type="button"
                className="case-tile__btn"
                onClick={() => open(i)}
                aria-haspopup="dialog"
                aria-label={`${c.reviewLabel}: ${stripLabel(card.name)}, ${stripLabel(card.treatment)}`}
              >
                <img
                  src={small(cover)}
                  srcSet={srcSet(cover)}
                  sizes={i === 0 ? '(max-width: 640px) 100vw, 600px' : '(max-width: 640px) 50vw, (max-width: 1100px) 50vw, 600px'}
                  alt=""
                  width={1200}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
                <span className="case-tile__top" aria-hidden="true">
                  <span className="case-tile__chip case-tile__chip--glass">
                    <Icon d={ICON.photos} />
                    {fill(c.photosLabel, { count: card.images.length })}
                  </span>
                </span>
                <span className="case-tile__info" aria-hidden="true">
                  <span className="case-tile__name">{stripLabel(card.name)}</span>
                  <span className="case-tile__treatment">{stripLabel(card.treatment)}</span>
                  <span className="case-tile__cta">
                    {c.reviewLabel}
                    <Icon d={ICON.arrow} />
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="case-review"
        aria-labelledby={`${baseId}-review-title`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        {current && caseIndex !== null ? (
          <div className="case-review__shell">
            <div className="case-review__bar">
              <span className="case-review__count">{c.eyebrow}</span>
              <div className="case-review__bar-actions">
                <button type="button" className="case-review__icon-btn" onClick={() => goCase(-1)} aria-label={c.prevCaseLabel}>
                  <Icon d={ICON.left} />
                </button>
                <button type="button" className="case-review__icon-btn" onClick={() => goCase(1)} aria-label={c.nextCaseLabel}>
                  <Icon d={ICON.right} />
                </button>
                <button type="button" className="case-review__icon-btn" onClick={close} aria-label={c.closeModalLabel}>
                  <Icon d={ICON.close} />
                </button>
              </div>
            </div>

            <div className="case-review__media">
              <div
                className="case-review__stage"
                onTouchStart={(e) => {
                  touchX.current = e.touches[0].clientX
                }}
                onTouchEnd={(e) => {
                  if (touchX.current === null) return
                  const dx = e.changedTouches[0].clientX - touchX.current
                  if (Math.abs(dx) > 48) stepPhoto(dx < 0 ? 1 : -1)
                  touchX.current = null
                }}
              >
                <img
                  className={isHidden ? 'is-blurred' : undefined}
                  key={current.images[photo].src}
                  src={current.images[photo].src}
                  srcSet={srcSet(current.images[photo].src)}
                  sizes="(max-width: 900px) 100vw, 60vw"
                  alt={fill(c.imageAlt, { name: stripLabel(current.name), index: photo + 1, total: photoTotal })}
                  width={1200}
                  height={1200}
                />
                {current.images[photo].sensitive ? (
                  isHidden ? (
                    <div className="case-review__sensitive">
                      <p>{c.sensitiveWarning}</p>
                      <button type="button" className="btn small case-review__reveal" onClick={() => toggleReveal(current.images[photo].src)}>
                        {c.showSensitiveLabel}
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="case-review__hide" onClick={() => toggleReveal(current.images[photo].src)}>
                      {c.hideSensitiveLabel}
                    </button>
                  )
                ) : null}
                {photoTotal > 1 ? (
                  <>
                    <button type="button" className="case-review__nav case-review__nav--prev" onClick={() => stepPhoto(-1)} aria-label={c.prevSlideLabel}>
                      <Icon d={ICON.left} />
                    </button>
                    <button type="button" className="case-review__nav case-review__nav--next" onClick={() => stepPhoto(1)} aria-label={c.nextSlideLabel}>
                      <Icon d={ICON.right} />
                    </button>
                  </>
                ) : null}
                <span className="case-review__photo-count" aria-live="polite">
                  {photo + 1} / {photoTotal}
                </span>
              </div>

              <div className="case-review__thumbs" ref={thumbsRef} role="group" aria-label={fill(c.sliderLabel, { name: stripLabel(current.name) })}>
                {current.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={`case-review__thumb ${i === photo ? 'is-active' : ''}`}
                    onClick={() => setPhoto(i)}
                    aria-label={fill(c.openPhotoLabel, { index: i + 1 })}
                    aria-current={i === photo ? 'true' : undefined}
                  >
                    <img
                      className={img.sensitive && !revealed.has(img.src) ? 'is-blurred' : undefined}
                      src={small(img.src)}
                      alt=""
                      width={600}
                      height={600}
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="case-review__panel" ref={panelRef}>
              <h3 id={`${baseId}-review-title`}>{stripLabel(current.name)}</h3>
              <ul className="case-review__meta">
                <li>{stripLabel(current.treatment)}</li>
                <li>{stripLabel(current.location)}</li>
              </ul>
              <div className="case-review__text">
                <CaseStory card={current} />
              </div>
              <a className="btn primary case-review__book" href="#contacto" onClick={onBook}>
                {c.bookLabel}
                <Icon d={ICON.arrow} />
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  )
}
