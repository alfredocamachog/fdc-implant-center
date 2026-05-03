import type { Translations } from '../translations'
import ContactForm from './ContactForm'
import { SITE_CONFIG } from '../config'

interface ContactProps {
  t: Translations
  phoneHref: string
  emailHref: string
}

export default function Contact({ t, phoneHref, emailHref }: ContactProps) {
  const mapsApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim()
  const hasApiKey = Boolean(mapsApiKey)
  const placeId = SITE_CONFIG.maps.placeId?.trim()
  const mapsQuery = encodeURIComponent(SITE_CONFIG.maps.query)
  const mapZoom = SITE_CONFIG.maps.zoom ?? 17
  const mapSrc = hasApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(placeId ? `place_id:${placeId}` : SITE_CONFIG.maps.query)}&zoom=${mapZoom}`
    : `https://www.google.com/maps?q=${mapsQuery}&z=${mapZoom}&output=embed`

  return (
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
        <div className="contact__map">
          <iframe
            title="Ubicacion FDC Prosthodontics & Implants"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
      <ContactForm t={t} />
    </section>
  )
}
