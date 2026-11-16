import { useEffect, useState } from 'react'
import { translations, getInitialLanguage, saveLanguage, type Language } from './translations'
import { SITE_CONFIG } from './config'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Facility from './components/Facility'
import Cases from './components/Cases'
import Insurance from './components/Insurance'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileDock from './components/MobileDock'
import FloatingCta from './components/FloatingCta'
import LanguageFab from './components/LanguageFab'
import './style.css'

// Keeps the address bar clean: section navigation never leaves a #fragment in the URL.
const clearHash = () => {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

function App() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    saveLanguage(lang)
  }

  // Keep <html lang> in sync for screen readers, translation tools and search engines.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // Shared links with a #section (or the skip link) still land on that section, then the hash is dropped.
  useEffect(() => {
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      document.getElementById(id)?.scrollIntoView()
      clearHash()
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const t = translations[language]
  const phoneContacts = SITE_CONFIG.phones.map((phone) => ({
    id: phone.id,
    countryName: phone.countryLabel[language],
    display: phone.display,
    whatsappHref: `https://wa.me/${phone.waNumber}?text=${encodeURIComponent(t.floatingCta.message)}`,
  }))
  const emailHref = `mailto:${SITE_CONFIG.email}`

  const closeMenu = () => setMenuOpen(false)
  // Links keep real #anchors (crawlable, open in new tab); JS adds smooth scroll, moves focus to the section and keeps the URL hash-free.
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    clearHash()
    closeMenu()
  }

  return (
    <div className="page">
      <a className="skip-link" href="#contenido">
        {t.navigation.skipToContent}
      </a>
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <main id="contenido" tabIndex={-1}>
        <Hero t={t} scrollTo={scrollTo} />
        <div className="site">
          <About t={t} />
          <Services t={t} scrollTo={scrollTo} />
          <Cases t={t} scrollTo={scrollTo} />
          <Facility t={t} />
          <Insurance t={t} />
          <Contact t={t} emailHref={emailHref} />
        </div>
      </main>
      <Footer t={t} scrollTo={scrollTo} />
      <LanguageFab language={language} setLanguage={setLanguage} />
      <FloatingCta t={t} language={language} phones={phoneContacts} />
      <MobileDock t={t} scrollTo={scrollTo} />
    </div>
  )
}

export default App
