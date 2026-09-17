import { useLayoutEffect, useRef, useState } from 'react'
import './Booking.css'
import type { FormEvent } from 'react'

export default function Booking({ onOpen }: { onOpen: () => void }) {
  return <div className="scene-content booking-content">
    <div className="eyebrow">04 / BOOKING</div>
    <h2 id="title-booking">Your stage.<br /><em>Our signal.</em></h2>
    <div className="booking-pass booking-invitation">
      <div className="booking-pass-top"><span>BOOK LAST LIVING SOULS</span><span aria-hidden="true">✦ ✦ ✦</span></div>
      <h3>Let’s make some noise.</h3>
      <p>A venue, a festival, a night to remember. Tell us what you have in mind.</p>
      <button type="button" className="pixel-button" aria-haspopup="dialog" onClick={onOpen}>Start a booking inquiry <span aria-hidden="true">↗</span></button>
    </div>
  </div>
}

export function BookingDialog({ open, onClose, onResume }: { open: boolean; onClose: () => void; onResume: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const panel = dialog.current
    if (!open || !panel) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const scroll = window.scrollY
    const body = document.body
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow }
    Object.assign(body.style, { position: 'fixed', top: `${-scroll}px`, width: '100%', overflow: 'hidden' })
    const viewport = window.visualViewport
    let frame = 0
    const fit = () => {
      panel.style.setProperty('--booking-height', `${viewport?.height ?? window.innerHeight}px`)
      panel.style.setProperty('--booking-top', `${viewport?.offsetTop ?? 0}px`)
      // Keep the active field within the form's scroll area as the keyboard animates.
      const field = document.activeElement
      const area = scroller.current
      if (area && field instanceof HTMLElement && field.matches('input, textarea') && area.contains(field)) {
        const bounds = field.getBoundingClientRect()
        const visible = area.getBoundingClientRect()
        if (bounds.bottom > visible.bottom - 20) area.scrollTop += bounds.bottom - visible.bottom + 20
        else if (bounds.top < visible.top + 20) area.scrollTop -= visible.top + 20 - bounds.top
      }
    }
    const scheduleFit = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit) }
    fit()
    panel.showModal()
    heading.current?.focus({ preventScroll: true })
    viewport?.addEventListener('resize', scheduleFit)
    viewport?.addEventListener('scroll', scheduleFit)
    window.addEventListener('resize', scheduleFit)
    panel.addEventListener('focusin', scheduleFit)
    return () => {
      cancelAnimationFrame(frame)
      viewport?.removeEventListener('resize', scheduleFit)
      viewport?.removeEventListener('scroll', scheduleFit)
      window.removeEventListener('resize', scheduleFit)
      panel.removeEventListener('focusin', scheduleFit)
      if (document.activeElement instanceof HTMLElement && panel.contains(document.activeElement)) document.activeElement.blur()
      panel.close()
      Object.assign(body.style, previous)
      window.scrollTo({ top: scroll, behavior: 'instant' })
      onResume()
      trigger?.focus({ preventScroll: true })
    }
  }, [open, onResume])
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
  return <dialog ref={dialog} className="booking-dialog" aria-labelledby="booking-dialog-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <header className="booking-dialog-header"><div><span>LAST LIVING SOULS</span><h2 id="booking-dialog-title" ref={heading} tabIndex={-1}>Book the band.</h2></div><button type="button" className="booking-close" onClick={onClose} aria-label="Close booking form">×</button></header>
    <div className="booking-dialog-scroll" ref={scroller}>
    <form className="booking-pass booking-form" onSubmit={submit} aria-label="Booking inquiry" aria-busy={status === 'sending'}>
      <p className="booking-form-intro">Tell us about your event. We’ll get back to you to talk details.</p>
      {status === 'sent' ? <div className="booking-success" role="status"><span aria-hidden="true">✦</span><h3>Signal received.</h3><p>{notice}</p><button type="button" className="text-link" onClick={() => { setStatus('idle'); setNotice('') }}>Send another inquiry ↗</button></div> : <>
        <div className="booking-fields">
          <label>Your name<input name="name" autoComplete="name" enterKeyHint="next" required minLength={2} maxLength={100} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" required maxLength={254} /></label>
          <label className="booking-wide">Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" enterKeyHint="next" maxLength={40} /></label>
          <label className="booking-wide">Tell us about your show<textarea name="message" required minLength={10} maxLength={2500} rows={3} placeholder="Venue, city, date and what you have in mind…" /></label>
        </div>
        <label className="booking-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="booking-form-footer"><button className="pixel-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send booking inquiry'} <span aria-hidden="true">↗</span></button><span className={notice ? 'booking-notice' : undefined} role={notice ? 'alert' : undefined}>{notice || 'We’ll use your details to respond to this inquiry.'}</span></div>
      </>}
    </form>
    </div>
  </dialog>
}
