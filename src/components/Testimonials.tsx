import type { Translations } from '../translations'

export default function Testimonials({ t }: { t: Translations }) {
  return (
    <section className="section section--alt" id="testimonios">
      <div className="section__heading">
        <p className="eyebrow">{t.testimonials.eyebrow}</p>
        <h2>{t.testimonials.title}</h2>
      </div>
      <div className="grid testimonials">
        {t.testimonials.items.map((testimonial) => (
          <blockquote key={testimonial.author} className="card testimonial">
            <p>"{testimonial.quote}"</p>
            <cite>{testimonial.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
