import React, { useState, useRef, useEffect } from 'react';
import { FiMusic, FiVolumeX} from 'react-icons/fi';

// Import custom components with path
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

/**
 * App Component - Central Controller
 * 
 * Concepts taught here:
 * 1. Global State Management: using `useState` to coordinate screens.
 * 2. Conditional Rendering: loading components based on state markers.
 * 3. Media Controls: handling autoplay blocks by starting audio on click events.
 * 4. DOM Reference with `useRef`: tracking audio tags directly.
 * 5. State Propagation: passing callbacks (`onUnlock`, `onBlown`, etc.) to children.
 * 
 * ✨ Every star tonight is yours — open to find out why 🌙💕
 * This little page exists because of you.
 * A small surprise, filled with big feelings.
 * Every line here carries a little thought of you.
 * Tonight, the stars, the music, and this little surprise all belong to you.
 * A special surprise for the girl who makes my heart smile.
 */

function Footer({ message, className = '' }) {
  return (
    <footer className={`footer ${className}`}>
      
      <p className="footer-message">
        {message}
      </p>
      <p className="footer-copy">
        © Designed and developed by JP, with 💖
      </p>
    </footer>
  );
}

export default function App() {
  // Screen tracking state: 'login' -> 'cake' -> 'letter' -> 'mainContent'
  const [currentScreen, setCurrentScreen] = useState('countdown');
  
  // Background music toggles
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Celebration states: hide decorative background elements and trigger fireworks after delay
  const [hideBackgrounds, setHideBackgrounds] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // Ref referencing the HTML5 audio element
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

  // Sync music playing state with actual audio element
  useEffect(() => {
  if (!audioRef.current) return;

  audioRef.current.load();

  if (musicPlaying) {
    audioRef.current.play().catch((err) => {
      console.warn("Autoplay block or music file missing:", err);
    });
  } else {
    audioRef.current.pause();
  }
}, [currentMusic, musicPlaying]);

  // Handle successful password entry
  const handleUnlockSurprise = () => {
    setCurrentScreen('cake');
    setMusicPlaying(true); // User-interaction event allows background music to play!
  };

  // Blow candle handler
  const handleCandleBlown = () => {
    setHideBackgrounds(true);

    // Start fireworks after 0.75 second delay
    setTimeout(() => {
      setShowFireworks(true);
    }, 750); // 0.75 seconds delay
  };

  const handleNextToLetter = () => {
    setShowFireworks(false);
    setHideBackgrounds(false);
    setCurrentScreen('letter');
  };

  const handleUnlockMainContent = () => {
    setCurrentScreen('mainContent');
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const handleCountdownUnlocked = () => {
  setCurrentScreen('login');
  setMusicPlaying(true);
};

  return (
    <div 
      className="app-container"
      style={hideBackgrounds ? { backgroundColor: '#000000' } : {}}
    >
      {/* 1. Global Background Layers */}
      {!hideBackgrounds && <GalaxyBackground />}
      {!hideBackgrounds && <FloatingHearts />}
      {!hideBackgrounds && <Roses />}
      
      {/* 2. Global Hidden Background Music Audio */}
      <audio
        ref={audioRef}
        src={currentMusic}
        loop
        preload="auto"
      />
      

      {/* 3. Global Floating Music Controller */}
      
        <button
          className="music-toggle-btn"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Mute Background Music" : "Play Background Music"}
        >
          {musicPlaying ? <FiMusic className="animate-pulse" /> : <FiVolumeX />}
        </button>
      

      {/* 4. Cinematic Stage Panels */}

      <div className={`screen-panel ${currentScreen === 'countdown' ? 'active' : ''}`}>
            <CountdownScreen onUnlocked={handleCountdownUnlocked} />
            <Footer 
            className="footer login-footer"
            message = "A special surprise for the girl who makes my smile."
          />
      </div>
      
      {/* Stage A: Login Gate */}
      <div className={`screen-panel ${currentScreen === 'login' ? 'active' : ''}`}>
        <div className="login-screen-layout">
          <div className="login-card-wrap">
                {currentScreen === 'login' && (
                <LoginScreen onUnlock={handleUnlockSurprise} />
              )}
          </div>

          <Footer 
            className="footer login-footer"
            message = "This little page exists because of you."
          />

        </div>
      </div>

      {/* Stage B: Birthday Cake Wish */}
      <div className={`screen-panel ${currentScreen === 'cake' ? 'active' : ''}`}>
        <div className="screen-page-shell">
          <div className="screen-page-content">
            {currentScreen === 'cake' && (
              <CakeScreen
                onBlown={handleCandleBlown}
                onNext={handleNextToLetter}
              />
            )}
          </div>
          <Footer 
            className="footer"
            message = "Tonight, the stars, the music, and this little surprise all belong to you."
          />
        </div>
      </div>

      {/* Stage C: Open Envelope & Letter */}
      <div className={`screen-panel ${currentScreen === 'letter' ? 'active' : ''}`}>
        <div className="screen-page-shell">
          <div className="screen-page-content">
            {currentScreen === 'letter' && (
              <LetterSection onNext={handleUnlockMainContent} />
            )}
          </div>
          <Footer 
            className="footer"
            message = "Some gifts are bought, but this one was made from my heart."
          />
        </div>
      </div>

      {/* Stage D: Main Memory Roll - DISABLED */}
      {/* 
      {currentScreen === 'mainContent' && (
        <main className="cinematic-scroll-view fade-in">
          Disabled content here
        </main>
      )}
      */}

      {/* 5. Dynamically Rendered Canvas Fireworks */}
      {showFireworks && <Fireworks />}
    </div>
  );
}
