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

## Current local direction

Astronaut removed entirely from the rendered experience at the user’s request. Collecting all three stars now displays only the completion message; it never reveals an astronaut. The original image asset is retained for possible future reuse. Band travel and the Your Light star hunt remain. This change is local only.

## Continuous-world rebuild

See CONTINUOUS_WORLD.md for the current local landscape, layered movement, grounded character placement, generated assets, and verification. This replaces the separate chapter backgrounds. The astronaut remains removed and the three-star hunt remains available with its future reward undecided.

## Local performance finale

The last stretch of the journey now moves the same five travelers into a performance formation. Daniel has guitar and microphone, Drew bass, Norris congas (confirmed by the user), Zane keyboard, and Dan a drum kit on a rear riser. Code-native pixel instruments and speakers preserve the existing character artwork. Arrival is tied to scroll progress and reverses when leaving the finale; at the finish the band faces forward with small playing motions. Still mode and reduced-motion preferences disable playing animation. Verified at desktop and 390px mobile widths with no horizontal overflow; all five instruments appear at the finish. Three-star collection is unchanged. Local only.

## Performance polish and song preview

Moved the portal earlier along the path and faded it out during the stage arrival, with a quiet stage backdrop. Daniel and Drew now switch to full generated performance poses with arms attached and hands holding the guitar/bass; the old drawn guitar/hand overlays are removed. Original walking strips remain unchanged. Zane's keyboard shows the audience-facing rear panel instead of an inverted keybed. Added decorative pixel spacecraft and larger cool-colored stars with independent drifting and scroll parallax, dimmed near the finale.

Added a tap-to-play, seekable player at the finale for the first **45 seconds** of `Shallow and Empty Promises.wav`, as explicitly requested. The original WAV remains untouched and is not included in this publication. The shipped MP3 is stereo 192kbps, exactly 45 seconds, with a two-second end fade and explicit Last Living Souls metadata. Playback pauses when leaving the finale; replay restarts at zero. Source performance art is in `design/performance-sprites`, exact built-in imagegen prompts in `docs/performance-art-prompts.json`, and mechanical sprite normalization in `scripts/prepare-performance-sprites.mjs`.

## Four-scene journey

Restructured the journey as Home → Meet the Band → Live Shows → The Performance. Removed the upper-left nav logo, reduced the hero wordmark, and placed verified Spotify, Apple Music, and Amazon Music links directly beneath it. Amazon destination verified at https://music.amazon.com/albums/B0FQ7YFQ1W; no confirmed band-specific YouTube Music link was available, so no generic or invented destination was added.

Five floating portrait cards use enlarged crops of the existing front-facing pixel characters. Their copy is deliberately limited to confirmed roles and short introductions until the band provides musical-background details. A dedicated reading interval holds the scenery while vertical scrolling carries all five cards across small screens. Numbered controls provide direct access; still mode uses a horizontally scrollable strip. Show cards contain the user-provided September 20 Alan Walden celebration of life plus two coming-soon slots; no unconfirmed venue, price, time, or ticket link was added.

The existing performance formation and 45-second player remain in the fourth/final scene. World travel still covers the full landscape, and the three stored star identifiers remain compatible. Legacy scene hashes route to their replacements. Verified reading interval boundaries, chapter destinations, mobile card access, compact layouts, and finale state.


## Walking past floating introductions

The world camera now advances throughout the band introductions, with distance-driven walking continuing as the cards pass. Removed the forced idle/front-facing override and scroll-driven card entrance rise. Cards are already present and gently bob as complete objects; desktop cards also extend across a horizontal lane so the camera passes them. Motion-off behavior is preserved.

Replaced Amazon Music with a pixel YouTube Music icon. Its destination is explicitly a YouTube Music search for Last Living Souls and Shallow and Empty until a confirmed artist URL is supplied. The other music destinations are unchanged.


## Introductions in open space

Replaced the clipped card carousel with a physically longer second scene. The world track itself now carries the five introductions past the travelers, including continuous entry from the home scene and exit into shows. Removed the inner viewport, numbered carousel controls, hard card panels, and borders. Portraits and descriptions bob as single groups against soft radial shadows; only the screen boundary clips them. Home retains the logo and streaming links. Still mode lays the introductions out in a readable wrapping grid rather than a nested scroller.


## Stage arrival audio and speaker motion

The existing 45-second preview now attempts playback when stage arrival reaches its final position, rather than simply entering the last chapter. A manual pause remains paused until a new arrival. Leaving the stage stops playback; returning attempts a fresh preview. Browsers that reject automatic playback show “Tap play to start the show.” Playback errors are handled without pretending audio started.

Speaker cones gently pulse and pixel outlines expand only after the audio's playing event. Pause, buffering, ending, or an error stops the animation; still mode and reduced-motion settings disable it. Verified blocked-autoplay fallback, tap-to-play, automatic playback on subsequent arrival, manual pause, speaker state changes, and mobile placement.


## Alternate song excerpt

Replaced the preview with 0:27–1:12 of the original WAV: 45 seconds with a two-second fade-in and the existing two-second fade-out. Encoded stereo MP3 at 192kbps and versioned the player URL so cached opening excerpts are refreshed. Stage-arrival playback and speaker animation are unchanged.


## Traveling band heading and individual profile frames

The band heading now travels with the camera over the entire introduction stretch, drifting gently across the top until Zane, then leaving with the second scene. Each independently floating profile has a plum frame, dark translucent panel, and small pixel accents. The whole-screen world path remains open; no clipped carousel viewport was restored. Still mode retains a normal heading and wrapping profile grid.


## About navigation and booking inquiry stop

Replaced the top Listen shortcut with About and Booking. Added a fifth journey destination for a booking contact form between live shows and the performance, plus a booking link below the show cards. Updated world map, chapter dots, legacy about hash, timeline, still mode, final-stage index and player activation.

The GoHighLevel integration runs server-side through the local Vite middleware and a Vercel function. Environment placeholders are ready in ignored `.env`; no real PIT or Location ID has been supplied yet. The eight mocked integration tests pass. The form retains input on delivery failure and only reports success after contact and note storage. See BOOKING.md for setup and current testing limitations. These changes are local pending credentials and live connection testing; the current static Sites deployment is not updated with an unusable contact form.


### Desktop finale audio (local)
- The opening “Start with sound” button prepares the same audio element during an explicit user click, then holds it at the beginning until the finale. Visitors can still scroll without enabling audio; browser autoplay restrictions may require the finale play button.
- Auto-start now uses the band's performance threshold instead of an almost exact last-pixel threshold. The attempt stays latched for the finale visit, so slight backward scrolling does not pause/restart the preview and manual pause is respected. Leaving the finale stops audio and resets the next visit.
- Verified desktop start-with-sound → scroll to finale: playback advances and speaker animation runs; a small backward scroll keeps playback running, manual pause remains stopped on scrolling back to the end. Production build passes.


### Booking connected locally
- Identified the Last Living Souls subaccount in the authorized GoHighLevel browser session. Saved its Location ID alongside the existing PIT in both ignored `.env` files; neither credential is in the frontend.
- Submitted one clearly labeled Website Booking Test through the running local `/api/booking` endpoint. Received HTTP 200 after the contact upsert and complete inquiry note both succeeded. No email/SMS was sent by this implementation.
- All eight mocked booking integration tests pass. Vercel still needs both server environment variables when deploying; the static ChatGPT Sites deployment is unchanged.
