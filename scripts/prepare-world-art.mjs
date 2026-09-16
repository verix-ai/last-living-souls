import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const source = 'design/continuous-world'
const output = 'public/art/world'
await mkdir(output, { recursive: true })
await sharp(`${source}/sky.png`).resize(2172, 724).webp({ quality: 88 }).toFile(`${output}/sky.webp`)

// Crops follow the actual generated atlas boundaries; the generator did not
// place its horizontal gutter exactly halfway down the image.
const crops = {
  mushrooms: { left: 0, top: 460, width: 512, height: 510 },
  ruins: { left: 512, top: 460, width: 528, height: 507 },
  portal: { left: 1040, top: 460, width: 496, height: 507 },
}
for (const [name, bounds] of Object.entries(crops)) {
  await sharp(`${source}/scenery-atlas.png`).extract(bounds).webp({ quality: 91, alphaQuality: 100 }).toFile(`${output}/${name}.webp`)
}

// Mirrored pairs make both join boundaries identical, including the ground's
// top row. This prevents seams without redrawing any generated artwork.
async function mirroredTile(input, destination) {
  const { data, info } = await input.png().toBuffer({ resolveWithObject: true })
  const reflected = await sharp(data).flop().png().toBuffer()
  await sharp({ create: { width: info.width * 2, height: info.height, channels: 4, background: '#00000000' } })
    .composite([{ input: data, left: 0, top: 0 }, { input: reflected, left: info.width, top: 0 }])
    .webp({ lossless: true }).toFile(destination)
}
await mirroredTile(sharp(`${source}/scenery-atlas.png`).extract({ left: 0, top: 80, width: 1536, height: 360 }).resize(1024, 240, { kernel: 'nearest' }), `${output}/mountains.webp`)
await mirroredTile(sharp(`${source}/ground.png`).resize(480, 160, { kernel: 'nearest' }), `${output}/ground.webp`)
console.log('Prepared sky, mountain ridge, three landmarks, and seamless ground texture.')
