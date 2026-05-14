import { useState } from 'react'
import type { Translations } from '../translations'

interface HeroProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

const isEuropeanCourse = (item: string) => {
  const normalized = item.toLowerCase()
  return /(switzerland|suiza|germany|alemania|italy|italia|bern|berna|milan|mil[aá]n|campo tures|european)/i.test(normalized)
}

export default function Hero({ t, scrollTo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'higherEducation' | 'coursesAndTalks' | 'workExperience'>('general')

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
          <a className="btn ghost" href="#" onClick={scrollTo('casos')}>
            {t.hero.secondaryCta}
          </a>
        </div>
      </div>
      <div className="hero__panel">
        <div className="hero__photo-wrapper">
          <img src={t.heroPhoto.src} alt={t.heroPhoto.alt} />
        </div>
        <div className="panel__tabs" role="tablist" aria-label={t.panel.tabs.ariaLabel}>
          <button className={`panel__tab ${activeTab === 'general' ? 'is-active' : ''}`} type="button" role="tab" aria-selected={activeTab === 'general'} onClick={() => setActiveTab('general')}>
            {t.panel.tabs.general}
          </button>
          <button
            className={`panel__tab ${activeTab === 'higherEducation' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTab === 'higherEducation'}
            onClick={() => setActiveTab('higherEducation')}
          >
            {t.panel.tabs.higherEducation}
          </button>
          <button
            className={`panel__tab ${activeTab === 'coursesAndTalks' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTab === 'coursesAndTalks'}
            onClick={() => setActiveTab('coursesAndTalks')}
          >
            {t.panel.tabs.coursesAndTalks}
          </button>
          <button
            className={`panel__tab ${activeTab === 'workExperience' ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTab === 'workExperience'}
            onClick={() => setActiveTab('workExperience')}
          >
            {t.panel.tabs.workExperience}
          </button>
        </div>
        <div className="panel__tab-card" role="tabpanel">
          {activeTab === 'general' ? (
            <div className="panel__general">
              <h3 className="panel__doctor-name">{t.panel.general.name}</h3>
              <p className="panel__license">{t.panel.general.license}</p>
              {t.panel.general.roles.map((role) => (
                <p className="panel__role" key={role}>
                  {role}
                </p>
              ))}
              <div className="panel__general-contact">
                {t.panel.general.contactLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'higherEducation' ? (
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
          ) : null}

          {activeTab === 'coursesAndTalks' ? (
            <ul className="panel__course-list">
              {t.panel.sections.coursesAndTalks.items.map((item, idx) => {
                const isEurope = isEuropeanCourse(item)
                return (
                  <li className={isEurope ? 'is-europe' : ''} key={`${item}-${idx}`}>
                    {isEurope ? (
                      <span className="panel__course-eu-tag">
                        <span className="panel__course-eu-icon" aria-hidden="true">
                          ★
                        </span>
                        EU
                      </span>
                    ) : null}
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>
          ) : null}

          {activeTab === 'workExperience' ? (
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
          ) : null}
        </div>
      </div>
    </section>
  )
}
