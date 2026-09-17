import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'

// Mechanical preparation of generated art: crop, nearest-neighbor scale and
// align feet. Character design comes from the source PNGs, not this script.
const walking = 'design/band-sprites/daniel-western.png'
const performing = 'design/performance-sprites/daniel-western-performance.png'
async function bounds(input, region) {
  let pipe = sharp(input).ensureAlpha()
  if (region) pipe = pipe.extract(region)
  const { data, info } = await pipe.raw().toBuffer({ resolveWithObject: true })
  let left = info.width, top = info.height, right = -1, bottom = -1
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 32) {
      left = Math.min(left, x); top = Math.min(top, y)
      right = Math.max(right, x); bottom = Math.max(bottom, y)
    }
  }
  if (right < left) throw new Error('Empty sprite frame')
  return { left: left + (region?.left ?? 0), top: top + (region?.top ?? 0), width: right - left + 1, height: bottom - top + 1 }
}
const metadata = await sharp(walking).metadata()
if (!metadata.hasAlpha || metadata.width !== metadata.height * 3) throw new Error('Expected transparent three-frame strip')
const size = metadata.height
const frames = await Promise.all([0, 1, 2].map(i => bounds(walking, { left: i * size, top: 0, width: size, height: size })))
const scale = 148 / Math.max(...frames.map(f => f.height))
const layers = await Promise.all(frames.map(async (f, i) => {
  const width = Math.round(f.width * scale), height = Math.round(f.height * scale)
  return { input: await sharp(walking).extract(f).resize(width, height, { kernel: 'nearest' }).png().toBuffer(), left: i * 160 + Math.round((160 - width) / 2), top: 155 - height }
}))
await sharp({ create: { width: 480, height: 160, channels: 4, background: '#00000000' } }).composite(layers).png().toFile('public/art/band/daniel.png')
// Crop the front-facing head and shoulders directly from the same character.
await sharp('public/art/band/daniel.png').extract({ left: 47, top: 7, width: 66, height: 66 }).resize(96, 96, { kernel: 'nearest' }).png().toFile('public/art/band/heads/daniel.png')
const full = await bounds(performing)
const feet = await bounds(performing, { left: full.left, top: full.top + Math.floor(full.height * .9), width: full.width, height: Math.ceil(full.height * .1) })
const stageScale = 148 / full.height
const stageWidth = Math.round(full.width * stageScale)
const footCenter = feet.left + feet.width / 2
const left = Math.round(80 - (footCenter - full.left) * stageScale)
if (left < 0 || left + stageWidth > 160) throw new Error('Performance sprite exceeds its cell')
const pose = await sharp(performing).extract(full).resize(stageWidth, 148, { kernel: 'nearest' }).png().toBuffer()
await sharp({ create: { width: 160, height: 160, channels: 4, background: '#00000000' } }).composite([{ input: pose, left, top: 7 }]).png().toFile('public/art/band/daniel-performance.png')
const manifest = JSON.parse(await readFile('public/art/band/manifest.json', 'utf8'))
Object.assign(manifest.find(m => m.name === 'daniel'), { source: walking, sourceBounds: frames })
await writeFile('public/art/band/manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('Prepared Daniel: three walking frames, matching portrait and centered performance pose.')
