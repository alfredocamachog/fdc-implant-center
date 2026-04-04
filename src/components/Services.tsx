import type { Translations } from '../translations'

export default function Services({ t }: { t: Translations }) {
  return (
    <section className="section" id="servicios">
      <div className="section__heading">
        <p className="eyebrow">{t.services.eyebrow}</p>
        <h2>{t.services.title}</h2>
        <p>{t.services.intro}</p>
      </div>
      <div className="grid services">
        {t.services.items.map((service) => (
          <article key={service.title} className="card service">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
