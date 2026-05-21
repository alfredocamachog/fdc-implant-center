import { useEffect, useState } from 'react'
import { translations, getInitialLanguage, languages } from './translations'
import type { Language } from './translations'
import { SITE_CONFIG } from './config'
import Header from './components/Header'
import Hero from './components/Hero'
import Cases from './components/Cases'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileDock from './components/MobileDock'
import './style.css'

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('fdc-lang', language)
  }, [language])

  const t = translations[language]
  const phoneContacts = SITE_CONFIG.phones.map((phone) => ({
    id: phone.id,
    countryName: phone.countryLabel[language],
    display: phone.display,
    whatsappHref: `https://wa.me/${phone.waNumber}?text=${encodeURIComponent(t.floatingCta.message)}`,
  }))
  const emailHref = `mailto:${SITE_CONFIG.email}`

  const closeMenu = () => setMenuOpen(false)
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  }

  return (
    <div className="page">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        languages={languages}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <div className="site">
        <Hero t={t} scrollTo={scrollTo} />
        <main>
          <Cases t={t} />
          <Contact t={t} phoneContacts={phoneContacts} emailHref={emailHref} />
        </main>
        <Footer t={t} />
      </div>
      <MobileDock t={t} scrollTo={scrollTo} />
    </div>
  )
}

export default App
