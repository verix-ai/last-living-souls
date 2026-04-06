import type { ReactNode } from 'react';
import { BentoGrid } from './components/BentoGrid';
import { GlowCard } from './components/ui/spotlight-card';
import PatternShader from './components/ui/pattern-shader';
import './index.css';
import './App.css';

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';

type LinkCard = {
  title: string;
  subtitle: string;
  href: string;
  glowColor: GlowColor;
  imageSrc?: string;
  icon?: ReactNode;
};

const linkCards: LinkCard[] = [
  {
    title: 'Spotify',
    subtitle: 'Full catalog and latest release',
    href: 'https://open.spotify.com/artist/05uIqoMvFedhpbcsIwPwjL?si=gq3lTXQvQ0-RhmPnZCt_sA',
    glowColor: 'green',
    imageSrc: '/icons/spotify_3d.png',
  },
  {
    title: 'Apple Music',
    subtitle: 'Late-night rotation approved',
    href: 'https://music.apple.com/us/album/shouldve-known-single/1841186018',
    glowColor: 'red',
    imageSrc: '/icons/apple_music_3d.png',
  },
  {
    title: 'YT Music',
    subtitle: 'Headphones and volume required',
    href: 'https://music.youtube.com/channel/UCIoBtX7x4GEFGdAHT1ELF1Q?si=Rgov6mxi07tzRotq',
    glowColor: 'red',
    imageSrc: '/icons/yt_music_3d.png',
  },
  {
    title: 'Discord',
    subtitle: 'Join the orbit and hang out',
    href: 'https://discord.com',
    glowColor: 'blue',
    imageSrc: '/icons/discord_3d.png',
  },
  {
    title: 'Facebook',
    subtitle: 'Announcements, drops, and shows',
    href: 'https://www.facebook.com/LastLivingSouls.music',
    glowColor: 'blue',
    imageSrc: '/icons/facebook_3d.png',
  },
  {
    title: 'Instagram',
    subtitle: 'Studio haze and visual chaos',
    href: 'https://www.instagram.com/lastlivingsouls.music',
    glowColor: 'orange',
    imageSrc: '/icons/ig_3d.png',
  },
  {
    title: 'TikTok',
    subtitle: 'Clips, riffs, and live fragments',
    href: 'https://www.tiktok.com/@lastlivingsouls.music',
    glowColor: 'blue',
    imageSrc: '/icons/tiktok_3d.png',
  },
  {
    title: 'YouTube',
    subtitle: 'Videos, shorts, and live cuts',
    href: 'https://youtube.com',
    glowColor: 'red',
    imageSrc: '/icons/youtube.png',
  },
];

function App() {
  const renderCardIcon = (card: LinkCard) => {
    if (card.imageSrc) {
      return <img src={card.imageSrc} alt="" className="platform-sticker" loading="lazy" />;
    }

    return <div className="platform-glyph">{card.icon}</div>;
  };

  return (
    <>
      <div className="scene-backdrop" aria-hidden="true">
        <div className="scene-base-glow" />
        <div className="scene-shader-frame">
          <PatternShader
            className="scene-shader"
            gridSpacing={0.72}
            animationSpeed={0.55}
            rotationSpeed={0.018}
            paletteA={[0.09, 0.07, 0.13]}
            paletteB={[0.16, 0.1, 0.2]}
            paletteC={[0.74, 0.56, 0.38]}
            paletteD={[0.67, 0.2, 0.58]}
            ariaLabel="Subtle psychedelic interference background"
          />
        </div>
        <div className="scene-wash" />
      </div>

      <div className="app-container">
        <header className="header">
          <div className="header-halo" aria-hidden="true" />
          <div className="logo-wrapper">
            <img src="/logo.svg" alt="Last Living Souls Logo" />
          </div>
          <p className="bio">
            Raw riffs, loud nights, and everything worth turning up for
          </p>
        </header>

        <main className="main-content">
          <BentoGrid className="psychedelic-grid">
            <a
              href="https://open.spotify.com/track/6h5yX5qxLx8IW2afIuMXt7?si=9ee2fab29a4a43c8&nd=1&dlsi=c6b7f8599aae4d41"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-col-span-2 bento-row-span-2 link-card block group"
            >
              <GlowCard className="psychedelic-card feature-card w-full h-full !grid-rows-none" customSize glowColor="purple">
                <div className="card-noise" aria-hidden="true" />
                <div className="feature-art" aria-hidden="true">
                  <span className="feature-ring feature-ring-1" />
                  <div className="feature-disc-shell">
                    <div className="vinyl-spin feature-disc">
                      <img src="/icons/record_3d.png" alt="" className="feature-record" loading="eager" />
                    </div>
                  </div>
                </div>

                <div className="feature-copy">
                  <span className="card-badge">Latest Release</span>
                  <h2>Should&apos;ve Known</h2>
                </div>

                <div className="feature-meta" aria-label="Available on major platforms">
                  <span>Spotify</span>
                  <span>Apple Music</span>
                  <span>YT Music</span>
                </div>

                <span className="play-button">Enter The Stream</span>
              </GlowCard>
            </a>

            {linkCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-col-span-1 bento-row-span-1 link-card block group"
              >
                <GlowCard className="psychedelic-card platform-card w-full h-full !grid-rows-none" customSize glowColor={card.glowColor}>
                  <div className="card-noise" aria-hidden="true" />
                  <div className="platform-icon-shell">
                    {renderCardIcon(card)}
                  </div>
                  <div className="platform-copy">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                </GlowCard>
              </a>
            ))}
          </BentoGrid>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Last Living Souls. Stay loud.
        </footer>
      </div>
    </>
  );
}

export default App;
