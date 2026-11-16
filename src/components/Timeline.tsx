import { useId, useState } from 'react'
import type { ReactNode } from 'react'

export type DetailIcon = 'pin' | 'person' | 'topic'

export interface TimelineEntry {
  key: string
  /** Year shown big in the node; null shows `fallbackNode` instead. */
  end: number | null
  start?: number
  /** Replaces the end year in the node, e.g. "Now" for an ongoing role. */
  endLabel?: string
  title: string
  tags?: { text: string; tone?: 'accent' | 'soft' }[]
  subtitle?: string
  details?: { icon: DetailIcon; text: string }[]
  /** Whole years; renders the duration bar when set. */
  years?: number
}

export interface DurationLabels {
  year: string
  years: string
}

const icons: Record<DetailIcon, ReactNode> = {
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.9-3.5 3.6-5.4 7-5.4s6.1 1.9 7 5.4" />
    </>
  ),
  topic: (
    <>
      <path d="M5 5.5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 3.5v-3.5H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
      <path d="M8.5 10h7M8.5 13h4.5" />
    </>
  ),
}

const undatedNode = (
  <svg className="tl__node-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="9" y="3.5" width="6" height="11" rx="3" />
    <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" />
  </svg>
)

/**
 * Parses "2015-2020" (or a single year) into start/end years. A non-numeric end such as
 * "2026-Present" marks an ongoing period; its end is the current year.
 */
export const parsePeriod = (period: string) => {
  const [startText, endText] = period.split(/\s*[-–]\s*/)
  const start = Number(startText)
  const ongoing = Boolean(endText) && Number.isNaN(Number(endText))
  const end = ongoing ? Math.max(new Date().getFullYear(), start) : Number(endText) || start
  return { start, end, ongoing }
}

/** Newest first by end year, then start year; undated entries keep their order at the end. */
export const byNewest = <T extends { end: number | null; start?: number }>(entries: T[]) =>
  [...entries].sort((a, b) => {
    if (a.end === null || b.end === null) return (a.end === null ? 1 : 0) - (b.end === null ? 1 : 0)
    return b.end - a.end || (b.start ?? b.end) - (a.start ?? a.end)
  })

/**
 * Shared card timeline for the profile tabs: each entry is a disclosure on a vertical rail.
 * The first (newest) entry starts open; opening another closes the previous one.
 */
export default function Timeline({ entries, durations }: { entries: TimelineEntry[]; durations?: DurationLabels }) {
  const baseId = useId()
  const [open, setOpen] = useState(0)
  const longest = Math.max(...entries.map((entry) => entry.years ?? 0), 1)

  return (
    <ol className="tl">
      {entries.map((entry, index) => {
        const isOpen = open === index
        const bodyId = `${baseId}-entry-${index}`
        const hasBody = Boolean(entry.details?.length || (entry.years && durations))
        return (
          <li key={entry.key} className={`tl__item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="tl__head"
              aria-expanded={hasBody ? isOpen : undefined}
              aria-controls={hasBody ? bodyId : undefined}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="tl__node">
                {entry.end === null ? (
                  undatedNode
                ) : (
                  <>
                    <span>{entry.endLabel ?? entry.end}</span>
                    {entry.start && (entry.endLabel || entry.start !== entry.end) ? (
                      <span className="tl__node-from">{entry.start}</span>
                    ) : null}
                  </>
                )}
              </span>
              <span className="tl__main">
                <span className="tl__title">
                  {entry.title}
                  {entry.tags?.map((tag) => (
                    <span key={tag.text} className={`tl__tag ${tag.tone === 'soft' ? 'tl__tag--soft' : ''}`}>
                      {tag.text}
                    </span>
                  ))}
                </span>
                {entry.subtitle ? <span className="tl__subtitle">{entry.subtitle}</span> : null}
              </span>
              {hasBody ? (
                <svg className="tl__chevron" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              ) : (
                <span />
              )}
            </button>
            {hasBody ? (
              <div className="tl__body" id={bodyId} hidden={!isOpen}>
                {entry.details?.map((detail) => (
                  <p className="tl__detail" key={detail.text}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {icons[detail.icon]}
                    </svg>
                    {detail.text}
                  </p>
                ))}
                {entry.years && durations ? (
                  <div className="tl__span">
                    <span className="tl__bar" aria-hidden="true">
                      <span style={{ width: `${(entry.years / longest) * 100}%` }} />
                    </span>
                    <span className="tl__duration">
                      {(entry.years === 1 ? durations.year : durations.years).replace('{count}', String(entry.years))}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
