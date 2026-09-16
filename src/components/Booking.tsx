import { useRef, useState } from 'react'
import type { FormEvent } from 'react'

export default function Booking() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [notice, setNotice] = useState('')
  const pending = useRef(false)
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending.current) return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    pending.current = true
    setStatus('sending')
    setNotice('')
    try {
      const response = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values), signal: AbortSignal.timeout(25_000) })
      const result = await response.json() as { ok?: boolean; message?: string }
      if (!response.ok || result.ok !== true) throw new Error(result.message || 'We couldn’t send your inquiry. Please try again.')
      setStatus('sent')
      setNotice(result.message || 'Thanks for reaching out. Your inquiry is in.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setNotice(error instanceof Error && error.name !== 'SyntaxError' && error.name !== 'TimeoutError' && error.name !== 'TypeError' ? error.message : 'We couldn’t confirm delivery. Your message is still here—please try again.')
    } finally { pending.current = false }
  }
  return <div className="scene-content booking-content">
    <div className="eyebrow">04 / BOOKING</div>
    <h2 id="title-booking">Your stage.<br /><em>Our signal.</em></h2>
    <form className="booking-pass booking-form" onSubmit={submit} aria-label="Booking inquiry" aria-busy={status === 'sending'}>
      <div className="booking-pass-top"><span>BOOK LAST LIVING SOULS</span><span aria-hidden="true">✦ ✦ ✦</span></div>
      {status === 'sent' ? <div className="booking-success" role="status"><span aria-hidden="true">✦</span><h3>Signal received.</h3><p>{notice}</p><button type="button" className="text-link" onClick={() => { setStatus('idle'); setNotice('') }}>Send another inquiry ↗</button></div> : <>
        <div className="booking-fields">
          <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className="booking-wide">Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
          <label className="booking-wide">Tell us about your show<textarea name="message" required minLength={10} maxLength={2500} rows={3} placeholder="Venue, city, date and what you have in mind…" /></label>
        </div>
        <label className="booking-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="booking-form-footer"><button className="pixel-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send booking inquiry'} <span aria-hidden="true">↗</span></button><span className={notice ? 'booking-notice' : undefined} role={notice ? 'alert' : undefined}>{notice || 'We’ll use your details to respond to this inquiry.'}</span></div>
      </>}
    </form>
  </div>
}
