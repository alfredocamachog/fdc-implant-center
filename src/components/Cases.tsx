import { useEffect, useState } from 'react'
import type { Translations } from '../translations'

export default function Cases({ t }: { t: Translations }) {
  const [slideIndexByCase, setSlideIndexByCase] = useState<Record<string, number>>({})
  const [modalCaseId, setModalCaseId] = useState<string | null>(null)
  const [modalTab, setModalTab] = useState<'overview' | 'results'>('overview')
  const [touchStartXByCase, setTouchStartXByCase] = useState<Record<string, number | null>>({})

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

  return (
    <section className="section" id="casos">
      <div className="section__heading">
        <p className="eyebrow">{t.cases.eyebrow}</p>
        <h2>{t.cases.title}</h2>
        {t.cases.intro ? <p>{t.cases.intro}</p> : null}
      </div>
      <div className="cases-strip" role="list" aria-label={t.cases.title}>
        {t.cases.cards.map((caseItem) => {
          const currentSlideIndex = slideIndexByCase[caseItem.id] ?? 0
          const totalSlides = caseItem.images.length
          return (
            <article key={caseItem.id} className="card case-showcase" role="listitem">
              <p className="case__tag">{t.cases.caseTag}</p>
              <h3>{caseItem.name}</h3>
              {caseItem.treatment ? <p className="case__meta">{caseItem.treatment}</p> : null}
              {caseItem.location ? <p className="case__meta">{caseItem.location}</p> : null}

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
                        const imageData = typeof imageSrc === 'string' ? { src: imageSrc } : imageSrc

                        return (
                          <div className="case-image-wrap">
                            <img src={imageData.src} alt={`${caseItem.name} ${idx + 1}`} loading="lazy" />
                          </div>
                        )
                      })()}
                    </figure>
                  ))}
                </div>
              </div>

              <div className="case-carousel">
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, 'prev')} aria-label={t.cases.prevSlideLabel} disabled={totalSlides <= 1}>
                  {'<'}
                </button>
                <div className="case-carousel__status">
                  <div className="case-carousel__progress" aria-hidden="true">
                    <span className="case-carousel__progress-bar" style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }} />
                  </div>
                  <span className="case-carousel__counter">
                    {currentSlideIndex + 1}/{totalSlides}
                  </span>
                </div>
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, 'next')} aria-label={t.cases.nextSlideLabel} disabled={totalSlides <= 1}>
                  {'>'}
                </button>
              </div>

              {caseItem.modal ? (
                <button
                  type="button"
                  className="case-note__toggle"
                  onClick={() => {
                    setModalCaseId(caseItem.id)
                    setModalTab('overview')
                  }}
                >
                  {t.cases.readMoreLabel}
                </button>
              ) : null}
            </article>
          )
        })}
      </div>

      {modalCaseId ? (
        <div className="case-modal" role="dialog" aria-modal="true" aria-label={t.cases.title} onClick={() => setModalCaseId(null)}>
          <div className="case-modal__content" onClick={(e) => e.stopPropagation()}>
            {t.cases.cards
              .filter((card) => card.id === modalCaseId)
              .map((card) => (
                <div key={card.id}>
                  {!card.modal ? null : (
                    <>
                  <div className="case-modal__header">
                    <h3>{card.name}</h3>
                    <button type="button" className="case-modal__close" onClick={() => setModalCaseId(null)}>
                      {t.cases.closeModalLabel}
                    </button>
                  </div>
                  <div className="case-modal__tabs" role="tablist" aria-label={t.cases.detailsTabsAriaLabel}>
                    <button type="button" className={`case-modal__tab ${modalTab === 'overview' ? 'is-active' : ''}`} onClick={() => setModalTab('overview')}>
                      {t.cases.overviewTabLabel}
                    </button>
                    <button type="button" className={`case-modal__tab ${modalTab === 'results' ? 'is-active' : ''}`} onClick={() => setModalTab('results')}>
                      {t.cases.resultsTabLabel}
                    </button>
                  </div>

                  {modalTab === 'overview' ? (
                    <div className="case-modal__body">
                      <p className="case-modal__title">{card.modal.overview.title}</p>
                      {card.modal.overview.paragraphs.map((paragraph) => (
                        <p className="case-note" key={paragraph}>
                          {paragraph}
                        </p>
                      ))}

                      <p className="case-modal__subtitle">{card.modal.overview.upperTitle}</p>
                      <p className="case-note">{card.modal.overview.upperDescription}</p>
                      <ul className="case-modal__list">
                        {card.modal.overview.upperPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>

                      <p className="case-modal__subtitle">{card.modal.overview.lowerTitle}</p>
                      <p className="case-note">{card.modal.overview.lowerDescription}</p>
                      <ul className="case-modal__list">
                        {card.modal.overview.lowerPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="case-modal__body">
                      <p className="case-modal__title">{card.modal.results.title}</p>
                      <p className="case-note">{card.modal.results.intro}</p>
                      <ul className="case-modal__list">
                        {card.modal.results.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <p className="case-modal__subtitle">{card.modal.results.whyTitle}</p>
                      <ul className="case-modal__list">
                        {card.modal.results.whyPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      {'chooseUsTitle' in card.modal.results && card.modal.results.chooseUsTitle ? (
                        <>
                          <p className="case-modal__subtitle">{card.modal.results.chooseUsTitle}</p>
                          <ul className="case-modal__list">
                            {card.modal.results.chooseUsPoints.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
