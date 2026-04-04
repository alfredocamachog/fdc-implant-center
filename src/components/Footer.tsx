import type { Translations } from '../translations'

export default function Footer({ t }: { t: Translations }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {t.brand.title}. {t.footer.rights}
      </p>
      <p>{t.footer.availability}</p>
    </footer>
  )
}
