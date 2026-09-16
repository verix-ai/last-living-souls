import { handleBooking } from '../server/booking.ts'

// Vercel Node.js function. Environment values are never included in the browser bundle.
export default {
  fetch(request: Request) { return handleBooking(request, process.env) },
}
