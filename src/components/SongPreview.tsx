import { useEffect, useRef, useState } from 'react'
import './SongPreview.css'

const LENGTH = 45
const timeLabel = (seconds: number) => `0:${String(Math.floor(Math.max(0, Math.min(LENGTH, seconds)))).padStart(2, '0')}`

export default function SongPreview({ active }: { active: boolean }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')
  useEffect(() => { if (!active) audio.current?.pause() }, [active])
  const toggle = async () => {
    const track = audio.current
    if (!track) return
    if (!track.paused) { track.pause(); return }
    if (track.ended || track.currentTime >= LENGTH) track.currentTime = 0
    setError('')
    try { await track.play() } catch { setError('Couldn’t play. Tap to try again.') }
  }
  return <div className={`song-preview ${playing ? 'is-playing' : ''}`} role="group" aria-label="Shallow and Empty Promises, 45-second preview">
    <audio ref={audio} src="/audio/shallow-and-empty-promises-preview.mp3" preload="none"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onTimeUpdate={() => setElapsed(audio.current?.currentTime ?? 0)}
      onError={() => { setPlaying(false); setError('Audio unavailable. Please try again.') }} />
    <button className="preview-toggle" onClick={toggle} aria-label={playing ? 'Pause Shallow and Empty Promises' : elapsed >= LENGTH ? 'Replay Shallow and Empty Promises' : 'Play Shallow and Empty Promises'}>
      <svg viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">{playing ? <path d="M3 2H7V14H3ZM10 2H14V14H10Z" /> : <path d="M3 1H6V3H9V5H12V7H15V9H12V11H9V13H6V15H3Z" />}</svg>
    </button>
    <div className="preview-track"><span className="preview-kicker">LAST LIVING SOULS · 45 SEC PREVIEW</span><strong>Shallow and Empty Promises</strong>
      <div className="preview-timeline"><input type="range" min="0" max={LENGTH} step=".1" value={Math.min(LENGTH, elapsed)} aria-label="Preview playback position" aria-valuetext={`${timeLabel(elapsed)} of 0:45`} onChange={event => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setElapsed(value) }} /><span>{timeLabel(elapsed)} / 0:45</span></div>
    </div>
    {error && <span className="preview-error" role="status">{error}</span>}
  </div>
}
