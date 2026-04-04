import type { Translations } from '../translations'

interface FloatingCtaProps {
  t: Translations
  whatsappLink: string
}

export default function FloatingCta({ t, whatsappLink }: FloatingCtaProps) {
  return (
    <a className="floating-cta" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={t.floatingCta.ariaLabel}>
      <span className="floating-cta__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="presentation" focusable="false">
          <path
            d="M16.004 3.003C9.38 3.003 4 8.385 4 15.006c0 2.668.768 5.184 2.222 7.374L4 28.997l7.06-2.197A11.946 11.946 0 0 0 16.004 27C22.627 27 28 21.617 28 15c0-6.627-5.373-11.997-11.996-11.997h0zm6.622 16.954c-.277.78-1.637 1.52-2.24 1.59-.602.07-1.155.332-3.865-.799-3.258-1.4-5.342-4.837-5.508-5.062-.166-.226-1.316-1.75-1.316-3.335s.833-2.365 1.128-2.695c.294-.33.648-.413.863-.413.215 0 .431.002.622.01.2.009.466-.075.73.555.277.666.946 2.295 1.03 2.46.083.165.138.357.03.582-.108.226-.162.357-.321.548-.16.19-.34.425-.486.571-.162.16-.33.334-.142.66.189.327.84 1.377 1.802 2.226 1.237 1.103 2.275 1.445 2.6 1.604.324.16.513.135.702-.08.189-.215.812-.95 1.028-1.276.215-.327.455-.274.76-.165.304.108 1.929.909 2.262 1.073.333.165.555.248.638.384.084.136.084.782-.193 1.563z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="floating-cta__label">{t.floatingCta.label}</span>
    </a>
  )
}
