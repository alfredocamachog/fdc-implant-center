import { useId, useState } from 'react'
import type { Translations } from '../translations'

type Plan = Translations['insurance']['items'][number]

// Logos are cropped from the clinic's insurer sheets; their pixel size is 2x the source crop.
const Logo = ({ plan, hidden = false }: { plan: Plan; hidden?: boolean }) => (
  <li className="ins-logo" aria-hidden={hidden || undefined}>
    <img
      src={`/insurance/${plan.id}.webp`}
      alt={hidden ? '' : plan.name}
      width={plan.width}
      height={plan.height}
      // Decode up front: async decoding can leave logos blank for a frame while the strip moves.
      decoding="sync"
      draggable={false}
    />
  </li>
)

// One marquee row: the set is rendered twice so the loop is seamless; only the first copy is announced.
const Row = ({ plans, reverse = false, label }: { plans: readonly Plan[]; reverse?: boolean; label?: string }) => (
  <div className={`ins-row ${reverse ? 'ins-row--reverse' : ''}`}>
    <div className="ins-track">
      <ul className="ins-set" aria-label={label}>
        {plans.map((plan) => (
          <Logo key={plan.id} plan={plan} />
        ))}
      </ul>
      <ul className="ins-set" aria-hidden="true">
        {plans.map((plan) => (
          <Logo key={plan.id} plan={plan} hidden />
        ))}
      </ul>
    </div>
  </div>
)

export default function Insurance({ t }: { t: Translations }) {
  const ins = t.insurance
  const baseId = useId()
  const half = Math.ceil(ins.items.length / 2)
  const first = ins.items.slice(0, half)
  const second = ins.items.slice(half)
  // Moving content needs a way to stop it (WCAG 2.2.2); hover also pauses on desktop.
  const [paused, setPaused] = useState(false)

  return (
    <section className="section ins" id="aseguranzas" aria-labelledby={`${baseId}-title`}>
      <header className="ins__heading">
        <p className="eyebrow">{ins.eyebrow}</p>
        <h2 id={`${baseId}-title`}>{ins.title}</h2>
        <p>{ins.intro}</p>
      </header>

      <div className={`ins__marquee ${paused ? 'is-paused' : ''}`}>
        <Row plans={first} label={ins.listLabel} />
        <Row plans={second} reverse label={ins.listLabel} />
        <button
          type="button"
          className="ins__toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? ins.playLabel : ins.pauseLabel}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {paused ? <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /> : <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />}
          </svg>
        </button>
      </div>
    </section>
  )
}
