import type { Language } from '../translations'

// Minimal flags: flat colours, no fine detail, so they stay crisp at icon size.
export default function Flag({ code }: { code: Language }) {
  if (code === 'es') {
    return (
      <svg className="flag" viewBox="0 0 21 14" aria-hidden="true">
        <rect width="7" height="14" fill="#006847" />
        <rect x="7" width="7" height="14" fill="#fff" />
        <rect x="14" width="7" height="14" fill="#ce1126" />
        <circle cx="10.5" cy="7" r="1.6" fill="#8c5a2b" />
      </svg>
    )
  }
  return (
    <svg className="flag" viewBox="0 0 21 14" aria-hidden="true">
      <rect width="21" height="14" fill="#fff" />
      {[0, 4, 8, 12].map((y) => (
        <rect key={y} y={y} width="21" height="2" fill="#b22234" />
      ))}
      <rect width="9" height="8" fill="#3c3b6e" />
    </svg>
  )
}
