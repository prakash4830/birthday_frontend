import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiMusic, FiVolumeX } from 'react-icons/fi';

import CountdownScreen from './components/CountdownScreen';
import GalaxyBackground from './components/GalaxyBackground';
import FloatingHearts from './components/FloatingHearts';
import Roses from './components/Roses';
import LoginScreen from './components/LoginScreen';
import CakeScreen from './components/CakeScreen';
import Fireworks from './components/Fireworks';
import LetterSection from './components/LetterSection';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import LoveCounter from './components/LoveCounter';
import VideoSection from './components/VideoSection';
import VoiceMessage from './components/VoiceMessage';
import Quiz from './components/Quiz';
import MiniGame from './components/MiniGame';

function Footer({ message, className = '' }) {
  return (
    <footer className={`footer ${className}`}>
      <p className="footer-message">{message}</p>
      <p className="footer-copy">© Designed and developed by JP, with 💖</p>
    </footer>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('countdown');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [hideBackgrounds, setHideBackgrounds] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const audioRef = useRef(null);

  const getMusicForScreen = () => {
    if (currentScreen === 'countdown' || currentScreen === 'login') {
      return '/letter_2.mp3';
    }
    if (currentScreen === 'cake') {
      return '/happy_birthday.mp3';
    }
    if (currentScreen === 'letter') {
      return '/letter_1.mp3';
    }
    return '/letter_3.mp3';
  };

  const currentMusic = getMusicForScreen();

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (musicPlaying && audioUnlocked) {
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay block or music file missing:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [currentMusic, musicPlaying, audioUnlocked]);

  const unlockAudio = useCallback(async () => {
    if (!audioRef.current || audioUnlocked) return;

    try {
      audioRef.current.muted = false;
      await audioRef.current.play();
      setMusicPlaying(true);
      setAudioUnlocked(true);
    } catch (err) {
      console.warn('Audio unlock failed:', err);
    }
  }, [audioUnlocked]);

  const handleUnlockSurprise = useCallback(() => {
    setCurrentScreen('cake');
    setMusicPlaying(true);
  }, []);

  const handleCandleBlown = useCallback(() => {
    setHideBackgrounds(true);
    setTimeout(() => {
      setShowFireworks(true);
    }, 750);
  }, []);

  const handleNextToLetter = useCallback(() => {
    setShowFireworks(false);
    setHideBackgrounds(false);
    setCurrentScreen('letter');
  }, []);

  const handleUnlockMainContent = useCallback(() => {
    setCurrentScreen('mainContent');
  }, []);

  const toggleMusic = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      if (!audioUnlocked) {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setAudioUnlocked(true);
        setMusicPlaying(true);
        return;
      }

      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        await audioRef.current.play();
        setMusicPlaying(true);
      }
    } catch (err) {
      console.warn('Music toggle failed:', err);
    }
  }, [audioUnlocked, musicPlaying]);

  const handleCountdownUnlocked = useCallback(() => {
    setCurrentScreen('login');
  }, []);

  const handleBackToCake = useCallback(() => {
    setCurrentScreen('cake');
  }, []);

  // Add 'video' to your screen flow: letter → video → mainContent
  const handleNextToVideo = useCallback(() => {
    setCurrentScreen('video');
  }, []);

  const handleVideoNext = useCallback(() => {
    setCurrentScreen('mainContent');
  }, []);

  return (
    <div
      className="app-container"
      style={hideBackgrounds ? { backgroundColor: '#000000' } : {}}
    >
      {!hideBackgrounds && <GalaxyBackground />}
      {!hideBackgrounds && <FloatingHearts />}
      {!hideBackgrounds && <Roses />}

      <audio ref={audioRef} src={currentMusic} loop preload="auto" />

      <button
        className="music-toggle-btn"
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Mute Background Music' : 'Play Background Music'}
      >
        {musicPlaying ? <FiMusic className="animate-pulse" /> : <FiVolumeX />}
      </button>

      <div className={`screen-panel ${currentScreen === 'countdown' ? 'active' : ''}`}>
        <CountdownScreen
          onUnlocked={handleCountdownUnlocked}
          onFirstTap={unlockAudio}
          audioUnlocked={audioUnlocked}
        />
        <Footer
          className="footer login-footer"
          message="A special surprise for the girl who makes me smile."
        />
      </div>

      <div className={`screen-panel ${currentScreen === 'login' ? 'active' : ''}`}>
        <div className="login-screen-layout">
          <div className="login-card-wrap">
            {currentScreen === 'login' && <LoginScreen onUnlock={handleUnlockSurprise} />}
          </div>

          <Footer
            className="footer login-footer"
            message="This little page exists because of you."
          />
        </div>
      </div>

      <div className={`screen-panel ${currentScreen === 'cake' ? 'active' : ''}`}>
        <div className="screen-page-shell">
          <div className="screen-page-content">
            {currentScreen === 'cake' && (
              <CakeScreen onBlown={handleCandleBlown} onNext={handleNextToLetter} />
            )}
          </div>
          <Footer
            className="footer"
            message="Tonight, the stars, the music, and this little surprise all belong to you."
          />
        </div>
      </div>

      <div className={`screen-panel ${currentScreen === 'letter' ? 'active' : ''}`}>
        <div className="screen-page-shell">
          <div className="screen-page-content">
            {currentScreen === 'letter' && (
              <LetterSection onNext={handleNextToVideo} onBack={handleBackToCake}/>
            )}
          </div>
          <Footer
            className="footer"
            message="Some gifts are bought, but this one was made from my heart."
          />
        </div>
      </div>

      {/* Stage D: Video Section */}
      <div className={`screen-panel ${currentScreen === 'video' ? 'active' : ''}`}>
        <div className="screen-page-shell">
          <div className="screen-page-content">
            {currentScreen === 'video' && (
              <VideoSection onNext={handleVideoNext} onBack={() => setCurrentScreen('letter')}/>
              )}
          </div>
          <Footer
          className="footer"
          message="Every fold, every word, and every second of this was made just for you"
        />
        </div>
      </div>


      {showFireworks && <Fireworks />}
    </div>
  );
}