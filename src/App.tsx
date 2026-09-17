import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import BandTravelers from './components/BandTravelers'
import './App.css'
import ContinuousWorld from './components/ContinuousWorld'
import SongPreview from './components/SongPreview'
import type { FinaleSoundControl } from './components/SongPreview'
import BandCards from './components/BandCards'
import Shows from './components/Shows'
import Booking from './components/Booking'
import AboutDialog from './components/AboutDialog'
import { CHAPTER_TIMES, JOURNEY_END, journeyFrame } from './journeyTimeline'
import './JourneyChapters.css'

const links = {
  spotify: 'https://open.spotify.com/artist/05uIqoMvFedhpbcsIwPwjL',
  apple: 'https://music.apple.com/us/artist/last-living-souls/1838556536',
  youtube: 'https://music.youtube.com/search?q=Last+Living+Souls+Shallow+and+Empty',
  instagram: 'https://www.instagram.com/lastlivingsouls.music',
  facebook: 'https://www.facebook.com/LastLivingSouls.music',
  tiktok: 'https://www.tiktok.com/@lastlivingsouls.music',
}
const chapters = [
  { id: 'wasteland', name: 'Home', note: 'Find your frequency.' },
  { id: 'band', name: 'Meet the Band', note: 'Five souls. One sound.' },
  { id: 'shows', name: 'Live Shows', note: 'See you out there.' },
  { id: 'booking', name: 'Booking', note: 'Bring the signal to your stage.' },
  { id: 'portal', name: 'The Performance', note: 'Let the sound take over.' },
]
type IconName = 'spotify' | 'apple' | 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'play' | 'star' | 'arrow' | 'map' | 'pause'
const glyphs: Record<IconName, string[]> = {
  youtube: ['000111111000','001000000100','010000000010','100010000001','100011100001','100011110001','100011100001','100010000001','010000000010','001000000100','000111111000'],
  spotify: ['000111111000','001111111100','011000000110','110111110011','111111111111','110000001111','111111100111','111000111111','011111101110','001111111100','000111111000'],
  apple: ['000000110000','000001100000','001110011100','011111111110','111111111000','111111110000','111111110000','111111111000','011111111110','001111111100','000110011000'],
  instagram: ['001111111100','011000000110','110000011011','110011000011','110100100011','110100100011','110011000011','110000000011','011000000110','001111111100'],
  facebook: ['000011111000','000110000000','000110000000','001111110000','000110000000','000110000000','000110000000','000110000000','000110000000','000110000000'],
  tiktok: ['000001100000','000001110000','000001111100','000001101100','000001100000','001111100000','011001100000','011001100000','001111000000','000110000000'],
  play: ['001100000000','001111000000','001111110000','001111111100','001111111100','001111110000','001111000000','001100000000'],
  star: ['00000100000','00001110000','00001110000','11111111111','01111111110','00111111100','00111111100','01110001110','01100000110'],
  arrow: ['000001000000','000001100000','111111110000','111111111000','111111110000','000001100000','000001000000'],
  map: ['110011001100','111011101110','111111111110','111111111110','111111111110','111111111110','111111111110','111111111110','011101110110','001100110010'],
  pause: ['001110011100','001110011100','001110011100','001110011100','001110011100','001110011100','001110011100','001110011100'],
}
function PixelIcon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`pixel-icon ${className}`} viewBox="0 0 12 12" aria-hidden="true" shapeRendering="crispEdges">{glyphs[name].flatMap((row, y) => [...row].map((v, x) => v === '1' ? <rect key={`${x}-${y}`} x={x} y={y + 1} width="1" height="1" /> : null))}</svg>
}
function ExternalLink({ href, children, className = '', label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}</a>
}
function MusicLinks() {
  return <div className="music-links">
    <ExternalLink href={links.spotify} className="platform spotify" label="Listen to Last Living Souls on Spotify (opens in a new tab)"><span className="platform-key"><PixelIcon name="spotify" /></span><span>Spotify</span></ExternalLink>
    <ExternalLink href={links.apple} className="platform apple" label="Listen to Last Living Souls on Apple Music (opens in a new tab)"><span className="platform-key"><PixelIcon name="apple" /></span><span>Apple Music</span></ExternalLink>
    <ExternalLink href={links.youtube} className="platform youtube" label="Find Last Living Souls — Shallow and Empty on YouTube Music (search opens in a new tab)"><span className="platform-key"><PixelIcon name="youtube" /></span><span>YouTube Music</span></ExternalLink>
  </div>
}
function readMotionPreference() {
  try { const saved = localStorage.getItem('lls-calm'); if (saved !== null) return saved === 'true' } catch { /* Storage may be unavailable. */ }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function readSignals(): number[] {
  try { const saved: unknown = JSON.parse(localStorage.getItem('lls-signals') || '[]'); return Array.isArray(saved) ? [...new Set(saved.filter((v): v is number => typeof v === 'number' && [0, 1, 3].includes(v)))] : [] } catch { return [] }
}
export default function App() {
  const finaleSound = useRef<FinaleSoundControl>(null)
  const [active, setActive] = useState(0)
  const [stageReady, setStageReady] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [calm, setCalm] = useState(readMotionPreference)
  const [mapOpen, setMapOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [signals, setSignals] = useState(readSignals)
  const [message, setMessage] = useState('')
  const [hint, setHint] = useState(false)
  const journey = useRef<HTMLElement>(null)
  const world = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const mapButton = useRef<HTMLButtonElement>(null)
  const activeRef = useRef(0)
  const progressRef = useRef(0)
  const bookingCamera = useRef<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const goTo = useCallback((index: number, instant = false) => {
    bookingCamera.current = null
    const focused = document.activeElement
    if (focused instanceof HTMLElement && focused.closest('.booking-form')) focused.blur()
    const bounded = Math.max(0, Math.min(chapters.length - 1, index))
    const root = journey.current
    if (!root) return
    const scene = document.getElementById(chapters[bounded].id)
    const top = calm ? (scene?.offsetTop ?? 0) : root.offsetTop + ((root.offsetHeight - window.innerHeight) * CHAPTER_TIMES[bounded] / JOURNEY_END)
    window.scrollTo({ top, behavior: instant || calm ? 'instant' : 'smooth' })
    setMapOpen(false)
    history.replaceState(null, '', `#${chapters[bounded].id}`)
  }, [calm])
  useEffect(() => {
    const root = journey.current
    const sceneWorld = world.current
    if (!root || !sceneWorld) return
    const find = (selector: string) => sceneWorld.querySelector<HTMLElement>(selector)
    const track = find('.world-track')
    const heading = find('.band-content')
    const travelers = find('.band-travelers')
    const ensemble = find('.band-ensemble')
    const portal = find('.landmark-portal')
    const drifters = find('.cosmic-drifters')
    const layers = [
      { element: find('.cosmic-sky'), speed: .05 },
      { element: find('.ridge-far'), speed: .15, offset: -.1, y: '-5svh' },
      { element: find('.ridge-near'), speed: .29 },
      { element: find('.landmark-rail'), speed: 1, foreground: true },
      { element: find('.ground-texture'), speed: 1, foreground: true },
      { element: find('.foreground-rail'), speed: 1, foreground: true },
      { element: find('.ship-rail'), speed: .65 },
      { element: find('.bright-star-rail'), speed: .45 },
    ]
    let frame = 0
    let scrollTimer: ReturnType<typeof setTimeout>
    let blurFrame = 0
    let focusReturn: { time: number; until: number } | null = null
    const form = find('.booking-form')
    let lastScroll = window.scrollY
    let width = window.innerWidth
    let height = window.innerHeight
    let rootTop = 0, distance = 1, bandDistance = 0
    let chapterTops: number[] = []
    let lastTime = NaN, lastArrival = NaN, lastStep = -1
    let ready: boolean | undefined
    const measure = () => {
      // Layout reads and scene widths only change on resize, never mid-scroll.
      width = window.innerWidth
      height = window.innerHeight
      rootTop = root.offsetTop
      distance = Math.max(1, root.offsetHeight - height)
      if (calm) chapterTops = [...root.querySelectorAll<HTMLElement>('.scene')].map(element => element.getBoundingClientRect().top + window.scrollY)
      const stride = Math.max(320, width * (width <= 600 ? .96 : .38))
      bandDistance = stride * 4
      sceneWorld.style.setProperty('--band-stride', `${stride}px`)
      sceneWorld.style.setProperty('--band-distance', `${bandDistance}px`)
      lastTime = NaN
    }
    const update = () => {
      frame = 0
      const scroll = window.scrollY
      let time = Math.max(0, Math.min(JOURNEY_END, (scroll - rootTop) / distance * JOURNEY_END))
      if (calm) time = CHAPTER_TIMES[chapterTops.reduce((selected, top, i) => top <= scroll + height * .5 ? i : selected, 0)]
      if (!calm && bookingCamera.current !== null) time = bookingCamera.current
      if (time === lastTime) return
      lastTime = time
      const current = journeyFrame(time)
      const index = Math.round(current.scene)
      const progress = current.world
      progressRef.current = time
      if (activeRef.current !== index) { activeRef.current = index; setActive(index) }
      // Transform the moving elements directly rather than invalidating inherited
      // custom properties across every card, form field, and decorative object.
      if (track) track.style.transform = calm ? 'none' : `translate3d(${-current.scene * width - current.band * bandDistance}px,0,0)`
      if (heading) heading.style.transform = calm ? 'none' : `translate3d(calc(-50% + ${current.band * (bandDistance - width * .08)}px),0,0)`
      for (const layer of layers) {
        const speed = layer.speed * (layer.foreground && width <= 600 ? 1.5 : 1)
        if (layer.element) layer.element.style.transform = `translate3d(${(-progress * speed + (layer.offset ?? 0)) * width}px,${layer.y ?? '0'},0)`
      }
      const arrival = Math.max(0, Math.min(1, (progress - 3.55) / .45))
      if (arrival !== lastArrival) {
        lastArrival = arrival
        ensemble?.style.setProperty('--stage-arrival', String(arrival))
        if (portal) portal.style.opacity = String(1 - arrival)
        if (drifters) drifters.style.opacity = String(.75 - arrival * .4)
      }
      const performing = progress >= 3.985
      if (sceneWorld.dataset.performing !== String(performing)) sceneWorld.dataset.performing = String(performing)
      const equipped = String(progress >= 3.94)
      if (sceneWorld.dataset.equipped !== equipped) sceneWorld.dataset.equipped = equipped
      if (ready !== performing) { ready = performing; setStageReady(performing) }
      const step = Math.floor(progress * width * (width <= 600 ? 1.5 : 1) / 26) % 2
      if (step !== lastStep) { lastStep = step; travelers?.style.setProperty('--walk-step', String(step)) }
      if (bar.current) bar.current.style.transform = `scaleX(${time / JOURNEY_END})`
      const delta = scroll - lastScroll
      lastScroll = scroll
      if (!calm && Math.abs(delta) >= .5) {
        const direction = delta > 0 ? 'right' : 'left'
        if (sceneWorld.dataset.direction !== direction) sceneWorld.dataset.direction = direction
        if (!sceneWorld.classList.contains('traveling')) sceneWorld.classList.add('traveling')
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => sceneWorld.classList.remove('traveling'), 180)
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const resize = () => {
      const widthChanged = width !== window.innerWidth
      measure()
      // Browser chrome and the keyboard resize a phone's height while scrolling.
      // Preserve native momentum; reposition only for an actual width/orientation change.
      if (!calm && (widthChanged || (focusReturn && performance.now() < focusReturn.until))) {
        const time = bookingCamera.current ?? focusReturn?.time ?? progressRef.current
        window.scrollTo({ top: rootTop + distance * time / JOURNEY_END, behavior: 'instant' })
      }
      onScroll()
    }
    const isField = (target: EventTarget | null) => target instanceof HTMLElement && !!target.closest('.booking-fields input, .booking-fields textarea')
    const holdBooking = () => {
      if (calm || activeRef.current !== 3 || bookingCamera.current !== null) return
      bookingCamera.current = progressRef.current
      focusReturn = null
      clearTimeout(scrollTimer)
      sceneWorld.classList.remove('traveling')
    }
    const releaseBooking = () => {
      const time = bookingCamera.current
      if (time === null) return
      bookingCamera.current = null
      // Keyboard closing can resize the viewport after blur. Preserve the same
      // chapter through that short transition, unless the user starts navigating.
      focusReturn = { time, until: performance.now() + 600 }
      measure()
      window.scrollTo({ top: rootTop + distance * time / JOURNEY_END, behavior: 'instant' })
      lastScroll = window.scrollY
      onScroll()
    }
    const onFocus = (event: FocusEvent) => {
      if (isField(event.target)) holdBooking()
    }
    const onBlur = () => {
      cancelAnimationFrame(blurFrame)
      blurFrame = requestAnimationFrame(() => {
        // Tabbing between fields is one editing session.
        if (!form?.contains(document.activeElement)) releaseBooking()
      })
    }
    const onPointer = (event: PointerEvent) => {
      if (isField(event.target)) { holdBooking(); return }
      if (event.target instanceof Node && form?.contains(event.target)) return
      releaseBooking()
      focusReturn = null
    }
    const onNavigationIntent = (event: Event) => {
      if (event.target instanceof Node && form?.contains(event.target)) return
      releaseBooking()
      focusReturn = null
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && document.activeElement instanceof HTMLElement && form?.contains(document.activeElement)) document.activeElement.blur()
      else if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key) && !isField(event.target)) onNavigationIntent(event)
    }
    form?.addEventListener('focusin', onFocus)
    form?.addEventListener('focusout', onBlur)
    document.addEventListener('pointerdown', onPointer, { capture: true, passive: true })
    document.addEventListener('touchstart', onNavigationIntent, { passive: true })
    document.addEventListener('wheel', onNavigationIntent, { passive: true })
    document.addEventListener('keydown', onKey)
    // Keep the visible scene alive without animating decorations screens away.
    const decorations = [...sceneWorld.querySelectorAll<HTMLElement>('.member-card, .drifting-ship, .wandering-star, .lost-signal')]
    const visibility = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
    }, { root: calm ? null : sceneWorld, rootMargin: '100px' })
    for (const element of decorations) visibility.observe(element)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    const layout = new ResizeObserver(() => { measure(); onScroll() })
    layout.observe(root)
    measure()
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
      clearTimeout(scrollTimer)
      sceneWorld.classList.remove('traveling')
      visibility.disconnect()
      layout.disconnect()
      cancelAnimationFrame(blurFrame)
      bookingCamera.current = null
      form?.removeEventListener('focusin', onFocus)
      form?.removeEventListener('focusout', onBlur)
      document.removeEventListener('pointerdown', onPointer, true)
      document.removeEventListener('touchstart', onNavigationIntent)
      document.removeEventListener('wheel', onNavigationIntent)
      document.removeEventListener('keydown', onKey)
      for (const element of decorations) element.style.removeProperty('animation-play-state')
    }
  }, [calm])
  useEffect(() => {
    const visitHash = () => { const aliases: Record<string, string> = { about: 'band', forest: 'band', transmission: 'wasteland', sanctuary: 'portal' }; const hash = location.hash.slice(1); const index = chapters.findIndex(c => c.id === (aliases[hash] || hash)); if (index >= 0) requestAnimationFrame(() => goTo(index, true)) }
    visitHash()
    window.addEventListener('hashchange', visitHash)
    return () => window.removeEventListener('hashchange', visitHash)
  }, [goTo])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && mapOpen) { setMapOpen(false); mapButton.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [mapOpen])
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const announce = (text: string) => { setMessage(text); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setMessage(''), 4200) }
  const collect = (index: number) => {
    if (signals.includes(index)) return
    const next = [...signals, index]
    setSignals(next)
    try { localStorage.setItem('lls-signals', JSON.stringify(next)) } catch { /* Collection still works without storage. */ }
    announce(next.length === 3 ? 'YOUR LIGHT FOUND US.' : `YOUR LIGHT: ${next.length} / 3 STARS FOUND.`)
  }
  const toggleMotion = () => { const value = !calm; history.replaceState(null, '', `#${chapters[active].id}`); setCalm(value); try { localStorage.setItem('lls-calm', String(value)) } catch { /* Keep the visit preference. */ } }
  const signal = (index: number) => <button className={`lost-signal signal-${index} ${signals.includes(index) ? 'collected' : ''} ${hint ? 'hinted' : ''}`} onClick={() => collect(index)} aria-label={signals.includes(index) ? 'Star found' : `Collect the hidden star in ${chapters[index === 3 ? 2 : index].name}`} disabled={signals.includes(index)}><PixelIcon name="star" /><span>{signals.includes(index) ? 'FOUND' : 'YOUR LIGHT'}</span></button>
  return <div className={`experience ${calm ? 'calm' : ''}`}>
    <a href="#wasteland" className="skip-link" onClick={e => { e.preventDefault(); goTo(0, true); setTimeout(() => document.querySelector<HTMLAnchorElement>('#wasteland .platform')?.focus(), 100) }}>Skip to music</a>
    <header className="hud-top"><div className="coordinates"><span className="signal-light" /> LOST IN SPACE. FOUND IN SOUND.</div><div className="top-actions"><button className="nav-shortcut" aria-haspopup="dialog" aria-expanded={aboutOpen} onClick={() => { setMapOpen(false); setAboutOpen(true) }}>About</button><button className="nav-shortcut booking-shortcut" onClick={() => goTo(3)}>Booking</button><button className={`map-toggle ${mapOpen ? 'selected' : ''}`} ref={mapButton} onClick={() => setMapOpen(!mapOpen)} aria-label={mapOpen ? 'Close world map' : 'Open world map'} aria-expanded={mapOpen} aria-controls="world-map"><PixelIcon name="map" /><span>{mapOpen ? 'Close' : 'World map'}</span></button></div></header>
    {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} />}
    {mapOpen && <><button className="map-scrim" aria-label="Dismiss world map" onClick={() => setMapOpen(false)} /><nav className="world-map" id="world-map" aria-label="World chapters"><div className="map-heading"><span>CHOOSE YOUR DESTINATION</span><span>01—05</span></div>{chapters.map((chapter, index) => <button key={chapter.id} className={active === index ? 'current' : ''} aria-current={active === index ? 'location' : undefined} onClick={() => goTo(index)}><span className="map-number">0{index + 1}</span><span><strong>{chapter.name}</strong><small>{chapter.note}</small></span><span className="map-arrow">↗</span></button>)}</nav></>}
    <main ref={journey} className="journey" aria-label="The Last Signal, a journey with Last Living Souls"><div ref={world} className="world" data-scene={active} data-sound-playing={audioPlaying}><ContinuousWorld /><div className="world-track">
      <section className="scene scene-wasteland" id="wasteland" aria-labelledby="title-wasteland" inert={!calm && active !== 0}><div className="scene-content opening-content"><div className="eyebrow"><span className="tiny-cross">✦</span> A PSYCHEDELIC EXPEDITION <span className="tiny-cross">✦</span></div><h1 id="title-wasteland"><span className="sr-only">Last Living Souls</span><img className="hero-wordmark" src="/art/wordmark.png" alt="" width="800" height="289" /></h1><MusicLinks /><p className="opening-line">Somewhere between the end of the world<br className="desktop-break" /> and the start of a song.</p><button className="pixel-button journey-start" onClick={() => { finaleSound.current?.enable(); goTo(1) }} title="Enable the song to start automatically when the band reaches the stage">Start with sound <PixelIcon name="arrow" /></button><span className="scroll-instruction">SCROLL TO WANDER <span>↓</span></span></div><div className="scene-caption"><span>01 / HOME</span><span>THERE’S SOMETHING OUT THERE.</span></div>{signal(0)}</section>
      <section className="scene scene-band" id="band" aria-labelledby="title-band" inert={!calm && active !== 1}><BandCards /><div className="scene-caption"><span>FIVE SOULS / ONE SOUND</span><span>THE PEOPLE BEHIND THE SIGNAL.</span></div>{signal(1)}</section>
      <section className="scene scene-shows" id="shows" aria-labelledby="title-shows" inert={!calm && active !== 2}><Shows onBook={() => goTo(3)} /><div className="scene-caption"><span>03 / LIVE SHOWS</span><span>GOOD PEOPLE. LOUD MUSIC.</span></div>{signal(3)}</section>
      <section className="scene scene-booking" id="booking" aria-labelledby="title-booking" inert={!calm && active !== 3}><Booking /><div className="scene-caption"><span>04 / BOOKING</span><span>LET’S MAKE SOME NOISE.</span></div></section>
      <section className="scene scene-portal" id="portal" aria-labelledby="title-portal" inert={!calm && active !== 4}><div className="scene-content portal-content"><div className="eyebrow">05 / THE PERFORMANCE</div><h2 id="title-portal">The end is<br /><em>another beginning.</em></h2><SongPreview soundControl={finaleSound} active={active === 4} arrived={stageReady} onPlayingChange={setAudioPlaying} /><div className="social-links">{(['instagram', 'tiktok', 'facebook'] as const).map(name => <ExternalLink key={name} href={links[name]} className={`social-key ${name}`} label={`Last Living Souls on ${name} (opens in a new tab)`}><PixelIcon name={name} /><span>{name === 'tiktok' ? 'TikTok' : name[0].toUpperCase() + name.slice(1)}</span></ExternalLink>)}</div><div className={`completion ${signals.length === 3 ? 'complete' : ''}`}><PixelIcon name="star" /><span>{signals.length === 3 ? 'YOUR LIGHT FOUND US.' : `YOUR LIGHT: ${signals.length} / 3 STARS FOUND`}</span></div><button className="text-link" onClick={() => goTo(0)}>Wander again <span>↶</span></button></div><div className="scene-caption"><span>LAST LIVING SOULS © {new Date().getFullYear()}</span><span>THANKS FOR GETTING LOST WITH US.</span></div></section>
    </div><BandTravelers /><div className="scanlines" aria-hidden="true" /></div></main>
    <footer className="hud-bottom"><div className="bottom-left"><button className="motion-button" onClick={toggleMotion} aria-pressed={calm} title="Switch between the animated journey and a still scrolling view"><span className="motion-symbol">{calm ? 'Ⅱ' : '≈'}</span><span>{calm ? 'Still mode' : 'Motion on'}</span></button><span className="hud-divider" /><button className="signal-counter" onClick={() => { setHint(!hint); announce(hint ? 'HINTS OFF. HAPPY WANDERING.' : 'LOOK FOR THE THREE GLOWING GOLD STARS.') }} aria-pressed={hint} aria-label={`${signals.length} of 3 Your Light stars found. ${hint ? 'Hide' : 'Show'} hints`}><PixelIcon name="star" /><span>{signals.length}<span className="dim"> / 3</span></span><span className="counter-label">YOUR LIGHT</span></button></div><nav className="chapter-dots" aria-label="Quick chapter navigation">{chapters.map((chapter, i) => <button key={chapter.id} className={active === i ? 'active' : ''} onClick={() => goTo(i)} aria-label={`${i + 1}. ${chapter.name}`} aria-current={active === i ? 'location' : undefined}><span /><span className="dot-label">{chapter.name}</span></button>)}</nav><button className="next-chapter" onClick={() => goTo(active === 4 ? 0 : active + 1)}><span>{active === 4 ? 'Back to the beginning' : 'Keep exploring'}</span><span className="next-arrow">→</span></button><div className="journey-progress" aria-hidden="true"><div ref={bar} /></div></footer>
    <div className={`toast ${message ? 'visible' : ''}`} role="status">{message}</div><div className="sr-only" aria-live="polite">Chapter {active + 1}: {chapters[active].name}</div><div className="ambient-specks" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--x': `${(i * 29 + 11) % 100}%`, '--y': `${(i * 17 + 24) % 100}%`, '--delay': `${-i * 1.7}s`, '--size': `${i % 3 + 1}px` } as CSSProperties} />)}</div>
  </div>
}
