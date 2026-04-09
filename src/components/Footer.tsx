import type { Translations } from '../translations'

export default function Footer({ t }: { t: Translations }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>{t.footer.rightsFull.replace('{year}', String(year))}</p>
    </footer>
  )
}
