import type { Translations } from '../translations'
import { SITE_CONFIG } from '../config'
import { trackEvent } from '../analytics'

interface FooterProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
  </svg>
)

const ArrowIcon = ({ up = false }: { up?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d={up ? 'M12 19V5m-6 6 6-6 6 6' : 'M5 12h14m-5-5 5 5-5 5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Footer({ t, scrollTo }: FooterProps) {
  const f = t.footer
  const year = new Date().getFullYear()
  const { instagram } = SITE_CONFIG.social
  const { maps } = SITE_CONFIG
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(maps.query)}${
    maps.placeId ? `&destination_place_id=${maps.placeId}` : ''
  }`

  const [beforeCompany, afterCompany] = f.rightsFull.replace('{year}', String(year)).split('{company}')

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="footer__logo" href="#inicio" onClick={scrollTo('inicio')}>
              <img src="/logo-header.webp" alt="" width={160} height={160} loading="lazy" />
              <span>
                <span className="footer__logo-title">{t.brand.title}</span>
                <span className="footer__logo-tagline">{t.brand.tagline}</span>
              </span>
            </a>
            <p className="footer__about">{f.about}</p>
            <a
              className="footer__instagram"
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('instagram_click', { placement: 'footer' })}
            >
              <span className="footer__instagram-icon">
                <InstagramIcon />
              </span>
              <span>
                <span className="footer__instagram-label">{f.followLabel}</span>
                <span className="footer__instagram-handle">{instagram.handle}</span>
              </span>
            </a>
          </div>

          <nav className="footer__col" aria-label={f.exploreTitle}>
            <p className="footer__title">{f.exploreTitle}</p>
            <ul>
              {t.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={scrollTo(link.href.slice(1))}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__title">{f.contactTitle}</p>
            <ul>
              {SITE_CONFIG.phones.map((phone) => (
                <li key={phone.id}>
                  <a href={`tel:${phone.e164}`} onClick={() => trackEvent('phone_click', { placement: 'footer', phone: phone.id })}>
                    <span className="footer__muted">{phone.countryLabel.en}</span> {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} onClick={() => trackEvent('email_click', { placement: 'footer' })}>
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__title">{f.visitTitle}</p>
            <address className="footer__address">{SITE_CONFIG.address.en}</address>
            <a
              className="footer__link-arrow"
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('directions_click', { placement: 'footer' })}
            >
              {f.directions}
              <ArrowIcon />
            </a>
            <p className="footer__muted footer__availability">{f.availability}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            {beforeCompany}
            <a href="https://www.desertiatech.com/" target="_blank" rel="noopener noreferrer">
              {f.rightsDev}
            </a>
            {afterCompany}
          </p>
          <p className="footer__muted">{t.panel.general.license}</p>
          <a className="footer__top" href="#inicio" onClick={scrollTo('inicio')}>
            {f.backToTop}
            <ArrowIcon up />
          </a>
        </div>
      </div>
    </footer>
  )
}
