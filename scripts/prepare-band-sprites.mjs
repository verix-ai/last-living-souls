import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// Mechanical raster preparation only: crop the three generated frames,
// preserve their proportions, and align their centers and shoe baseline.
const source = resolve(process.argv[2] || '/private/tmp/lls-band-sprites')
const output = resolve('public/art/band')
await mkdir(output, { recursive: true })
const cell = 160
const manifest = []
for (const name of ['norris', 'drew', 'daniel', 'dan', 'zane']) {
  const input = await readFile(resolve(source, `${name}.png`))
  const { width, height, hasAlpha } = await sharp(input).metadata()
  if (!hasAlpha || width !== height * 3) throw new Error(`${name}: expected a transparent 3:1 sprite strip`)
  const frames = []
  for (let i = 0; i < 3; i++) {
    const frame = await sharp(input).extract({ left: i * height, top: 0, width: height, height }).raw().toBuffer({ resolveWithObject: true })
    let left = height, top = height, right = 0, bottom = 0
    for (let y = 0; y < height; y++) for (let x = 0; x < height; x++) {
      if (frame.data[(y * height + x) * frame.info.channels + 3] > 32) {
        left = Math.min(left, x); right = Math.max(right, x)
        top = Math.min(top, y); bottom = Math.max(bottom, y)
      }
    }
    if (left >= right || top >= bottom) throw new Error(`${name}: empty frame ${i}`)
    frames.push({ left: i * height + left, top, width: right - left + 1, height: bottom - top + 1 })
  }
  const scale = 148 / Math.max(...frames.map(frame => frame.height))
  const composites = await Promise.all(frames.map(async (frame, i) => {
    const width = Math.round(frame.width * scale), height = Math.round(frame.height * scale)
    return { input: await sharp(input).extract(frame).resize(width, height, { kernel: 'nearest' }).png().toBuffer(), left: i * cell + Math.round((cell - width) / 2), top: 155 - height }
  }))
  await sharp({ create: { width: cell * 3, height: cell, channels: 4, background: '#00000000' } }).composite(composites).png({ compressionLevel: 9 }).toFile(resolve(output, `${name}.png`))
  manifest.push({ name, width: cell * 3, height: cell, frames: ['front-facing idle', 'right-facing stride', 'right-facing passing step'], sourceBounds: frames })
}
await writeFile(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`Prepared ${manifest.length} transparent sprite strips in ${output}`)
