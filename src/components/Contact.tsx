import type { Translations } from '../translations'
import ContactForm from './ContactForm'
import { SITE_CONFIG } from '../config'
import { trackEvent } from '../analytics'

interface ContactProps {
  t: Translations
  emailHref: string
}

export default function Contact({ t, emailHref }: ContactProps) {
  const mapsApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim()
  const hasApiKey = Boolean(mapsApiKey)
  const placeId = SITE_CONFIG.maps.placeId?.trim()
  const mapsLocation = SITE_CONFIG.maps.coordinates?.trim() || SITE_CONFIG.maps.query
  const mapsQuery = encodeURIComponent(mapsLocation)
  const mapZoom = SITE_CONFIG.maps.zoom ?? 17
  const mapSrc = hasApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(placeId ? `place_id:${placeId}` : mapsLocation)}&zoom=${mapZoom}`
    : `https://www.google.com/maps?q=${mapsQuery}&z=${mapZoom}&output=embed`

  return (
    <section className="section contact" id="contacto">
      <div className="section__heading contact__info">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2>{t.contact.title}</h2>
        <p>{t.contact.intro}</p>
        <a className="contact__channel" href={emailHref} onClick={() => trackEvent('email_click', { placement: 'contact' })}>
          <span className="contact__channel-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m4.5 7 7.5 5.5L19.5 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="contact__channel-text">
            <span className="contact__channel-label">{t.contact.details.emailLabel}</span>
            <span className="contact__channel-value">{t.contact.details.email}</span>
          </span>
        </a>

        {/* Map sits right under the email so contact + location read as one column. */}
        <div className="contact__map">
          <iframe title={t.contact.mapTitle} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>

      <ContactForm t={t} />

    </section>
  )
}
