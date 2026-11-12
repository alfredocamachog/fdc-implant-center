import { useEffect, useState } from 'react'
import { languages, type Language, type Translations } from '../translations'

interface HeaderProps {
  t: Translations
  language: Language
  setLanguage: (lang: Language) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

// Distance scrolled before the header switches from transparent (over the video) to solid.
const SOLID_AFTER_PX = 24

export default function Header({ t, language, setLanguage, menuOpen, setMenuOpen, scrollTo }: HeaderProps) {
  const [solid, setSolid] = useState(false)

  // Passive listener + rAF so the check never blocks scrolling.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setSolid(window.scrollY > SOLID_AFTER_PX)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={`site-header ${solid || menuOpen ? 'is-solid' : 'is-overlay'}`}>
      <div className="site-header__inner">
        <a className="logo" href="#inicio" onClick={scrollTo('inicio')}>
          <span className="logo__badge">
            <img src="/logo-header.webp" alt="" className="logo__badge-img" width={160} height={160} />
          </span>
          <span className="logo__text">
            <span className="logo__title">{t.brand.title}</span>
            <span className="logo__tagline">{t.brand.tagline}</span>
          </span>
        </a>
        <nav id="site-navigation" className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label={t.navigation.mainLabel}>
          <div className="nav__links">
            {t.navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={scrollTo(link.href.slice(1))}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="header-controls">
          <div className="lang-switch" role="group" aria-label={t.languageToggle.ariaLabel}>
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                lang={code}
                className={`lang-switch__btn ${language === code ? 'is-active' : ''}`}
                aria-pressed={language === code}
                aria-label={code === 'es' ? 'Español' : 'English'}
                onClick={() => setLanguage(code)}
              >
                {code.toUpperCase()}
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
