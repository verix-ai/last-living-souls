import test from 'node:test'
import assert from 'node:assert/strict'
import { handleBooking } from './booking.ts'
const env = { GHL_PIT: 'test-secret-not-a-real-token', GHL_LOCATION_ID: 'test-location' }
const payload = { name: 'Booking Test', email: 'test@example.invalid', phone: '', message: 'Test inquiry for a local venue on September 20.' }
let nextAddress = 0
const request = (data = payload, extra = {}) => new Request('https://band.example/api/booking', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://band.example', 'x-forwarded-for': `test-${nextAddress++}`, ...extra }, body: JSON.stringify(data),
})
const forbiddenFetch = async () => { throw new Error('Unexpected upstream request') }

test('saves contact and complete inquiry as a note without overwriting tags', async () => {
  const calls = []
  const upstream = async (url, init) => {
    calls.push({ url, ...init, body: JSON.parse(init.body) })
    return Response.json(calls.length === 1 ? { contact: { id: 'contact-123' } } : { note: { id: 'note-123' } })
  }
  const response = await handleBooking(request(), env, upstream)
  assert.equal(response.status, 200)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].body.locationId, 'test-location')
  assert.equal(calls[0].body.email, payload.email)
  assert.equal(calls[0].headers.Authorization, `Bearer ${env.GHL_PIT}`)
  assert.equal(calls[0].body.tags, undefined)
  assert.equal(calls[0].body.phone, undefined)
  assert.match(calls[1].url, /contacts\/contact-123\/notes$/)
  assert.ok(calls[1].body.body.includes(payload.message))
  assert.equal((await response.text()).includes(env.GHL_PIT), false)
})
test('rejects invalid input and cross-origin submissions before contacting GHL', async () => {
  assert.equal((await handleBooking(request({ ...payload, email: 'bad' }), env, forbiddenFetch)).status, 400)
  assert.equal((await handleBooking(request(payload, { Origin: 'https://other.example' }), env, forbiddenFetch)).status, 403)
  assert.equal((await handleBooking(request({ ...payload, message: '' }), env, forbiddenFetch)).status, 400)
})
test('rejects large bodies and wrong methods', async () => {
  assert.equal((await handleBooking(request({ ...payload, message: 'a'.repeat(9000) }), env, forbiddenFetch)).status, 413)
  assert.equal((await handleBooking(new Request('https://band.example/api/booking'), env, forbiddenFetch)).status, 405)
})
test('missing credentials returns unavailable, never false success', async () => {
  const response = await handleBooking(request(), {}, forbiddenFetch)
  assert.equal(response.status, 503)
  assert.equal((await response.json()).ok, false)
})
test('honeypot is discarded without an upstream request', async () => {
  assert.equal((await handleBooking(request({ ...payload, website: 'spam' }), env, forbiddenFetch)).status, 200)
})
test('upstream authentication failure is safe and creates no note', async () => {
  let calls = 0
  const response = await handleBooking(request(), env, async () => { calls++; return Response.json({ secret: env.GHL_PIT }, { status: 401 }) })
  assert.equal(response.status, 502)
  assert.equal(calls, 1)
  assert.equal((await response.text()).includes(env.GHL_PIT), false)
})
test('partial delivery never claims the inquiry was fully saved', async () => {
  let calls = 0
  const response = await handleBooking(request(), env, async () => ++calls === 1 ? Response.json({ contact: { id: 'contact-123' } }) : new Response(null, { status: 500 }))
  assert.equal(response.status, 502)
  assert.match((await response.json()).message, /message wasn’t saved/)
})
test('repeated requests are throttled', async () => {
  const send = () => handleBooking(request(payload, { 'x-forwarded-for': 'rate-test' }), env, async () => new Response(null, { status: 503 }))
  for (let i = 0; i < 5; i++) assert.equal((await send()).status, 502)
  assert.equal((await send()).status, 429)
})
