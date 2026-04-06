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

const typeHashtags = {
  "Reel": "#reels #reelsviral #musicreels #bandreels #rockreels #igreels #viralreels #shortsvideo",
  "Static": "#bandphoto #rockphoto #bandphotography #musicphotography #bandshot #photooftheday",
  "BTS Clip": "#behindthescenes #bts #rehearsal #studiolife #bandpractice #musicmaking #theprocess",
  "Cover": "#coversong #rockcover #coverversion #musiccover #bandscover #covervideo #rockcovers",
  "Music Snippet": "#newmusic #newsong #musicpreview #snippet #comingsoon #unreleased #firstlisten",
  "Lyric Post": "#lyrics #songlyrics #lyricsoftheday #rocklyrics #songwriting #wordsmatter #lyricalart",
  "Spotlight": "#meettheband #bandmember #musician #musicianlife #bandlife #spotlight #memberfeature",
  "Carousel": "#carousel #swipeleft #musicfacts #musiccarousel #bandstory #slideseries",
  "Engagement": "#musiccommunity #rockfam #musicfans #engagewithus #commentbelow #letsconnect",
  "Story/Poll": "#musicpoll #vote #haveyoursay #pickone #youchoose #storytime",
  "Gear Post": "#musicgear #gearnerds #geartalk #guitartone #pedalboard #drumgear #keysgear #studiorack",
  "Live Clip": "#livemusic #liveconcert #liveperformance #liveshow #concertvibes #onstage #liverock",
  "Fan Content": "#fanappreciation #fanlove #supportlocal #musicfamily #repost #fansrock",
  "Acoustic": "#acoustic #stripped #unplugged #acousticversion #rawmusic #acousticsession",
  "Candid": "#bandcandid #reallife #behindthemusic #offstage #realmoments #nofilter #bandmoments",
  "Throwback": "#throwback #tbt #origins #bandhistory #whereitstarted #dayoneband",
  "Aesthetic": "#bandaesthetic #moody #darkvibes #musicphotography #visualidentity #bandvisuals",
  "Q&A": "#qanda #askusanything #faq #musicqa #bandqa #questionsanswered",
  "Announcement": "#announcement #bigannouncement #musicnews #breakingnews #exciting #staytuned",
  "Countdown": "#countdown #comingsoon #staytuned #getready #hype #almosttime",
  "Milestone": "#milestone #achievement #grateful #musicgoals #growth #thankyou",
  "Stream Push": "#streamnow #spotify #applemusic #linkinbio #streamingmusic #listenhere #outnow",
  "Teaser": "#teaser #comingsoon #sneakpeek #whatsnext #staytuned #beprepared",
  "Merch Drop": "#bandmerch #merch #merchdrop #rockmerch #reptheband #bandtee #newmerch",
  "Challenge": "#challenge #musicchallenge #tiktokchallenge #viralchallenge #joinin #tryit",
  "Highlight Reel": "#highlights #bestof #montage #bandlife #topmoments #recap",
  "Fan Interaction": "#fanlove #fanreply #community #musicfamily #yourock #werelistening",
  "Collab Tease": "#collab #collaboration #indiecollab #joiningforces #crosspromo #staytuned",
  "Collab Post": "#collab #collaboration #indiecommunity #supportindiemusic #together",
  "Reflection": "#reflection #musicjourney #fromtheheart #realmusic #deepthoughts #whyweplay",
  "Gratitude": "#grateful #thankful #appreciation #musiccommunity #blessed #thanksforfollowing",
  "Fan Appreciation": "#fanappreciation #fanlove #thankyou #musicfamily #bestfans #youmatter",
  "Music Release": "#outnow #newrelease #musicrelease #newmusicalert #justdropped #listentoday",
  "Music Video": "#musicvideo #newmusicvideo #officialvideo #watchnow #videodrop #premiere",
  "Music Push": "#streamnow #supportindie #linkinbio #listenhere #addtoyourplaylist",
  "Fan Spotlight": "#fanspotlight #communityspotlight #fanoftheweek #fanlove #youmatter",
  "Q&A Live": "#golive #liveqa #livesession #askusanything #livewithus #askmeanything",
  "Community": "#musiccommunity #bandcommunity #tribe #wearefamily #together #community",
  "Grand Finale": "#grandfinale #90days #themission #nextchapter #endofanera #onward",
  "Fan Q&A": "#fanqa #yourquestions #askus #musicqa #weanswer #questionsanswered",
  "Acoustic/Candid": "#acoustic #candid #stripped #rawmusic #unplugged #realmoments",
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
          { day: 1, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "BAND INTRO REEL — Fast-cut clips of each member, energy-packed, ends with band logo.", tags: "A", caption: "We didn't come here to fit in. We came here to be heard.\n\nWe are Last Living Souls — [CITY]-born, stage-raised, and just getting started.\n\nThis is just the beginning. Stay close.\n\n🔗 Link in bio for all music." },
          { day: 1, dayName: "Mon", type: "Static", platform: "IG / FB", content: "Official band photo drop — Origin story in caption. Where you're from, what drives you, and what the band name means to you.", tags: "B", caption: "Four people. One mission. No backup plan.\n\n[LEAD NAME] — vocals & guitar\n[PIANIST NAME] — keys\n[BASSIST NAME] — bass\n[DRUMMER NAME] — drums\n\nWe are Last Living Souls. Born in [CITY], built in basements and late-night sessions. The name? It's a reminder — we might be the last ones doing this for the right reasons.\n\nNew music streaming now. Link in bio." },
          { day: 2, dayName: "Tue", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "MEMBER SPOTLIGHT: Lead — 'Meet [LEAD NAME]' — 15-sec shred clip with overlay text. The voice and the six-string. Raw and loud.", tags: "C", caption: "Meet [LEAD NAME] — the voice and the six-string behind Last Living Souls.\n\n[1-2 SENTENCES ABOUT THEIR JOURNEY/WHAT DRIVES THEM]\n\nThis is just one piece of the puzzle. More introductions coming this week.\n\n#MeetTheBand #LastLivingSouls" },
          { day: 2, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Classic Rock vs Modern Rock — which hits harder?' First touch engagement, boosts your account in the algorithm immediately.", tags: "D", caption: "Classic Rock vs Modern Rock — which hits harder? 👇\n\nVote and let's settle this once and for all." },
          { day: 3, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "BTS REHEARSAL — Raw, uncut, no filter. Show the grind. Authenticity is your biggest weapon.", tags: "A", caption: "Nobody sees this part.\n\n11pm. Cold room. Loud amps. This is where Last Living Souls actually happens — not on stage, not in the studio. Right here.\n\nThe grind doesn't have a filter.\n\n🔗 Music streaming everywhere — link in bio." },
          { day: 3, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: '5 Bands That Shaped Our Sound' — One band per slide, one line about their influence. Makes fans feel seen and builds credibility.", tags: "B", caption: "These 5 bands changed everything for us. Swipe to see who shaped the sound of Last Living Souls 👉\n\nSlide 1: [BAND 1] — [ONE LINE ABOUT INFLUENCE]\nSlide 2: [BAND 2] — [ONE LINE ABOUT INFLUENCE]\nSlide 3: [BAND 3] — [ONE LINE ABOUT INFLUENCE]\nSlide 4: [BAND 4] — [ONE LINE ABOUT INFLUENCE]\nSlide 5: [BAND 5] — [ONE LINE ABOUT INFLUENCE]\n\nWho would you add to this list? Drop it below 👇" },
          { day: 4, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "MEMBER SPOTLIGHT: Drummer — Drum cam clip from rehearsal. Overlay: 'The heartbeat of Last Living Souls.' Drum content performs extremely well.", tags: "C", caption: "Meet [DRUMMER NAME] — the heartbeat of Last Living Souls.\n\n[1-2 SENTENCES ABOUT THEIR STORY/STYLE]\n\nEvery song starts and ends with this right here. 🥁\n\n#MeetTheBand #LastLivingSouls" },
          { day: 4, dayName: "Thu", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC — Pull the most powerful line from your best song. Bold font, dark moody background. Let the words do the work.", tags: "D", caption: "\"[YOUR MOST POWERFUL LYRIC LINE HERE]\"\n\n— from '[SONG TITLE]'\n\nStreaming everywhere. Link in bio." },
          { day: 5, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "SONG SNIPPET — 20-30 sec of your hardest-hitting track. Hook in the first 3 seconds. End with 'Stream now — link in bio.'", tags: "A", caption: "This is what Last Living Souls sounds like. No warning.\n\n'[SONG TITLE]' is streaming now on all platforms.\n\n🔗 Link in bio. Turn it up." },
          { day: 5, dayName: "Fri", type: "Static", platform: "IG / FB", content: "NEW MUSIC FRIDAY — Announce or highlight your available track. Release art, streaming platform logos, one strong call to action.", tags: "B", caption: "It's New Music Friday and we belong in your rotation.\n\n'[SONG TITLE]' — out now on Spotify, Apple Music, and everywhere you stream.\n\nHit the link in bio. Let us know what you think 👇" },
          { day: 6, dayName: "Sat", type: "Engagement", platform: "TikTok / IG / YT Shorts", content: "FAN QUESTION: 'What's the greatest rock band of all time? Drop it below 👇' — Comment volume drives algorithmic reach immediately.", tags: "D", caption: "Alright, let's settle this.\n\nWhat's the greatest rock band of ALL TIME? Drop your pick below 👇\n\nWrong answers will be respected but judged. 😤🎸" },
          { day: 7, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "MOOD SHOT — Dark, cinematic band photo or individual aesthetic shot. Minimal caption or none. Let the image breathe. Pure vibe.", tags: "C", caption: "." },
        ]
      },
      {
        week: 2, focus: "Story & Identity",
        posts: [
          { day: 8, dayName: "Mon", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "MEMBER SPOTLIGHT: Pianist — Keys/synth clip. 'Meet [PIANIST NAME]' — The texture and atmosphere behind Last Living Souls. Keys content stands out in rock.", tags: "A", caption: "Meet [PIANIST NAME] — the keys, the atmosphere, the thing you feel before you hear it.\n\n[1-2 SENTENCES ABOUT THEIR STORY/STYLE]\n\nLast Living Souls wouldn't sound the same without this right here.\n\n#MeetTheBand #LastLivingSouls" },
          { day: 8, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "HOW WE GOT OUR NAME — Quick story Reel. Members each say one word that describes what the name means to them. Magnetic concept.", tags: "B", caption: "Everyone asks about the name.\n\nLast Living Souls — four words, four meanings.\n\n[LEAD NAME]: \"[WORD]\"\n[PIANIST NAME]: \"[WORD]\"\n[BASSIST NAME]: \"[WORD]\"\n[DRUMMER NAME]: \"[WORD]\"\n\nThat's all you need to know. For now." },
          { day: 9, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "LOADING GEAR — Clip of loading equipment into a van or carrying amps, keys, drums. The unglamorous hustle.", tags: "C", caption: "The part nobody puts on a highlight reel.\n\nLoading gear at [TIME]. Unloading at [TIME]. This is the real job.\n\nIf you're still here after seeing this, you're one of us.\n\n#BandLife #LastLivingSouls" },
          { day: 9, dayName: "Tue", type: "Gear Post", platform: "IG / FB", content: "GEAR SHOWCASE — Lead's pedalboard and amp setup. Tag the brands. Gear communities are massive and will share your content.", tags: "D", caption: "The board that makes the noise. 🎸\n\n[LEAD NAME]'s signal chain:\n→ [GUITAR MODEL]\n→ [PEDAL 1]\n→ [PEDAL 2]\n→ [PEDAL 3]\n→ [AMP MODEL]\n\nWhat would you add? What would you cut? Let us know 👇\n\n[TAG @BRAND1 @BRAND2 @BRAND3]" },
          { day: 10, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER SONG #1 — Do a rock classic (Foo Fighters, QOTSA, Soundgarden). Cover songs are discovery gold. Full band energy, full commitment.", tags: "A", caption: "We had to do this one.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST] — Last Living Souls style.\n\nFull band. One take. No safety net.\n\nWho should we cover next? Drop it 👇\n\n🔗 Our originals streaming everywhere — link in bio." },
          { day: 10, dayName: "Wed", type: "Lyric Post", platform: "IG / FB", content: "LYRIC BREAKDOWN — Post a lyric then explain what it really means in the caption. Fans love knowing the 'why' behind the words.", tags: "B", caption: "\"[LYRIC LINE]\"\n\nMost people hear this line and think [COMMON INTERPRETATION].\n\nBut it was actually written about [REAL MEANING/STORY BEHIND THE LYRIC].\n\nThat's the thing about music — it belongs to whoever needs it.\n\n'[SONG TITLE]' — streaming now. Link in bio." },
          { day: 11, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "MEMBER SPOTLIGHT: Bassist — Bassline-focused clip. 'You can't feel rock without this.' Feature what gets overlooked. Bass fans are loyal.", tags: "C", caption: "Meet [BASSIST NAME] — the low end that holds everything together.\n\n[1-2 SENTENCES ABOUT THEIR STORY/STYLE]\n\nYou don't always hear the bass. But you always feel it. 🎸\n\n#MeetTheBand #LastLivingSouls" },
          { day: 11, dayName: "Thu", type: "Engagement", platform: "IG Stories", content: "Q&A BOX OPEN: 'Ask us anything about the band' — Collect questions, answer them in video format later this week.", tags: "D", caption: "The box is open. 📦\n\nAsk Last Living Souls ANYTHING.\n\nBand stuff. Personal stuff. Gear stuff. Music stuff.\n\nBest questions get answered on video this week." },
          { day: 12, dayName: "Fri", type: "Live Clip", platform: "TikTok / IG / YT Shorts", content: "LIVE PERFORMANCE CLIP — Even a small show, raw energy from a live set is priceless. Crowd reactions = social proof that converts followers.", tags: "A", caption: "This is what it feels like in the room.\n\n[VENUE NAME], [CITY] — [DATE].\n\nNo backing tracks. No click. Just four people and a stage.\n\nNext show: [DATE/VENUE]. Be there.\n\n🔗 Link in bio." },
          { day: 12, dayName: "Fri", type: "Music Snippet", platform: "All Platforms", content: "SONG #2 SNIPPET — Tease a second track. Build curiosity around the depth of your catalog.", tags: "B", caption: "This one hits different.\n\n'[SONG TITLE]' — a completely different side of Last Living Souls.\n\nStreaming now on all platforms. Go find it.\n\n🔗 Link in bio." },
          { day: 13, dayName: "Sat", type: "Fan Content", platform: "IG / TikTok / YT Shorts", content: "FAN APPRECIATION — If fans have tagged you, repost it. If not yet: 'Tag us in your photos — we'll be watching.' Sets the expectation.", tags: "D", caption: "We see you. 👊\n\nTag @LastLivingSouls in your posts, your stories, your covers, your playlists — we're watching and we're reposting the best ones.\n\nThis isn't our page. It's ours. All of us." },
          { day: 14, dayName: "Sun", type: "Acoustic/Candid", platform: "IG / TikTok / YT Shorts", content: "SUNDAY STRIPPED — Acoustic version of one of your songs, or a quiet candid shot of the band. Humanizes you beyond the performance.", tags: "C", caption: "Stripped back. No amps. No production. Just the song.\n\n'[SONG TITLE]' — acoustic, the way it was written before we ever plugged in.\n\nSometimes the quiet version says more." },
        ]
      },
      {
        week: 3, focus: "Go Deeper",
        posts: [
          { day: 15, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "SONG BREAKDOWN: 'What [Song Title] Is Really About' — Members each speak to the meaning. Raw talking heads + music underneath.", tags: "A", caption: "You've heard '[SONG TITLE].' But do you know what it's really about?\n\n[LEAD NAME]: \"[SHORT QUOTE ABOUT MEANING]\"\n[PIANIST NAME]: \"[SHORT QUOTE]\"\n[BASSIST NAME]: \"[SHORT QUOTE]\"\n[DRUMMER NAME]: \"[SHORT QUOTE]\"\n\nFour people, four perspectives, one song.\n\nStreaming everywhere — link in bio." },
          { day: 15, dayName: "Mon", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "STUDIO SESSIONS BTS — Recording booth, headphones on, takes being laid down. Show the craft. Even a home studio works perfectly.", tags: "B", caption: "Take [NUMBER].\n\nThis is what making a song actually sounds like. The wrong notes, the restarts, the one take that changes everything.\n\n'[SONG TITLE]' was born right here.\n\n#StudioLife #LastLivingSouls" },
          { day: 16, dayName: "Tue", type: "Throwback", platform: "IG / FB", content: "ORIGIN STORY — Earliest band photo or first rehearsal memory. Shows growth. Authenticity wins every time.", tags: "C", caption: "This is where it all started. 📸\n\n[DESCRIBE THE PHOTO — first rehearsal, first show, first time all four were in the same room]\n\n[YEAR] → Now. Same people, same mission, different volume.\n\nIf you've been here since day one, you already know. If you're just finding us — welcome. You're right on time." },
          { day: 16, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Which song should we play at our next show?' — List 2-3 options. Fans feel ownership when they get to vote on the setlist.", tags: "D", caption: "You're building the setlist tonight. 🎤\n\nWhich one do we play?\n\nOption A: [SONG TITLE 1]\nOption B: [SONG TITLE 2]\nOption C: [SONG TITLE 3]\n\nMost votes wins. No arguments." },
          { day: 17, dayName: "Wed", type: "Gear Post", platform: "TikTok / IG / YT Shorts", content: "INSTRUMENT SHOWCASE: Keys — [PIANIST NAME]'s keyboard/synth rig breakdown. 'Here's how we get THAT atmosphere.' Keys in rock stands out.", tags: "A", caption: "The rig behind the atmosphere. 🎹\n\n[PIANIST NAME]'s setup:\n→ [KEYBOARD/SYNTH MODEL]\n→ [EFFECTS/PLUGINS]\n→ [AMP/DI SETUP]\n\nThis is how we get that sound you can't quite place but can't stop feeling.\n\nWhat keys/synth are you playing? Drop it 👇\n\n[TAG @BRAND1 @BRAND2]" },
          { day: 17, dayName: "Wed", type: "Static", platform: "IG / FB", content: "ROCK QUOTE GRAPHIC — Powerful quote from a rock icon that aligns with your vibe. Consistent visual style builds brand recognition over time.", tags: "B", caption: "\"[ROCK ICON QUOTE]\"\n— [ARTIST NAME]\n\nWords we live by. 🤘" },
          { day: 18, dayName: "Thu", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "DAY IN THE LIFE — 60-second mini doc of a band rehearsal day. Morning arrival → soundcheck → riffs → laughs → late night pack-up.", tags: "C", caption: "24 hours with Last Living Souls.\n\n[TIME] — Load in\n[TIME] — First riff\n[TIME] — Things get loud\n[TIME] — Pizza break\n[TIME] — Run the set\n[TIME] — Pack up in the dark\n\nThis is what we signed up for. Every single day.\n\n#BandLife #DayInTheLife" },
          { day: 18, dayName: "Thu", type: "Story/Poll", platform: "IG Stories", content: "AUDIENCE RESEARCH POLL: 'What content do you want more of?' Options: BTS / Live clips / Song stories / Covers. This guides Month 2.", tags: "D", caption: "Real talk — we make this content for YOU.\n\nWhat do you want to see more of?\n\n🎬 BTS / Rehearsal footage\n🎤 Live performance clips\n📖 Song stories & meanings\n🎸 Covers\n\nVote. We're listening." },
          { day: 19, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "NEW MUSIC TEASER — Even 10 seconds of unreleased music builds massive hype. Drop it with zero context. Mystery works.", tags: "A", caption: "Something's coming.\n\n🔇 → 🔊\n\nThat's all we're saying for now." },
          { day: 19, dayName: "Fri", type: "Static", platform: "IG / FB", content: "MERCH MOOD BOARD — Show your aesthetic even if merch isn't live yet. Builds pre-launch demand.", tags: "B", caption: "We've been working on something you can wear.\n\nWhat would you want on a Last Living Souls tee?\n\nA) Band logo, nothing else\nB) Tour-style dates graphic\nC) Lyric-based design\nD) Full artwork\n\nDrop your pick below 👇 This is going to happen." },
          { day: 20, dayName: "Sat", type: "Q&A", platform: "TikTok / IG / YT Shorts", content: "Q&A RESPONSE REEL — Answer the top 3 fan questions from Day 11's Q&A box. Closes the loop, builds genuine community trust.", tags: "D", caption: "You asked. We answered.\n\nTop 3 questions from last week's Q&A box:\n\n1. \"[QUESTION 1]\" — [SHORT ANSWER]\n2. \"[QUESTION 2]\" — [SHORT ANSWER]\n3. \"[QUESTION 3]\" — [SHORT ANSWER]\n\nKeep the questions coming. We're not going anywhere." },
          { day: 21, dayName: "Sun", type: "Candid", platform: "IG / TikTok / YT Shorts", content: "BAND CANDID — Funny or genuine backstage/hangout moment. Something that shows real personalities. People follow people, not just bands.", tags: "C", caption: "No amps. No agenda. Just us.\n\n[BRIEF CONTEXT — what's happening in the photo/video]\n\nThis is the part that doesn't make the setlist but makes the band.\n\n#OffStage #LastLivingSouls" },
        ]
      },
      {
        week: 4, focus: "Push & Recap",
        posts: [
          { day: 22, dayName: "Mon", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER SONG #2 — Try a song from a different era or genre (Zeppelin, Soundgarden, even a pop song done rock-style). Surprise = shares.", tags: "A", caption: "We took '[COVER SONG TITLE]' by [ORIGINAL ARTIST] and made it ours.\n\nFull band. Keys, bass, drums, guitar, vocals — the whole thing.\n\nSometimes you have to break a classic to prove you deserve to stand next to it.\n\nWho should we cover next? 👇\n\n🔗 Originals streaming — link in bio." },
          { day: 22, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Things Only Rock Fans Understand' — Relatable, meme-adjacent, highly shareable. People forward this to friends who 'get it.'", tags: "B", caption: "If you know, you know. 🤘\n\nSwipe through and tag someone who gets it 👉\n\n#RockFans #LastLivingSouls #IYKYK" },
          { day: 23, dayName: "Tue", type: "Announcement", platform: "All Platforms", content: "SHOW ANNOUNCEMENT — Upcoming gig or event post. Location, date, ticket link. Start the countdown. Even a small local show counts here.", tags: "C", caption: "📍 [VENUE NAME] — [CITY]\n📅 [DATE]\n🕐 Doors at [TIME]\n🎟️ [TICKET PRICE / FREE / LINK]\n\nLast Living Souls. Live. In person.\n\nBring everyone. Tell no one. Show up loud.\n\n🔗 Tickets / RSVP — link in bio." },
          { day: 23, dayName: "Tue", type: "Countdown", platform: "IG Stories", content: "COUNTDOWN STICKER — Add a countdown to your show or release in Stories. Fans can subscribe to get notified. Passive engagement tool.", tags: "D", caption: "[X] days until we play [VENUE NAME].\n\nTap the countdown to get reminded. Don't miss this one. 🔔" },
          { day: 24, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "BTS RECORDING — Mic placement, headphones on, [PIANIST NAME] laying down keys, the producer conversation. Show what making a song sounds like.", tags: "A", caption: "Session notes from last night:\n\n→ [PIANIST NAME] found the part at 2am\n→ [LEAD NAME] re-tracked vocals three times\n→ [BASSIST NAME] nailed it on the first take\n→ [DRUMMER NAME] broke a stick mid-take and kept going\n\nThis is what making a song actually sounds like.\n\n#StudioBTS #LastLivingSouls" },
          { day: 24, dayName: "Wed", type: "Engagement", platform: "IG Stories", content: "LOCATION POLL: 'What city should we play next?' — Make fans feel like they're booking your tour. Always drives massive engagement.", tags: "B", caption: "We're planning. You're deciding.\n\nWhat city should Last Living Souls play next?\n\n[CITY 1] vs [CITY 2] vs [CITY 3] vs [CITY 4]\n\nMost votes gets the show. 📍" },
          { day: 25, dayName: "Thu", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "THEN vs NOW — Band's earliest days vs now. Split screen or side-by-side. Authenticity + growth story in one post.", tags: "C", caption: "[YEAR] → [CURRENT YEAR].\n\nSame four people. Same hunger. Different volume.\n\nWe've been grinding since before anyone was watching. Now you're here. And we're just warming up.\n\n#ThenVsNow #LastLivingSouls" },
          { day: 25, dayName: "Thu", type: "Challenge", platform: "TikTok / YT Shorts", content: "TRENDING CHALLENGE — Jump on a current TikTok music or audio trend. Participation in trends = massive discovery potential this week.", tags: "D", caption: "Had to do it. 😤\n\n[DESCRIBE THE TREND] — Last Living Souls edition.\n\nDuet this. We dare you.\n\n#[TRENDING HASHTAG] #LastLivingSouls" },
          { day: 26, dayName: "Fri", type: "Highlight Reel", platform: "TikTok / IG / YT Shorts", content: "MONTH 1 RECAP — Best clips from the past 30 days compiled into one Reel. Builds serious anticipation for Month 2.", tags: "A", caption: "30 days. [X] posts. [X] new followers. [X] streams. 1 mission.\n\nThis was just month one.\n\nEverything you've seen so far? Consider it the warmup.\n\nMonth 2 starts now. Stay close.\n\n🔗 All music — link in bio." },
          { day: 26, dayName: "Fri", type: "Stream Push", platform: "IG / FB / TikTok / YT Shorts", content: "STREAM PUSH — Direct, clean post: 'Our music is live everywhere. Stream [Song Title] now. Link in bio.' Don't be shy about the ask.", tags: "B", caption: "No fluff. Just music.\n\n'[SONG TITLE]' — streaming now on:\n🟢 Spotify\n🍎 Apple Music\n🔴 YouTube Music\n📱 All platforms\n\nOne stream from you means everything to us. Hit the link in bio.\n\n#StreamNow #LastLivingSouls" },
          { day: 27, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG / YT Shorts", content: "COMMENT REPLY VIDEO — Pick a fan comment and film a video reply. Pure loyalty builder.", tags: "D", caption: "This comment from @[FAN USERNAME] stopped us mid-rehearsal.\n\n\"[FAN COMMENT]\"\n\nWe had to say something back. This is why we do this.\n\nKeep talking to us. We're listening. Always." },
          { day: 28, dayName: "Sun", type: "Gratitude", platform: "IG / FB", content: "GRATITUDE POST — Authentic thank you to everyone who followed and engaged in month one. No fluff. Real talk from the band.", tags: "C", caption: "30 days ago nobody knew who we were.\n\nToday [X] of you are here. And you're not just following — you're commenting, sharing, streaming, showing up.\n\nWe don't take that lightly. Every single one of you matters to this band.\n\nMonth 1 is done. We're just getting started.\n\nThank you. Genuinely.\n\n— Last Living Souls" },
          { day: 29, dayName: "Mon", type: "Teaser", platform: "TikTok / IG / YT Shorts", content: "WHAT'S COMING IN MONTH 2 — Cryptic teaser. 30 seconds of footage with text overlays hinting at what's next. Creates genuine suspense.", tags: "A", caption: "👁️\n\nMonth 2.\n\nNew music. New visuals. New everything.\n\nYou're not ready. But you will be.\n\nStay close. 🔇" },
          { day: 29, dayName: "Mon", type: "Music Snippet", platform: "All Platforms", content: "ANOTHER SONG SNIPPET — Different track, different energy. Show range. Give fans a new side to discover.", tags: "B", caption: "Different song. Different energy. Same band.\n\n'[SONG TITLE]' — this is the side of Last Living Souls you haven't heard yet.\n\nWe contain multitudes.\n\n🔗 Full track streaming — link in bio." },
          { day: 30, dayName: "Tue", type: "Milestone", platform: "IG / TikTok / YT Shorts", content: "MONTH 1 MILESTONE — Celebrate follower count, streams, or engagement. Real numbers build credibility. Share what you earned.", tags: "C", caption: "Month 1 by the numbers:\n\n📱 [X] followers\n🎧 [X] streams\n🎤 [X] shows played\n📝 [X] posts made\n💬 [X] comments from you\n\nEvery number is a person. Every person is proof this is working.\n\nMonth 2 starts now. Let's double everything. 🔥" },
          { day: 30, dayName: "Tue", type: "Engagement", platform: "IG Stories", content: "OPEN Q&A: 'We're 30 days in. Ask us ANYTHING.' Opens a new chapter of engagement heading into Month 2. Close every loop you open.", tags: "D", caption: "30 days in. The box is open again. 📦\n\nAsk Last Living Souls ANYTHING.\n\nNo limits. No filters. We'll answer the best ones on video this week.\n\nLet's go 👇" },
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
          { day: 31, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "SONGWRITING PROCESS — How does a Last Living Souls song get made? Riff → keys → words → studio → done. Mini documentary style.", tags: "A", caption: "How a Last Living Souls song gets made:\n\n1. [LEAD NAME] brings a riff\n2. [PIANIST NAME] finds the atmosphere\n3. [BASSIST NAME] locks in the groove\n4. [DRUMMER NAME] makes it hit\n5. Lyrics come last — always from real life\n\nEvery song has a story. This is how they start.\n\n🔗 Hear the finished versions — link in bio." },
          { day: 31, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "LYRIC DEEP DIVE — Pick a lyric and write a paragraph about its true meaning in the caption. Fans become emotionally connected to songs.", tags: "B", caption: "\"[LYRIC LINE]\"\n\nThis line was written at [TIME/PLACE] after [EMOTIONAL CONTEXT — what happened, what you were feeling].\n\nIt wasn't supposed to make the final cut. But when [LEAD NAME] sang it back in the studio, the whole room went quiet.\n\nSome things write themselves.\n\n'[SONG TITLE]' — streaming now. Link in bio." },
          { day: 32, dayName: "Tue", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER #3 — Fan-requested cover from Month 1 polls. Fulfilling requests shows you listen. That act alone builds deep loyalty.", tags: "C", caption: "You asked for it. We delivered.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST] — the Last Living Souls version.\n\nThis was the most-requested cover from our polls. When you speak, we listen.\n\nWhat's next? Drop your request below 👇" },
          { day: 32, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "VIBE POLL: 'Which side of us do you prefer? Raw & heavy vs Melodic & emotional.' Audience research packaged as engagement.", tags: "D", caption: "Be honest.\n\nWhich side of Last Living Souls do you prefer?\n\n🔥 Raw & Heavy\n💙 Melodic & Emotional\n\nNo wrong answer. We need to know." },
          { day: 33, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "VOCAL WARMUP BTS — [LEAD NAME] warming up vocals, raw and casual. 'Before every session, this is the ritual.' Intimate and real.", tags: "A", caption: "Before every session. Before every show. This is the ritual.\n\n[LEAD NAME] warming up — no mic, no reverb, no hiding.\n\nThe voice behind Last Living Souls, unfiltered.\n\n#VocalBTS #LastLivingSouls" },
          { day: 33, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'The Story Behind [Song Title]' — Each slide is one chapter of the song's origin. Storytelling format drives saves and shares.", tags: "B", caption: "The story behind '[SONG TITLE]' — told in [X] slides. 👉\n\nSlide 1: Where the idea came from\nSlide 2: The first demo (it was terrible)\nSlide 3: The breakthrough moment\nSlide 4: Recording day\nSlide 5: What it means to us now\n\nSave this. Share this. Every song has a story worth telling." },
          { day: 34, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG / YT Shorts", content: "GUITAR TONE DEMO — [LEAD NAME]'s guitar tone breakdown. 'Here's exactly how we dial in that sound.' Tone communities are massive.", tags: "C", caption: "The tone. 🎸\n\n[LEAD NAME]'s signal chain for '[SONG TITLE]':\n→ [GUITAR] into [PEDAL 1]\n→ [PEDAL 2] for the dirt\n→ [PEDAL 3] for the atmosphere\n→ Straight into [AMP]\n\nGain at [X]. Volume at [X]. No apologies.\n\nWhat's your go-to tone? 👇\n\n[TAG @BRAND1 @BRAND2]" },
          { day: 34, dayName: "Thu", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "FAN CHALLENGE: 'Drop your best air guitar in the comments' or 'Recreate our hand sign.' Makes fans create content for you organically.", tags: "D", caption: "We want to see it.\n\nDrop your best air guitar 🎸 or your loudest concert face 🤘 in the comments.\n\nBest ones get reposted to our story. No judgment. Full volume.\n\nGo. 👇" },
          { day: 35, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "PRE-RELEASE TEASE — If working on new music, drop 15 seconds. 'Not ready yet. But soon.' Builds anticipation.", tags: "A", caption: "Not ready yet.\n\nBut soon.\n\n🔇 → 🔊" },
          { day: 35, dayName: "Fri", type: "Static", platform: "IG / FB", content: "PLAYLIST DROP — Share your 'songs that inspired [Album/EP]' Spotify playlist. Builds cultural connection.", tags: "B", caption: "The playlist that made Last Living Souls.\n\nEvery song that influenced our sound, our lyrics, our energy — all in one place.\n\n🎧 'Songs That Built Last Living Souls' — link in bio.\n\nListen through and tell us which one you hear most in our music 👇" },
          { day: 36, dayName: "Sat", type: "Live Clip", platform: "TikTok / IG / YT Shorts", content: "LIVE ENERGY CLIP — Drop the wildest moment from a show. Crowd reactions, the energy, the emotion. Pure shares.", tags: "D", caption: "[VENUE NAME]. [CITY]. [DATE].\n\nThis is the moment the room stopped being a crowd and started being a community.\n\n[DESCRIBE THE MOMENT — crowd singing back, pit opening up, etc.]\n\nYou had to be there. But next time — you will be.\n\n🔗 Next show info — link in bio." },
          { day: 37, dayName: "Sun", type: "Candid", platform: "IG / TikTok / YT Shorts", content: "RECOVERY SUNDAY — Post-show or post-session real talk. Band sprawled out, exhausted but happy. Deeply relatable.", tags: "C", caption: "The morning after.\n\n[DESCRIBE THE SCENE — sprawled out, coffee, sore hands, ringing ears]\n\nWorth it. Every single time.\n\nSee you next week. 🤘\n\n#SundayRecovery #BandLife" },
        ]
      },
      {
        week: 6, focus: "Community & Collaboration",
        posts: [
          { day: 38, dayName: "Mon", type: "Collab Tease", platform: "TikTok / IG / YT Shorts", content: "COLLAB TEASER — Tag another local/indie band you're doing a show with. Cross-promotion is the most powerful organic growth tool.", tags: "A", caption: "Something's happening with @[COLLAB BAND NAME].\n\nTwo bands. One stage. [DATE].\n\nMore details dropping soon. For now — go follow them. Trust us on this one.\n\n🔗 Link in bio." },
          { day: 38, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Our Top 5 Live Must-Haves' — Setlist card, pre-show ritual, gear essentials. Humanizes the live show experience.", tags: "B", caption: "We don't go on stage without these. 👉\n\nSlide 1: [MUST-HAVE 1 — e.g., the setlist card]\nSlide 2: [MUST-HAVE 2 — e.g., pre-show warmup]\nSlide 3: [MUST-HAVE 3 — e.g., specific gear item]\nSlide 4: [MUST-HAVE 4 — e.g., lucky charm/ritual]\nSlide 5: [MUST-HAVE 5 — e.g., the right energy]\n\nWhat's your concert must-have? 👇" },
          { day: 39, dayName: "Tue", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "CREATIVE PROCESS SPOTLIGHT: [PIANIST NAME] — How they find the right keys/synth part for a song. Intimate, behind-the-curtain content.", tags: "C", caption: "How [PIANIST NAME] finds the right part.\n\n\"[QUOTE FROM PIANIST ABOUT THEIR PROCESS]\"\n\nEvery Last Living Souls song has a layer you feel before you hear it. This is where it comes from.\n\n#CreativeProcess #LastLivingSouls" },
          { day: 39, dayName: "Tue", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "BRAND POLL: 'Describe Last Living Souls in 3 words' — Fills your comments and gives you real brand language straight from your fans.", tags: "D", caption: "Describe Last Living Souls in exactly 3 words.\n\nNo more. No less. Drop them below 👇\n\nBest answer gets pinned." },
          { day: 40, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER #4 — Go unexpected. A well-known song from a non-rock artist done in your style. Surprise = virality potential.", tags: "A", caption: "Nobody asked for this. But everyone needed it.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST] — done the Last Living Souls way.\n\nKeys, bass, drums, guitar, vocals. The full treatment.\n\nBet you didn't see this one coming. 😤\n\n🔗 Our originals — link in bio." },
          { day: 40, dayName: "Wed", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC #2 — New song, new powerful line. Keep the visual style consistent for instant recognition.", tags: "B", caption: "\"[LYRIC LINE]\"\n\n— from '[SONG TITLE]'\n\nSome words don't need context. They just need volume.\n\n🔗 Stream it — link in bio." },
          { day: 41, dayName: "Thu", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "PRODUCTION BTS — How [DRUMMER NAME] records drums. Microphone placement, the before and after sound. Technically fascinating.", tags: "C", caption: "How we record [DRUMMER NAME]'s drums:\n\n🎙️ [X] mics on the kit\n🥁 [DESCRIBE MIC PLACEMENT]\n🎛️ Before vs after processing\n\nThe difference is night and day. Swipe for the raw vs mixed comparison.\n\n#DrumRecording #StudioBTS #LastLivingSouls" },
          { day: 41, dayName: "Thu", type: "Story/Poll", platform: "IG Stories", content: "DREAM POLL: 'If Last Living Souls played a festival, which stage? Main Stage vs Underground Stage.' Dream-building creates deep engagement.", tags: "D", caption: "Dream with us for a second.\n\nIf Last Living Souls played a festival — which stage?\n\n🏟️ Main Stage — maximum chaos\n🕳️ Underground Stage — intimate and raw\n\nVote honestly. We're manifesting this." },
          { day: 42, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "MUSIC PUSH #2 — Full post dedicated to streaming. Release art, link in bio. Direct and clean.", tags: "A", caption: "If you haven't heard us yet — today is the day.\n\nLast Living Souls. Streaming everywhere.\n\n🟢 Spotify\n🍎 Apple Music\n🔴 YouTube Music\n📱 All platforms\n\nOne listen. That's all we're asking.\n\n🔗 Link in bio." },
          { day: 42, dayName: "Fri", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "WHY WE PLAY ROCK — Members each give a 5-second answer. Passion translates on camera every single time.", tags: "B", caption: "Why do we play rock?\n\n[LEAD NAME]: \"[5-SECOND ANSWER]\"\n[PIANIST NAME]: \"[5-SECOND ANSWER]\"\n[BASSIST NAME]: \"[5-SECOND ANSWER]\"\n[DRUMMER NAME]: \"[5-SECOND ANSWER]\"\n\nFour answers. One truth.\n\n#WhyWePlay #LastLivingSouls" },
          { day: 43, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG / YT Shorts", content: "FAN COVER REPOST — If a fan covered your song, REPOST IT. Nothing creates loyalty like being seen and celebrated by the band.", tags: "D", caption: "We can't believe this.\n\n@[FAN USERNAME] covered '[SONG TITLE]' and absolutely destroyed it.\n\nThis is why we make music. This right here.\n\nKeep sending us your covers — we're watching everything. 🤘" },
          { day: 44, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "EDITORIAL SHOOT — A proper styled photo session. Dark, dramatic, intentional. Brand identity and discovery.", tags: "C", caption: "." },
        ]
      },
      {
        week: 7, focus: "Merch & Milestones",
        posts: [
          { day: 45, dayName: "Mon", type: "Merch Drop", platform: "All Platforms", content: "MERCH LAUNCH or TEASE — If ready, LAUNCH IT. If not, do a concept reveal with mockups. Creates demand.", tags: "A", caption: "It's here. 🖤\n\nLast Living Souls merch — [DESCRIBE ITEM: tee, hoodie, hat, etc.]\n\n[DESIGN DESCRIPTION — logo, artwork, lyric print, etc.]\n\nLimited run. When they're gone, they're gone.\n\n🔗 Shop now — link in bio.\n\n[OR IF TEASING: 'Coming soon. What color? Black or white? Vote below 👇']" },
          { day: 45, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'How Last Living Souls Writes a Riff' — Step-by-step visual guide. Educational + entertaining.", tags: "B", caption: "How a Last Living Souls riff gets made. 👉\n\nSlide 1: [LEAD NAME] brings the raw idea\nSlide 2: [PIANIST NAME] adds texture and atmosphere\nSlide 3: [BASSIST NAME] locks in the root\nSlide 4: [DRUMMER NAME] finds the groove\nSlide 5: We play it 100 times until it's undeniable\n\nSave this for your own writing sessions. 🎸" },
          { day: 46, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "MIDNIGHT SESSIONS — Late-night band hangout or practice. Dedication content is magnetic. Fans respect the grind.", tags: "C", caption: "1:47am. Still going.\n\n[DESCRIBE WHAT'S HAPPENING — running through a new part, [PIANIST NAME] found a chord change, [DRUMMER NAME] won't stop until the fill is perfect]\n\nNobody's making us do this. That's the whole point.\n\n#MidnightSessions #LastLivingSouls" },
          { day: 46, dayName: "Tue", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "MUSIC CHALLENGE: 'Comment a song and we'll tell you if it influenced us.' Drives MASSIVE comment threads.", tags: "D", caption: "Let's play a game.\n\nComment any song — literally any song — and we'll tell you if it influenced Last Living Souls. ✅ or ❌\n\nSome of these answers might surprise you.\n\nGo. 👇" },
          { day: 47, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER #5 — High-energy crowd favorite. Check what's trending on TikTok audio that week and adapt it rock-style.", tags: "A", caption: "This one had to happen.\n\n'[COVER SONG TITLE]' — [ORIGINAL ARTIST]. Full band, full energy, full commitment.\n\nShare this with someone who needs to hear it done right. 🎸\n\n🔗 Our originals — link in bio." },
          { day: 47, dayName: "Wed", type: "Static", platform: "IG / FB", content: "STREAM MILESTONE — Celebrate any streaming milestone honestly. Fans want to celebrate alongside you.", tags: "B", caption: "[X] streams. 🎧\n\nThat's [X] people who pressed play. [X] people who gave us a chance.\n\nWe don't take a single one for granted.\n\nIf you've streamed us even once — thank you. You're part of this.\n\n🔗 Keep it going — link in bio." },
          { day: 48, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "ALL-MEMBER ROUNDTABLE — All members answer: 'What song do you wish you wrote?' Fast cuts, genuine energy.", tags: "C", caption: "One question. Four answers.\n\n\"What song do you wish you wrote?\"\n\n[LEAD NAME]: '[SONG] by [ARTIST]'\n[PIANIST NAME]: '[SONG] by [ARTIST]'\n[BASSIST NAME]: '[SONG] by [ARTIST]'\n[DRUMMER NAME]: '[SONG] by [ARTIST]'\n\nNow you. What song do you wish YOU wrote? 👇" },
          { day: 48, dayName: "Thu", type: "Announcement", platform: "All Platforms", content: "SHOW / EVENT ANNOUNCEMENT — Another upcoming gig or livestream. Consistent event presence signals you're a working band.", tags: "D", caption: "We're playing again. 🎤\n\n📍 [VENUE NAME] — [CITY]\n📅 [DATE]\n🕐 Doors at [TIME]\n🎟️ [TICKET INFO]\n\nBring friends. Bring energy. Leave everything else at the door.\n\n🔗 Tickets — link in bio." },
          { day: 49, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "SNIPPET: B-SIDE or DEMO — Give fans something they can't get anywhere else. Raw demo footage. Exclusive feels rare.", tags: "A", caption: "You won't find this anywhere else.\n\nThis is the raw demo of '[SONG TITLE]' — recorded on [PHONE/VOICE MEMO/HOME SETUP] before it ever made it to the studio.\n\nThe finished version sounds nothing like this. But it started right here.\n\n🔗 Hear the final version — link in bio." },
          { day: 49, dayName: "Fri", type: "Fan Q&A", platform: "TikTok / IG / YT Shorts", content: "Q&A VIDEO — Film answers to fan questions. Raw, unscripted. Show personality above everything.", tags: "B", caption: "You asked. We answered. No script. No filter.\n\nQ: \"[QUESTION 1]\" — [MEMBER]: \"[ANSWER]\"\nQ: \"[QUESTION 2]\" — [MEMBER]: \"[ANSWER]\"\nQ: \"[QUESTION 3]\" — [MEMBER]: \"[ANSWER]\"\n\nKeep the questions coming. We'll keep answering.\n\n#FanQA #LastLivingSouls" },
          { day: 50, dayName: "Sat", type: "Collab Post", platform: "All Platforms", content: "COLLAB POST — Joint post with another indie/rock band. Cross-tag each other. Shared audiences. Organic growth.", tags: "D", caption: "Two bands. One post. No competition — just community.\n\nGo follow @[COLLAB BAND NAME]. If you like us, you'll love them.\n\nWe're all building something together. Support indie. Support rock. Support each other. 🤘\n\n[TAG @COLLAB BAND]" },
          { day: 51, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "PERSONAL REFLECTION — [BASSIST NAME] writes from the heart about why music matters. Long caption. Fans who read it become lifers.", tags: "C", caption: "From [BASSIST NAME]:\n\n\"[2-3 PARAGRAPHS FROM THE HEART — why they play, what music has saved them from, what Last Living Souls means to them personally]\n\nThis band is the only place where everything makes sense. And knowing you're listening makes it matter even more.\n\nThank you for being here.\"\n\n— [BASSIST NAME], Last Living Souls" },
        ]
      },
      {
        week: 8, focus: "Build Hype for Month 3",
        posts: [
          { day: 52, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "MONTH 3 TEASER — No details. Pure suspense. Comments will flood with theories.", tags: "A", caption: "Something big is happening in 30 days.\n\nStay close. 👁️\n\nThat's all we're saying." },
          { day: 52, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "LYRIC GRAPHIC #3 — Different track, same unmistakable visual style. Instantly recognizable.", tags: "B", caption: "\"[LYRIC LINE]\"\n\n— from '[SONG TITLE]'\n\nYou know the vibe by now. 🖤\n\n🔗 Stream it — link in bio." },
          { day: 53, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "STUDIO DAY VLOG — Arrive, set up, record, hear playback, pack up. 90 seconds of pure authenticity.", tags: "C", caption: "Studio day. No rehearsal. Just record.\n\n[TIME] — Walk in, coffee in hand\n[TIME] — [DRUMMER NAME] sets up the kit\n[TIME] — [PIANIST NAME] finds the part\n[TIME] — [LEAD NAME] tracks vocals\n[TIME] — [BASSIST NAME] locks it in on first take\n[TIME] — Playback. Silence. Then smiles.\n\nThis is how it's made.\n\n#StudioDay #LastLivingSouls" },
          { day: 53, dayName: "Tue", type: "Story/Poll", platform: "IG Stories", content: "POLL: 'Should we drop a music video?' — Fans vote yes and you've got demand to show.", tags: "D", caption: "Real question.\n\nShould Last Living Souls drop a music video?\n\n🎬 YES — full production\n📱 YES — but DIY/raw style\n🎵 No — just keep dropping music\n\nYour vote decides what happens next." },
          { day: 54, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER #6 — By now you have an audience. Do this one bigger. Better quality, full performance energy.", tags: "A", caption: "We've been building up to this one.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST] — our biggest cover yet.\n\nFull band. Full production. Full send.\n\nShare this with someone who needs to hear it. 🔥\n\n🔗 Our originals — link in bio." },
          { day: 54, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: '60 Days as Last Living Souls — What We've Learned' — Behind-the-scenes honesty. Fans love meta content.", tags: "B", caption: "60 days. Here's what we've learned. 👉\n\nSlide 1: Consistency beats perfection\nSlide 2: The comments matter more than the likes\nSlide 3: [PERSONAL LESSON FROM THE JOURNEY]\nSlide 4: [PERSONAL LESSON FROM THE JOURNEY]\nSlide 5: We're just getting started\n\nSave this if you're building something too. 🤘" },
          { day: 55, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG / YT Shorts", content: "BASS TONE DEMO — [BASSIST NAME]'s turn. 'Here's how the low end holds everything together.' Bass fans are devoted.", tags: "C", caption: "The low end. 🎸\n\n[BASSIST NAME]'s rig:\n→ [BASS MODEL]\n→ [PEDAL/DI SETUP]\n→ [AMP OR DIRECT]\n→ Strings: [STRING BRAND/GAUGE]\n\nThis is how the foundation gets built. Everything you feel in a Last Living Souls song starts here.\n\nBass players — what's your setup? 👇\n\n[TAG @BRAND1 @BRAND2]" },
          { day: 55, dayName: "Thu", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "GROWTH POST: 'Tag someone who needs to hear Last Living Souls today' — Turns fans into your marketing team.", tags: "D", caption: "You know someone who needs to hear this band.\n\nTag them below. Right now. 👇\n\nOne tag could change everything — for them and for us.\n\n#LastLivingSouls" },
          { day: 56, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "END OF MONTH MUSIC PUSH — Feature ALL available music. Every platform. 'Catch up before Month 3.' Creates urgency.", tags: "A", caption: "Month 3 is coming. Are you caught up?\n\nEverything Last Living Souls has released so far:\n\n🎵 '[SONG TITLE 1]'\n🎵 '[SONG TITLE 2]'\n🎵 '[SONG TITLE 3]'\n\nStreaming everywhere. Catch up now — because what's coming next changes everything.\n\n🔗 Link in bio." },
          { day: 56, dayName: "Fri", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "HYPE REEL — Best live/performance clips montage from the last 60 days. Energetic music underneath. Your highlight film.", tags: "B", caption: "60 days in 60 seconds.\n\nThe shows. The studio. The 2am sessions. The moments nobody else saw.\n\nThis is Last Living Souls. And we're just getting started.\n\n🔗 All music — link in bio." },
          { day: 57, dayName: "Sat", type: "Fan Spotlight", platform: "IG / TikTok / YT Shorts", content: "FAN SPOTLIGHT — Feature a fan who's been consistently engaging. Make them feel part of the band.", tags: "D", caption: "Shoutout to @[FAN USERNAME]. 🤘\n\n[DESCRIBE WHY — they've been commenting since day one, they shared our music with friends, they drove [X] miles to a show, etc.]\n\nThis community isn't just followers. It's family.\n\nWho else has been riding with us since the beginning? Tag yourself 👇" },
          { day: 58, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "GRID AESTHETIC CHECK — A styled post that ties your visual identity together. The grid is your cover.", tags: "C", caption: "." },
          { day: 59, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "CRYPTIC TEASER #2 — A blurry photo, a sound clip, a single word. Let fans theorize in the comments.", tags: "A", caption: "[ONE CRYPTIC WORD OR SHORT PHRASE].\n\n👁️\n\n[DATE]." },
          { day: 60, dayName: "Tue", type: "Milestone", platform: "All Platforms", content: "60-DAY MILESTONE — Follower count, stream count, show recap. Celebrate the numbers and thank the people behind them.", tags: "B", caption: "60 days of Last Living Souls. Here's what you built:\n\n📱 [X] followers\n🎧 [X] total streams\n🎤 [X] shows played\n📝 [X] posts made\n🌍 [X] cities reached\n\nEvery number is a person. Every person is proof.\n\nThank you. Genuinely. 30 more days. Let's make them count.\n\n#60Days #LastLivingSouls" },
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
          { day: 61, dayName: "Mon", type: "Announcement", platform: "All Platforms", content: "BIG ANNOUNCEMENT — Tour, EP, music video, or major collab reveal. Whatever your biggest news is, DROP IT now. Peak reach week.", tags: "A", caption: "We've been waiting to say this.\n\n[ANNOUNCE THE BIG NEWS — EP title, tour dates, music video, collab, etc.]\n\n[KEY DETAILS — dates, links, how to access]\n\nThis is what the last 60 days were building to.\n\nShare this. Tell everyone. It's happening.\n\n🔗 [PRE-SAVE / TICKETS / LINK] — link in bio." },
          { day: 61, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "ANNOUNCEMENT REACTION — Members react in real-time to dropping the big news. Authentic excitement converts.", tags: "B", caption: "The moment we dropped [THE ANNOUNCEMENT].\n\n[LEAD NAME]'s face says it all. [DRUMMER NAME] literally couldn't sit still.\n\nWe've been holding this in for [X] weeks. Now you know.\n\n🔗 Link in bio." },
          { day: 62, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "EP/ALBUM MAKING BTS — Show the making-of. [PIANIST NAME] laying down keys, [DRUMMER NAME] tracking. Give them the behind.", tags: "C", caption: "You're going to hear it soon. But first — watch how it was made.\n\n[DESCRIBE THE BTS MOMENT — tracking vocals, [PIANIST NAME] finding the perfect patch, [BASSIST NAME] and [DRUMMER NAME] locking in the groove]\n\nEvery second of this was worth it.\n\n#MakingOf #LastLivingSouls" },
          { day: 62, dayName: "Tue", type: "Countdown", platform: "IG Stories", content: "COUNTDOWN TO RELEASE — Set the official countdown sticker. Link to pre-save. Get fans locked in.", tags: "D", caption: "[X] days until '[RELEASE TITLE]' drops.\n\nTap the countdown. Set the reminder. Don't miss this. 🔔\n\n🔗 Pre-save now — link in bio." },
          { day: 63, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "STRATEGIC COVER — Cover a song from an artist your target audience loves. Pure discovery bait when reach matters most.", tags: "A", caption: "While you wait for [THE RELEASE] — here's '[COVER SONG TITLE]' by [ORIGINAL ARTIST].\n\nFull band. [LEAD NAME] on vocals and guitar, [PIANIST NAME] on keys, [BASSIST NAME] holding it down, [DRUMMER NAME] bringing the thunder.\n\nThe real thing drops [DATE]. But this should hold you over.\n\n🔗 Pre-save — link in bio." },
          { day: 63, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'What to Expect from Last Living Souls' — A road map of what's ahead. Vision creates followers.", tags: "B", caption: "Here's what's coming. 👉\n\nSlide 1: [NEW MUSIC — what and when]\nSlide 2: [SHOWS/TOUR — dates and cities]\nSlide 3: [CONTENT — what to expect on socials]\nSlide 4: [MERCH — what's dropping]\nSlide 5: [THE VISION — where this is all going]\n\nSave this. Bookmark this. We're delivering on every single one." },
          { day: 64, dayName: "Thu", type: "Spotlight", platform: "TikTok / IG / YT Shorts", content: "TOUR/SHOW PREVIEW — Cities, venues, who's opening. If not touring: 'What city should we hit first?' Fan participation.", tags: "C", caption: "The shows are booked. Here's where we'll be:\n\n📍 [DATE] — [VENUE], [CITY]\n📍 [DATE] — [VENUE], [CITY]\n📍 [DATE] — [VENUE], [CITY]\n\n[OR: 'What city should Last Living Souls hit first? Comment your city below 👇']\n\n🔗 Tickets — link in bio." },
          { day: 64, dayName: "Thu", type: "Stream Push", platform: "IG Stories", content: "PRE-SAVE PUSH — Drive pre-saves on Spotify. 'Help us chart on day one.' A direct action ask.", tags: "D", caption: "One favor.\n\nPre-save '[RELEASE TITLE]' right now. It takes 3 seconds and it helps us chart on day one.\n\nEvery pre-save matters. Yours matters.\n\n🔗 Pre-save link in bio." },
          { day: 65, dayName: "Fri", type: "Music Release", platform: "All Platforms", content: "SINGLE / EP LAUNCH DAY — Full launch post. Release art, streaming links. All hands on deck. Go big.", tags: "A", caption: "It's here. 🖤\n\n'[RELEASE TITLE]' — out now. Everywhere.\n\n🟢 Spotify\n🍎 Apple Music\n🔴 YouTube Music\n📱 All platforms\n\nThis is everything we've been working toward. Every late night, every take, every moment of doubt that turned into something real.\n\nGo listen. Tell us what you feel.\n\n🔗 Link in bio." },
          { day: 65, dayName: "Fri", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "RELEASE DAY REEL — Band checking streams together, reading first comments, celebrating. Real-time joy.", tags: "B", caption: "Release day.\n\n[DESCRIBE THE MOMENT — checking stream counts, reading first comments, the look on everyone's face]\n\nThis is what [X] months of work feels like in one moment.\n\nThank you for being here. Go stream it.\n\n🔗 Link in bio." },
          { day: 66, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG / YT Shorts", content: "FIRST REACTIONS — Share fan reactions to the new release. Screenshot the best comments. Make fans feel famous.", tags: "D", caption: "Your reactions to '[RELEASE TITLE]' are destroying us. 🥹\n\n@[FAN 1]: \"[THEIR COMMENT]\"\n@[FAN 2]: \"[THEIR COMMENT]\"\n@[FAN 3]: \"[THEIR COMMENT]\"\n\nWe read every single one. Keep them coming.\n\n🔗 Stream it — link in bio." },
          { day: 67, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "'WE MADE THIS FOR YOU' — Heartfelt post about the journey of creating the new music. Cements loyalty.", tags: "C", caption: "We made this for you.\n\n'[RELEASE TITLE]' started as [DESCRIBE THE ORIGIN — a riff at 3am, a lyric scribbled on a napkin, a feeling none of us could shake].\n\nIt became [X] songs. [X] studio sessions. [X] arguments about the mix. And one moment where all four of us looked at each other and knew — this is it.\n\nIf you've listened even once — thank you. You're the reason this exists.\n\n— Last Living Souls" },
        ]
      },
      {
        week: 10, focus: "Sustain the Momentum",
        posts: [
          { day: 68, dayName: "Mon", type: "Music Video", platform: "All Platforms", content: "MUSIC VIDEO LAUNCH — Post the trailer/teaser first, then full link in Stories and bio.", tags: "A", caption: "The visual is here. 🎬\n\n'[SONG TITLE]' — Official Music Video. Out now.\n\nDirected by [DIRECTOR / SELF-DIRECTED]\nShot at [LOCATION]\nFeaturing Last Living Souls doing what we do best.\n\nWatch it. Share it. Let us know your favorite frame.\n\n🔗 Full video — link in bio." },
          { day: 68, dayName: "Mon", type: "Lyric Post", platform: "IG / FB", content: "NEW SONG LYRIC — Drop a standout lyric from the new release. Give it its own moment. Let it breathe.", tags: "B", caption: "\"[STANDOUT LYRIC FROM NEW RELEASE]\"\n\n— '[SONG TITLE]'\n\nThis line wrote itself. And it still gives us chills.\n\n🔗 Stream it — link in bio." },
          { day: 69, dayName: "Tue", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "MUSIC VIDEO BTS — Behind the scenes of the shoot. Setups, bloopers, chaos. Show the real process.", tags: "C", caption: "What the music video actually looked like to make:\n\n[DESCRIBE THE CHAOS — early call time, [DRUMMER NAME] forgetting the choreography, [PIANIST NAME] laughing through a take, the one shot that took 15 attempts]\n\nThe final version is polished. This is the reality behind it.\n\n#MusicVideoBTS #LastLivingSouls" },
          { day: 69, dayName: "Tue", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "LYRIC POLL: 'What's your favorite line from [New Song]?' — Drives comments AND confirms which lyrics resonate.", tags: "D", caption: "Settle this for us.\n\nWhat's the best line from '[SONG TITLE]'?\n\nA) \"[LYRIC OPTION 1]\"\nB) \"[LYRIC OPTION 2]\"\nC) \"[LYRIC OPTION 3]\"\nD) Something else — drop it below 👇\n\nWe genuinely want to know." },
          { day: 70, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER THAT FITS NEW ERA — A cover that sonically aligns with the new release. Help new fans understand your sound.", tags: "A", caption: "If you liked '[NEW SONG TITLE]', you'll understand why we covered this.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST] — the song that lives in the same world as our new music.\n\n🔗 Our new release — link in bio." },
          { day: 70, dayName: "Wed", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'The Making of [New Song/EP]' — Inspiration → writing → recording → mix → release. Full creative story.", tags: "B", caption: "How '[RELEASE TITLE]' was made. The full story. 👉\n\nSlide 1: The inspiration — [WHAT SPARKED IT]\nSlide 2: Writing — [LEAD NAME] brought the bones, [PIANIST NAME] brought the soul\nSlide 3: Recording — [X] hours in the studio\nSlide 4: Mixing — the version you almost heard vs the final\nSlide 5: Release day — [DESCRIBE THE FEELING]\n\nSave this. This is the story behind the sound." },
          { day: 71, dayName: "Thu", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "STREAM MILESTONE REACTION — React to first streaming numbers together. Real, unscripted. Celebrate out loud.", tags: "C", caption: "[X] streams in [X] days.\n\nWe filmed the moment we saw the number. [DESCRIBE THE REACTION — [DRUMMER NAME] screaming, group hug, disbelief]\n\nEvery single stream is a person who chose to listen. That's not nothing. That's everything.\n\nThank you. Keep streaming. 🔗 Link in bio." },
          { day: 71, dayName: "Thu", type: "Announcement", platform: "All Platforms", content: "SHOW ANNOUNCEMENT #2 — Next show tied to the release. Don't let the energy cool off.", tags: "D", caption: "The music is out. Now come hear it live.\n\n📍 [VENUE NAME] — [CITY]\n📅 [DATE]\n🕐 Doors at [TIME]\n🎟️ [TICKET INFO]\n\nThis is the first time we play '[NEW SONG TITLE]' live. Be there for it.\n\n🔗 Tickets — link in bio." },
          { day: 72, dayName: "Fri", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "DEEP CUT SNIPPET — Tease a track that isn't the lead single. Drive full listen-throughs.", tags: "A", caption: "Everyone's talking about '[LEAD SINGLE TITLE].'\n\nBut people are sleeping on THIS one.\n\n'[DEEP CUT TITLE]' — track [X] on the [EP/ALBUM]. The one that hits different at 2am.\n\nGo find it. You'll thank us.\n\n🔗 Link in bio." },
          { day: 72, dayName: "Fri", type: "Static", platform: "IG / FB", content: "PLAYLIST FEATURE PUSH — 'Add us to your playlist and tag us.' UGC + streaming push in one.", tags: "B", caption: "Add Last Living Souls to your playlist. 📋\n\nAny playlist. Your workout playlist. Your drive playlist. Your 'I need to feel something' playlist.\n\nThen tag us @LastLivingSouls so we can see it.\n\nWe repost the best ones. 🤘\n\n🔗 All music — link in bio." },
          { day: 73, dayName: "Sat", type: "Fan Content", platform: "TikTok / IG / YT Shorts", content: "FAN CONTENT REPOST — Fans are posting about your new music. Find the best one and repost with a genuine comment.", tags: "D", caption: "This is why we do this. 🥹\n\n@[FAN USERNAME] [DESCRIBE WHAT THEY POSTED — reviewed our EP, used our song in their video, shared it with friends, etc.]\n\nWe see everything you post. Keep going. This community is real.\n\n#LastLivingSoulsFam" },
          { day: 74, dayName: "Sun", type: "Acoustic", platform: "TikTok / IG / YT Shorts", content: "ACOUSTIC VERSION — Stripped back version of the new single. Just [LEAD NAME] on guitar and vocals, [PIANIST NAME] on keys.", tags: "C", caption: "Before the amps. Before the production. Before the studio.\n\n'[SONG TITLE]' — acoustic. Just guitar, keys, and voice.\n\nThis is how it sounded the first time we played it. Some songs are better naked.\n\n🔗 Full version streaming — link in bio." },
        ]
      },
      {
        week: 11, focus: "Deepen the Bond",
        posts: [
          { day: 75, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "THE BAND STORY — Full documentary-style Reel from day one to now. The content that gets shared most. Make it your best work.", tags: "A", caption: "Day 1 we were four people with a name and a dream.\n\nDay 75 we're [DESCRIBE WHERE YOU ARE NOW — X followers, X streams, shows played, music released].\n\nThis is the story of Last Living Souls. From the first rehearsal to right now.\n\nShare this with someone who needs to see what building something real looks like.\n\n🔗 All music — link in bio." },
          { day: 75, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Our Top 5 Most Played Songs in the Studio' — Personal list with a line about each.", tags: "B", caption: "The 5 songs on repeat in our studio. 👉\n\n1. '[SONG]' by [ARTIST] — [LEAD NAME]'s pick\n2. '[SONG]' by [ARTIST] — [PIANIST NAME]'s pick\n3. '[SONG]' by [ARTIST] — [BASSIST NAME]'s pick\n4. '[SONG]' by [ARTIST] — [DRUMMER NAME]'s pick\n5. '[SONG]' by [ARTIST] — the one we ALL agree on\n\nWhat's on repeat in YOUR studio? 👇" },
          { day: 76, dayName: "Tue", type: "Challenge", platform: "TikTok / YT Shorts", content: "CREATE YOUR OWN CHALLENGE — A branded audio challenge using the new single. Invite fans to duet, stitch, or recreate.", tags: "C", caption: "The #[CHALLENGE NAME] challenge.\n\nUse our song '[SONG TITLE]' and show us your version — duet, stitch, lip sync, air band, full cover, whatever.\n\nBest entries get reposted. Let's see what you've got. 🎸\n\n#[CHALLENGE HASHTAG] #LastLivingSouls" },
          { day: 76, dayName: "Tue", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "CONFIDENCE POST: 'Be honest: what score do you give [New Song] out of 10?' Shows confidence in your music.", tags: "D", caption: "Be honest. No feelings spared.\n\n'[SONG TITLE]' — what score out of 10?\n\nDrop your number below 👇\n\nWe can take it. 😤" },
          { day: 77, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "COVER REQUEST FULFILLED — Cover the most-requested song from the last 90 days. Shows you listen and deliver.", tags: "A", caption: "The most-requested cover of the last 90 days.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST].\n\nYou asked for it [X] times. We finally did it. Full band. Full commitment.\n\nWhat's the next request? Drop it below — we're listening. Always.\n\n🔗 Our originals — link in bio." },
          { day: 77, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "LIVE SHOW PREP — Night-before: band meal, gear check, [LEAD NAME] warming up vocals, game face on.", tags: "B", caption: "T-minus 12 hours.\n\n🍕 Band meal at [RESTAURANT/LOCATION]\n🎸 [LEAD NAME] running through the setlist one more time\n🎹 [PIANIST NAME] checking patches\n🥁 [DRUMMER NAME] taping sticks\n🎸 [BASSIST NAME] restringing\n\nTomorrow we go to war. Tonight we prepare.\n\n#ShowDay #LastLivingSouls" },
          { day: 78, dayName: "Thu", type: "Live Clip", platform: "TikTok / IG / YT Shorts", content: "LIVE PERFORMANCE OF NEW SONG — First live clip of the new release. The most important clip of Month 3.", tags: "C", caption: "The first time '[NEW SONG TITLE]' was played live.\n\n[VENUE NAME]. [CITY]. [DATE].\n\nThe crowd [DESCRIBE THE REACTION — sang it back, went silent, lost their minds].\n\nThis is why we write music. For moments like this.\n\n🔗 Studio version — link in bio." },
          { day: 78, dayName: "Thu", type: "Gear Post", platform: "TikTok / IG / YT Shorts", content: "OUR LIVE SETUP — Full stage walkthrough. Guitar rig, bass rig, keys rig, drum kit. Shareable in gear communities.", tags: "D", caption: "The full Last Living Souls stage setup:\n\n🎸 [LEAD NAME]: [GUITAR] → [PEDALBOARD] → [AMP]\n🎹 [PIANIST NAME]: [KEYBOARD/SYNTH] → [EFFECTS] → [AMP/DI]\n🎸 [BASSIST NAME]: [BASS] → [PEDALS] → [AMP]\n🥁 [DRUMMER NAME]: [KIT DETAILS — shell sizes, cymbals, snare]\n\nThis is what makes the noise. Questions? 👇\n\n[TAG ALL GEAR BRANDS]" },
          { day: 79, dayName: "Fri", type: "Music Push", platform: "All Platforms", content: "GRATITUDE STREAM PUSH — Low pressure, high gratitude. Gentle reminder that converts.", tags: "A", caption: "Still streaming '[SONG TITLE]'?\n\nIt means everything. Genuinely.\n\nEvery stream tells the algorithm to show us to someone new. Every share puts us in a room we've never been in.\n\nIf you've been listening — thank you. If you haven't yet — today's the day.\n\n🔗 Link in bio." },
          { day: 79, dayName: "Fri", type: "Static", platform: "IG / FB", content: "GROWTH MILESTONE — Share real numbers. Followers, streams, show attendance. Honest and humble.", tags: "B", caption: "Real numbers. No inflation.\n\n📱 [X] followers (started at [X])\n🎧 [X] streams (started at 0)\n🎤 [X] shows played\n🌍 Listeners in [X] countries\n\nWe're not where we want to be yet. But we're proof that showing up every day works.\n\nThank you for growing with us." },
          { day: 80, dayName: "Sat", type: "Fan Interaction", platform: "TikTok / IG / YT Shorts", content: "FAN Q&A VIDEO PART 2 — Answer the deepest fan questions. Go personal. Vulnerability wins.", tags: "D", caption: "Part 2. The real questions.\n\nQ: \"What scares you about doing this?\"\n[MEMBER]: \"[HONEST ANSWER]\"\n\nQ: \"What keeps you going when it's hard?\"\n[MEMBER]: \"[HONEST ANSWER]\"\n\nQ: \"[DEEP QUESTION]\"\n[MEMBER]: \"[HONEST ANSWER]\"\n\nWe owe you honesty. Here it is." },
          { day: 81, dayName: "Sun", type: "Reflection", platform: "IG / FB", content: "'WHY THIS MATTERS' — Personal essay-style caption from [LEAD NAME]. Why does making music matter? Go deep.", tags: "C", caption: "From [LEAD NAME]:\n\n\"[2-3 PARAGRAPHS — raw, honest reflection on why music matters right now, what this band means, what the last 80+ days have taught them]\n\nLast Living Souls isn't a project. It's not a side hustle. It's the only thing that makes sense.\n\nThank you for letting us be loud in a world that keeps telling us to be quiet.\"\n\n— [LEAD NAME]" },
        ]
      },
      {
        week: 12, focus: "90-Day Grand Finale",
        posts: [
          { day: 82, dayName: "Mon", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "'90 DAYS AGO WE STARTED THIS…' — Nostalgic Reel comparing Day 1 to Day 82. The transformation story.", tags: "A", caption: "90 days ago we posted our first video.\n\n0 followers. 0 streams. 0 proof that anyone would care.\n\nToday: [X] followers. [X] streams. [X] shows. And a community we didn't know we needed.\n\nThis Reel is Day 1 vs Day 82. Same four people. Different everything else.\n\nThank you for believing before there was proof.\n\n🔗 All music — link in bio." },
          { day: 82, dayName: "Mon", type: "Carousel", platform: "IG / FB", content: "CAROUSEL: 'Top 5 Moments from Our First 90 Days' — Best shows, streams, fan moments. High saves = algorithm.", tags: "B", caption: "90 days. These are the moments we'll never forget. 👉\n\nSlide 1: [MOMENT 1 — first show, first fan comment, etc.]\nSlide 2: [MOMENT 2]\nSlide 3: [MOMENT 3]\nSlide 4: [MOMENT 4]\nSlide 5: [MOMENT 5]\n\nSave this. We're just getting started.\n\nWhat was YOUR favorite moment? 👇" },
          { day: 83, dayName: "Tue", type: "Fan Appreciation", platform: "All Platforms", content: "MEGA FAN APPRECIATION — Name fans in the caption. Repost their content. A real moment of community.", tags: "C", caption: "This post is for you. By name.\n\n@[FAN 1] — you were here from day one\n@[FAN 2] — your comments kept us going\n@[FAN 3] — you brought [X] friends to our show\n@[FAN 4] — you covered our song and made us cry\n@[FAN 5] — you shared every single post\n\n[ADD MORE NAMES]\n\nYou're not fans. You're family. And we don't say that lightly.\n\nThank you. Forever.\n\n— Last Living Souls" },
          { day: 83, dayName: "Tue", type: "Announcement", platform: "All Platforms", content: "WHAT'S NEXT — Announce your next chapter. New music? Bigger tour? Give fans a reason to stay.", tags: "D", caption: "Before this chapter ends — here's what's next.\n\n[ANNOUNCE WHAT'S COMING — new EP, bigger shows, tour, collab, music video, etc.]\n\nThe first 90 days were the foundation. Everything after this is the building.\n\nStay. It's about to get loud.\n\n🔗 Link in bio." },
          { day: 84, dayName: "Wed", type: "Cover", platform: "TikTok / IG / YT Shorts", content: "FINAL COVER — Make it your best ever. Everything you've learned about performing on camera. Leave it all on the field.", tags: "A", caption: "The final cover. The best one we've ever done.\n\n'[COVER SONG TITLE]' by [ORIGINAL ARTIST].\n\n[LEAD NAME] on vocals and guitar. [PIANIST NAME] on keys. [BASSIST NAME] on bass. [DRUMMER NAME] on drums. Everything we've learned in 90 days is in this performance.\n\nThis is Last Living Souls at full power.\n\n🔗 Our originals — link in bio." },
          { day: 84, dayName: "Wed", type: "BTS Clip", platform: "TikTok / IG / YT Shorts", content: "'90 DAYS OF BTS' — Compile the most genuine behind-the-scenes moments from the full run.", tags: "B", caption: "90 days of behind the scenes in 90 seconds.\n\nThe late nights. The wrong notes. The pizza runs. The arguments about the mix. The moments of silence when we knew a song was done.\n\nThis is what it really looked like. Every single day.\n\n#90DaysBTS #LastLivingSouls" },
          { day: 85, dayName: "Thu", type: "Music Snippet", platform: "TikTok / IG / YT Shorts", content: "NEXT MUSIC TEASER — A hint at what's coming. Even 5 seconds. Never let momentum die.", tags: "C", caption: "This isn't on any platform yet.\n\nBut it will be.\n\n'[WORKING TITLE / DESCRIPTION]' — coming [TIMEFRAME].\n\n90 days was the warmup. The next chapter starts now.\n\n🔇 → 🔊" },
          { day: 85, dayName: "Thu", type: "Engagement", platform: "IG / TikTok / YT Shorts", content: "'HOW DID YOU FIND US?' — Ask fans how they discovered Last Living Souls. Best marketing insight for Day 91+.", tags: "D", caption: "Real question — we genuinely need to know.\n\nHow did you find Last Living Souls?\n\n🔍 TikTok algorithm\n📱 Instagram explore\n🎵 Spotify/streaming\n🎤 Saw us live\n👥 Friend told you\n🎸 A cover\n\nDrop your story below 👇 This helps us find more people like you." },
          { day: 86, dayName: "Fri", type: "Stream Push", platform: "All Platforms", content: "ULTIMATE CATALOG PUSH — Full catalog, all links, one post.", tags: "A", caption: "Everything Last Living Souls has released. All in one place.\n\n🎵 '[SONG TITLE 1]'\n🎵 '[SONG TITLE 2]'\n🎵 '[SONG TITLE 3]'\n🎵 '[EP/ALBUM TITLE]'\n\nIf you've been sleeping on us — today is the moment. Hit play.\n\n🟢 Spotify\n🍎 Apple Music\n🔴 YouTube Music\n📱 Everywhere\n\n🔗 Link in bio." },
          { day: 86, dayName: "Fri", type: "Reel", platform: "TikTok / IG / YT Shorts", content: "LIVE HIGHLIGHT REEL — Best live moments from all 90 days. Your calling card for booking agents and festivals.", tags: "B", caption: "90 days of live shows in one Reel.\n\nEvery stage. Every crowd. Every moment that reminded us why we do this.\n\n[LEAD NAME] screaming into the mic. [DRUMMER NAME] breaking sticks. [PIANIST NAME] lost in the keys. [BASSIST NAME] holding the whole thing together.\n\nThis is Last Living Souls. Live.\n\n🔗 Booking inquiries — link in bio." },
          { day: 87, dayName: "Sat", type: "Community", platform: "IG / TikTok / YT Shorts", content: "'WE'RE BUILDING SOMETHING. YOU'RE PART OF IT.' — Simple. Sincere. The most powerful post is often the quietest.", tags: "D", caption: "We're building something.\n\nYou're part of it.\n\nThat's all we needed to say today. 🖤" },
          { day: 88, dayName: "Sun", type: "Aesthetic", platform: "IG", content: "90-DAY GRID FINALE — A final photo that ties the visual aesthetic together. Your best image.", tags: "C", caption: "." },
          { day: 89, dayName: "Mon", type: "Milestone", platform: "All Platforms", content: "90-DAY MILESTONE POST — Real numbers: followers, streams, shows, posts. Celebrate every metric.", tags: "A", caption: "90 days. By the numbers.\n\n📱 [X] followers (started at 0)\n🎧 [X] total streams\n🎤 [X] shows played\n📝 [X] posts made\n🎵 [X] songs released\n🌍 Listeners in [X] countries\n🤘 [X] covers performed\n💬 [X,000]+ comments from you\n\nEvery number is a person. Every person is proof that this works.\n\nWe earned every single one. And so did you.\n\n#90Days #LastLivingSouls" },
          { day: 89, dayName: "Mon", type: "Teaser", platform: "All Platforms", content: "DAY 91 TEASER — Build the next chapter before this one is even finished.", tags: "B", caption: "90 days was just the warm-up.\n\nDay 91 starts [DATE].\n\nSee you on the other side. 👁️\n\n— Last Living Souls" },
          { day: 90, dayName: "Tue", type: "Grand Finale", platform: "All Platforms", content: "DAY 90 FINALE — Full statement post. What you set out to do, what happened, what's next. Your manifesto.", tags: "C", caption: "Day 90.\n\n90 days ago, Last Living Souls walked into a room with nothing but a name, four instruments, and a belief that if we showed up every single day — someone would listen.\n\n[2-3 PARAGRAPHS — the honest truth about what happened, what surprised you, what was harder than expected, what moments defined the journey]\n\nTo everyone who followed, streamed, commented, shared, showed up to a show, wore the merch, tagged a friend, or just pressed play once — you made this real.\n\nThis isn't the end. This is the proof of concept.\n\nDay 91 starts tomorrow. And everything after this is going to be louder.\n\n— [LEAD NAME], [PIANIST NAME], [BASSIST NAME], [DRUMMER NAME]\nLast Living Souls" },
          { day: 90, dayName: "Tue", type: "Q&A Live", platform: "IG / TikTok / YT Live", content: "LIVE Q&A SESSION — Go LIVE on Day 90. Answer every question. Thank every viewer by name.", tags: "D", caption: "Day 90. We're going LIVE.\n\nAsk us anything. Say anything. We'll answer every question and thank every viewer by name.\n\n90 days of trust earns us this moment. And we're not wasting it.\n\nSee you at [TIME]. Don't be late.\n\n🔴 LIVE on [PLATFORM]" },
        ]
      }
    ]
  }
];

export default function LastLivingSoulsCalendar() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeWeek, setActiveWeek] = useState(null);
  const [showHashtags, setShowHashtags] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

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
                              const postId = `${week.week}-${post.day}-${pi}`;
                              const isExpanded = expandedPost === postId;
                              return (
                                <div key={pi}
                                  onClick={() => setExpandedPost(isExpanded ? null : postId)}
                                  style={{
                                    background: isExpanded ? "#141414" : "#111",
                                    border: isExpanded ? "1px solid #333" : "1px solid #1e1e1e",
                                    borderLeft: `3px solid ${typeColor}`,
                                    padding: "10px 14px",
                                    cursor: "pointer",
                                    transition: "all 0.15s",
                                  }}>
                                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
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
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
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
                                      <span style={{ color: "#444", fontSize: 14 }}>{isExpanded ? "▲" : "▼"}</span>
                                    </div>
                                  </div>

                                  {/* Expanded: Caption + Hashtag Stack */}
                                  {isExpanded && (
                                    <div style={{ marginTop: 12, borderTop: "1px solid #222", paddingTop: 12 }}>
                                      {post.caption && (
                                        <div style={{ marginBottom: 12 }}>
                                          <div style={{ color: "#ff3333", fontSize: 9, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>
                                            Caption Template
                                          </div>
                                          <div style={{
                                            color: "#bbb",
                                            fontSize: 12,
                                            lineHeight: 1.8,
                                            whiteSpace: "pre-wrap",
                                            background: "#0a0a0a",
                                            padding: "12px 14px",
                                            border: "1px solid #1a1a1a",
                                            borderRadius: 2,
                                          }}>
                                            {post.caption}
                                          </div>
                                        </div>
                                      )}
                                      <div>
                                        <div style={{ color: "#ff3333", fontSize: 9, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>
                                          Hashtag Stack
                                        </div>
                                        <div style={{
                                          background: "#0a0a0a",
                                          padding: "12px 14px",
                                          border: "1px solid #1a1a1a",
                                          borderRadius: 2,
                                        }}>
                                          <div style={{ color: "#555", fontSize: 9, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Type — {post.type}:</div>
                                          <div style={{ color: "#aaa", fontSize: 11, lineHeight: 1.8, marginBottom: 10 }}>
                                            {typeHashtags[post.type] || ""}
                                          </div>
                                          <div style={{ color: "#555", fontSize: 9, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>Rotation — Set {post.tags} ({tagSet.label}):</div>
                                          <div style={{ color: "#aaa", fontSize: 11, lineHeight: 1.8 }}>
                                            {tagSet.tags}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
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
