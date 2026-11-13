import { useEffect, useId, useRef, useState } from 'react'
import type { Translations } from '../translations'

type Plan = Translations['insurance']['items'][number]

// Logos are cropped from the clinic's insurer sheets; their pixel size is 2x the source crop.
const Logo = ({ plan, hidden = false }: { plan: Plan; hidden?: boolean }) => (
  <li className="ins-logo" aria-hidden={hidden || undefined}>
    <img src={`/insurance/${plan.id}.webp`} alt={hidden ? '' : plan.name} width={plan.width} height={plan.height} draggable={false} />
  </li>
)

// Seconds for one full pass of a row's logo set.
const passSeconds = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 120
  return window.matchMedia('(max-width: 640px)').matches ? 55 : 70
}

/*
 * Each row is a native horizontal scroller nudged forward with scrollLeft, NOT a CSS-transformed
 * strip. A transformed strip is one GPU texture ~5,000 CSS px wide (~15,000 device px on a 3x
 * iPhone), past iOS Safari's texture limit, so iPhones painted the rows blank. Scrollers are
 * painted in tiles and have no such limit; visitors can also swipe the logos themselves.
 */
const useAutoScroll = (ref: React.RefObject<HTMLDivElement | null>, reverse: boolean, paused: boolean) => {
  const pausedRef = useRef(paused)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const el = ref.current
    const firstSet = el?.firstElementChild as HTMLElement | null
    if (!el || !firstSet) return

    let half = 0 // width of one logo set: scrolling by exactly this much is a seamless loop
    let pos = 0
    let raf = 0
    let last = 0
    let holdUntil = 0 // auto-scroll waits while/after the visitor swipes
    let hovering = false
    let inView = false

    let lastSet = 0 // scrollLeft as the browser stored it after our last write (it may round)

    const wrap = () => {
      if (!half) return
      if (pos >= half) pos -= half
      else if (pos < 0) pos += half
    }
    const apply = () => {
      el.scrollLeft = pos
      lastSet = el.scrollLeft
    }
    // The scroll position moved without us: the visitor swiped. Follow them, pause briefly, and if
    // they reached either end jump to the identical spot in the other copy so the loop never ends.
    const adoptExternalScroll = () => {
      if (!half || Math.abs(el.scrollLeft - lastSet) <= 2) return false
      pos = el.scrollLeft
      holdUntil = Math.max(holdUntil, performance.now() + 1500)
      if (pos >= half) pos -= half
      else if (pos <= 0) pos = half - 1
      apply()
      return true
    }
    // Re-measured as logos load (they are 0px wide until then). Position is kept as a fraction of
    // the set so a late measurement doesn't jump; the reverse row starts at the end of its set.
    let started = false
    const measure = () => {
      const next = firstSet.offsetWidth
      if (!next) return
      if (!started) {
        pos = reverse ? next - 1 : 0
        started = true
      } else if (half) {
        pos = (pos / half) * next
      }
      half = next
      wrap()
      apply()
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      // Checked every frame, not only in `scroll` events, so a swipe is never overwritten even if
      // the browser delivers its scroll event after this frame.
      if (adoptExternalScroll()) return
      if (!half || pausedRef.current || hovering || now < holdUntil) return
      pos += ((reverse ? -1 : 1) * half * dt) / (passSeconds() * 1000)
      wrap()
      apply()
    }
    const run = () => {
      const shouldRun = inView && document.visibilityState === 'visible'
      if (shouldRun && !raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const onScroll = () => {
      adoptExternalScroll()
    }
    const onTouchStart = () => (holdUntil = Infinity)
    const onTouchEnd = () => (holdUntil = performance.now() + 1500)
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onEnter = () => (hovering = canHover)
    const onLeave = () => (hovering = false)

    const resize = new ResizeObserver(measure)
    resize.observe(firstSet)
    const visible = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      run()
    })
    visible.observe(el)

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', run)
    measure()

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      visible.disconnect()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', run)
    }
  }, [ref, reverse])
}

// One row: the set is rendered twice so the loop is seamless; only the first copy is announced.
const Row = ({ plans, reverse = false, label, paused }: { plans: readonly Plan[]; reverse?: boolean; label?: string; paused: boolean }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  useAutoScroll(trackRef, reverse, paused)
  return (
    <div className="ins-row">
      <div className="ins-track" ref={trackRef}>
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
}

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
        <Row plans={first} label={ins.listLabel} paused={paused} />
        <Row plans={second} reverse label={ins.listLabel} paused={paused} />
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
