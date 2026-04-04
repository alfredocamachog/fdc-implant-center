import type { Translations } from '../translations'

export default function Cases({ t }: { t: Translations }) {
  return (
    <section className="section" id="casos">
      <div className="section__heading">
        <p className="eyebrow">{t.cases.eyebrow}</p>
        <h2>{t.cases.title}</h2>
      </div>
      <div className="grid cases">
        {t.cases.cards.map((caseItem) => (
          <article key={caseItem.name} className="card case">
            <p className="case__tag">{t.cases.tagline}</p>
            <h3>{caseItem.name}</h3>
            <p>{caseItem.result}</p>
            <ul>
              {caseItem.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
