import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LastLivingSoulsCalendar from '../last-living-souls-content-calendar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar" element={<LastLivingSoulsCalendar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
