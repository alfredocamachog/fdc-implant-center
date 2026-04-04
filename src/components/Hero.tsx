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
        <p className="panel__title">{t.panel.title}</p>
        <p className="panel__subtitle">{t.panel.subtitle}</p>
        <ul>
          {t.panel.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
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
