import type { CSSProperties } from 'react'
import './BandTravelers.css'

const members = [
  { id: 'norris', name: 'Norris', role: '', height: .86, delay: -.12 },
  { id: 'drew', name: 'Drew', role: 'Bass', height: 1, delay: -.27 },
  { id: 'daniel', name: 'Daniel', role: 'Lead vocals / lead guitar', height: .9, delay: 0 },
  { id: 'dan', name: 'Dan', role: 'Drums', height: .8, delay: -.19 },
  { id: 'zane', name: 'Zane', role: 'Keys', height: .92, delay: -.07 },
]

/** Three frames per sheet: front idle, right step A, right step B. */
export default function BandTravelers() {
  return <ul className="band-travelers" aria-label="Meet Last Living Souls">
    {members.map(member => <li className="band-member" key={member.id}
      title={`${member.name}${member.role ? ` · ${member.role}` : ''}`}
      style={{ '--member-height': member.height, '--step-delay': `${member.delay}s`, '--sprite': `url(/art/band/${member.id}.png)` } as CSSProperties}>
      <span className="band-sprite" aria-hidden="true" />
      <span className="member-name">{member.name}</span>
      {member.role && <span className="sr-only"> — {member.role}</span>}
    </li>)}
  </ul>
}
