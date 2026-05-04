import { useEffect, useState } from 'react'
import type { Translations } from '../translations'

export default function Cases({ t }: { t: Translations }) {
  const [slideIndexByCase, setSlideIndexByCase] = useState<Record<string, number>>({})
  const [modalCaseId, setModalCaseId] = useState<string | null>(null)

  useEffect(() => {
    if (!modalCaseId) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalCaseId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modalCaseId])

  const changeSlide = (caseId: string, totalSlides: number, direction: 'prev' | 'next') => {
    setSlideIndexByCase((prev) => {
      const current = prev[caseId] ?? 0
      const nextIndex = direction === 'next' ? (current + 1) % totalSlides : (current - 1 + totalSlides) % totalSlides
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
          const currentSlide = caseItem.slides[currentSlideIndex]
          return (
            <article key={caseItem.id} className="card case-showcase" role="listitem">
              <p className="case__tag">{t.cases.eyebrow}</p>
              <h3>{caseItem.name}</h3>
              <p>{caseItem.result}</p>

              <div className="case-compare">
                <figure className="case-compare__item">
                  <img src={currentSlide.beforeImage} alt={`${caseItem.name} ${t.cases.beforeLabel}`} loading="lazy" />
                  <figcaption>{t.cases.beforeLabel}</figcaption>
                </figure>
                <figure className="case-compare__item">
                  <img src={currentSlide.afterImage} alt={`${caseItem.name} ${t.cases.afterLabel}`} loading="lazy" />
                  <figcaption>{t.cases.afterLabel}</figcaption>
                </figure>
              </div>

              <div className="case-carousel">
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, caseItem.slides.length, 'prev')} aria-label={t.cases.prevSlideLabel}>
                  ‹
                </button>
                <div className="case-carousel__dots" role="tablist" aria-label={`${caseItem.name} carousel`}>
                  {caseItem.slides.map((_, index) => (
                    <button
                      key={`${caseItem.id}-dot-${index}`}
                      type="button"
                      className={`case-carousel__dot ${currentSlideIndex === index ? 'is-active' : ''}`}
                      onClick={() => setSlide(caseItem.id, index)}
                      aria-label={`${index + 1}`}
                    />
                  ))}
                </div>
                <button type="button" className="case-carousel__btn" onClick={() => changeSlide(caseItem.id, caseItem.slides.length, 'next')} aria-label={t.cases.nextSlideLabel}>
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
