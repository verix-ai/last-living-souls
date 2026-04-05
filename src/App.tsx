import { BentoGrid } from './components/BentoGrid';
import { GlowCard } from './components/ui/spotlight-card';
import { FaSpotify, FaApple, FaInstagram, FaYoutube, FaDiscord, FaFacebook, FaTiktok } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';
import { GiCompactDisc } from 'react-icons/gi';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Profile Header */}
      <header className="header">
        <div className="logo-wrapper">
          <img src="/logo.svg" alt="Last Living Souls Logo" />
        </div>
        <p className="bio">
          Listen to our latest Single "Should've Known"
        </p>
      </header>

      <main className="main-content">
        <BentoGrid>

          {/* Main Feature - 2x2 */}
          <a href="https://open.spotify.com/track/6h5yX5qxLx8IW2afIuMXt7?si=9ee2fab29a4a43c8&nd=1&dlsi=c6b7f8599aae4d41" target="_blank" rel="noopener noreferrer" className="bento-col-span-2 bento-row-span-2 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="purple">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': 'var(--color-magenta)' } as any}>
                <div className="vinyl-spin">
                  <GiCompactDisc size={100} />
                </div>
              </div>
              <h2>Latest Release</h2>
              <p>Stream "Should've Known"</p>
              <button className="play-button" style={{ marginTop: '1rem' }}>
                <span>Play Now</span>
              </button>
            </GlowCard>
          </a>

          {/* Music Platforms - 1x1 */}
          <a href="https://open.spotify.com/artist/05uIqoMvFedhpbcsIwPwjL?si=gq3lTXQvQ0-RhmPnZCt_sA" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="green">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#1DB954' } as any}>
                <FaSpotify size={50} />
              </div>
              <h3>Spotify</h3>
            </GlowCard>
          </a>

          <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="red">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#FA243C' } as any}>
                <FaApple size={50} />
              </div>
              <h3>Apple Music</h3>
            </GlowCard>
          </a>

          <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="red">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#FF0000' } as any}>
                <SiYoutubemusic size={50} />
              </div>
              <h3>YT Music</h3>
            </GlowCard>
          </a>

          {/* Socials & Community - 1x1 */}
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="blue">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': 'var(--color-blue)' } as any}>
                <FaDiscord size={50} />
              </div>
              <h3>Discord</h3>
            </GlowCard>
          </a>

          <a href="https://www.facebook.com/LastLivingSouls.music" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="blue">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#1877F2' } as any}>
                <FaFacebook size={50} />
              </div>
              <h3>Facebook</h3>
            </GlowCard>
          </a>

          <a href="https://www.instagram.com/lastlivingsouls.music" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="orange">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#E1306C' } as any}>
                <FaInstagram size={50} />
              </div>
              <h3>Instagram</h3>
            </GlowCard>
          </a>

          <a href="https://www.tiktok.com/@lastlivingsouls.music" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="blue">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#00f2fe' } as any}>
                <FaTiktok size={50} />
              </div>
              <h3>TikTok</h3>
            </GlowCard>
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bento-col-span-1 bento-row-span-1 block group" style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlowCard className="w-full h-full flex flex-col items-center justify-center text-center !grid-rows-none" customSize glowColor="red">
              <div className="bento-icon-wrapper bento-icon-wrapper-dynamic" style={{ '--hover-color': '#FF0000' } as any}>
                <FaYoutube size={50} />
              </div>
              <h3>YouTube</h3>
            </GlowCard>
          </a>

        </BentoGrid>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Last Living Souls. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
