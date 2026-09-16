type BookingEnv = { GHL_PIT?: string; GHL_LOCATION_ID?: string }
type Fetcher = typeof fetch
const API = 'https://services.leadconnectorhq.com'
const MAX_BODY = 8192
const attempts = new Map<string, { count: number; expires: number }>()
const reply = (status: number, message: string) => Response.json({ ok: status === 200, message }, { status, headers: { 'Cache-Control': 'no-store' } })

export async function handleBooking(request: Request, env: BookingEnv, upstream: Fetcher = fetch): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } })
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return reply(403, 'Please send your inquiry from the band’s website.')
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, 'Please use the booking form.')
  if (Number(request.headers.get('content-length')) > MAX_BODY) return reply(413, 'Please shorten your message.')
  let data: Record<string, unknown>
  try {
    const reader = request.body?.getReader()
    if (!reader) return reply(400, 'Please fill in the booking form.')
    const chunks: Uint8Array[] = []
    let length = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > MAX_BODY) { await reader.cancel(); return reply(413, 'Please shorten your message.') }
      chunks.push(value)
    }
    const bytes = new Uint8Array(length)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reply(400, 'Please fill in the booking form.')
    data = parsed as Record<string, unknown>
  } catch { return reply(400, 'Please fill in the booking form.') }
  if (data.website) return reply(200, 'Thanks for getting in touch.') // Honeypot: do not send spam to the CRM.
  const text = (key: string) => typeof data[key] === 'string' ? data[key].trim() : ''
  const name = text('name'), email = text('email').toLowerCase(), phone = text('phone'), message = text('message')
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 40 || message.length < 10 || message.length > 2500) {
    return reply(400, 'Please include your name, a valid email, and a message of 10–2,500 characters.')
  }
  if (!env.GHL_PIT?.trim() || !env.GHL_LOCATION_ID?.trim()) return reply(503, 'Booking is temporarily unavailable. Please try again shortly.')
  // A bounded per-instance throttle complements the honeypot; hosting-level limits can be added in Vercel.
  const now = Date.now()
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key)
  const address = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
  const bucket = attempts.get(address) || { count: 0, expires: now + 600_000 }
  if (bucket.count >= 5 || attempts.size >= 5000) return reply(429, 'Please wait a few minutes before sending another inquiry.')
  bucket.count += 1
  attempts.set(address, bucket)
  const headers = { Authorization: `Bearer ${env.GHL_PIT}`, Version: '2023-02-21', 'Content-Type': 'application/json', Accept: 'application/json' }
  try {
    const contactResponse = await upstream(`${API}/contacts/upsert`, {
      method: 'POST', headers, signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ locationId: env.GHL_LOCATION_ID, name, email, ...(phone ? { phone } : {}), source: 'Last Living Souls website booking' }),
    })
    if (!contactResponse.ok) return reply(502, 'We couldn’t send your inquiry. Your message is still here—please try again.')
    const result = await contactResponse.json() as { contact?: { id?: string } }
    if (!result.contact?.id) return reply(502, 'We couldn’t send your inquiry. Please try again.')
    // Do not overwrite existing tags or custom fields. Preserve every inquiry as a contact note.
    const noteResponse = await upstream(`${API}/contacts/${encodeURIComponent(result.contact.id)}/notes`, {
      method: 'POST', headers, signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ body: `LAST LIVING SOULS — BOOKING INQUIRY\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}` }),
    })
    if (!noteResponse.ok) return reply(502, 'Your contact details were received, but your message wasn’t saved. Please try again.')
    return reply(200, 'Your inquiry is in. Thanks for reaching out to Last Living Souls.')
  } catch { return reply(502, 'We couldn’t confirm delivery. Your message is still here—please try again.') }
}
