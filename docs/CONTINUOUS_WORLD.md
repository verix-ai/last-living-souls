# Continuous world

The local experience now uses one landscape underneath the five content chapters. Individual scene backgrounds were removed. The existing band sprites, chapter controls, music destinations, three-star hunt, and still mode remain.

## Depth and movement

- Cosmic sky: generated sky art with a slow vertical drift and nebula light animation; horizontal movement is 5vw per chapter.
- Far and near mountains: independent repeated transparent ridges move 15vw and 29vw per chapter.
- Mushrooms, abandoned radio ruins, and the final portal: positioned along one continuous world coordinate system and move with the route.
- Ground: a single, flat rocky surface traverses the full journey. Ground and landmarks move 100vw per chapter on desktop and 150vw on phones.
- Low foreground growth and existing drifting spores provide nearby detail.

The five sprites share the ground height. Their normalized shoe baseline is 155/160 of the sprite frame, accounted for in layout so different character heights still touch the same surface. Walk frames advance every 26 pixels of ground travel; alternating members use opposite phases. Reverse scrolling flips their facing direction. They face the viewer after scrolling stops.

## Artwork

Built-in imagegen created exactly three source assets: sky, a mountain/landmark atlas, and ground. Source PNGs are retained in `design/continuous-world/`; exact prompts are in `docs/continuous-world-art-prompts.json`.

`scripts/prepare-world-art.mjs` crops the atlas at its measured boundaries, exports optimized WebP assets, and builds mirrored pairs for mountain and ground tiles. Both outside and center join edges were verified pixel-identical. Production art is in `public/art/world/`.

No astronaut is rendered, regardless of star count. Finding all three stars currently displays the completion message only; the future Easter egg has intentionally not been chosen.

## Verification

- TypeScript/Vite production build.
- Desktop and 390×844 mobile visual checks of the path, foreground landmarks, and final destination.
- 844×390 landscape music layout checked and its album artwork compacted to clear the band.
- Rendered foot positions measured within 0.02 pixels of the shared ground surface.
- Different sky, ridge, and ground transforms verified in the browser.
- Still mode verified with every sky/sprite animation disabled and feet still on the ground.
- Star collection progress preserved; no reward or extra state introduced.

Work remains local as requested. The development server is retained for review.
