# Daniel — Western outfit revision

## Light-blue guitar correction

The performance source and prepared sprite now use a light-blue guitar. Edited with the built-in image-generation tool using this prompt:

Use case: precise-object-edit. Edit this transparent pixel-art game sprite. Change ONLY the bright pink/magenta paint on the electric guitar body and its matching headstock to LIGHT BLUE (powder/sky blue, around #8bcbea with pale blue highlights and medium blue shadow pixels). Preserve the white pickguard, dark fretboard, strings, hardware and black outline. Everything else must remain unchanged: exact character, face, hair, beard, embroidered black Western shirt, blue jeans, boots, body proportions, pose, both hands on the instrument, guitar shape and angle, placement, pixel-art style, framing, transparent alpha background. No added objects or text. Do not redesign or redraw Daniel. This is solely a guitar paint-color correction.

Generated with the built-in image-generation tool. Reference photographs were used for outfit and likeness; they are not copied into the repository.

## Walking sheet prompt

Use case: identity-preserve. Edit target image 1 is Daniel's existing three-frame transparent pixel-art sprite sheet. Image 2 is the outfit reference: black fitted Western shirt, rust-red piping, cream/tan embroidered guitar and rope motifs with tiny turquoise accents, blue jeans and dark boots. Image 3 is Daniel's true face/hair reference: light skin, short swept-back sandy gray hair with short sides, full salt-and-pepper beard. Image 4 (Zena) is ONLY pixel-art scale/style reference, not identity.
Create a replacement transparent three-frame sprite strip with exactly THREE evenly spaced square cells in ONE horizontal row, 3:1 canvas. Frame1 front-facing idle arms down; frame2 right-facing walking stride legs apart; frame3 right-facing passing step with alternate bent leg. Same Daniel in every frame. Remove his hat completely, show his swept-back hair and full gray beard. Make his body noticeably slimmer and longer-legged than the original, natural lean-average build (not skinny), proportions close to Zena's reference with a normal-sized head. Full black embroidered Western shirt tucked into blue jeans with belt, dark boots. No jacket. Keep the old chunky retro pixel-art style, dark pixel outlines, flat clustered shading and limited palette. All three figures identical head size, body height and shoe baseline, centered in each cell, generous clear margins, entire heads and boots visible. Character is about 90% of cell height. No guitar held in walking frames. TRUE alpha transparent background; no checkerboard pattern, labels, shadows or ground. Crisp hard square pixels, no blur or smooth painted rendering.

## Performance prompt

Use case: identity-preserve. Image 1 is the newly approved Daniel character sheet and is the authoritative identity/outfit/style reference. Image 2 is the old stage-performance sprite and is the pose and instrument reference ONLY.
Create ONE full-body front-facing Daniel performing on electric guitar for this pixel-art game. Match image 1 exactly: slimmer long-legged build, uncovered short swept-back sandy gray hair, full gray salt-and-pepper beard, black embroidered Western shirt with red piping, cream guitar/rope motifs and turquoise highlights, blue jeans, dark boots. NO HAT, no jacket. Retain the same pink/magenta electric guitar with white pickguard from image 2 and the same front-facing performance stance. Guitar neck extends toward viewer's right. His left hand holds the fretboard and right hand rests on the strings at the guitar body; only TWO arms, no extra hands at sides. Both boots grounded and evenly aligned. Keep his physical height and head/body proportions the same as image1. Center the BODY/feet on the canvas (guitar may extend right), full hair and boots visible with margins. Transparent alpha background, square canvas, no ground shadow, no labels, no checkerboard. Retro chunky pixel art and dark stepped outlines with crisp square pixels as image1.

## Integration

- Generated sources: `design/band-sprites/daniel-western.png` and `design/performance-sprites/daniel-western-performance.png`.
- Prepared assets: `public/art/band/daniel.png`, `public/art/band/daniel-performance.png`, `public/art/band/heads/daniel.png`.
- Run `node scripts/prepare-daniel-western.mjs` to reproduce mechanical cropping and nearest-neighbor sizing.
- Daniel's height is 0.97 of the shared size; Zena's is 1.00. Feet remain aligned to the same ground baseline.
