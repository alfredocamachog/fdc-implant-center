import { useId } from 'react'
import type { Translations } from '../translations'
import { trackEvent } from '../analytics'
import { SERVICE_SELECT_EVENT } from '../events'
import ServiceIcon, { ServiceIconDefs } from './ServiceIcons'

interface ServicesProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

type ServiceItem = Translations['services']['items'][number]

// Core prosthodontic treatments get a larger "bento" card so the page leads with the specialty.
const FEATURED = new Set(['rehab', 'all-on-x'])

const ArrowIcon = () => (
  <svg className="svc-arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface CardProps {
  item: ServiceItem
  variant: 'default' | 'featured' | 'partner'
  tag?: string
  askLabel: string
  onSelect: (item: ServiceItem, placement: string) => (e: React.MouseEvent) => void
}

const ServiceCard = ({ item, variant, tag, askLabel, onSelect }: CardProps) => (
  <li className={`svc-card svc-card--${variant}`}>
    <span className="svc-card__icon">
      <ServiceIcon id={item.id} />
    </span>
    <div className="svc-card__body">
      {tag ? <span className="svc-card__tag">{tag}</span> : null}
      <h4 className="svc-card__title">
        {/* Stretched link: the whole card is clickable, but only the title is announced. */}
        <a className="svc-card__link" href="#contacto" onClick={onSelect(item, variant)}>
          {item.title}
        </a>
      </h4>
      <p className="svc-card__text">{item.description}</p>
      <span className="svc-card__ask" aria-hidden="true">
        {askLabel}
        <ArrowIcon />
      </span>
    </div>
  </li>
)

export default function Services({ t, scrollTo }: ServicesProps) {
  const baseId = useId()
  const s = t.services
  const total = s.items.length + s.partnerItems.length

  const featured = s.items.filter((item) => FEATURED.has(item.id))
  const rest = s.items.filter((item) => !FEATURED.has(item.id))

  const onSelect = (item: ServiceItem, placement: string) => (e: React.MouseEvent) => {
    trackEvent('service_inquiry', { service: item.id, placement })
    window.dispatchEvent(
      new CustomEvent(SERVICE_SELECT_EVENT, { detail: s.inquiryTemplate.replace('{service}', item.title) }),
    )
    scrollTo('contacto')(e)
  }

  const onCta = (e: React.MouseEvent) => {
    trackEvent('service_inquiry', { service: 'unsure', placement: 'services_cta' })
    scrollTo('contacto')(e)
  }

  return (
    <section className="section svc" id="servicios" aria-labelledby={`${baseId}-title`}>
      <ServiceIconDefs />

      <header className="svc__heading">
        <div>
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id={`${baseId}-title`}>{s.title}</h2>
        </div>
        <div className="svc__heading-aside">
          <p>{s.intro}</p>
          <p className="svc__count">
            <span className="svc__count-dot" aria-hidden="true" />
            {s.countLabel.replace('{count}', String(total))}
          </p>
        </div>
      </header>

      <div className="svc__group">
        <h3 className="svc__group-title">{s.inHouseTitle}</h3>
        <ul className="svc__bento">
          {featured.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              variant="featured"
              tag={s.featuredTag}
              askLabel={s.askLabel}
              onSelect={onSelect}
            />
          ))}
          {rest.map((item) => (
            <ServiceCard key={item.id} item={item} variant="default" askLabel={s.askLabel} onSelect={onSelect} />
          ))}
          <li className="svc-cta">
            <p className="svc-cta__title">{s.ctaText}</p>
            <p className="svc-cta__text">{s.ctaBody}</p>
            <a className="btn primary small svc-cta__btn" href="#contacto" onClick={onCta}>
              {s.ctaLink}
              <ArrowIcon />
            </a>
          </li>
        </ul>
      </div>

      <div className="svc-brands">
        <div className="svc-brands__copy">
          <p className="svc-brands__eyebrow">{s.brandsEyebrow}</p>
          <h3 className="svc-brands__title">{s.brandsTitle}</h3>
          <p className="svc-brands__text">{s.brandsText}</p>
        </div>
        <ul className="svc-brands__logos">
          {s.brands.map((brand) => (
            <li key={brand.id} className={`svc-brands__logo svc-brands__logo--${brand.id}`}>
              <img src={brand.src} alt={brand.name} width={brand.width} height={brand.height} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>

      <div className="svc-partner">
        <div className="svc-partner__intro">
          <span className="svc-partner__badge">{s.partnerTag}</span>
          <h3 className="svc-partner__title">{s.partnerTitle}</h3>
          <p className="svc-partner__note">{s.partnerNote}</p>
        </div>
        <ul className="svc-partner__list">
          {s.partnerItems.map((item) => (
            <ServiceCard key={item.id} item={item} variant="partner" askLabel={s.askLabel} onSelect={onSelect} />
          ))}
        </ul>
      </div>
    </section>
  )
}
