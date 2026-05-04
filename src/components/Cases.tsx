import { useEffect, useState } from 'react'
import type { Translations } from '../translations'

export default function Cases({ t }: { t: Translations }) {
  const [slideIndexByCase, setSlideIndexByCase] = useState<Record<string, number>>({})
  const [modalCaseId, setModalCaseId] = useState<string | null>(null)
  const [touchStartXByCase, setTouchStartXByCase] = useState<Record<string, number | null>>({})
  const [revealedSensitiveImages, setRevealedSensitiveImages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!modalCaseId) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalCaseId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modalCaseId])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlideIndexByCase((prev) => {
        const nextState = { ...prev }
        t.cases.cards.forEach((card) => {
          const total = card.images.length
          if (total <= 1) {
            nextState[card.id] = 0
            return
          }
          const current = nextState[card.id] ?? 0
          nextState[card.id] = (current + 1) % total
        })
        return nextState
      })
    }, 4500)
    return () => window.clearInterval(interval)
  }, [t.cases.cards])

  const changeSlide = (caseId: string, direction: 'prev' | 'next') => {
    setSlideIndexByCase((prev) => {
      const current = prev[caseId] ?? 0
      const total = t.cases.cards.find((card) => card.id === caseId)?.images.length ?? 1
      const nextIndex = direction === 'next' ? (current + 1) % total : (current - 1 + total) % total
      return { ...prev, [caseId]: nextIndex }
    })
  }

  const setSlide = (caseId: string, index: number) => {
    setSlideIndexByCase((prev) => ({ ...prev, [caseId]: index }))
  }

  return (
    <section className="section" id="casos">
      <div className="section__heading">
        <p className="eyebrow">{t.cases.eyebrow}</p>
        <h2>{t.cases.title}</h2>
        <p>{t.cases.intro}</p>
      </div>
      <div className="cases-strip" role="list" aria-label={t.cases.title}>
        {t.cases.cards.map((caseItem) => {
          const currentSlideIndex = slideIndexByCase[caseItem.id] ?? 0
          const totalSlides = caseItem.images.length
          return (
            <article key={caseItem.id} className="card case-showcase" role="listitem">
              <p className="case__tag">{t.cases.eyebrow}</p>
              <h3>{caseItem.name}</h3>
              <p>{caseItem.result}</p>

              <div
                className="case-slider"
                onTouchStart={(e) => setTouchStartXByCase((prev) => ({ ...prev, [caseItem.id]: e.touches[0].clientX }))}
                onTouchEnd={(e) => {
                  const startX = touchStartXByCase[caseItem.id]
                  const endX = e.changedTouches[0].clientX
                  if (startX == null) return
                  const deltaX = endX - startX
                  if (deltaX <= -40 && totalSlides > 1) changeSlide(caseItem.id, 'next')
                  if (deltaX >= 40 && totalSlides > 1) changeSlide(caseItem.id, 'prev')
                  setTouchStartXByCase((prev) => ({ ...prev, [caseItem.id]: null }))
                }}
              >
                <div className="case-slider__track" style={{ width: `${totalSlides * 100}%`, transform: `translateX(-${currentSlideIndex * (100 / totalSlides)}%)` }}>
                  {caseItem.images.map((imageSrc, idx) => (
                    <figure className="case-slider__item" style={{ width: `${100 / totalSlides}%` }} key={`${caseItem.id}-img-${idx}`}>
                      {(() => {
                        const imageData = typeof imageSrc === 'string' ? { src: imageSrc, sensitive: false } : imageSrc
                        const imageKey = `${caseItem.id}-${idx}`
                        const isRevealed = !!revealedSensitiveImages[imageKey]
                        const shouldHide = imageData.sensitive && !isRevealed

                        return (
                          <div className="case-image-wrap">
                            <img src={imageData.src} alt={`${caseItem.name} ${t.cases.imageLabel} ${idx + 1}`} loading="lazy" className={shouldHide ? 'is-sensitive-hidden' : ''} />
                            {imageData.sensitive ? (
                              <div className={`case-sensitive-overlay ${shouldHide ? 'is-visible' : ''}`}>
                                <p>{t.cases.sensitiveWarning}</p>
                                <button
                                  type="button"
                                  className="case-sensitive-btn"
                                  onClick={() =>
                                    setRevealedSensitiveImages((prev) => ({
                                      ...prev,
                                      [imageKey]: !isRevealed,
                                    }))
                                  }
                                >
                                  {isRevealed ? t.cases.hideSensitiveLabel : t.cases.showSensitiveLabel}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        )
                      })()}
                      <figcaption>
                        {t.cases.imageLabel} {idx + 1}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="case-carousel">
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, 'prev')} aria-label={t.cases.prevSlideLabel} disabled={totalSlides <= 1}>
                  ‹
                </button>
                <div className="case-carousel__dots" role="tablist" aria-label={`${caseItem.name} carousel`}>
                  {caseItem.images.map((_, index) => (
                    <button
                      key={`${caseItem.id}-dot-${index}`}
                      type="button"
                      className={`case-carousel__dot ${currentSlideIndex === index ? 'is-active' : ''}`}
                      onClick={() => setSlide(caseItem.id, index)}
                      aria-label={`${index + 1}`}
                    />
                  ))}
                </div>
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, 'next')} aria-label={t.cases.nextSlideLabel} disabled={totalSlides <= 1}>
                  ›
                </button>
              </div>

              <button type="button" className="case-note__toggle" onClick={() => setModalCaseId(caseItem.id)}>
                {t.cases.readMoreLabel}
              </button>
            </article>
          )
        })}
      </div>

      {modalCaseId ? (
        <div className="case-modal" role="dialog" aria-modal="true" aria-label={t.cases.modalTitle} onClick={() => setModalCaseId(null)}>
          <div className="case-modal__content" onClick={(e) => e.stopPropagation()}>
            {t.cases.cards
              .filter((card) => card.id === modalCaseId)
              .map((card) => (
                <div key={card.id}>
                  <div className="case-modal__header">
                    <h3>{card.name}</h3>
                    <button type="button" className="case-modal__close" onClick={() => setModalCaseId(null)}>
                      {t.cases.closeModalLabel}
                    </button>
                  </div>
                  <p className="case-modal__title">{t.cases.modalTitle}</p>
                  <p className="case-note">{card.note}</p>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
