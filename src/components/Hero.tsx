import type { Translations } from '../translations'

interface HeroProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
  phoneHref: string
  emailHref: string
}

export default function Hero({ t, scrollTo, phoneHref, emailHref }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.hero.title}</h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero__actions">
          <a className="btn primary" href="#" onClick={scrollTo('contacto')}>
            {t.hero.primaryCta}
          </a>
          <a className="btn ghost" href="#" onClick={scrollTo('servicios')}>
            {t.hero.secondaryCta}
          </a>
        </div>
        <div className="hero__stats">
          {t.heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__panel">
        <div className="hero__photo-wrapper">
          <img src={t.heroPhoto.src} alt={t.heroPhoto.alt} />
          <p>{t.heroPhoto.caption}</p>
        </div>
        <div className="panel__general">
          <p className="panel__title">{t.panel.general.title}</p>
          <h3 className="panel__doctor-name">{t.panel.general.name}</h3>
          <p className="panel__license">{t.panel.general.license}</p>
          {t.panel.general.roles.map((role) => (
            <p className="panel__role" key={role}>
              {role}
            </p>
          ))}
        </div>
        <div className="panel__sections">
          <details className="panel__section" open>
            <summary>{t.panel.sections.higherEducation.title}</summary>
            <ul className="panel__study-list">
              {t.panel.sections.higherEducation.items.map((item) => (
                <li className="panel__study-item" key={`${item.title}-${item.period}`}>
                  <div>
                    <p className="panel__entry-title">{item.title}</p>
                    <p className="panel__entry-subtitle">{item.institution}</p>
                  </div>
                  <span className="panel__entry-period">{item.period}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="panel__section">
            <summary>{t.panel.sections.coursesAndTalks.title}</summary>
            <ul className="panel__course-list">
              {t.panel.sections.coursesAndTalks.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>

          <details className="panel__section">
            <summary>{t.panel.sections.workExperience.title}</summary>
            <ul className="panel__experience-list">
              {t.panel.sections.workExperience.items.map((item) => (
                <li className="panel__experience-item" key={`${item.clinic}-${item.period}`}>
                  <p className="panel__entry-title">{item.clinic}</p>
                  <p className="panel__entry-subtitle">{item.role}</p>
                  {item.supervisor ? <p className="panel__entry-meta">{item.supervisor}</p> : null}
                  <p className="panel__entry-meta">
                    {item.period} · {item.location}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className="panel__contact">
          <p>{t.panel.contactLabel}</p>
          <a href={phoneHref}>{t.panel.phone}</a>
          <a href={emailHref}>{t.panel.email}</a>
          <span>{t.panel.address}</span>
        </div>
      </div>
    </section>
  )
}
