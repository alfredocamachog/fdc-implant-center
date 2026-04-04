import type { Translations } from '../translations'

export default function ContactForm({ t }: { t: Translations }) {
  return (
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
          {t.contact.options.map((option) => (
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
  )
}
