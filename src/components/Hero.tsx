import { useEffect, useRef, useState } from 'react'
import type { Translations } from '../translations'

interface HeroProps {
  t: Translations
  scrollTo: (id: string) => (e: React.MouseEvent) => void
}

const VIDEO_SRC = '/video/hero.mp4'

const POSTER_SRC = '/video/hero-poster.webp'

// Skip the background video only for users who asked to save data.
const shouldLoadVideo = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (connection?.saveData) return false
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return false
  return true
}

export default function Hero({ t, scrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // Attach the source once the page has loaded and the browser is idle,
  // so the video never competes with the poster (LCP), fonts or app code.
  useEffect(() => {
    if (!shouldLoadVideo()) return
    const video = videoRef.current
    if (!video) return

    let idleId: number | undefined
    let timeoutId: number | undefined
    const attach = () => {
      video.src = VIDEO_SRC
      setVideoEnabled(true)
    }
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(attach, { timeout: 1500 })
      else timeoutId = setTimeout(attach, 300) as unknown as number
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      window.removeEventListener('load', schedule)
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  // The video loops continuously; it is only suspended while the hero is scrolled
  // out of view or the tab is hidden, where nobody can see it anyway.
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!videoEnabled || !video || !section) return

    let inView = true
    const sync = () => {
      if (inView && document.visibilityState === 'visible') video.play().catch(() => undefined)
      else video.pause()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    observer.observe(section)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [videoEnabled])

  return (
    <section className="hero" id="inicio" ref={sectionRef}>
      <div className="hero__media" aria-hidden="true">
        <img className="hero__poster" src={POSTER_SRC} alt="" width={1024} height={576} fetchPriority="high" />
        <video
          ref={videoRef}
          className={`hero__video ${videoReady ? 'is-ready' : ''}`}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => setVideoReady(true)}
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero__actions">
            <a className="btn primary" href="#contacto" onClick={scrollTo('contacto')}>
              {t.hero.primaryCta}
            </a>
            <a className="btn ghost" href="#casos" onClick={scrollTo('casos')}>
              {t.hero.secondaryCta}
            </a>
          </div>
          <ul className="hero__highlights">
            {t.hero.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
