import type { Translations, Language } from '../translations'

interface HeaderProps {
  t: Translations
  language: Language
  setLanguage: (lang: Language) => void
  languages: Language[]
  menuOpen: boolean
  setMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

export default function Header({ t, language, setLanguage, languages, menuOpen, setMenuOpen, scrollTo }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="logo" href="#" onClick={scrollTo('inicio')}>
          <span className="logo__badge">
            <img src="/favicon.png" alt={t.brand.title} className="logo__badge-img" />
          </span>
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
                <img src={code === 'es' ? '/flags/mx-flag.png' : 'https://flagcdn.com/w20/us.png'} alt={code === 'es' ? 'Espanol' : 'English'} />
              </button>
            ))}
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
          >
            <span className="sr-only">{menuOpen ? t.navigation.close : t.navigation.open}</span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
