import { useEffect, useRef } from 'react'
import './AboutDialog.css'

export default function AboutDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const panel = dialog.current
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel?.showModal()
    heading.current?.focus({ preventScroll: true })
    return () => {
      panel?.close()
      document.body.style.overflow = overflow
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  return <dialog ref={dialog} className="about-dialog" aria-labelledby="about-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="about-panel">
      <header className="about-panel-top"><span>THE PEOPLE BEHIND THE SIGNAL</span><button className="about-close" onClick={onClose} aria-label="Close About"><span aria-hidden="true">×</span></button></header>
      <div className="about-story">
        <span className="about-kicker">GEORGIA ROOTS · SOUTHERN SOUL</span>
        <h2 id="about-title" ref={heading} tabIndex={-1}>Last Living <em>Souls.</em></h2>
        <p>LAST LIVING SOULS is a Southern rock and soul-infused band from Georgia, blending gritty guitars, emotional songwriting, and powerful live energy into a modern Americana sound. Fronted by award-winning singer, songwriter, and producer Daniel NeSmith, the band combines roots rock, blues, psychedelic textures, and heartfelt storytelling, with influences ranging from classic Southern rock to alternative jam bands. Known for dynamic live performances and authentic musicianship, LAST LIVING SOULS delivers original music that connects deeply with audiences while keeping the spirit of real rock and roll alive.</p>
        <p>The group was formed in 2025 and quickly began building momentum with the release of their first singles and a growing Southeast fan base. Members of the band bring years of touring, recording, and studio experience, creating a polished but raw sound that feels both timeless and fresh.</p>
        <p>Whether performing intimate venues or larger festival stages, LAST LIVING SOULS aims to create an unforgettable experience rooted in passion, soul, and genuine human connection.</p>
        <div className="about-signoff" aria-hidden="true">✦ &nbsp; LOST IN SPACE. FOUND IN SOUND. &nbsp; ✦</div>
      </div>
    </div>
  </dialog>
}
