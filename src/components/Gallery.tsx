import type { Translations } from '../translations'

export default function Gallery({ t }: { t: Translations }) {
  return (
    <section className="section gallery" id="galeria">
      <div className="section__heading">
        <p className="eyebrow">{t.gallery.eyebrow}</p>
        <h2>{t.gallery.title}</h2>
        <p>{t.gallery.intro}</p>
      </div>
      <div className="gallery__grid">
        {t.gallery.items.map((image) => (
          <figure key={image.caption} className="gallery__item">
            <img src={image.src} alt={image.caption} loading="lazy" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
