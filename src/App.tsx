import { useEffect, useState } from 'react'
import { translations, getInitialLanguage, languages } from './translations'
import type { Language } from './translations'
import { SITE_CONFIG } from './config'
import './style.css'

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('fdc-lang', language)
  }, [language])

  const t = translations[language]
  const whatsappLink = `https://wa.me/${SITE_CONFIG.phone}?text=${encodeURIComponent(t.floatingCta.message)}`
  const phoneHref = `tel:+${SITE_CONFIG.phone}`
  const emailHref = `mailto:${SITE_CONFIG.email}`

  const closeMenu = () => setMenuOpen(false)
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="logo" href="#" onClick={scrollTo('inicio')}>
            <span className="logo__badge">FD</span>
            <span className="logo__text">
              <span className="logo__title">{t.brand.title}</span>
              <span className="logo__tagline">{t.brand.tagline}</span>
            </span>
          </a>
          <nav id="site-navigation" className={`nav ${menuOpen ? 'nav--open' : ''}`}>
            <div className="nav__links">
              {t.navLinks.map((link) => (
                <a key={link.href} href="#" onClick={scrollTo(link.href.slice(1))}>
                  {link.label}
                </a>
              ))}
            </div>
            <a className="btn primary small nav__cta" href="#" onClick={scrollTo('contacto')}>
              {t.hero.primaryCta}
            </a>
          </nav>
          <div className="header-controls">
            <div className="language-toggle" role="group" aria-label={t.languageToggle.ariaLabel}>
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`language-toggle__btn ${language === code ? 'is-active' : ''}`}
                  aria-pressed={language === code}
                  onClick={() => setLanguage(code)}
                >
                  <img src={code === 'es' ? 'https://flagcdn.com/w20/es.png' : 'https://flagcdn.com/w20/us.png'} alt={code === 'es' ? 'Español' : 'English'} />
                </button>
              ))}
            </div>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">{menuOpen ? t.navigation.close : t.navigation.open}</span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="site">
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
              {t.heroStats.map((stat: any) => (
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
              {t.panel.bullets.map((bullet: string) => (
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

        <main>
          <section className="section" id="servicios">
            <div className="section__heading">
              <p className="eyebrow">{t.services.eyebrow}</p>
              <h2>{t.services.title}</h2>
              <p>{t.services.intro}</p>
            </div>
            <div className="grid services">
              {t.services.items.map((service: any) => (
                <article key={service.title} className="card service">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.points.map((point: string) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section section--alt" id="metodologia">
            <div className="section__heading">
              <p className="eyebrow">{t.methodology.eyebrow}</p>
              <h2>{t.methodology.title}</h2>
            </div>
            <div className="timeline">
              {t.methodology.steps.map((step: any, index: number) => (
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

          <section className="section gallery" id="galeria">
            <div className="section__heading">
              <p className="eyebrow">{t.gallery.eyebrow}</p>
              <h2>{t.gallery.title}</h2>
              <p>{t.gallery.intro}</p>
            </div>
            <div className="gallery__grid">
              {t.gallery.items.map((image: any) => (
                <figure key={image.caption} className="gallery__item">
                  <img src={image.src} alt={image.caption} loading="lazy" />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="section" id="casos">
            <div className="section__heading">
              <p className="eyebrow">{t.cases.eyebrow}</p>
              <h2>{t.cases.title}</h2>
            </div>
            <div className="grid cases">
              {t.cases.cards.map((caseItem: any) => (
                <article key={caseItem.name} className="card case">
                  <p className="case__tag">{t.cases.tagline}</p>
                  <h3>{caseItem.name}</h3>
                  <p>{caseItem.result}</p>
                  <ul>
                    {caseItem.metrics.map((metric: string) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section section--alt" id="testimonios">
            <div className="section__heading">
              <p className="eyebrow">{t.testimonials.eyebrow}</p>
              <h2>{t.testimonials.title}</h2>
            </div>
            <div className="grid testimonials">
              {t.testimonials.items.map((testimonial: any) => (
                <blockquote key={testimonial.author} className="card testimonial">
                  <p>"{testimonial.quote}"</p>
                  <cite>{testimonial.author}</cite>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="section profile" id="equipo">
            <div className="profile__bio">
              <p className="eyebrow">{t.profile.eyebrow}</p>
              <h2>{t.profile.title}</h2>
              <p>{t.profile.description}</p>
              <ul>
                {t.profile.bullets.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="profile__card">
              <p className="profile__quote">"{t.profile.quote}"</p>
              <span>{t.profile.credential}</span>
            </div>
          </section>

          <section className="section contact" id="contacto">
            <div className="section__heading">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.intro}</p>
              <div className="contact__details">
                <a href={phoneHref}>{t.contact.details.phone}</a>
                <a href={emailHref}>{t.contact.details.email}</a>
                <span>{t.contact.details.address}</span>
              </div>
            </div>
            <form className="contact__form">
              <label>
                {t.contact.labels.name}
                <input type="text" name="nombre" placeholder={t.contact.placeholders.name} required />
              </label>
              <label>
                {t.contact.labels.email}
                <input type="email" name="email" placeholder={t.contact.placeholders.email} required />
              </label>
              <label>
                {t.contact.labels.phone}
                <input type="tel" name="telefono" placeholder={t.contact.placeholders.phone} />
              </label>
              <label>
                {t.contact.labels.interest}
                <select name="interes" defaultValue="">
                  <option value="" disabled>
                    {t.contact.placeholders.select}
                  </option>
                  {t.contact.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="full-width">
                {t.contact.labels.message}
                <textarea name="mensaje" rows={4} placeholder={t.contact.placeholders.message}></textarea>
              </label>
              <button type="submit" className="btn primary">
                {t.contact.labels.submit}
              </button>
              <p className="disclaimer">{t.contact.disclaimer}</p>
            </form>
          </section>
        </main>

        <footer className="footer">
          <p>
            © {new Date().getFullYear()} {t.brand.title}. {t.footer.rights}
          </p>
          <p>{t.footer.availability}</p>
        </footer>
      </div>

      <a className="floating-cta" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={t.floatingCta.ariaLabel}>
        <span className="floating-cta__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="presentation" focusable="false">
            <path
              d="M16.004 3.003C9.38 3.003 4 8.385 4 15.006c0 2.668.768 5.184 2.222 7.374L4 28.997l7.06-2.197A11.946 11.946 0 0 0 16.004 27C22.627 27 28 21.617 28 15c0-6.627-5.373-11.997-11.996-11.997h0zm6.622 16.954c-.277.78-1.637 1.52-2.24 1.59-.602.07-1.155.332-3.865-.799-3.258-1.4-5.342-4.837-5.508-5.062-.166-.226-1.316-1.75-1.316-3.335s.833-2.365 1.128-2.695c.294-.33.648-.413.863-.413.215 0 .431.002.622.01.2.009.466-.075.73.555.277.666.946 2.295 1.03 2.46.083.165.138.357.03.582-.108.226-.162.357-.321.548-.16.19-.34.425-.486.571-.162.16-.33.334-.142.66.189.327.84 1.377 1.802 2.226 1.237 1.103 2.275 1.445 2.6 1.604.324.16.513.135.702-.08.189-.215.812-.95 1.028-1.276.215-.327.455-.274.76-.165.304.108 1.929.909 2.262 1.073.333.165.555.248.638.384.084.136.084.782-.193 1.563z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="floating-cta__label">{t.floatingCta.label}</span>
      </a>
    </div>
  )
}

export default App
