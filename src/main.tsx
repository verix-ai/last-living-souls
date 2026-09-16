import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
const LastLivingSoulsCalendar = lazy(() => import('../last-living-souls-content-calendar.jsx'))
import { initTracking } from './lib/tracking'

initTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar" element={<Suspense fallback={<p style={{ color: '#fff0cf', padding: 30 }}>Loading calendar…</p>}><LastLivingSoulsCalendar /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
