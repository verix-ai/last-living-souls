// Four destinations, with a reading interval while all five band cards pass by.
export const CHAPTER_TIMES = [0, 1, 3.4, 4.4] as const
export const JOURNEY_END = 4.4
export function journeyFrame(time: number) {
  const bounded = Math.max(0, Math.min(JOURNEY_END, time))
  const scene = bounded <= 1 ? bounded : bounded <= 2.4 ? 1 : bounded - 1.4
  return { scene, world: scene * 4 / 3, band: Math.max(0, Math.min(1, (bounded - 1) / 1.4)) }
}
