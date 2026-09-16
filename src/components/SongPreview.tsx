import { useCallback, useEffect, useRef, useState } from 'react'
import './SongPreview.css'

const LENGTH = 45
const timeLabel = (seconds: number) => `0:${String(Math.floor(Math.max(0, Math.min(LENGTH, seconds)))).padStart(2, '0')}`

export default function SongPreview({ active, arrived, onPlayingChange }: { active: boolean; arrived: boolean; onPlayingChange: (playing: boolean) => void }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')
  const reportPlaying = useCallback((value: boolean) => {
    setPlaying(value)
    onPlayingChange(value)
  }, [onPlayingChange])
  useEffect(() => { if (!active) audio.current?.pause() }, [active])
  useEffect(() => {
    const track = audio.current
    if (!arrived || !track) return
    let cancelled = false
    // One attempt per arrival; pausing manually must not trigger another play.
    if (track.paused) {
      track.currentTime = 0
      void track.play().catch((reason: unknown) => {
        if (cancelled) return
        setError(reason instanceof DOMException && reason.name === 'NotAllowedError'
          ? 'Tap play to start the show.' : 'Couldn’t play. Tap to try again.')
      })
    }
    return () => { cancelled = true; track.pause(); onPlayingChange(false) }
  }, [arrived, onPlayingChange])
  const toggle = async () => {
    const track = audio.current
    if (!track) return
    if (!track.paused) { track.pause(); return }
    if (track.ended || track.currentTime >= LENGTH) track.currentTime = 0
    setError('')
    try { await track.play() } catch { setError('Couldn’t play. Tap to try again.') }
  }
  return <div className={`song-preview ${playing ? 'is-playing' : ''}`} role="group" aria-label="Shallow and Empty Promises, 45-second preview">
    <audio ref={audio} src="/audio/shallow-and-empty-promises-preview.mp3" preload="auto"
      onPlaying={() => { reportPlaying(true); setError('') }} onWaiting={() => reportPlaying(false)}
      onPause={() => reportPlaying(false)} onEnded={() => reportPlaying(false)}
      onTimeUpdate={() => setElapsed(audio.current?.currentTime ?? 0)}
      onError={() => { reportPlaying(false); setError('Audio unavailable. Please try again.') }} />
    <button className="preview-toggle" onClick={toggle} aria-label={playing ? 'Pause Shallow and Empty Promises' : elapsed >= LENGTH ? 'Replay Shallow and Empty Promises' : 'Play Shallow and Empty Promises'}>
      <svg viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">{playing ? <path d="M3 2H7V14H3ZM10 2H14V14H10Z" /> : <path d="M3 1H6V3H9V5H12V7H15V9H12V11H9V13H6V15H3Z" />}</svg>
    </button>
    <div className="preview-track"><span className="preview-kicker">LAST LIVING SOULS · 45 SEC PREVIEW</span><strong>Shallow and Empty Promises</strong>
      <div className="preview-timeline"><input type="range" min="0" max={LENGTH} step=".1" value={Math.min(LENGTH, elapsed)} aria-label="Preview playback position" aria-valuetext={`${timeLabel(elapsed)} of 0:45`} onChange={event => { const value = Number(event.target.value); if (audio.current) audio.current.currentTime = value; setElapsed(value) }} /><span>{timeLabel(elapsed)} / 0:45</span></div>
    </div>
    {error && <span className="preview-error" role="status">{error}</span>}
  </div>
}
