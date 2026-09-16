import sharp from 'sharp'
// Normalize generated full-body poses to the existing 160px cells and shoe baseline.
for (const [name, footCenter] of [['daniel', 626], ['drew', 605]]) {
  const input = `design/performance-sprites/${name}-performance.png`
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let left=info.width, top=info.height, right=0, bottom=0
  for(let y=0;y<info.height;y++) for(let x=0;x<info.width;x++) {
    if(data[(y*info.width+x)*4+3] >= 128) { left=Math.min(left,x); right=Math.max(right,x); top=Math.min(top,y); bottom=Math.max(bottom,y) }
  }
  const scale=148/(bottom-top+1)
  const width=Math.round((right-left+1)*scale)
  const sprite=await sharp(input).extract({left,top,width:right-left+1,height:bottom-top+1}).resize(width,148,{kernel:'nearest'}).png().toBuffer()
  await sharp({create:{width:160,height:160,channels:4,background:'#00000000'}}).composite([{input:sprite,left:Math.round(80-(footCenter-left)*scale),top:7}]).png().toFile(`public/art/band/${name}-performance.png`)
}
