import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  FiChevronLeft,
  FiHeart,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiRotateCcw,
  FiRotateCw
} from 'react-icons/fi';

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function SkipIcon({ direction = 'forward' }) {
  const isBackward = direction === 'backward';

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`reel-skip-icon reel-skip-icon-${direction}`}
    >
      <path
        d={
          isBackward
            ? 'M16 4.2a11.8 11.8 0 1 0 8.4 20.1'
            : 'M16 4.2a11.8 11.8 0 1 1-8.4 20.1'
        }
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d={isBackward ? 'M11.6 4.8H6v5.6' : 'M20.4 4.8H26v5.6'}
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
      >
        5s
      </text>
    </svg>
  );
}

export default function VideoSection({ onNext, onBack }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [lastVolume, setLastVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const startHideTimer = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const revealControls = useCallback(() => {
    setShowControls(true);
    clearHideTimer();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onTimeUpdate = () => setCurrentTime(video.currentTime || 0);
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      clearHideTimer();
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    revealControls();

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    revealControls();

    if (video.muted || video.volume === 0) {
      const restoredVolume = lastVolume > 0 ? lastVolume : 1;
      video.muted = false;
      video.volume = restoredVolume;
      setVolume(restoredVolume);
      setMuted(false);
    } else {
      setLastVolume(video.volume || volume || 1);
      video.muted = true;
      setMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;

    const nextVolume = Number(e.target.value);
    const video = videoRef.current;

    revealControls();

    video.volume = nextVolume;
    video.muted = nextVolume === 0;

    if (nextVolume > 0) {
      setLastVolume(nextVolume);
    }

    setVolume(nextVolume);
    setMuted(nextVolume === 0);
  };

  const seekTo = (e) => {
    if (!videoRef.current || !progressRef.current || !duration) return;

    revealControls();

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const nextTime = ratio * duration;

    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const skipTime = (seconds) => {
    if (!videoRef.current) return;

    revealControls();

    const max = duration || videoRef.current.duration || 0;
    const nextTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, max));

    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handlePointerEnterPlayer = () => {
    revealControls();
  };

  const handlePointerMovePlayer = () => {
    revealControls();
  };

  const handlePointerLeavePlayer = () => {
    startHideTimer();
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="video-section-shell" style={{ paddingTop: '0', marginTop: '0' }}>
      <button className="letter-back-btn" onClick={onBack} aria-label="Go back">
        <FiChevronLeft size={16} />
        <FiHeart size={13} style={{ color: 'var(--primary-pink)' }} />
      </button>

      <div className="video-section-header" style={{ paddingTop: '16px' }}>
        <h2 className="video-section-title">
          Behind the surprise <span className="title-emoji">✨</span>
        </h2>
      </div>

      <div className="reel-player-wrap">
        <div
          className="reel-player"
          onMouseEnter={handlePointerEnterPlayer}
          onMouseMove={handlePointerMovePlayer}
          onMouseLeave={handlePointerLeavePlayer}
        >
          <video
            ref={videoRef}
            className="reel-video"
            src="/behind_surprise.mp4"
            playsInline
            loop
            preload="metadata"
            onClick={togglePlay}
          />

          {!playing && (
            <div className="reel-play-overlay" onClick={togglePlay}>
              <div className="reel-play-btn">
                <FiPlay size={32} />
              </div>
            </div>
          )}

          <div className={`reel-controls reel-controls-advanced ${showControls ? 'is-visible' : 'is-hidden'}`}>
            <div className="reel-progress-section">
              <div
                className="reel-progress-bar"
                ref={progressRef}
                onClick={seekTo}
                aria-label="Video progress"
              >
                <div
                  className="reel-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="reel-progress-thumb"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              <div className="reel-time-row">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="reel-buttons-row">
              <button
                className="reel-control-btn reel-skip-btn"
                onClick={() => skipTime(-5)}
                aria-label="Rewind 5 seconds"
              >
                <FiRotateCcw size={18} />
              </button>

              <button
                className="reel-control-btn"
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <FiPause size={18} /> : <FiPlay size={18} />}
              </button>

              <button
                className="reel-control-btn reel-skip-btn"
                onClick={() => skipTime(5)}
                aria-label="Forward 5 seconds"
              >
                <FiRotateCw size={18} />
              </button>

              <div
                className="reel-volume-group"
                onMouseEnter={revealControls}
                onMouseMove={revealControls}
              >
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
      </div>
    </div>
  );
}