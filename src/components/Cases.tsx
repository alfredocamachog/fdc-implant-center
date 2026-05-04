import { useState } from 'react'
import type { Translations } from '../translations'

export default function Cases({ t }: { t: Translations }) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }))
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
          const isExpanded = !!expandedCards[caseItem.id]
          return (
            <article key={caseItem.id} className="card case-showcase" role="listitem">
              <p className="case__tag">{t.cases.eyebrow}</p>
              <h3>{caseItem.name}</h3>
              <p>{caseItem.result}</p>
              <div className="case-compare">
                <figure className="case-compare__item">
                  <img src={caseItem.beforeImage} alt={`${caseItem.name} ${t.cases.beforeLabel}`} loading="lazy" />
                  <figcaption>{t.cases.beforeLabel}</figcaption>
                </figure>
                <figure className="case-compare__item">
                  <img src={caseItem.afterImage} alt={`${caseItem.name} ${t.cases.afterLabel}`} loading="lazy" />
                  <figcaption>{t.cases.afterLabel}</figcaption>
                </figure>
              </div>
              <button type="button" className="case-note__toggle" onClick={() => toggleCard(caseItem.id)} aria-expanded={isExpanded}>
                {isExpanded ? t.cases.readLessLabel : t.cases.readMoreLabel}
              </button>
              {isExpanded ? <p className="case-note">{caseItem.note}</p> : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
