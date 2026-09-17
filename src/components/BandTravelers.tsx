import { useState } from 'react'
import type { CSSProperties, SyntheticEvent } from 'react'
import './BandTravelers.css'
import StageInstrument from './StageInstrument'

const members = [
  { id: 'norris', name: 'Norris', role: 'Congas', height: .86 },
  { id: 'drew', name: 'Drew', role: 'Bass', height: 1 },
  { id: 'daniel', name: 'Daniel', role: 'Lead vocals / lead guitar', height: .97 },
  { id: 'dan', name: 'Dan', role: 'Drums', height: .86 },
  { id: 'zane', name: 'Zena', role: 'Keys', height: 1 },
]

/** Three frames per sheet: front idle, right stride, right passing pose. */
export default function BandTravelers() {
  const [performanceReady, setPerformanceReady] = useState<Record<string, boolean>>({})
  const preparePerformance = async (member: string, event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget
    try {
      await image.decode()
      if (image.naturalWidth > 0) setPerformanceReady(ready => ({ ...ready, [member]: true }))
    } catch { /* Keep the walking sprite visible if this image cannot decode. */ }
  }
  return <div className="band-ensemble">
    <div className="arrival-stage" aria-hidden="true"><div className="stage-beam beam-left" /><div className="stage-beam beam-right" /><div className="stage-deck" /><div className="stage-speaker speaker-left"><i /><i /></div><div className="stage-speaker speaker-right"><i /><i /></div></div>
    <ul className="band-travelers" aria-label="Meet Last Living Souls">
    {members.map(member => <li className={`band-member member-${member.id}`} key={member.id}
      data-performance-ready={performanceReady[member.id] ?? false}
      style={{ '--member-height': member.height } as CSSProperties}>
      {member.id === 'dan' && <span className="drum-riser" aria-hidden="true" />}
      <span className="band-sprite" aria-hidden="true"><img className="band-sprite-sheet" src={`/art/band/${member.id}.png${member.id === 'daniel' ? '?v=western-face-3' : ''}`} width="480" height="160" alt="" loading="eager" decoding="sync" fetchPriority="high" draggable={false} /></span>
      {['daniel', 'drew'].includes(member.id) && <img className="performance-sprite" src={`/art/band/${member.id}-performance.png${member.id === 'daniel' ? '?v=western-face-3' : ''}`} width="160" height="160" alt="" aria-hidden="true" loading="eager" onLoad={event => { void preparePerformance(member.id, event) }} onError={() => setPerformanceReady(ready => ({ ...ready, [member.id]: false }))} />}
      <StageInstrument member={member.id} />
      <span className="sr-only">{member.name}{member.role ? ` — ${member.role}` : ''}</span>
    </li>)}
  </ul>
  </div>
}
