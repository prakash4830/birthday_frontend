import React, { useRef, useState } from 'react';
import { FiChevronLeft, FiHeart, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function VideoSection({ onNext, onBack }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="video-section-shell" style={{ paddingTop: '0', marginTop: '0' }}>

      {/* Back button */}
      <button className="letter-back-btn" onClick={onBack} aria-label="Go back">
        <FiChevronLeft size={16} />
        <FiHeart size={13} style={{ color: 'var(--primary-pink)' }} />
      </button>

      {/* Title */}
      <div className="video-section-header" style={{ paddingTop: '16px' }}>
      <h2 className="video-section-title">Behind the surprise <span className="title-emoji">✨</span></h2>
      </div>

      {/* Portrait Reel Player */}
      <div className="reel-player-wrap">
        <div className="reel-player">
          <video
            ref={videoRef}
            className="reel-video"
            src="/your-video.mp4"
            playsInline
            loop
            onClick={togglePlay}
          />

          {/* Play/Pause overlay tap */}
          {!playing && (
            <div className="reel-play-overlay" onClick={togglePlay}>
              <div className="reel-play-btn">
                <FiPlay size={32} />
              </div>
            </div>
          )}

          {/* Controls bar at bottom */}
          <div className="reel-controls">
            <button
              className="reel-control-btn"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <FiPause size={18} /> : <FiPlay size={18} />}
            </button>

            <button
              className="reel-control-btn"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}