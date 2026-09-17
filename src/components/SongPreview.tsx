import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Ref } from 'react'
import './SongPreview.css'

const LENGTH = 45
const timeLabel = (seconds: number) => `0:${String(Math.floor(Math.max(0, Math.min(LENGTH, seconds)))).padStart(2, '0')}`

export type FinaleSoundControl = { enable: () => void }

export default function SongPreview({ active, arrived, onPlayingChange, soundControl }: { active: boolean; arrived: boolean; onPlayingChange: (playing: boolean) => void; soundControl: Ref<FinaleSoundControl> }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState('')
  const reportPlaying = useCallback((value: boolean) => {
    setPlaying(value)
    onPlayingChange(value)
  }, [onPlayingChange])
  const attempted = useRef(false)
  const priming = useRef(false)
  const attemptId = useRef(0)
  // Only the explicit “Start with sound” click prepares playback. Scrolling
  // itself is not an audio activation gesture in desktop browsers.
  useImperativeHandle(soundControl, () => ({ enable() {
    const track = audio.current
    if (!track || !track.paused) return
    priming.current = true
    track.volume = 0
    void track.play().then(() => {
      if (!priming.current) return
      track.pause()
      track.currentTime = 0
    }).catch(() => { /* The finale still offers a normal play button. */ }).finally(() => {
      priming.current = false
      track.volume = 1
    })
  } }), [])
  useEffect(() => {
    const track = audio.current
    if (!track) return
    if (!active) {
      attempted.current = false
      attemptId.current += 1
      if (!priming.current) track.pause()
      return
    }
    // Stay latched through tiny scroll changes; only leaving this chapter
    // starts a new visit. A deliberate pause or completed song stays stopped.
    if (!arrived || attempted.current) return
    attempted.current = true
    priming.current = false
    track.volume = 1
    if (!track.paused) return
    const id = ++attemptId.current
    track.currentTime = 0
    void track.play().catch((reason: unknown) => {
      if (id !== attemptId.current) return
      setError(reason instanceof DOMException && reason.name === 'NotAllowedError'
        ? 'Click or tap play to start the show.' : 'Couldn’t play. Click or tap to try again.')
    })
  }, [active, arrived])
  useEffect(() => {
    const track = audio.current
    return () => { attemptId.current += 1; track?.pause(); onPlayingChange(false) }
  }, [onPlayingChange])
  const toggle = async () => {
    const track = audio.current
    if (!track) return
    attempted.current = true
    attemptId.current += 1
    priming.current = false
    track.volume = 1
    if (!track.paused) { track.pause(); return }
    if (track.ended || track.currentTime >= LENGTH) track.currentTime = 0
    setError('')
    try { await track.play() } catch { setError('Couldn’t play. Tap to try again.') }
  }
  return <div className={`song-preview ${playing ? 'is-playing' : ''}`} role="group" aria-label="Shallow and Empty Promises, 45-second preview">
    <audio ref={audio} src="/audio/shallow-and-empty-promises-preview.mp3?v=27-72" preload="auto"
      onPlaying={() => { if (!priming.current) { reportPlaying(true); setError('') } }} onWaiting={() => reportPlaying(false)}
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
