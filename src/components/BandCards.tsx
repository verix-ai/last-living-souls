import type { CSSProperties } from 'react'

export const bandMembers = [
  { id: 'daniel', name: 'Daniel', role: 'Lead vocals · Lead guitar', intro: 'The voice and lead guitar of Last Living Souls. Out front, with a song to carry you somewhere else.' },
  { id: 'drew', name: 'Drew', role: 'Bass', intro: 'Drew holds down the bass for Last Living Souls. The low end of the band’s psychedelic sound.' },
  { id: 'dan', name: 'Dan', role: 'Drums', intro: 'Meet Dan, the drummer behind Last Living Souls. Keeping the whole journey moving, one beat at a time.' },
  { id: 'norris', name: 'Norris', role: 'Congas', intro: 'Norris joins the rhythm section on congas. Another layer of percussion in the Last Living Souls sound.' },
  { id: 'zane', name: 'Zane', role: 'Keys', intro: 'Zane plays keys for Last Living Souls. Find him behind the keyboard when the band takes the stage.' },
]
export default function BandCards() {
  return <>
    <div className="scene-content band-content">
    <div className="eyebrow">02 / MEET THE BAND</div><h2 id="title-band">Five souls.<em> One sound.</em></h2>
    </div>
    <div className="band-card-track">
      {bandMembers.map((member, i) => <article className={`member-card card-${member.id}`} key={member.id} style={{ '--float-delay': `${i * -.8}s` } as CSSProperties}>
        <div className="member-portrait"><img src={`/art/band/heads/${member.id}.png`} width="96" height="96" alt={`${member.name}'s pixel-art portrait`} /></div>
        <span className="member-number">0{i + 1} / LAST LIVING SOULS</span><h3>{member.name}</h3><span className="member-role">{member.role}</span><p>{member.intro}</p>
      </article>)}
    </div>
  </>
}
