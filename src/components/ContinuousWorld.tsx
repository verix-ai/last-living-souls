import type { CSSProperties } from 'react'
import './ContinuousWorld.css'
import CosmicDrifters from './CosmicDrifters'

// Positions share one continuous world coordinate system, rather than restarting
// at chapter boundaries. Chapter text travels over the same landscape.
const landmarks = [
  { art: 'ruins', at: 4, size: 32, mirror: false },
  { art: 'mushrooms', at: 16, size: 24, mirror: true },
  { art: 'mushrooms', at: 25, size: 43, mirror: false },
  { art: 'mushrooms', at: 34, size: 29, mirror: true },
  { art: 'ruins', at: 46, size: 40, mirror: false },
  { art: 'mushrooms', at: 58, size: 25, mirror: false },
  { art: 'mushrooms', at: 67, size: 46, mirror: true },
  { art: 'ruins', at: 76, size: 28, mirror: true },
  { art: 'portal', at: 80, size: 37, mirror: false },
  { art: 'mushrooms', at: 99, size: 27, mirror: false },
]

export default function ContinuousWorld() {
  return <div className="continuous-world" aria-hidden="true">
    <div className="cosmic-sky"><img src="/art/world/sky.webp" alt="" fetchPriority="high" /><div className="nebula-breath" /></div>
    <CosmicDrifters />
    <div className="distant-ridge ridge-far" />
    <div className="distant-ridge ridge-near" />
    <div className="world-haze" />
    <div className="landmark-rail">{landmarks.map((landmark, i) =>
      <img key={i} className={`world-landmark landmark-${landmark.art}`} src={`/art/world/${landmark.art}.webp`} alt=""
        style={{ '--landmark-at': `${landmark.at}%`, '--landmark-size': `${landmark.size}svh`, '--landmark-flip': landmark.mirror ? -1 : 1 } as CSSProperties} />
    )}</div>
    <div className="world-light" />
    <div className="continuous-ground"><div className="ground-texture" /></div>
    <div className="foreground-rail">{[9, 31, 53, 74, 95].map((position, i) =>
      <img key={position} src="/art/world/mushrooms.webp" alt="" className="foreground-growth"
        style={{ left: `${position}%`, '--growth-flip': i % 2 ? -1 : 1 } as CSSProperties} />
    )}</div>
  </div>
}
