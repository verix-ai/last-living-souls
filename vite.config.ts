import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleBooking } from './server/booking.ts'

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'local-booking-api',
    configureServer(server) {
      const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
      server.middlewares.use('/api/booking', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          let length = 0
          for await (const chunk of req) {
            const data = Buffer.from(chunk)
            length += data.length
            if (length > 8192) { res.writeHead(413, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, message: 'Please shorten your message.' })); return }
            chunks.push(data)
          }
          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(',') : value)
          const method = req.method || 'GET'
          const request = new Request(`http://${req.headers.host || 'localhost:5173'}/api/booking`, { method, headers, ...(method === 'GET' || method === 'HEAD' ? {} : { body: Buffer.concat(chunks).toString('utf8') }) })
          const response = await handleBooking(request, env)
          res.writeHead(response.status, Object.fromEntries(response.headers))
          res.end(await response.text())
        } catch { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, message: 'We couldn’t send your inquiry. Please try again.' })) }
      })
    },
  }],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
}))
