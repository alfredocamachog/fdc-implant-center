import type { Translations } from '../translations'

export default function Footer({ t }: { t: Translations }) {
  const year = new Date().getFullYear()

  const companyLink = (
    <a
      href="https://www.desertiatech.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t.footer.rightsDev}
    </a>
  )

  const [beforeCompany, afterCompany] = t.footer.rightsFull
    .replace('{year}', String(year))
    .split('{company}')

  return (
    <footer className="footer">
      <p>
        {beforeCompany}
        {companyLink}
        {afterCompany}
      </p>
    </footer>
  )
}
