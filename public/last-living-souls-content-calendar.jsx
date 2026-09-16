import { useState } from "react";

const hashtagSets = {
  A: {
    label: "SET A — High Volume Discovery",
    color: "#ff3333",
    tags: "#rock #music #rockmusic #rocknroll #livemusic #guitar #rockband #concert #musician #newmusic #hardrock #alternative #band #rockandroll #guitarist #singer #rockstar #LastLivingSouls"
  },
  B: {
    label: "SET B — Mid-Tier Engagement",
    color: "#ff8800",
    tags: "#indierock #alternativerock #unsignedartist #independentartist #newband #musicdiscovery #bandlife #originalmusic #indieband #rockmusician #newrock #supportindiemusic #emergingartist #musicianlife #LastLivingSouls"
  },
  C: {
    label: "SET C — Niche Community",
    color: "#00ccff",
    tags: "#LastLivingSouls #unsignedrockband #newrockband #rockfans #indiebands #undergroundrock #rockmusicians #liveband #grunge #alternativemusic #rocknation #bandcamp #rockersunite #indierockband #originalrock"
  },
  D: {
    label: "SET D — Platform Trending / FYP",
    color: "#cc44ff",
    tags: "#fyp #foryou #viral #musicvideo #reelsmusic #bandtok #musictok #newmusicfriday #indieartist #alternativerock #trending #musicreels #livemusic #rockcheck #independentmusic"
  }
};

const typeColors = {
  "Reel": "#ff3333",
  "Static": "#888",
  "BTS Clip": "#ff8800",
  "Cover": "#00ccff",
  "Music Snippet": "#ff3333",
  "Lyric Post": "#cc44ff",
  "Spotlight": "#ff8800",
  "Carousel": "#00aa66",
  "Engagement": "#ffcc00",
  "Story/Poll": "#cc44ff",
  "Gear Post": "#00ccff",
  "Live Clip": "#ff3333",
  "Fan Content": "#00aa66",
  "Acoustic": "#888",
  "Candid": "#888",
  "Throwback": "#888",
  "Aesthetic": "#888",
  "Q&A": "#ffcc00",
  "Announcement": "#ff3333",
  "Countdown": "#cc44ff",
  "Milestone": "#00aa66",
  "Stream Push": "#ff8800",
  "Teaser": "#cc44ff",
  "Merch Drop": "#ff8800",
  "Challenge": "#00ccff",
  "Highlight Reel": "#ff3333",
  "Fan Interaction": "#00aa66",
  "Collab Tease": "#00ccff",
  "Collab Post": "#00ccff",
  "Reflection": "#888",
  "Gratitude": "#00aa66",
  "Fan Appreciation": "#00aa66",
  "Music Release": "#ff3333",
  "Music Video": "#ff3333",
  "Music Push": "#ff8800",
  "Fan Spotlight": "#00aa66",
  "Q&A Live": "#ff3333",
  "Community": "#00aa66",
  "Grand Finale": "#ff3333",
  "Fan Q&A": "#ffcc00",
  "Acoustic/Candid": "#888",
};

const calendarData = [
  {
    month: 1,
    theme: "ARRIVAL",
    tagline: "Build Awareness — Introduce Last Living Souls to the World",
    weeks: [
      {
        week: 1, focus: "Band Introduction",
        posts: [
          { day: 1, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "BAND INTRO REEL — Fast-cut clips of each member, energy-packed, ends with band logo. Caption: 'We are Last Living Souls. This is just the beginning.'", tags: "A" },
          { day: 1, dayName: "Mon", type: "Static", platform: "IG / FB", content: "Official band photo drop — Origin story in caption. Where you're from, what drives you, and what the band name means to you.", tags: "B" },
          { day: 2, dayName: "Tue", type: "Spotlight", platform: "TikTok / IG", content: "MEMBER SPOTLIGHT: Guitarist — 'Meet [Name]' — 15-sec shred clip with overlay text. Raw and loud.", tags: "C" },
          { day: 2, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Classic Rock vs Modern Rock — which hits harder?' First touch engagement, boosts your account in the algorithm immediately.", tags: "D" },
          { day: 3, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG", content: "BTS REHEARSAL — Raw, uncut, no filter. Show the grind. 'This is what 11pm rehearsals look like.' Authenticity is your biggest weapon.", tags: "A" },
          { day: 3, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: '5 Bands That Shaped Our Sound' — One band per slide, one line about their influence. Makes fans feel seen and builds credibility.", tags: "B" },
          { day: 4, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG", content: "MEMBER SPOTLIGHT: Drummer — Drum cam clip from rehearsal. Overlay: 'The heartbeat of Last Living Souls.' Drum content performs extremely well.", tags: "C" },
          { day: 4, dayName: "Thu", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC — Pull the most powerful line from your best song. Bold font, dark moody background. Let the words do the work.", tags: "D" },
          { day: 5, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG", content: "SONG SNIPPET — 20-30 sec of your hardest-hitting track. Hook in the first 3 seconds. End with 'Stream now — link in bio.'", tags: "A" },
          { day: 5, dayName: "Fri", type: "Static", platform: "IG / FB", content: "NEW MUSIC FRIDAY — Announce or highlight your available track. Release art, streaming platform logos, one strong call to action.", tags: "B" },
          { day: 6, dayName: "Sat", type: "Engagement", platform: "TikTok / IG", content: "FAN QUESTION: 'What's the greatest rock band of all time? Drop it below 👇' — Comment volume drives algorithmic reach immediately.", tags: "D" },
          { day: 7, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "MOOD SHOT — Dark, cinematic band photo or individual aesthetic shot. Minimal caption or none. Let the image breathe. Pure vibe.", tags: "C" },
        ]
      },
      {
        week: 2, focus: "Story & Identity",
        posts: [
          { day: 8, dayName: "Mon", type: "Spotlight", platform: "TikTok / IG", content: "MEMBER SPOTLIGHT: Vocalist — Powerful vocal clip. Raw emotion. 'Meet the voice of Last Living Souls.' Singing content = top performing.", tags: "A" },
          { day: 8, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "HOW WE GOT OUR NAME — Quick story Reel. Members each say one word that describes what the name means to them. Magnetic concept.", tags: "B" },
          { day: 9, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG", content: "LOADING GEAR — Clip of loading equipment into a van or carrying amps. The unglamorous hustle. Caption: 'Nobody sees this part.'", tags: "C" },
          { day: 9, dayName: "Tue", type: "Gear Post", platform: "IG / FB", content: "GEAR SHOWCASE — Guitarist's pedalboard or amp setup. Tag the brands. Gear communities are massive and will share your content.", tags: "D" },
          { day: 10, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER SONG #1 — Do a rock classic (Foo Fighters, QOTSA, Soundgarden). Cover songs are discovery gold. Full band energy, full commitment.", tags: "A" },
          { day: 10, dayName: "Wed", type: "Lyric Post", platform: "IG / FB", content: "LYRIC BREAKDOWN — Post a lyric then explain what it really means in the caption. Fans love knowing the 'why' behind the words.", tags: "B" },
          { day: 11, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG", content: "MEMBER SPOTLIGHT: Bassist — Bassline-focused clip. 'You can't feel rock without this.' Feature what gets overlooked. Bass fans are loyal.", tags: "C" },
          { day: 11, dayName: "Thu", type: "Engagement", platform: "IG Stories", content: "Q&A BOX OPEN: 'Ask us anything about the band' — Collect questions, answer them in video format later this week.", tags: "D" },
          { day: 12, dayName: "Fri", type: "Live Clip", platform: "TikTok / IG", content: "LIVE PERFORMANCE CLIP — Even a small show, raw energy from a live set is priceless. Crowd reactions = social proof that converts followers.", tags: "A" },
          { day: 12, dayName: "Fri", type: "Music Snippet", platform: "All Platforms", content: "SONG #2 SNIPPET — Tease a second track. 'This one hits different.' Build curiosity around the depth of your catalog.", tags: "B" },
          { day: 13, dayName: "Sat", type: "Fan Content", platform: "IG / TikTok", content: "FAN APPRECIATION — If fans have tagged you, repost it. If not yet: 'Tag us in your photos — we'll be watching.' Sets the expectation.", tags: "D" },
          { day: 14, dayName: "Sun", type: "Acoustic/Candid", platform: "IG / TikTok", content: "SUNDAY STRIPPED — Acoustic version of one of your songs, or a quiet candid shot of the band. Humanizes you beyond the performance.", tags: "C" },
        ]
      },
      {
        week: 3, focus: "Go Deeper",
        posts: [
          { day: 15, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "SONG BREAKDOWN: 'What [Song Title] Is Really About' — Members each speak to the meaning. Raw talking heads + music underneath.", tags: "A" },
          { day: 15, dayName: "Mon", type: "BTS Clip", platform: "TikTok / IG", content: "STUDIO SESSIONS BTS — Recording booth, headphones on, takes being laid down. Show the craft. Even a home studio works perfectly.", tags: "B" },
          { day: 16, dayName: "Tue", type: "Throwback", platform: "IG / FB", content: "ORIGIN STORY — Earliest band photo or first rehearsal memory. 'This is where it all started.' Shows growth. Authenticity wins every time.", tags: "C" },
          { day: 16, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Which song should we play at our next show?' — List 2-3 options. Fans feel ownership when they get to vote on the setlist.", tags: "D" },
          { day: 17, dayName: "Wed", type: "Gear Post", platform: "TikTok / IG", content: "INSTRUMENT SHOWCASE — Drum kit breakdown or guitar tone demo. 'Here's how we get THAT sound.' Music nerds absolutely love this content.", tags: "A" },
          { day: 17, dayName: "Wed", type: "Static", platform: "IG / FB", content: "ROCK QUOTE GRAPHIC — Powerful quote from a rock icon that aligns with your vibe. Consistent visual style builds brand recognition over time.", tags: "B" },
          { day: 18, dayName: "Thu", type: "Reel", platform: "TikTok / IG", content: "DAY IN THE LIFE — 60-second mini doc of a band rehearsal day. Morning arrival → soundcheck → riffs → laughs → late night pack-up.", tags: "C" },
          { day: 18, dayName: "Thu", type: "Story/Poll", platform: "IG Stories", content: "AUDIENCE RESEARCH POLL: 'What content do you want more of?' Options: BTS / Live clips / Song stories / Covers. This guides Month 2.", tags: "D" },
          { day: 19, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG", content: "NEW MUSIC TEASER — Even 10 seconds of unreleased music builds massive hype. 'Something's coming…' Drop it with zero context. Mystery works.", tags: "A" },
          { day: 19, dayName: "Fri", type: "Static", platform: "IG / FB", content: "MERCH MOOD BOARD — Show your aesthetic even if merch isn't live yet. 'What would you want on a Last Living Souls tee?' Builds pre-launch demand.", tags: "B" },
          { day: 20, dayName: "Sat", type: "Q&A", platform: "TikTok / IG", content: "Q&A RESPONSE REEL — Answer the top 3 fan questions from Day 11's Q&A box. Closes the loop, builds genuine community trust.", tags: "D" },
          { day: 21, dayName: "Sun", type: "Candid", platform: "IG / TikTok", content: "BAND CANDID — Funny or genuine backstage/hangout moment. Something that shows real personalities. People follow people, not just bands.", tags: "C" },
        ]
      },
      {
        week: 4, focus: "Push & Recap",
        posts: [
          { day: 22, dayName: "Mon", type: "Cover", platform: "TikTok / IG", content: "COVER SONG #2 — Try a song from a different era or genre (Zeppelin, Soundgarden, even a pop song done rock-style). Surprise = shares.", tags: "A" },
          { day: 22, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Things Only Rock Fans Understand' — Relatable, meme-adjacent, highly shareable. People forward this to friends who 'get it.'", tags: "B" },
          { day: 23, dayName: "Tue", type: "Announcement", platform: "All Platforms", content: "SHOW ANNOUNCEMENT — Upcoming gig or event post. Location, date, ticket link. Start the countdown. Even a small local show counts here.", tags: "C" },
          { day: 23, dayName: "Tue", type: "Countdown", platform: "IG Stories", content: "COUNTDOWN STICKER — Add a countdown to your show or release in Stories. Fans can subscribe to get notified. Passive engagement tool.", tags: "D" },
          { day: 24, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG", content: "BTS RECORDING — Mic placement, headphones on, the producer conversation in the booth. 'This is what making a song actually sounds like.'", tags: "A" },
          { day: 24, dayName: "Wed", type: "Engagement", platform: "IG Stories", content: "LOCATION POLL: 'What city should we play next?' — Make fans feel like they're booking your tour. Always drives massive engagement.", tags: "B" },
          { day: 25, dayName: "Thu", type: "Reel", platform: "TikTok / IG", content: "THEN vs NOW — Band's earliest days vs now. Split screen or side-by-side. 'We've been grinding.' Authenticity + growth story in one post.", tags: "C" },
          { day: 25, dayName: "Thu", type: "Challenge", platform: "TikTok", content: "TRENDING CHALLENGE — Jump on a current TikTok music or audio trend. Participation in trends = massive discovery potential this week.", tags: "D" },
          { day: 26, dayName: "Fri", type: "Highlight Reel", platform: "TikTok / IG", content: "MONTH 1 RECAP — Best clips from the past 30 days compiled into one Reel. 'This was just month one.' Builds serious anticipation for Month 2.", tags: "A" },
          { day: 26, dayName: "Fri", type: "Stream Push", platform: "IG / FB / TikTok", content: "STREAM PUSH — Direct, clean post: 'Our music is live everywhere. Stream [Song Title] now. Link in bio.' Don't be shy about the ask.", tags: "B" },
          { day: 27, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG", content: "COMMENT REPLY VIDEO — Pick a fan comment and film a video reply. 'This comment from @user made us feel things.' Pure loyalty builder.", tags: "D" },
          { day: 28, dayName: "Sun", type: "Gratitude", platform: "IG / FB", content: "GRATITUDE POST — Authentic thank you to everyone who followed and engaged in month one. No fluff. Real talk from the band.", tags: "C" },
          { day: 29, dayName: "Mon", type: "Teaser", platform: "TikTok / IG", content: "WHAT'S COMING IN MONTH 2 — Cryptic teaser. 30 seconds of footage with text overlays hinting at what's next. Creates genuine suspense.", tags: "A" },
          { day: 29, dayName: "Mon", type: "Music Snippet", platform: "All Platforms", content: "ANOTHER SONG SNIPPET — Different track, different energy. Show range. 'We contain multitudes.' Give fans a new side to discover.", tags: "B" },
          { day: 30, dayName: "Tue", type: "Milestone", platform: "IG / TikTok", content: "MONTH 1 MILESTONE — Celebrate follower count, streams, or engagement. Real numbers build credibility. Share what you earned.", tags: "C" },
          { day: 30, dayName: "Tue", type: "Engagement", platform: "IG Stories", content: "OPEN Q&A: 'We're 30 days in. Ask us ANYTHING.' Opens a new chapter of engagement heading into Month 2. Close every loop you open.", tags: "D" },
        ]
      }
    ]
  },
  {
    month: 2,
    theme: "CONNECTION",
    tagline: "Build Community — Go Deeper, Go Personal, Build a Tribe",
    weeks: [
      {
        week: 5, focus: "The Sound & Story",
        posts: [
          { day: 31, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "SONGWRITING PROCESS — How does a Last Living Souls song get made? Riff → words → studio → done. Mini documentary style. Very watchable.", tags: "A" },
          { day: 31, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "LYRIC DEEP DIVE — Pick a lyric and write a paragraph about its true meaning in the caption. Fans become emotionally connected to songs.", tags: "B" },
          { day: 32, dayName: "Tue", type: "Cover", platform: "TikTok / IG", content: "COVER #3 — Fan-requested cover from Month 1 polls. Fulfilling requests shows you listen. That act alone builds deep loyalty.", tags: "C" },
          { day: 32, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "VIBE POLL: 'Which side of us do you prefer? Raw & heavy vs Melodic & emotional.' Audience research packaged as engagement.", tags: "D" },
          { day: 33, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG", content: "VOCAL WARMUP BTS — Singer warming up, raw and casual. 'Before every session, this is the ritual.' Intimate. Real. Fans feel privileged to see it.", tags: "A" },
          { day: 33, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'The Story Behind [Song Title]' — Each slide is one chapter of the song's origin. Storytelling format drives saves and shares.", tags: "B" },
          { day: 34, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG", content: "GUITAR TONE DEMO — 'Here's exactly how we dial in our guitar sound.' Tone communities are massive. Tagging brands gets free reach.", tags: "C" },
          { day: 34, dayName: "Thu", type: "Engagement", platform: "IG / TikTok", content: "FAN CHALLENGE: 'Drop your best air guitar in the comments' or 'Recreate our hand sign.' Makes fans create content for you organically.", tags: "D" },
          { day: 35, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG", content: "PRE-RELEASE TEASE — If working on new music, drop 15 seconds with text: 'Not ready yet. But soon.' Builds anticipation you can cash in later.", tags: "A" },
          { day: 35, dayName: "Fri", type: "Static", platform: "IG / FB", content: "PLAYLIST DROP — Share your 'songs that inspired [Album/EP]' Spotify playlist. Builds cultural connection and extends time fans spend with you.", tags: "B" },
          { day: 36, dayName: "Sat", type: "Live Clip", platform: "TikTok / IG", content: "LIVE ENERGY CLIP — If you played a show, drop the wildest moment. Crowd reactions, the pit, the emotion. Pure energy = pure shares.", tags: "D" },
          { day: 37, dayName: "Sun", type: "Candid", platform: "IG / TikTok", content: "RECOVERY SUNDAY — Post-show or post-session real talk. Band sprawled out, exhausted but happy. 'Worth it every time.' Deeply relatable.", tags: "C" },
        ]
      },
      {
        week: 6, focus: "Community & Collaboration",
        posts: [
          { day: 38, dayName: "Mon", type: "Collab Tease", platform: "TikTok / IG", content: "COLLAB TEASER — Tag another local/indie band you're doing a show with. Cross-promotion is the most powerful organic growth tool available.", tags: "A" },
          { day: 38, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Our Top 5 Live Must-Haves' — Setlist card, signature pre-show ritual, gear essentials. Humanizes the live show experience.", tags: "B" },
          { day: 39, dayName: "Tue", type: "Spotlight", platform: "TikTok / IG", content: "CREATIVE PROCESS SPOTLIGHT — One member walks through how they personally contribute to writing. Intimate, behind-the-curtain content.", tags: "C" },
          { day: 39, dayName: "Tue", type: "Engagement", platform: "IG / TikTok", content: "BRAND POLL: 'Describe Last Living Souls in 3 words' — Fills your comments and gives you real brand language straight from your fans.", tags: "D" },
          { day: 40, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER #4 — Go unexpected. A well-known song from a non-rock artist done in your style. Surprise = virality potential. Don't play it safe.", tags: "A" },
          { day: 40, dayName: "Wed", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC #2 — New song, new powerful line. Keep the visual style consistent so fans instantly recognize it as Last Living Souls content.", tags: "B" },
          { day: 41, dayName: "Thu", type: "BTS Clip", platform: "TikTok / IG", content: "PRODUCTION BTS — How the band records drums. Microphone placement, the before and after sound. Technically fascinating for music fans.", tags: "C" },
          { day: 41, dayName: "Thu", type: "Story/Poll", platform: "IG Stories", content: "DREAM POLL: 'If Last Living Souls played a festival, which stage? Main Stage vs Underground Stage.' Dream-building creates deep engagement.", tags: "D" },
          { day: 42, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "MUSIC PUSH #2 — Full post dedicated to streaming. Release art, link in bio. 'If you haven't heard us yet, today is the day.' Direct.", tags: "A" },
          { day: 42, dayName: "Fri", type: "Reel", platform: "TikTok / IG", content: "WHY WE PLAY ROCK — Members each give a 5-second answer to this question, edited together. Passion translates on camera every single time.", tags: "B" },
          { day: 43, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG", content: "FAN COVER REPOST — If a fan covered your song, REPOST IT. Nothing creates loyalty like being seen and celebrated by the band you love.", tags: "D" },
          { day: 44, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "EDITORIAL SHOOT — A proper styled photo session. Dark, dramatic, intentional. Your aesthetic grid matters for brand identity and discovery.", tags: "C" },
        ]
      },
      {
        week: 7, focus: "Merch & Milestones",
        posts: [
          { day: 45, dayName: "Mon", type: "Merch Drop", platform: "All Platforms", content: "MERCH LAUNCH or TEASE — If ready, LAUNCH IT. If not, do a concept reveal: 'Coming soon — what color should we do?' Creates demand.", tags: "A" },
          { day: 45, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'How Last Living Souls Writes a Riff' — Step-by-step visual guide. Educational + entertaining = saves + shares consistently.", tags: "B" },
          { day: 46, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG", content: "MIDNIGHT SESSIONS — Late-night band hangout or practice. 'It's 1am and we're still going.' Dedication content is magnetic. Fans respect the grind.", tags: "C" },
          { day: 46, dayName: "Tue", type: "Engagement", platform: "IG / TikTok", content: "MUSIC CHALLENGE: 'Comment a song and we'll tell you if it influenced us.' Drives MASSIVE comment threads. Keeps the post alive for days.", tags: "D" },
          { day: 47, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER #5 — High-energy crowd favorite. Check what's trending on TikTok audio that week and adapt it rock-style. Timing matters.", tags: "A" },
          { day: 47, dayName: "Wed", type: "Static", platform: "IG / FB", content: "STREAM MILESTONE — Celebrate any streaming milestone honestly. 1K, 5K, 10K streams — share it. Fans want to celebrate alongside you.", tags: "B" },
          { day: 48, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG", content: "ALL-MEMBER ROUNDTABLE — All members answer: 'What song do you wish you wrote?' Fast cuts, genuine energy. Personality-forward content.", tags: "C" },
          { day: 48, dayName: "Thu", type: "Announcement", platform: "All Platforms", content: "SHOW / EVENT ANNOUNCEMENT — Another upcoming gig or even a livestream. Consistent event presence signals you're a working band.", tags: "D" },
          { day: 49, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG", content: "SNIPPET: B-SIDE or DEMO — Give fans something they can't get anywhere else. Raw demo footage = massive appreciation. Exclusive feels rare.", tags: "A" },
          { day: 49, dayName: "Fri", type: "Fan Q&A", platform: "TikTok / IG", content: "Q&A VIDEO — Film answers to fan questions. Raw, unscripted. Show personality above everything else. People follow people they like.", tags: "B" },
          { day: 50, dayName: "Sat", type: "Collab Post", platform: "All Platforms", content: "COLLAB POST — Joint post with another indie/rock band. Cross-tag each other. Shared audiences. This is organic growth in its purest form.", tags: "D" },
          { day: 51, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "PERSONAL REFLECTION — One member writes from the heart about why music matters. Long caption. Fans who stop to read it become lifers.", tags: "C" },
        ]
      },
      {
        week: 8, focus: "Build Hype for Month 3",
        posts: [
          { day: 52, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "MONTH 3 TEASER — 'Something big is happening in 30 days. Stay close.' No details. Pure suspense. Comments will flood with theories.", tags: "A" },
          { day: 52, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC #3 — Different track, same unmistakable visual style. Your lyric graphics should be instantly recognizable at a glance.", tags: "B" },
          { day: 53, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG", content: "STUDIO DAY VLOG — Real studio day if possible. Arrive, set up, record, hear playback, pack up. 90 seconds of pure authenticity.", tags: "C" },
          { day: 53, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Should we drop a music video?' — Fans vote yes and you've got demand to show. Votes for details and you learn their preference.", tags: "D" },
          { day: 54, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER #6 — By now you have an audience. Do this one bigger. Better quality, full performance energy. Make it something they'll share.", tags: "A" },
          { day: 54, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: '60 Days as Last Living Souls — What We've Learned' — Behind-the-scenes honesty about the grind. Fans love this meta content.", tags: "B" },
          { day: 55, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG", content: "BASS TONE DEMO — The bass player's turn. 'Here's how the low end holds everything together.' Feature what gets overlooked. Bass fans are devoted.", tags: "C" },
          { day: 55, dayName: "Thu", type: "Engagement", platform: "IG / TikTok", content: "GROWTH POST: 'Tag someone who needs to hear Last Living Souls today' — Turns your existing fans into your marketing team. Powerful.", tags: "D" },
          { day: 56, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "END OF MONTH MUSIC PUSH — Feature ALL available music. Streaming links, every platform. 'Catch up before Month 3.' Creates urgency.", tags: "A" },
          { day: 56, dayName: "Fri", type: "Reel", platform: "TikTok / IG", content: "HYPE REEL — Best live/performance clips montage from the last 60 days. Energetic music underneath. This is your highlight film so far.", tags: "B" },
          { day: 57, dayName: "Sat", type: "Fan Spotlight", platform: "IG / TikTok", content: "FAN SPOTLIGHT — Feature a fan who's been consistently engaging. Comment on their posts, DM them, make them feel part of the band.", tags: "D" },
          { day: 58, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "GRID AESTHETIC CHECK — A styled post that ties your visual identity together. Color palette, composition, identity. The grid is your cover.", tags: "C" },
          { day: 59, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "CRYPTIC TEASER #2 — A blurry photo, a sound clip, a single word. Let fans theorize in the comments. Engagement through mystery always wins.", tags: "A" },
          { day: 60, dayName: "Tue", type: "Milestone", platform: "All Platforms", content: "60-DAY MILESTONE — Follower count, stream count, show recap. Celebrate the numbers and thank the people behind them. Momentum post.", tags: "B" },
        ]
      }
    ]
  },
  {
    month: 3,
    theme: "MOMENTUM",
    tagline: "Drive Growth & Cement Identity — Launch Hard, Grow Fast",
    weeks: [
      {
        week: 9, focus: "Major Announcement Week",
        posts: [
          { day: 61, dayName: "Mon", type: "Announcement", platform: "All Platforms", content: "BIG ANNOUNCEMENT — Tour, EP, music video, or major collab reveal. Whatever your biggest news is, DROP IT now. This is your peak reach week.", tags: "A" },
          { day: 61, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "ANNOUNCEMENT REACTION — Members react in real-time to dropping the big news. 'We've been waiting to say this…' Authentic excitement converts.", tags: "B" },
          { day: 62, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG", content: "EP/ALBUM MAKING BTS — If new music is coming, show the making-of. Listeners who hear the story listen more deeply. Give them the behind.", tags: "C" },
          { day: 62, dayName: "Tue", type: "Countdown", platform: "IG Stories", content: "COUNTDOWN TO RELEASE — Set the official countdown sticker. Link to pre-save or pre-order if available. Get fans locked in and notified.", tags: "D" },
          { day: 63, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "STRATEGIC COVER — Cover a song from an artist your target audience loves. Pure discovery bait this week when reach matters most.", tags: "A" },
          { day: 63, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'What to Expect from Last Living Souls' — A road map of what's ahead. Show fans where you're going. Vision creates followers.", tags: "B" },
          { day: 64, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG", content: "TOUR/SHOW PREVIEW — Cities, venues, who's opening. If not touring yet: 'What city should we hit first?' Fan participation = organic reach.", tags: "C" },
          { day: 64, dayName: "Thu", type: "Stream Push", platform: "IG Stories", content: "PRE-SAVE PUSH — Drive pre-saves/pre-follows on Spotify. 'Help us chart on day one. Pre-save now.' A direct action ask from the band.", tags: "D" },
          { day: 65, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "SINGLE / EP LAUNCH DAY — Full launch post. Release art, streaming links, direct caption: 'It's here. Go listen.' All hands on deck. Go big.", tags: "A" },
          { day: 65, dayName: "Fri", type: "Reel", platform: "TikTok / IG", content: "RELEASE DAY REEL — Behind the scenes of launch day. Band checking streams together, reading first comments, celebrating. Real-time joy.", tags: "B" },
          { day: 66, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG", content: "FIRST REACTIONS — Share and respond to the first fan reactions to the new release. Screenshot the best comments. Make fans feel famous.", tags: "D" },
          { day: 67, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "'WE MADE THIS FOR YOU' — Heartfelt post about the journey of creating the new music. Emotional connection at this stage cements loyalty forever.", tags: "C" },
        ]
      },
      {
        week: 10, focus: "Sustain the Momentum",
        posts: [
          { day: 68, dayName: "Mon", type: "Music Video", platform: "All Platforms", content: "MUSIC VIDEO LAUNCH — If you have a music video, drop it now. Post the trailer/teaser first, then the full link in Stories and bio.", tags: "A" },
          { day: 68, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "NEW SONG LYRIC — Drop a standout lyric from the new release. Give it its own moment. Let it breathe as standalone content, no distraction.", tags: "B" },
          { day: 69, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG", content: "MUSIC VIDEO BTS — Behind the scenes of the shoot. Makeup, setups, bloopers. Even DIY videos have great BTS potential. Show the chaos.", tags: "C" },
          { day: 69, dayName: "Tue", type: "Engagement", platform: "IG / TikTok", content: "LYRIC POLL: 'What's your favorite line from [New Song]?' — Drives comments AND confirms which lyrics resonate most for future content.", tags: "D" },
          { day: 70, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER THAT FITS NEW ERA — Do a cover that sonically aligns with your new release. Help new fans understand your sound through familiar songs.", tags: "A" },
          { day: 70, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'The Making of [New Song/EP]' — Chapter by chapter: Inspiration → writing → recording → mix → release. Full creative story.", tags: "B" },
          { day: 71, dayName: "Thu", type: "Reel", platform: "TikTok / IG", content: "STREAM MILESTONE REACTION — React to the first streaming numbers together. Real, unscripted. Whatever the number, celebrate it out loud.", tags: "C" },
          { day: 71, dayName: "Thu", type: "Announcement", platform: "All Platforms", content: "SHOW ANNOUNCEMENT #2 — Announce the next show tied to the release. Momentum builds momentum. Don't let the energy cool off this week.", tags: "D" },
          { day: 72, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG", content: "DEEP CUT SNIPPET — Tease a track that isn't the lead single. 'People are sleeping on THIS one.' Drive full listen-throughs of the project.", tags: "A" },
          { day: 72, dayName: "Fri", type: "Static", platform: "IG / FB", content: "PLAYLIST FEATURE PUSH — 'Add us to your playlist and tag us.' UGC + streaming push combined in one organic call to action.", tags: "B" },
          { day: 73, dayName: "Sat", type: "Fan Content", platform: "TikTok / IG", content: "FAN CONTENT REPOST — Fans are posting about your new music now. Find the best one and repost it with a genuine, personal comment.", tags: "D" },
          { day: 74, dayName: "Sun", type: "Acoustic", platform: "TikTok / IG", content: "ACOUSTIC VERSION — Stripped back version of the new single, just guitar and voice. Showcases songwriting craft beyond the production value.", tags: "C" },
        ]
      },
      {
        week: 11, focus: "Deepen the Bond",
        posts: [
          { day: 75, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "THE BAND STORY — Full documentary-style Reel from day one to now. This is the content that gets shared most. Make it your best work.", tags: "A" },
          { day: 75, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Our Top 5 Most Played Songs in the Studio' — Personal list with a line about each. Humanizes your influences and taste.", tags: "B" },
          { day: 76, dayName: "Tue", type: "Challenge", platform: "TikTok", content: "CREATE YOUR OWN CHALLENGE — A Last Living Souls branded audio challenge. Use the new single and invite fans to duet, stitch, or recreate.", tags: "C" },
          { day: 76, dayName: "Tue", type: "Engagement", platform: "IG / TikTok", content: "CONFIDENCE POST: 'Be honest: what score do you give [New Song] out of 10?' Comment engagement. Shows confidence in your own music.", tags: "D" },
          { day: 77, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "COVER REQUEST FULFILLED — Cover the song most fans requested across the 90 days. Close the loop. Shows you listen and that you deliver.", tags: "A" },
          { day: 77, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG", content: "LIVE SHOW PREP — Night-before content: band meal, gear check, vocal warmup, game face on. The ritual before going to war on stage.", tags: "B" },
          { day: 78, dayName: "Thu", type: "Live Clip", platform: "TikTok / IG", content: "LIVE PERFORMANCE OF NEW SONG — First live clip of the new release. If you've played it live, this is the most important clip of Month 3.", tags: "C" },
          { day: 78, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG", content: "OUR LIVE SETUP — Walk-through of the full stage setup before a show. Gear nerds will love this. Very shareable in guitar/drum communities.", tags: "D" },
          { day: 79, dayName: "Fri", type: "Music Push", platform: "All Platforms", content: "GRATITUDE STREAM PUSH — 'Still streaming [New Song]? It means everything.' Low pressure, high gratitude. Gentle reminder that converts.", tags: "A" },
          { day: 79, dayName: "Fri", type: "Static", platform: "IG / FB", content: "GROWTH MILESTONE — Share a real number: followers, streams, show attendance. Momentum is visible. Show it with honesty and humility.", tags: "B" },
          { day: 80, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG", content: "FAN Q&A VIDEO PART 2 — Answer the deepest fan questions. Go personal. What do you fear? What keeps you going? Vulnerability wins.", tags: "D" },
          { day: 81, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "'WHY THIS MATTERS' — Personal essay-style caption from the vocalist. Why does making music matter right now? Go deep. No filter.", tags: "C" },
        ]
      },
      {
        week: 12, focus: "90-Day Grand Finale",
        posts: [
          { day: 82, dayName: "Mon", type: "Reel", platform: "TikTok / IG", content: "'90 DAYS AGO WE STARTED THIS…' — Nostalgic Reel comparing Day 1 to Day 82. The transformation story. Most emotional content you'll make.", tags: "A" },
          { day: 82, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Top 5 Moments from Our First 90 Days' — Best shows, streams, fan moments. Shareable, saveable, sentimental. High saves = algorithm.", tags: "B" },
          { day: 83, dayName: "Tue", type: "Fan Appreciation", platform: "All Platforms", content: "MEGA FAN APPRECIATION — Go above and beyond. Name fans in the caption. Repost their content. Make this a real moment of community.", tags: "C" },
          { day: 83, dayName: "Tue", type: "Announcement", platform: "All Platforms", content: "WHAT'S NEXT — Announce your next chapter. New music? Bigger tour? Merch drop? Give fans a reason to stay before this era ends.", tags: "D" },
          { day: 84, dayName: "Wed", type: "Cover", platform: "TikTok / IG", content: "FINAL COVER — Make it your best one ever. Everything you've learned about performing on camera goes into this one. Leave it all on the field.", tags: "A" },
          { day: 84, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG", content: "'90 DAYS OF BTS' — Compile your most genuine behind-the-scenes moments from the full 90-day run. A tribute to the grind and the hustle.", tags: "B" },
          { day: 85, dayName: "Thu", type: "Music Snippet", platform: "TikTok / IG", content: "NEXT MUSIC TEASER — A hint at what's coming next. Even 5 seconds. Keep the pipeline moving always. Never let momentum die completely.", tags: "C" },
          { day: 85, dayName: "Thu", type: "Engagement", platform: "IG / TikTok", content: "'HOW DID YOU FIND US?' — Ask fans to share how they discovered Last Living Souls. The answers are your best marketing insight for Day 91+.", tags: "D" },
          { day: 86, dayName: "Fri", type: "Stream Push", platform: "All Platforms", content: "ULTIMATE CATALOG PUSH — 'All our music is live. If you've been sleeping on us, today's the moment.' Full catalog, all links, one post.", tags: "A" },
          { day: 86, dayName: "Fri", type: "Reel", platform: "TikTok / IG", content: "LIVE HIGHLIGHT REEL — Your best live performance moments from all 90 days. This is your calling card for booking agents and festivals.", tags: "B" },
          { day: 87, dayName: "Sat", type: "Community", platform: "IG / TikTok", content: "'WE'RE BUILDING SOMETHING. YOU'RE PART OF IT.' — Simple. Sincere. Underpromised and overdelivered. The most powerful post is often the quietest.", tags: "D" },
          { day: 88, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "90-DAY GRID FINALE — A final photo that ties the visual aesthetic of the last 90 days together. Your best image. Make the grid proud.", tags: "C" },
          { day: 89, dayName: "Mon", type: "Milestone", platform: "All Platforms", content: "90-DAY MILESTONE POST — Real numbers: followers gained, streams, shows played, posts made. Celebrate every metric. You earned every single one.", tags: "A" },
          { day: 89, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "DAY 91 TEASER — '90 days was just the warm-up. See you on the other side.' Build the next chapter before this one is even finished.", tags: "B" },
          { day: 90, dayName: "Tue", type: "Grand Finale", platform: "All Platforms", content: "DAY 90 FINALE — Full statement post. What you set out to do, what happened, what's next. This is your manifesto. Make it count forever.", tags: "C" },
          { day: 90, dayName: "Tue", type: "Q&A Live", platform: "IG / TikTok Live", content: "LIVE Q&A SESSION — Go LIVE on Day 90. Answer every question. Thank every viewer by name. 90 days of trust earns you this moment.", tags: "D" },
        ]
      }
    ]
  }
];

export default function LastLivingSoulsCalendar() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeWeek, setActiveWeek] = useState(null);
  const [showHashtags, setShowHashtags] = useState(false);

  const month = calendarData[activeMonth];

  const totalPosts = month.weeks.reduce((sum, w) => sum + w.posts.length, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#e0e0e0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a0000 0%, #0a0a0a 100%)",
        borderBottom: "2px solid #ff3333",
        padding: "32px 24px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #1a0000 39px, #1a0000 40px)",
          opacity: 0.3,
        }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, background: "#ff3333",
              boxShadow: "0 0 12px #ff3333", borderRadius: "50%",
              animation: "pulse 2s infinite"
            }} />
            <span style={{ color: "#ff3333", fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>Content Strategy</span>
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            margin: "0 0 4px",
            color: "#ffffff",
            lineHeight: 1,
          }}>LAST LIVING SOULS</h1>
          <p style={{ color: "#ff3333", fontSize: 13, letterSpacing: 6, margin: "0 0 16px", textTransform: "uppercase" }}>
            90-Day Organic Growth Content Calendar
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 12, color: "#888" }}>
              <span style={{ color: "#ff3333", fontWeight: 700 }}>144+</span> TOTAL POSTS
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              <span style={{ color: "#ff3333", fontWeight: 700 }}>48+</span> POSTS / MONTH
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              <span style={{ color: "#ff3333", fontWeight: 700 }}>4</span> HASHTAG SETS
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              <span style={{ color: "#ff3333", fontWeight: 700 }}>IG · TikTok · FB · YT Shorts</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>

        {/* Hashtag Reference Toggle */}
        <div style={{ padding: "16px 0 0" }}>
          <button
            onClick={() => setShowHashtags(!showHashtags)}
            style={{
              background: showHashtags ? "#1a0000" : "transparent",
              border: "1px solid #ff3333",
              color: "#ff3333",
              padding: "8px 20px",
              cursor: "pointer",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {showHashtags ? "▲ HIDE" : "▼ SHOW"} HASHTAG STRATEGY
          </button>

          {showHashtags && (
            <div style={{
              background: "#111",
              border: "1px solid #222",
              borderTop: "2px solid #ff3333",
              padding: "20px",
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}>
              <div style={{ gridColumn: "1 / -1", marginBottom: 4 }}>
                <p style={{ color: "#888", fontSize: 11, margin: "0 0 12px", lineHeight: 1.6 }}>
                  Rotate between sets to avoid being flagged as spam. Use <strong style={{ color: "#fff" }}>3-5 tags in caption</strong>, the rest in the first comment posted within 60 seconds of publishing. Mix high-volume (Set A) with mid-tier (Set B) and niche (Set C) for maximum reach. Use Set D specifically for TikTok and Reels discovery pushes.
                </p>
              </div>
              {Object.entries(hashtagSets).map(([key, set]) => (
                <div key={key} style={{
                  border: `1px solid ${set.color}22`,
                  borderLeft: `3px solid ${set.color}`,
                  padding: "12px 16px",
                  background: "#0d0d0d",
                }}>
                  <div style={{ color: set.color, fontSize: 10, letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                    {set.label}
                  </div>
                  <div style={{ color: "#aaa", fontSize: 11, lineHeight: 1.8 }}>
                    {set.tags}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Month Tabs */}
        <div style={{ display: "flex", gap: 2, padding: "20px 0 0", borderBottom: "1px solid #222" }}>
          {calendarData.map((m, i) => (
            <button
              key={i}
              onClick={() => { setActiveMonth(i); setActiveWeek(null); }}
              style={{
                background: activeMonth === i ? "#ff3333" : "transparent",
                border: activeMonth === i ? "1px solid #ff3333" : "1px solid #333",
                color: activeMonth === i ? "#fff" : "#666",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
                fontWeight: activeMonth === i ? 700 : 400,
                transition: "all 0.15s",
              }}
            >
              Month {m.month}: {m.theme}
            </button>
          ))}
        </div>

        {/* Month Header */}
        <div style={{ padding: "20px 0 16px", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, color: "#fff", letterSpacing: 2 }}>
                MONTH {month.month}: <span style={{ color: "#ff3333" }}>{month.theme}</span>
              </h2>
              <p style={{ margin: "4px 0 0", color: "#666", fontSize: 12 }}>{month.tagline}</p>
            </div>
            <div style={{
              background: "#111",
              border: "1px solid #333",
              padding: "8px 16px",
              fontSize: 12,
            }}>
              <span style={{ color: "#ff3333", fontWeight: 700, fontSize: 20 }}>{totalPosts}</span>
              <span style={{ color: "#666", marginLeft: 6 }}>posts this month</span>
            </div>
          </div>
        </div>

        {/* Content Calendar */}
        <div style={{ paddingBottom: 48 }}>
          {month.weeks.map((week, wi) => {
            const isOpen = activeWeek === wi || activeWeek === null;
            const weekPostCount = week.posts.length;
            const uniqueDays = [...new Set(week.posts.map(p => p.day))].length;

            return (
              <div key={wi} style={{ borderBottom: "1px solid #1a1a1a" }}>
                {/* Week Header */}
                <button
                  onClick={() => setActiveWeek(activeWeek === wi ? null : wi)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#fff",
                    fontFamily: "'Courier New', monospace",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      background: isOpen ? "#ff3333" : "#1a1a1a",
                      color: isOpen ? "#fff" : "#666",
                      width: 32, height: 32,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, flexShrink: 0,
                      transition: "all 0.15s",
                    }}>W{week.week}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
                        WEEK {week.week} — {week.focus.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                        Days {week.posts[0].day}–{week.posts[week.posts.length-1].day} · {uniqueDays} days · {weekPostCount} posts
                      </div>
                    </div>
                  </div>
                  <span style={{ color: "#444", fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
                </button>

                {/* Posts */}
                {isOpen && (
                  <div style={{ paddingBottom: 16 }}>
                    {/* Group posts by day */}
                    {(() => {
                      const days = {};
                      week.posts.forEach(p => {
                        if (!days[p.day]) days[p.day] = [];
                        days[p.day].push(p);
                      });
                      return Object.entries(days).map(([day, posts]) => (
                        <div key={day} style={{ display: "flex", gap: 0, marginBottom: 8 }}>
                          {/* Day Label */}
                          <div style={{
                            width: 64,
                            flexShrink: 0,
                            padding: "8px 0",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingTop: 12,
                          }}>
                            <div style={{
                              color: "#ff3333",
                              fontSize: 18,
                              fontWeight: 900,
                              lineHeight: 1,
                            }}>
                              {String(day).padStart(2, "0")}
                            </div>
                            <div style={{ color: "#444", fontSize: 10, marginTop: 2 }}>
                              {posts[0].dayName.toUpperCase()}
                            </div>
                          </div>

                          {/* Posts for this day */}
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                            {posts.map((post, pi) => {
                              const typeColor = typeColors[post.type] || "#666";
                              const tagSet = hashtagSets[post.tags];
                              return (
                                <div key={pi} style={{
                                  background: "#111",
                                  border: "1px solid #1e1e1e",
                                  borderLeft: `3px solid ${typeColor}`,
                                  padding: "10px 14px",
                                  display: "flex",
                                  gap: 12,
                                  alignItems: "flex-start",
                                  flexWrap: "wrap",
                                }}>
                                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, minWidth: 120 }}>
                                    <span style={{
                                      background: `${typeColor}22`,
                                      color: typeColor,
                                      fontSize: 9,
                                      fontWeight: 700,
                                      letterSpacing: 1.5,
                                      padding: "3px 8px",
                                      textTransform: "uppercase",
                                      display: "inline-block",
                                      whiteSpace: "nowrap",
                                    }}>
                                      {post.type}
                                    </span>
                                    <span style={{ color: "#555", fontSize: 10 }}>{post.platform}</span>
                                  </div>
                                  <div style={{ flex: 1, minWidth: 200 }}>
                                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "#ccc" }}>
                                      {post.content}
                                    </p>
                                  </div>
                                  <div style={{ flexShrink: 0 }}>
                                    <span style={{
                                      background: `${tagSet.color}15`,
                                      color: tagSet.color,
                                      border: `1px solid ${tagSet.color}40`,
                                      fontSize: 9,
                                      padding: "3px 8px",
                                      letterSpacing: 1,
                                      whiteSpace: "nowrap",
                                    }}>
                                      SET {post.tags}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Legend */}
        <div style={{
          borderTop: "2px solid #1a1a1a",
          padding: "24px 0 40px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ width: "100%", color: "#444", fontSize: 10, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>
            Content Type Legend
          </div>
          {Object.entries(typeColors).slice(0, 12).map(([type, color]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, background: color, flexShrink: 0 }} />
              <span style={{ color: "#555", fontSize: 10 }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
