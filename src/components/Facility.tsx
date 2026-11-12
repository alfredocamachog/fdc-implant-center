import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { Translations } from '../translations'
import { trackEvent } from '../analytics'

type Photo = Translations['facility']['items'][number]

const src = (id: string, w: 640 | 1280) => `/facility/${id}-${w}.webp`
const srcSet = (id: string) => `${src(id, 640)} 640w, ${src(id, 1280)} 1280w`

// Rendered tile widths, so phones only download the large file for full-width tiles.
const WIDE_AREAS = new Set(['doctor', 'smile', 'mirror'])
const tileSizes = (area: string) =>
  WIDE_AREAS.has(area)
    ? '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 600px'
    : '(max-width: 640px) 50vw, (max-width: 1100px) 25vw, 300px'

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Facility({ t }: { t: Translations }) {
  const f = t.facility
  const baseId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)
  const total = f.items.length

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
    trackEvent('facility_photo_open', { photo: f.items[i].id })
  }

  const close = () => dialogRef.current?.close()

  const step = useCallback((delta: number) => {
    setIndex((i) => (i === null ? i : (i + delta + total) % total))
  }, [total])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const onClose = () => setIndex(null)
    dialog.addEventListener('keydown', onKey)
    dialog.addEventListener('close', onClose)
    return () => {
      dialog.removeEventListener('keydown', onKey)
      dialog.removeEventListener('close', onClose)
    }
  }, [step])

  // Lock page scroll behind the viewer.
  useEffect(() => {
    if (index === null) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [index])

  const current: Photo | null = index === null ? null : f.items[index]

  return (
    <section className="section facility" id="instalaciones" aria-labelledby={`${baseId}-title`}>
      <header className="facility__heading">
        <div>
          <p className="eyebrow">{f.eyebrow}</p>
          <h2 id={`${baseId}-title`}>{f.title}</h2>
        </div>
        <p>{f.intro}</p>
      </header>

      <ul className="facility__collage">
        {f.items.map((photo, i) => (
          <li key={photo.id} className="facility__tile" style={{ gridArea: photo.area }}>
            <button
              type="button"
              className="facility__btn"
              onClick={() => open(i)}
              aria-label={f.openLabel.replace('{caption}', photo.caption)}
            >
              <img
                src={src(photo.id, 640)}
                srcSet={srcSet(photo.id)}
                sizes={tileSizes(photo.area)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: photo.position }}
              />
              <span className="facility__caption" aria-hidden="true">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={current?.caption ?? f.title}
        onClick={(e) => {
          // Clicking the dark backdrop (the dialog itself, not its content) closes it.
          if (e.target === e.currentTarget) close()
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        {current ? (
          <>
            <button type="button" className="lightbox__close" onClick={close} aria-label={f.closeLabel}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <figure className="lightbox__figure">
              <img
                key={current.id}
                src={src(current.id, 1280)}
                srcSet={srcSet(current.id)}
                sizes="(max-width: 900px) 100vw, 1100px"
                alt={current.alt}
                width={current.width}
                height={current.height}
              />
              <figcaption>
                <span>{current.caption}</span>
                <span className="lightbox__counter" aria-live="polite">
                  {f.counter.replace('{index}', String((index ?? 0) + 1)).replace('{total}', String(total))}
                </span>
              </figcaption>
            </figure>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label={f.prevLabel}>
              <Chevron dir="left" />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label={f.nextLabel}>
              <Chevron dir="right" />
            </button>
          </>
        ) : null}
      </dialog>
    </section>
  )
}
