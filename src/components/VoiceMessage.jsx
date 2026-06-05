import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

/**
 * VoiceMessage Component
 * 
 * Objectives taught:
 * 1. DOM Referencing with `useRef`: controlling HTML5 media elements (`<audio>`) without re-renders.
 * 2. Custom Player State: mapping native media events (`onTimeUpdate`, `onEnded`, `onLoadedMetadata`) to React state.
 * 3. Sound Calculations: rendering formatted minutes and seconds from raw duration float values.
 * 4. User Interaction Sync: binding click events to audio methods like `.play()` and `.pause()`.
 */
export default function VoiceMessage() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Sync state if audio ends
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.warn("Audio play blocked or file missing:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle Mute
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Sync progress bar clicks with audio playback timestamp
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format seconds to MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Cleanup: ensure audio is paused and disposed when screen changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="section-container visible">
      <h2 className="section-title">A Voice Message For You</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        A personal voice note recorded straight from the heart. Put on your headphones...
      </p>

      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/voice.mp3"
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={handleEnded}
      />

      {/* Custom Styled Audio Player Card */}
      <div className="glass-card audio-player-card">
        <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '5px' }}>VoiceNote.mp3</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Recorded with love
        </p>

        {/* Action Controls */}
        <div className="audio-controls">
          <button 
            onClick={toggleMute} 
            className="audio-btn" 
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>

          <button
            onClick={togglePlay}
            className="audio-btn audio-btn-play"
            aria-label={isPlaying ? "Pause Voice Message" : "Play Voice Message"}
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          
          <div style={{ width: '1.8rem' }} /> {/* Spacing placeholder for symmetry */}
        </div>

        {/* Custom Progress Bar */}
        <div className="audio-progress-container">
          <span className="audio-time-label">{formatTime(currentTime)}</span>
          
          <div 
            className="audio-progress-bar" 
            onClick={handleProgressClick}
            role="slider"
            aria-valuemin="0"
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            aria-label="Audio timeline slider"
          >
            <div 
              className="audio-progress-filled" 
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          
          <span className="audio-time-label">{formatTime(duration || 0)}</span>
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '15px',
        fontStyle: 'italic'
      }}>
        💡 Tip: Place your custom audio voice note named <strong>voice.mp3</strong> in the <code>public/</code> folder to play your own recording.
      </p>
    </div>
  );
}
