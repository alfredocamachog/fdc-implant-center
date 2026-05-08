import { useState } from 'react'
import type { Translations } from '../translations'

interface HeroProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
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
        <div className="panel__social" aria-label="Social links">
          <a className="panel__social-link" href="https://www.facebook.com/share/17ioeU77PE/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.7 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v8h3.2z" />
            </svg>
          </a>
          <a className="panel__social-link" href="https://www.instagram.com/aridelcorro?igsh=MTl6ZHczemFnbnppMQ==" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2zm0 1.9A3.3 3.3 0 0 0 3.9 7.2v9.6a3.3 3.3 0 0 0 3.3 3.3h9.6a3.3 3.3 0 0 0 3.3-3.3V7.2a3.3 3.3 0 0 0-3.3-3.3H7.2zm10.3 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.9A3.1 3.1 0 1 0 12 15a3.1 3.1 0 0 0 0-6.2z" />
            </svg>
          </a>
        </div>
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
              {t.panel.sections.coursesAndTalks.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
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
