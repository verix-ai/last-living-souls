# Booking integration

The journey now has five stops: Home, Meet the Band, Live Shows, Booking, The Performance. The top navigation has About (band introductions), Booking, and World Map. Live Shows also links to Booking.

## Local setup

Use Node.js 24 for development and tests. `.env` is ignored by Git. Set these server-only keys (also shown without values in `.env.example`):

- `GHL_PIT`: the subaccount Private Integration Token, with contact write permission covering upsert and notes.
- `GHL_LOCATION_ID`: the matching subaccount Location ID.

Never use a `VITE_` prefix for either value. The Vite server middleware handles `/api/booking` locally; the token is never sent to the browser. Restart `npm run dev` after changing the environment if Vite has not restarted automatically.

## Vercel

Deploy with the `web` directory as the Vercel project root, the Vite build, and `dist` output. `api/booking.ts` is the Node.js function for the same endpoint. Configure both environment keys in the intended Vercel deployment environments, then deploy. Do not put this form on a static-only host without an API implementation. The existing ChatGPT Sites deployment is static-only and has not been replaced with this unconnected form.

## Delivery behavior

The server validates the submission, upserts the contact through GoHighLevel, and adds the full inquiry as a contact note. Existing tags and custom fields are not overwritten. It returns success only after both upstream requests succeed. Errors retain the form values and show a retry message. It includes a honeypot, bounded body size, a per-instance throttle, and same-origin checks. The throttle is not a distributed WAF; additional production abuse controls can be configured in Vercel. No custom marketing enrollment or automated email/SMS is added by this code. Existing account workflows may respond to CRM contact changes.

Run `npm run test:booking` for mocked integration tests (no live contacts created). They cover delivery, validation, method/origin/body limits, missing credentials, honeypot handling, upstream failures, partial failures, and throttling. Live subaccount delivery still requires the real PIT and Location ID.

API references:
- https://marketplace.gohighlevel.com/docs/2023-02-21/ghl/contacts/upsert-contact/index.html
- https://marketplace.gohighlevel.com/docs/2023-02-21/ghl/contacts/create-note/index.html
- https://vercel.com/docs/functions/runtimes/node-js
