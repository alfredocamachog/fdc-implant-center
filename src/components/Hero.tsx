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

    // React only sets `muted` as a property, never as an attribute. iOS Safari reads the
    // attribute when deciding whether a video may autoplay, so set everything explicitly.
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    let idleId: number | undefined
    let timeoutId: number | undefined
    const attach = () => {
      video.src = VIDEO_SRC
      video.load()
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

  // The video must always be moving while the hero is on screen. It is only paused while the hero
  // is scrolled out of view or the tab is hidden; everything else is recovered automatically:
  // - autoplay refused (iOS Low Power Mode, data saver): retry on the visitor's first touch/scroll/key
  // - network stall or a decoder hiccup: a watchdog notices currentTime stopped and restarts playback
  // - a missed loop (some Android builds stop on the last frame): restart from 0 on `ended`
  // - back/forward cache restore: re-sync on `pageshow`
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!videoEnabled || !video || !section) return

    let inView = true
    let waitingForGesture = false
    const shouldPlay = () => inView && document.visibilityState === 'visible'

    const GESTURES = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const
    const onGesture = () => {
      waitingForGesture = false
      GESTURES.forEach((type) => window.removeEventListener(type, onGesture))
      sync()
    }
    const armGestureRetry = () => {
      if (waitingForGesture) return
      waitingForGesture = true
      GESTURES.forEach((type) => window.addEventListener(type, onGesture, { passive: true }))
    }

    const play = () => {
      if (!video.paused && !video.ended) return
      video.play().catch((err: DOMException) => {
        // NotAllowedError = autoplay blocked; any user gesture unlocks it.
        if (err?.name === 'NotAllowedError') armGestureRetry()
      })
    }
    function sync() {
      if (shouldPlay()) play()
      else video!.pause()
    }

    // Watchdog: if the video should be playing but the clock hasn't moved, kick it.
    let lastTime = -1
    let stuckTicks = 0
    const watchdog = window.setInterval(() => {
      if (!shouldPlay() || waitingForGesture) {
        stuckTicks = 0
        return
      }
      if (video.paused || video.ended) {
        play()
      } else if (video.currentTime === lastTime && video.readyState >= 3) {
        // Has buffered data but isn't advancing (plain buffering has readyState < 3 and is left
        // alone): nudge the decoder, then reload the source as a last resort.
        stuckTicks += 1
        if (stuckTicks >= 3) {
          const at = video.currentTime
          video.addEventListener('loadedmetadata', () => (video.currentTime = at), { once: true })
          video.load()
          stuckTicks = 0
        } else {
          video.currentTime = video.currentTime + 0.05
        }
        play()
      } else {
        stuckTicks = 0
      }
      lastTime = video.currentTime
    }, 2000)

    const onEnded = () => {
      video.currentTime = 0
      play()
    }
    const onPageShow = () => sync()

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    observer.observe(section)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('pageshow', onPageShow)
    video.addEventListener('ended', onEnded)
    // Data arriving after a stall: resume immediately instead of waiting for the watchdog.
    video.addEventListener('canplay', sync)
    sync()

    return () => {
      window.clearInterval(watchdog)
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pageshow', onPageShow)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('canplay', sync)
      GESTURES.forEach((type) => window.removeEventListener(type, onGesture))
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
        </div>
      </div>
    </section>
  )
}
