import type { Translations } from '../translations'

export default function Methodology({ t }: { t: Translations }) {
  return (
    <section className="section section--alt" id="metodologia">
      <div className="section__heading">
        <p className="eyebrow">{t.methodology.eyebrow}</p>
        <h2>{t.methodology.title}</h2>
      </div>
      <div className="timeline">
        {t.methodology.steps.map((step, index) => (
          <div key={step.title} className="timeline__item">
            <span className="timeline__index">0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
