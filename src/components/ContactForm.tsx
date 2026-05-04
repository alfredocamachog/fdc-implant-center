import { useState } from 'react'
import type { Translations } from '../translations'

export default function ContactForm({ t }: { t: Translations }) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre.trim() || !formData.email.trim()) return
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'No se pudo enviar la solicitud')
      }

      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo enviar la solicitud')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="contact__form contact__success">
        <h3>{t.contact.successTitle}</h3>
        <p>{t.contact.successMessage}</p>
        <button type="button" className="btn ghost" onClick={handleReset}>
          {t.contact.successReset}
        </button>
      </div>
    )
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <label>
        {t.contact.labels.name}
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder={t.contact.placeholders.name}
          required
        />
      </label>
      <label>
        {t.contact.labels.email}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.contact.placeholders.email}
          required
        />
      </label>
      <label>
        {t.contact.labels.phone}
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder={t.contact.placeholders.phone}
        />
      </label>
      <label className="full-width">
        {t.contact.labels.message}
        <textarea
          name="mensaje"
          rows={4}
          value={formData.mensaje}
          onChange={handleChange}
          placeholder={t.contact.placeholders.message}
        ></textarea>
      </label>
      <button type="submit" className="btn primary" disabled={isSubmitting}>
        {isSubmitting ? t.contact.labels.submitting : t.contact.labels.submit}
      </button>
      {submitError ? <p className="contact__error">{submitError}</p> : null}
      <p className="disclaimer">{t.contact.disclaimer}</p>
    </form>
  )
}
