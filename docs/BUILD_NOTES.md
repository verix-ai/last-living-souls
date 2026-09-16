# The Last Signal — implementation notes

Implemented September 16, 2026 in the existing React / TypeScript / Vite application.

## Experience

Five horizontal stages driven by native vertical scroll, original pixel-art environments, the supplied Last Living Souls wordmark and astronaut, layered motion, chapter navigation, three collectible signals with local persistence, optional still mode, and music/social destinations. The Should've Known Spotify embed loads only after the visitor opens it; the direct track link remains available. Existing /calendar route retained and lazy loaded.

## Editing

- Official destinations and scene names: src/App.tsx, the links and chapters objects.
- Scene text and release: src/App.tsx.
- Layout and responsive treatments: src/App.css.
- Wordmark, astronaut, album art and landscapes: public/art/.
- Locally hosted fonts: public/fonts/ (VT323 and DM Sans from Google Fonts; SIL Open Font License).
- Exact original landscape prompts: docs/art-prompts.json. Generated with the built-in imagegen tool, exported to WebP for the website.
- Band lineup, names, roles and height differences: src/components/BandTravelers.tsx.
- Band sprites and three-frame metadata: public/art/band/. The first frame faces front; the other two face right. Scrolling backward mirrors only the character, while accessible member descriptions remain unchanged. Visible member names are intentionally omitted.
- Band animation and responsive sizing: src/components/BandTravelers.css. Native scroll controls direction and starts the stepping cycle; 180 ms without movement returns the band to the front-facing pose. Still mode and reduced-motion preferences disable stepping.
- Sprite preparation: scripts/prepare-band-sprites.mjs accepts a folder of five generated three-cell strips and aligns/scales them without redrawing the artwork. Exact image-generation briefs are saved in docs/band-art-prompts.json.

## Asset sources

Supplied logo and astronaut were copied intact from the source project's design/ directory. Featured artwork was retrieved through Spotify's public oEmbed response for the existing supplied track URL.

Spotify artist: https://open.spotify.com/artist/05uIqoMvFedhpbcsIwPwjL
Spotify track: https://open.spotify.com/track/6h5yX5qxLx8IW2afIuMXt7
Apple Music artist verified by matching band and track: https://music.apple.com/us/artist/last-living-souls/1838556536
Instagram, Facebook, and TikTok were retained from the existing site. Unresolved generic YouTube and Discord links were omitted rather than directing visitors to service homepages. No show dates, booking details, or band biographies were fabricated.

The subsequent band-character update uses the supplied band_photo.png found in Downloads/attachments. Daniel, Drew, Dan and Norris follow the user's identification and the photo's outfits. Zane follows the user's description: Black, bald, sunglasses, keys. Norris's role has not been specified, so her screen-reader description uses only her name. Zane was revised with a smaller head, longer body, and the same displayed height as Drew. His final built-in imagegen edit prompt is in docs/zane-proportions-prompt.txt; the full-resolution strip is in design/band-sprites/zane.png. The original astronaut remains intact as an Easter egg: collecting all three Your Light stars reveals him. Collection progress persists between visits, and the reward remains visible without animation in still mode.

## Verification

- Production TypeScript and Vite build passed.
- ESLint passed on changed App.tsx and main.tsx.
- Local HTTP route returned 200.
- Desktop opening scene visually inspected at 1008 × 964.
- Mobile forest visually inspected at 390 × 844, including layout refinement.
- Opening-to-forest travel, music shortcut initiation, and two signal collections exercised through browser UI.
- Resize behavior was corrected to preserve journey progress.
- Subsequent browser checks were blocked by automatic approval review due to the account usage limit. Full final-stage, player, reduced-motion, landscape, 360/430px, keyboard, 200% text, real iOS/Android, and slow-network validation remains unverified. Do not represent those checks as completed.
- Band-character update: production build passed; generated strips inspected for transparent backgrounds, frame alignment, front/right orientation and recognizable clothing. Browser interaction testing was not repeated for this update.

## Behavior and privacy

No new analytics, account system, contact form, or backend was added. Existing optional tracking initialization is preserved but no tracking IDs were copied into the working build. Local storage holds only motion preference and collected signal numbers. The site can be used when storage is unavailable. Reduced motion defaults from the device setting. A no-JavaScript fallback links directly to the band's music.

## Your Light refinement verification

- Verified the astronaut is hidden with two collected stars and appears after collecting the third through the local browser UI.
- Verified the completion message and 3/3 counter, mobile layout at 390 × 844, and astronaut visibility in still mode.
- Inspected the final lineup with no visible names and Zane matching Drew’s overall height.
