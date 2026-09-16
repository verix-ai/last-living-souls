import type { CSSProperties } from 'react'

const ships = [
  { x: 7, y: 19, size: 70, delay: -3, type: 'saucer' },
  { x: 29, y: 35, size: 92, delay: -11, type: 'cruiser' },
  { x: 53, y: 15, size: 58, delay: -7, type: 'saucer' },
  { x: 76, y: 31, size: 82, delay: -17, type: 'cruiser' },
  { x: 96, y: 19, size: 62, delay: -5, type: 'saucer' },
]

/** Decorative world objects have scroll parallax plus a slow independent drift. */
export default function CosmicDrifters() {
  return <div className="cosmic-drifters">
    <div className="ship-rail">{ships.map((ship, i) => <div key={i} className={`drifting-ship ${ship.type}`} style={{ left: `${ship.x}%`, top: `${ship.y}svh`, '--ship-size': `${ship.size}px`, '--drift-delay': `${ship.delay}s` } as CSSProperties}>
      <svg viewBox="0 0 48 28" shapeRendering="crispEdges" fill="none">
        {ship.type === 'saucer' ? <>
          <path d="M17 4H31V7H35V13H42V16H47V21H39V24H9V21H1V16H6V13H13V7H17Z" fill="#171329" />
          <path d="M18 6H30V9H33V14H15V9H18Z" fill="#a5cfcc" /><path d="M18 7H22V12H17V10H18Z" fill="#e1e8d2" />
          <path d="M8 15H40V17H45V20H38V22H10V20H3V17H8Z" fill="#957da7" /><path d="M9 16H39V18H9Z" fill="#d0b1cc" />
          <path d="M10 19H14V21H10ZM22 19H26V21H22ZM34 19H38V21H34Z" fill="#edc699" />
        </> : <>
          <path d="M2 12H10V8H17V4H24V8H33V11H41V14H47V19H39V22H23V26H16V22H8V19H2Z" fill="#18152a" />
          <path d="M11 12H19V7H22V11H32V14H41V16H44V18H37V20H22V23H18V20H10V17H7V14H11Z" fill="#a8a0bd" />
          <path d="M24 12H32V15H37V17H24Z" fill="#82b8bd" /><path d="M14 14H21V17H14Z" fill="#e8c6a7" />
          <path className="ship-thrust" d="M1 14H9V17H1Z" fill="#e6a5cb" />
        </>}
      </svg>
    </div>)}</div>
    <div className="bright-star-rail">{[3, 14, 25, 39, 48, 61, 73, 86, 97].map((x, i) => <svg key={x} className="wandering-star" viewBox="0 0 16 16" shapeRendering="crispEdges" style={{ left: `${x}%`, top: `${12 + (i * 17) % 41}svh`, '--star-size': `${i % 3 === 0 ? 27 : 17}px`, '--drift-delay': `${-i * 2.3}s` } as CSSProperties}>
      <path d="M7 0H9V5H11V7H16V9H11V11H9V16H7V11H5V9H0V7H5V5H7Z" fill={i % 2 ? '#abced5' : '#c8a8d7'} /><path d="M7 6H9V10H7ZM6 7H10V9H6Z" fill="#f1e6ed" />
    </svg>)}</div>
  </div>
}
