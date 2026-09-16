import type { CSSProperties } from 'react'
import './BandTravelers.css'
import StageInstrument from './StageInstrument'

const members = [
  { id: 'norris', name: 'Norris', role: 'Congas', height: .86 },
  { id: 'drew', name: 'Drew', role: 'Bass', height: 1 },
  { id: 'daniel', name: 'Daniel', role: 'Lead vocals / lead guitar', height: .9 },
  { id: 'dan', name: 'Dan', role: 'Drums', height: .8 },
  { id: 'zane', name: 'Zane', role: 'Keys', height: 1 },
]

/** Three frames per sheet: front idle, right stride, right passing pose. */
export default function BandTravelers() {
  return <div className="band-ensemble">
    <div className="arrival-stage" aria-hidden="true"><div className="stage-beam beam-left" /><div className="stage-beam beam-right" /><div className="stage-deck" /><div className="stage-speaker speaker-left"><i /><i /></div><div className="stage-speaker speaker-right"><i /><i /></div></div>
    <ul className="band-travelers" aria-label="Meet Last Living Souls">
    {members.map(member => <li className={`band-member member-${member.id}`} key={member.id}
      style={{ '--member-height': member.height, '--sprite': `url(/art/band/${member.id}.png)` } as CSSProperties}>
      {member.id === 'dan' && <span className="drum-riser" aria-hidden="true" />}
      <span className="band-sprite" aria-hidden="true" />
      <StageInstrument member={member.id} />
      <span className="sr-only">{member.name}{member.role ? ` — ${member.role}` : ''}</span>
    </li>)}
  </ul>
  </div>
}
