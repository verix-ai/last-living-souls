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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const goTo = useCallback((index: number, instant = false) => {
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
    let frame = 0
    let scrollTimer: ReturnType<typeof setTimeout>
    let lastScroll = window.scrollY
    const update = () => {
      frame = 0
      const root = journey.current
      if (!root) return
      let time = Math.max(0, Math.min(JOURNEY_END, (window.scrollY - root.offsetTop) / Math.max(1, root.offsetHeight - window.innerHeight) * JOURNEY_END))
      if (calm) { const chapter = [...root.querySelectorAll<HTMLElement>('.scene')].reduce((selected, element, i) => element.getBoundingClientRect().top <= window.innerHeight * .5 ? i : selected, 0); time = CHAPTER_TIMES[chapter] }
      const current = journeyFrame(time)
      const index = Math.round(current.scene)
      const progress = current.world
      progressRef.current = time
      if (activeRef.current !== index) { activeRef.current = index; setActive(index) }
      // The introductions occupy an actual stretch of the world, not a clipped carousel.
      const stride = Math.max(320, window.innerWidth * (window.innerWidth <= 600 ? .96 : .38))
      const bandDistance = stride * 4
      world.current?.style.setProperty('--band-stride', `${stride}px`)
      world.current?.style.setProperty('--band-distance', `${bandDistance}px`)
      // Carry the title over the whole lineup with a gentle horizontal drift.
      world.current?.style.setProperty('--band-heading-travel', `${current.band * (bandDistance - window.innerWidth * .08)}px`)
      world.current?.style.setProperty('--travel', `${-current.scene * window.innerWidth - current.band * bandDistance}px`)
      world.current?.style.setProperty('--position', String(progress))
      // The final stretch brings the same travelers into their stage positions.
      const arrival = Math.max(0, Math.min(1, (progress - 3.55) / .45))
      world.current?.style.setProperty('--stage-arrival', String(arrival))
      if (world.current) { world.current.dataset.performing = String(progress >= 3.985); world.current.dataset.equipped = String(progress >= 3.94) }
      setStageReady(progress >= 3.985)
      // Step cadence follows the distance the path travels under the band.
      const groundDistance = progress * window.innerWidth * (window.innerWidth <= 600 ? 1.5 : 1)
      world.current?.style.setProperty('--walk-step', String(Math.floor(groundDistance / 26) % 2))
      if (bar.current) bar.current.style.transform = `scaleX(${time / JOURNEY_END})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      if (calm || Math.abs(delta) < .5) return
      if (world.current) {
        world.current.dataset.direction = delta > 0 ? 'right' : 'left'
        world.current.classList.add('traveling')
      }
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => world.current?.classList.remove('traveling'), 180)
    }
    const resize = () => {
      if (!calm && journey.current) window.scrollTo({ top: journey.current.offsetTop + (journey.current.offsetHeight - innerHeight) * progressRef.current / JOURNEY_END, behavior: 'instant' })
      update()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    update()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); cancelAnimationFrame(frame); clearTimeout(scrollTimer); world.current?.classList.remove('traveling') }
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
