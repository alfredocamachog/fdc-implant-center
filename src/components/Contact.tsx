import type { Translations } from '../translations'
import ContactForm from './ContactForm'

interface ContactProps {
  t: Translations
  phoneHref: string
  emailHref: string
}

export default function Contact({ t, phoneHref, emailHref }: ContactProps) {
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
      </div>
      <ContactForm t={t} />
    </section>
  )
}
